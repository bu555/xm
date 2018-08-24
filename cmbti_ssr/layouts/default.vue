<template>
  <div class="app-layout">
      <!-- 文章部分，匹配首頁、標籤頁、文章內容頁 -->
      <div class="oops-article" v-if="/^\/$/.test(path) || /^\/article\//.test(path) || /^\/tag\//.test(path)" v-cloak>
            <Header></Header>
            <ArticleNav></ArticleNav>
            <div class="oops-article-main" >
                <nuxt/>
            </div>
      </div>
      <!-- 個人中心頁面 -->
      <div class="oops-my" v-else-if="/^\/my\//.test(path)"  v-cloak>
            <Header></Header>
            <MyNav></MyNav>
            <div class="oops-my-main" >
                <nuxt/>
            </div>
      </div>
      <!-- 登錄註冊頁面 -->
      <div class="oops-user" v-else-if="/^\/user\//.test(path)"  v-cloak>
            <Header></Header>
            <div class="oops-user-main">
                <nuxt/>
            </div>
      </div>
    
       <div class="app-layout-footer">
           <Footer></Footer>
       </div>

  </div>
</template>
<script>
import Header from '~/components/common/header.vue'
import Footer from '~/components/common/footer.vue'
import ArticleNav from '~/components/article/common/nav.vue'  //文章頁面導航
import MyNav from '~/components/my/common/nav.vue' //個人中心頁面導航
import axios from '~/plugins/axios'
import utils from '~/plugins/utils'
export default {
    data(){
        return {
            loading:false,
            inited:false, // 數據初始化完成
        }
    },  
    components:{
        Header,
        ArticleNav,
        MyNav,
        Footer,
    },
    computed:{
        path(){
           return this.$route.path
        }
    },
    watch:{
        // 切換幣種
        "$store.state.currentCurrency": function() {
            this.getBitcoinPrice(this.$store.state.currentCurrency);
        },
        "$store.state.code401":function(){
            this.login_out()
        },
        "$store.state.refreshUserInfo":"getUserInfo"
    },
    methods:{
        getUserInfo(){
                this.loading = true
                axios.account.userInfo({}).then(res => {
                    this.loading = false
                    this.inited = true
                    if(res.data.ResultCode == 200){
                        this.$store.commit('setUserInfo',res.data.Data)
                    }
                }).catch(err=>{
                    this.loading = false
                    this.inited = true
                })
        },
        // 获取比特币价格
        getBitcoinPrice(currency) {
          let currentCurrency = localStorage.getItem("currentCurrency");
          if (!currentCurrency) {
            currentCurrency = "USD"; // 默认美元
          }
          if (currency) {
            currentCurrency = currency;
          }
          this.$store.commit("setBitcoin", "");
          Promise.all([
            axios.bitcoin.getBitcoinPrice({
              Currency: currentCurrency
            })
          ]).then(res => {
              if (res[0].data.ResultCode == 200) {
                let data = res[0].data.Data;
                this.$store.commit("setBitcoin", {
                  quotes: data.Quotes,
                  currency: data.Currency
                });
                localStorage.setItem("currentCurrency", currentCurrency);
              }
            }).catch(err => {
               console.log("getQuotes失敗");
            });
        },
        // 用户退出
        login_out() {
          // 请求后台 登出
          axios.user.login_out().then(res => { }).catch(err => {});
          // 清除 用户 Ticket shareID
          utils.setCookie( 'Ticket','')
          utils.setCookie( 'ShareID','')
          this.$store.commit('setUserInfo',null)
          if ( /^\/my\//.test(this.$route.path) || /^\/admin\//.test(this.$route.path) ) {
              this.$router.push({ path: "/user/login" });
          }
        },
        // 返401处理函数 ：退出处理
        is401Handler() {
            this.login_out();
        }

    },
    beforeMount(){
        if(utils.getCookie('Ticket')){
            this.getUserInfo()
        }else{
            this.inited = true
        }
        this.getBitcoinPrice()
        
       
    },
}
</script>

<style lang="less">
.app-layout {
    background-color: #f4f4f4;
    min-height:820px;
    .oops-article {
        .oops-article-main {
            margin:0 auto;
            max-width:1180px;
        }
    }
    .oops-my {
        .oops-my-main {
            margin:0 auto;
            max-width:1180px;
        }
    }
    .oops-user-main {
        min-height:992px;
        background-image: url('/img/background1.jpg');
        background-size: cover;
        overflow: hidden;
    }


}


// html {
//   font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//   font-size: 16px;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
//   // background-color: #f4f4f4;
// }


// *, *:before, *:after {
//   box-sizing: border-box;
//   margin: 0;
// }

// .button--green {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #3b8070;
//   color: #3b8070;
//   text-decoration: none;
//   padding: 10px 30px;
// }

// .button--green:hover {
//   color: #fff;
//   background-color: #3b8070;
// }

// .button--grey {
//   display: inline-block;
//   border-radius: 4px;
//   border: 1px solid #35495e;
//   color: #35495e;
//   text-decoration: none;
//   padding: 10px 30px;
//   margin-left: 15px;
// }

// .button--grey:hover {
//   color: #fff;
//   background-color: #35495e;
// }
// // @import url("../static/css/commom.css");
// // @import url("../static/css/font-awesome.min.css");
</style>
