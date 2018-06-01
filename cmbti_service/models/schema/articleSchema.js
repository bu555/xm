var mongoose = require('mongoose');
// 存评论
const commentSchema = new mongoose.Schema({
    aid:String,
    comment:[
        {
            uid:String,
            cid:String,
            content:String,
            c_time:Date,
            zan:[String], //[uid,uid]
            zans:Number,
            replay:[
                {
                    uid:String,
                    content:String,
                    c_time:Date
                }
            ]
        }
    ]
})
const comment = mongoose.model('a_comment', commentSchema) 

// 存内容
const contentSchema = new mongoose.Schema({
    aid:String,
    size:Number,
    content:String,  
    views:Number
})
const content = mongoose.model('a_content', contentSchema) 

// 存文章主要信息
const articleSchema = new mongoose.Schema({
    uid:String,
    title:String, //
    category:String,  //ask share
    // content:String,
    c_time:Date,
    good:Boolean, //加精
    like:[String],
    likes:Number
})
// 实例方法
// articleSchema.methods.updateLikes = function(){
//     this.likes = this.like.length
//     this.save((err,a)=>{
//         if(!err){
//             console.log('更新后后：',a);
//         }
//     })
// }

const article = mongoose.model('a_article', articleSchema) 

// const commentSchema = new mongoose.Schema({
//     aid:String,
//     uid:String,
//     content:String,
//     c_time:Date,
//     zan:Array,
//     zans:Number,
//     replay:[
//         {
//             uid:String,
//             content:String,
//             c_time:Date
//         }
//     ]
// })
// const comment = mongoose.model('a_comment', commentSchema) 

const ArticleModel = {
    article:article,
    comment:comment,
    content:content
}
module.exports = ArticleModel 