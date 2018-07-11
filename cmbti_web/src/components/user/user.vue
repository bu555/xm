<template>
  <div class="user">
        <div class="user-header">
            <div class="user-header-main">
                <div class="logo-a">
                    <a href="/">
                        <img src="../../../static/img/logo_a.png" alt="">
                    </a>
                    <div class="logo-b">
                        <a href="/">
                            <img src="../../../static/img/logo_b.png" alt="" style="height:38px">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-tabs"> 
            <div class="tab-list">
                <div :class="$route.path.indexOf('/user/login')>-1?'active':''">
                    <router-link to="/user/login">登录</router-link>
                </div>
                <div :class="$route.path.indexOf('/user/register')>-1?'active':''">
                    <router-link to="/user/register">注册</router-link>
                </div>
                <div :class="$route.path.indexOf('/user/verify')>-1||$route.path.indexOf('/user/reset')>-1?'active':''">
                    <router-link to="/user/verify">找回密码</router-link>
                </div>
            </div>
        </div>
        <div class="user-view">
            <router-view></router-view>
        </div>
  </div>
</template>
<script>
import verify from "../../assets/verify"
export default {
  data() {
      return {
      }
  },
  mounted() {
  },

};
</script>
<style lang="less">
.user {
    background-color: #e7e8eb;;
    padding-bottom:15px;
    margin-top:-15px;
    position: relative;
    top:15px;
    .user-header {
        // border-bottom:2px solid #456ea5;
        margin-bottom:12px;
    }
    .user-header-main {
        max-width:992px;
        height:80px;
        position: relative;
        margin:0 auto;
      .logo-a {
          position: absolute;
          top:2px;
          left:20px;
          a>img {
            display:block;
            width:79px;
            object-fit:contain;   //最小方向占满(如果没设高度则按比例)
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
    }
    .user-tabs {
        max-width:992px;
        margin:0 auto;
        padding:1%;
        padding-bottom:0;
        background: #fefefe;
        .tab-list {
            display:flex;
            border-bottom:2px solid #bd5c3c;
            &>div {
                flex:0 0 18%;
                text-align:center;
                a {
                    display:block;
                    padding:10px 2px;
                }
            }
            &>div.active {
                background-color: #bd5c3c;
                a {
                    color:#fff;
                }
            }
        }
    }
    .user-view {
        max-width:992px;
        min-height:500px;
        background-color: #fefefe;
        margin:0 auto;
        overflow: hidden;
    }
    @media screen and (max-width:768px) {
        .user-tabs {
                .tab-list {
                    &>div {
                        flex:0 0 33.3%
                    }
                }
        }
    }

}
</style>



