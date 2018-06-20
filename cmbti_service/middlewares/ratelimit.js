// 速率限制
var ratelimit = require('ratelimit');  
var redis = require('redis');   

var emailBasedRatelimit = ratelimit({  
  db: redis.createClient(),
  duration: 60000,
  max: 10,
  id: function (context) {
    return context.body.email;
  }
});

var ipBasedRatelimit = ratelimit({  
  db: redis.createClient(),
  duration: 60000,
  max: 10,
  id: function (context) {
    return context.ip;
  }
});