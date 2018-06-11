<template>
  <div class="root-app">
      <myNav></myNav>
      <router-view class="router-view"></router-view>
      <myFooter></myFooter>
      <div v-if="$store.state.modalLogin">
        <loginModal></loginModal>
      </div>
  </div>
</template>

<script>
import myNav from './components/common/nav'
import myFooter from './components/common/footer'
import loginModal from '../src/components/user/user_login_modal'
export default {
  name: 'App',
  data(){
      return {
        routerHeight:400
      }
  },
  components: {
    myNav,
    myFooter,
    loginModal
  },
  methods:{

    //设置html  font-size
    setHtmlFontSize(){
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;  
        // 以iphone6宽360设计  1rem等于100px
        if(view_width>1100){
          view_width = 1100;
        }
        document.getElementsByTagName('html')[0].style.fontSize = Math.round(view_width/3.6) +'px';
    },
    setMinHeight(){
        var view_height = document.documentElement.clientHeight?document.documentElement.clientHeight : ''; 
        if(view_height){
            view_height = view_height - 175;
            if(this.routerHeight < 400){
              return;
            }else{
              this.routerHeight = view_height;
            };
        }
    }
  },
  mounted(){
    // $('.router-view').css('minHeight',this.routerHeight+'px');
  },
  created(){
    let _this = this;
    _this.setHtmlFontSize();
    _this.setMinHeight();
    $(window).resize(function(){  
        _this.setHtmlFontSize() 
    })
    
  }
}
</script>

<style lang="less">
    @import '../static/css/my-element.less'; //引入全局less文件
    .root-app {
      // background:url('/static/img/bg_1.png');
      background:#f0f0f0;
      a {text-decoration:none;color:#333 }
      a:focus {color:#538dd5;text-decoration:none}  /*点击时状态 。*/
      a:active {color:#538dd5;text-decoration:none}  /*点击时状态 。*/
      a:link {color: #1a1a1a;text-decoration:none}   /*未访问时的状态 。*/
      a:visited {color: #1a1a1a;text-decoration:none} /* 已访问过的状态 。*/
      a:hover {color: #1a1a1a;text-decoration:none} 
      .router-view {
        margin-bottom:12px;
        overflow: hidden;
        min-height:420px
      }
      font-size:16px;
      @media screen and (max-width:768px){
         font-size:17px;
      }


    }
</style>
