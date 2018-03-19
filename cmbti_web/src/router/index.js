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
    { path: '/user/register',component: user_register },
    { path: '/user/reset',component: user_reset_password },

 
  ]
});

vueRouter.beforeEach((to, from, next) => {
  if (to.name === 'accountSet') {
    
  }
  next()
})

export default vueRouter;
