<template>
<div class="con-nav">
    <!--主菜单-->
    <ul class="ul-lev1">
        <!--主页新闻-->
        <li class="li-lev1" index="1" @click="clickHandle($event)" @mouseover="mouseoverHandle($event)" @mouseout="mouseoutHandle($event)">
          <!--一级菜单标题-->
          <div class="title">{{$t("message.nav_title[0]")}}</div>
          <!--二级菜单标题-->
          <div class="menu-son">
            <ul class="ul-lev2 clear-float">
                <li class="li-lev2" index="1-1" @click="clickHandle($event)">
                  <i class="fa fa-home fa-fw"></i> 
                  {{$t("message.nav_homepage[0]")}}
                </li>
                <li class="li-lev2" index="1-2" @click="clickHandle($event)">
                  <i class="fa fa-lightbulb-o fa-fw"></i>
                  {{$t("message.nav_homepage[1]")}}
                </li>
                <li class="li-lev2" index="1-3" @click="clickHandle($event)">
                  <i class="fa fa-address-book fa-fw"></i> 
                  {{$t("message.nav_homepage[2]")}}
                </li>
                <li class="li-lev2" index="1-4" @click="clickHandle($event)">
                  <i class="fa fa-medium fa-fw"></i> 
                  {{$t("message.nav_homepage[3]")}}
                </li>
            </ul>
          </div>
        </li>
        <!--矿池统计-->
        <li class="li-lev1" index="2" @click="clickHandle($event)" @mouseover="mouseoverHandle($event)" @mouseout="mouseoutHandle($event)">
          <!--一级菜单标题-->
          <div class="title">{{$t("message.nav_title[1]")}}</div>
          <!--二级菜单标题-->
          <div class="menu-son">
            <ul class="ul-lev2 clear-float">
                <li class="li-lev2" index="2-1" @click="clickHandle($event)">
                  <i class="fa fa-bar-chart fa-fw"></i> 
                  {{$t("message.min_sta[0]")}}
                </li>
                <li class="li-lev2" index="2-2" @click="clickHandle($event)">
                  <i class="fa fa-lightbulb-o fa-fw"></i>
                  {{$t("message.min_sta[1]")}}
                </li>
                <li class="li-lev2" index="2-3" @click="clickHandle($event)">
                  <i class="fa fa-history fa-fw"></i> 
                  {{$t("message.min_sta[2]")}}
                </li>
                <li class="li-lev2" index="2-4" @click="clickHandle($event)">
                  <i class="fa fa-trophy fa-fw"></i> 
                  {{$t("message.min_sta[3]")}}
                </li>
                <li class="li-lev2" index="2-5" @click="clickHandle($event)">
                  <i class="fa fa-bar-chart fa-fw"></i> 
                  {{$t("message.min_sta[4]")}}
                </li>
            </ul>
          </div>
        </li>
        <!--帮助中心-->
        <li class="li-lev1" index="3" @click="clickHandle($event)" @mouseover="mouseoverHandle($event)" @mouseout="mouseoutHandle($event)">
          <!--一级菜单标题-->
          <div class="title">{{$t("message.nav_title[2]")}}</div>
          <!--二级菜单标题-->
          <div class="menu-son">
            <ul class="ul-lev2 clear-float">
                <li class="li-lev2" index="3-1" @click="clickHandle($event)">
                  <i class="fa fa-life-ring fa-fw"></i> 
                  {{$t("message.help_center[0]")}}
                </li>
                <li class="li-lev2" index="3-2" @click="clickHandle($event)">
                  <i class="fa fa-lightbulb-o fa-fw"></i>
                  {{$t("message.help_center[1]")}}
                </li>
                <li class="li-lev2" index="3-3" @click="clickHandle($event)">
                  <i class="fa fa-code fa-fw"></i> 
                  {{$t("message.help_center[2]")}}
                </li>
            </ul>
          </div>
        </li>
        <!--我的账户-->
        <li class="li-lev1" index="4" @click="clickHandle($event)" @mouseover="mouseoverHandle($event)" @mouseout="mouseoutHandle($event)">
          <!--一级菜单标题-->
          <div class="title">{{$t("message.nav_title[3]")}}</div>
          <!--二级菜单标题-->
          <div class="menu-son" data-flag="myaccount_list">
            <ul class="ul-lev2 clear-float">
                <li class="li-lev2" index="4-1" @click="clickHandle($event)">
                  <i class="fa fa-th-large fa-fw"></i> 
                  {{$t("message.account[0]")}}
                </li>
                <li class="li-lev2" index="4-2" @click="clickHandle($event)">
                  <i class="fa fa-cogs fa-fw"></i>
                  {{$t("message.account[1]")}}
                </li>
                <li class="li-lev2" index="4-3" @click="clickHandle($event)">
                  <i class="fa fa-line-chart fa-fw"></i> 
                  {{$t("message.account[2]")}}
                </li>
                <li class="li-lev2" index="4-4" @click="clickHandle($event)">
                  <i class="fa fa-btc fa-fw"></i> 
                  {{$t("message.account[3]")}}
                </li>
                <li class="li-lev2" index="4-5" @click="clickHandle($event)">
                  <i class="fa fa-usd fa-fw"></i> 
                  {{$t("message.account[4]")}}
                </li>
                <li class="li-lev2" index="4-6" @click="clickHandle($event)">
                  <i class="fa fa-book fa-fw"></i> 
                  {{$t("message.account[5]")}}
                </li>
                <li class="li-lev2" index="4-7" @click="clickHandle($event)">
                  <i class="fa fa-cog fa-fw"></i> 
                  {{$t("message.account[6]")}}
                </li>
                <li class="li-lev2" index="4-8" @click="clickHandle($event)">
                  <i class="fa fa-cog fa-fw"></i> 
                  {{$t("message.account[7]")}}
                </li>
            </ul>
          </div>
        </li>

    </ul>
    <div class="control">
        <div class="login-status">
            <div v-text="$store.state.isLogin?'已登录':'未登录'"></div>
        </div>

        <el-dropdown style="float:right;margin-right:60px;line-height:60px" @command="handleCommand">
            <span><i class="el-icon-setting" style="margin-right: 15px"></i>
            <strong>{{$t('message.language')}}</strong>
            </span>
            <el-dropdown-menu slot="dropdown" id="langSlect">
              <el-dropdown-item command="en">EN</el-dropdown-item>
              <el-dropdown-item command="ch">CN</el-dropdown-item>
              <el-dropdown-item command="tw">HK</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  <!--<el-header style="z-index:2000;padding:0">
      <el-menu :default-active="activeIndex" background-color="#d4dce6" text-color="#606265" active-text-color="#1d00eb" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
        <el-submenu index="1">
            <template slot="title" @click="clickHand()">
                  <router-link to="/" style="color:#909399;">
                      {{$t("message.nav_title[0]")}}
                  </router-link>
            </template>
                <el-menu-item index="1-1">
                <i class="fa fa-home fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.nav_homepage[0]")}}</strong> 
            </el-menu-item>
            <el-menu-item index="1-2">
                <i class="fa fa-lightbulb-o fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.nav_homepage[1]")}}</strong>
            </el-menu-item>
            <el-menu-item index="1-3">
                <i class="fa fa-address-book fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.nav_homepage[2]")}}</strong>
            </el-menu-item>
            <el-menu-item index="1-4">
                <i class="fa fa-medium fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.nav_homepage[3]")}}</strong> 
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
                <template slot="title">
                  <router-link to="/pool" style="color:#909399;">
                    {{$t("message.nav_title[1]")}}
                  </router-link>
                </template>
            <el-menu-item index="2-1">
                <i class="fa fa-bar-chart fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.min_sta[0]")}}</strong> 
            </el-menu-item>
            <el-menu-item index="2-2">
                <i class="fa fa-balance-scale fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.min_sta[1]")}}</strong> 
                
            </el-menu-item>
            <el-menu-item index="2-3">
                <i class="fa fa-history fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.min_sta[2]")}}</strong>
                
            </el-menu-item>
            <el-menu-item index="2-4">
                <i class="fa fa-trophy fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.min_sta[3]")}}</strong> 
            </el-menu-item>
            <el-menu-item index="2-4">
                <i class="fa fa-bar-chart fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.min_sta[4]")}}</strong> 
                
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <router-link to="/help">
                    {{$t("message.nav_title[2]")}}
                </router-link>
            </template>
            <router-link to="text">
                <el-menu-item index="3-1">
                <i class="fa fa-life-ring fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.help_center[0]")}}</strong> 
            </el-menu-item>
            </router-link>
            <el-menu-item index="3-2">
                <i class="fa fa-code fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.help_center[1]")}}</strong>
                
            </el-menu-item>
            <el-menu-item index="3-3">
                <i class="fa fa-gavel fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.help_center[2]")}}</strong>
                
            </el-menu-item>    
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <router-link to="/myaccount" style="color:#909399;">
                {{$t("message.nav_title[3]")}}
                </router-link>
            </template>
            <el-menu-item index="4-1">
                <i class="fa fa-th-large fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[0]")}}</strong> 
            </el-menu-item>
            <el-menu-item index="4-2">
                <i class="fa fa-cogs fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[1]")}}</strong>
                
            </el-menu-item>
            <el-menu-item index="4-3">
                <i class="fa fa-line-chart fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[2]")}}</strong>
            </el-menu-item>   
            <el-menu-item index="4-4">
                <i class="fa fa-btc fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[3]")}}</strong>
            </el-menu-item>  
            <el-menu-item index="4-5">
                <i class="fa fa-usd fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[4]")}}</strong>
            </el-menu-item>  
            <el-menu-item index="4-6">
                <i class="fa fa-book fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[5]")}}</strong>
            </el-menu-item>  
            <el-menu-item index="4-7">
                <i class="fa fa-cog fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[6]")}}</strong>
            </el-menu-item>  
            <el-menu-item index="4-8">
                <i class="fa fa-cog fa-fw"></i>
                &nbsp;&nbsp;
                <strong>{{$t("message.account[7]")}}</strong>
            </el-menu-item>  
        </el-submenu>
        <el-dropdown style="float:right;line-height:60px"  @command="register">
        <span><i class="el-icon-setting" style="margin-right: 15px"></i>
        <strong id="log">{{$t('message.register[0]')}}</strong>
        </span>
        <el-dropdown-menu slot="dropdown" style="z-index:999" class="loginDrop">
          <router-link to="/account/login">
          <el-dropdown-item command="logIn" v-show="judge">{{$t('message.register[0]')}}</el-dropdown-item>
          </router-link>
          <router-link to="/account/register">
          <el-dropdown-item command="signUp" v-show="judge">{{$t('message.register[1]')}}</el-dropdown-item>
          </router-link>
          <el-dropdown-item command="logOut" >{{$t('message.register[2]')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="float:right;margin-right:60px;line-height:60px" @command="handleCommand">
        <span><i class="el-icon-setting" style="margin-right: 15px"></i>
        <strong>{{$t('message.language')}}</strong>
        </span>
        <el-dropdown-menu slot="dropdown" id="langSlect">
          <el-dropdown-item command="en">EN</el-dropdown-item>
          <el-dropdown-item command="ch">CN</el-dropdown-item>
          <el-dropdown-item command="tw">HK</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-menu>
        
  </el-header>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      locale: "ch",
      judge: true,
      // 当前激活index
      activeIndex:'',
      // 配置index和路由映射
      config:{
        '1':'/',
        '2':'/pool',
        '3':'/help',
        '4':'/myaccount'
      },
      isLogin:true
    };
  },
  watch: {
      locale(val) {
        this.$i18n.locale = val;
      },
      //检测navName数据变动，设置下拉的子导航样式
      '$store.state.navName':function(){
          var currentNavName = this.$store.state.navName;
          //设置样式
          document.querySelectorAll('.li-lev2').forEach(function(v,i){
              var index = v.getAttribute('index'); 
              if(index===currentNavName){
                  v.classList.add('active');
              }else{
                  v.classList.remove('active');
              }
          })
          // event.currentTarget.classList.add('active');
      },
      activeIndex:function(){
          window.sessionStorage.setItem('historyIndex',this.activeIndex);
      }
  },
  mounted() {
      var login = localStorage.getItem("login");
      if (login == "ok") {
        this.judge = false;
      }
  },
  methods: {
    //导航点击事件处理
    clickHandle(event){
        // 点击后隐藏下拉导航列表
        document.querySelectorAll('.menu-son').forEach(function(v,i){
            v.style.display = 'none';
        });
        //事件目标的index
        var index = event.currentTarget.getAttribute("index");
        //根据index判断是主导航还是子导航
        if(/-/g.test(index)){  //子导航（如：index为1-1格式）
            var indexArr = index.split('-');
            if(this.$store.state.navName === index){
                return;
            }else{
                //更新vuex和local的navName (设置为第一个子导航)
                var activeName = index;
                this.$store.commit('setNavName',activeName); 
                window.sessionStorage.setItem('activeName',activeName);
            }
            //排除重复
            if(indexArr[0] === this.activeIndex){
                return;
            }else{
                if(this.config[indexArr[0]]){
                    // 跳转到配置好的路由
                    this.$router.push({ path:this.config[indexArr[0]] });
                }
                //设置主导航样式
                this.setNavStyle(indexArr[0]);
                //更新this.activeIndex 
                this.activeIndex = indexArr[0];
                //更新vuex和local的navName (设置为第一个子导航)
                this.$store.commit('setNavName',indexArr[0]+"-"+indexArr[1]); 
            }
        }else{ //主导航（如：index为1格式）
            // 点击后设置隐藏下拉表
            // event.currentTarget.querySelector('.menu-son').style.display = 'none';
            // document.querySelectorAll('.menu-son').forEach(function(v,i){
            //     v.classList.remove
            // })
            //排除重复
            if(index === this.activeIndex){
                return;
            }else{
                //更新vuex的navName (设置为第一个子导航)
                var activeName = index+"-1";
                this.$store.commit('setNavName',activeName); 
                window.sessionStorage.setItem('activeName',activeName);
                // 跳转到配置好的路由
                if(this.config[index]){
                    this.$router.push({ path:this.config[index] });
                }
                // //设置主导航样式
                this.setNavStyle(index);
                //更新this.activeIndex 
                this.activeIndex = index;
            }
        }
    },
    //设置主导航样式
    setNavStyle(currentIndex){
          document.querySelectorAll('.li-lev1').forEach(function(v,i){
              var _index = v.getAttribute('index'); 
              if(_index===currentIndex){
                  v.classList.add('active');
              }else{
                  v.classList.remove('active');
              }
          })
    },
    // 鼠标移入事件
    mouseoverHandle(event){
        var currentList = event.currentTarget.querySelector('.menu-son');
        //根据登录状态来设置‘我的账户’子导航是否显示
        if(currentList.getAttribute('data-flag') == 'myaccount_list' && !this.$store.state.isLogin){
            return;
        }else{
            currentList.style.display = 'block';
        }
    },
    // 鼠标移出事件
    mouseoutHandle(event){
        event.currentTarget.querySelector('.menu-son').style.display = 'none';
    },
    // 语言选择
    handleCommand(command) {
        this.$i18n.locale = command;
        localStorage.setItem("locale", command);
        this.$store.commit("getLocal");
        this.$store.state.a = command;
    },
    // 登录、注册、注销
    register(command) {
      if (command == "logOut") {
        localStorage.setItem("login", "no");
        localStorage.removeItem("request_id");
        this.$router.push({ name: "homePage" });
        this.judge = true;
      }
    },
  },
    mounted(){
        // var historyIndex = window.sessionStorage.getItem('historyIndex');
        this.initIndex = window.sessionStorage.getItem('historyIndex');
        this.setNavStyle(this.initIndex);
    },
    created(){
        //登录状态
        if(true){
            this.$store.commit('setLogin','ok');
        }
        //初始化主导航和子导航(先使用历史记录，如果没有再设置为第一个导航)
        var historyIndex = window.sessionStorage.getItem('historyIndex');
        //如果是初次打开页面
        if(!historyIndex){
            // 设置主导航
            window.sessionStorage.setItem('historyIndex','1'); 
            // 设置子导航
            window.sessionStorage.setItem('activeName','1-1'); //初次打开页面，设置显示首页
        }
        console.log(this.vueRouter)
    }
};
</script>

<style lang="less">
@nav-height:60px;
@theme-color:#0c203b;
.con-nav {
    background-color: @theme-color;
    text-align:left;
    // display:flex;
    ul.ul-lev1 {
        height:@nav-height;
        color:#ccc;
        padding-top:5px;
        padding-left:10px;
        font-size:14px;
        display:inline-block;
        li.li-lev1 {
          float:left;
          height:50px;
          padding:0 18px;
          line-height:50px;
          position:relative;
          border:1px solid transparent;
          border-radius:4px;
          cursor:pointer;
          font-weight:700;
          &:hover {
            // 显示下拉导航列表
            .menu-son {
              // display:block;
            }
            border-color:#3c6b7a;
          }
          // 导航列表样式
          .menu-son {
              display:none;
              z-index:9999;
              width:280px;
              position: absolute;
              top:50px;
              left:-1px;
              padding:4px 0;
              &:hover {
                  display:block;
              }
              ul.ul-lev2 {
                color:#ccc;
                font-weight:400;
                border:1px solid #2d505c;
                border-radius:4px;
                background-color: @theme-color;
                li.li-lev2 {
                  text-shadow:none;
                  height:40px;
                  line-height: 40px;
                  border-bottom:1px solid #2d505c;
                  margin-bottom:-1px;
                  text-align:left;
                  padding-left:10px;
                  &:hover {
                    // border-color:#558f98
                    background-color: rgba(255,255,255,.1);
                  }
                }
              }
          }
        }
        // 主导航激活样式
        li.li-lev1.active {
            color:#3296fa;
            // text-shadow:0px 0px 2px #fff;
        }
        // 子导航激活样式
        li.li-lev2.active {
            color:#3296fa;
            text-shadow:0px 0px 2px #fff;
            background-color: rgba(255,255,255,.1);
        }

    }
    div.control {
        float:right;
        color:#2992e0;
        font-size:14px;
        div.login-status {
            display:inline-block;
            height:@nav-height;
            line-height: @nav-height;
            margin-right:20px;

            
        }

    };
    .clear-float:after {
        // &:after{
          content:'';
          height:0;
          line-height:0;
          display:block;
          visibility:
          hidden;
          clear:both;
        // }
    }
}
@media screen and (max-width: 575.98px) {
  .el-header {
    padding: 0;
  }
  .el-submenu__title {
    padding: 0;
  }
  .el-dropdown {
    margin: 0 !important;
  }
  .el-dropdown > span > i {
    margin: 0 !important;
  }
  .loginDrop {
    .el-dropdown-item {
      z-index: 999;
    }
  }
  .login{
    width: 100% !important;
  }
  .register{
    width: 100% !important;
  }
  .reset{
    width: 100% !important;
  }
}
.el-dropdown {
  float: right;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>
