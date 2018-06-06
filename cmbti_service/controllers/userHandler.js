
const express = require('express')
// const router = express.Router()
const UserModel = require('../models/schema/user')
const myUtill = require('../models/utill')
const sha1 = require('sha1')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
//发送邮件功能
const sendMail = require('../controllers/sendMail')
// 随机验证码
const randomCodePng = require('../controllers/randomCodePng')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const Account = require('./accountHandler')

class User {
    constructor(){}
    // 查詢用戶是否註冊  {name:''}
    static checkNotRegister(options){
        return new Promise((resolve,reject)=>{
            UserModel.findOne({"name":options.name}).then(u=>{
                if(u){
                  reject('Registered')
                }else{
                  resolve('Not Registered')
                }
            })
        })
    }
    // 注册 {name:'',password:''}
    static register(options){
        return new Promise((resolve,reject)=>{
            // 查詢是否重複註冊
            User.checkNotRegister({name:options.name}).then(r=>{
                if(r){
                    let userRegister = new UserModel({
                        name: options.name,
                        password: sha1(options.password), // 将密码加密
                    })
                    userRegister.create_time = moment(objectIdToTimestamp(userRegister._id)).format('YYYY-MM-DD HH:mm:ss');
                    userRegister.save((err, user) => {
                        if(err) return reject('Register save faild')
                        // 加入account 庫
                        UserModel.findOne({"name":user.name}).then(u=>{
                            if(u){
                                Account.addAccountInfo({uid:u._id}).then(r=>{
                                    resolve(u) //成功
                                })
                            }
                        })
                    })
                    
                }else{
                    reject('Registered!The name exist')
                }
                
            }).catch(err=>{
               reject('Register faild')
            })
        })
    }
    //邮箱找回密碼 {email:''}
    static emailRetrieve(options){
      return new Promise((resolve,reject)=>{
          UserModel.findOne({
            name: options.email.toLowerCase()
          }) .then(user => {
            if (user) {
                    let url = 'http://localhost:7075/user/reset?'+'uid='+user._id+'&pwd='+user.password;
                    let body = `尊敬的用户：<br/>您通过邮箱方式提交了找回密码的请求，请点击下面的链接重置您的密码 。<br/><a href="${url}" target="_blank">${url}</a>`;
                    // 邮件激活
                    sendMail(options.email, "来自cmbti的邮件!", body ,function(){
                        resolve(options.email) //發送OK
                    })
                } else {
                  reject('The email is not registered')
                }
          })
      })
    }
    //重置密码 {uid:'',pwd:''}
    static resetPassword(options){
        return new Promise((resolve,reject)=>{
            UserModel.findOne({_id:options.uid}).then(user=>{
                if(user && user.password===options.pwd){
                  UserModel.update({"_id":options.uid},{$set:{"password":sha1(options.password)}},err=>{
                      if(err) return reject('Reset faild')
                      resolve('success')
                  })
                }else{
                    reject('Reset faild')
                }
            })   
        })   
    }
    // 登录 {name:'',password:'',req:object}
    static login(options){
      return new Promise((resolve,reject)=>{
          UserModel.findOne({ "name": options.name }).then(user => {
              if (!user) {
                reject('Not find the name')
              } else if (sha1(options.password) === user.password) {
                  resolve(user)
              } else {
                reject('賬號或密碼錯誤')
              }
          })
      })
    }

}

// 登出 delete user session
const delSession = (req, res) => {
  if (req.session.user){
      req.session.user = null;
  }
  res.json({
      success:true,
      message: '登出成功'
  })
}

module.exports = User