
const express = require('express')
const router = express.Router()
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')
const Limiter = require('../middlewares/limiter')
const moment = require('moment')
var fm = require('formidable');
const fs = require('fs')
const path = require('path')

var logger = require('log4js').getLogger('logError');
    
const Category = ['personality','func']
// 类型：
const Types = ['entp','intp','entj','intj','enfp','infp','enfj','infj','estj','istj','esfj','isfj','estp','istp','esfp','isfp']

// {title:'',content:'',category:'personality',key:'intj/ni'}
const setDocument = async (req, res,next) => {
    let options = req.body
    if(!options.title || !options.content ||
        (!options.key||Types.indexOf(options.key)===-1) ||
        (!options.category || Category.indexOf(options.category)===-1)  
    ){
        return res.json({
            success:false,
            message:'params error!'
        })
    }
    let doc = {
        title:options.title,
        content:options.content,
        key:options.key,
        c_time:moment(new Date()).utc().format()
    }
    let flieName = path.join( process.cwd(),'doc',options.category+'.json')
    try {
        await createFile(flieName)
        fs.readFile(flieName, 'utf8', function(err, data){ 
            if(!err){   
                data = JSON.parse(data)
                data[options.key] = doc  
                fs.writeFile(flieName, JSON.stringify(data) ,function(err){
                    if(!err){       
                        res.json({
                            success:true,
                            message:'写入成功'
                        })
                    }else{
                        res.json({
                            success:false,
                            data:null,
                            message:'写入失败'
                        })
                    }
                });
            }else{
                res.json({
                    success:false,
                    data:null,
                    message:'读取失败'
                })
            }
        })
    }catch(err){
        res.json({
            success:false,
            data:null,
            message:err
        })

    }
    function createFile(fileName){
        return new Promise((resolve,reject)=>{
            fs.exists(fileName,function(exists){
                if(exists){
                    resolve()
                }
                if(!exists){
                    fs.writeFile(fileName, '{}' ,function(err){
                        if(!err){
                            resolve()
                        }else{
                            reject()
                        }
                    })
                }
            })
        })
    }
}
const getDocument = (req, res,next) => {
    let options = req.body    
    if( (!options.category || Category.indexOf(options.category)===-1) ){
        return res.json({
            success:false,
            message:'params error!'
        })
    }
    let flieName = path.join( process.cwd(),'doc',options.category+'.json')
    fs.readFile(flieName, 'utf8', function(err, data){ 
        if(!err){  
            let d = {}  
            d[options.category]  = data 
            res.json({
                success:true,
                data:data,
                category:options.category
            })
        }else{
            res.json({
                success:false,
                data:null,
                message:'读取失败'
            })
        }
    });
}



router.post('/setDocument',setDocument);
router.post('/getDocument',getDocument);
module.exports = router