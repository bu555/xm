
const express = require('express')
const router = express.Router()
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const Example = require('../controllers/exampleHandler')
const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')

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
      let options = {}
      options.uid = req.session.user._id;
      options.eid = req.body.eid?req.body.eid:''
      options.result = req.body.result?req.body.result:'';
      if(!options.eid || !myUtill.testVote(options.result)){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }

      // 添加到vote list
      Example.addVote(options).then(example=>{
            Account.addVoteLog(options).then(r=>{
                res.json({
                    success:true,
                    message:'success',
                    example:example
                })
            })
      }).catch(error=>{
          console.log(error);
            res.json({
                success:false,
                message:"faild"
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
      let options = {
          uid: uid,
          eid: eid,
          result: result
      }
      // 添加到vote list
      Example.addComment(options).then(cid=>{
          options.cid = cid
            //添加个人记录
            Account.addCommentLog(options).then(r=>{
                res.json({
                    success:true,
                    message:'success',
                })
            })
      }).catch(error=>{
           console.log(error);
            res.json({
                success:false,
                message:error
            })
      })

}
// 获取评论
// const getComment = (req,res,next)=>{ //{page:num}
//       let uid = req.session.user ? req.session.user._id : ''
//       let eid = req.body.eid || ''
//       let page = req.body.page || ''
//       if(!eid || !myUtill.verifyNum(page)){
//           return res.json({
//               success:false,
//               message:'参数格式错误'
//           })
//       }
//     //   page = Number(page)
//       (async ()=>{
//           try{
//                 let num = 5  //每次5条
//                 let comment = await Example.comment.getComment({ eid: eid })
//                 let over = comment.list.length<=num*page  //是否还有数据
//                 let list = comment.list.slice(page*num-num,page*num)
//                 console.log(list);
//                 // (async ()=>{
//                     for(let i=0;i<list.length;i++){
//                         let temp = JSON.parse(JSON.stringify(list[i]))
//                         temp.zaned = false
//                         if(list[i].zan.indexOf(uid)!=-1){
//                             temp.zaned = true 
//                         }
//                         let user = await User.getUser({uid:list[i].uid})
//                         temp.role_name = user ? user.role_name :  '已注销'
//                         list[i] = temp
//                     }
//                     res.json({
//                         success:true,
//                         comment:list,
//                         over: over
//                     })
//                 // })
//            }catch(error){
//                 res.json({
//                     success:false,
//                     message:error
//                 })
//            }
//       })()


// }
// aid 获取评论 options {aid:'必传',page:'必传',size:'必传'}
const getComment = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user ? req.session.user._id : ''
        // options.eid = req.body.aid || ''
        // options.page = req.body.page || ''
      if(!options.eid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size)){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let size = myUtill.verifyNum(options.size) ? Number(options.size) : 5  //每次条数
                let page = myUtill.verifyNum(options.page) ? Number(options.page) : 1  //页数
                let list = await Example.getComment(options)
                let newList = JSON.parse(JSON.stringify(list.slice((options.page-1)*options.size, (options.page-1)*options.size + options.size)))
                let proArr = []
                newList.forEach((v,i)=>{
                    proArr.push(User.getUserById({uid:v.uid}))
                })
                let userList = await Promise.all(proArr)
                for(let i=0;i<newList.length;i++){
                    if(userList[i]){
                        newList[i].r_name = userList[i].r_name
                        newList[i].avatar = userList[i].avatar 
                    }else{
                        newList[i].r_name = '已注销'
                        newList[i].avatar = ''
                    }
                    if(options.uid){ //如果登錄，確認是否點過贊
                        newList[i].isZaned = newList[i].zan.indexOf(options.uid)===-1 ?  false : true
                    }
                    newList[i].zan = null
                }

                res.json({
                    success: true,
                    message: 'Success',
                    comment:newList,
                })
            }catch(err){
                console.log(err);
                return res.json({
                    success: false,
                    message: err 
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

router.post('/addExample',addExample);
router.post('/searchExample',searchExample);
router.post('/goVote',checkLogin,goVote);
router.post('/addComment',checkLogin,addComment);
router.post('/getExampleById',getExampleById);
router.post('/getComment',getComment);
router.post('/clickZan',checkLogin,clickZan);

module.exports = router