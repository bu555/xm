const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')
});

const exampleSchema = new mongoose.Schema({
    name: String,
    create_time: Date,
    info:String,
    img_url:String,
    type: String,
    total: Number, //参与人数
    tag: String,
    birth: String,
    conste: String, //星座
    voted:false,
    vote: {
        entp:Number,
        intp:Number,
        entj:Number,
        intj:Number,
        enfp:Number,
        infp:Number,
        enfj:Number,
        infj:Number,
        estj:Number,
        istj:Number,
        esfj:Number,
        isfj:Number,
        estp:Number,
        istp:Number,
        esfp:Number,
        isfp:Number  
    },
    voteLog:[
        {
            uid:String,
            result:String,
            c_time:Date
        }
    ],
    comment:[
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
    ]
})

const ExampleModel = mongoose.model('example', exampleSchema) 
module.exports = ExampleModel