<template>
  <div class="my-nav-v2">

      <div class="my-menu">
         <div class="m-view">
           <!--网站logo-->
            <div class="logo-a">
                <a href="www.baidu.com" target="_blank">
                    <img src="../../../static/img/logo_a.png" alt="">
                </a>
                <div class="logo-b">
                    <a href="www.baidu.com" target="_blank">
                        <img src="../../../static/img/logo_b.png" alt="" style="height:38px">
                    </a>
                </div>
            </div>
            <!--导航list-->
            <div :class="showDownMeun?'my-menu-list active':'my-menu-list'">
                <router-link to="/personalities">
                    <div :class="/^\/personalities/.test($route.path)? 'items active':'items'">人格类型</div>
                </router-link>
                <router-link :to="'/test'">
                    <div :class="/^\/test/.test($route.path)? 'items active':'items'">测试</div>
                </router-link>
                <router-link to="/example">
                    <div :class="/^\/example/.test($route.path)? 'items active':'items'">名人库</div>
                </router-link>
                <router-link to="/forum?category=all&page=1">
                    <div :class="/^\/forum/.test($route.path)? 'items active':'items'">M论坛</div>
                </router-link>
                <router-link to="/about">
                    <div :class="/^\/about/.test($route.path)? 'items active':'items'">关于我们</div>
                </router-link>
                <router-link to="/my">
                    <div  v-if="$store.state.userInfo.name" :class="/^\/my/.test($route.path)? 'items active':'items'">个人中心</div>
                </router-link>
                <div class="items user-ctrl">
                  <div v-if="$store.state.userInfo.name" class="not-login">
                      <router-link to="/my">
                        <img class="avatar" :src="$store.state.userInfo.avatar?$pathAvatar+$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                      </router-link>
                      <router-link to="/my">
                        <div class="role-name overflow-row-1">{{$store.state.userInfo.r_name}}</div>
                      </router-link>
                      <div class="user-login-out">
                        <!--<i class="el-icon-caret-bottom"></i>-->
                            <el-dropdown trigger="click" @command="handleCommand">
                              <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right" style="margin:5px;"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown" style="top:34px">
                                <el-dropdown-item command="account"><i class="fa fa-user"></i> 个人中心</el-dropdown-item>
                                <el-dropdown-item command="exit"><i class="fa fa-sign-out"></i> 退出</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                        <div>
                        </div>
                      </div>
                  </div>
                  <div v-else @click="$store.state.modalLogin = true" class="login-register">登录 / 注册</div>


                </div>
            </div>
            <!--下拉按钮-->
            <div class="down-btn" @click="showDownMeun=!showDownMeun"><i class="fa fa-navicon"></i></div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          //配置路由正则
          routeObj:{
            '0':/^\//,
            '1':/^\/mbti/,
            '2':/^\/test/,
            '3':/^\/example/,
            '4':/^\/forum/,
          },
          showDownMeun:false
      }
  },
  components: {
  },
  watch: {
  },
  methods: {
    handleCommand(command){
      if(command==='exit'){
         this.exit()
      }else if(command==='account'){
        this.$router.push({
          path:'/my'
        })
      }
    },
    exit(){
        localStorage.setItem('accountInfo','')
        this.$store.commit('setAccountInfo',{})
        localStorage.setItem('USER','')
        this.$store.commit('setUserInfo',{})
        if(/^\/my/.test(this.$route.path)){
           this.$router.push({
             path:'/forum?category=all&page=1'
           })
        }
        this.$message({
            message: '你已退出！',
            type: 'success'
        });
    }

  },
  mounted() {
  },
  created(){
     
  }
}
</script>

<style lang="less">
.my-nav-v2 {
    padding-top:1px;
    .my-menu {
      margin-top:55px;
      // height:50px;
      background-color: #456ea5;
      position: relative;
      .m-view {
          max-width: 1180px;
          margin:0 auto;
          position: relative;
          min-height:52px;
      }
      .my-menu-list {
          padding-left:100px;
          display:flex;
          // position: relative;  
          a {
            // flex:1;
          }
          .items {
            height:52px;
            line-height: 52px;
            padding:0 20px;
            color:#fff;
            cursor:pointer;
            font-size:17px;
            &:hover {
              // background-color: #2d5e92;
              text-shadow: 0 0 4px #f2f2f2;
            }
          }
          .items.active {
              background-color: #265488;
          }
          .user-ctrl.items {
            position: absolute;
            right:0;
            top:-52px;
            padding-right:25px;
            color: #555;
            font-size:15px;
          }
          .not-login {
            display:flex;
            align-items:center;
            img.avatar {
              display: block;
              width:35px;
              height:35px;
              border-radius:50%;
              border:1px solid #ccc;
            }
            .role-name {
              min-width:70px;
              max-width:110px;
              margin:0 0 0 5px;
              &:hover {
                color:#456ea5;
              }
            }
            .user-login-out {
              color:#bbb;
              &:hover {
                color:#555;
              }
            }
          }
          .login-register {
              color:#456ea5;
              &:hover {
                color:#6a7ec7;
              }
          }
      }
      .logo-a {
          position: absolute;
          top:-50px;
          left:20px;
          a>img {
            display:block;
            width:79px;
            // height:88px;
            // height:100px;
            // object-fit: cover; //居中
            // object-fit:fill; //占满 拉伸或压缩 ===img实际设定
            object-fit:contain;   //最小方向占满(如果没设高度则按比例)
            // object-fit:scale-down; //最中间按实际高度 （有宽高则图片大的一侧向占满）
          }
          .logo-b {
              position: absolute;
              top:5px;
              right:0px;
              transform: translateX(100%);
              a>img {
                display:block;
                width:140px;
                object-fit:scale-down;
              }
          }
      }
      .down-btn {
        position: absolute;
        right:22px;;
        top:10px;
        // background-color: lime;
        width:32px;
        height: 32px;
        line-height: 32px;
        text-align:center;
        font-size:27px;
        display:none;
        color:#ddd;
        // border:1px solid #ddd;
      }

    }
    @media screen and (max-width:768px){
        .my-menu {
          .m-view {
            padding-top: 52px;
          }
          .my-menu-list {
              padding-left:0px;
              padding-top:1px;
              display:block;
              height:0px;
              overflow: hidden;
              // transition-property:all;
              // transition-duration: 0.5s;
              a {
              }
              .items {
                height:47px;
                line-height: 47px;
                padding:0 28px;
                border-bottom:1px solid #6a7ec7;
              }
              .items.active {
                background-color: #495c70;
              }
              .user-ctrl.items {
                position: relative;
                right:0;
                top:0px;
                padding-right:15px;
                color:#ddd;
              }
              .not-login {
                display:flex;
                align-items:center;
                img.avatar {
                }
                .role-name {
                  color:#ddd;
                }
                .user-login-out {
                  .el-dropdown-link {
                    color:#ddd;
                  }
                }
              }

          }
          .down-btn {
            display:block;
          }
          .my-menu-list.active{
              height:auto;
              border-top:1px solid #c0c0c0;
          }

        }
    }
    @media screen and (max-width:360px){
        .my-menu {
          .my-menu-list {
          }
        }
    }

}
</style>
<style>
    ul.el-dropdown-menu{
      /*top:34px !important;*/
      padding:1px;
    }
    ul.el-dropdown-menu>li {
        line-height: 32px;
    }
    ul.el-dropdown-menu>li:first-child {
        border-bottom:1px solid #eee;
    }
    el-dropdown-menu__item {
        line-height: 25px !important;
    }
</style>
