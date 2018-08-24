<template>
  <div class="account">
    <div class="my-nav">
      <div class="bx">
        <nav class="navbar navbar-default">
          <div class="container-fluid" style="padding-left:0">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <!--<a class="navbar-brand" href="javascript:;" v-if="1">
                  <div class="logo-a">
                      <a href="www.baidu.com" target="_blank">
                          <img src="" alt="">
                      </a>
                      <div class="logo-b">
                          <a href="www.baidu.com" target="_blank">
                              <img src="" alt="" style="height:38px">
                          </a>
                      </div>
                  </div>

              </a>-->
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="padding-left:0">
              <ul class="nav navbar-nav nav-list">
                <li index='0'>
                  <router-link to="/my/user/dashboard">
                    <i class="fa fa-pie-chart"></i> 總覽
                  </router-link>
                </li>
                <li index='1'>
                  <router-link to="/my/user/info">
                    <i class="fa fa-user" style="font-size:16px"></i> 資料
                  </router-link>
                </li>
                <li index='2'>
                  <!--<router-link to="/my/article/list" >-->
                  <router-link to="/my/article/list?Tag=&pageIndex=1">
                    <i class="fa fa-file-text" style="font-size:13px"></i> 文章
                  </router-link>
                </li>
                <li index='3'>
                  <router-link to="/my/record?pageIndex=1&type=-1">
                    <img src="/static/img/my_record_icon.png" alt="" style="margin-top:-5px;width:18px;"> 點閱
                  </router-link>
                </li>
                <li index='4'>
                  <router-link to="/my/share?pageIndex=1">
                    <i class="fa fa-thumbs-up" style="font-size:16px"></i> 好文
                  </router-link>
                </li>
                <li index='5'>
                  <router-link to="/my/payment/income?pageIndex=1">
                    <img src="/static/img/my_payment_icon.png" alt="" style="height:14px;margin-top:-2px"> 收益
                  </router-link>
                </li>
                <li index='6'>
                  <router-link to="/my/referral">
                    <img src="/static/img/my_referral_icon.png" alt="" style="height:14px;margin-top:-2px"> 下缐
                  </router-link>
                </li>
                <li index='7'>
                  <router-link to="/my/task">
                    <img src="/static/img/task.png" alt="" style="height:14px;margin-top:-2px"> 任務
                  </router-link>
                </li>
                <li index='8'>
                  <router-link to="/my/rankingList">
                    <img src="/static/img/ranking.png" alt="" style="height:14px;margin-top:-2px"> 排行榜
                  </router-link>
                </li>
                <li index='9'>
                  <router-link to="/my/palyGames">
                    <img src="/static/img/playgame.png" alt="" style="height:14px;margin-top:-2px"> 游戲
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
              <i class="glyphicon glyphicon-menu-right"></i>
            </router-link>
          </div>
        </nav>
      </div>

    </div>

    <div style="min-height:555px;width:100%;" v-loading="loading">
      <router-view v-if="showChild"></router-view>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueHtml5Editor from "vue-html5-editor";
import editorConfig from "vue-html5-editor";
Vue.use(VueHtml5Editor, editorConfig);
import accountAxios from "../../axios_joggle/axios_account";
export default {
  data() {
    return {
      showChild: false,
      loading: false,
      fullPath: "",
      //配置路由正则
      routeObj: {
        "0": "/my/user/dashboard",
        "1": "/my/user/info",
        "2": "/my/article",
        "3": "/my/record",
        "4": "/my/share",
        "5": "/my/payment",
        "6": "/my/referral",
        "7": "/my/task",
        "8": "/my/rankingList",
        "9":"/my/palyGames"
      },
      loadChild: false
    };
  },
  components: {},
  watch: {
    "$route.path": "changeRoute",
    "$store.state.refreshUserInfo": function() {
      if (this.$store.state.refreshUserInfo) {
        this.getUserInfo(() => {
          this.$store.state.refreshUserInfo = false;
          // console.log('获取成功');
        });
      }
    }
  },
  methods: {
    //路由改变处理
    changeRoute() {
      //获取第一个//中的字段
      let currentPath = this.$route.path;
      let index = "";
      for (let key in this.routeObj) {
        if (currentPath.indexOf(this.routeObj[key]) !== -1) {
          index = key;
        }
      }
      this.setNavStyle(index);
      // this.activeIndex = index;
    },
    //设置主导航
    setNavStyle(currentIndex) {
      document.querySelectorAll(".nav-list>li").forEach((v, i) => {
        if (v.getAttribute("index") == currentIndex) {
          v.classList.add("c-active");
        } else {
          v.classList.remove("c-active");
        }
      });
    },
    // 自动登录 （开发测试用）
    login() {
      accountAxios
        .login({
          loginName: "18566086988@163.com",
          loginPwd: "123456`tyl"
        })
        .then(res => {
          console.log(res);
          this.getUserInfo();
        })
        .catch(err => {
          console.log("error!", err);
        });
    },
    //获取个人资料
    getUserInfo(callback) {
      this.$NProgress.start();
      accountAxios.userInfo({}).then(res => {
        if (res.data.ResultCode == 200) {
          localStorage.setItem("user_info", JSON.stringify(res.data.Data));
          this.$store.state.user_info = res.data.Data;
          this.$NProgress.done();
          // this.init()  //重新初始化頁面
          callback && callback();
        }
      });
    },
    //初始化函数
    init() {
      if (localStorage.getItem("user_info")) {
        this.getUserInfo(() => {
          this.showChild = true;
        });
      } else {
        this.$message({
          showClose: true,
          message: "請先登錄",
          type: "warning"
        });
        this.$router.push({ path: "/user/login" });
      }
    }
  },
  mounted() {
    this.changeRoute();
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
.account {
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
        }
        i {
          display: inline-block;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          line-height: 19px;
          border: 1px solid #fff;
          font-size: 12px;
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
}
</style>
