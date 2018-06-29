
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
const Example = require('../controllers/exampleHandler')
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
// 获取用户评论历史展示 返回格式：{aid:[{aid:'',cid:[id,id,..]}],eid:[{eid:'',cid:[id,id,..]}]}
const getCommentList = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    (async ()=>{
        try{
            let added = [] //存放已添加的eid 或aid
            let myComment = {
                eid:[],
                aid:[]  //[{aid:'',cid:[id,id,id]}]
            }
            let accountInfo = await Account.getUserInfoById(options)
            for(let i=0;i<accountInfo.my_comment.length;i++){
                if( added.indexOf(accountInfo.my_comment[i].eid)>-1 || added.indexOf(accountInfo.my_comment[i].aid)>-1) continue;
                let item = {cid:[]}
                if(accountInfo.my_comment[i].eid){
                    added.push(accountInfo.my_comment[i].eid)
                    item.eid = accountInfo.my_comment[i].eid
                }
                if(accountInfo.my_comment[i].aid){
                    added.push(accountInfo.my_comment[i].aid)
                    item.aid = accountInfo.my_comment[i].aid
                }
                item.cid.push(accountInfo.my_comment[i].cid)
                for(let j=i+1;j<accountInfo.my_comment.length;j++){
                    if(accountInfo.my_comment[i].eid){
                        if(accountInfo.my_comment[i].eid===accountInfo.my_comment[j].eid){
                            item.cid.push(accountInfo.my_comment[j].cid)
                        }
                    }
                    if(accountInfo.my_comment[i].aid){
                        if(accountInfo.my_comment[i].aid===accountInfo.my_comment[j].aid){
                            item.cid.push(accountInfo.my_comment[j].cid)
                        }
                    }
                }
                if(accountInfo.my_comment[i].eid){
                    myComment.eid.push(item)
                }
                if(accountInfo.my_comment[i].aid){
                    myComment.aid.push(item)
                }
                
            }
            
            res.json({
                success: true,
                message: 'Success',
                data: myComment  //返回处理后的评论记录

            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// 獲取評論 options:{aid:[{aid:'',cid:[c1,c2,...]}]} 獲取文章評論
const getMyCommentArt = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !(Object.keys(options).indexOf('aid')>-1) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      if(!(options.aid instanceof Array) || !options.aid.length>0 ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let proArr = []
                options.aid.forEach((v,i)=>{
                    proArr.push(Article.getCommentByCid(v))
                })
                let itemList = await Promise.all(proArr)

                res.json({
                    success: true,
                    data:itemList
                })

            }catch(err){
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}
// 獲取評論 options:{eid:[{eid:'',cid:[c1,c2,...]}]} 獲取名人評論
const getMyCommentExa = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user._id
      if(!options.uid || !(Object.keys(options).indexOf('eid')>-1) ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      if(!(options.eid instanceof Array) || !options.eid.length>0 ){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let proArr = []
                options.eid.forEach((v,i)=>{
                    proArr.push(Example.getCommentByCid(v))
                })
                let itemList = await Promise.all(proArr)

                res.json({
                    success: true,
                    data:itemList
                })

            }catch(err){
                console.log(err);
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
router.get('/getCommentList',checkLogin,getCommentList);
router.post('/getMyCommentArt',checkLogin,getMyCommentArt);
router.post('/getMyCommentExa',checkLogin,getMyCommentExa);
// router.post('/goVote',checkLogin,goVote);
// router.post('/addComment',checkLogin,addComment);
// router.post('/getExampleById',getExampleById);
// router.post('/getComment',getComment);
// router.post('/clickZan',checkLogin,clickZan);
module.exports = router