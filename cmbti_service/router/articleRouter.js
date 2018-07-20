
const express = require('express')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const myUtill = require('../models/utill')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin 
const User = require('../controllers/userHandler')
const Article = require('../controllers/articleHandler')
const Account = require('../controllers/accountHandler')
var xss = require('xss');
var logger = require('log4js').getLogger('logError');

// 发表或编辑文章  input : {uid:'',title:'',category:'share',content:'',aid:'可选，如有则为编辑'}
const publishArticle = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    let isEdit = options.aid ? options.aid:''
    // 参数验证
    if(!options.uid || !options.title || !options.category || !options.content){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{

            { 
                // 过滤xss 
            }

            // let article = await Article.publishArticle(options)
            let aid = await Article.publishArticle(options)
            options.aid = aid
            //article._id 添加到account "已发表文章数组"
            if(!isEdit){
                let updated = await Account.addPublishLog(options)
            }

            res.json({
                success: true,
                message: 'Publish success!'
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'Publish fail' 
            })
        }


    })()

}
// 删除文章（用户删除）  input : {uid:'',aid:''}
const deleteArticle = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.aid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            // 验证是否是用户发表的文章
            let acc = await Account.getUserInfoById(options)
            if(acc.my_article.indexOf(options.aid)==-1){
                return res.json({
                    success: false,
                    message: 'The user not publish aid' 
                })
            }
            //删除文章和记录
            let success = await Promise.all([Article.deleteArticle(options),Account.deletePublishLog(options)])
            res.json({
                success: true,
                message: 'Delete success!'
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'Delete fail' 
            })
        }


    })()

}
// 点击/取消喜欢（收藏）文章  input : {uid:'',aid:''}
const clickArticleLike = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.aid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Article.clickArticleLike(options)
            // 添加结果到账户记录
            // offset===1  aid添加到account likes_atricle数组中 offset===-1 从account likes_atricle数组中移除aid
            options.offset = r.count  //返回1 或-1
            let updated = await Account.clickLikeArticleLog(options)
            res.json({
                success: true,
                message: 'Success',
                result:r
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }


    })()
}
// 文章评论  input : {aid:'',uid:'',content:'',cid:'回复别人id'}
const addComment = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.aid || !options.content ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            console.log(44,options);
            options.content = xss(options.content)

            let r = await Article.addComment(options)  //返回cid
            // options = Object.assign(r,options)
            options.cid = r.cid  //这是新回复的cid
            options.update_time = r.update_time
            options.com_count = r.com_count
            // 加入到个人记录,更新Article最新时间
            await Promise.all([
                Account.addCommentLog(options),
                Article.setUpdateTime(options)
            ])
            // let added = await Account.addCommentLog(options)
            // 记录加入account
            res.json({
                success: true,
                message: 'Success',
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }


    })()
}
// 文章点赞  input : {aid:'',uid:''}
const clickArticleZan = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.aid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Article.clickArticleZan(options)  
            
            res.json({
                success: true,
                message: 'Success',
                result: r,

            })

        }catch(err){
            logger.error(err);
            console.log(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// 对文章评论点赞  input : {aid:'',uid:'',cid:''}
const clickCommentZan = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user._id;
    // 参数验证
    if(!options.uid || !options.aid || !options.cid ){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let r = await Article.clickCommentZan(options)  
            
            res.json({
                success: true,
                message: 'Success',
                result: r,

            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// 获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean,size:'',page}
const getArticle = (req,res)=>{
    let options = req.body || {}
    // 参数验证
    if(options.likes && !/^\d+$/.test(options.likes)){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            // let page = options.page ? Number(options.page) : 1
            // let size = options.size ? Number(size) : 10
            let size = myUtill.verifyNum(options.size) ? Number(options.size) : 5  //每次条数
            let page = myUtill.verifyNum(options.page) ? Number(options.page) : 1  //页数
            let data = await Article.getArticle(options) 
            let total = data.length
            let newList = JSON.parse(JSON.stringify(data.slice(  (page-1)*size,page*size   ))) 
            let proArr = []
            newList.forEach((v,i)=>{
                proArr.push(User.getUserById({uid:v.uid}))
            })
            let userList = await Promise.all(proArr)
            for(let i=0;i<newList.length;i++){
                if(userList[i]){
                    newList[i].r_name = userList[i].r_name
                    newList[i].avatar = userList[i].avatar 
                }else{
                    newList[i].r_name = '已注销'
                    newList[i].avatar = ''
                }
            }

            res.json({
                success: true,
                message: 'Success',
                data: newList,
                total:total
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// aid获取文章 options {aid:''}
const getArticleById = (req,res)=>{
    let options = req.body || {}
    options.uid = req.session.user ? req.session.user._id : ''
    // 参数验证
    if(!options.aid || typeof(options.aid)!=='string'){
        return res.json({
            success: false,
            message: 'Params Error' 
        })
    }
    (async ()=>{
        try{
            let a = await Article.getArticleById(options) 
            let result = JSON.parse(JSON.stringify(a[0]))
            delete result.like
            // delete r[0].like 
            result.content = a[1].content
            let user = await User.getUserById({uid:a[0].uid})
            result.r_name = user.r_name
            result.avatar = user.avatar
            result.articleLiked = false 
            result.articleZaned = false 
            if(options.uid){
                let loginUser = await Account.getUserInfoById({uid:options.uid})
                if(loginUser.likes_atricle.indexOf(options.aid)!==-1){
                    result.articleLiked = true
                }
                if(result.zan.indexOf(options.uid)!==-1){
                    result.articleZaned = true
                }
            }
            res.json({
                success: true,
                message: 'Success',
                data: result
            })

        }catch(err){
            logger.error(err);
            return res.json({
                success: false,
                message: 'catch error' 
            })
        }
    })()
}
// aid 获取评论 options {aid:'必传',page:'必传',size:'必传'}
const getCommentByAid = (req,res)=>{
        let options = req.body || {}
        options.uid = req.session.user ? req.session.user._id : ''
        // options.eid = req.body.aid || ''
        // options.page = req.body.page || ''
      if(!options.aid || !myUtill.verifyNum(options.page) || !myUtill.verifyNum(options.size)){
          return res.json({
              success:false,
              message:'Params Error'
          })
      }
      (async ()=>{
          try{
                let size = myUtill.verifyNum(options.size) ? Number(options.size) : 5  //每次条数
                let page = myUtill.verifyNum(options.page) ? Number(options.page) : 1  //页数
                let list = await Article.getComment(options)
                // 排序
                if(options.type && options.type==='hot'){
                    let temp
                    for(let i=0;i<list.length;i++){
                        let flag = 1
                        for(let j=0;j<list.length-i-1;j++){
                            if(list[j].zans<list[j+1].zans){
                                temp = list[j]
                                list[j] = list[j+1]
                                list[j+1] = temp
                                flag = 0
                            }
                        }
                        if(flag===1) break  //如果没发生交换，说明数组有序
                    }
                }else if(options.type && options.type==='time'){
                    list = list.reverse() //倒置
                }
                let newList = JSON.parse(JSON.stringify(list.slice((options.page-1)*options.size, (options.page-1)*options.size + options.size)))
                let proArr = []
                newList.forEach((v,i)=>{
                    proArr.push(User.getUserById({uid:v.uid}))
                })
                let userList = await Promise.all(proArr)
                for(let i=0;i<newList.length;i++){
                    // 查询并添加用户信息
                    if(userList[i]){
                        newList[i].r_name = userList[i].r_name
                        newList[i].avatar = userList[i].avatar 
                    }else{
                        newList[i].r_name = '已注销'
                        newList[i].avatar = ''
                    }
                    ///登录情况下，确认是否点赞
                    if(options.uid){ //如果登錄，確認是否點過贊
                        newList[i].isZaned = newList[i].zan.indexOf(options.uid)===-1 ?  false : true
                    }else{
                        newList[i].isZaned = false
                    }
                    newList[i].zan = null
                    // 在回复别的情况下,根据cid获取对应信息
                    if(newList[i].replay){
                        for(let k=0;k<list.length;k++){
                            if(list[k].cid===newList[i].replay){
                                let u = await User.getUserById({uid:list[k].uid})
                                newList[i].rep = {
                                    content:list[k].content,
                                    r_name:u.r_name,
                                    uid:list[k].uid
                                }
                            }
                        }
                    }
                }

                res.json({
                    success: true,
                    message: 'Success',
                    data: newList
                })
            }catch(err){
                logger.error(err);
                return res.json({
                    success: false,
                    message: 'catch error' 
                })
            }
      })()
}


router.post('/publish',checkLogin,publishArticle);
router.post('/addComment',checkLogin,addComment);
router.post('/clickArticleLike',checkLogin,clickArticleLike);
router.post('/clickCommentZan',checkLogin,clickCommentZan);
router.post('/clickArticleZan',checkLogin,clickArticleZan);
router.post('/getArticle',getArticle);
router.post('/getCommentByAid',getCommentByAid);
router.post('/getArticleById',getArticleById);
router.post('/deleteArticle',checkLogin,deleteArticle);
module.exports = router