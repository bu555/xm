<template>
  <span class="google" title="在google上分享">
    <a target="_blank" @click="skip_page" :href="web_url">
      <img src="/img/team31.png" alt="">
    </a>
  </span>
</template>

<script>
export default {
  name: "google_share_btn",
  data() {
    return {
      share: "",
      web_url: ""
    };
  },
  props: ["share_path"],
  mounted() {
    this.web_url = "https://plus.google.com/share?url=" + window.location.host;
  },
  methods: {
    skip_page() {
      this.web_url =
        "https://plus.google.com/share?url=" + window.location.host;
      window.open(
        this.web_url,
        "",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
      );
    }
  }
};
</script>

<style scoped lang="less">
@media screen and (max-width: 414px) {
  .google {
    margin-left: 5px !important;
  }
}
.google {
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
