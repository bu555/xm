
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
        let exampleAdd = new Example({
            name: name,
            type: "****",
            vote: result,
            voteLog:[],
            info: searchData.data.info || '',
            img_url: searchData.data.imgURL || '',
            total: 0, 
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
                        res.json({
                            success:true,
                            message:'ok',
                            example:example
                        })
                    }
                })
            }
        })

    },searchData=>{
        res.json(searchData);
    })
}
// 模糊查询(接受name 和type)
const searchExample = (req,res,next)=>{
    let option = req.body.params
    let pro;
    // 1.按name 模糊查询
    if(option.name){
        pro = Example.find({ name:new RegExp(option.name,'i') });
    // 2.按type 模糊查询
    }else if(option.type){
        pro = Example.find({ type:new RegExp(option.type,'i') });
    // 3.按id查询
    }else if(option.id){
        pro = Example.findOne({ _id:option.id });
    }else{
        pro = Example.find();
    }
    pro.then(example=>{
        if(example){ //将本地的返回
            // 非零非负整数
            let reg = /^[1-9]\d{0,}$/
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
        }else{
            res.json({
                success:false,
                message:'无数据'
            }) 
        }
    },example=>{
        res.json(example);
    })
}
//投票 （注：需要登录）
//逻辑：1、查询user.history判断是否重复投票 
// 2-1、更新example中的total、vote、voteLog、type（需要计算判断）
// 2-2、添加到user.history的voteList,{eid:'',name:'',vote:'',c_time:''}

const goVote = (req,res,next)=>{
      let uid = req.session.user._id;//用户id
      let eid = req.body.eid; //example Id
      let vote = req.body.vote;

      if(!uid || !eid || !myUtill.testVote(vote)){
          return res.json({
              success:false,
              message:'参数格式错误'
          })
      }

        checkVote(uid,eid).then(result=>{
            //检查重复投票通过
            Example.findOne({_id:eid}).then(example=>{
                if(example){
                    addToUserHistory(uid,eid,vote,example).then(result=>{
                        // user.history添加成功
                        addToExample(uid,eid,vote,example).then(result=>{
                        // example添加成功
                            res.json(result) 
                        },result=>{
                            res.json(result)
                        })

                    },result=>{
                        res.json(result); //错误信息返回
                    })
                }else{
                    res.json({
                        success:false,
                        message:'无此名字存在'
                    })
                }
            })
        },result=>{
            res.json(result)
        })
}
//查询user.history,判定该用户是否已投票
const checkVote = (uid,eid)=>{
     var pro = new Promise((resolve,reject)=>{
        let isVoted = false; 
        UserHistory.findOne({uid:uid}).then(user_history=>{
            if(user_history){
                let uh_list = user_history.voteList.slice(0);
                for(let i=0;i<uh_list.length;i++){
                    if(uh_list[i].eid == eid){
                        reject({
                            success:false,
                            message:'不可重复投票'
                        })
                    }
                }
                resolve({
                    success:true,
                    message:'可投票（用户尚未对此eid投过票）'
                })
            }else{
                resolve({
                    success:true,
                    message:'可投票（该用户尚未创建user.history）'
                })
            }
        })
     })
     return pro;
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
//添加一条vote记录到user.history（）
const addToUserHistory = (uid,eid,vote,example)=>{
    let pro = new Promise((resolve,reject)=>{
        UserHistory.findOne({uid:uid}).then(user_history=>{
            if(user_history){ //用户存在
                UserHistory.update({uid:uid},{$push:{
                    voteList:{
                        eid:eid,
                        name:example.name,
                        vote:vote,
                        c_time:moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                }},err=>{
                    if(err){
                        reject({
                            success:false,
                            message:'数据push存入失败'
                        });
                    }else{
                        resolve({
                            success:true,
                            message:'添加成功'
                        });
                    }
                })
            }else{ //用户不存在
                new UserHistory({
                    uid:uid,
                    voteList:[],
                    commentList:[]
                }).save(err=>{
                    if(err){
                        reject({
                            success:false,
                            message:'投票信息存入失败'
                        });
                    }else{
                        UserHistory.update({uid:uid},{$push:{voteList:{                  
                            eid:eid,
                            name:example.name,
                            vote:vote,
                            c_time:moment().format('YYYY-MM-DD HH:mm:ss')
                        
                        }}},err=>{
                            if(!err){
                                resolve({
                                    success:true,
                                    message:'记录存入userHistory成功'
                                });

                            }
                        })
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
    router.post('/searchExample',searchExample);
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