
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
      

// 城市列表 {}
const cities = (req, res,next) => {
    if(!myUtill.verifyEmail(req.body.name) || !myUtill.verifyPassword(req.body.password)){
          return res.json({
              success: false,
              message: '参数格式错误'
          })
    }
    User.register(req.body).then(uName=>{
        res.json({
           success:true,
           nane:uName
        })
    }).catch(err=>{
          logger.error(err);
          res.json({
              success: false,
              message: '註冊失敗'
          })
    })
}


router.get('/city',cities);
module.exports = router