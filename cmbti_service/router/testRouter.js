
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
    // options.uip = ''
    (async ()=>{
        try{
            let test = await Test.addTest(options)
            if(options.uid){
                //加入test_record
                await Account.addTestRecord({uid:options.uid,tid:test._id})
            }
            res.json({
                success: true,
                data:test
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
// 查询test结果  {tid:''}
const getTestById = (req,res)=>{
    let options = req.body || {}
    // options.uid = req.session.user?req.session.user._id:'';
    // 参数验证
    if(!options.tid){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    // options.uip = ''
    (async ()=>{
        try{
            let test = await Test.getTestById(options)
            res.json({
                success: true,
                data:test
            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false 
            })
        }


    })()
}
// 查询批量test结果  {tid:[',']}
const getTestAllById = (req,res)=>{
    let options = req.body || {}
    // 参数验证
    if(!options.tid || !(options.tid instanceof Array)){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let test = await Test.getTestAllById(options)
            res.json({
                success: true,
                data:test
            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false 
            })
        }


    })()
}
// 查询批量test结果  {tid:[',']}
const deleteTestById = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user?req.session.user._id:'';
    // 参数验证
    if(!options.tid || !options.uid){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let del_test_record = await Account.deleteTestRecord(options)
            let del_test = await Test.deleteTestById(options)
            res.json({
                success: true,
                data:del_test
            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false 
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

    // addTest({
    //     body:{
    //         category:'fff',
    //         res:{
    //             e:11,i:77,s:99,n:0,t:8,f:22,j:9,p:11
    //         }
    //     },
    //     session:{
    //         user:{
    //             _id:'bmx'
    //         }
    //     }
    // },{json:json})

    // getTestAllById({
    //     body:{
    //         tid:["5b29b4e6d1731e17589e4d53",
    //             "5b29b9e13129701b7c9d9566",
    //             "5b29b9f983938f2ca48623d1"]
    //     }
    // },{json:json})
    deleteTestById({
        body:{
            tid:'5b29b9f983938f2ca48623d1'
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