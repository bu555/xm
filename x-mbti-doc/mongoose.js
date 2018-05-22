



// 添加
blogModel.create(doc, function(err, docs){
    if(err) console.log(err);
    console.log('保存成功：' + docs);
});
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
});

blogEntity.save(function(err, docs){
    if(err) console.log(err);
    console.log('保存成功：' + docs);
});

// 插入
Model.insertMany(doc(s), [options], [callback])

// 查詢
blogModel.find({title: "Mongoose", meta.votes: 100}, {title: 1, author: 1, body: 1}, function(err, docs){
    if(err) console.log(err);
    console.log('查询结果：' + docs);
})
// 查询“title”标题为“Mongoose”，并且“meta”中“votes”字段值为“100”的记录，返回仅返回“title”、“author”、“body”三个字段的数据。
Model.findOne  //直返會第一個記錄

// 複雜條件查詢
blogModel.and([
    { title: { $regex: "Mongoose.+","$options":"i"}},
    { meta.votes: { $lt: 100}}
).sort({ meta.votes: 1}
).exec(function(err, docs){
    if(err) console.log(err);
    console.log('查询结果：' + docs);
});

//比较查询运算符
// $equals 等于 ／ $gt 大于 ／ $gte 大于等于 ／ $lt 小余 ／ $lte 小余等于 ／ $ne 不等于 ／ $in 在数组中 ／ $nin 不在数组中
// 比如我需要查询“title”中以“Mongoose”开头，并且“meta”中“votes”的值小余100。并且按“meta”中“votes”的值升序排序。
blogModel.find({meta.votes: {$lt: 100}}); //查询“meta”中的“votes”字段值小余100的数据。
blogModel.find({title: {$in: ['Mongoose', 'Mongodb', 'Nodejs']}}); //查询“title”为“Mongoose”或“Mongodb”或“Nodejs”其中之一的数据。

// 逻辑查询运算符
// $or 或 ／ $and 与 ／ $nor 非
blogModel.find({ $and: [
    {meta.votes: {$gte: 50}}, 
    {meta.votes: {$lt: 100}}
]});
// 查询“meta”中的“votes”字段值大于等于50到小余100的数据。

blogModel.find({ $nor: [
    {meta.votes: 50}, 
    {meta.votes: 100}
]});
// 查询“meta”中的“votes”字段值不等于50和不等于100的数据

// 元素查询运算符
// $exists　查询的字段值是否存在
blogModel.find({ title: {$exists: true}});
blogModel.where('title').exists(true)；
// 查询存在“title”字段的数据。

// 评估查询运算符
// $mod　与数据进行取模运算筛选
blogModel.find({ meta.votes: {$mod: [4, 0]}});
blogModel.where('meta.votes').$mod(4, 0);
// 查找“meta”中的“votes”字段值与4取模后，值为0的数据。

// $regex　使用正则表达式查询数据
blogModel.find({ title: { $regex: "Mongoose.+","$options":"i"}});
// 搜索以“Mongoose”开头的“title”字段，“options”中的“i”代表不区分大小写。
// $options参数与其余用法可以查看mongodb文档中 $regex 一节。

// $where　支持js表达式查询
blogModel.find({ $where: 'this.comments.length === 10 || this.name.length === 5' });
blogModel.$where(function() { return this.comments.length === 10 || this.name.length === 5;

// 改
blogModel.update({title: "Mongoose"}, {author: "L"}, {multi: true}, function(err, docs){
    if(err) console.log(err);
    console.log('更改成功：' + docs);
})
// 以上代码先查询“title”为“Mongoose”的数据，然后将它的“author”修改为“L”，“multi”为true允许更新多条查询记录。
Model.updateMany(conditions, doc, [options], [callback])  //一次更新多条

Model.updateOne(conditions, doc, [options], [callback]) //一次更新一条

Model.findOneAndUpdate([conditions], [update], [options], [callback]) //conditions：查询条件；update：需要修改的数据；options控制选项；callback回调函数。

Model.remove(conditions, [callback])
blogModel.remove({author: "L"}, function(err, docs){
    if(err) console.log(err);
    console.log('删除成功：' + docs);
})
Model.findOneAndRemove(conditions, [options], [callback])

// 參考資料：https://www.jianshu.com/p/2f54b90efe15