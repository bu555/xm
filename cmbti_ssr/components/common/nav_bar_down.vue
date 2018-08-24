<template>

  <div class="nav_down_footer" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">


    <div class="col-xs-12 media_user_info" style="display: none" v-if="$store.state.judge_login==true">
          <headerLogin></headerLogin>
    </div>
    <div class="row all_type" >
      <ul class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-for="(item,index) in $store.state.nav_type" :key="index">
        <li>
          <router-link :to="{path:'/tag/'+item.TagName}" >{{item.TagName}}</router-link>
        </li>
      </ul>
    </div>
    <div class="btn" v-if="$store.state.judge_login==false">
      <router-link to="/user/login" class="login_btn">
        登錄
      </router-link>
      <router-link to="/user/register" class="register_btn">
        注冊
      </router-link>
    </div>

  </div>

</template>

<script>
  import headerLogin from "./oops_header_login";
  export default {
    name: "nav_bar_down",
    components:{
      headerLogin
    }
  }
</script>

<style scoped lang="less">
  @media screen and(max-width: 768px) {
    .nav_down_footer {
      padding: 20px 1.5vw !important;
      .media_user_info{
        display: block !important;
      }
      .all_type {
        ul {
          li{
            text-align: center !important;
          }
        }
      }
      .btn {
        display: block !important;
      }
      .contact {
        /*display: none;*/
        >.float-left {
          float: none;
          .float-left {
            float: none;
          }
          .division {
            display: none
          }
        }
        >.float-right{
          float: none;
          margin-top: 10px;
          >.float-right{
            float: none;
            display: inline-block;
          }
        }
      }
    }

  }
  .router-link-active{
    display: inline-block;
    width: 50%;
    border-radius: 30px;
    /*background: rgb(10, 83, 162);*/
    color:  rgb(10, 83, 162) !important;
    /*background: red;*/
  }
  .nav_down_content {
    width: 100%;
    border-bottom: 1px solid #e5e5e5;

    ul {
      padding: 0 58px;
      margin: 30px 0;
      text-align: center;
      li {
        margin: 0;
        a {
          color: #888888;
        }
      }
    }
    :last-child {
      border-right: none;
    }
  }

  .nav_down_footer {
    padding: 30px;
    width: 100%;
    background: white;
    .user_message {
      font-size: 14px;
      color: #9a9a9a;
    }
    .col-xs-4,.col-xs-12{
      padding: 0;
    }
    .row{
      margin: 0;
    }
    .all_type {
      padding-bottom: 20px;
      ul {

        li {
          padding: 5px 0;
          text-align: left;
          a {
            /*font-size: 16px;*/
          }
        }
      }
    }
    .btn {
      width: 100%;
      padding: 0;
      display: none; //默認隱藏  等變小屏幕在顯示
      a {
        display: block;
        height: 48px;
        line-height: 48px;
        width: 100%;
        text-decoration: none;
        border-radius: 3px;
      }
      .login_btn {
        background: rgb(238, 238, 238);
        color: rgb(130, 130, 130);
      }
      .register_btn {
        background: rgb(70, 138, 237);
        color: white;
        margin-top: 10px;
      }
    }
    ul {
      margin-bottom: 0;
      li {
        margin: 0;
        color: #d2d2d2;
        a {
          color: #9a9a9a;
          font-size: 13px;
        }
      }
      .division {
        margin: 0 15px;
      }
    }
  }
</style>
