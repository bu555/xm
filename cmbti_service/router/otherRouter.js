
const express = require('express')
const router = express.Router()
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

const User = require('../controllers/userHandler')
const Account = require('../controllers/accountHandler')
const Limiter = require('../middlewares/limiter')
var fm = require('formidable');
const fs = require('fs')
const path = require('path')

var logger = require('log4js').getLogger('logError');

var { cities,provinces,hotCites } = require('../asset/china_region')      

// 城市列表 { provincesCode:''}
const getCities = (req, res,next) => {
    let options  = req.query || {}
    if(options.provinceCode){
        let list = []
        cities.forEach((v,i)=>{
            if(v.provinceCode==options.provinceCode){
                list.push(v)
            }
        })
        res.json({
           success:true,
           data:list
        })
    }else{
        res.json({
           success:true,
           data:cities
        })
    }
}
// 省份列表 { }
const getProvinces = (req, res,next) => {
    let options  = req.query || {}
    res.json({
        success:true,
        data:provinces
    })
}



router.get('/getCities',getCities);
router.get('/getProvinces',getProvinces);
module.exports = router