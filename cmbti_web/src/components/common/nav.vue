<template>
  <div class="my-nav">
    <div class="bx">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="javascript:;" v-if="0">
                <div class="logo-a">
                    <a href="www.baidu.com" target="_blank">
                        <img src="../../../static/img/logo_a.png" alt="">
                    </a>
                    <div class="logo-b">
                        <a href="www.baidu.com" target="_blank">
                            <img src="../../../static/img/logo_b.png" alt="" style="height:38px">
                        </a>
                    </div>
                </div>

            </a>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav nav-list">
              <li index='0' class="active">
                <router-link to="/index">
                   首页
                </router-link>
              </li>
              <!--<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>-->
              <li class="dropdown  " index='1'>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <router-link to="/mbti">
                    MBTI
                  </router-link>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="#">什么是MBTI</a>
                  </li>
                  <li>
                    <a href="#">荣格八维功能</a>
                  </li>
                  <li>
                    <a href="#">应用实例</a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="#">Separated link</a>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="#">One more separated link</a>
                  </li>
                </ul>
              </li>
              <li index='2'>
                <router-link :to="'/test?type='+$route.query.type">
                    测试
                </router-link>
              </li>
              <li index='3'>
                <router-link to="/example">
                    名人库
                </router-link>
              </li>
              <li class=""  index='4'>
                <router-link to="/discuss">
                交流区
                </router-link>
              </li>
            </ul>
            <!--<form class="navbar-form navbar-left">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                  </div>
                  <button type="submit" class="btn btn-default">Submit</button>
                </form>-->
            <ul class="nav navbar-nav navbar-right">
              <li v-if="!$store.state.userName">
                  <router-link to="/user/login">
                      登录
                  </router-link>
              </li>
              <li v-if="!$store.state.userName">
                  <router-link to="/user/register">
                      注册
                  </router-link>
              </li>
              <li class="dropdown" v-if="$store.state.userName">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ $store.state.userName }}
                  <span class="caret"></span>
                </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="#"><i class="glyphicon glyphicon-user"></i> 个人中心</a>
                    </li>
                    <li>
                      <a href="#"><i class="glyphicon glyphicon-wrench"></i> 修改密码</a>
                    </li>
                    <!--<li>
                      <a href="#">Something else here</a>
                    </li>-->
                    <li role="separator" class="divider"></li>
                    <li>
                      <a href="#" @click="exitLogin()"><i class="glyphicon glyphicon-log-out"></i> 退出</a>
                    </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          //配置路由正则
          routeObj:{
            '0':/^\/index/,
            '1':/^\/mbti/,
            '2':/^\/test/,
            '3':/^\/example/,
            '4':/^\/discuss/,
          },
      }
  },
  components: {
  },
  watch: {
      '$route.path':'changeRoute',
  },
  methods: {
      //路由改变处理
      changeRoute(){
          //获取第一个//中的字段
          let currentPath = this.$route.path;
          let index = '';
          for(let key in this.routeObj){
              if(this.routeObj[key].test(currentPath)){
                  index = key;
              }
          }
          this.setNavStyle(index);
          // this.activeIndex = index;
      },
      //设置主导航
      setNavStyle(currentIndex){
          document.querySelectorAll('.nav-list>li').forEach((v,i)=>{
              if(v.getAttribute('index')===currentIndex){
                  v.classList.add('active');
              }else{
                  v.classList.remove('active');
              }
              
          })
      },
      exitLogin(){
            window.localStorage.removeItem('user');
            this.$store.commit('setUserName','');
            this.$axios.delSession().then(res=>{
                if(res.data.success){
                    this.$router.push({path:'/'});
                }
            })
      }
  },
  mounted() {
      this.changeRoute();
  },
  created(){
  }
}
</script>

<style lang="less">
.my-nav {
  background-color: #598dd3;
  margin-top: 50px;
  .navbar {
      margin-bottom: 0px;
      .navbar-header {
        // padding: 0 70px;
        position: relative;
        .logo-a {
            position: absolute;
            top:-48px;
            left:.2rem;
            .logo-b {
                position: absolute;
                top:5px;
                right:-160px;
                // @media screen and (max-width:992px) {
                //   display:none;
                // }
            }
        }

      }
      .navbar-nav {
          // padding-left: 170px;
          padding-left: .47rem;
      }
  }
  .navbar.navbar-default {
    background-color: #598dd3;
    border: none;
  }
  .navbar-default .navbar-nav>li>a {
    color: #fff;
  }
  .navbar-default .navbar-nav>.active>a {
    background-color: #456ea5;
  }
  .navbar-default .navbar-nav>.open>a,
  .navbar-default .navbar-nav>.open>a:focus,
  .navbar-default .navbar-nav>.open>a:hover {
    color: #fff;
    background-color: transparent;
    background-color: rgba(255, 255, 255, .2);
    background-color: rgba(0, 0, 0, .1);
  }
  .navbar-default .navbar-nav>.active>a {
    color: #fff; // background-color: #456ea5;
  }
  .navbar-default .navbar-toggle .icon-bar {
    background-color: #eee;
  }
  .navbar-default .navbar-toggle:focus,
  .navbar-default .navbar-toggle:hover {
    background-color: transparent;
  }
  @media (max-width: 767px) {
    .navbar-default .navbar-nav .open .dropdown-menu>li>a {
      color: #eee;
    }
  }
  .dropdown>a>a {color:#fff !important}
  a:active {color:#fff}  /*点击时状态 。*/
  .navbar-nav>li>.dropdown-menu a {
      color:#1a1a1a
  }
  a:link {color: #1a1a1a}   /*未访问时的状态 。*/
  a:visited {color: #1a1a1a;text-decoration:none} /* 已访问过的状态 。*/
  a:hover {color: #1a1a1a;text-decoration:none} 


  .nav-list>li>a {
    padding-left:20px;
    padding-right:20px;
  } 
}
</style>