import Vue from 'vue';
import Vuex from 'vuex';
// import {mutations} from '@/store/mutations'
Vue.use(Vuex);

const state = {
    // 已登录的用户名
    userName:'',
} 
const mutations = {
    //存储用户名
    setUserName(state,name){
        state.userName = name;
    }
}
export default new Vuex.Store({
    state,
    mutations,
});

