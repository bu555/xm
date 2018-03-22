import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//我的账户
import myaccount_setting from '@/components/myaccount/myaccount_setting'
import setting_user_info from '@/components/myaccount/setting_user_info'
import setting_user_account from '@/components/myaccount/setting_user_account'
import setting_user_password from '@/components/myaccount/setting_user_password'
//用户
import user_login from '@/components/user/user_login'
import user_register from '@/components/user/user_register'
import user_reset_password from '@/components/user/user_reset_password'

//home页面
import home_index from '@/components/home/home_index'

// mbti
import mbti from '@/components/mbti/mbti'

// test
import test from '@/components/test/test'

// example
import example from '@/components/example/example'
import example_details from '@/components/example/details'

// document
import document from '@/components/document/document'

// discuss
import discuss from '@/components/discuss/discuss'



const vueRouter = new Router({
  mode:'history',
  routes: [
    {path:'/',redirect:'/index'},
    // redirect:'pool/systemStts',
    //Home
    {path:'/index',name:'1-1',component:home_index},

    // mbti
    {path:'/mbti',component:mbti},

    // test
    {path:'/test',component:test},

    // example
    {path:'/example',component:example},
    {path:'/example/details',component:example_details},

    // document
    {path:'/document',component:document},

    // discuss 交流区
    {path:'/discuss',component:discuss,  meta:{requireAuth: true }},
    

    //矿池
    // {path:'/pool/system_stts',name:'2-1', component:pool_system_stts },
    // {path:'/pool/hash',name:'2-2',component:pool_hash },
    // {path:'/pool/history',name:'2-3',component:pool_history },
    // {path:'/pool/celebrity',name:'2-4',component:pool_celebrity },
    // {path:'/pool/json',name:'2-5',component:pool_json },
    // //帮助中心
    // {path:'/help/center',name:'3-1',component:help_center },
    // {path:'/help/develop',name:'3-2',component:help_develop },
    // {path:'/help/service',name:'3-3',component:help_service },
    // //我的账户
    // {path:'/myaccout/dashboard',name:'4-1', component: myaccount_dashboard },
    // {path:'/myaccout/miner',name:'4-2', component: myaccount_miner },
    // {path:'/myaccout/monitor',name:'4-3', component: myaccount_monitor },
    // {path:'/myaccout/remuneration',name:'4-4', component: myaccount_remuneration },
    // {path:'/myaccout/history',name:'4-5', component: myaccount_history },
    // {path:'/myaccout/log',name:'4-6', component: myaccount_log },
    // {path:'/myaccout/setting',name:'4-7', component: myaccount_setting,
    //     children:[
    //       {path:'user_info',component:setting_user_info},
    //       {path:'user_account',component:setting_user_account},
    //       {path:'user_password',component:setting_user_password},
    //     ] 
  
    // },
    
    // 用户登陆、注册、找回密码
    { path: '/user/login', component: user_login },
    { path: '/user/register',component: user_register},
    { path: '/user/reset',component: user_reset_password },

 
  ]
});

vueRouter.beforeEach((to, from, next) => {
  var reg = /^\/user\//;
  // 确保登录后能跳转回到原页面
  if(!reg.test(from.path) && reg.test(to.path)){
     sessionStorage.setItem('beforeLoginPath',from.fullPath);
  } 
  //需要登录的路由进行拦截
   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
       if (localStorage.getItem('user')) {// 判断是否登录
          next()
       } else {// 没登录则跳转到登录界面
          alert("需要登录！");
          next({
            path: '/user/login',
            query: {redirect: to.fullPath}
          })
      }
  } else {
     next()
  }
  // next();
  // if (to.name === 'accountSet') {
    
  // }
  // next()
})
// 登录状态管理逻辑：
// 1.session时间短（如：10分钟）：localStorage存储状态+时间，路由拦截时核对
// 2.session时间长（如：一个月）：localStorage存储状态，路由拦截时核对
// 判断是否需要登录权限 以及是否登录

// router.beforeEach((to, from, next) => {
//  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//  if (localStorage.getItem('username')) {// 判断是否登录
//   next()
//  } else {// 没登录则跳转到登录界面
//   next({
//   path: '/Register',
//   query: {redirect: to.fullPath}
//   })
//  }
//  } else {
//  next()
//  }

export default vueRouter;

// https://segmentfault.com/a/1190000011426274 vue的路由懒加载和组件的按需加载
