import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    // 已登录的用户名
    userName:'',
    //通知使用模态框登录
    modalLogin:false,
    modalLoginSuccess:false,
} 
const mutations = {
    //存储用户信息
    setUserName(state,name){
        state.userName = name;
    },
    setModalLogin(state,value){
        state.modalLogin = value;
    },
    setModalLoginSuccess(state,value){
        state.modalLoginSuccess = value;
    }
}
export default new Vuex.Store({
    state,
    mutations,
});

