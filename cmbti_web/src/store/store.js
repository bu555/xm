import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    userInfo:null,
    //通知使用模态框登录
    modalLogin:false, //显示模态框登录
    loginOut:false, //通知退出登录
    refUser:0, //通知刷新用户信息,递加1
    meta:{},
    myTabName:'', //个人中心tab名字
    fromPath:'', //记录来自路由
    account:{},

} 
const mutations = {
    //存储用户信息
    setUserInfo(state,user){
        state.userInfo = user;
    },
    setModalLogin(state,value){
        state.modalLogin = value;
    },
    setMeta(state,value){
        state.meta = value;
    },
    setFromPath(state,value){
        state.fromPath = value;
    },
    setAccount(state,account){
        state.account = Object.assign({},state.account,account);
    }
}
export default new Vuex.Store({
    state,
    mutations,
});

