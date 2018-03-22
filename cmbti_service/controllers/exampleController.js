
const express = require('express')
const Example = require('../models/schema/example')
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
//发送邮件功能
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

// 添加example
const addExample = (req,res,next)=>{
    let vote = req.body.vote; //投票结果：类型
    if(myUtill.testVote(vote)===false){
        return res.json({
            success:false,
            message:'参数格式错误'
        })
    }
    let result = {e:0,i:0,s:0,n:0,t:0,f:0,j:0,p:0}; //初始化值
    for(let i=0;i<4;i++){
        if(vote.charAt(i)!=="*"){
            result[vote.charAt(i)] = 1;
        }
    }
    let exampleAdd = new Example({
        name:req.body.name,
        type:req.body.vote,
        vote:result
    })
    exampleAdd.create_time = moment(objectIdToTimestamp(exampleAdd._id)).format('YYYY-MM-DD HH:mm:ss');
    Example.findOne({
        name:exampleAdd.name
    }).then(example=>{
      if(example){
          res.json({
            success: false,
            message: '此名字已存在' 
          })
      }else{
          exampleAdd.save((err, example) => {
            if (err) {
                res.json(err)
            } else {
                res.json({
                  success:true,
                  message:'添加成功'
                })
            }
          })
      }
    })
}

const getExample = (req,res,next)=>{
    Example.find().then(example=>{
        res.json({
            success:true,
            example:example
        })
    })
}
// 查询example
const searchExample = (req,res,next)=>{
    if(req.body.name){
        pro = Example.find({ name:new RegExp(req.body.name,'i') });
    }else if(req.body.tag){
        pro = Example.find({ tag:new RegExp(req.body.tag,'i') });
    }else{
        return res.json({
            success:false,
            message:'参数错误'
        })
    }
    pro.then(example=>{
      if(example){
          res.json({
              success:true,
              message:'ok',
              result:example
          })
      }else{
          res.json({
              success:false,
              message:'未搜索到此名字',
              result:example
          }) 
      }
    })
}
//投票 （注：需要登录）
const goVote = (req,res,next)=>{
  console.log(req.session.user);
      let eid = req.body.eid;
      let vote = req.body.vote;
      if(myUtill.testVote(vote)===false){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }
      Example.findOne({_id:eid}).then(example=>{
          if(example){
              // 计算投票后的vote
              let temp = example.vote;
              for(let i=0;i<4;i++){
                  var char = vote.charAt(i);
                  if(char!=='*'){
                    temp[char] = temp[char]+1;
                    console.log(char);
                  }
              }
              //计算当前每个维度，获取type，判断是否要同时更新type （如果相等时，保持原来的维度）
              let dim1,dim2,dim3,dim4;
              if(temp['e']===temp['i']){
                  dim1 = example.type[0];
              }else{
                  dim1 = temp['e']>temp['i'] ? 'e':'i';
              }
              if(temp['s']===temp['n']){
                  dim2 = example.type[1];
              }else{
                  dim2 = temp['s']>temp['n'] ? 's':'n';
              }
              if(temp['t']===temp['f']){
                  dim3 = example.type[2];
              }else{
                  dim3 = temp['t']>temp['f'] ? 't':'f';
              }
              if(temp['j']===temp['p']){
                  dim4 = example.type[3];
              }else{
                  dim4 = temp['j']>temp['p'] ? 'j':'p';
              }
              let nowType = dim1 + dim2 + dim3 + dim4; 
              let update_data = {};
              if(example.type!==nowType){
                  update_data = {vote:temp,type:nowType};  //type和vote同时更新
              }else{
                  update_data = {vote:temp}; //只更新vote
              }
              Example.update({_id:eid},{$set: update_data },err=>{
                if(err){
                   res.json({
                      success:false,
                      message:'数据库更新失败'
                   })
                }else{
                  //存储到voteLog

                  //查询更新后的数据返回
                  Example.findOne({_id:eid}).then(example=>{
                      if(example){                          
                          res.json({
                              success:true,
                              message:'投票成功',
                              example:example
                          })
                      }else{
                          res.json({
                              success:false,
                              message:'更新后查询失败',
                              example:example
                          })

                      }
                  })

                }
              })
          }else{
             res.json({
                success:false,
                message:'用户不存在'
             })
          }
      })
}


module.exports = (router) => {
    router.post('/addExample',addExample);
    router.post('/getExample',getExample);
    router.post('/searchExample',searchExample);
    router.post('/goVote',goVote);
    // router.post('/login',checkNotLogin,login);
    // router.post('/emailRetrieve',emailRetrieve); //邮箱找回密码
    // router.post('/reset',resetPassword);
    // // router.post('/search',checkLogin,search)
    // router.post('/search',checkLogin,search)

//   router.post('/register', checkNotLogin, Register),
//     router.post('/login', checkNotLogin, Login),
//     router.get('/user', checkLogin, delSession),
//     router.get('/', checkLogin, getSession)
}