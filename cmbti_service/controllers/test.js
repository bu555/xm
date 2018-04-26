const E = require('./example')
const V = require('./vote')
// E.createExample({name:'希特勒'}).then(res=>{
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

V.addVote({eid:'5ae1ebc84653312ed87b8bfe',uid:'uid777',result:'intj'}).then(res=>{
    console.log(res);
})