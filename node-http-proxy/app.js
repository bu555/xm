var express = require('express');
var proxyMiddleWare = require("http-proxy-middleware");
var history = require('connect-history-api-fallback');

var proxyPath = "http://localhost:7000";//目标后端服务地址
var proxyOption ={target:proxyPath,changeOrigoin:true};
var app = express();
app.use(history());
// app.use(express.static("./public"));
app.use('/', express.static('public'));

app.use("/api",proxyMiddleWare(proxyOption))//这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
app.use("/imgs",proxyMiddleWare(proxyOption))
app.listen(8000);