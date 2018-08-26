import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//用户
import user_login from '@/components/user/user_login'
import user_register from '@/components/user/user_register'
import user_forget from '@/components/user/user_forget'
import user from '@/components/user/user'

//home页面
import home from '@/components/home/home' 
import home_mbti from '@/components/home/home_mbti' 
import home_personalities from '@/components/home/home_personalities' 
import home_functions from '@/components/home/home_functions' 
//type页面
import type from '@/components/personalities/type'
import type_details from '@/components/personalities/type_details'

// mbti
import mbti from '@/components/mbti/mbti'
import mbti_theory from '@/components/mbti/mbti_theory'

// test
import test from '@/components/test/test'
import test_home from '@/components/test/test_home'
import test_mbti93 from '@/components/test/test_mbti93'
import test_report from '@/components/test/test_report'
import test_personality from '@/components/test/test_personality'
import personality_report from '@/components/test/personality_report'
import test_function from '@/components/test/test_function'

// example
import example from '@/components/example/example'
import example_details from '@/components/example/example_details'

// forum
import forum from '@/components/forum/forum'
// import forum_index from '@/components/forum/forum_index'
import forum_item from '@/components/forum/forum_item'
import forum_article_new from '@/components/forum/forum_article_new'

// 个人中心
import my from '@/components/my/my'
import my_home from '@/components/my/my_home'
import my_info from '@/components/my/my_info'
import my_mark from '@/components/my/my_mark'
import my_mark_example from '@/components/my/my_mark_example'
import my_publish from '@/components/my/my_publish'
import my_followers from '@/components/my/my_followers'
import my_following from '@/components/my/my_following'
import my_comment from '@/components/my/my_comment'
import my_vote from '@/components/my/my_vote'
import my_test from '@/components/my/my_test'
import my_test_report from '@/components/my/my_test_report'

//用户资料展示
import show from '@/components/user_show/show'


const vueRouter = new Router({
  mode:'history',
  routes: [
    {path:'/index',redirect:'/'},
    // redirect:'pool/systemStts',
    //Home
    {
      path:'/',
      component:home,
      children:[
         { path:'', component: home_mbti},
         { path:'personalities',
           component: home_personalities,
           children:[
              { path:':id',}
           ]
         },
         { path:'functions',redirect: 'functions/fe'},
         { path:'functions/:id',component: home_functions},
      ]
    },

    // type
    // {
    //   path:'/personalities',
    //   component:type,
    //   redirect:'/personalities/entj',
    //   children:[
    //     {path:':type',component:type_details}
    //   ]
    // },

    // mbti
    {
      path:'/mbti',
      component:mbti,
      children:[
        {path:'theory',component:mbti_theory},
      ]
      
    },
    // test
    {
      path:'/test',
      component:test,
      children:[
        {path:'mbti',component:test_mbti93},
        {path:'r/:id',component:test_report},
      ]
    },
    // {path:'/test/mbti93',component:test_mbti93},
    // {path:'/test/mbti93/report',component:mbti93_report},
    // {path:'/test/personality',component:test_personality},
    // {path:'/test/personality/report',component:personality_report},
    // {path:'/test/function',component:test_function},

    // example
    {path:'/example',component:example},
    {path:'/example/:id',component:example_details},

    // document
    {path:'/document',component:document},
    
    // forum 交流区
    {path:'/forum',component:forum},
    {path:'/forum/:id',component:forum_item},
    {path:'/forum/article/new',component:forum_article_new},
    {path:'/forum/article/edit/:id',component:forum_article_new},
    // {
    //   path:'/forum',
    //   component:forum,
    //   children:[
    //     {path:'',component:forum_index},
    //     {path:'article/new',component:forum_article_new},
    //     {path:'article/edit/:id',component:forum_article_new},
    //     {path:':articleID',component:forum_item},
    //   ]
    // },
    // {path:'/forum',component:forum,  meta:{requireAuth: true }},
    
    //个人中心
    { path:'/my',
      component:my,
      children:[
        // {path:'',component:my_home},
        {path:'info',component:my_info},
        {path:'mark',component:my_mark},
        {path:'mark_example',component:my_mark_example},
        {path:'publish',component:my_publish},
        {path:'followers',component:my_followers},
        {path:'following',component:my_following},
        {path:'comment',component:my_comment},
        {path:'vote',component:my_vote},
        {path:'test',component:my_test},
        {path:'test/:r',component:my_test_report},
      ]
        
    },
    //用户资料展示
    { path:'/info/:id',component:show},
    
    // 用户登陆、注册、找回密码
    { 
      path:'/user',
      component:user,
      children:[
          { path: 'login', component: user_login },
          { path: 'register',component: user_register},
          { path: 'forget',component: user_forget },
      ]
    }


    // { path: '*',redirect:'/'}

 
  ],
  scrollBehavior (to, from, savedPosition) {
      // 如果你的連結是帶 # 這種
      // to.hash 就會有值(值就是連結)
      // 例如 #3
      if (to.hash) {
        return {
          // 這個是透過 to.hash 的值來找到對應的元素
          // 照你的 html 來看是不用多加處理這樣就可以了
          // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
          selector: to.hash
        }
      }
    }
});

vueRouter.beforeEach((to, from, next) => {
  var reg = /^\/user\//;
  // 确保登录后能跳转回到原页面
  if(!reg.test(from.path) && reg.test(to.path)){
     sessionStorage.setItem('beforeLoginPath',from.fullPath);
  } 
  //需要登录的路由进行拦截
   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
       if (localStorage.getItem('USER')) {// 判断是否登录
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
