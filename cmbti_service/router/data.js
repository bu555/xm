var express = require('express');
var router = express.Router();
var fs = require('fs');
var basePath = './public/json/';
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');  //用于获取post传递的参数

// 请求的最开始，统一添加跨域响应头，
router.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Token5,Accept,X-Requested-With");
    resp.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // console.log(req.rawHeaders)
    // console.log(req.headers)
    // resp.set({    // console.log(req.rawHeaders); //这是请求头信息
    //     "Access-Control-Allow-Origin": "*",  //允许跨域请求
    //     'Access-Control-Allow-Methods': "*" 
    // });

    next(); 
});

router.get('/read',function(req,res,next){
    console.log(req.query)
    fs.readFile(basePath +  'user.json', function (err, data){
    if(err){
            return res.send({
                code:-1,
                msg:'读取文件异常'
            });
        }

        console.log(req.param('ID'))
        console.log(data)
        res.send({
            code:'0',
            data:JSON.parse(data)
        })
    })
});
// router.post('/write',urlencodedParser,function(req,res,next){
router.post('/write',function(req,res,next){
    // return false;
    console.log(req.url);
    var name = req.body.name;
    var age = req.body.age;
    if(!name || !age){
        return res.send({
            code:'-1',
            msg:'提交的字段不完整'
        })
    }
    var newData = [];
    fs.readFile(basePath+'user.json',(err,data)=>{
        if(err){
            return res.send({
                code:-1,
                msg:'读取文件失败'
            })
        }
        var arr = JSON.parse(data);
        arr.unshift({
            name:name,
            age:age
        })
        fs.writeFile(basePath + 'user.json',JSON.stringify(arr),(err=>{
            if(err){
                return res.send({
                    code:-1,
                    msg:'写入失败'
                })
            }
            res.send({
                code:0,
                msg:'存储成功！'
            })
        }))
    })
})

module.exports = router;