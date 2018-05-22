
const ExampleModel = require('../models/schema/exampleSchema')
const CommentModel = require('../models/schema/commentSchema')
const moment = require('moment')
const myUtill = require('../models/utill')
const GrabWeb = require('../controllers/grabWeb')
class Example{
    constructor(){

    }
    createExample(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.findOne({name:options.name}).then(example=>{
                if(!example){
                    GrabWeb.https(options.name).then(data=>{
                        let vote = {
                                entp:0,
                                intp:0,
                                entj:0,
                                intj:0,
                                enfp:0,
                                infp:0,
                                enfj:0,
                                infj:0,
                                estj:0,
                                istj:0,
                                esfj:0,
                                isfj:0,
                                estp:0,
                                istp:0,
                                esfp:0,
                                isfp:0
                            }
                    
                        let exampleAdd = new ExampleModel({
                            name: options.name,
                            type: "****",
                            vote: vote,
                            info: data.data.info || '',
                            img_url: data.data.imgURL || '',
                            total: 0, 
                            tag: data.data.tag || '',
                            birth: data.data.birth || '',
                            conste: data.data.conste || '', //星座
                            create_time: moment().utc(),
                        })
                        exampleAdd.save((err, example) => {
                            if(err) {
                                reject('Data save fail')
                            } else {
                                new CommentModel({
                                    eid:String(example._id),
                                    name:example.name,
                                    list:[],
                                    zaned:false
                                }).save((err,comment)=>{
                                    if(!err){
                                        resolve(example)
                                    }
                                })
                            }
                        })
                    },data=>{
                        reject(data)
                    })    

                }else{
                    reject('Name already exists!')
                }
            })
        })
    }
    // params : {name:'',type:'',page:'',size:''}
    searchExample(options={}){
        return new Promise((resolve,reject)=>{
            // let page = options.page && /^[1-9][0-9]*$/.test(options.page) ? Number(options.page): 1
            // let size = options.size && /^[1-9][0-9]*$/.test(options.size) ? Number(options.size): 5
            let pro;
            // 1.按name 模糊查询
            if(options.name){
                pro = ExampleModel.find({ name:new RegExp(options.name,'i') });
            // 2.按type 模糊查询
            }else if(options.type){
                pro = ExampleModel.find({ type:new RegExp(options.type,'i') });
            // 3.查找所有
            }else{
                pro = ExampleModel.find();
                // return reject('params error')
            }

            // query.where({age:30});
            // query.sort({ name: 'asc', age: -1 });
            // //query.and({_id:"123456222"});
            // query.or([{_id:"123456fff222"},{_id:"123456222"}]);
            // //query.limit(3); //限制条数
            // //query.skip(3)   //开始数 ，通过计算可是实现分页
            // //query.friends('name')
            // query.exec(function(err,docs){
            //     console.log(docs);
            // })
            // pro.limit(size).skip((page-1)*size).then(example=>{
            pro.then(example=>{
                if(example){
                    example.forEach((v,i)=>{
                        v.comment && delete v.comment
                        v.vote && delete v.vote
                    })
                    resolve(example)
                }else{
                    reject('example not finded')
                }

            })
        })
    }
    // params : {eid:'',uid:'可选'}
    getExampleById(options={}){
        return new Promise((resolve,reject)=>{
            if(!options.eid) return reject('The params error')
            ExampleModel.findById(options.eid,(err,example)=>{
                if(!err){
                    if(example){
                        if(options.uid){  //已登录
                            // 判断是否透过票
                             example.voted = false
                             for(let i=0;i<example.voteLog.length;i++){
                                if(example.voteLog[i].uid === options.uid){
                                    example.voted = true
                                    break;
                                }
                            }
                            resolve(example)
                        }else{ //未登录
                            example.voted = false
                            resolve(example)
                        }
                    }
                }else{
                    reject(err)
                }
            })

        })
    }
    // 去重判断
    exampleHandle(options){
        if(options.uid){  //已登录
            for(let i=0;i<example.voteLog.length;i++){
                if(example.voteLog[i].uid === options.uid){
                    example.voted = true
                    return resolve(example)
                }
                example.voted = false
                resolve(example)
            }
        }else{ //未登录
            example.voted = false
            resolve(example)
        }

    }
    // params : {eid:string,uid:string,result:'intj'}
    addVote(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.findById(options.eid,(err,example)=>{
                if(!err){
                    if(example){
                        //验证是否重复
                        for(let i=0;i<example.voteLog.length;i++){
                            if(example.voteLog[i].uid === options.uid){
                                return reject('Unable to repeat the vote')
                            }
                        }
                        // 更新type 、vote 、voteLog
                        if(example.type!=="****"){
                            if(Object.keys(example.vote).indexOf(options.result)!=-1){
                                if(example.type!==options.result && example.vote[options.result]+1 > example.vote[example.type]){
                                    example.type=options.result 
                                } 
                            }else{
                                return reject('The params error')
                            }
                        }else{
                            example.type = options.result
                        }
                        example.vote[options.result] = example.vote[options.result]+1
                        example.voteLog.push({
                            uid:options.uid,
                            result:options.result,
                            c_time:moment().utc()
                        })
                        // type 、vote 、voteLog 验证 一致性（临时）
                        // let tempObj = {}
                        // example.voteLog.forEach((v,i)=>{
                        //     tempObj[v.result] ? tempObj[v.result]=tempObj[v.result]+1 : tempObj[v.result]=1
                        // })
                        example.save((err,example)=>{
                            if(!err){
                                if(example){
                                    this.getExampleById({eid:options.eid,uid:options.uid}).then(example=>{
                                        // 判断是否重复
                                        for(let i=0;i<example.voteLog.length;i++){
                                            if(example.voteLog[i].uid === options.uid){
                                                example.voted = true
                                                return resolve(example)
                                            }
                                            example.voted = false
                                            resolve(example)
                                        }
                                    })
                                }else{
                                    reject('Handle faild')
                                }
                            }
                        })
                        

                    }
                }
            })
        })
    }
    // params: {eid:'',uid:'',result:''}
    addComment(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.findById(options.eid,(err,example)=>{
                if(!err){
                    example.comment.push({
                            uid:options.uid,
                            // cid:myUtill.randomString(15),
                            result:options.result,
                            c_time:moment().utc(),
                            zan:[],
                            reply:[]  
                    })
                    example.save((err,example)=>{
                        if(!err){
                            resolve(example.comment)
                        }else{
                            reject('The comment save is failed')
                        }
                    })

                }else{
                     reject('The eid find is failed')
                }
            })

        })
    }
    // params: {eid:''}
    getComment(options={}){
        return new Promise((resolve,reject)=>{
            let page = options.page && /^[1-9][0-9]*$/.test(options.page) ? Number(options.page): 1
            let size = options.size && /^[1-9][0-9]*$/.test(options.size) ? Number(options.size): 5
            ExampleModel.findById(options.eid,(err,example)=>{
                if(!err){
                        resolve(example.comment)
                }else{
                     reject('The eid find is failed')
                }
            })

        })
    }

    // params : {eid:'',cid:''}
    clickZan(options){
        return new Promise((resolve,reject)=>{
            ExampleModel.findById(options.eid,(err,example)=>{
                if(!err){
                    let flag = false
                    let count
                    for(let i=0;i<example.comment.length;i++){
                        if(example.comment[i]._id==options.cid){
                            flag = true
                            if(example.comment[i].zan.indexOf(options.uid) !== -1){
                                // return reject('The uid repeat addZan')
                                example.comment[i].zan.splice(example.comment[i].zan.indexOf(options.uid),1)
                                count = example.comment[i].zan.length
                                break;
                            }else{
                                count = example.comment[i].zan.push(options.uid)
                                break;
                            }
                        }
                    }
                    if(!flag) return reject('The cid not find')
                    example.save((err,comment)=>{
                        if(!err){
                            resolve({zanCount:count})
                        }else{
                            reject('The comment save is failed')
                        }
                    })
                }else{
                    reject('The eid find is failed')
                }
            })
        })
    }
}

// new Example().createExample().then(example=>{
//     console.log(example);
// }).catch(err=>{
//     console.error(err)
// })

// new Example().addComment({eid:'5afa74ef2911a029b0fe050a',uid:'m555',result:'00001测试内容'}).then(example=>{
//     console.log(example,123);
// }).catch(err=>{
//     // console.error(err)
// })

// new Example().clickZan({eid:'5afa74ef2911a029b0fe050a',uid:'m777',cid:'5afa7d7f0e9b29203ce5a94b'}).then(example=>{
//     console.log(example,123);
// }).catch(err=>{
//     console.error(err)
// })

// new Example().searchExample().then(example=>{
//     console.log(example);
// }).catch(err=>{
//     console.error(err)
// })

// new Example().getExampleById({eid:'5afa74ef2911a029b0fe050a'}).then(example=>{
//     console.log(example);
// }).catch(err=>{
//     console.error(err)
// })

// new Example().addVote({eid:'5afa74ef2911a029b0fe050a',uid:'my001',result:'enfp'}).then(example=>{
//     console.log(example);
// }).catch(err=>{
//     console.error(err)
// })

// console.log(moment('2018-05-15T06:23:12.095Z').format('YYYY-MM-DD HH:mm:ss'))

module.exports = new Example()