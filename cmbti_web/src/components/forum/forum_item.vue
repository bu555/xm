<template>
    <div class="forum-item">
        <NavMain></NavMain>
        <NavSub :data="navData" :search="setSearch" @searchVal="currentSearch" @submit="searchSubmit()" placeholder="输入内容搜索"></NavSub>

        <div class="main-box">
            <div class="article" v-loading="loading1">
                <div class="a-header">
                    <div class="title">
                        <!-- <div  class="a-type">
                            <div class="good"  v-if="data.good">精华</div>
                            <div class="share" v-if="data.category==='share'">分享</div>
                            <div class="ask"  v-if="data.category==='ask'">问答</div>
                        </div> -->
                        <div class="" style="position:relative;width:100%;min-height:55px">
                            <h1 class="h1">{{data.title}}</h1>
                            <div class="t-info"> 
                                <div class="text">
                                    <Avatar :src="data.avatar" :uid="data.uid" size="small" round="true"></Avatar>
                                    <span class="overflow-row-1" style="padding-left:3px;max-width:120px">{{data.r_name+"GGGGGGGGGGGGGGGGGGGGGG"}}</span>
                                    <!-- <followBtn :isFollow="true" :uuid="'9999'"></followBtn> -->
                                    <!-- <span ><i class="el-icon-time"></i> 发布于 {{$moment(data.c_time).startOf().fromNow()}}</span> -->
                                    <span >{{$moment(data.c_time).format('YYYY.MM.DD HH:mm')}}</span>
                                    <!-- <span >喜欢 7</span>
                                    <span >评论 25</span> -->
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
                        <div class="m-loading" v-if="zanLoading"><i class="el-icon-loading" ></i></div>
                    </div>
                    <div>
                        <span  class="a-like btns2" :style="data.articleLiked?'color:#4d9efc':''" @click="clickLike"><i class="fa fa-star"></i><br/>收藏 <em>({{data.likes}})</em></span>
                        <!--<span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-star-o"></i> 收藏 <em>({{data.likes}})</em></span>-->
                        <div class="m-loading" v-if="likeLoading"><i class="el-icon-loading"></i></div>
                    </div>
                    <div>
                        <span :class="showComment?'a-comm active':'a-comm'" @click="showComment=!showComment"><i class="el-icon-edit-outline"></i><br/>写评论</span>
                        <!--<el-button plain size="small"  style="font-size:15px" @click=""><i class="el-icon-edit-outline"  style="font-size:16px"></i> 评论</el-button>-->
                    </div>
                </div>
                <div class="a-publish-comment" v-if="showComment">
                    <el-input type="textarea" v-model="myComment" placeholder="发表评论" :rows="4"></el-input><br>
                    <div style="text-align:right;padding-top:10px">
                        <el-button size="small" type="default"  @click="showComment=false;myComment=''">取 消</el-button>
                        <el-button size="small" type="primary" @click="addComment">发 表</el-button>
                    </div>
                </div>

            </div>
            <!-- 推荐的内容 -->
            <div class="recommend">
                <router-link to="/forum/article/new"  style="margin:11px 0;display:block">
                    <button class="bu-button bu-black">发帖</button>
                </router-link>
                <h2>你可能喜欢</h2>
                <ul>
                    <li v-for="(v,i) in 7" :key="i">
                        <router-link :to="'/forum/'+i"><i class="el-icon-document"></i> {{'INTP人格类型：思想者与追求者INTP人格类型：思想者与追求者INTP人格类型：思想者与追求者'}}</router-link>
                    </li>
                </ul>
            </div>
            <!--来自account的评论-->
            <div id="mycomment" ></div>
            <!--来自account的评论 end-->
            <CommentComp :accountCommentList="this.accountCommentList"></CommentComp>

            <!-- 文章评论 -->
            <CommentComp :aid="this.aid"></CommentComp>



        </div>
    </div>
</template>
<script>
import CommentComp from '../common/comment'
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
import followBtn from '@/components/common/follow_btn'
export default {
    data(){
        return {
            aid:'',
            data:{},
            showComment:false,
            myComment:'',
            loading1:false,
            loading2:false,
            loading:false,

            accountCommentList:'', //我的评论，从个人中心跳转
            likeLoading:false,
            zanLoading:false,    
            navData:{
                title:'M论坛',
                list:[
                    {
                        value:'全部',
                        link:'/forum?category=all&page=1'
                    },
                ]
            },
            search:'',
            setSearch:''
        }
    },
    components:{
        CommentComp,
        NavMain,
        NavSub,
        followBtn
    },
    watch:{
    },
    methods:{
        searchSubmit(){
            console.log('点击搜索');
        },
        currentSearch(val){
            this.search = val
            // if(!this.searchName && !this.$route.query.type){
            //     this.$router.push({query:{type:'all'}})
            // }
        },
        clickZanArticle(){

        },
        articleAZan(){
            this.zanLoading = true
            this.$axios.clickArticleZan({aid:this.aid}).then(res=>{
                this.zanLoading = false
                if(res.data.success){
                    this.data.zans += res.data.result.count
                    this.data.articleZaned = !this.data.articleZaned
                }
            }).catch(err=>{
                this.zanLoading = false
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
            this.likeLoading = true
            this.$axios.clickArticleLike({aid:this.aid}).then(res=>{
                this.likeLoading = false
                if(res.data.success){
                    this.data.likes = this.data.likes+res.data.result.count
                    this.data.articleLiked = !this.data.articleLiked
                }
            }).catch(err=>{
                this.likeLoading = false
            })
        },
    },
    mounted(){
    },
    created(){
        this.aid = this.$route.path.split('/')[2]
        if(this.aid){
            this.getArticleInfo()

        }
        //处理my 评论
        if(this.$route.query.index || this.$route.query.index===0){
            if(localStorage.getItem('dataA')){
                let temp = JSON.parse(localStorage.getItem('dataA'))
                if(temp[this.$route.query.index-0].aid === this.aid){  //保证是同一篇文档
                    this.accountCommentList = temp[this.$route.query.index-0].comment
                }
            }
        }
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum-item {
    position: relative;
    
    // 隐藏最底部tab
    .x-nav-sub .bottom-nav {
        display:none; 
    }
    // 重写关注按钮
    .follow-ctrl-btn {
        padding:0;
        span {
        font-size:12px;
        text-align: center;
        display: inline-block;
        width: 50px;
        height: 19px;
        line-height: 20px;
        border-radius: 3px;
        cursor: pointer;
        background-color: #eee;
        }
    }
    .main-box {
        max-width:970px;
        margin:28px auto;
        position: relative;
        border-radius:4px 4px 0 0;
        padding-right:320px;
        // 右侧推荐区
        .recommend {
            width:280px;
            // border:1px solid #f7f7f7;
            position:absolute;
            right:12px;
            top:0;
            padding:0 12px 12px;
            margin-bottom:12px;
            h2 {
                font-size:15px;
                margin-bottom:6px;
                padding-bottom:4px;
                color:#0e959d;
                // font-weight:600;
                border-bottom:1px solid #f1f1f1;
            }
            ul{
                li {
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    overflow:hidden;
                    margin-bottom:3px;
                    a {
                        color:#b4b4b4;
                        font-size:14px;
                        &:hover {
                            color:#0e959d;
                        }
                        i {
                            color:#0e959d;

                        }
                    }
                }
            }
        }
        .article {
        }
        .a-header {
            margin-bottom:12px;
            .title {
                display: flex;
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
                h1.h1 {
                    font-size:24px;
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
                        align-items:center;
                        &>span {
                            white-space:nowrap; 
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
            padding:15px 0 20px;
            font-size:16px;
            // border-bottom:1px solid #efefef;
            border-top:1px solid #efefef;
            min-height:150px;
            word-wrap:break-word;
            overflow: hidden;
        }
        .main-ctrl {
            padding:2% 8% 3% 8%;
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
            background-color: #fefefe;
            display:flex;
            justify-content: space-between;
            margin-bottom:22px;
            &>div {
                height:36px;
                // line-height: 36px;
                text-align:center;
                // border-radius:18px;
                // border:1px solid #ccc;
                position: relative;
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
                .m-loading{
                    position: absolute;
                    width:100%;
                    height:100%;
                    line-height: 32px;
                    left:0;
                    top:0;
                    background-color: #fff;
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
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:992px){
        .main-box {
            padding-left:12px;
        }
    }
    @media screen and (max-width:768px){
        .main-box {
            padding:0px 12px;
            // 右侧推荐区
            .recommend {
                width:100%;
                // border:1px solid #f7f7f7;
                position: relative;;
                right:0px;
                top:0;
                padding:0;
            }
        }
    }
    @media screen and (max-width:525px) {

    }
}

</style>
    