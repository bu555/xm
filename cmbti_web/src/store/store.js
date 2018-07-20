import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    userInfo:{},
    //通知使用模态框登录
    modalLogin:false,
    modalLoginSuccess:false,
    loginOut:false,
    refUser:false,
    refCurrent:false,
    meta:{}
} 
const mutations = {
    //存储用户信息
    setUserInfo(state,user){
        state.userInfo = user;
    },
    setModalLogin(state,value){
        state.modalLogin = value;
    },
    setModalLoginSuccess(state,value){
        state.modalLoginSuccess = value;
    },
    setAccountInfo(state,obj){
        state.accountInfo = obj;
    },
    setMeta(state,value){
        state.meta = value;
    },
}
export default new Vuex.Store({
    state,
    mutations,
});

