var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')


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


Article.getArticle().then(res=>{
    console.log(res);
})



});


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
class Article {
    constructor(){
    }
    // options:{uid:'',title:'',category:'share',content:''}
    static addArticle(options){
        return new Promise((resolve,reject)=>{
            new ArticleModel.article({
                uid:options.uid,
                title:options.title, //ask share
                category:options.category,
                content:options.content,
                c_time:new Date(),
                good:false,
                like:[],
                likes:0
            }).save((err,f)=>{
                if(!err){
                    console.log(f);
                    resolve(f)
                }
            })
        })
    }
    // options:{aid:'',uid:''}
    static clickArticleLike(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    let index = a.like.indexOf(options.uid)
                    if(index===-1){
                        ArticleModel.article.update({_id:options.aid},{$push:{like:options.uid}},err=>{
                            if(err) return reject('Update like Array error!')
                            ArticleModel.article.update({_id:options.aid},{$inc:{likes:1}},err=>{
                                if(err) return reject('Update likes error!')
                                resolve(1)
                            })
                        })
                    }else{
                        ArticleModel.article.update({_id:options.aid},{$pull:{like:options.uid}},err=>{
                            if(err) return reject('Update error!')
                            ArticleModel.article.update({_id:options.aid},{$inc:{likes:-1}},err=>{
                                if(err) return reject('Update likes error!')
                                resolve(-1)
                            })
                        })
                    }
                }else{
                    reject('Find aid faild!')
                }
            })
        })

    }
    // options:{aid:''}
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
    // options:{page:1,size:5,keyword:{category:'share/ask',good:true}}
    static getArticle(){
        return new Promise((resolve,reject)=>{
            // ArticleModel.article.find
            // ArticleModel.article.find({category: 'share'}).then(as=>{  //找share
            // ArticleModel.article.find({good: true}).then(as=>{     //找加精
            ArticleModel.article.find({likes: {$gt:2}}).then(as=>{     //likes大於2
                console.log(as);
            })
        })
    }
    //options:{aid:'',uid:'',content:''}
    static addComment(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.article.findOne({_id:options.aid}).then(a=>{
                if(a){
                    new ArticleModel.comment({
                        aid:options.aid,
                        uid:options.uid,
                        content:options.content,
                        c_time:new Date(),
                        zan:[],
                        zans:0,
                        replay:[]
                    }).save((err,c)=>{
                        if(err) return reject('Save failed!')
                        resolve(c)
                    })
                }else{
                    reject('The find aid result is empty ')
                }
            })
        })
    }
    //options :{cid:'',uid:'',content:''}
    static addCommentReplay(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({_id:options.cid}).then(c=>{
                if(c){
                    let item = {
                        uid:options.uid,
                        content:options.content,
                        c_time:new Date()
                    }
                    ArticleModel.comment.update({_id:options.cid},{$push:{replay:item}},err=>{
                        if(err) return reject('Update error!')
                        // resolve('Like success!')
                        resolve('ok')
                    })
                }else{
                    reject('The find cid result is empty ')
                }
            })
        })
    }
    //options :{cid:'',rid:'',uid:''}  
    static clickCommentZan(options){
        return new Promise((resolve,reject)=>{
            ArticleModel.comment.findOne({_id:options.cid}).then(c=>{
                if(c){
                    let index = c.zan.indexOf(options.uid)
                    if(index===-1){
                        ArticleModel.comment.update({_id:options.cid},{$push:{zan:options.uid}},err=>{
                            if(err) return reject('Update zan array error!')
                            ArticleModel.comment.update({_id:options.cid},{$inc:{zans:1}},err=>{
                                if(err) return reject('Update zans error!')
                                resolve(1)
                            })
                        })
                    }else{
                        ArticleModel.comment.update({_id:options.cid},{$pull:{zan:options.uid}},err=>{
                            if(err) return reject('Update error!')
                            ArticleModel.comment.update({_id:options.cid},{$inc:{zans:-1}},err=>{
                                if(err) return reject('Update zans error!')
                                resolve(-1)
                            })
                        })
                    }
                }else{
                    reject('The find cid result is empty ')
                }
            })
        })
    }

}