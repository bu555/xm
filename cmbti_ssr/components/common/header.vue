<template>
  <div class="oops_header" onselectstart="return false">
    <div class="oops_header_content">
      <div class="container head1">
        <div class="oops_title">
          <div class="oops_title_left" style="cursor: pointer">
            <router-link to="/">
              <span>OopsDaily</span>
              <span class="media_none" style="font-weight: 100;font-family: 'SimSun">|</span>
              <span class="media_none" style="font-family: 'SimSun'">文章創作分享平臺</span>
            </router-link>
          </div>
          <!--右侧登录、登录信息显示模块-->
          <div class="oops_title_right">
            <headerLogin></headerLogin>
          </div>
        </div>

      </div>

    </div>
    <!--<div class="nav_bar">
      <nav_bar/>
    </div>-->
  </div>

</template>

<script>
import headerLogin from "./header_login";

export default {
  data() {
    return {
      nav_select: [
        { name: "娛樂", CategoryID: 1 },
        { name: "興趣", CategoryID: 2 },
        { name: "生活", CategoryID: 3 },
        {
          name: "科技",
          CategoryID: 4
        },
        { name: "奇趣", CategoryID: 5 },
        { name: "新聞", CategoryID: -1 }
      ],
      nav_other_select: {
        // item1: ["國際", "國際", "國際", "國際", "國際", "國際"],
      },
      nav_down: false, // 用來切換導航欄的隱藏
      nav_down_icon: "fa fa-bars",
      user_info: {
        name: "未命名"
      },
      
    };
  },
  components:{
    headerLogin
  },
  watch: {
    
  },
  filters: {
    incomeMoney(val) {
      if (parseInt(val) >= 999999) {
        val
        return "999999...";
      } else {
        return val;
      }
    }
  },
  created() {
    // vuex是状态管理 一刷新就没了  此步骤当记录
    if (localStorage.getItem("ShareID")) {
      this.$store.state.judge_login = true;
    } else {
      this.$store.state.judge_login = false;
    }

    if (localStorage.getItem("user_info")) {
      this.user_info = JSON.parse(localStorage.getItem("user_info"));
    }
  },
  mounted() {
    // 判斷是否存在shareID  也就是是否登錄
    let shareID = localStorage.getItem("ShareID");
    if (shareID) {
      this.judge_login = true;
    } else {
      this.judge_login = false;
    }
  },
    methods:{
    },
  created() {}
};
</script>

<style scoped lang="less">
.media_user_none {
  display:flex;
  align-items: center;
  justify-content: flex-end;
}
@media screen and (max-width: 768px) {
  .oops_header_content {
    display: none;
  }

  .media_user_none {
    display: none;
  }

  .media_user_block {
    display: block !important;
  }
}

@media screen and(max-width: 1000px) {
  .media_none {
    display: none;
  }
}

.oops_header {
  background: white;
  .oops_header_content {
    height: 72px;
    .user_message {
      margin-left: 24px;
      font-size: 14px;
      color: #9a9a9a;
    }

    // 用戶 下拉
    .dropdown-menu {
      // left: -150px;
    }
    .subscript {
      a {
        line-height: 16px;
      }
    }
    .container {
      max-width: 1180px;
      /*width: 1180px;*/
      /*max-width: 1180px;*/
      margin: 0;
      padding: 0;
      margin: 0 auto;
    }
    .oops_title {
      max-width: 1180px;
      margin: 0 auto;
      height: 72px;
      background-color: #ffffff;
      display:flex;
      justify-content: space-between;
      .oops_title_left {
        flex:0 0 290px;
        height:100%;
        line-height: 72px;
        text-align: left;
        padding-left: 0;
        a {
          text-decoration: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        :nth-child(1) {
          font-size: 24px;
          font-weight: 600;
          color: #0954a2;
        }
        :nth-child(2) {
          color: #a4a4a4;
          margin: 0 8px;
        }
        :nth-child(3) {
          color: #a4a4a4;
          font-size: 14px;
        }
      }
      .oops_title_right {
          height:100%;
         flex:1;
      }

    }
    .oops_navs {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background-color: #0954a2;
      margin: 0;
      position: relative;
      .container {
        background-color: #0954a2;
        li {
          width: 90px;
          height: 100%;
          text-align: center;

          a {
            color: white;
            font-size: 14px;
          }
        }
        li:hover {
          background: rgb(70, 138, 237);
        }
        .col-1 {
          div {
            width: 50px;
          }
          div:hover {
            background-color: #043970;
            cursor: pointer;
          }
        }
      }
    }
    #login-register {
      height:72px;
      display: flex;
      align-items:center;
    }
  }
  #login-register {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 768px) {
    .login_btn,
    .register_btn {
      width: 62px !important;
    }
    .oops_title_right {
        margin:0 -15px !important;
    }
    padding-left: 2% !important;
    padding-right: 2% !important;
  }
  @media screen and (max-width:992px) {
      .oops_title_left {
          flex:0 0 140px !important;
      }
  }
}
</style>
