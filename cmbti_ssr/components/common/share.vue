<template>
  <div class="share">
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      <i class="fa fa-share-alt"></i>
      分享到
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenu1">
      <li>
        <div id="share_facebook"></div>
      </li>
      <li>
        <div id="share_googleplus"></div>
      </li>
      <li>
        <div id="share_twitter"></div>
      </li>
      <li>
        <div id="share_linkedin"></div>
      </li>
      <li>
        <div id="share_email"></div>
      </li>
      <li>
        <div id="share_pinterest"></div>
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
      let val = window.location.host;
      let that = this;
      $("#share_email").jsSocials({
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
      $("#share_twitter").jsSocials({
        shares: ["twitter"],
        url: val,
        text:"123",
        shareIn: "blank",
        on: {
          click: function(e) {
            that.share();
          }
        }
      });
      $("#share_facebook").jsSocials({
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
      $("#share_googleplus").jsSocials({
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
      $("#share_linkedin").jsSocials({
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
      $("#share_pinterest").jsSocials({
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
        .click_share({ RelationID: this.$route.params.RelationID})
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
.share .dropdown-menu {
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
