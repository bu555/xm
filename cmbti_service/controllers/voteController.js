
const Vote = require('../models/schema/vote')  //存储投票记录
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../myTool/utill')

const goVote = (option)=>{
      let uid = option.uid;//用户id
      let eid = option.eid; //example Id
      let result = option.result;
      let pro = new Promise((resolve,reject)=>{
            // if(!uid || !eid || !myUtill.testVote(result)){
            //     reject('params error!')
            // }
            //检验是否重复投票
            checkVote(uid,eid).then(result=>{
                //添加投票记录
                addVote(uid,eid,result).then(result=>{
                    resolve('add success')
                },result=>{
                    reject(result)
                })
            },result=>{
                reject(result)
            })


      })
      return pro

}
// 添加 vote
const addVote = (uid,eid,result)=>{
     var pro = new Promise((resolve,reject)=>{
        Vote.update({eid:eid},{$push: {list:{
            uid:uid,
            result:result,
            c_time:moment().format('YYYY-MM-DD HH:mm:ss')
        }} },err=>{
            if(err){
                reject('error,save fail');
            }else{
                resolve('success')
            }
        })
     })
     return pro;
}
// 检验vote是否重复
const checkVote = (uid,eid)=>{
     var pro = new Promise((resolve,reject)=>{
        Vote.findOne({eid:eid}).then(vote=>{
            if(vote){
                for(let i=0;i<vote.list.length;i++){
                    if(vote.list[i].uid == uid){
                        reject('error! repeat vote')
                        break
                    }
                }
                resolve('success')
            }else{
                reject('error,eid not find')
            }
        })
     })
     return pro;
}
// 创建vote
const createVote = (eid)=>{
        let pro = new Promise((resolve,reject)=>{
            if(eid){
                console.log('eid',typeof eid);
                let voteAdd = new Vote({
                    eid:eid,
                    list:[],
                })
                voteAdd.create_time = moment(objectIdToTimestamp(voteAdd._id)).format('YYYY-MM-DD HH:mm:ss')
                voteAdd.save((err, example) => {
                    if (err) {
                        reject('save error')
                    } else {
                        resolve('success')
                    }
                })
            }else{
                reject('params error')
            }
        })
        return pro
}

module.exports = {
    goVote,
    checkVote,
    createVote
}