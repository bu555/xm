<template>
<div class="home">
    <Nav></Nav>
    <div class="h-news">
        <div class="h-news-inner">
            <div class="wrapper">
                <img src="/static/img/si.jpg" alt="">
            </div>
            <div class="login">
                <el-button type="success" >登录XM</el-button>
                <el-button type="info" >注册账号</el-button>
            </div>
        </div>
    </div>
    <div class="h-main">
        <div class="section" v-for="(v,i) in 3">
            <div class="title">
                <h2>名人库</h2>
            </div>
            <ul class="content">
                <li   v-for="(v,i) in 8">
                    <div class="examp">
                        <div class="photo"></div>
                        <div class="name">Elon musk</div>
                        <div class="type">INTJ</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <ul class="h-tab">
                <li>
                    <router-link to="/">MBTI理论</router-link></li>
                <li>
                    <router-link to="/personalities">人格类型</router-link></li>
                <li>
                    <router-link to="/functions">认知功能</router-link></li>
        </ul>
        <router-view></router-view> -->
        
    </div>
</div>
</template>
<script>
import Nav from '@/components/common/nav'
export default {
    components:{
        Nav
    }
}
</script>
<style lang="less">
.home {
    background-color: #fff;
    .h-news {
        background-color: #d1deec;
    }
    .h-news-inner {
        background-color: #ddd;
        height:202px;
        overflow: hidden;
        max-width:970px;
        margin:0 auto;
        padding-right:290px;
        position: relative;
        .wrapper {
            img {
                display: block;
                // width:100%;
                height:100%;
                width:auto;
                object-fit: contain;
            }
        }
        .login {
            width:280px;
            position:absolute;
            right:0px;
            top:10px;
            padding:28px 55px 0 0px;
            button {
                width:100%;
                margin:5px 0 ;
            }
        }

    }
    .h-main {
        .section {
            max-width:970px;
            margin:0 auto;
            padding:1.5em 0;
            padding-left:155px;
            position: relative;
            .title {
                position: absolute;
                left:0px;
                top:1.5em;
            }
            ul.content {
                display:flex;
                flex-wrap:wrap;
                li {
                    flex:0 0 24.5%;
                    min-height:120px;
                    padding:1em;
                }
                .examp {
                    margin:0 auto;
                    max-width:140px;
                    text-align: center;
                    background-color: #eee;
                    
                    .photo {
                        width:100%;
                        max-width:140px;
                        height:120px;
                        background-color: #f6f6f6;;
                        margin:0 auto;
                    }
                }
            }
        }
    }

    // .h-main {
    //     max-width:800px;
    //     margin:0 auto;
    //     padding:3%;
    //     // background-color: #eee;
    //     // padding-right:290px;
    //     ul.h-tab {
    //         display:flex;
    //         padding:1em 0;
    //         li {
    //             padding:0 1em;
    //             border-right:1px solid #eee;
    //             text-align: center;
    //         }
    //     }
    // }

    // @media screen and (max-width:500px){
    //     .h-main {
    //         ul.h-tab li {
    //             padding:0 ;
    //             flex:1;
    //         }
    //     }
    // }

}
</style>


