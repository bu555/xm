
const express = require('express')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const User = require('../controllers/user')
const Article = require('../controllers/articleHandler')
const Account = require('../controllers/accountHandler')

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






var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')

//     followUser({
//         body:{
//             uuid:'u5555',
//             status:'0'
//         },
//         session:{
//             user:{
//                 _id:'u000'
//             }
//         }
//     },{json:json})


    modifyUserInfo({
        body:{
            r_name:'依然',
            city:'020广州',
            birth:'2011-01-01',
            sex:'1',
            profile:'简简单单，明明白白'

        },
        session:{
            user:{
                _id:'u000'
            }
        }
    },{json:json})









})










// module.exports = (router) => {
//     router.post('/addArticle',checkLogin,addArticle);
//     router.post('/searchExample',searchExample);
//     router.post('/goVote',checkLogin,goVote);
//     router.post('/addComment',checkLogin,addComment);
//     router.post('/getExampleById',getExampleById);
//     router.post('/getComment',getComment);
//     router.post('/clickZan',checkLogin,clickZan);
// }