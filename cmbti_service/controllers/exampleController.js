
const express = require('express')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const Example = require('../controllers/example')
const Vote = require('../controllers/vote')
const Comment = require('../controllers/comment')
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
    }).then(data=>{
        let eid = data._id
        let example = data

        // 创建vote和comment记录
        Promise.all([Vote.createVote({eid:eid}),Comment.createComment({eid:eid})])
        .then(data=>{
            res.json({
                success:true,
                message:'success',
                example:example
            })
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
      Vote.addVote({
          uid: uid,
          eid: eid,
          result: result
      }).then(data=>{
            // 成功,更新example
            return Example.updateExample({
                eid:eid,
                type:result
            })
      }).then(data=>{
                res.json({
                    success:true,
                    message:'success',
                    example:data
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
      }).then(data=>{
            res.json({
                success:true,
                message:'success'
            })
      }).catch(error=>{
            res.json({
                success:false,
                message:error
            })
      })

}
// 获取评论
const getComment = (req,res,next)=>{
      let eid = req.body.eid || ''
      if(!eid){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
      (async ()=>{
          try{
                let comment = await Comment.getComment({ eid: eid })
                res.json({
                    success:true,
                    comment:comment
                })
           }catch(error){
                res.json({
                    success:false,
                    message:error
                })
           }
      })()


    //   Comment.getComment({
    //       eid: eid
    //   }).then(comment=>{
    //         res.json({
    //             success:true,
    //             comment:comment
    //         })
    //   }).catch(error=>{
    //         res.json({
    //             success:false,
    //             message:error
    //         })
    //   })

}
const getExampleById = (req,res,next)=>{
    let login = req.session.user  //是否登录
    let eid = req.body.eid || ''
    if(!eid){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
    }
    // Example.findById(eid,example=>{
    Example.searchExample({eid:eid}).then(example=>{
        if(req.session.user){
            // 如果登录了，查询是否已vote
            Vote.checkVote({eid:eid,uid:req.session.user._id}).then(r=>{
                res.json({
                    success:true,
                    message:'ok',
                    example:example,
                    repeat:r  //是否重复
                })
            })
        }else{
            res.json({
                success:true,
                message:'ok',
                example:example,
                repeat:false
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
}