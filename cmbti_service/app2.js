var express = require("express");
var path = require('path');
var http = require('http');
const session = require('express-session');
var articleRouter = require('./router/articleRouter');
var accountRouter = require('./router/accountRouter');
var userRouter = require('./router/userRouter');
var exampleRouter = require('./router/exampleRouter');
var bodyParser = require('body-parser'); 
var cors = require('cors')
// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败！connection error:'));
db.once('open', function() {
  console.log('连接成功！connect success')
});

var app = express();
// app.use(cors());//跨域设置
app.set('port',process.env.PORT || 7000)
app.use(cors({credentials: true, origin: ['http://localhost:7075','http://localhost:8000']}));//跨域设置
// app.use(cors({credentials: true, origin: 'http://localhost:8000'}));//跨域设置
// app.use(cors());//跨域设置
app.use(bodyParser.urlencoded({extended:false})); //解析请求主体(用于获取post传递的参数)
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

app.use('/', express.static(path.join(__dirname,'public')));
app.use('/imgs', express.static(path.join(__dirname,'localImgs')));
app.use('/api/user',userRouter);
app.use('/api/example',exampleRouter);
app.use('/api/article',articleRouter);
app.use('/api/account',accountRouter);


http.createServer(app).listen(app.get('port'),function(){
    console.log("Express server running! 启动端口:"+app.get('port'));
})




module.exports = app;

// 登录、注册、密码重置、密码找回 
// 防XSS  md5
// tooken
// 数据分页
// 验证码
// 日志

 