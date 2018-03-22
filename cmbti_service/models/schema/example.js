const mongoose = require('mongoose')

const exampleSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    create_time: Date,
    type: String,
    total: Number, //参与人数
    tag: String,
    birth: String,
    conste: String, //星座
    vote: Object,
    // vote:{
    //     'i':11,
    //     'e':123,
    //     's':1,
    //     'n':2,
    //     't':44,
    //     'f':1,
    //     'j':99,
    //     'p':88
    // }, 
    voteLog: Array,
    // [{uid:'111',result:'in*j'}]
})

// Model模型，是经过Schema构造来的，除了Schema定义的数据库骨架以外，还具有数据库行为模型，他相当于管理数据库属性、行为的类
const Example = module.exports = mongoose.model('ExampleBody', exampleSchema) 