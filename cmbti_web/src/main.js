// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
// 公共样式
import '../static/css/base.css'
//css3动画库
import '../static/css/ec-css-animate.css'
import '../static/css/ec-css-hover.css'
// vuex
import store from '@/store/store'
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment;
import mbti from './assets/mbti'
Vue.prototype.$mbti = mbti;

console.log('momentUTC',moment().utc().format());
console.log('momentUTC1',moment('2018-05-14T14:44:05.000Z').format('YYYY-MM-DD HH:mm:ss'));
console.log('momentUTC2',moment('2018-05-14T14:44:05Z').format('YYYY-MM-DD HH:mm:ss'));




// 字体样式
// import 'font-awesome/css/font-awesome.css'
// element样式
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// element-ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)


// import 'element-ui/lib/theme-chalk/icon.css'
// import 'element-ui/lib/theme-chalk/loading.css'
// import 'element-ui/lib/theme-chalk/message.css'
// import 'element-ui/lib/theme-chalk/message-box.css'

// import {Loading,Message,MessageBox,Pagination} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/display.css'

// Vue.use(Loading.directive) //仅使用指令
// Vue.use(Pagination) //仅使用指令
// Vue.prototype.$message = Message
// Vue.prototype.$message = Message
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;




import axiosManager from '../src/assets/axios.manager'
Vue.prototype.$axios = axiosManager;

Vue.prototype.maxAge = 5000;  //本地数据存储期限值

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import colorFormat from './assets/colorFormat'
Vue.prototype.colorFormat = colorFormat;
// import 'lib-flexible/flexible.js'

// Vue.prototype.url = basePath;

// apollo 
// import {
//   ApolloClient
// } from 'apollo-client'
// import {
//   HttpLink
// } from 'apollo-link-http'
// import {
//   InMemoryCache
// } from 'apollo-cache-inmemory'
// import VueApollo from 'vue-apollo'
// axios
// import axios from 'axios'
// axios.defaults.withCredentials = true
// Vue.prototype.$http = axios;
// Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$http.defaults.withCredentials = true;

Vue.config.productionTip = false;
// 接口

/* eslint-disable no-new */

Vue.prototype.vueExample = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {

  }
})
