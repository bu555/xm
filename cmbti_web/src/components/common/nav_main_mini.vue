<template>
    <div class="x-nav-mini">
        <div class="x-nav-inner">
            <ul class="menu">
                <li>
                    <router-link to="/mbti">
                        <em>MBTI</em>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/test/mbti'">
                        测试
                    </router-link>
                </li>
                <li>
                    <router-link to="/example?type=all&page=1">
                        名人库
                    </router-link>
                </li>
                <li>
                    <router-link to="/forum?category=all&page=1">
                        <em>M</em>论坛
                    </router-link>
                </li>
            </ul>
            <!-- 移动 更多 登录或注册 -->
            <div class="login-reg">
                <div v-if="$store.state.userInfo" class="is-login">
                        <!-- <img class="avatar" :src="$store.state.userInfo.avatar?$pathAvatar+$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt=""> -->
                        <router-link to="/my" class="a">
                        <Avatar :src="$store.state.userInfo.avatar" :uid="''" size="mini" round="true"></Avatar> 
                        <span class="role-name overflow-row-1">{{$store.state.userInfo.r_name}}</span>
                        </router-link>
                        <!-- <ul>
                            <li>收藏(5)</li>
                            <li>收藏(5)</li>
                        </ul> -->
                </div>
                <div class="not-login" v-else>
                    <a @click="$store.state.modalLogin = true">
                        登录
                    </a>
                    <router-link to="/user/register">
                        注册
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/common/avatar'
export default {
  data(){
      return {
        showMore:false
      }
  },
  components: {
      Avatar
  },
  watch: {
  },
  methods: {

  },
  mounted() {
    
  },
  created(){
  }
}
</script>

<style lang="less">
  .x-nav-mini{
      .x-nav-inner {
        //   max-width:970px;
        //   margin:0 auto;
          height:30px;
          display:flex;
          justify-content:space-between;
          align-items: center;
          background-color: #545652;
          ul.menu {
              flex:0 0 50%;
              display:flex;
              justify-content:flex-start;
              li {
                //   line-height: 27px;;
                  a {
                      font-size:14px;
                      padding:0 13px;
                      color:#ccc;
                      em {
                        font-size:15px; //英文大一号
                      }
                      &:hover {
                          text-shadow: 0 0 1px #fff;
                      }
                  }
              }
          }
          .login-reg {
              padding-right:14px;
              .is-login {
                  height:30px;
                  a.a {
                    display:flex;
                    align-items: center;
                  }
                  .role-name {
                      margin-left:7px;
                      font-size:14px;
                      color:#ccc;
                      display:inline-block;
                      max-width:120px;
                      height: 30px;
                      line-height: 30px;
                      &:hover {
                          text-shadow: 0 0 1px #fff;
                      }
                  }
              }
              .not-login {
                  font-size:13px;
                  a {
                    color:#ccc;
                      &:hover {
                          text-shadow: 0 0 1px #fff;
                      }
                  }
                  a+a {
                    margin-left:8px;
                  }
              }
          }
      }
      .my-avatar img.round.mini {
            border:1px solid #777;
            width:25px;
            height:25px;
            &:hover {
                border:none;
                box-shadow: 0 0 4px #fff inset;
            }
      }
  }
</style>
