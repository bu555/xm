// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, '连接失败！connection error:'));
// db.once('open', function() {
//   console.log('连接成功！connect success')


// Article.addArticle({
//     uid:"u5556",
//     title:"6666 3 Article",
//     content:'测试測試First Article',
//     category:"ask"
// })


// Article.clickArticleLike({
//     aid:'5b03b1df1cf40b35b8728edb',
//     uid:'u0779',
// }).then(res=>{
//     console.log('成功',res);
// }).catch(error=>{
//     console.log(error);
// })

// Article.addComment({
//     aid:'5b03b1df1cf40b35b8728edb',
//     uid:'u0775',
//     content:'评论内容测试test123345'
// }).then(res=>{
//     console.log('成功',res);
// }).catch(error=>{
//     console.log(error);
// })

// Article.addCommentReplay({
//     cid:'5b03b2551df192213c91469c',
//     uid:'u0777',
//     content:'回复的评论内容测试test123345'
// }).then(res=>{
//     console.log('成功',res);
// }).catch(error=>{
//     console.log(error);
// })


// Article.clickCommentZan({
//     cid:'5b03b2551df192213c91469c',
//     uid:'u077558',
//     rid:'5b03b28ed7d3ff08e4b13d48',
// }).then(res=>{
//     console.log('成功',res);
// }).catch(error=>{
//     console.log(error);
// })

// Article.setGood({aid:'5b03f8a753a8892714edaaa5'}).then(res=>{
//     console.log('成功',res);
// }).catch(error=>{
//     console.log(error);
// })


// Article.getArticle().then(res=>{
//     console.log(res);
// })



// });


// const articleSchema = new mongoose.Schema({
//     uid:String,
//     title:String, //ask share
//     category:String,
//     content:String,
//     c_time:Date,
//     good:Boolean,
//     like:Array,
//     replay:[
//         {
//             uid:String,
//             content:String,
//             zan:[],
//             zanCount:Number,
//             c_time:Date
//         }
//     ]
// })

// const ArticleModel = mongoose.model('article', articleSchema) 

const ArticleModel = require('../models/schema/articleSchema') 
const myUtill = require('../models/utill')
class Article {
    constructor(){
    }
    // 发表文章 options:{uid:'',title:'',category:'share',content:''}
    static publishArticle(options){
        return new Promise((resolve,reject)=>{
            // 创建文章主要信息
            new ArticleModel.article({
                uid:options.uid,
                title:options.title, //ask share
                category:options.category,
                c_time:new Date(),
                good:false,
                like:[],
                likes:0,
                update_time:new Date()
            }).save((err,a)=>{
                if(err) return reject('the article add failed')
                options.aid = a._id
                // 创建内容
                new ArticleModel.content({
                    aid:options.aid,
                    content:options.content,
                    size:options.content.length
                }).save((err,c)=>{
                    if(err) return reject('the content add failed')
                    // 创建评论
                    new ArticleModel.comment({
                        aid:options.aid,
                        comment:[]
                    }).save((err,c)=>{
                        if(err) return reject('the comment add failed')
                        resolve(options.aid) //返回aid
                    })
                })
            })
        })
    }
    // 删除文章(用户) options:{aid:''，uid:''}
    static deleteArticle(options){
        let delArticle = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.article.findOneAndRemove({_id:options.aid},err=>{
                    if(err) return reject("Remove article faild")
                    resolve('success')
                })
            })
        }
        let delContent = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.content.findOneAndRemove({aid:options.aid},err=>{
                    if(err) return reject("Remove content faild")
                    resolve('success')
                })
            })
        }
        let delComment = function(){
            return new Promise((resolve,reject)=>{
                ArticleModel.comment.findOneAndRemove({aid:options.aid},err=>{
                    if(err) return reject("Remove comment faild")
                    resolve('success')
                })
            })
        }
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.uid!==options.uid) return reject('Article uid not equal')
                    Promise.all([ delArticle(),delContent(),delComment()]).then(result=>{
                        resolve('Remove success!')
                    }).catch(error=>{
                        reject(error)
                    })

                }else{
                    reject('The aid not find')
                }
            })
        })

    }
    // 点击喜欢文章 options:{aid:'',uid:''}
    static clickArticleLike(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.like.indexOf(options.uid)===-1){
                        ArticleModel.article.update({"_id":options.aid},{"$push":{"like":options.uid},"$inc":{"likes":1}},(err,r)=>{
                            if(err) return reject("The like array $push faild")
                                console.log(r);
                                resolve({
                                    info:'Article喜欢+1',
                                    count:1,
                                })
                        })
                    }else{
                        ArticleModel.article.update({"_id":options.aid},{"$pull":{"like":options.uid},"$inc":{"likes":-1}},(err,r)=>{
                            if(err) return reject("The like array $pull faild")
                                console.log(r);
                                resolve({
                                    info:'Article喜欢-1（取消喜欢成功）',
                                    count:-1,
                                })
                        })

                    }
                }else{
                    reject('Find aid faild!')
                }
            })
        })
        function setLikes(){
            return new Promise((resolve,reject)=>{
                ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                    if(a){
                        let likes = a.like.length
                        ArticleModel.article.update({_id:options.aid},{$set:{likes:likes}},err=>{
                            if(err) return reject('Update faild!')
                            resolve(likes)
                        })
                    }else{
                        reject('The aid not find')
                    }
                })
            })
        } 

    }
    // 添加文章评论 options:{aid:'',uid:'',content:''}
    static addComment(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({aid:options.aid}).then(a=>{
                if(a){
                    let cid = myUtill.randomString(7)
                    let update_time = new Date()
                    ArticleModel.comment.update({aid:options.aid},{$push:{comment:{       //{multi : true }更新所有匹配项目
                        uid:options.uid,
                        content:options.content,
                        c_time:update_time,
                        zan:[],
                        zans:0,
                        replay:[],
                        cid:cid
                    }}},err=>{
                        if(err) return reject('Update faild')
                        resolve({
                            cid:cid,
                            update_time:update_time  //回复时间
                        })  //返回cid
                    })
                }else{
                    reject('The find aid result is empty ')
                }
            })
        })
    }
    // 加精 options:{aid:''}
    static setGood(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    if(a.good) return resolve('The article is gooded!')
                    ArticleModel.article.update({_id:options.aid},{$set:{good:true}},err=>{
                        if(err) return reject('Update error!')
                        resolve('Set success!')
                    })
                }
            })
        })

    }
    //获取文章 options:{page:1,size:5,keyword:{category:'share/ask',good:true}}
    static getArticle123(){
        return new Promise((resolve,reject)=>{
            // ArticleModel.article.find
            // ArticleModel.article.find({category: 'share'}).then(as=>{  //找share
            // ArticleModel.article.find({good: true}).then(as=>{     //找加精
            ArticleModel.article.find({likes: {$gt:2}}).then(as=>{     //likes大於2
                console.log(as);
            })
        })
    }
    //评论点赞 options :{aid:'',cid:'',uid:''}
    static clickCommentZan(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({"aid":options.aid}).then(a=>{
                if(a){
                    let exist_cid = false
                    for(let i=0;i<a.comment.length;i++){
                        if(a.comment[i].cid === options.cid){
                                exist_cid = true
                                if(a.comment[i].zan.indexOf(options.uid)===-1){
                                    ArticleModel.comment.update({"aid":options.aid,"comment.cid":options.cid},{$push:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            info:'Comment赞+1',
                                            count:1
                                        })
                                    })
                                }else{
                                    ArticleModel.comment.update({"aid":options.aid,"comment.cid":options.cid},{$pull:{"comment.$.zan":options.uid},$inc:{"comment.$.zans":-1}},(err,r)=>{
                                        if(err) return reject('Update error!')
                                        return resolve({
                                            count:-1,
                                            info:'Comment取消点赞'
                                        })
                                    })
                                
                                }
                        }
                    }
                    if(!exist_cid){
                        reject('The cid not find!')
                    }
                    // ArticleModel.article.update({"_id":options.aid,"comment._id":options.cid},{$addToSet:{"comment.$.zan":options.uid}},(err,r)=>{
                    //     if(err) return reject('Update error!')
                    //     // { n: 1, nModified: 0, ok: 1 }  未添加
                    //     // { n: 1, nModified: 1, ok: 1 }  已添加
                    //     if(r.nModified===1){
                    //         resolve({
                    //             info:'Comment赞+1',
                    //             count:1
                    //         })
                    //     }else{
                    //         ArticleModel.article.update({"_id":options.aid,"comment._id":options.cid},{$pull:{"comment.$.zan":options.uid}},(err,r)=>{
                    //             if(r.nModified===1){
                    //                 resolve({
                    //                     count:-1,
                    //                     info:'Comment取消点赞'
                    //                 })
                    //             }else{
                    //                 reject('$pull faild')
                    //             }
                    //         })
                    //     }
                    // })
                }else{
                    reject('The find cid result is empty ')
                }
            })
        })
    }
    //获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean}
    static getArticle(options={}){
        return new Promise((resolve,reject)=>{
            let pro ;
            if(options.keyword){
                pro = ArticleModel.article.find({"title":new RegExp(options.keyword,'i')},"-like")
            }else if(options.category){
                if(options.category==='all'){
                    pro = ArticleModel.article.find({},"-like")
                }else{
                    pro = ArticleModel.article.find({"category":options.category},"-like")
                }
            }else if(options.likes){
                // Model.find({“age”:{ “$get”:18 , “$lte”:30 } } ); 查询 age 大于等于18并小于等于30的文档
                // “$lt”小于  “$lte”	小于等于   “$gt”大于   “$gte”	大于等于  “$ne”	不等于
                pro = ArticleModel.article.find({"likes":{"$gte":Number(options.likes)}},"-like")
            }else if(options.good){
                pro = ArticleModel.article.find({"good":options.good},"-like")
            }else{
                // pro = ArticleModel.article.find({"likes":{"$gte":1}})
                pro = ArticleModel.article.find({},"-like")
            }
            pro.then(result=>{
                resolve(result) //返回数组
            }).catch(err=>{
                reject(err)
            })
        })
    }
    // 查看文章 options {aid:''}
    static getArticleById(options={}){
        return new Promise((resolve,reject)=>{
            Promise.all([
                ArticleModel.article.findOne({"_id":options.aid}),
                ArticleModel.content.findOne({"aid":options.aid}),
            ]).then(result=>{
                if(result){
                    resolve(result)
                }else{
                    reject('null')
                }
            })
        })
    }
    // aid查评论options {aid:'必传'}
    static getComment(options={}){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({"aid":options.aid}).then(c=>{
                    if(c){
                        resolve(c.comment)
                    }else{
                        reject('null')
                    }
                }) 
            })
    }
    // 更新最新回复 {aid:'必传',u_time:}
    static setUpdateTime(options={}){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.update({"aid":options.aid},{$set:{"u_time":options.u_time}},err=>{
                if(err) return reject('update u_time faild')
                resolve('success')
            })
        })
    }


    static  t(){

        // ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment.uid":"www007"},{$set:{"comment.$.content":"改123456改改"}},err=>{
        // ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment.uid":"www007"},{$inc:{"comment.$.zans":1}},err=>{
        ArticleModel.article.update({"_id":"5b0bb8daef333a1c641b47dc","comment._id":"5b0bba591fff622da0ecd180"},{$push:{"comment.$.zan":'1'}},err=>{
            console.log(err);
        })

    }

}


module.exports = Article