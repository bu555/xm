
const AccountModel = require('../models/schema/accountSchema') 
class Account {
    constructor(){
    }
    // 创建一个用户信息model  
    // options:{uid:'',title:'',category:'share',content:''}
    static addAccountInfo(options={}){
        return new Promise((resolve,reject)=>{
            new AccountModel.info({
                uid:options.uid,
                r_name:'ABCDEFGHIJ'.charAt(Math.floor(Math.random()*10)) + String(Math.random()).substr(9),
                avatar:'', //头像
                profile:'', //简介
                sex:-1,
                city:'',
                birth:'', //
                // 参与测试结果
                // t_result:Array, //{mbti:{res:'intj',date:'string'},keirsey:{res:'NT',date:‘string’},function}
                // 关注的用户
                followers:[], //['uid','uid']
                // 被关注
                following:[], //['uid','uid']
                // 好友
                friends:[], //['uid','uid']
                // 喜欢文章
                likes_atricle:[], //['aid','aid']
                my_article:[], //发表的文章
                my_comment:[],
                // 关注de人物
                atten_example:[], //['eid','eid']
            }).save((err,i)=>{
                if(!err){
                    console.log(i);
                    resolve(i)
                }
            })
        })
    }
    // 已发表文章记录 options;{uid:'',aid:''}
    static addPublishLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({uid:options.uid},{$push:{my_article:options.aid}},err=>{
                if(err) return reject('Update error')
                resolve('Update success!')
            }) 
        })
    }
    // 删除已发表文章记录 options;{uid:'',aid:''}
    static deletePublishLog(options={}){
        return new Promise((resolve,reject)=>{
            console.log(options.uid);
            console.log(options.aid);
            AccountModel.info.update({"uid":options.uid},{"$pull":{"my_article":options.aid}},err=>{
                console.log(err);
                if(err) return reject('Update error')
                resolve('Update success!')
            }) 
        })
    }
    // 个人喜欢文章记录 options:{aid:'',uid:'',offset:1/-1}
    static clickLikeArticleLog(options={}){
        return new Promise((resolve,reject)=>{
            if(options.offset===1){
                AccountModel.info.update({uid:options.uid},{$push:{likes_atricle:options.aid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else if(options.offset===-1){
                AccountModel.info.update({uid:options.uid},{$pull:{likes_atricle:options.aid}},err=>{
                    if(err) return reject('Update error')
                    resolve('Update success!')
                }) 
            }else {
                reject('Params "offset" error')
            }
        })
    }
    // 个人评论记录 options:{aid:''/或eid:'',cid:'',uid:''}
    static addCommentLog(options={}){
        return new Promise((resolve,reject)=>{
            AccountModel.info.update({uid:options.uid},{$push:{my_comment:{
                eid:options.eid || "",
                aid:options.aid || "",
                cid:options.cid
            }}},err=>{
                if(err) return reject('Log add faild!')
                resolve('success')
            })
        })
    }

}

module.exports = Account