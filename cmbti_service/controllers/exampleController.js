
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
        return data
    }).then(data=>{
        let eid = data._id
        let example = data
        Promise.all([Vote.createVote({eid:eid}),Comment.createComment({eid:eid})]).then(data=>{
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

    // Example.createExample({
    //     name:name
    // }).then(data=>{
    //     let eid = data._id
    //     let example = data
    //     // 创建vote和commente记录
    //     Vote.createVote({eid:eid}).then(data=>{
    //         res.json({
    //             success:true,
    //             message:'success',
    //             example:example
    //         })
    //     },data=>{
    //         res.json({
    //             success:false,
    //             message:data
    //         })
    //     })
    // },data=>{
    //     res.json({
    //         success:false,
    //         message:data
    //     })
    // })


    // try{
    //     let exa = await Example.createExample({name:name})
    //     let eid = exa._id
    //     let a = await Vote.createVote({eid:eid})
    // }
    
}
const searchExample = (req,res,next)=>{
    let option = req.body.params
    Example.searchExample(option).then(example=>{
            // 分页处理
            let reg = /^[1-9]\d{0,}$/    // 非零非负整数
            let page = reg.test(option.page)? Number(option.page):1
            let size = reg.test(option.size)? Number(option.size):8
            let count = Math.ceil(example.length/size)
            let total = example.length
            if(!(example instanceof Array)){
                example = [example]
            }
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
      (async ()=>{
          try{
                await Vote.addVote({ uid: uid, eid: eid, result: result })
                let example = await  Example.updateExample({ eid:eid, type:result })
                res.json({
                    success:true,
                    message:'success',
                    example:example
                })
          }catch(error){
                res.json({
                    success:false,
                    message:error
                })
          }
      })()
}
const addComment = (req,res,next)=>{
    console.log(req.body.result);
    let uid = req.session.user._id;
    let eid = req.body.eid;
    let result = req.body.result;
    (async ()=>{
        try{
            await Comment.addComment({eid:eid,uid:uid,result:result})
            let comments = await Comment.getComment({eid:eid})
            res.json({
                success:true,
                message:'success',
                comments:comments
            })
        }catch(error){
            res.json({
                success:false,
                message:error
            })
        }

    })()
    
    
    
    // .then(data=>{
    //             res.json({
    //                 success:true,
    //                 message:'success',
    //                 example:example
    //             })
    // })
}

module.exports = (router) => {
    router.post('/addExample',addExample);
    router.post('/searchExample',searchExample);
    router.post('/goVote',checkLogin,goVote);
    router.post('/addComment',checkLogin,addComment);
}
