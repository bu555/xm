var mongoose = require('mongoose');
//个人信息
const infoSchema = new mongoose.Schema({
    uid:{type:String,required:true},
    r_name:String,
    avatar:String, //头像
    profile:String, //简介
    sex:{type:Number,enum:[0,1]},
    city:String,
    birth:String, //
    // 参与测试结果
    // t_result:Array, //{mbti:{res:'intj',date:'string'},keirsey:{res:'NT',date:‘string’},function}
    // 关注的用户
    followers:[String], //['uid','uid']
    // 被关注
    following:[String], //['uid','uid']
    // 好友
    friends:[String], //['uid','uid']
    // 喜欢文章
    likes_atricle:[String], //['aid','aid']
    // 关注de人物
    atten_example:[String], //['eid','eid']
    //发表的文章
    my_article:[String],  //['aid']
    // 发表的评论
    my_comment:[
        {
            aid:String,
            eid:String,
            cid:String
        }
    ] //[{aid:'',eid:'',cid:''}]

})
const infoModel = mongoose.model('account_info', infoSchema) 
// 测试结果
const testSchema = new mongoose.Schema({
    type:{type:String,required:true,enum:['mbti','function','keirsey']}



})
const testModel = mongoose.model('account_test', testSchema) 
const AccountModel = {
    info:infoModel
}
module.exports = AccountModel

/*

喜欢文章
*/

// var PersonSchema = new Schema({
//   name:{
//     type:'String',
//     required:true //姓名非空
//   },
//   age:{
//     type:'Nunmer',
//     min:18,       //年龄最小18
//     max:120     //年龄最大120
//   },
//   city:{
//     type:'String',
//     enum:['北京','上海']  //只能是北京、上海人
//   },
//   other:{
//     type:'String',
//     validate:[validator,err]  //validator是一个验证函数，err是验证失败的错误信息
//   }
// });