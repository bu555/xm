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
            <ul>
                <!--<li v-for="(v,i) in 5">-->
                <li>
                    <div class="l">
                        <div class="author">
                            <div>名字123</div>
                        </div>
                        <!--<div class="data">54/1000</div>-->
                        <!--<div class="type">置顶</div>-->
                        <div class="type">
                            <div>精华</div>
                        </div>
                        <div class="title">
                            <div>文章标题文文章标题文文章</div>
                            
                        </div>
                    </div>
                    <div class="r">
                        <div class="last-replay">
                            <div>A001000kkk</div>
                        </div>
                        <div class="last-replay-date">
                            <div>1天前</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="l">
                        <div class="author">
                            <div>名字123</div>
                        </div>
                        <!--<div class="data">54/1000</div>-->
                        <!--<div class="type">置顶</div>-->
                        <div class="type">
                            <div>精华</div>
                        </div>
                        <div class="title">
                            <div>文章标题文文章DDDDDD标题文文章</div>
                            
                        </div>
                    </div>
                    <div class="r">
                        <div class="last-replay">
                            <div>A001000kkk</div>
                        </div>
                        <div class="last-replay-date">
                            <div>1天前</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="l">
                        <div class="author">
                            <div>名字12345</div>
                        </div>
                        <!--<div class="data">54/1000</div>-->
                        <!--<div class="type">置顶</div>-->
                        <div class="type">
                            <div>精华</div>
                        </div>
                        <div class="title">
                            <div>文章标题文文DDD章标题文文章</div>
                            
                        </div>
                    </div>
                    <div class="r">
                        <div class="last-replay">
                            <div>A001000kkk</div>
                        </div>
                        <div class="last-replay-date">
                            <div>1天前</div>
                        </div>
                    </div>
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
        flex:0 0 75%;
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
            ul{
                li{
                    display:flex;
                    justify-content:space-between;
                    // background: #eee;
                    border-top:1px solid #f2f6f6;
                    padding:0 5px;
                    &>.l{
                        display:flex;
                        flex:0 0 78%;
                        .author {
                            flex:0 0 12%;
                            &>div {
                                white-space: nowrap;
                            }
                        }
                        .type {
                            // flex:0 0 12%;
                            &>div{
                                padding:0 3px;
                                white-space: nowrap;
                                border-radius:3px;
                                color:#fff;
                                // background: #598dd3;
                                background: #feae4b;
                            }
                        }
                        .title {
                            flex:1 0 50%;
                            &>div {
                                width:100%;
                                overflow: hidden;
                                // text-overflow:ellipsis;
                                // white-space: nowrap;
                            }
                        }
                        &>div {
                            margin:8px 3px;
                            // white-space: nowrap;
                        }
                        background-color: #eee;
                    }
                    &>.r{
                        background-color: lime;
                        display:flex;
                        flex:1;
                        .last-replay {

                        }
                        .last-replay-date {
                            flex:1;
                            white-space: nowrap;
                            text-align:right;
                        }
                        &>div {
                            margin:8px 3px;
                            // white-space: nowrap;
                        }
                    }
                    &>div{
                        // &>div {
                        //     margin:8px 3px;
                        //     // white-space: nowrap;
                        //     overflow: hidden;
                        //     text-overflow:ellipsis;
                        //     white-space: nowrap;
                        // }
                        // .title,.last-replay,.author {
                        // }
                        // .title {
                        //     // flex:1;
                        // }
                        // .type {
                        //     min-width:22px;
                        //     max-width:42px;
                        //     padding:0 3px;
                        //     border-radius:3px;
                        //     color:#fff;
                        //     // background: #598dd3;
                        //     background: #feae4b;
                        // }
                        // .author {
                        //     width:50px;
                        // }
                        
                    }
                }
            }
        }
    }
    .right-box {
        background-color: #ddd;
        flex:0 0 25%;
    }

    @media screen and (max-width:768px) {
        .left-box {
            // background-color: rgba(255,255,255,.75);
            flex:0 0 100% !important;
            // .tabs {
            //     padding:10px;
            //     background-color: #f6f6f6;
            //     .router-link-active {
            //         margin:1%;
            //     }
            // }
            .article-list{
                ul {
                    li {
                        font-size:13px;
                        .title {
                            height:18px;
                            overflow: hidden;
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
            // background-color: rgba(255,255,255,.75);
            // flex:0 0 100% !important;
            // .tabs {
            //     padding:10px;
            //     background-color: #f6f6f6;
            //     .router-link-active {
            //         margin:1%;
            //     }
            // }
            .article-list{
                ul {
                    li {
                        .last-replay {
                            display:none;
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
    