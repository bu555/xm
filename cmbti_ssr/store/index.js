import axios from '~/plugins/axios'
import { resolve } from 'path';
// window.fetch() 的 Polyfill
require('whatwg-fetch')
export const state = () => ({
    navTypes:[],
    user_info:null,
    authUser:null,
    utils:null,
    Bitcoin: '', // 比特幣價格{quotes:'报价',currency:'币种'}
    currentCurrency:'', // 当前币种
    code401:0, //返回401（无登录权限）
    refreshUserInfo:0, //通知刷新userinfo
  })
  
export const mutations = {
    setNavTypes(state,obj){
        state.navTypes = obj
    },
    setUserInfo(state,userInfo){
        state.user_info = userInfo
    },
    SET_USER(state,user){
        state.authUser = user
    },
    setUtils(state,utils){
        state.utils = utils
    },
    setBitcoin(state,obj){
        state.Bitcoin = obj
    },
    setCurrentCurrency(state,val){
        state.currentCurrency = val
    },
    setCode401(state){
        state.code401 += 1
    },
    refreshUserInfo(state){
        state.refreshUserInfo += 1
    }
}

export const actions = {
    // 改变code401
    changeCode401({commit}){
        commit('setCode401')
    },
    getNavType({commit}){
        return new Promise((resolve,reject)=>{
            axios.article.nav_type().then(res=>{
                commit('setNavTypes',res.data.Data)
                resolve(res.data.Data)  
            })
        })
    },
    getUserInfo({commit}){
        return new Promise((resolve,reject)=>{
            axios.account.userInfo().then(res=>{
                commit('setUserInfo',res.data.Data)
                resolve(res.data.Data)  
            })
        })
    },
    // 登录
    login ({ commit }, { username, password }) {
        // return axios.account.login({
        //     loginName: username,
        //     loginPwd: password
        // }).then(res=>{
        //     if(res.data.resultCode!==200){
        //         throw new Error('Bad credentials')
        //     }else{
        //         return res.json()
        //     }
        // }).then(authUser=>{
        //     commit('SET_USER', authUser)
        // })
        return fetch('http://localhost:3000/api/login', {
          // 发送客户端 cookies 到服务端
          credentials: 'same-origin',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        })
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            return res.json()
          }
        })
        .then((authUser) => {
          commit('SET_USER', authUser)
        })
    },
    logout ({ commit }) {
        return fetch('/api/logout', {
          // 发送客户端 cookies 到服务端
          credentials: 'same-origin',
          method: 'POST'
        })
        .then(() => {
          commit('SET_USER', null)
        })
    },
    nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
          commit('SET_USER', req.session.authUser)
        }
    }
}

