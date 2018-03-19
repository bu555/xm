// const express = require('express')
// const User = require('../models/schema/user')
// const router = express.Router()
// const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
// const sha1 = require('sha1')

const express = require('express')
// const router = express.Router()
const User = require('../models/schema/user')
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
const Register = (req, res,next) => {

  console.log(req.body);
  console.log(req.body.password);
  console.log(req.body.name);
  User.find({name:req.body.name} ).then(user => {
    console.log(user);
      if (user) {
        res.json({
          code: '-1',
          error: '该账户已注册'
        })
      } else {}

    })
    .catch(err => res.json(err))
  console.log(  );
  // 这里的userRegister为mongoose中的
  // Entity —— 由Model创建的实体，使用save方法保存数据
  let userRegister = new User({
      name: req.body.name,
      password: sha1(req.body.password) // 将密码加密
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
          code: '-1',
          error: '该账户已注册'
        })
      } else {
          // 邮件激活
          // sendMail(userRegister.name, "来自cmpool的邮件!", "请点击http://127.0.0.1:7000/user/activation?email="+sha1(userRegister.name)+"激活你的账户！",function(){
          //     res.json({
          //         code:0,
          //         msg:"激活邮件已发送到"+userRegister.name+",请登录邮箱进行激活操作！"
          //     })
          // })
          userRegister.save((err, user) => {
            if (err) {
              res.json(err)
            } else {
              res.json({
                code:'0',
                msg:'注册成功！'
              })
            }
          })
      }
    })
    .catch(err => res.json(err))
}
//激活
const activation = (req,res,next)=>{
  console.log('1212');
    console.log(req.query.email)
    // console.log(req)
}

const search = (req,res,next)=>{
    res.json({
      msg:'okokok'
    })
}

// 登录
const Login = (req, res) => {
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
          message: "账号不存在"
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
          name: user.name,
          // 账户创建日期
          time: moment(objectIdToTimestamp(user._id))
            .format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        res.json({
          success: false,
          message: "密码错误"
        })
      }
    })
    .catch(err => res.json(err))
}

module.exports = (router) => {
    router.post('/register',checkNotLogin,Register);
    router.post('/login',checkNotLogin,Login);
    router.get('/activation',activation);
    router.get('/randomCodePng',randomCodePng);
    router.post('/search',checkLogin,search)

//   router.post('/register', checkNotLogin, Register),
//     router.post('/login', checkNotLogin, Login),
//     router.get('/user', checkLogin, delSession),
//     router.get('/', checkLogin, getSession)
}