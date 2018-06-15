
const express = require('express')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const Example = require('../controllers/exampleHandler')
const Comment = require('../controllers/commentHandler')
const Vote = require('../controllers/vote')
const User = require('../controllers/user')

const addExample = (req,res)=>{
    let name = req.body.name || '';
    if(!name){
        return json({
            success: false,
            message: 'name为必需参数' 
        })
    }
    // 创建example
    Example.createExample({
        name:name
    }).then(example=>{
        res.json({
            success:true,
            message:'success',
            example:example
        })
    }).catch(error=>{
        res.json({
            success:false,
            message:error
        })
    })
    
}
const searchExample = (req,res,next)=>{
    let option = req.body.params
    Example.searchExample(option).then(example=>{
            // 分页处理
            if(!(example instanceof Array)){
                example = [example]
            }
            let reg = /^[1-9]\d{0,}$/    // 非零非负整数
            let page = reg.test(option.page)? Number(option.page):1
            let size = reg.test(option.size)? Number(option.size):8
            let count = Math.ceil(example.length/size)
            let total = example.length
            if(example.length>size){
                example = example.slice( (page-1)*size , page*size)
            }
            res.json({
                success:true,
                message:'ok',
                result:{
                    example:example,
                    size:size,
                    page:page,
                    count:count,
                    total:total
                }
            })
    },example=>{
        res.json({
            success:false,
            message:'未知错误'
        });
    })
}
// 投票
const goVote = (req,res,next)=>{
      let uid = req.session.user._id;
      let eid = req.body.eid?req.body.eid:''
      let result = req.body.result?req.body.result:'';
      if(!eid || !myUtill.testVote(result)){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }

      // 添加到vote list
      Example.addVote({
          uid: uid,
          eid: eid,
          result: result
      }).then(example=>{
            res.json({
                success:true,
                message:'success',
                example:example
            })
      }).catch(error=>{
            res.json({
                success:false,
                message:error
            })
      })

}
// 评论
const addComment = (req,res,next)=>{
      let uid = req.session.user._id;
      let eid = req.body.eid?req.body.eid:''
      let result = req.body.result?req.body.result:'';
      if(!eid || !result){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
      // 添加到vote list
      Comment.addComment({
          uid: uid,
          eid: eid,
          result: result
      }).then(comment=>{
            res.json({
                success:true,
                message:'success',
                // comment:comment
            })
      }).catch(error=>{
            res.json({
                success:false,
                message:error
            })
      })

}
// 获取评论
const getComment = (req,res,next)=>{ //{page:num}
      let uid = req.session.user ? req.session.user._id : ''
      let eid = req.body.eid || ''
      let page = req.body.page || ''
      if(!eid || !myUtill.verifyNum(page)){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
    //   page = Number(page)
      (async ()=>{
          try{
                let num = 5  //每次5条
                let comment = await Comment.getComment({ eid: eid })
                let over = comment.list.length<=num*page  //是否还有数据
                let list = comment.list.slice(page*num-num,page*num)
                console.log(list);
                // (async ()=>{
                    for(let i=0;i<list.length;i++){
                        let temp = JSON.parse(JSON.stringify(list[i]))
                        temp.zaned = false
                        if(list[i].zan.indexOf(uid)!=-1){
                            temp.zaned = true 
                        }
                        let user = await User.getUser({uid:list[i].uid})
                        temp.role_name = user ? user.role_name :  '已注销'
                        list[i] = temp
                    }
                    res.json({
                        success:true,
                        comment:list,
                        over: over
                    })
                // })
           }catch(error){
                res.json({
                    success:false,
                    message:error
                })
           }
      })()


}
// 评论点赞
const clickZan = (req,res,next)=>{ //{page:num}
      let uid = req.session.user._id
      let eid = req.body.eid || ''
      let cid = req.body.cid || ''
      if(!cid || !eid ||!uid){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
      (async ()=>{
          try{
                let zanCount = await Comment.clickZan({ eid: eid,cid:cid,uid:uid })

                res.json({
                    success:true,
                    zanCount:zanCount
                })
           }catch(error){
                res.json({
                    success:false,
                    message:error
                })
           }
      })()


}
const getExampleById = (req,res,next)=>{
    // let login = req.session.user  //是否登录
    let eid = req.body.eid || ''
    let uid = req.session.user ? req.session.user._id : ''
    if(!eid){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
    }
    Example.getExampleById({eid:eid,uid:uid}).then(example=>{
            if(example){
                res.json({
                    success:true,
                    message:'ok',
                    example:example,
                })
            }
    }).catch(error=>{
        res.json({
            success:false,
            message:error
        })
    })
}


module.exports = (router) => {
    router.post('/addExample',addExample);
    router.post('/searchExample',searchExample);
    router.post('/goVote',checkLogin,goVote);
    router.post('/addComment',checkLogin,addComment);
    router.post('/getExampleById',getExampleById);
    router.post('/getComment',getComment);
    router.post('/clickZan',checkLogin,clickZan);
}