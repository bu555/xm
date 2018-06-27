
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
const User = require('../controllers/userHandler')
const fs = require('fs')
const path = require('path')


const json = (d)=>{console.log(d);}

// 获取账户info options {} //需登錄
const getAccountInfoById = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let r = await Account.getUserInfoById(options)

                res.json({
                    success: true,
                    message: 'Success',
                    data:r
                })

            }catch(err){
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 关注/取消关注用户 options:{uid:'',uuid:'',status:'1'/'0'} 1关注 0取消关注
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
// const modifyUserInfo = (req,res)=>{
//         let options = req.body || {}
//         options.uid = req.session.user._id
//       if(typeof(options.r_name)!=='string' || typeof(options.profile)!=='string' || typeof(options.sex)!=='string' || typeof(options.city)!=='string' || typeof(options.birth)!=='string'){
//           return res.json({
//               success:false,
//               message:'Params Error'
//           })
//       }
//       (async ()=>{
//           {
//             //   xss处理
//           }
//           try{
//                 let r = await Account.modifyInfo(options)

//                 res.json({
//                     success: true,
//                     message: 'Success'
//                 })

//             }catch(err){
//                 return res.json({
//                     success: false,
//                     message: 'catch error' 
//                 })
//             }
//       })()
// }

router.get('/getAccountInfo',checkLogin,getAccountInfoById);
// router.post('/goVote',checkLogin,goVote);
// router.post('/addComment',checkLogin,addComment);
// router.post('/getExampleById',getExampleById);
// router.post('/getComment',getComment);
// router.post('/clickZan',checkLogin,clickZan);
module.exports = router