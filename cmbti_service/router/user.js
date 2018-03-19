const express = require('express')
const UserController = require('../controllers/userController.js')
const router = express.Router()

// 请求的最开始，统一添加跨域响应头，
router.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Token5,Accept,X-Requested-With");
    resp.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next(); 
});

UserController(router); 

module.exports = router