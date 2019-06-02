<template>
  <section class="login-warp">
    <div class="content">
      <div class="login-form">
        <h1 class="login-form-title">资金管理系统</h1>
        <div class="form-con">
         <!-- :rules="rules" -->
          <el-form :model="form" status-icon  ref="form" label-width="100px" class="demo-ruleForm" >
            <el-form-item label label-width="0" prop="userPin" id="account">
              <el-input
                type="name"
                placeholder="请输入账号"
                v-model="form.username"
                autoComplete="off"
                prefix-icon="el-icon-date"
              ></el-input>
            </el-form-item>
            <el-form-item label label-width="0" prop="password" id="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="form.password"
                autoComplete="off"
                prefix-icon="el-icon-date"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login('form')">登 录</el-button>
        </div>
      </div>
    
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data(){
    return {
      form: {
        username:'',
        password:''
      }
    }
  },
  methods:{
    login(){
      var _this = this;
      var data = {
        username: this.form.username,
        password: this.form.password
      }
      _this.$axios({
        method: 'post',
        url: '/api/login',
        data: data
      })
      .then((res)=> {
        console.log(res.data);
        if(res.data.code ==="0000"){
          this.$message({
            message: '登录成功~',
            type: 'success'
          });
          setTimeout(function() {
            _this.$router.push({
              path: '/index'
            })
          }, 1000)
          
        }else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
     
      })
  
    }
  }
}
</script>

<style lang="scss" scoped>
 .login-warp {
    height: 100%;
    min-height: 800px; // 登录背景图优化
    min-width: 1200px; // 登录背景图优化
    position: relative;
    background: url('../assets/bg.jpg') center no-repeat;
    background-size: cover;
    .content {
      padding: 80px;
      background: #ffffff;
      position: absolute;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;

      .login-form {
        flex: 1;
        .login-form-title {
          font-size: 38px;
          color: #000000;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
        }
        .form-con {}
      }
    }
  }
  // 登录按钮
  .el-button {
    width: 100%;
    height: 46px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: normal;
  }
</style>


