var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});


module.exports = router;

// 使用app.use(logger('dev'));可以将请求信息打印在控制台，便于开发调试，但实际生产环境中，需要将日志记录在log文件里