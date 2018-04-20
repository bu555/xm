<template>
<div class="con-nav">
    <div class="main-nav">
        <div class="logo-a" v-if="false">
            <a href="www.baidu.com" target="_blank">
                <img src="../../../static/img/logo_a.png" alt="">
            </a>
        </div>
        <div class="logo-b" v-if="false">
            <a href="www.baidu.com" target="_blank">
                <img src="../../../static/img/logo_b.png" alt="" style="height:38px">
            </a>
        </div>
        <ul class="ul-lev1">
            <li class="li-lev1" index='1'>
                <router-link :to="routeObj[1]">
                    <div>首页</div>
                </router-link>
            </li>
            <li class="li-lev1" index='2' @click="clickHandle($event)">
                <router-link :to="routeObj[2]">
                    <div>MBTI</div>
                </router-link>
            </li>
            <li class="li-lev1" index='3' @click="clickHandle($event)">
                <router-link :to="routeObj[3]">
                    <div>测试</div>
                </router-link>
            </li>
            <li class="li-lev1" index='4' @click="clickHandle($event)">
                <router-link :to="routeObj[4]">
                    <div>名人库</div>
                </router-link>
            </li>
            <li class="li-lev1" index='5' @click="clickHandle($event)">
                <router-link :to="routeObj[5]">
                    <div>资料库</div>
                </router-link>
            </li>
            <li class="li-lev1" index='6' @click="clickHandle($event)">
                <router-link :to="routeObj[6]">
                    <div>讨论区</div>
                </router-link>
            </li>

        </ul>
        <div class="control">
            <div class="login-status">
                <!--<div v-text="$store.state.isLogin?'已登录':'未登录'"></div>-->
                <div class="user-control" v-if="!$store.state.userName">
                    <router-link to="/user/login">
                        <span>登录</span>
                    </router-link>
                    <span  style="margin-left:6px;"></span>
                    <router-link to="/user/register">
                        <span>注册</span>
                    </router-link>
                </div>
                <el-dropdown v-if="$store.state.userName"  @command="userControl">
                    <span class="el-dropdown-link">
                        {{$store.state.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  command="cancel">注销</el-dropdown-item>
                        <el-dropdown-item  command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
    <!--模态登录框-->
    <modalLogin v-if="$store.state.modalLogin"></modalLogin>
  </div>
</template>
<script>
import modalLogin from '../../components/user/user_login_modal';
export default {
  data() {
    return {
      // 当前激活index
      activeIndex:'',
      isLogin:true,
      //配置存储$t对象的导航信息
      routeObj:{
        '1':'/index',
        '2':'/mbti',
        '3':'/test',
        '4':'/example',
        '5':'/document',
        '6':'/discuss',
      },
    //   //tab导航切换至的key
    //   activeTab:'',
    //   //tab导航激活name
    //   activeName:'',
    //   //路由是否包含/user/
    //   isUserPath:false,
    //     //   //已登录用户名
    //     //   loginName:'',
    };
  },
  watch: {
      '$route':'changeRoute',
  },
  methods: {
        //路由改变处理
        changeRoute(){
            //获取第一个//中的字段
            let currentPath = '/' + this.$route.path.split('/')[1];
            let index = '';
            for(let key in this.routeObj){
                if(this.routeObj[key] === currentPath){
                    index = key;
                }
            }
            this.setNavStyle(index);
            this.activeIndex = index;
        },
        //导航点击事件处理
        clickHandle(event){
            var index = event.currentTarget.getAttribute('index'); 
            if(this.activeIndex!=index){
                this.activeIndex = index;
                this.setNavStyle(index);
            }      
        },
        //设置主导航
        setNavStyle(currentIndex){
            document.querySelectorAll('.li-lev1').forEach((v,i)=>{
                if(v.getAttribute('index')===currentIndex){
                    v.classList.add('active');
                }else{
                    v.classList.remove('active');
                }
                
            })
            // // 切换tab导航条
            // this.activeTab = currentIndex.split("-")[0];
            // //设主导航
            // document.querySelectorAll('.nav-title').forEach((v,i)=>{
            //     let _index = v.getAttribute('index'); 
            //     if(_index===currentIndex.split('-')[0]){
            //         if(_index === '4'){
            //             //如果进入的是我的账户，需判断是否登录，否则跳到登录页
            //             if(window.sessionStorage.getItem('loginName')){ 
            //                 v.classList.add('active');
            //             }else{
            //                 this.$router.push({path:'/user/login'});
            //                 this.$message({
            //                     message: '請先行登錄！',
            //                     type: 'warning'
            //                 });
            //             }
            //         }else{
            //             v.classList.add('active');
            //         }
            //     }else{
            //         v.classList.remove('active');
            //     }
            // })
            // //设置下拉导航
            // document.querySelectorAll('.li-lev2').forEach((v,i)=>{
            //     let _index = v.getAttribute('index'); 
            //     if(_index===currentIndex){
            //         v.classList.add('active');
            //     }else{
            //         v.classList.remove('active');
            //     }
            // })
            // //设tab子导航
            // this.activeName = currentIndex;

        },
        // 用户注销、退出
        userControl(command){
            if(command==='cancel'){  //注销
                this.$axios.delSession().then(res=>{
                    if(res.data.success){
                        this.$router.push({path:'/user/login'});
                            this.$message({
                                message: '已注销！',
                                type: 'info',
                                duration:1200
                            });
                    }
                })
            }else{ //退出
                this.$axios.delSession().then(res=>{
                    if(res.data.success){
                        this.$router.push({path:'/'});
                        this.$message({
                            message: '已退出！',
                            type: 'info',
                            duration:1200
                        });
                    }
                })
            }
            window.localStorage.removeItem('user');
            this.$store.commit('setUserName','');
        },
    },
    mounted(){
        //根据路由，初始化导航样式
        this.changeRoute();
    },
    created(){
        var roleName = "";
        if(localStorage.getItem('user')){
            var user = JSON.parse(localStorage.getItem('user'));
            roleName = user.role_name || user.name;
        }
        this.$store.commit('setUserName',roleName );
    },
    components:{
        modalLogin,
        
    }
};
</script>

<style lang="less">
@nav-height:42px;
@theme-color:#538dd5;
@active-color:#3296fa;
@active-color:#499ca5;
.con-nav {
    background-color: @theme-color;
    .main-nav {
        margin:0 auto;
        max-width:1055px;
        min-width:960px;
        margin-top:55px;
        text-align:left;
        position: relative;
        height:@nav-height;
        // display:flex;
        .logo-a {
            position: absolute;
            left:55px;
            top:-52px;
        }
        .logo-b {
            position: absolute;
            left:137px;
            top:-46px;
        }
        ul.ul-lev1 {
            padding-left:10px;
            margin-left:150px;
            font-size:15px;
            display:inline-block;
            li.li-lev1 {
                float:left;
                height:@nav-height;
                line-height: @nav-height;
                cursor:pointer;
                position: relative;
                color:#fff;
                &:hover {
                    // background-color: rgba(255,255,255,.2);
                    background-color: rgba(0,0,0,.1);
                }
                &:after {
                    content:'';
                    display: none;
                    width:100%;
                    height:1px;
                    background-color: #fff;
                    position: absolute;
                    bottom:1px;
                    left:0px;
                    // box-shadow:0px -1px 4px orange;
                }
                div {
                    padding:0 20px;
                    color:#fff;
                }
            }
            // 主导航激活样式
            li.li-lev1.active {
                color:#fff;
                background-color: rgba(0,0,0,.22);
                &:after {
                    // display: inline-block;
                }
            }
            

        }

        div.control {
            position: absolute;
            right:15px;
            top:-42px;
            color:#2992e0;
            font-size:14px;
            div.login-status {
                float:left;
                display:inline-block;
                height:@nav-height;
                line-height: @nav-height;
                margin-right:30px;
                // margin-right:20px;
                .user-control {
                    span {
                        color:#3296fa;
                        padding:3px;
                    }
                }
            }
            div.language {
                float:left;
                display:inline-block;
            }

        };

    }
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
</style>
