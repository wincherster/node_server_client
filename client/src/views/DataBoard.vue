<template>
  <div class="data-con">
    <div class="data-item fund-in">
      <h3 class="data-title">收入总额</h3>
      <div class="data-number">
       {{ fundIn ? fundIn.amount : 0 }}
      </div>
    </div>

     <div class="data-item fund-out">
      <h3 class="data-title">支出总额</h3>
      <div class="data-number">
      {{fundOut? fundOut.amount : 0}}
      </div>
    </div>
    
    <div class="data-item">
      <h3 class="data-title">资金结余</h3>
      <div class="data-number">
        {{ !lastData[0] ? 0 : lastData[0].fund_count}}
      </div>
    
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tableData:[],
        lastData: [],
        fundIn: 0,
        fundOut: 0
      }
    },
    created(){
      this.getLastInfo();
      this.getFund();
    },
    methods: {
      getLastInfo(){
        var _this = this;
        var data = {
          // size: _this.pageSize,
          // index: _this.currentPage
        }
        _this.$axios({
          method: 'post',
          url: '/api/getLastInfo',
          data: data
        })
        .then((res)=> {
          _this.lastData = res.data.data;
        })
      },
      getFund(){
        var _this = this;
        _this.$axios({
          method: 'post',
          url: '/api/getFund',
        })
        .then((res)=> {
          console.log(res.data.data[0], res.data.data[1],'获取收入支出总和')

          this.fundIn = res.data.data[0];
          this.fundOut = res.data.data[1];
        })
      },
      getInfo(){
        var _this = this;
        var data = {
          // size: _this.pageSize,
          // index: _this.currentPage
        }
        _this.$axios({
          method: 'post',
          url: '/api/getFundInfo',
          data: data
        })
        .then((res)=> {
          _this.tableData = res.data.data;
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.data-con {
  display: flex;
  .data-item {
    padding: 30px;
    width: 200px;
    background: #4c8ff5;
    color: #ffffff;

    border-radius: 10px;
    box-shadow: 0px 3px 10px #9c9c9c;
    text-align: center;

    .data-title {
      font-size: 24px;
      font-weight: 700px;
    }
    .data-number {
      font-size: 60px;
      margin-top: 20px;
      font-weight: 700;

    }
    & + .data-item {
      margin-left: 40px;

    }

  }

  .fund-in{
    background: #56c156;
    color: #ffffff;
  }

  .fund-out {
    background: #f35a5a;
    color: #ffffff;
  }
}
</style>


