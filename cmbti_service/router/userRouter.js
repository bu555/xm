
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

var fm = require('formidable');
const fs = require('fs')
const path = require('path')


      

// 注册  {name:'',password:''}
const register = (req, res,next) => {
    if(!myUtill.verifyEemail(req.body.name) || !myUtill.verifyPassword(req.body.password)){
          return res.json({
              success: false,
              message: '参数格式错误'
          })
    }
    User.register(req.body).then(uName=>{
        res.json({
           success:true,
           nane:uName
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
        req.session.user = user;
        let _user = JSON.parse(JSON.stringify(user))
        delete _user.name
        delete _user.password
        delete _user.create_time
        res.json({
            success:true,
            user:_user,
            message:'登錄成功'
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
// 获取用户信息（用户中心）
const getUserInfoById = (req, res) =>{  
    // console.log(req.session.user);
    // console.log()
    // let uid = req.session.user._id
    (async ()=>{
        try{
            let user = await User.getUserById({uid:req.session.user._id})
            if(user){
                res.json({
                    success: true,
                    data:user
                })
            }else{
                res.json({
                    success: false,
                    data:user
                })
            }
        }catch(err){
            console.log(err);
            res.json({
                success: false
            })
        }
    })()
}
// 修改用户信息
const modifyUserInfo = (req, res) =>{  
    let options = req.body || {}
    options.uid = req.session.user._id
    User.modifyUser(options).then(result=>{
            res.json({
                success: true
            })
    }).catch(err=>{
            res.json({
                success: false
            })
    })
    // (async ()=>{
    //     try{
    //         options.uid = req.session.user._id
    //         let modify = await User.modifyUser(options)
    //         res.json({
    //             success: true
    //         })
    //     }catch(err){
    //         console.log(err);
    //         res.json({
    //             success: false
    //         })
    //     }
    // })()
}


// 上傳用戶頭像
const uploadPhoto = (req,res)=>{
    let uid = req.session.user._id
    let avatarPath = '/'+uid+'.jpg'
    // 5.1创建formidable文件解析上传数据
    // 注:下载安装formidable，引入formidable再创建formidable
    var form = new fm.IncomingForm();
    // 5.2设置路径
    // 注：把路径设置为静态路径下的uploads，需在public下创建uploads
    form.uploadDir=path.join(__dirname,'../avatar')
    // uploadDir设置文件的上传的路径
    // 5.3解析上传内容
    form.parse(req);
    form.on('end',function(){
        User.modifyUser({avatar:avatarPath,uid:uid}).then(r=>{
            res.json({
                success:true
            })
        }).catch(err=>{
            res.json({
                success:false
            })
        })
    })
    // 5.5监听file事件(在服务器的路径下，有上传的文件)，处理上传内容
    form.on('file',function(field,file){//file是上传的文件
        // 5.5.1 更改上传文件的名字
        // 更改
        fs.renameSync(file.path,path.join(form.uploadDir,avatarPath))
        // 第一个参数file.path表示上传的文件所在的路径
        // 5.5.2发送给浏览器端(客户端)
    })
}

// 获取多个用户 展示 {uid:[id1,id2 ...]}
const userInfoListShow = (req, res) =>{  
    let options = req.body || {}
    if(!options.uid || !(options.uid instanceof Array) || !(options.uid.length>0) ){
          return res.json({
            success: false,
            message: "参数格式错误"
          })
    }
    (async ()=>{
        try{
            let proArr = [] 
            options.uid.forEach((v,i)=>{
                proArr.push(User.getUserById({uid:v}))
            })
            let list = await Promise.all(proArr)
            res.json({
                success: true,
                data:list
            })
        }catch(err){
            res.json({
                success: false
            })
        }
    })()
}







router.post('/register',register);
router.post('/login',login);
router.post('/emailRetrieve',emailRetrieve); //邮箱找回密码
router.post('/reset',resetPassword);
router.post('/delSession',delSession)
router.post('/checkNotRegister',checkNotRegister)
router.post('/modifyUserInfo',checkLogin,modifyUserInfo)
router.get('/getUserInfo',checkLogin,getUserInfoById)
router.post('/uploadPhoto',checkLogin,uploadPhoto);
router.post('/userInfoListShow',userInfoListShow);
module.exports = router