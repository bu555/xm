<template>
    <span class="twitter" title="在twitter上分享">
              <a
                class="twitter-share-button"
                :href="web_url"
                target="_blank"
                data-size="large">
                <img src="/img/team30.png" alt="">
              </a>
          </span>
</template>
<script>
  export default {
    name: "twitter_share_btn",
    data() {
      return {
        share: "",
        web_url: ""
      }
    },
    mounted() {
      this.web_url = "javascript: void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.host))));"

    }
  }
</script>

<style scoped lang="less">
@media screen and(max-width: 414px) {
  .twitter{
    margin-left: 5px !important;
  }
}
  .twitter {
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
      text-decoration: none;
      img {
        width: 100%;
      }
    }
  }
</style>
