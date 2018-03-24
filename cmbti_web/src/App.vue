<template>
  <div class="root-app">
    <div class="nav-view">
          <com-nav/>
    </div>
    <div class="router-view">
        <router-view> </router-view>
    </div>
    <!--<v-footer/>-->
  </div>
</template>

<script>
import comNav from "@/components/common/comNav";
import footer from "@/components/common/footer";
export default {
  name: 'App',
  components: {
    comNav,
    "v-footer":footer
  },
  methods:{
    // 初始页面自适应
    initpage(){
        var initWidth = 1000;
        var html = document.getElementsByTagName('html')[0];
        var view_width = html.getBoundingClientRect().width;  
        var initRouterHeight = html.getBoundingClientRect().height - 60-128;  
        if(view_width<1000 && view_width>=960){
            initWidth = view_width;
        }else if(view_width<960){
            initWidth = 960;
        }
        // document.querySelector('#app').style.width = initWidth+'px';
        // document.querySelector('.router-view').style.minHeight = initRouterHeight+'px';
    } 
  },
  mounted(){
      this.initpage();
  }
}
</script>

<style lang="less">
    .root-app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
      min-height: 470px;
      margin:0 auto;
      background:#fcfcfc;
      .nav-view {
        width:100%;
        background-color:#538dd5;
      }
      .router-view {
        max-width:1055px;
        min-width:960px;
        margin:0 auto;
      }
    }
</style>
