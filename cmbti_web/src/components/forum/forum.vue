<template>
<div class="forum">
     <!--forum 交流区-->
     <div class="left-box">
         <div class="ctrl-bar">
             <button class="clean-gray">分享</button>
             <button class="clean-gray">提问</button>
             <!--button.clean-gray-->
         </div>
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
        </div>
        <div class="article-list">
            <ul>
                <li v-for="(v,i) in 5">
                        <div class="author u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                            <div class="u-name">名字123</div>
                        </div>
                        <div class="title1">
                            <span class="type">精华</span>
                            <router-link :to="'/forum/'+123">
                            <span class="txt">
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
     <div class="right-box">
         右88
     </div>
</div> 
</template>
<script>
export default {
    methods:{
        init(){

        }

    },
    created(){
            let category = this.$route.query.category
            if(!category){
                this.$router.push({
                    query:{category:'all'}
                })
            }
    }
    
};
</script>
<style lang="less" socped>
@bg:rgba(255,255,255,.75);
.forum {
    max-width:1050px;
    margin:8px auto;
    display:flex;
    .left-box {
        flex:1;
        width:100%;
        .ctrl-bar {
            height:42px;
            background-color: rgba(255,255,255,.5);
            margin-bottom:3px;
            text-align: right;
            line-height: 42px;
            // border:1px solid rgba(255,255,255,.5);
        }
        .tabs {
            padding:10px;
            background-color: #c8ddf5;;
            .router-link-active {
                padding:3px;
                margin:5px;
                font-size:15px;
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
                    font-size:15px;
                    &:hover {
                        background:#f2f6f6;
                    }
                    }
                    li>div,a{
                        margin:4px 0.7%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .u-photo {
                        // flex:0 0 11%;
                        width:37px;
                        height:37px;
                        overflow:inherit;
                        position: relative;
                        box-sizing: border-box;
                        cursor:pointer;
                        &:hover {
                            .u-name {
                                display:block;
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
                            top: -3px;
                            left: 36px;
                            background: rgba(147, 202, 232, 0.5);
                            color: #1d5aad;
                            padding: 0 3px;
                            border-radius: 3px;
                            display:none;
                        }

                    }
                    .title1 {
                        flex:1;
                        text-align:left;
                        padding-right:12px;
                        // max-width:500px;
                        color:#455;
                        display:flex;
                        justify-content:flex-start;
                        align-items:center;
                        a {
                            // text-decoration: none;
                            margin:0;
                            padding:5px 0;
                        }
                        span {
                            // color:red;
                        }
                    } 
                    .title1 .type {
                        padding:2px 3px 1px;
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
                            left: 25px;
                        }
                    }
                    .last-replay-date {
                        flex:0 0 16%;
                        color:#d4cfcf;
                    }
                
        }
    }
    .right-box {
        background-color: #ddd;
        flex:0 0 25%;
    }

    @media screen and (max-width:768px) {
        .left-box {
            .article-list{
                ul {
                    li {
                        font-size:14px;
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
        .right-box {
            display:none;
        }
    }
    @media screen and (max-width:450px) {
        .left-box {
            .article-list{
                ul {
                    li {
                        font-size:13px !important;
                        .last-replay {
                            display:none;
                        }
                        .last-replay-date {
                            // font-size:12px;
                        }
                        .author {
                            // display:none;
                        }
                    }
                }
            }
        }
        .right-box {
            display:none;
        }
    }
    @media screen and (max-width:370px) {
        .left-box {
            .article-list{
                ul {
                    li {
                        font-size:13px !important;
                        .u-photo {
                            width:28px;
                            height:28px;
                        }
                        .last-replay {
                            display:none;
                        }
                        .last-replay-date {
                            // font-size:12px;
                            margin:0;
                            flex:0 0 18%;
                        }
                        .author {
                            // display:none;
                        }
                    }
                }
            }
        }
        .right-box {
            display:none;
        }
    }



}

</style>
    