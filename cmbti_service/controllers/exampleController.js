
const express = require('express')
const Example = require('../models/schema/example') //人物实例信息
const VoteHistory = require('../models/schema/vote.history')  //存储投票记录
const UserHistory = require('../models/schema/user.history') //用户的投票记录
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
//发送邮件功能
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin
const GrabWeb = require('../controllers/grabWeb')
const VOTE = require('../controllers/voteController')

// // 爬数据添,添加example
const addExample = (req,res)=>{
    let name = req.body.name || '';
    if(!name){
        return json({
            success: false,
            message: 'name为必需参数' 
        })
    }
    GrabWeb.https(name).then(searchData=>{
        let result = {e:0,i:0,s:0,n:0,t:0,f:0,j:0,p:0}; //初始化值
        // 添加一條新數據
        let exampleAdd = new Example({
            name: name.trim(),
            type: "****",
            info: searchData.data.info || '',
            img_url: searchData.data.imgURL || '',
            tag: searchData.data.tag || '',
            birth: searchData.data.birth || '',
            conste: searchData.data.conste || '', //星座
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
                        res.json({
                            success:false,
                            message:'example存储失败'
                        })
                    } else {
                        // 根据eid,创建一条vote
                        VOTE.createVote(example._id).then(r=>{
                            res.json({
                                success:true,
                                message:'create success',
                                example:example
                            })
                        },r=>{
                            res.json({
                                success:false,
                                message:'create vote fail!'
                            })
                        })
                    }
                })
            }
        },example=>{
            res.json({
                success:false,
                message:'未知错误'
            })
        })

    },searchData=>{
        res.json('error',searchData);
    })
}
const searchExample = (req,res,next)=>{
    let option = req.body.params
    getExample(option).then(example=>{
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
// 查询example (接受name  type  eid)
const getExample = (option)=>{
    return new Promise((resolve,reject)=>{
        let pro;
        // 1.按name 模糊查询
        if(option.name){
            pro = Example.find({ name:new RegExp(option.name,'i') });
        // 2.按type 模糊查询
        }else if(option.type){
            pro = Example.find({ type:new RegExp(option.type,'i') });
        // 3.按id查询
        }else if(option.eid){
            pro = Example.findOne({ _id:option.eid });
        }else{
            pro = Example.find();
        }
        pro.then(example=>{
            if(example){
                resolve(example)
            }else{
                reject('error,not find')
            }
        },example=>{
            reject('error')
        })

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
      
      VOTE.goVote({
          uid: uid,
          eid: eid,
          result: result
      }).then(data=>{
          //成功返回后，计算投票数
            data.list.forEach((v,i)=>{
                
            })
            res.json({
                success:true,
                message:''
            })
      },data=>{
          //失败
          res.json({
              success:false,
              message:data
          })
      })

}

//添加一条vote记录到example的voteLog并更新自身的type
const addToExample = (uid,eid,vote,example)=>{
    let pro = new Promise((resolve,reject)=>{
            // 计算投票后的vote
            let temp = example.vote;
            for(let i=0;i<4;i++){
                var char = vote.charAt(i);
                if(char!=='*'){
                    temp[char] = temp[char]+1;
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
            //增加了本次用户投票后的结果
            let nowType = dim1 + dim2 + dim3 + dim4; 
            let update_data = {
                    vote:temp,
                    total:example.total+1,
                }; 
            if(example.type!==nowType){ //type要更新
                    update_data.type = nowType;
            }
            //更新example
            Example.update({_id:eid},{$set: update_data },err=>{
                if(err){
                    reject({
                        success:false,
                        message:'数据存入失败'
                    });
                }else{
                    //push新记录
                    Example.update({_id:eid},{$push:{voteLog:{
                        uid:uid,
                        vote:vote,
                        c_time: moment().format('YYYY-MM-DD HH:mm:ss')
                    }}},err=>{
                        if(!err){
                            Example.findOne({_id:eid}).then(example=>{
                                if(example){
                                        UserHistory.findOne({uid:uid}).then(user=>{
                                        resolve({
                                            success:true,
                                            message:'记录更新example成功',
                                            example:example,
                                            userHistory:user
                                        });
                                    })

                                }
                            }) //Example end!

                        }
                    })
                }
            })
    })
    return pro;
}

module.exports = (router) => {
    router.post('/addExample',addExample);
    router.post('/searchExample',searchExample);
    router.post('/goVote',checkLogin,goVote);
    // router.post('/fuzzyExample',fuzzyExample);
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