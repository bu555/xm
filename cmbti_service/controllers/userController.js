// const express = require('express')
// const User = require('../models/schema/user')
// const router = express.Router()
// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const sha1 = require('sha1')

const express = require('express')
// const router = express.Router()
const User = require('../models/schema/user')
const UserHistory = require('../models/schema/user.history')
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


      

// 注册 
const register = (req, res,next) => {
  console.log(req.body);
  // 这里的userRegister为mongoose中的
  // Entity —— 由Model创建的实体，使用save方法保存数据
  let userRegister = new User({
      name: req.body.name,
      password: sha1(req.body.password), // 将密码加密
      role_name: myUtill.getRoleName()
      // role_name: (()=>{
      //       let role_name = '',
      //       for(let i=0;i<4;i++){
      //           let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
      //           role_name+=(String.fromCharCode(97+ranNum)); //65=A
      //       }
      //       return role_name;
      // })()
  })
  // 将 objectId 转换为 用户创建时间
  // objectId即为每一行数据中的_id
  // ObjectId 是一个12字节 BSON 类型数据，有以下格式：
  // 前4个字节表示时间戳
  // 接下来的3个字节是机器标识码
  // 紧接的两个字节由进程id组成（PID）
  // 最后三个字节是随机数。
  // 因此objectIdToTimestamp的作用即是将前4个字节的时间戳转化
  userRegister.create_time = moment(objectIdToTimestamp(userRegister._id)).format('YYYY-MM-DD HH:mm:ss');
  User.findOne({
       name: (userRegister.name).toLowerCase()
    })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          message: '该账户已注册'
        })
      } else {
          userRegister.save((err, user) => {
            if (err) {
              res.json({
                success:false,
                message:'用户信息保存失败'
              })
            } else {
                let _user = user;
                //查询用户总数并返回
                User.find().then(user => {
                    res.json({
                      success:true,
                      message:'注册成功',
                      name:_user.name,
                      count:user.length
                    })
                })
            }
          })
      }
    })
    .catch(err => res.json(err))
}
//查询用户名是否被注册
const searchUser = (req,res)=>{
    User.findOne({

    })
}
//邮箱找回
const emailRetrieve = (req,res,next)=>{
    let email = req.body.email;
    User.findOne({
       name: email.toLowerCase()
    }) 
    .then(user => {
      if (user) {
          console.log(user);
          let url = 'http://localhost:7075/user/reset?'+'uid='+user._id+'&pwd='+user.password;
          let body = `尊敬的用户：<br/>您通过邮箱方式提交了找回密码的请求，请点击下面的链接重置您的密码 。<br/><a href="${url}" target="_blank">${url}</a>`;
          // 邮件激活
          sendMail(email, "来自cmbti的邮件!", body ,function(){
            console.log('发送邮件成功');
                  res.json({
                      success:true,
                      message:"邮件已发送",
                      email:email
                  })
              })
          } else {
            res.json({
              success:false,
              message:'此邮箱未注册！'
            })
          }
    })
    .catch(err => res.json(err))
}
//重置密码
const resetPassword = (req,res,next)=>{
    console.log(req.body);
    // res.redirect('http://localhost:7075/user/reset'); //重定向
    User.findOne({_id:req.body.uid}).then(user=>{
        if(user && user.password===req.body.pwd){
          let update_where = {_id: req.body.uid};
          let update_data = {password:sha1(req.body.password)};
          User.update(update_where,{$set:update_data},err=>{
              if(err){
                res.json({
                  success:false,
                  message:'设置失败，请稍后再试！'
                })
              }else{
                res.json({
                  success:true,
                  message:'设置成功'
                })
              }
          })
        }else{
            res.json({
              success:false,
              message:'此链接已失效！'
            })
        }
    })
    // User.findOne({
    //    _id: req.body.uid
    // })
    // .then(user => {
    //    if(req.body.pwd === user.password){
    //       user.password = req.body.password;
    //    }
    //   console.log(user);
      // if (!user) {
      //   res.json({
      //     success: false,
      //     message: "账号不存在"
      //   })
      // } else if (userLogin.password === user.password) {
      //   var name = req.body.name;
      //   // 用户信息写入 session
      //   user.password = null;
      //   req.session.user = user;
      //   res.json({
      //     success: true,
      //     message: "登录成功",
      //     // session: req.session,
      //     name: user.name,
      //     // 账户创建日期
      //     time: moment(objectIdToTimestamp(user._id))
      //       .format('YYYY-MM-DD HH:mm:ss')
      //   })
      // } else {
      //   res.json({
      //     success: false,
      //     message: "密码错误"
      //   })
      // }
    // })
    // .catch(err => res.json(err))
    // res.render('http://localhost:7075/user/reset');
    // res.location('http://127.0.0.1:7075/user/reset');
    
}

const search = (req,res,next)=>{
  console.log( moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
 
    User.find({ })
    .then(user => {
      return res.json({
        msg:user,
        code:0
      })
    })
}

// 登录
const login = (req, res) => {
  let userLogin = new User({
    name: req.body.name,
    password: sha1(req.body.password)
  })
  User.findOne({
      name: userLogin.name
    })
    .then(user => {
      console.log(user);
      if (!user) {
        res.json({
          success: false,
          // message: "账号不存在!"
          message: "账号或密码错误!"
        })
      } else if (userLogin.password === user.password) {
        var name = req.body.name;
        // 用户信息写入 session
        user.password = null;
        req.session.user = user;
        res.json({
          success: true,
          message: "登录成功",
          // session: req.session,
          user: user,
          // 账户创建日期
          time: moment(objectIdToTimestamp(user._id))
            .format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        res.json({
          success: false,
          // message: "密码错误！"
          message: "账号或密码错误！"
        })
      }
    })
    .catch(err => res.json(err))
}
// 登出 delete user session
const delSession = (req, res) => {
  req.session.user = null;
  res.json({
      success:true,
      message: '登出成功'
  })
}
const isLogin = (req,res)=>{
    res.json({
      success:true,
      message:'已登录'
    })
}

module.exports = (router) => {
    router.post('/register',checkNotLogin,register);
    router.post('/login',checkNotLogin,login);
    router.post('/emailRetrieve',emailRetrieve); //邮箱找回密码
    router.post('/reset',resetPassword);
    // router.post('/search',checkLogin,search)
    router.post('/search',checkLogin,search)
    router.post('/delSession',checkLogin,delSession)
    router.post('/isLogin',checkLogin,isLogin) //检查是否登录

//   router.post('/register', checkNotLogin, Register),
//     router.post('/login', checkNotLogin, Login),
//     router.get('/user', checkLogin, delSession),
//     router.get('/', checkLogin, getSession)
}