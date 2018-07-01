<template>
<div class="forum-item" v-loading="loading">
    <div class="main-box">
         <div class="article" v-loading="loading1">
            <div class="a-header">
                <div class="title">
                    <div  class="a-type">
                        <div class="good"  v-if="data.good">精华</div>
                        <div class="share" v-if="data.category==='share'">分享</div>
                        <div class="ask"  v-if="data.category==='ask'">问答</div>
                    </div>
                    <div class="" style="position:relative;width:100%;min-height:55px">
                        <div class="h1">{{data.title}}</div>
                        <div class="t-info"> 
                            <div class="text">
                                <span>
                                <router-link to="">
                                        <i class="fa fa-user-o"></i> {{data.r_name}}
                                        <!--作者阿凡达 -->
                                </router-link>
                                </span>
                                <!--<span ><i class="el-icon-time"></i> 发布于2个月前</span>-->
                                <span ><i class="el-icon-time"></i> 发布于 {{$moment(data.c_time).startOf().fromNow()}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="a-body"  v-html="data.content">
            </div>
            <div class="a-footer">
                <div class="a-mark">
                    <span v-if="data.articleLiked" class="a-like btns2" style="color:#598dd3" @click="clickLike"><i class="fa fa-star" style="font-size:19px"></i> 收藏 <em style="font-size:15px">({{data.likes}})</em></span>
                    <span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-star-o"  style="font-size:19px"></i> 收藏 <em style="font-size:15px">({{data.likes}})</em></span>
                    
                </div>
                <div>
                    <el-button plain size="small"  style="font-size:15px" @click="showComment=true"><i class="el-icon-edit-outline"  style="font-size:16px"></i> 写评论</el-button>
                </div>
            </div>
            <!--来自account的评论-->
            <div id="mycomment" ></div>
            <div class="comment" v-if="(accountCommentList.comment instanceof Array) && accountCommentList.comment.length>0 " style="margin-top:15px;min-height:100px">
                <div style="height:15px;background:#f7f7f7"></div>
                <div style="height:40px;line-height:40px;padding-left:4%;background:#a7c8ec;color:#fff">
                    <span class="fa fa-commenting" style="font-size:18px"></span> 
                    我的评论
                </div>
                <div class="c-body">
                    <div class="c-list" v-for="(v,i) in accountCommentList.comment" :key="i">
                        <div class="photo">
                            <router-link to="">
                                <img :src="$store.state.userInfo.avatar?$pathAvatar +$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                            </router-link>
                        </div>
                        <div class="c-name">
                            <em class="overflow-row-1">{{$store.state.userInfo.r_name}}</em>
                            <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                            <div class="zan c-c" @click="zan($event,v.cid,v.zans)">
                                <i class="icon iconfont icon-praise_fill" style="font-size:22px"></i> 
                                <em>{{v.zans>9999?'9999+':v.zans}}</em> 
                            </div>
                        </div>
                        <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                        </div>
                    </div>
                </div>
            </div> <!--来自account的评论 end-->
            <div class="a-publish-comment" v-if="showComment">
                <el-input type="textarea" v-model="myComment" placeholder="发表评论" :rows="4"></el-input></br>
                <div style="text-align:right;padding-top:10px">
                    <el-button size="small" type="default"  @click="showComment=false">取 消</el-button>
                    <el-button size="small" type="primary" @click="addComment">发 表</el-button>
                </div>
            </div>
         </div>
         <div class="comment" v-loading="loading2||zaning">
            <div class="c-header" >
                 <span class="fa fa-comments" style="font-size:20px"></span> 
                 评论
             </div>
            <div class="c-tab">
                <span>按</span>
                <span :class="commentActive==='hot'?'c-type active':'c-type'" @click="commentActive='hot'">热门</span>
                <span style="color:#bbb">|</span>
                <span :class="commentActive==='time'?'c-type active':'c-type'" @click="commentActive='time'">时间</span>
            </div>
             <div class="c-body">
                <div v-if="!loading2 && commentList.length<1" style="text-align:center;color:#bbb">暂无评论</div>
                <div class="c-list" v-for="(v,i) in commentList">
                    <div class="photo">
                        <router-link to="">
                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                        </router-link>
                    </div>
                    <div class="c-name">
                        <em class="overflow-row-1">{{v.r_name}}</em>
                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                        <div class="zan c-c" @click="zan($event,v.cid,v.zans)">
                            <i class="icon iconfont icon-praise_fill" style="font-size:22px"></i> 
                            <em>{{v.zans>9999?'9999+':v.zans}}</em> 
                        </div>
                    </div>
                    <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                        <!--搭建 VPN 的话推荐 shadowsocks 这神奇，google 下会有很多搭建方法的教程。然后，使用和设置方法可以看（里面也提供了线路的订购） http://klead.de/docs/guide/index.html-->
                    </div>
                </div>

                <div class="load-more" v-if="!loading2 && currentCommentList.length==size" @click="moreComment">
                加载更多...
                </div>
             </div>
         </div>



    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 5">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            aid:'',
            data:{},
            commentList:[],
            size:3,
            commentPage:1,
            currentCommentList:[],
            showComment:false,
            myComment:'',
            loading1:false,
            loading2:false,
            loading:false,
            commentActive:'hot',
            zaning:false,

            accountCommentList:'', //我的评论，从个人中心跳转
            
        }
    },
    watch:{
        'commentActive':function(){
            this.commentPage = 1
            this.commentList = []
            this.getCommentByAid()
        }
    },
    methods:{
        zan(e,cid,zans){
            if(this.zaning) return
            this.zaning = true
            let d = e.currentTarget.querySelector('em')
            let count = d.innerHTML
            this.$axios.clickArticleCommentZan({aid:this.aid,cid:cid}).then(res=>{
                this.zaning = false
                if(res.data.success){
                    if(/^\d+$/.test(count)){
                        d.innerHTML = Number(count)+res.data.result.count
                    }else{
                        console.log('非数字');
                    }
                }
            }).catch(err=>{
                this.zaning = false
            })

        },
        getCommentByAid(){
            this.loading2 = true
            this.$axios.getCommentByAid({aid:this.aid,page:this.commentPage,size:this.size,type:this.commentActive}).then(res=>{
                this.loading2 = false
                if(res.data.success){
                    this.currentCommentList = res.data.data
                    this.commentList = this.commentList.concat(res.data.data)
                }
            }).catch(err=>{
                this.loading2 = false
            })
        },
        // 獲取文章主要信息
        getArticleInfo(){
            this.loading1 = true
            this.$axios.getArticleById({aid:this.aid}).then(res=>{
                this.loading1 = false
                if(res.data.success){
                    this.data = res.data.data
                }
            }).catch(err=>{
                this.loading1 = false
            })
        },
        addComment(){
            if(!this.myComment.trim()){
                this.$message.error('请输入评论内容！');
                return 
            }
            this.loading = true
            this.$axios.articleAddComment({aid:this.aid,content:this.myComment}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '评论成功！',
                        type: 'success'
                    });
                    this.myComment = ''
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        clickLike(){
            this.$axios.clickArticleLike({aid:this.aid}).then(res=>{
                if(res.data.success){
                    this.data.likes = this.data.likes+res.data.result.count
                    this.data.articleLiked = !this.data.articleLiked
                }
            })
        },
        moreComment(){
            this.commentPage = this.commentPage-0+1  //页数加1
            this.getCommentByAid()  //获取下一页评论
        },
        // 显示所有评论
        showAllComment(e){
            e.currentTarget.classList.toggle('overflow-row-5')
        }
    },
    mounted(){
    },
    created(){
        this.aid = this.$route.path.split('/')[2]
        if(this.aid){
            this.getArticleInfo()
            this.getCommentByAid()

        }
        //处理my 评论
        if(this.$route.query.index || this.$route.query.index==0){
            if(localStorage.getItem('dataA')){
                let temp = JSON.parse(localStorage.getItem('dataA'))
                if(temp[this.$route.query.index-0].aid === this.aid){  //保证是同一篇文档
                    this.accountCommentList = temp[this.$route.query.index-0]
                }
            }
        }
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum-item {
    max-width:1180px;
    margin:12px auto;
    position: relative;
    display:flex;
    .main-box {
        flex:1;
        // background-color: #fff;
        margin-bottom:12px;
        width:100%;
        .article {
            background-color: #fff;
            // margin-bottom:1%;
            margin-bottom:15px;
            // box-shadow: -0px 0 5px #777;
        }
        .a-header {
            .title {
                display: flex;
                padding:4% 4.5% 1.5% 4%;
                min-height:75px;
                .a-type {
                    flex:0 0 33px;
                    margin-right:1%;
                    // padding-top:2px;
                    &>div {
                        // flex:0 0 100%;
                        height:18px;
                        width:32px;
                        line-height: 18px;
                        text-align:center;
                        font-size:13px;
                        white-space: nowrap;
                        border-radius:3px;
                        color:#fff;
                        // height:20px;
                        margin-bottom:2px;
                    }
                    .good {
                        background: #feae4b;
                    }
                    .share {
                        // background-color: #598dd3;
                        border:1px solid #bbb;
                        color: #bbb;
                    }
                    .ask {
                        background-color: #80bd01;
                    }
                }
                .h1 {
                    font-size:18px;
                    font-weight:600;
                    margin:0;padding:0;
                    // padding-right:152px;
                }
                .t-info {
                    font-size:14px;
                    margin:0;padding:0;
                    margin-top:2.2%;
                    color:#838383;
                    .text {
                        // background-color: #fbfbfb;
                        position:relative;
                        display:flex;
                        flex-wrap:wrap;
                        align-items:center;
                        margin-left: -2px;
                        &>span {
                            margin:0px 15px 0px 0;
                        }


                        }
                    }
                    i {
                        // margin-left:5px;
                    }
                    a {
                        color:#838383;
                        &:hover {
                            color:#456ea5;
                        }
                    }
                    .btns {
                        border:1px solid #ccc;
                        display:inline-block;
                        border-radius:2px;
                        margin-right:5px;
                        padding:2px 7px;
                        cursor:pointer;
                        display:inline-block;
                        font-size:15px;
                        // height:25px;
                        // line-height: 25px;
                        &:hover {
                            background-color: #ecf5ff;
                            border-color:#a4c8ed;
                            color:#456ea5;
                        }
                    }
                    .btns.active {
                            background-color: #598dd3;
                            border-color:#598dd3;
                            color:#fff
                    }
                    .author {
                        position:absolute;
                        top:-10px;
                        right:7px;
                        width:110px;
                        padding:2px;
                        font-size:15px;
                        // background-color: lime;
                        img {
                            width:65px;
                            height:65px;
                            // border-radius:50%;
                            border-radius:4px;
                            border:1px solid #f5f5f5;
                            display:block;
                            margin:0 auto;
                        }
                        &>span {
                            display:block;
                            margin:3px auto;
                            text-align:center;
                        }
                        .a-name {
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .btns {
                            display:inline-block;
                            margin:0 auto;
                            border:1px solid 
                            // max-width:77px;
                        }
                    }

                }
            }
        }
        .a-body {
            padding:3% 6% 5% 8%;
            font-size:16px;
            // border-bottom:1px solid #efefef;
            border-top:1px solid #efefef;
            min-height:150px;
        }
        .a-footer {
            padding:2% 6% 2% 8%;
            border-top:1px solid #eee;
            background-color: #fefefe;
            display:flex;
            justify-content: space-between;
            &>div {
                height:36px;
                line-height: 36px;
                border-radius:18px;
                // border:1px solid #ccc;
            }
            .a-like {
            // line-height: 18px;
            border-radius:2px;
            cursor:pointer;
            display:inline-block;
            font-size:15px;
            color:#888;
            &:hover {
                color:#4d9efc;
            }
            .a-like.btns2 {
                color:#4d9efc;
            }
            .a-mark {
                display:flex;
                align-items: center;
            }

        }
    }
    .a-publish-comment {
        background-color: #fefefe;
        padding:3%;
        border-top:1px solid #eee;
    }
    .comment {
        background-color: #fff;
        min-height:150px;
        padding-bottom:10px;
        min-height:470px;
        .c-header {
            height:40px;
            line-height: 40px;
            border-bottom:1px solid #eee;
            background-color: #a4c8ed;
            padding-left:4%;
            color:#fff;
            font-size:16px;
            display:flex;
            align-items:center;
        }
        .c-tab {
                height:42px;
                line-height: 42px;
                border-bottom:1px solid #fafafa;
                background-color: #fafafa;
                padding-left:4%;
                font-size:16px;
                display:flex;
                color:#555;
                &>span {
                    margin-right:7px;
                }
                .c-type {
                    cursor:pointer;
                }
                &>.c-type.active {
                    font-weight:700;
                    color:#496ea3;
                }
            }
        .c-body {
            padding:1% 4.5% 3% 4%;
            .c-list {
                // background: pink;
                min-height:60px;
                padding:12px 0px 9px 50px;
                border-bottom:1px solid #f7f7f7;
                position: relative;
                color:#3c3c3c;
                .photo {
                    width:39px;
                    height:39px;
                    border:1px solid #eee;
                    position: absolute;
                    top:15px;
                    left:0px;
                    border-radius:2px;
                    img {
                        width:100%;
                        height:100%;
                    }
                }
                .c-name {
                    font-size:15px;
                    display:flex;
                    align-items:center;
                    color:#7f7d7d;
                    position: relative;
                    margin-bottom: 2px;
                    &>em {
                        display:inline-block;
                        max-width:105px;
                    }
                    &>span {
                        padding-left:10px;
                        font-weight:400;
                    }
                    .zan.c-c {
                        line-height: 20px;;
                        // vertical-align: middle;
                        display:flex;
                        align-items: center;
                        cursor:pointer;
                        min-width:55px;
                        max-width:65px;
                        // margin-right:42px;
                        color:#cbcbcb;
                        position: absolute;
                        right:0px;
                        top:0px;
                        em {
                            position: relative;
                            top:2px;
                        }
                    }
                }
                .c-content {
                    padding:2px 0 5px;
                    font-size:14px;
                    word-break:break-all; //英文换行
                }
            }
            .load-more {
                max-width:365px;
                margin:0 auto;
                text-align:center;
                padding:10px 0;
                cursor:pointer;
                color:#598dd3;
                &:hover {
                    color:#456ea5;
                }
            }
        }
    }
    .aside-box {
        flex:0 0 333px;
        margin-left:12px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:15px;
            margin:0 0 10px;
        }
    }
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {

        }
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }
    }
    @media screen and (max-width:525px) {
        .main-box {
            .a-header {
                .title {
                    padding:4% 2.5%;
                    .h1 {
                        padding-right:0;
                        font-size:20px;
                    }
                    .t-info {
                        .text {
                            // padding-right:82px;
                            background: #fcfcfc;
                            .btns {
                                // position: absolute;
                                // right:0px;
                                // top:5px;
                            }
                        }
                        .author {
                            position:relative;
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            width:100%;
                            top:0px;
                            right:0px;
                            background-color: #fcfcfc;
                            padding:5px 5px;
                            border-radius:3px;
                            margin-top:4px;
                            img {
                                flex:0 0 auto;
                                width:35px;
                                height:35px;
                                // border-radius:50%;
                                border-radius:4px;
                                border:1px solid #f5f5f5;
                                display:block;
                                margin:0;
                            }
                            &>span {
                                display:block;
                                margin:0;
                                text-align:center;
                            }
                            .a-name {
                                flex:1;
                                text-align:left;
                                font-size:14px;
                                padding-left:5px;
                            }
                            .btns {
                            }
                        }

                    }
                    
                }
            }
            .a-body {
                padding:3% 2.5% 5% 4.5%;
                font-size:17px;
            }
            .comment {
                // padding:2% 2.5% 2% 3%;
                padding:0;
                .c-body {
                    padding:2% 2.5% 2% 3%;
                    .c-list {
                        padding-left:45px;
                        .c-content {
                        }
                    }
                }

            }
            .a-footer {
                padding:2% 2.5% 2% 4%;
            }
        }
    }
}

</style>
    