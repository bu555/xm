
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

var china = require('../asset/city_data2016')      

// 中国省市 { }
const getChina = (req, res,next) => {
    let data = []
    china.forEach((v,i) => {
        let temp = {}
        temp.n = v.n
        temp.s = []
        v.s.forEach((v1,i1)=>{
            temp.s.push({n:v1.n})
        })
        data.push(temp)
    })
    res.json({
        success:true,
        data:data
    })
}



router.get('/getChina',getChina);
module.exports = router