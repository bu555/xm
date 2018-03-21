const mongoose = require('mongoose')
//存储用户的投票等历史记录
const userHistorySchema = mongoose.Schema({
    uid:String,
    voteList:Array,
    // [
    //     {
    //         eid:'',
    //         res:'',
    //         create_time:Date
    //     }
    // ]
    commentList:Array
})

// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
const UserHistory = module.exports = mongoose.model('UserHistory', userHistorySchema) 