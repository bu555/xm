var RateLimit = require('express-rate-limit');
app.enable('trust proxy'); // 只有当你使用反向代理（Heroku，Bluemix，AWS，如果你使用ELB，自定义Nginx设置等）时 
var apiLimiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100,
  delayMs: 0 // 禁用
});