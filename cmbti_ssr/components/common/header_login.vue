<template>
    <div class="header-login">
          <div class="" id="login-register" v-if="!$store.state.user_info && !ticket">
            <div class="" id="login">
              <router-link to="/user/login" class="login_btn">
                <i class="fa fa-user"></i>
                <span>登錄</span>
              </router-link>
            </div>
            <div class="" id="register">
              <router-link to="/user/register" class="register_btn">
                <i class="fa fa-plus-circle"></i>
                <span>注冊</span>
              </router-link>
            </div>
          </div>
          <div class=" user_select" style="height:100%;" v-if="$store.state.user_info">
            <div class="media_user_none" style="margin: 0;height:100%;">
                  <div class="user_message user-currency" style="">
                    <!--<span style="color:red">{{$store.state.user_info.Profit | incomeMoney}}</span>-->
                    <!-- <span style="color:red"  v-html="$store.state.Bitcoin?$utils.fMoney($store.state.user_info.Profit,$store.state.Bitcoin):$utils.fMoney($store.state.user_info.Profit)"></span> -->
                    <el-dropdown style="margin-right:1.5em" @command="changeCurrency"  trigger="click">  
                        <span class="el-dropdown-link">
                            <i class="fa fa-money" style="margin-right:4px;color:#a1a2a2"></i> 賬戶餘額: <em style="color:#fa0090;display:inline-block"  v-html="$store.state.Bitcoin?$utils.fMoney($store.state.user_info.Profit,$store.state.Bitcoin):$utils.fMoney($store.state.user_info.Profit)"></em> <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  command="USD">美元USD</el-dropdown-item>
                            <el-dropdown-item  command="CNY">人民幣CNY</el-dropdown-item>
                            <el-dropdown-item  command="HKD">港幣HKD</el-dropdown-item>
                            <el-dropdown-item  command="MYR">馬來西亞令吉MYR</el-dropdown-item>
                            <el-dropdown-item  command="TWD">臺幣TWD</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown style="margin-right:1.5em"  @command="userHandler"  trigger="click">
                            <span class="el-dropdown-link">
                                <i class="fa fa-user-o" style="margin-right:4px;color:#a1a2a2"> 當前用戶: <router-link to="/my/user/dashboard"> <span  @click="refUserInfo">{{$store.state.user_info.Name}}</span></router-link></i> <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="my">個人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">登出</el-dropdown-item>
                            </el-dropdown-menu>
                      </el-dropdown>
 
                    <div class="publish-btn" style="margin-right:0px;">
                        <router-link to="/my/article/new">
                            <button><i class="fa fa-pencil-square-o"></i> 撰寫<em>文章</em></button>
                        </router-link>
                    </div>

                  </div>
            </div>
          </div>
          
    </div>
</template>
<script>
import utils from '~/plugins/utils'
export default {
    data(){
      return {
        $utils:null,
        ticket:'true'
      }
    },
    watch:{
      '$store.state.user_info':function(val){
          this.ticket = val
      }
    },
    methods:{
          // 登出
          signOut(){
            // this.$store.commit('setIs401', true)
          },
          // 點擊同時刷新userinfo
          clickNameHandler(){
                this.$store.commit('refreshUserInfo')  //通知刷新userinfo
          },
          changeCurrency(currency){
              this.$store.commit("setCurrentCurrency", currency);
          },
          userHandler(val){
              if(val==='my'){
                  this.$router.push({path:'/my/user/dashboard'})
              }else if(val==='logout'){
                  this.$store.commit('setCode401') //递加，触发退出函数
              }
          },
          // 刷新個人信息
          refUserInfo(){
              this.$store.commit('refreshUserInfo')
              let us = document.querySelectorAll('body>ul.el-dropdown-menu') 
              for(let i=0;i<us.length;i++){
                  us[i].style.opacity = '0'
                  setTimeout(()=>{
                    us[i].style.position = 'relative'
                    us[i].style.opacity = '1'
                  },100)
              }

              
          }
    },
    mounted(){
       this.ticket = utils.getCookie('Ticket')
    },
    created(){
      this.$utils = utils
    }
  
}
</script>
<style lang="less">
.header-login {
    height:100%;
    .media_user_none {
      display:flex;
      justify-content: flex-end;
      color:#a1a2a2;
      &>div {
        // margin-right:2.5%;
        display:flex;
        align-items:center;
        i,span {

        white-space:nowrap;
        }
      }
    }
    .user-currency {
        .dropdown-menu li {
          cursor: pointer;
        }
        &:hover {
          // .dropdown-menu {
          //   display:block;
          // }
        }
    }
    @media screen and (max-width:768px) {
      .media_user_none {
        &>div {
          flex:1;
          // flex-wrap:wrap;
          display: block;
          word-break: normal;
          // word-break:break-all;
          i,span {

          white-space:normal;
          }
        }
      }

      
    }

    #login-register{
        height:100%;
        display:flex;
        align-items:center;
        justify-content: flex-end;
        text-align:center;
        #register {
          margin-left: 10px;
          .register_btn {
            display: inline-block;
            width: 82px;
            height: 28px;
            line-height: 28px;
            padding: 0;
            background-color: #468bed;
            font-size: 14px;
            color: white;
            border-radius: 3px;
            text-decoration: none;
            span {
              padding-left: 10px;
            }
          }
        }
        #login {
          .login_btn {
            display: inline-block;
            width: 82px;
            height: 28px;
            line-height: 28px;
            padding: 0;
            background-color: #eeeeee;
            color: #656565;
            font-size: 14px;
            text-decoration: none;
            span {
              padding-left: 10px;
            }
          }
        }
    }
    .publish-btn {
      margin-right:2px;
        button {
          padding:6px 10px;
          border-radius:4px;
          color:#fff;
          background-color: #528aeb;
          font-size:14px;
          i {
              font-size: 1.1em;
              position: relative;
              top: 1px;
          }
          &:hover {
            background-color: #f78523;
          }
        }
    }
}
</style>


