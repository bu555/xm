<template>
<div class="forum-item">
     <div class="left-box">
         <div class="article">
            <div class="a-header">
                <div class="title">
                    <div class="type">精华</div>
                    <div class="">
                        <h1>分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩
                        </h1>
                        <h2 class="">发布于2个月前  作者 ie7 14567次浏览 来自 分享</h2>

                    </div>
                </div>
            </div>
            <div class="a-body">分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩。分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有兴趣的可以玩玩分享推荐一个自己发现的一个VPS，有 </div>
         </div>
         <div class="comment">
             <div class="c-header" >
                 100 回复
             </div>
             <div class="c-body">
                <div class="c-list" v-for="(v,i) in 4">
                    <div class="photo">
                        <img src="/static/img/logo_a.png" alt="">
                    </div>
                    <div class="c-name">宋江001
                        <span>12天前</span> 
                    </div>
                    <div class="c-content">搭建 VPN 的话推荐 shadowsocks 这神奇，google 下会有很多搭建方法的教程。然后，使用和设置方法可以看（里面也提供了线路的订购） http://klead.de/docs/guide/index.html</div>
                    <div class="c-ctrl">
                        <span class="zan">↑↑</span><em>27</em>
                    </div>
                </div>
             </div>

         </div>
     </div>
     <div class="right-box">
         右88
        <button class="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js!">
            Copy to clipboard
        </button>
     </div>
</div> 
</template>
<script>
import Clipboard from 'clipboard';
export default {
    methods:{
        init(){

        }

    },
    mounted(){
        const clipboard = new Clipboard('.btn');
    },
    created(){
    }
    
};
</script>
<style lang="less" socped>
.forum-item {
    max-width:1050px;
    margin:8px auto;
    display:flex;
    .left-box {
        
        flex:1;
        width:100%;
        .article {
            background-color: rgba(255,255,255,.75);
            margin-bottom:1%;
            box-shadow: -1px 0 7px #555;
        }
        .a-header {
            border-bottom:1px solid #e5e5e5;
            .title {
                display: flex;
                padding:4% 4.5% 1.5% 4%;
                min-height:75px;
                .type {
                    padding:2px 5px;
                    font-size:13px;
                    white-space: nowrap;
                    border-radius:3px;
                    color:#fff;
                    background: #feae4b;
                    height:20px;
                    margin-right:1%;
                    margin-top:-1px;
                }
                h1 {
                    font-size:18px;
                    // font-weight:700;
                    margin:0;padding:0;
                }
                h2 {
                    font-size:14px;
                    margin:0;padding:0;
                    margin-top:2.2%;
                    color:#838383;
                }
            }
        }
        .a-body {
            padding:3% 4.5% 5% 4%;
            font-size:16px;
        }
        .comment {
            background-color: rgba(255,255,255,.75);
            font-size:15px;
            .c-header {
                height:40px;
                line-height: 40px;
                border-bottom:1px solid #eee;
                background-color: #c8ddf5;;
                padding-left:4%;
                color:#fff;
            }
            .c-body {
                padding:2% 4.5% 3% 4%;
                .c-list {
                    // background: pink;
                    min-height:60px;
                    padding:8px 0px 10px 50px;
                    border-bottom:1px solid #eee;
                    position: relative;
                    color:#3c3c3c;
                    .photo {
                        width:37px;
                        height:37px;
                        border:1px solid #eee;
                        position: absolute;
                        top:10px;
                        left:0px;
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

        }
        .right-box {
            display:none;
            // flex:0 0 0;
        }
    }
    @media screen and (max-width:450px) {
        .left-box {
            .a-header {
                .title {
                    padding:4% 2.5%;
                    h1 {
                        font-size:17px;
                    }
                }
            }
            .a-body {
                padding:3% 2.5% 5% 4.5%;
            }
            .comment {
                // padding:2% 2.5% 2% 3%;
                padding:2% 0 2% 0;
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
        .right-box {
            display:none;
            // flex:0 0 0;
        }
    }

}

</style>
    