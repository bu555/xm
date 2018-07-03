
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
    options.uip = req.headers.origin?req.headers.origin:'';
    // 参数验证
    if(!options.category || !options.res){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    let keys  = Object.keys(options.res)
    for(let i=0;i<keys.length;i++){
        if('iesntfjp'.indexOf(keys[i])<0 || !(/^\d+/.test(options.res[keys[i]]))){
            return res.json({
                success: false,
                message: 'The res Params Error' 
            })
        }

    }
    // options.uip = ''
    (async ()=>{
        try{
            let test = await Test.addTest(options)
            if(options.uid){
                //加入test_record
                await Account.addTestRecord({uid:options.uid,tid:test.tid})
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
                data:{
                    c_time:test.c_time,
                    category:test.category,
                    type:test.type,
                    res:test.res
                }
            })

        }catch(err){
            console.log(err);
            return res.json({
                success: false 
            })
        }


    })()
}

// 用户删除test结果  {tid:‘’}
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


router.post('/addTest',addTest);
router.post('/getTestById',getTestById);

module.exports = router