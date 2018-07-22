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
                <div :class="$route.path.indexOf('/user/forget')>-1?'active':''">
                    <router-link to="/user/forget">找回密码</router-link>
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
  created() {
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false);
  }
};
</script>
<style lang="less">
.user {
    // background-color: #e7e8eb;;
    background:url("/static/img/bg_1.png");
    padding-bottom:15px;
    margin-top:-15px;
    position: relative;
    top:15px;
    .user-header {
        // border-bottom:1px solid #456ea5;
        border-bottom:2px solid #ced9e8;
        margin-bottom:0px;
        background:rgba(0,75,157,.03);
        &:after,&:before {
            content:"";
            display:block;
            position: absolute;
            height:1px;
            width:100%;
            background-color: #ced9e8;
        }
        &:after {
            background-color: #ced9e8;
            top:74px;
            left:0px;
        }
        &:before {
            height:2px;
            background-color: #ced9e8;
            top:77px;
        }
    }
    .user-header-main {
        max-width:992px;
        height:90px;
        position: relative;
        margin:0 auto;
      .logo-a {
          position: absolute;
          top:2px;
          left:20px;
          z-index:2;
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
                flex:0 0 20%;
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



