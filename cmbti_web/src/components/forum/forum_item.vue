<template>
<div class="forum-item">
    <div class="main-box">
         <div class="article">
            <div class="a-header">
                <div class="title">
                    <div  class="type">
                        <div class="good">精华</div>
                        <div class="share">分享</div>
                        <div class="ask">问答</div>
                    </div>
                    <div class="" style="position:relative;width:100%;min-height:99px">
                        <div class="h1">分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩</div>
                        <!--<div class="h1">分享推荐一个自己发现的一个VPS，有兴趣</div>-->
                        <div class="t-info"> 
                            <div class="text">
                                <!--作者 <router-link to="">
                                        <img  class="author" src="/static/img/logo_a.png" alt="">
                                风语者 
                                </router-link>-->
                                <router-link to="">
                                    <span><i class="icon iconfont icon-people"  style="margin-left:0"></i>作者 ie7 </span>
                                </router-link>
                                <span><i class="el-icon-time"></i> 发布于2个月前</span>
                                <span><i class="el-icon-view"></i>14567次浏览</span>
                                <span><i class="el-icon-share"></i>147次分享</span>
                                <span class="btns"   style="margin-left:12px"><i class="fa fa-heart-o" style="margin-left:0"></i> 喜欢</span>
                            </div>
                            <div  class="author">
                                <img src="/static/img/logo_a.png" alt="">
                                <span class="a-name">风语者风语HHHHHH者...</span>
                                <span class="btns"><i class="el-icon-plus"  style="font-weight:700;font-size:13px;margin-left:0"></i> 关注TA</span>
                                <span class="btns active"><i class="el-icon-plus"  style="font-weight:700;font-size:13px;margin-left:0"></i> 已关注</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="a-body">分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有 </div>

         </div>
         <div class="comment">
             <div class="c-header" >
                 <i class="icon iconfont icon-interactive" style="font-size:20px"></i> 100 评论
             </div>
             <div class="c-body">
                <div class="c-list" v-for="(v,i) in 4">
                    <div class="photo">
                        <router-link to="">
                            <img src="/static/img/logo_a.png" alt="">
                        </router-link>
                    </div>
                    <div class="c-name">宋江001
                        <span>12天前</span> 
                    </div>
                    <div class="c-content">搭建 VPN 的话推荐 shadowsocks 这神奇，google 下会有很多搭建方法的教程。然后，使用和设置方法可以看（里面也提供了线路的订购） http://klead.de/docs/guide/index.html</div>
                    <div class="c-ctrl">
                        <div class="zan c-c" @click="zan($event)">
                            <i class="icon iconfont icon-praise_fill" style="font-size:22px"></i> 
                            <em>20000</em> 
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
    methods:{
        zan(e){
            let count = e.currentTarget.querySelector('em').innerHTML
            if(e.currentTarget.classList.contains('active')){
                 count = Number(count)-1
            }else{
                 count = Number(count)+1
            }
            e.currentTarget.querySelector('em').innerHTML = count
            e.currentTarget.classList.toggle('active')

        },
        getCommentByAid(){
            this.$axios.getCommentByAid({aid:'5b10a11fe9e24821305e3648',page:'1',size:'3'}).then(res=>{
                if(res.success){
                    console.log(res);
                }
            })
        }

    },
    created(){
            let category = this.$route.query.category
            if(!category){
                this.$router.push({
                    query:{category:'all'}
                })
            }

            this.getCommentByAid()
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
                .type {
                    margin-right:1%;
                    margin-top:-1px;
                    &>div {
                        padding:2px 5px;
                        font-size:13px;
                        white-space: nowrap;
                        border-radius:3px;
                        color:#fff;
                        height:20px;
                        margin-bottom:2px;
                    }
                    .good {
                        background: #feae4b;
                    }
                    .share {
                        background-color: #598dd3;
                    }
                    .ask {
                        background-color: #80bd01;
                    }
                }
                .h1 {
                    font-size:18px;
                    // font-weight:700;
                    margin:0;padding:0;
                    padding-right:152px;
                }
                .t-info {
                    font-size:14px;
                    margin:0;padding:0;
                    margin-top:2.2%;
                    color:#838383;
                    .text {
                        padding-right:230px;
                        position:relative;
                        .btns {
                            position: absolute;
                            right:157px;
                            top:0px;
                        }
                    }
                    i {
                        margin-left:5px;
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
                        padding:0 7px;
                        cursor:pointer;
                        height:25px;
                        line-height: 25px;
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
                        padding:2px 0;
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
                            margin:2px auto;
                            text-align:center;
                        }
                        .a-name {
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .btns {
                            max-width:77px;
                        }
                    }

                }
            }
        }
        .a-body {
            padding:3% 4.5% 5% 4%;
            font-size:16px;
            // border-bottom:1px solid #efefef;
            border-top:1px solid #efefef;
        }
        .a-footer {
            padding:1% 4.5% 1% 4%;

        }
        .comment {
            background-color: #fff;
            font-size:15px;
            .c-header {
                height:40px;
                line-height: 40px;
                border-bottom:1px solid #eee;
                background-color: #a4c8ed;
                padding-left:4%;
                color:#fff;
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
                        width:37px;
                        height:37px;
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
                        font-size:13px;
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
                    }
                    .c-ctrl {
                        display:flex;
                        .c-c {
                            line-height: 20px;;
                            font-size:12px;
                            vertical-align: middle;
                            display:flex;
                            align-items: center;
                            cursor:pointer;
                            width:25px;
                            margin-right:22px;
                            color:#cbcbcb;
                            i {
                                padding:2px 2px 2px 1px;
                            }
                            em {
                                padding-top:4px;
                            }
                        }
                        .zan {
                            margin-right:42px;
                            &:hover {

                            }

                        }
                        .zan.active {
                            color:#70a9e5;
                        }
                    }
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
    @media screen and (max-width:500px) {
        .main-box {
            .a-header {
                .title {
                    padding:4% 2.5%;
                    .h1 {
                        font-size:17px;
                        padding-right:0;
                    }
                    .t-info {
                        .text {
                            padding-right:82px;
                            background: #fcfcfc;
                            .btns {
                                position: absolute;
                                right:0px;
                                top:5px;
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
                                width:34px;
                                height:34px;
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
                                font-size:12px;
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
            }
            .comment {
                // padding:2% 2.5% 2% 3%;
                padding:0;
                min-height:47px;
                .c-body {
                    padding:2% 2.5% 2% 3%;
                    .c-list {
                        padding-left:45px;
                        .c-content {
                            font-size:14px;
                        }
                    }
                }
            }
        }
    }
}

</style>
    