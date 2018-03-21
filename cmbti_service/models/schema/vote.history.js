const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    eid:String,
    voteList:Array,
    commentList:Array
    // {
    //     uid:'',
    //     vote:'intj'
    //     c_time:Date,
    // }
})

// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
const VoteHistory = module.exports = mongoose.model('VoteHistory', voteSchema) 