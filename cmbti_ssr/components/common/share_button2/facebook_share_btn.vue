<template>
  <span class="facebook" title="在facebook上分享">
    <a class="fb-xfbml-parse-ignore" target="_blank" :href="share_url">
      <img src="/img/team29.png">
    </a>
  </span>
</template>

<script>
export default {
  name: "facebook_share_btn",
  data() {
    return {
      share: "",
      share_url: ""
    };
  },
  mounted() {
    this.share_url =
      "https://facebook.com/sharer/sharer.php?u=" + window.location.host + "";
  }
};
</script>

<style scoped lang="less">
@media screen and(max-width: 414px) {
  .facebook {
    margin-left: 0 !important;
  }
}
.facebook {
  position: relative;
  display: inline-block;
  max-width: 38px;
  max-height: 38px;
  width: 100%;
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
  margin-left: 15px;
  vertical-align: middle;
  a {
    color: white;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .fb-share-button {
    z-index: 999;
    opacity: 0;
    position: absolute;
    left: 0;
    transform: translateX(30%);
    top: -20%;
  }
  .charater {
  }
}
</style>
