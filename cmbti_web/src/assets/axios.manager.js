import axios from 'axios';
import { Loading, Message,MessageBox } from 'element-ui'
import router from '../router/index'
import Vue from 'vue';
import store from '../store/store'

var path = "http://localhost:7000/"; // dev
// var path = "/"; //prod
var pathAPI = path+"api"; //代理服务器API路由
var pathImgs = path+"imgs"; //代理服务器图片路由
Vue.prototype.$pathImgs = pathImgs  
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 7000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    loadinginstace = Loading.service({ fullscreen: true })
    return config
}, error => {
    loadinginstace.close()
    Message.error({
    message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    loadinginstace.close()
    if(data.data.message==='noLogin' && data.data.code==='-5'){
        store.state.modalLogin = true
        Promise.reject(error)
    }else{
        return data
    }
}, error => {
    loadinginstace.close()
    Message.error({
    message: '加载失败'
    })
    return Promise.reject(error)
})

// 参考：http://www.jb51.net/article/112147.htm


export default {
    //注册 {name:'',password:''}
    register(data){
        return axios.post(pathAPI+'/user/register',data);
    },
    //登录 {name:'',password}
    login(data){
        return axios.post(pathAPI+'/user/login',data);
    },
    //邮箱找回密码 {email:''}
    emailRetrieve(data){
        return axios.post(pathAPI+'/user/emailRetrieve',data);
    },
    //密码重设 {password:'new password',uid:'',pwd:''} 
    resetPwd(data){
        return axios.post(pathAPI+'/user/reset',data);
    },
    //用户登出 
    delSession(){
        return axios.post(pathAPI+'/user/delSession');
    },
    //查询用户信息（调试）
    search(){
        return axios.post(pathAPI+'/user/search');
    },
    //是否登录已失效
    isLogin(){
        return axios.post(pathAPI+'/user/isLogin');
    },

    //爬取数据添加example  （）
    addExample(data){
        return axios.post(pathAPI+'/example/addExample',data);
    },
    //获取example
    getExample(){
        return axios.post(pathAPI+'/example/getExample');
    },
    // //获取example
    // searchExample(data){
    //     return axios.post(pathAPI+'/example/searchExample',data);
    // },
    //投票
    goVote(data){
        return axios.post(pathAPI+'/example/goVote',data);
    },
    //精确查询  {name:(模糊),id:精确,type：（模糊））
    searchExample(data){
        return axios.post(pathAPI+'/example/searchExample',data);
    },
    // //模糊查询 name或type
    // fuzzyExample(data){
    //     return axios.post(pathAPI+'/example/fuzzyExample',data);
    // },
    //添加评论  {eid:'',result:'xxxx'}
    addComment(data){
        return axios.post(pathAPI+'/example/addComment',data);
    },
    //获取评论  {eid:''}
    getComment(data){
        return axios.post(pathAPI+'/example/getComment',data);
    },
    //评论点赞  {eid:''，cid:''}
    clickZan(data){
        return axios.post(pathAPI+'/example/clickZan',data);
    },
    //获取example数据  {eid:''}
    getExampleById(data){
        return axios.post(pathAPI+'/example/getExampleById',data);
    },
}
