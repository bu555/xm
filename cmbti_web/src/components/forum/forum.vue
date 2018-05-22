<template>
<div class="forum">
     <!--forum 交流区-->
     <div class="left-box">
        <div class="tabs">
            <router-link :to="{query:{type:'all'}}">
                全部
            </router-link>
            <router-link :to="{query:{type:'good'}}">
                精华
            </router-link>
            <router-link :to="{query:{type:'share'}}">
                分享
            </router-link>
            <router-link :to="{query:{type:'ask'}}">
                问答
            </router-link>
        </div>
        <div class="article-list">
                <!--<li v-for="(v,i) in 5">-->
            <ul>
                <li>
                        <div class="author u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                            <div class="u-name">名字123</div>
                        </div>
                        <div class="title1"><span class="type">精华</span><span class="txt">文章标题UUUUUUUUUUUUU章标题文文章标题文文章章标题文文章标题文文章UUUUUUUU文文章标题文文章</span></div>
                        <div class="last-replay u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                        </div>
                        <div class="last-replay-date">14小时前</div>
                </li>
                <li>
                        <div class="author u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                        </div>
                        <div class="title1"><span class="type">精华</span><span class="txt">文章标题UUUUUUUUUUUUU章标题文文章标题文文章章标题文文章标题文文章UUUUUUUU文文章标题文文章</span></div>
                        <div class="last-replay u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                        </div>
                        <div class="last-replay-date">14小时前</div>
                </li>
                <li>
                        <div class="author u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                        </div>
                        <div class="title1"><span class="type">精华</span><span class="txt">文章标题UUUUUUUUUUUUU章标题文文章标题文文章章标题文文章标题文文章UUUUUUUU文文章标题文文章</span></div>
                        <div class="last-replay u-photo">
                            <img src="/static/img/logo_a.png" alt="">
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
            let type = this.$route.query.type
            if(!type){
                this.$router.push({
                    query:{type:'all'}
                })
            }
    }
    
};
</script>
<style lang="less" socped>
.forum {
    max-width:1050px;
    margin:8px auto;
    display:flex;
    .left-box {
        background-color: rgba(255,255,255,.75);
        flex:1;
        width:100%;
        .tabs {
            padding:10px;
            background-color: #f2f6f6;
            .router-link-active {
                padding:3px;
                margin:5px;
                font-size:15px;
                border-radius:3px;
                color:#456ea5;
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
                    width:100%;
                    ul {}
                    li{
                    display:flex;
                    justify-content:flex-start;
                    align-items:center;
                    border-top:1px solid #f2f6f6;
                    padding:0 5px 0 1.8%;
                    &:hover {
                        background:#f2f6f6;
                        cursor:pointer;
                    }
                    }
                    li>div {
                        margin:4px 1%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .u-photo {
                        // flex:0 0 11%;
                        width:34px;
                        height:34px;
                        overflow: hidden;
                        border:1px solid #ddd;
                        border-radius:3px;
                        position: relative;
                        img {
                            width:100%;
                            height:auto;
                            // object-fit: cover;
                        }
                        .u-name {
                            position: absolute;
                            top:0px;
                            left:10px;
                        }

                    }
                    .title1 {
                        flex:1;
                        text-align:left;
                        padding-right:12px;
                        max-width:500px;
                    } 
                    .title1 .type {
                        padding:1px 3px;
                        white-space: nowrap;
                        border-radius:3px;
                        color:#fff;
                        background: #feae4b;
                        margin-right:1%;
                        font-size:12px;
                    }
                    .last-replay.u-photo{
                        width:27px;
                        height:27px;

                    }
                    .last-replay-date {
                        flex:0 0 15%;
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
                        font-size:13px;
                        .title {
                            // height:18px;
                            // overflow: hidden;
                        }
                    }
                }
            }
        }
        .right-box {
            flex:0 0 0;
        }
    }
    @media screen and (max-width:450px) {
        .left-box {
            .article-list{
                ul {
                    li {
                        .last-replay {
                            display:none;
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
    