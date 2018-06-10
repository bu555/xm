
const express = require('express')
const router = express.Router()
//时间处理模块
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
// const User = require('../controllers/user')
const Test = require('../controllers/testHandler')
const Account = require('../controllers/accountHandler')
const json = (d)=>{console.log(d);}
// 添加测试数据  {category:'',uip:'',res:'Object'}
const addTest = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user?req.session.user._id:'';
    // 参数验证
    if(!options.category || !options.res){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }

    (async ()=>{
        try{
            let tData = await Test.addTest(options)
            if(options.uid){
                //加入test_record
                await Account.addTestRecord({uid:options.uid,tid:tData.tid})
            }
            res.json({
                success: true,
                result:{
                    data:tData
                }
            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false,
                message: 'Operation fail' 
            })
        }


    })()

}


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')

//   Account.addAccountInfo({uid:'bmx'})

    addTest({
        body:{
            category:'mbti',
            res:{
                e:11,i:5,s:99,n:0,t:8,f:22,j:9,p:11
            }
        },
        session:{
            user:{
                _id:'bmx'
            }
        }
    },{json:json})


})


// router.post('/publish',checkLogin,publishArticle);
// router.post('/getArticle',getArticle);
// router.post('/getCommentByAid',getCommentByAid);
// // // router.post('/login',checkNotLogin,login);
// // router.post('/login',login);
// // router.post('/emailRetrieve',emailRetrieve); //邮箱找回密码
// // router.post('/reset',resetPassword);
// // // router.post('/search',checkLogin,search)
// // router.post('/delSession',delSession)
// // router.post('/checkNotRegister',checkNotRegister)
// module.exports = router