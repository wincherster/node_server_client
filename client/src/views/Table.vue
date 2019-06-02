<template>
  <div class="table-con">
    <el-button @click="addData">
      添加数据
    </el-button>

    <div class="table-content">
      <el-table stripe
        :data="tableData"
        style="width: 100%">
        <el-table-column label="编号" prop="id">
        </el-table-column>
        <el-table-column label="创建时间" width="180" prop="created_time">
        </el-table-column>
        <el-table-column label="更新时间" width="180" prop="update_time">
        </el-table-column>
        <el-table-column label="姓名" prop="user_name">
        </el-table-column>
        <el-table-column label="资金类型">
          <template slot-scope="scope">
            <span :class="scope.row.fund_type == 1 ? 'fund-in' : 'fund-out'">
              {{ scope.row.fund_type == 1? '收入' : '支出' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span :class="scope.row.fund_type == 1 ? 'fund-in' : 'fund-out'">
             {{ scope.row.fund_number }}
           </span>
          </template>
           
        </el-table-column>
        <el-table-column label="资金来源/去向" prop="fund_from_type">
          <template slot-scope="scope">
            {{ toggleText(scope.row.fund_from_type) }}
           <!-- {{ scope.row.fund_type == 1? '未打卡' : scope.row.fund_type == 2 ? "PMP" : '其他' }} -->
          </template>
        </el-table-column>
        <el-table-column label="资金总额" prop="fund_count">
          <template slot-scope="scope">
            <span class="count-number">
             {{ scope.row.fund_count }}
           </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="description">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="Edit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
      
        <el-pagination
        @size-change="sizeChange"
        @current-change="indexChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
      </div>
      


    </div>

    <el-dialog :title="tipText" :visible.sync="formShow" width="30%">
      <div class="dialog-container">
        <el-form ref="form" :model="form" label-width="110px">

          <el-form-item label="资金人员">
            <el-input v-model="form.user_name"></el-input>
          </el-form-item>
          
          <el-form-item label="资金金额">
            <el-input v-model="form.fund_number"></el-input>
          </el-form-item>

          <el-form-item label="资金类型">
            <el-select v-model="form.fund_type" placeholder="请选择资金类型">
              <el-option v-for="(item, index) in fundType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资金来源/去向">
            <el-select v-model="form.fund_from_type" placeholder="请选择资金来源">
              <el-option v-for="(item, index) in fundFromType" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资金备注">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
        </el-form>

      </div>
      

      <span slot="footer" class="dialog-footer">
        <el-button @click="formShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmFund">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  
  data(){
    return {
      tableData: [],
      totalNumber: 0,
      pageIndex: 1,
      pageSize: 10,
      formShow: false,
      fundFromType: [],
      fundType:[
        { id: 1, name: "收入" },
        { id: 2, name: "支出" },
      ],
      form: {
        description: "",
        // fund_count: "",
        fund_from_type: "",
        fund_number: "",
        fund_type: "",
        user_name: "",
      },
      tipText: '添加数据'

    }
  },
  created(){
    this.getFundFromType();
    this.getDataTable();
  },
  methods: {
    toggleText(id){
      let text = '';
      this.fundFromType.map( item => {
        if(id === item.id){
          console.log(id, item.id, item.name )
          text = item.name;
        }
      })
      return text;
      
    },
    getFundFromType(){
      this.$axios({
          method: 'post',
          url: '/api/getFundFromType',
        })
        .then((res)=> { 
          console.log(res,'getFundFromType');
          this.fundFromType = res.data.data;
        })
    },
    getDataTable(){
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$axios({
          method: 'post',
          url: '/api/getFundInfo',
          data: params
        })
        .then((res)=> { 
          this.tableData = res.data.data;
          this.totalNumber = res.data.total;
        })
    },
    addData(){
      console.log('添加数据');
      this.form = {
        description: "",
        // fund_count: "",
        fund_from_type: "",
        fund_number: "",
        fund_type: "",
        user_name: "",
      }
      console.log(this.form);
      this.tipText = "添加数据";
      this.formShow =true;
    },
    confirmFund(){
      if(this.form.id) {
        this.toEditFund();
      }else {
        this.toAddFund();
      }
    },
    toAddFund(){
      if(this.form.fund_type == 2){
        this.form.fund_number = -this.form.fund_number
      }
      this.$axios({
        method: 'post',
        url: '/api/addFundInfo',
        data: this.form
      })
      .then((res)=> { 
        console.log(res)
        if(res.data.code === "0000"){
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.formShow =false;
          this.getDataTable();
        }
      })
    },
    Edit(index, row){
      console.log('编辑数据');
      this.form = _.cloneDeep(row);
      this.form.old_value = row.fund_number;
      if(this.form.fund_type == 2){ // 支出负数 转 正数
        this.form.fund_number = Math.abs(this.form.fund_number);
      }
      this.tipText = "编辑数据";
      this.formShow = true;
    },
    toEditFund(){
      if(this.form.fund_type == 2){
        this.form.fund_number = -this.form.fund_number;
      }
      this.$axios({
        method: 'post',
        url: '/api/editFundInfo',
        data: this.form
      })
      .then((res)=> { 
        console.log(res)
        if(res.data.code === "0000"){
          this.$message({
            type: 'success',
            message: '编辑成功!'
          });
          this.formShow =false;
          this.getDataTable();
        }
        
      })
    },
    Delete(index, row){
      console.log(index, row.id);
      this.$confirm('确认删除该数据吗?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$axios({
            method: 'post',
            url: '/api/delFundInfo',
            data: {id : row.id}
          })
          .then((res)=> { 
            console.log(res)
            if(res.data.code === "0000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.tableData.splice(index, 1);
            }
            
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    sizeChange(val){
      this.pageSize = val;
      this.pageIndex = 1;

      this.getDataTable();
    },
    indexChange(val){
      this.pageIndex = val;

      this.getDataTable();
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-con {

    .pagination {
      margin-top: 30px;
      text-align: right;
    }
  }

  .fund-in {
    color: #56c156;
  }
  .fund-out {
    color: #f35a5a;
  }
  .count-number {
    color: #4c8ff5;
  }

  .dialog-container {
    padding-right: 20px;
  }
</style>

