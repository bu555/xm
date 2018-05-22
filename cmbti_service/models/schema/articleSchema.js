var mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    uid:String,
    title:String, //ask share
    category:String,
    content:String,
    c_time:Date,
    good:Boolean, //加精
    like:Array,
    likes:Number
})
const article = mongoose.model('article', articleSchema) 

const commentSchema = new mongoose.Schema({
    aid:String,
    uid:String,
    content:String,
    c_time:Date,
    zan:Array,
    zans:Number,
    replay:[
        {
            uid:String,
            content:String,
            c_time:Date
        }
    ]
})
const comment = mongoose.model('a_comment', commentSchema) 

const ArticleModel = {
    article:article,
    comment:comment
}
module.exports = ArticleModel 