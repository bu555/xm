
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
var xss = require('xss');
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
                message:error
            })
      })

}
// 评论 options:{eid:'',result:''}
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
          result: xss(result),
          cid: req.body.cid ? req.body.cid :''
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
                // 排序
                if(options.type && options.type==='hot'){
                    let temp
                    for(let i=0;i<list.length;i++){
                        let flag = 1
                        for(let j=0;j<list.length-i-1;j++){
                            if(list[j].zans<list[j+1].zans){
                                temp = list[j]
                                list[j] = list[j+1]
                                list[j+1] = temp
                                flag = 0
                            }
                        }
                        if(flag===1) break  //如果没发生交换，说明数组有序
                    }
                }else if(options.type && options.type==='time'){
                    list = list.reverse() //倒置
                }

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
                    // 在回复别的情况下,根据cid获取对应信息
                    if(newList[i].replay){
                        for(let k=0;k<list.length;k++){
                            if(list[k].cid===newList[i].replay){
                                let u = await User.getUserById({uid:list[k].uid})
                                newList[i].rep = {
                                    content:list[k].content,
                                    r_name:u.r_name,
                                    uid:list[k].uid
                                }
                            }
                        }
                    }
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
const clickCommentZan = (req,res,next)=>{ //{page:num}
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.eid || !options.cid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Example.clickCommentZan(options)  
            
            res.json({
                success: true,
                message: 'success',
                result: r,  //count 1 或-1
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
// 根据id获取example详情
const getExampleById = (req,res,next)=>{
    // let login = req.session.user  //是否登录
    let eid = req.query.eid || ''
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
router.get('/getExampleById',getExampleById);
router.post('/getComment',getComment);
router.post('/clickCommentZan',checkLogin,clickCommentZan);

module.exports = router