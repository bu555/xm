
// https://www.jianshu.com/p/2f54b90efe15

// ---引入模块，并连接数据库---
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/mongodb');
// URL以mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名。（默认端口27017）
// 需要对连接状况进行判断，可以用以下代码：
// db.connection.on("error", function (error) {  
//     console.log("数据库连接失败：" + error);
// });
// db.connection.on("open", function () {  
//     console.log("数据库连接成功"); 
// })
// db.connection.on('disconnected', function () {    
//     console.log('数据库连接断开');  
// })

// 最常接触到的有三个概念Schema、Model、Entity。按自己理解，
// Schema是定义数据库的结构。类似创建表时的数据定义，但比创建数据库可以做更多的定义，只是没办法通过Schema对数据库进行更改。
// Model是将Schema定义的结构赋予表名。但可用此名对数据库进行增删查改。
// Entity是将Model与具体的数据绑定，可以对具体数据自身进行操作，例如保存数据。

var blogSchema = new mongoose.Schema({
    title:  String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
  }
})
var blogModel = mongoose.model('Blog', blogSchema);
// 绑定数据实例化
var blogEntity = new blogModel({
    title:  "Mongoose",
    author: "L",
    body:   "Documents are instances of out model. Creating them and saving to the database is easy",
    comments: [{ body: "It's very cool! Thanks a lot!", date: "2014.07.28" }],
    hidden: false,
    meta: {
        votes: 100,
        favs:  99
    }
})
// 保存数据
blogEntity.save(function(err, docs){
    if(err) console.log(err);
    console.log('保存成功：' + docs);
})


// ---增加（创建）---
blogModel.create({name:name}, function(err, docs){
    if(err) console.log(err);
    console.log('保存成功：' + docs);
});