<template>
    <el-container class="home-container">
      <el-aside :width="!isCollapse ? '200px' : '60px'">
        
        <el-menu 
          default-active="1" 
          class="el-menu-vertical-demo" 
          @open="handleOpen" @close="handleClose" 
          :collapse="isCollapse"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#1890ff">
          <el-menu-item index="1" @click="toPage('/index')">
            <i class="el-icon-location"></i>
            <span slot="title">首页流程</span>
          </el-menu-item>
          <el-menu-item index="2" @click="toPage('/data')">
            <i class="el-icon-menu"></i>
            <span slot="title">数据看板</span>
          </el-menu-item>
          <el-menu-item index="3" @click="toPage('/table')"> 
            <i class="el-icon-document"></i>
            <span slot="title">收支明细</span>
          </el-menu-item>
          <el-menu-item index="4" @click="toPage('/other')">
            <i class="el-icon-setting"></i>
            <span slot="title">其他明细</span>
          </el-menu-item>
        </el-menu>
      
      </el-aside>
      <el-container>
        <el-header>
          <div class="menu-icon">
            <i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"  @click="toggleCollapse"></i>
          </div>

          <div class="header-info">
            <el-dropdown @command="DropClick">
              <span class="el-dropdown-link">
                <span class="info-avatar">
                  <img :src="userInfo.user_avater" alt>
                </span>
                <span class="info-name">{{userInfo.user_name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>
        <el-main>
          <!-- 匹配的是组件的 name，组件要增加 name属性 -->
          <keep-alive :include="['index']">
            <router-view/>
          </keep-alive>
        </el-main>
        <el-footer>
            互联网医院研发部 copyright@ 2019
        </el-footer>
      </el-container>
    </el-container>
    
</template>

<script>

  export default {
    name: 'home',
    data(){
      return {
        data: [],
        lastData: [],
        isCollapse: false,
        userInfo:{},
        
      }
    },
    created(){
      this.initList();
    },
    methods:{
      toggleCollapse(){
        if(this.isCollapse){
          this.isCollapse = false;
        }else {
          this.isCollapse = true;
        }
      },
      toPage(path){
        this.$router.push({
          path: path
        })
      },
      initList() {
        var _this = this;
        var data = {
          size: _this.pageSize,
          index: _this.currentPage
        }
        _this.$axios({
          method: 'post',
          url: '/api/user',
          data: data
        })
        .then((res)=> {
          // console.log(res);
          _this.userInfo = res.data.data[0];
          // _this.total = res.total;
        })
    
      },
      
      
      DropClick(item) {
        var _this = this;
        if (item == "logout") {
          _this.$axios({
            method: 'post',
            url: '/api/logout'
          })
          .then((res)=> {
            if (res.data.code == "0000" && res.data.data) {
              this.$message({
                message: '退出成功~',
                type: 'success'
              });
              setTimeout(function() {
                _this.$router.push({
                  path: '/'
                })
              }, 1000)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
      
        } else if (item == "editPassword") {
          // 修改密码
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      
      
    }
  }
</script>

<style lang="scss" scoped>
section.el-container.home-container {
  height: 100%;
}
 .el-header{
    border-bottom: 1px solid #cecece;
    line-height: 60px;
    display: flex;
  }
   .el-footer {
     border-top: 1px solid #cecece;
     line-height: 60px;
     text-align: center;
     font-size: 14px;
   }
  
  .el-aside {
    background-color: #001529;
    color: #333;
    line-height: 200px;
    border-right: 1px solid #cecece;
  }
  
  .el-main {
    color: #333;
    background: #f8f8f8;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .header-info {
      // width: 500px;
      // border: 1px solid red;
      display: flex;
      // color: #ffffff;
      align-items: center;
      min-width: 103px;
      text-align: right;

      .info-name {
        flex: 1;
      }
      .el-dropdown {
        display: flex;
        align-items: center;
      }
      .el-dropdown .info-avatar {
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 12px;
        border: 1px solid #001529;
        overflow: hidden;
      }

      .el-dropdown-link {
        cursor: default;
        // color: #ffffff;
        display: flex;
        align-items: center;
      }
      .el-icon-arrow-down {
        // font-size: 12px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-icon-s-fold, .el-icon-s-unfold{
    font-size: 24px;
  }

  .menu-icon {
    flex: 1;
  }
</style>
