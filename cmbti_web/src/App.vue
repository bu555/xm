<template>
  <div id="app">
    <!--<el-header style="padding:0">-->
        <com-nav/>
    <!--</el-header>-->
    <div class="router-view">
        <router-view> </router-view>
    </div>
    <!--<v-footer/>-->
  </div>
</template>

<script>
import comNav from "@/components/comNav";
import footer from "@/components/footer";
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
        document.querySelector('#app').style.width = initWidth+'px';
        document.querySelector('.router-view').style.minHeight = initRouterHeight+'px';
    } 
  },
  mounted(){
      this.initpage();
  }
}
</script>

<style lang="less">
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
      width:1000px;
      margin:0 auto;
      background-color: #fff;
      .router-view {
        //   min-height:255px;
      }
    }
</style>
