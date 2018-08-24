<template>
    <div class="header-login">
          <div class="" id="login-register" v-if="$store.state.judge_login==false">
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

          <div class=" user_select" v-if="$store.state.judge_login==true" style="height:100%;">
            <div class="media_user_none" style="margin: 0;height:100%;">
                  <div class="user_message user-currency" style="">
                    <i class="fa fa-money" style="margin-right:4px"> 賬戶餘額:</i> 
                    <!--<span style="color:red">{{$store.state.user_info.Profit | incomeMoney}}</span>-->
                    <span style="color:red"  v-html="$store.state.Bitcoin?$utill.fMoney($store.state.user_info.Profit,$store.state.Bitcoin):$utill.fMoney($store.state.user_info.Profit)"></span>
                    <span class="subscript">
                      <div class="btn-group">
                        <a href="javascript:;" class="dropdown-toggle caret" style="height: 10px;width: 10px" data-toggle="dropdown" aria-haspopup="true">
                        </a>
                        <ul class="dropdown-menu" style="left:-110px;padding:5px 0;text-align:left">
                          <li  @click="changeCurrency('USD')">
                             <a>美元USD</a>
                          </li>
                          <li  @click="changeCurrency('CNY')">
                             <a>人民幣CNY</a>
                          </li>
                          <li  @click="changeCurrency('HKD')">
                             <a>港幣HKD</a>
                          </li>
                          <li  @click="changeCurrency('MYR')">
                             <a>馬來西亞令吉MYR</a>
                          </li>
                          <li  @click="changeCurrency('TWD')">
                             <a>臺幣TWD</a>
                          </li>
                          <!--TWD,JPY,HKD,USD,CNY-->
                        </ul>
                      </div>
                    </span>
                  </div>
                  <!-- <div class=" user_message" style="">
                    <i class="fa fa-file-text-o" style="margin-right:4px"> 發表文章:</i> 
                    <span style="color:red">{{$store.state.user_info.ArticleCount}}</span>
                  </div>  -->
                  <div class="user_message" style="margin-right:2.5%;">

                      <i class="fa fa-user-o" style="margin-right:4px"> 當前用戶:</i>
                    <span style="display:inline-block;max-width:100px;white-space:nowrap;white-space:nowrap;text-overflow:ellipsis;vertical-align:bottom;overflow:hidden;">
                      <router-link to="/my/user/dashboard" :title="$store.state.user_info.Name" style="color:#37abe3"><span @click="clickNameHandler">&nbsp;{{$store.state.user_info.Name}}</span></router-link>
                    </span>
                    <span class="subscript">
                      <div class="btn-group">
                        <a href="javascript:;" class="dropdown-toggle caret" style="height: 10px;width: 10px" data-toggle="dropdown" aria-haspopup="true">
                        </a>
                        <ul class="dropdown-menu" style="left:-110px">
                          <li style="padding: 5px 0;text-align:left">
                            <router-link to="/my/user/dashboard">個人中心</router-link>
                          </li>
                          <li style="padding: 5px 0;text-align:left">
                            <a href="javascript:;" @click="signOut">登出</a>
                          </li>
                          <!--<li role="separator" class="divider"></li>-->
                        </ul>
                      </div>
                    </span>
                  </div>
                  <div class="publish-btn" style="margin-right:0px;">
                      <router-link to="/my/article/new">
                          <button><i class="fa fa-pencil-square-o"></i> 撰寫<em>文章</em></button>
                      </router-link>
                  </div>
            </div>
          </div>
    </div>
</template>
<script>
export default {
    data(){
      return {
      }
    },
    methods:{
          // 登出
          signOut(){
            this.$store.commit('setIs401', true)
          },
          // 點擊同時刷新userinfo
          clickNameHandler(){
                this.$store.state.refreshUserInfo++  //通知刷新userinfo
          },
          changeCurrency(currency){
              this.$store.state.currentCurrency = currency
          }
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
        margin-right:2.5%;
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
    .publish-btn {
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
      .publish-btn {
          button {
            padding:5px 8px;
            font-size:13px;
            em {
              display:none
            }
          }
      }

      
    }

    #login-register{
        height:100%;
        display:flex;
        align-items:center;
        justify-content: flex-end;
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
}
</style>


