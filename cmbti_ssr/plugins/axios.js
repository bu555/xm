
// import Vue from 'vue
import axios from 'axios'
import article from './API/article'
import account from './API/account'
import bitcoin from './API/bitcoin'
import user from './API/user'
import utils from './utils'
const config = {
      // baseURL: process.env.NODE_ENV === 'production'?'/':'http://localhost:3000/'+'apis',
      baseURL: process.env.NODE_ENV === 'production'?'http://localhost:3000/'+'apis':'http://localhost:3000/'+'apis',

      withCredentials: true,
} 
const service = axios.create(config)
// POST 传参序列化
service.interceptors.request.use( config => {
      // 客户端：统一添加Ticket
      if(process.client){
          let Ticket = utils.getCookie('Ticket')
          Object.assign(config.headers, { 'Ticket':Ticket});
      }
      return config;
  }, error => {
    return Promise.reject(error)
  }
)
// 返回结果处理
service.interceptors.response.use( res => {

    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
      if (res.data.Data) {
        res.data.Data = dataHandler(JSON.parse(JSON.stringify(res.data.Data)))

        function dataHandler(d) {
          if (Object.prototype.toString.call(d) === '[object Object]') {
            for (let key in d) {
              if (typeof d[key] === "string") {
                if (/\/upload\//.test(d[key])) {
                  d[key] = d[key].replace(/\/upload\//g, 'https://stage.oopsdaily.com' + '/upload/')
                }
              } else {
                dataHandler(d[key])
              }
            }
          } else if (Object.prototype.toString.call(d) === '[object Array]') {
            d.forEach((v, i) => {
                dataHandler(v)
            })
          }
          return d
        }
      }
    }
    return res
  }, error => {

    if (error && error.response) {
      if (error.response.status == 401) {
          if(process.client){
              if (error.response.config.url.indexOf('/Index/Logout') == -1) {
                store.commit('setIs401', true) //通知組件清除登錄信息
              }
          }
      } else if (error.response.status == 1200) {
        if(process.client){
          Message({
            message: '請勿頻繁操作！',
            type: 'warning',
            duration: 2000,
            showClose: true
          });
        }
      } else if (error.response.status == 500 || error.response.status == 502) {
        if(process.client){
          Message({
            message: '服務器異常，請稍後再試！',
            type: 'warning',
            duration: 3000,
            showClose: true
          });
        }
      }
    }
    return Promise.reject(error)
  }


  
)
service.article = new article(service)
service.account = new account(service)
service.bitcoin = new bitcoin(service)
service.user = new user(service)

export default service
