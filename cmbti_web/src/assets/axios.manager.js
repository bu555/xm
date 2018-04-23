import axios from 'axios';
import { Loading, Message,MessageBox } from 'element-ui'
import router from '../router/index'
import Vue from 'vue';
// var path = "http://127.0.0.1:7000/api";
var path = "http://localhost:7000/api";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 7000;
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    // loadinginstace = Loading.service({ fullscreen: true })
    return config
}, error => {
    // loadinginstace.close()
    Message.error({
    message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    // loadinginstace.close()
    return data
}, error => {
    // loadinginstace.close()
    Message.error({
    message: '加载失败'
    })
    return Promise.reject(error)
})

// 参考：http://www.jb51.net/article/112147.htm


export default {
    //注册 {name:'',password:''}
    register(data){
        return axios.post(path+'/user/register',data);
    },
    //登录 {name:'',password}
    login(data){
        return axios.post(path+'/user/login',data);
    },
    //邮箱找回密码 {email:''}
    emailRetrieve(data){
        return axios.post(path+'/user/emailRetrieve',data);
    },
    //密码重设 {password:'new password',uid:'',pwd:''} 
    resetPwd(data){
        return axios.post(path+'/user/reset',data);
    },
    //用户登出 
    delSession(){
        return axios.post(path+'/user/delSession');
    },
    //查询用户信息（调试）
    search(){
        return axios.post(path+'/user/search');
    },
    //是否登录已失效
    isLogin(){
        return axios.post(path+'/user/isLogin');
    },

    //爬取数据添加example  （）
    addExample(data){
        return axios.post(path+'/example/addExample',data);
    },
    //获取example
    getExample(){
        return axios.post(path+'/example/getExample');
    },
    // //获取example
    // searchExample(data){
    //     return axios.post(path+'/example/searchExample',data);
    // },
    //投票
    goVote(data){
        return axios.post(path+'/example/goVote',data);
    },
    //精确查询  {name:(模糊),id:精确,type：（模糊））
    searchExample(data){
        return axios.post(path+'/example/searchExample',data);
    },
    // //模糊查询 name或type
    // fuzzyExample(data){
    //     return axios.post(path+'/example/fuzzyExample',data);
    // },
}
