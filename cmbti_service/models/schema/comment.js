const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    eid:String,
    list:[
            {
                uid:String,
                // cid:String,
                result:String,
                c_time:Date,
                zan:Array,   //['uid1','uid2']
                reply:[
                    {
                        uid:String,
                        res:String,
                        c_time:Date
                    }
                ]  
            }
        ],
    create_time: Date
})

const Comment = module.exports = mongoose.model('Comment', commentSchema) 