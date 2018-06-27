<template>
  <div class="my-nav-v2">

      <div class="my-menu">
         <div class="m-view">
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
                <div class="items user-ctrl">
                  <div v-if="0">登录 / 注册</div>
                  <div v-else class="not-login">
                      <img class="avatar" src="../../../static/img/logo_a.png" alt="">
                      <div class="role-name overflow-row-1">中华人民共和国合同法</div>
                      <div class="user-login-out">
                        退出
                        <div>
                          <router-link to="">

                          </router-link>
                        </div>
                      </div>

                  </div>
                </div>
            </div>
            <div class="down-btn" @click="showDownMeun=!showDownMeun">下来</div>
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
      '$route.path':'changeRoute',
  },
  methods: {
    toggleDown(){

    }
  },
  mounted() {
  },
  created(){
    this.init()
  }
}
</script>

<style lang="less">
.my-nav-v2 {
    padding-top:1px;
    .my-menu {
      margin-top:47px;
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
          position: relative;
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
            top:-47px;
            padding-right:25px;
            color: #555;
            font-size:15px;
          }
          .not-login {
            display:flex;
            align-items:center;
            img.avatar {
              display: block;
              width:32px;
              height:32px;
              border-radius:3px;
              border:1px solid #ccc;
            }
            .role-name {
              min-width:70px;
              max-width:120px;
              margin:0 5px;
              &:hover {
                color:#456ea5;
              }
            }
            .user-login-out {
              color:#bbb;
              margin-left:12px;
              &:hover {
                color:#555;
              }
            }
          }
      }
      .logo-a {
          position: absolute;
          top:-48px;
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
        display:none;
      }

    }
    @media screen and (max-width:768px){
        .my-menu {
          .my-menu-list {
              padding-left:0px;
              padding-top:1px;
              display:block;
              position: relative;
              top:52px;
              left:0;
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
          }
          .down-btn {
            display:block;
          }
          .my-menu-list.active{
              height:338px;
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