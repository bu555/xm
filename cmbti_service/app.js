var express = require("express");
const router = express.Router();
var path = require('path');
const session = require('express-session');
// var index = require('./router/index');
var data = require('./router/data');
var user = require('./router/user');
var example = require('./router/example');
var account = require('./router/account');
var bodyParser = require('body-parser'); 
var cors = require('cors')
const GrabWeb = require('./controllers/grabWeb')

GrabWeb.https();





// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')
});

var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:7075'}));//跨域设置
app.use(bodyParser.urlencoded({extended:false})); //用于获取post传递的参数
app.use(bodyParser.json()); //解析application/json

// session
app.use(session({
  secret: 'usersession',
  key: 'usersession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 // 设置返回的cookie时效为30秒，测试用
  }
  // store: new MongoStore({
  //   url: "mongodb://localhost:27017/usersession"
  // })
}))
app.use('/', express.static('public'));
app.use('/imgs', express.static('localImgs'));
// app.use('/', index);
// app.use('/api/data',data);
app.use('/api/user',user);
app.use('/api/example',example);
app.use('/api/account',accountRouter(router));



module.exports = app;

// 登录、注册、密码重置、密码找回 
// 防XSS  md5
// tooken
// 数据分页
// 验证码
// 日志

 