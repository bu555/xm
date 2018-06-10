
const testModel = require('../models/schema/testSchema') 
const myUtill = require('../models/utill')
class Test {
    constructor(){
    }
    // 发表文章 options:{category:'',uip:'',res:'Object'}
    static addTest(options){
        return new Promise((resolve,reject)=>{
            // 创建tid
            let tid = ''
            tid = options.category==='mbti' ? 'mbti': tid
            tid = options.category==='func' ? 'func': tid
            if(!tid){
                return reject('type 参数错误')
            }
            tid += ('_'+Date.now() + '_'+myUtill.randomLowercaseString(1))
            let type = ''
            type += options.res.e > options.res.i ?'e':'i'
            type += options.res.s > options.res.n ?'s':'n'
            type += options.res.t > options.res.f ?'t':'f'
            type += options.res.j > options.res.p ?'j':'p'

            let test = new testModel({
                tid:tid,
                category:options.category,
                type:type,
                uip:options.uip || '',
                c_time:new Date(),
                res:options.res || {}
            })
            test.save((err)=>{
                if(err) return reject('The testModel add failed')
                resolve({
                    // _id:test_id,
                    tid:test.tid,
                    type:test.type,
                    category:test.category
                })
            })
        })
    }


}


module.exports = Test