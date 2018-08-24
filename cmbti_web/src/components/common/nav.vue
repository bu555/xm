<template>
    <div  :class="'x-nav ' + (showMore?'mobile':'')">
        <div class="x-nav-inner">
            <div class="logo">
                <h2>x-MBTI</h2>
            </div>
            <div class="search">
                <span class="close-btn" @click="showMore=false">关闭</span>
                <div class="search-inner">
                    <input type="text" spellcheck="false">
                    <span class="search-btn" @click="showMore=false"><i class="el-icon-search"></i></span>
                </div>
            </div>
            <ul class="menu">
                <li>
                    <router-link to="/">
                        <em>MBTI</em>
                        <p>影院热映</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/test'">
                        测 试
                        <p>正在热播</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/example?type=all&page=1">
                        名人库
                        <p>正在热播</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/forum?category=all&page=1">
                        <em>M</em>论坛
                        <p>正在热播</p>
                    </router-link>
                </li>
                <!-- <li>
                    <router-link to="/about">
                        关于我们
                    </router-link>
                </li>
                <li>
                    <router-link to="/my">
                        个人中心
                    </router-link>
                </li> -->
                <li class="mb-more">
                    <a @click="showMore=true">
                        <i class="el-icon-menu"></i>
                    </a>
                </li>
            </ul>
            <!-- 移动 更多logo   -->
            <div class="mb-logo">
              logo
            </div>
            <!-- 移动 更多 登录或注册 -->
            <div class="login-reg">
                <router-link to="/user/login">
                    登录XM
                </router-link>
                <router-link to="/user/register">
                    注册XM
                </router-link>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return {
        showMore:false
      }
  },
  components: {
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
  .x-nav {
      .x-nav-inner {
          max-width:970px;
          height:76px;
          margin:0 auto;
          display:flex;
          justify-content:space-between;
          align-items: center;
          .logo {
              flex: 0 0 150px;
              // background-color: #eee;
          }
          .search {
              position: relative;
              padding-left:42px;
              flex:0 0 275px;;
              .search-inner {
                  height:30px;
                  display:flex;
                  align-items: center;
                  border:1px solid #ddd;
                  border-radius:3px;
                  padding-left:2px;
                  width:100%;
              }
              .close-btn {
                  display:none;
                  font-size:16px;
                  position:absolute;
                  left:0px;
                  top:2px;
                  color:#36495d;
              }
              input {
                  flex:1;
                  height:28px;
                  border:0;outline:none; //去除蓝色框
                  font-size:15px;
                  padding-left:5px;
                  color:#555;
                  background-color: transparent;
              }
              .search-btn {
                padding:2px 5px;
                cursor:pointer;
                margin-right:3px;
                color:#d5d5d5;
              }

          }
          ul.menu {
              flex:0 0 50%;
              display:flex;
              justify-content:flex-end;
              li {
                  padding-left:18px;
                  line-height: 27px;;
                  a {
                      font-size:20px;
                      color:#ccc;
                      p {
                        display:none;
                        line-height: 16px;;
                      }
                      em {
                        font-size:21px; //英文大一号
                      }
                  }
              }
              li.mb-more {
                display:none
              }
          }
          .login-reg {
            display:none;
          }
          .mb-logo {
            display:none;
          }
      }
  }
  @media screen and (max-width:992px){
    .x-nav {
        padding: 0 12px;
        .x-nav-inner .search {
            display:none;
        }
    }
  }
  @media screen and (max-width:768px){
    .x-nav {
        // padding: 0 12px;
        border-bottom:1px solid #f3f3f3;
        .x-nav-inner {
            height:47px;
            .logo {
              flex: 0 0 65px;
              h2{font-size:15px;}
            }
            .search {
                display:none;
            }
            ul.menu {
                flex:0 0 auto;
                li {
                padding-left:12px;
                    a {
                      font-size:15px;
                      em {
                        font-size:16px; //英文大一号
                      }
                    }
                }
                li.mb-more {
                  display:block
                }
            }
        }

    }
    // 移动端 点击查看更多
    .x-nav.mobile {
        padding: 0;
        .x-nav-inner {
            position:fixed;
            background-color: #fff;
            height:100%;
            width:100%;
            z-index:9;
            display:block;
            .logo {
              display:none;
            }
            .search {
              display:block;
              border-bottom:1px solid #eee;
              width:100%;
              padding:12px;
              padding-right:15px;
              padding-left:48px + 15px;
              .search-inner {
                  height:30px;
                  display:flex;
                  align-items: center;
                  border:none;
                  border-radius:3px;
                  padding-left:2px;
                  background-color: #f2f2f2;
              }
              .close-btn {
                  display:block;
                  top:14px;
                  left:18px;
              }
              .search-btn {
                    color:#aeaeae;
              }
            }
            ul.menu {
              display:flex;
              flex-wrap:wrap;
              justify-content:flex-start;
              padding:25px 0;
                li {
                    flex:0 0 33%;
                    padding-left:0;
                    height:70px;
                    text-align: center;
                    a {
                      font-size:19px;
                      p {
                        display:block;
                        font-size:12px;
                        margin-top:2px;
                      }
                      em {
                        font-size:20px; //英文大一号
                      }
                    }
                }
                li.mb-more {
                  display:none;
                }
            }
              .mb-logo {
                  display: block;
                  height:40px;
                  line-height: 40px;
                  border-top:1px solid #f7f7f7;
                  text-align:center;
              }
            .login-reg {
              display:flex;
              padding:12px 0;
              border-bottom:1px solid #f7f7f7;
              border-top:1px solid #f7f7f7;
              text-align: center;
              font-size:13px;
              &>a {
                flex:1;
                color:#55c264;
              }
              &>a+a {
                border-left:1px solid #f0f0f0;
              }
            }
        }
    }

  }
</style>
