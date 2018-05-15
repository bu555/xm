const E = require('./example')
const V = require('./vote')
const C = require('./comment')
const R = require('./exampleController')
// 创建人物
// E.createExample({name:'李斯'}).then(res=>{
//     console.log(res);
// },res=>{
//     console.log('错误',res);
// })

// E.updateExample({eid:'5ae0a4460392da3120eb87a5',type:'entj'}).then(res=>{
//     console.log(res)
// })

// E.updateExample({eid:'5ae1ebc84653312ed87b8bfe',type:'infj'}).then(res=>{
//     console.log(res)
// })

// E.searchExample({eid:'5ae1ebc84653312ed87b8bfe'}).then(res=>{
//     console.log(res)
// })

// V.createVote({eid:'5ae1ebc84653312ed87b8bfe'}).then(res=>{
//     console.log(res);
// })

// V.addVote({eid:'5ae1ebc84653312ed87b8bfe',uid:'uid777',result:'intj'}).then(res=>{
//     console.log(res);
// })

// R({body:{name:'司马光'}},{})

// C.createComment({eid:'1111111'}).then(res=>{
//     console.log(res);
// })
// C.addComment({eid:'1111111',uid:'b557',result:'哈哈哈，矿池个人中心完成'}).then(res=>{
//     console.log(res);
// })
// C.deleteComment({eid:'1111111',cid:'lvGw3rIANaKr4nL',uid:'b557',result:''}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
// C.deleteComment({eid:'11111151',cid:'lvGw3rIANaKr4nL',uid:'b557',result:''}).then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })

// C.addComment({eid:'5afa3dd5b3973b12d480b88c',uid:'uid1',result:'矿工数量100'}).then(data=>{
//     console.log('评论成功');
// })
C.addZan({eid:'5afa3dd5b3973b12d480b88c',cid:'5afa3e588f9dc033a0840913',uid:'uid5'}) .then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})