
const express = require('express')
const router = express.Router();
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
// const User = require('../controllers/user')
const Article = require('../controllers/articleHandler')
const Account = require('../controllers/accountHandler')
const fs = require('fs')
const path = require('path')

var fm = require('formidable');

const json = (d)=>{console.log(d);}

// 关注/取消关注 options {uuid:'',status:'1或0'}
const followUser = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !options.uuid || !options.status){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let r = await Account.followUser(options)

                res.json({
                    success: true,
                    message: 'Success'
                })

            }catch(err){
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 修改用户信息 options {r_name:'',profile:'', sex:'',city:'-1',birth'',}
const modifyUserInfo = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(typeof(options.r_name)!=='string' || typeof(options.profile)!=='string' || typeof(options.sex)!=='string' || typeof(options.city)!=='string' || typeof(options.birth)!=='string'){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          {
            //   xss处理
          }
          try{
                let r = await Account.modifyInfo(options)

                res.json({
                    success: true,
                    message: 'Success'
                })

            }catch(err){
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 上傳用戶頭像
const uploadPhoto = (req,res)=>{
    // 5.1创建formidable文件解析上传数据
    // 注:下载安装formidable，引入formidable再创建formidable
    var form = new fm.IncomingForm();
    // 5.2设置路径
    // 注：把路径设置为静态路径下的uploads，需在public下创建uploads
    form.uploadDir=path.join(__dirname,'/uploads')
    // uploadDir设置文件的上传的路径
    // 5.3解析上传内容
    form.parse(req);
    form.on('end',function(){
        console.log('upload success')
    })
    // 5.5监听file事件(在服务器的路径下，有上传的文件)，处理上传内容
    form.on('file',function(field,file){//file是上传的文件
        // 5.5.1 更改上传文件的名字
        // 使用同步更改
        fs.renameSync(file.path,path.join(form.uploadDir,'/icon.png'))
        // 第一个参数file.path表示上传的文件所在的路径
        // 5.5.2发送给浏览器端(客户端)
        res.json({
            success:true
        })
    })
}


router.post('/uploadPhoto',uploadPhoto);
// router.post('/searchExample',searchExample);
// router.post('/goVote',checkLogin,goVote);
// router.post('/addComment',checkLogin,addComment);
// router.post('/getExampleById',getExampleById);
// router.post('/getComment',getComment);
// router.post('/clickZan',checkLogin,clickZan);
module.exports = router