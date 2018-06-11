<template>
<div class="forum-item">
    <div class="main-box">
         <div class="article">
            <div class="a-header">
                <div class="title">
                    <div  class="a-type">
                        <div class="good"  v-if="data.good">精华</div>
                        <div class="share" v-if="data.category==='share'">分享</div>
                        <div class="ask"  v-if="data.category==='ask'">问答</div>
                    </div>
                    <div class="" style="position:relative;width:100%;min-height:55px">
                        <!--<div class="h1">分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩</div>-->
                        <!--<div class="h1">分享推荐一个自己发现的一个VPS，有兴趣</div>-->
                        <div class="h1">{{data.title}}</div>
                        <div class="t-info"> 
                            <div class="text">
                                <!--作者 <router-link to="">
                                        <img  class="author" src="/static/img/logo_a.png" alt="">
                                风语者 
                                </router-link>-->
                                <span>
                                <router-link to="">
                                        <i class="icon iconfont icon-people"></i>{{data.r_name}}
                                        <!--作者阿凡达 -->
                                        
                                </router-link>
                                </span>
                                <!--<span ><i class="el-icon-time"></i> 发布于2个月前</span>-->
                                <span ><i class="el-icon-time"></i> 发布于 {{$moment(data.c_time).startOf().fromNow()}}</span>
                                <!--<span><i class="el-icon-view"></i>14567次浏览</span>
                                <span><i class="el-icon-share"></i>147次分享</span>-->
                                <!--<span v-if="data.articleLiked" class="a-like btns2" style="color:#598dd3" @click="clickLike"><i class="el-icon-star-on" style="font-size:16px"></i>已标记</span>
                                <span v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="el-icon-star-off"  style="font-size:16px"></i>标记</span>-->
                            </div>
                            <!--<div  class="author">
                                <img src="/static/img/logo_a.png" alt="">
                                <span class="a-name">风语者风语HHHHHH者...</span>
                                <div style="text-align:center;">
                                <span v-if="false" class="btns"><i class="el-icon-plus"  style="font-weight:700;font-size:13px;margin-left:0"></i> 关注TA</span>
                                <span class="btns active"><i class="el-icon-plus"  style="font-weight:700;font-size:13px;margin-left:0"></i> 已关注</span>
                                </div>
                            </div>-->
                        </div>

                    </div>
                </div>
            </div>
            <div class="a-body">{{data.content}} <button @click="addComment">评论</button>
                <!--<p>
                分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有 
                </p>
                <p>自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有</p>-->
            </div>
            <div class="a-footer">
                <div>
                    <span v-if="data.articleLiked" class="a-like btns2" style="color:#598dd3" @click="clickLike"><i class="fa fa-heart" style="font-size:16px"></i> 喜欢 <em style="font-size:14px">({{data.likes}}</em>)</span>
                    <span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-heart-o"  style="font-size:16px"></i> 喜欢 <em style="font-size:14px">({{data.likes}})</em></span>
                    
                </div>
                <div>
                    <el-button plain size="small"  style="font-size:15px"><i class="el-icon-edit-outline"  style="font-size:16px"></i> 写评论</el-button>
                </div>
            </div>

         </div>
         <div class="comment">
            <div class="c-header" >
                 <span class="icon iconfont icon-interactive" style="font-size:25px"></span> 
                 <span> 评论</span>
             </div>
            <div class="c-tab">
                <span>按</span>
                <span class="hot active" @click="toggleCommentType($event,'hot')">热门</span>
                <span>|</span>
                <span class="time" @click="toggleCommentType($event,'time')">时间</span>
            </div>
             <div class="c-body">
                <div v-if="commentList.length<1" style="text-align:center;color:#bbb">暂无评论</div>
                <div class="c-list" v-for="(v,i) in commentList">
                    <div class="photo">
                        <router-link to="">
                            <img v-if="v.avatar" :src="v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                        </router-link>
                    </div>
                    <div class="c-name">{{v.r_name}}
                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                    </div>
                    <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                        <!--搭建 VPN 的话推荐 shadowsocks 这神奇，google 下会有很多搭建方法的教程。然后，使用和设置方法可以看（里面也提供了线路的订购） http://klead.de/docs/guide/index.html-->
                    </div>
                    <div class="c-ctrl">
                        <div class="zan c-c" @click="zan($event,v.cid,v.zans)">
                            <i class="icon iconfont icon-praise_fill" style="font-size:22px"></i> 
                            <em>{{v.zans}}</em> 
                        </div>
                        <div class="reply c-c">
                            <i class="icon iconfont icon-message" style="font-size:24px"></i> 
                            <em>22</em> 
                        </div>
                        <div class="share c-c">
                            <i class="icon iconfont icon-share_fill" style="font-size:20px"></i> 
                            <em></em> 
                        </div>
                    </div>
                </div>

                <div class="load-more" v-if="currentCommentList.length==size" @click="moreComment">
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
            currentCommentList:[]
        }
    },
    methods:{
        zan(e,cid,zans){
            console.log(e.currentTarget.querySelector('em'));
            let d = e.currentTarget.querySelector('em')
            let count = d.innerHTML
            // console.log(count);
            this.$axios.clickArticleCommentZan({aid:this.aid,cid:cid}).then(res=>{
                if(res.data.success){
                    // if(e.currentTarget.classList.contains('active')){
                    //     count = Number(count)-1
                    // }else{
                    //     count = Number(count)+1
                    // }
                    d.innerHTML = Number(count)+res.data.result.count
                    // e.currentTarget.classList.toggle('active')
                }
            })

        },
        getCommentByAid(){
            this.$axios.getCommentByAid({aid:this.aid,page:this.commentPage,size:this.size}).then(res=>{
                if(res.data.success){
                    this.currentCommentList = res.data.data
                    this.commentList = this.commentList.concat(res.data.data)
                }
            })
        },
        getArticleInfo(){
            this.$axios.getArticleById({aid:this.aid}).then(res=>{
                if(res.data.success){
                    this.data = res.data.data
                }
            })
        },
        addComment(){
            this.$axios.articleAddComment({aid:this.aid,content:'这是评论内容'}).then(res=>{
                if(res.data.success){
                    console.log('评论成功');
                }
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
    created(){
        this.aid = this.$route.path.split('/')[2]
        if(this.aid){
            this.getArticleInfo()
            this.getCommentByAid()

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
            border-bottom:1px solid #eee;
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
            font-size:16px;
            color:#888;
            &:hover {
                color:#4d9efc;
            }
            .a-like.btns2 {
                color:#4d9efc;
            }

        }
    }
    .comment {
        background-color: #fff;
        min-height:150px;
        padding-bottom:10px;
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
                height:35px;
                line-height: 35px;
                border-bottom:1px solid #fafafa;
                background-color: #fafafa;
                padding-left:4%;
                font-size:15px;
                display:flex;
                color:#555;
                &>span {
                    margin-right:7px;
                }
                .hot,.time {
                    cursor:pointer;
                }
                &>span.active {
                    font-weight:700;
                    color:#222;
                }
            }
        .c-body {
            padding:2% 4.5% 3% 4%;
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
                    font-weight:700;
                    // color:#456ea5;
                    &>span {
                        color:#aaa;
                        padding-left:10px;
                        font-weight:400;
                    }
                }
                .c-content {
                    padding:2px 0 5px;
                    font-size:15px;
                }
                .c-ctrl {
                    display:flex;
                    font-size:14px;
                    padding-top:5px;
                    .c-c {
                        line-height: 20px;;
                        vertical-align: middle;
                        display:flex;
                        align-items: center;
                        cursor:pointer;
                        width:25px;
                        margin-right:50px;
                        color:#cbcbcb;
                        i {
                            padding:2px 2px 2px 1px;
                        }
                        em {
                            padding-top:4px;
                        }
                    }
                    .zan {
                        margin-right:50px;
                        &:hover {

                        }

                    }
                    .zan.active {
                        color:#70a9e5;
                    }
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
    