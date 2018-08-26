<template>
  <div class="root-app" v-if="showPage">
      <!-- <myNav v-if="$route.path.indexOf('/user/')===-1"></myNav> -->
      <router-view class="router-view"></router-view>
      <myFooter></myFooter>
      <div v-if="$store.state.modalLogin">
        <loginModal></loginModal>
      </div>
  </div>
</template>

<script>
import navMain from './components/common/nav_main'
import myFooter from './components/common/footer'
import loginModal from '../src/components/user/user_login_modal'
import copyHandler from './assets/copyHandler'
export default {
  name: 'App',
  data(){
      return {
        routerHeight:400,
        showPage:true
      }
  },
  components: {
    navMain,
    myFooter,
    loginModal
  },
  watch: {
    "$route.fullPath": "getMeta",
    // 通知退出
    "$store.state.loginOut":function(){
        if(this.$store.state.loginOut){
            this.loginOut()
        }
    },
    //通知模态框登录 或 退出模态框
    "$store.state.modalLogin":function(){
      if(this.$store.state.modalLogin){
          // 清除本地登录信息
          localStorage.setItem('USER','')
          this.$store.commit('setUserInfo','')
      }else{
        console.log('guan',this.$store.state.userInfo);
          if(!this.$store.state.userInfo && /^\/my/.test(this.$route.path) ){
            this.$router.push({
              path:'/'
            })
          }
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
      }
      this.$store.commit("setMeta", meta);
    },
    loginOut(){
      this.$axios.delSession().then(res=>{
        
      })
      localStorage.setItem('USER','')
      this.$store.commit('setUserInfo','')
      this.$router.push({
        path:'/'
      })
      setTimeout(()=>{
        this.$store.state.loginOut = false
      },2000)
        // if(/^\/my/.test(this.$route.path)){
        //    this.$router.push({
        //      path:'/forum?category=all&page=1'
        //    })
        // }

        // this.$message({
        //     message: '你已退出！',
        //     type: 'info'
        // });
    },
    init(){
       if(localStorage.getItem('USER')){
          this.$store.commit('setUserInfo',JSON.parse(localStorage.getItem('USER')))
       }
    }
  },
  mounted(){
    copyHandler()
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
    @import '../static/css/bu-button.css'; 
    @import '../static/css/bu-font.css'; 
    .root-app {
      font-family:DINRegular;
      // background:url('/static/img/bg_1.png');
      // background:#f7f7f7;
      background:url('/static/img/bg2.png') repeat ;
          background: #fff;
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
      .el-input__inner,.el-textarea__inner {
        font-family:DINRegular;
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

