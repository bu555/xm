<template>
    <span class="pinterest" title="在pinterest上分享">
        <!-- <a target="_blank" @click="skip_page" :href="web_url">
            <img src="/static/img/team4.png" alt="">
        </a> -->
        <a :href="web_url" target="_blank" data-pin-do="buttonBookmark" data-pin-shape="round" data-pin-height="28"><img src="/img/team32.png" alt=""></a>
        <!-- href="//www.pinterest.com/pin/create/button/" -->
    </span>
</template>

<script>
export default {
  name: "pinterest_share_btn",
  data() {
    return {
      share: "",
      web_url: ""
    };
  },
  props: ["share_path"],
  mounted() {
    this.web_url =
      "//www.pinterest.com/pin/create/bookmarklet/?&url=" +
      window.location.host;
  }
};
</script>

<style scoped lang="less">
@media screen and(max-width: 414px) {
  .pinterest{
    margin-left: 5px !important;
  }
}
.pinterest {
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
