<template>
<div class="home">
    <NavDefault></NavDefault>
    <div class="h-news">
        <div class="h-news-inner">
            <div class="wrapper">
                <img src="/static/img/si.jpg" alt="">
            </div>
            <div class="login">
                <div v-if="$store.state.userInfo" class="is-login">
                        <!-- <img class="avatar" :src="$store.state.userInfo.avatar?$pathAvatar+$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt=""> -->
                        <router-link to="/my" class="a">
                        <Avatar :src="$store.state.userInfo.avatar" :uid="''" size="" round="true"></Avatar>
                        </router-link>
                        <div class="role-name overflow-row-1">
                            <router-link to="/my" class="a">
                                {{$store.state.userInfo.r_name}}
                            </router-link>
                        </div>
                        <!-- <ul>
                            <li>收藏(5)</li>
                            <li>收藏(5)</li>
                        </ul> -->
                </div>
                <div v-else style="padding-top:42px">
                    <el-button type="success" >登录XM</el-button>
                    <el-button type="info" >注册账号</el-button>
                </div>
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
import NavDefault from '@/components/common/nav_main_default'
import Avatar from '@/components/common/avatar'
export default {
    components:{
        NavDefault,
        Avatar
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
        display:flex;
        .wrapper {
            flex:0 0 60%;
            img {
                display: block;
                width:100%;
                height:auto;
                // object-fit: contain;
            }
        }
        .login {
            flex:0 0 40%;
            &>div {
                display:flex;
                flex-wrap:wrap;
                justify-content:center;
            }
            .is-login {
                width: 150px;
                text-align: center;
                margin:0 auto;
                padding-top:22px;
                .role-name {
                    padding-top:7px;
                }
            }
            button {
                width:100%;
                height:40px;
                max-width:232px;;
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

    @media screen and (max-width:500px){
        .h-news-inner {
            flex-wrap:wrap;
            .wrapper {
                flex:0 0 100%;
                img {
                }
            }
            .login {
                display:none
                &>div {
                }
                .is-login {
                }
                .role-name {
                }
                button {
                }
            }

        }
    }

}
</style>


