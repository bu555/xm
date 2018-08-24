<template>
    <div>
        <ul>
            <li>
                <div id="share_email"></div>
            </li>
            <li>
                <div id="share_twitter"></div>
            </li>
            <li>
                <div id="share_facebook"></div>
            </li>
            <li>
                <div id="share_googleplus"></div>
            </li>
            <li>
                <div id="share_linkedin"></div>
            </li>
            <li>
                <div id="share_pinterest"></div>
            </li>
        </ul>
    </div>
</template>
<script>

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
      let val = window.location.href;
      let that = this;
      $("#share_email").jsSocials({
        shares: ["email"],
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
              that.share()
          }
        }
      });
      $("#share_twitter").jsSocials({
        shares: ["twitter"],
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
              that.share()
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
              that.share()
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
              that.share()
          }
        }
      });
      $("#share_linkedin").jsSocials({
        shares: ["linkedin"],
        showCount: false,
        url: val,
        text:"",
        shareIn: "blank",
        on: {
          click: function(e) {
              that.share()
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
              that.share()
          }
        }
      });
    },
    share() {
      share_btn
        .click_share({ RelationID: this.$route.params.RelationID)
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.control_share();
  }
}
</script>
