<template>
    <div class="my-nav">
        <div class="bx">
            <nav class="navbar navbar-default">
            <div class="container-fluid" style="padding-left:0">
                <!-- Brand and toggle get grouped for better mobile display -->

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="padding-left:0">
                <ul class="nav navbar-nav nav-list">
                    <li index='0' :class="$route.path.indexOf('/my/user/dashboard')>-1?'c-active':''">
                    <router-link to="/my/user/dashboard">
                        <i class="fa fa-pie-chart"></i> 總覽
                    </router-link>
                    </li>
                    <li index='1' :class="$route.path.indexOf('/my/user/info')>-1?'c-active':''">
                    <router-link to="/my/user/info">
                        <i class="fa fa-user" style="font-size:16px"></i> 資料
                    </router-link>
                    </li>
                    <li index='2' :class="$route.path.indexOf('/my/article/')>-1?'c-active':''">
                    <!--<router-link to="/my/article/list" >-->
                    <router-link to="/my/article/list?Tag=&pageIndex=1">
                        <i class="fa fa-file-text" style="font-size:13px"></i> 文章
                    </router-link>
                    </li>
                    <li index='3' :class="$route.path.indexOf('/my/record')>-1?'c-active':''">
                    <router-link to="/my/record?pageIndex=1&type=-1">
                        <img src="/img/my_record_icon.png" alt="" style="margin-top:-5px;width:18px;"> 點閱
                    </router-link>
                    </li>
                    <li index='4' :class="$route.path.indexOf('/my/share')>-1?'c-active':''">
                    <router-link to="/my/share?pageIndex=1">
                        <i class="fa fa-thumbs-up" style="font-size:16px"></i> 好文
                    </router-link>
                    </li>
                    <li index='5' :class="$route.path.indexOf('/my/payment/income')>-1?'c-active':''">
                    <router-link to="/my/payment/income?pageIndex=1">
                        <img src="/img/my_payment_icon.png" alt="" style="height:14px;margin-top:-2px"> 收益
                    </router-link>
                    </li>
                    <li index='6' :class="$route.path.indexOf('/my/referral')>-1?'c-active':''">
                    <router-link to="/my/referral">
                        <img src="/img/my_referral_icon.png" alt="" style="height:14px;margin-top:-2px"> 下缐
                    </router-link>
                    </li>
                    <li index='7' :class="$route.path.indexOf('/my/task')>-1?'c-active':''">
                    <router-link to="/my/task">
                        <img src="/img/task.png" alt="" style="height:14px;margin-top:-2px"> 任務
                    </router-link>
                    </li>
                    <li index='8' :class="$route.path.indexOf('/my/rankingList')>-1?'c-active':''">
                    <router-link to="/my/rankingList">
                        <img src="/img/ranking.png" alt="" style="height:14px;margin-top:-2px"> 排行榜
                    </router-link>
                    </li>
                    <li index='9' :class="$route.path.indexOf('/my/palyGames')>-1?'c-active':''">
                    <router-link to="/my/palyGames">
                        <img src="/img/playgame.png" alt="" style="height:14px;margin-top:-2px"> 游戲
                    </router-link>
                    </li>
                    <!--<li class=""  index='6'>
                    <router-link to="/my/message',query:$route.query}">
                    消息
                    </router-link>
                    </li>-->
                </ul>
                <ul>
                    <li class="dropdown" v-if="0">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                        <a href="#">
                            <i class="glyphicon glyphicon-user"></i> 个人中心</a>
                        </li>
                        <li>
                        <a href="#">
                            <i class="glyphicon glyphicon-wrench"></i> 修改密码</a>
                        </li>
                        <!--<li>
                        <a href="#">Something else here</a>
                        </li>-->
                        <li role="separator" class="divider"></li>
                        <li>
                        <a href="#" @click="exitLogin()">
                            <i class="glyphicon glyphicon-log-out"></i> 退出</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
            <div class="go-index-pc">
                <router-link to="/">
                OopsDaily首頁
                <i class="el-icon-arrow-right"></i>
                </router-link>
            </div>
            </nav>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
      path(){
          return this.$route.path
      }
    },
    mounted(){
       
    },
    created(){
    }

}
</script>

<style lang="less">
  .my-nav {
    background-color: #0a53a2;
    .navbar {
      margin: 0 auto;
      max-width: 1180px;
      margin-bottom: 0px;
      position: relative;
      .go-index-pc {
        position: absolute;
        right: 0px;
        top: 14px;
        vertical-align: middle;
        padding: 0 12px;
        a {
          color: #fff;
          background-color: transparent !important;
          &:hover {
            color:#eee;
            text-shadow: 1px 1px 1px #fff;
          }
        }
        i {
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          line-height: 18px;
          border: 1px solid #fff;
          font-size: 12px;
          text-align:center;
        }
      }
      .navbar-header {
        // padding: 0 70px;
        position: relative;
        .logo-a {
          position: absolute;
          top: -48px;
          left: 3.2px;
          .logo-b {
            position: absolute;
            top: 5px;
            right: -160px;
            // @media screen and (max-width:992px) {
            //   display:none;
            // }
          }
        }
      }
      .navbar-nav {
        // padding-left: 170px;
        padding-left: 7.52px;
        a:hover {
            text-shadow: 0px 1px 1px #fff;
          }
      }
    }
    .navbar.navbar-default {
      background-color: #0a53a2;
      border: none;
    }

    .navbar-default .navbar-nav > li > a {
      color: #fff !important;
    }
    .c-active {
      background-color: #053871 !important;
      // text-align:left;
      // color: red;
    }
    .router-link-active {
      // background-color: #053871 !important;
      // text-align:left;
      // color: red;
    }
    // .navbar-default .navbar-nav>.active>a {
    //   background-color: #456ea5;
    // }
    .navbar-default .navbar-nav > .open > a,
    .navbar-default .navbar-nav > .open > a:focus,
    .navbar-default .navbar-nav > .open > a:hover {
      color: #fff;
      background-color: transparent;
      background-color: rgba(255, 255, 255, 0.2);
      background-color: rgba(0, 0, 0, 0.1);
    }
    .navbar-default .navbar-nav > .active > a {
      color: #fff; // background-color: #456ea5;
    }
    .navbar-default .navbar-toggle .icon-bar {
      background-color: #eee;
    }
    .navbar-default .navbar-toggle:focus,
    .navbar-default .navbar-toggle:hover {
      background-color: transparent;
    }

    .dropdown > a > a {
      color: #fff !important;
    }
    a:active {
      color: #fff;
    }
    /*点击时状态 。*/
    .navbar-nav > li > .dropdown-menu a {
      color: #1a1a1a;
    }
    a:link {
      color: #1a1a1a;
    }
    /*未访问时的状态 。*/
    a:visited {
      color: #1a1a1a;
      text-decoration: none;
    }
    /* 已访问过的状态 。*/
    a:hover {
      color: #1a1a1a;
      text-decoration: none;
    }
    .nav-list {
        display:flex;
        li {
          height:50px;
          line-height: 50px;
        }
    }
    .nav-list > li > a {
      padding-left: 22px;
      padding-right: 22px;
    }
    .navbar-default .navbar-nav > .active > a,
    .navbar-default .navbar-nav > .active > a:focus,
    .navbar-default .navbar-nav > .active > a:hover {
      color: #fff;
      background-color: #456ea5;
    }
    .my-nav a:hover,
    .my-nav a:visited {
      color: #fff;
      text-decoration: none;
    }
    .navbar-default .navbar-nav > li > a:focus,
    .navbar-default .navbar-nav > li > a:hover {
      color: #fff;
    }

    @media (max-width: 992px) {
      .nav-list > li > a {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    @media (max-width: 768px) {
      .go-index-pc {
        margin-right: 35%;
      }

      .navbar-default .navbar-nav .open .dropdown-menu > li > a {
        color: #eee;
      }
      .nav-list > li > a {
        text-align: left;
        padding-left: 70px !important;
      }
    }

  }


</style>
