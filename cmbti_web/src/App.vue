<template>
  <div class="root-app" v-if="showPage">
      <myNav v-if="$route.path.indexOf('/user/')===-1"></myNav>
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
        routerHeight:400,
        showPage:true
      }
  },
  components: {
    myNav,
    myFooter,
    loginModal
  },
  watch: {
    "$route.fullPath": "getMeta",
    // 模态框登录成功后，刷新当前页
    "$store.state.modalLoginSuccess":function(){
        if(this.$store.state.modalLoginSuccess===true){
            // this.showPage = false
            // setTimeout(()=>{
            //     this.showPage = true
            // },1)
            setTimeout(()=>{
                this.$store.commit('setModalLoginSuccess',false); 
            },222)
            
        }
    }
  },
  metaInfo() {
    return {
      title: this.$store.state.meta.title ,
      meta: this.$store.state.meta.meta ,
      link: this.$store.state.meta.link 
    };
  },
  methods:{
    getMeta(){
      let meta = {
          title: this.$route.path,
          meta: [
            {
              name: "keywords",
              content: "MBTI,人格,INTJ"
            },
            {
              name: "description",
              content: "人格类型"   //200字节左右,60汉字左右
            },
          ],
          link: [
            {
              rel: "prefetch",
              href: "www.baidu.com"
            }
          ],
          // <meta name="keywords" content="小火柴,蓝色理想,前端工程师,前端小站,HTML,CSS,JavaScript,HTTP,Vue,React,jQuery,Bootstrap">
          // <meta name="description" content="小火柴的前端小站是小火柴开发的一个前端学习网站，以自学前端的学习总结为基础，尽量囊括了前端体系涉及的内容，希望可以对读者有所帮助">
      }
      this.$store.commit("setMeta", meta);
    },

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
    },
    init(){
       if(localStorage.getItem('USER')){
          this.$store.commit('setUserInfo',JSON.parse(localStorage.getItem('USER')))
       }
    }
  },
  mounted(){
    // $('.router-view').css('minHeight',this.routerHeight+'px');
  },
  created(){
    this.init()
    this.getMeta()
  }
}
</script>

<style lang="less">
    @font-face {
      font-family: 'DINRegular';
      src: url('/static/fonts/DIN-Regular.ttf');
    }
    // @import '../static/css/my-element.less'; 
    .root-app {
      font-family:DINRegular;
      // background:url('/static/img/bg_1.png');
      // background:#f7f7f7;
      background:url('/static/img/bg2.png') repeat ;
          // background: #ececec url(../..//bbs_v4/images/bg.png) repeat fixed;
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

    * {
      box-sizing: border-box;
    }

    // 重写elementUI样式
    // 对话框
      .el-message-box {
          width:420px;
          border-radius:3px;
          @media screen and (max-width:500px) {
                width:80%;
          }
      }
      /*提示信息 样式*/
      .el-message {
          top: 122px;
          min-width:290px;
      }
</style>

