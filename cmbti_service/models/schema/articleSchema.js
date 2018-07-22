var mongoose = require('mongoose');
// 存评论
const commentSchema = new mongoose.Schema({
    aid:String,
    title:String,
    comment:[
        {
            uid:String,
            cid:String,
            content:String,
            c_time:Date,
            zan:[String], //[uid,uid]
            zans:Number,
            replay:String //回复的cid
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
    likes:Number,
    update_time:Date, //更新时间
    edit_time:Date, //编辑时间
    com_count:Number,  //评论总数
    state:Number,  // 文章状态，1:待审核，2：已审核
    zan:[String],
    zans:Number
})

const article = mongoose.model('a_article', articleSchema) 

const ArticleModel = {
    article:article,
    comment:comment,
    content:content
}
module.exports = ArticleModel 