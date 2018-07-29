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
                                <Avatar :src="data.avatar?$pathAvatar+data.avatar:'/static/img/logo_a.png'" :to="'/info/'+data.uid"></Avatar>
                                <!--<i class="fa fa-user-o"></i> -->
                                <span>
                                    {{data.r_name}}
                                    <!--作者阿凡达 -->

                                </span>
                                <!--<span ><i class="el-icon-time"></i> 发布于2个月前</span>-->
                                <span ><i class="el-icon-time"></i> 发布于 {{$moment(data.c_time).startOf().fromNow()}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="a-body"  v-html="data.content">
            <!--<div class="a-body"  v-html="test">-->
            </div>
            <div class="main-ctrl">
                <div>
                    <span class="a-zan btns1" :style="data.articleZaned?'color:#4d9efc':''" @click="articleAZan"><i class="fa fa-thumbs-up"></i><br/>赞 <em>({{data.zans}})</em></span>
                    <!--<el-button plain size="small"  style="font-size:15px" @click="showComment=true"><i class="el-icon-edit-outline"  style="font-size:16px"></i> 评论</el-button>-->
                </div>
                <div>
                    <span  class="a-like btns2" :style="data.articleLiked?'color:#4d9efc':''" @click="clickLike"><i class="fa fa-star"></i><br/>收藏 <em>({{data.likes}})</em></span>
                    <!--<span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-star-o"></i> 收藏 <em>({{data.likes}})</em></span>-->
                    
                </div>
                <div>
                    <span :class="showComment?'a-comm active':'a-comm'" @click="showComment=!showComment"><i class="el-icon-edit-outline"></i><br/>写评论</span>
                    <!--<el-button plain size="small"  style="font-size:15px" @click=""><i class="el-icon-edit-outline"  style="font-size:16px"></i> 评论</el-button>-->
                </div>
            </div>
            <div class="a-publish-comment" v-if="showComment">
                <el-input type="textarea" v-model="myComment" placeholder="发表评论" :rows="4"></el-input></br>
                <div style="text-align:right;padding-top:10px">
                    <el-button size="small" type="default"  @click="showComment=false;myComment=''">取 消</el-button>
                    <el-button size="small" type="primary" @click="addComment">发 表</el-button>
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
                                <router-link :to="'/info/'+v.uid">
                                    <img :src="$store.state.userInfo.avatar?$pathAvatar +$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                                </router-link>
                            </div>
                            <div class="c-name">
                                <em class="overflow-row-1">{{$store.state.userInfo.r_name}}</em>
                                <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                                <div class="zan c-c">
                                    <i :class="v.isZaned?'fa fa-thumbs-up active':'fa fa-thumbs-up'"  style="cursor:auto"><em>{{v.zans>999?'999+':v.zans}}</em> </i> 
                                    <i class="fa fa-comment" style="cursor:auto"></i> 
                                </div>
                            </div>
                            <div v-if="v.rep" class="c-content overflow-row-5" @click="showAllComment($event)" style="background:#eee;padding-left:5px">
                                <span style="color:#5e8dd0">{{v.rep.r_name}}：</span>
                                {{v.rep.content}}
                            </div>
                            <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                            </div>
                            <div class="reply" v-if="v.zan">
                                <el-input
                                type="textarea"
                                autosize
                                placeholder="回复内容："
                                v-model="v.repContent">
                                </el-input>
                                <div class="reply-btn">
                                    <el-button type="primary" size="mini" @click="reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''})">发送</el-button>
                                </div>
                            </div>
                    </div>
                </div>
            </div> <!--来自account的评论 end-->

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
                        <router-link :to="'/info/'+v.uid">
                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                        </router-link>
                    </div>
                    <div class="c-name">
                        <em class="overflow-row-1">{{v.r_name}}</em>
                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                        <div class="zan c-c">
                            <i :class="v.isZaned?'fa fa-thumbs-up active':'fa fa-thumbs-up'"  @click="zan($event,v.cid,v.zans)"><em>{{v.zans>999?'999+':v.zans}}</em> </i> 
                            <i class="fa fa-comment" @click="v.zan=!v.zan;v.comment=''"></i> 
                        </div>
                    </div>
                    <!--回复用户-->
                    <div v-if="v.rep" class="c-content overflow-row-5" @click="showAllComment($event)" style="background:#eee;padding:3px;padding-left:5px">
                        <span style="color:#5e8dd0">{{v.rep.r_name}}：</span>
                        {{v.rep.content}}
                    </div>
                    <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                    </div>
                    <div class="reply" v-if="v.zan">
                        <el-input
                        type="textarea"
                        autosize
                        placeholder="回复内容："
                        v-model="v.repContent">
                        </el-input>
                        <div class="reply-btn">
                            <el-button type="primary" size="mini" @click="reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''})">发送</el-button>
                        </div>
                    </div>
                </div>

                <div class="load-more" v-if="!loading2 && currentCommentList.length==size" @click="moreComment">
                或许还有更多...
                </div>
             </div>
         </div>



    </div>
</div> 
</template>
<script>
import Avatar from '../common/avatar'
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
            replyComment:'',
            replyCid:'',

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
    components:{
        Avatar
    },
    methods:{
        clickZanArticle(){

        },
        articleAZan(){
            this.$axios.clickArticleZan({aid:this.aid}).then(res=>{
                if(res.data.success){
                    this.data.zans += res.data.result.count
                    this.data.articleZaned = !this.data.articleZaned
                }
            }).catch(err=>{
            })

        },
        zan(e,cid,zans){
            if(this.zaning) return
            this.zaning = true
            let d = e.currentTarget.querySelector('em')
            let iTag = e.currentTarget
            let count = d.innerHTML
            this.$axios.clickArticleCommentZan({aid:this.aid,cid:cid}).then(res=>{
                this.zaning = false
                if(res.data.success){
                    if(/^\d+$/.test(count)){
                        d.innerHTML = Number(count)+res.data.result.count
                    }else{
                        console.log('非数字');
                    }
                    if(res.data.result.count==1){
                        iTag.classList.add('active')
                    }else if(res.data.result.count==-1){
                        iTag.classList.remove('active')
                    }
                }
            }).catch(err=>{
                this.zaning = false
            })

        },
        reply(cid,repContent,callback){
            repContent = repContent?repContent:''
            if(!repContent.trim()){
                this.$message.error('请输入回复内容！');
                return 
            }
            this.loading = true
            this.$axios.articleAddComment({aid:this.aid,content:repContent,cid:cid}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '回复成功！',
                        type: 'success'
                    });
                    callback && callback()
                }
            }).catch(err=>{
                this.loading = false
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
            this.$axios.articleAddComment({aid:this.aid,content:this.myComment,cid:''}).then(res=>{
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
                    padding-top: 4px;
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
        .main-ctrl {
            padding:2% 8% 3% 8%;
            border-top:1px solid #eee;
            background-color: #fefefe;
            display:flex;
            justify-content: space-between;
            &>div {
                height:36px;
                // line-height: 36px;
                text-align:center;
                // border-radius:18px;
                // border:1px solid #ccc;
                em {
                    font-size:14px;
                }
                i {
                    font-size:19px;
                }
                span {
                    color:#999;
                    // line-height: 18px;
                    border-radius:2px;
                    cursor:pointer;
                    display:inline-block;
                    font-size:15px;
                }
                &>span.active {
                    color:#4d9efc;
                }
            }
            .a-like {

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
                        max-width:97px;
                        color:#555;
                    }
                    &>span {
                        padding-left:10px;
                        font-weight:400;
                        font-size:14px;
                    }
                    .zan.c-c {
                        line-height: 20px;;
                        // vertical-align: middle;
                        display:flex;
                        align-items: center;
                        min-width:55px;
                        max-width:82px;
                        // margin-right:42px;
                        color:#cbcbcb;
                        position: absolute;
                        padding-right:1px;
                        right:0px;
                        top:-2px;
                        i {
                            cursor:pointer;
                            font-size:19px;
                        }
                        i.active {
                            color:#75a9e3;
                        }
                        em {
                            font-size:14px;
                            position: relative;
                            top:1px;
                        }
                        i.fa-comment {
                            font-size:17px;
                            margin-left:22px;
                        }
                    }
                }
                .c-content {
                    padding:2px 0 2px;
                    font-size:14px;
                    word-break:break-all; //英文换行
                }
                .reply {
                    padding-right:58px;
                    position: relative;
                    padding-top:10px;
                    border-top:1px dotted #eee;
                    // background-color: #f5f5f5;
                    .reply-btn {
                        position: absolute;
                        top:10px;
                        right:0px;
                    }
                    .el-button--mini, .el-button--mini.is-round {
                        padding: 9px 15px;
                        padding-bottom:10px;
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
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {

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
            .main-ctrl {
                padding:2% 2.5% 2% 4%;
            }
        }
    }
}

</style>
    