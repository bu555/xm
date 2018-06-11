<template>
<div class="forum">
    <div class="main-box">
        <div class="tabs">
            <router-link :to="{query:{category:'all'}}">
                全部
            </router-link>
            <router-link :to="{query:{category:'good'}}">
                精华
            </router-link>
            <router-link :to="{query:{category:'share'}}">
                分享
            </router-link>
            <router-link :to="{query:{category:'ask'}}">
                问答
            </router-link>
            <a style=""><span style="display:inline-block;width:2px"></span></a>
            <!--发帖按钮-->
            <div class="ctrl-bar">
                <router-link to="/forum/article/new">
                    <el-button type="primary" plain round size="medium"><i class="el-icon-edit"></i> 创建</el-button>
                    <!--<el-button type="primary" plain round size="medium"><i class="el-icon-edit-outline"></i> 发帖</el-button>-->
                </router-link>
            </div>
        </div>
        <div class="article-list">
            <ul>
                <li v-for="(v,i) in 5">
                        <div class="author u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                            <div class="u-name">名字123</div>
                        </div>
                        <div class="title1">
                            <span class="category-type">精</span>
                            <router-link :to="'/forum/'+123">
                            <!--<span class="txt" style="white-space: nowrap;">-->
                            <span class="txt" style="">
                                {{i%2===0?'文章标题U章标题文文章标题文文章章标题文文章标题文文章UUUUUUUU文文章标题文文章':'《Node.js 调试指南》开源书籍发布'}}
                            </span>
                            </router-link>
                        </div>
                        <div class="last-replay u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                            <div class="u-name">名字123</div>
                        </div>
                        <div class="last-replay-date">14小时前</div>
                </li>
 
            </ul>

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
        init(){

        }

    },
    methods:{
        getArticle(){
            this.$axios.getArticle({}).then(res=>{
                if(res.success){
                    console.log(res);
                }
            })
        },

    },
    created(){
            let category = this.$route.query.category
            if(!category){
                this.$router.push({
                    query:{category:'all'}
                })
            }

            this.getArticle()
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum {
    max-width:1180px;
    margin:12px auto;
    position: relative;
    display:flex;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        .tabs {
            padding:15px 15px;
            background-color: #fcfcfc;
            position: relative;
            .router-link-active {
                padding:4px;
                margin:5px;
                font-size:17px;
                border-radius:3px;
                color:#104996;
                &:hover {
                    text-decoration: none;
                }
            }
            .router-link-exact-active {
                background-color: #456ea5;
                color:#fff;
                text-decoration: none;
            }
            .ctrl-bar {
                position: absolute;
                right:10px;
                top:50%;
                transform: translateY(-50%)
            }
        }
        .article-list {
                    background: @bg;
                    width:100%;
                    min-height:322px;
                    ul {}
                    li{
                        display:flex;
                        justify-content:flex-start;
                        align-items:center;
                        border-top:1px solid #f2f6f6;
                        padding:0 5px 0 1.8%;
                        font-size:16px;
                    &:hover {
                        // background:#f2f6f6;
                        background:#fcfcfc;
                    }
                    }
                    li>div,a{
                        margin:0px 0.7%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .u-photo {
                        // flex:0 0 11%;
                        margin:3px;
                        width:37px;
                        height:37px;
                        overflow:inherit;
                        position: relative;
                        box-sizing: border-box;
                        cursor:pointer;
                        &:hover {
                            .u-name {
                                display:block;
                                opacity:1;
                            }
                        }
                        img {
                            border:1px solid #ddd;
                            border-radius:3px;
                            width:100%;
                            height:100%;
                            // object-fit: cover;
                        }
                        .u-name {
                            position: absolute;
                            top: -0px;
                            left: 36px;
                            background: rgba(147, 202, 232, 0.5);
                            background: #70a9e5;
                            color: #fff;
                            padding: 0 3px;
                            border-radius: 3px;
                            // display:none;
                            opacity:0;
                            font-size:13px;
                            transition: opacity 1s;
                        }

                    }
                    .title1 {
                        flex:1;
                        text-align:left;
                        padding-right:12px;
                        // max-width:525px;
                        color:#455;
                        display:flex;
                        justify-content:flex-start;
                        align-items:center;
                        a {
                            // text-decoration: none;
                            flex:1;
                            margin:0;
                            padding:5px 0;
                        }
                        span {
                            // color:red;
                        }
                    } 
                    .title1 .category-type {
                        padding:1px 2px;
                        white-space: nowrap;
                        border-radius:3px;
                        color:#fff;
                        background: #feae4b;
                        margin-right:1px;
                        font-size:12px;
                    }
                    .last-replay.u-photo{
                        width:27px;
                        height:27px;
                        .u-name {
                            left: 29px;
                        }
                    }
                    .last-replay-date {
                        flex:0 0 16%;
                        color:#d4cfcf;
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
            .tabs {
                padding-left:5px !important;
                a {
                    margin:5px 2px !important;
                }
            }
            .ctrl-bar button {
                padding:8px 15px !important;
            }
            .article-list{
                ul {
                    li {
                        // font-size:14px;
                        .u-photo {
                            width:32px;
                            height:32px;
                        }
                        .title {
                            // height:18px;
                            // overflow: hidden;
                        }
                    }
                }
            }

        }
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }
    }
    @media screen and (max-width:525px) {
        .main-box {
            .article-list{
                ul {
                    li {
                        // font-size:13px !important;
                        .u-photo {
                            width:32px;
                            height:32px;
                        }
                        .last-replay {
                            display:none;
                        }
                        .last-replay-date {
                            font-size:13px;
                            margin:0;
                            flex:0 0 18%;
                        }
                        .author {
                            // display:none;
                        }
                    }
                }
                .title1 {
                    padding-right:0px;
                }
            }
        }
    }
}

</style>
    