
const express = require('express')
const router = express.Router()
// const User = require('../models/schema/user')
// const UserHistory = require('../models/schema/user.history')
const myUtill = require('../models/utill')
// const sha1 = require('sha1')
// //时间处理模块
// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// //发送邮件功能
// const sendMail = require('../controllers/sendMail')
// // 随机验证码
// const randomCodePng = require('../controllers/randomCodePng')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')



      

// 注册  {name:'',password:''}
const register = (req, res,next) => {
    if(!myUtill.verifyEemail(req.body.name) || !myUtill.verifyPassword(req.body.password)){
          return res.json({
              success: false,
              message: '参数格式错误'
          })
    }
    User.register(req.body).then(u=>{
        res.json({
           success:true,
           nane:u.name
        })
    }).catch(err=>{
          console.log(err);
          res.json({
              success: false,
              message: '註冊失敗'
          })
    })
}
//查询用户名是否被注册 {name:''}
const checkNotRegister = (req,res)=>{
    if(!myUtill.verifyEemail(req.body.name)){
          return res.json({
              success: false,
              message: '参数格式错误'
          })
    }
    User.checkNotRegister({name:req.body.name}).then(r=>{
        res.json({
           success:true,
           message:"未註冊"
        })
    }).catch(err=>{
        res.json({
           success:false,
           nane:"已註冊"
        })
    })
}
//邮箱找回 {email:''}
const emailRetrieve = (req,res,next)=>{
    if(!myUtill.verifyEemail(req.body.email)){
          return res.json({
              success:false,
              message:"email格式错误"
          })
    }
    User.emailRetrieve({email:req.body.email}).then(email=>{
        res.json({
           success:true,
           message:"郵件已發送",
           email:email
        })
    }).catch(err=>{
        res.json({
           success:false,
           message:"操作失敗"
        })
    })
}
//重置密码  {uid:'',pwd:'',password:''}
const resetPassword = (req,res,next)=>{
    if(!req.body.uid || !myUtill.verifyPassword(req.body.password)){
          return res.json({
              success:false,
              message:"参数格式错误"
          })
    }
    User.resetPassword(req.body).then(r=>{
        res.json({
           success:true,
           message:"密碼重置成功"
        })
    }).catch(err=>{
        console.log(err);
        res.json({
           success:false,
           message:"操作失敗"
        })
    })
}

// 登录 {name:'',password:''}
const login = (req, res) => {
    if(!myUtill.verifyEemail(req.body.name) || !myUtill.verifyPassword(req.body.password)){
          return res.json({
            success: false,
            message: "参数格式错误"
          })
    }
    User.login(req.body).then(user=>{
              // 用户信息写入 session
        user.password = null;
        req.session.user = user;
        // 查詢userinfo
        Account.getUserInfoById({uid:user._id}).then(user=>{
            if(user){
                res.json({
                  success:true,
                  user:user,
                  message:'登錄成功'
                })
            }else{
              reject('查詢userinfo 失敗')
            }
        }).catch(err=>{
            res.json({
              success:false,
              message:"操作失敗"
            })
        })
    }).catch(err=>{
        console.log(err);
        res.json({
           success:false,
           message:"操作失敗"
        })
    })
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


// router.post('/register',checkNotLogin,register);
router.post('/register',register);
// router.post('/login',checkNotLogin,login);
router.post('/login',login);
router.post('/emailRetrieve',emailRetrieve); //邮箱找回密码
router.post('/reset',resetPassword);
// router.post('/search',checkLogin,search)
router.post('/delSession',delSession)
router.post('/checkNotRegister',checkNotRegister)

//   router.post('/register', checkNotLogin, Register),
//     router.post('/login', checkNotLogin, Login),
//     router.get('/user', checkLogin, delSession),
//     router.get('/', checkLogin, getSession)
module.exports = router