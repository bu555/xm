<template>
  <div class="share1">
    <el-button type="warning" round id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      邀請好友
      <span class="caret"></span>
    </el-button>
    <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenu1">
      <li>
        <div id="share_facebooka"></div>
      </li>
      <li>
        <div id="share_googleplusa"></div>
      </li>
      <li>
        <div id="share_twittera"></div>
      </li>
      <li>
        <div id="share_linkedina"></div>
      </li>
      <li>
        <div id="share_emaila"></div>
      </li>
      <li>
        <div id="share_pinteresta"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import share_btn from "@/axios_joggle/axios_click_share";
export default {
  data() {
    return {
      shareId: ""
    };
  },
  watch: {
    $route: function() {
      this.control_share();
    }
  },
  methods: {
    // 控制分享按鈕  val -> 當前地址
    control_share() {
      let shareid = localStorage.getItem("ShareID")
        ? localStorage.getItem("ShareID")
        : "";
      let a = "";
      if (shareid) {
        a = "?r=" + shareid;
      }
      let val =process.env.API_HOST+"/user/register" + a;
      let that = this;
      $("#share_emaila").jsSocials({
        shares: ["line"],
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_twittera").jsSocials({
        shares: ["twitter"],
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_facebooka").jsSocials({
        shares: ["facebook"],
        showCount: false,
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_googleplusa").jsSocials({
        shares: ["googleplus"],
        showCount: false,
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_linkedina").jsSocials({
        shares: ["whatsapp"],
        showCount: false,
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_pinteresta").jsSocials({
        shares: ["pinterest"],
        showCount: false,
        shareIn: "blank",
        url: val,
        text:"",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
    },
    share() {
      share_btn
        .click_share({ RelationID: this.$route.params.RelationID })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    
    this.control_share();
    
  },
};
</script>
<style lang="less">

.share1 .dropdown-menu {
  width: 100%;
  max-width: 130px;
  min-width: 130px !important;
  padding: 0 8px !important;
  transform: translateX(16%);
  li {
    text-align: center;
    width: 100%;
    .jssocials-share {
      width: 100%;
      a {
        width: 100%;
        display: inline-block;
      }
    }
  }
}
</style>
