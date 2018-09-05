<template>
<div class="home">
    <NavDefault></NavDefault>
    <div class="h-news">
        <div class="h-news-inner">
            <div class="wrapper">
                <!-- <img src="/static/img/si.jpg" alt=""> -->


                <!-- <el-carousel trigger="click" height="202px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="/static/img/si.jpg" alt="">
                </el-carousel-item>
                </el-carousel> -->


            <Wrapper></Wrapper>
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
                        <div class="logout">退出登录</div>
                </div>
                <div v-else style="padding-top:42px">
                    <el-button type="success" >登录XM</el-button>
                    <el-button type="info" >注册账号</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="h-main">
        <div class="section s-mbti">
            <div class="title">
                <h2><em>MBTI</em></h2>
            </div>
            <ul class="content">
                <li>什么是MBTI？</li>
                <li>有什么意义？</li>
                <li>MBTI的历史</li>
                <li>MBTI的发展</li>
            </ul>
        </div>
        <div class="section s-examp">
            <div class="title">
                <h2>名人汇</h2>
            </div>
            <ul class="content">
                    <li   v-for="(v,i) in exampleList" :key="i">
                        <router-link :to="'/example/'+v._id">
                            <img :src="$pathImgs+v.img_url" alt="">
                            <div class="name overflow-row-1" style="max-width:126px">{{v.name}}</div>
                            <div class="type">{{v.type.toUpperCase()}}</div>
                        </router-link>
                    </li>
            </ul>
        </div>
        <div class="section s-test">
            <div class="title">
                <h2>测试</h2>
            </div>
            <ul class="content">
                <li>
                    <router-link to="/">
                        人格类型测试
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        八维功能测试
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        人格类型测试
                    </router-link>
                </li>
                <li>
                    <router-link to="/">
                        八维功能测试
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="section s-forum">
            <div class="title">
                <h2>论坛</h2>
            </div>
            <ul class="content">
                <li   v-for="(v,i) in articleList" :key="i">
                    <ArticleItems :data="v"></ArticleItems>
                </li>
            </ul>
        </div>
        <div class="recommend">
            <Aside></Aside>
        </div>
        
    </div>
</div>
</template>
<script>
import NavDefault from '@/components/common/nav_main_default'
import Avatar from '@/components/common/avatar'
import Aside from '@/components/common/aside/aside'
import ArticleItems from '@/components/common/article_items'
import Wrapper from '@/components/common/wrapper'
export default {
    data(){
        return {
            loading:false,
            exampleList:[],
            articleList:[],
        }
    },
    components:{
        NavDefault,
        Avatar,
        Aside,
        ArticleItems,
        Wrapper
    },
    methods:{
        getHotExample(){
            this.loading = true;
            this.$axios.searchExample({params:{size:8,page:1}}).then(res=>{
                this.loading = false;
                if(res.data.success){
                        this.exampleList = res.data.result.example;
                        this.exampleList = this.exampleList.concat(this.exampleList)
                }else{
                }
            }).catch(res=>{
                this.loading = false;
            })
        },
        getHotArticle(){
            this.loading1 = true
            this.$axios.getArticle({
                category:'', //''即获取全部
                page:'1',
                good:'',
                size:4
            }).then(res=>{
                this.loading1 = false
                if(res.data.success){
                    this.articleList = res.data.data
                }
            }).catch(err=>{
                this.loading1 = false
            })
        },
    },
    created(){
        this.getHotExample()
        this.getHotArticle()
    }
}
</script>
<style lang="less">
.home {
    background-color: #fff;
    box-sizing: border-box;
    .h-news {
        // background-color: #d1deec;
        background-color: #f2f7fa;
    }
    .h-news-inner {
        // background-color: #ddd;
        height:202px;
        overflow: hidden;
        max-width:970px;
        margin:0 auto 16px;
        display:flex;
        .wrapper {
            flex:0 0 60%;
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
                padding-top:25px;
                a,div {
                    width:100%;
                }
                .role-name {
                    padding-top:7px;
                    
                    a { color:#555}
                    a:hover {
                        color:#111;
                    }
                }
                .logout {
                    border:1px solid #ddd;
                    color:#ccc;
                    font-size:14px;
                    margin-top:8px;
                    display:inline-block;
                    width:75px;
                    padding:1px 0;
                    border-radius:3px;
                    &:hover {
                        color:#aaa;
                        border:1px solid #ccc;
                        cursor:pointer;
                        background-color: #f8f8f8;
                    }
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
        padding-right:305px;
        max-width:970px;
        margin:0 auto;
        position: relative;
        .section {
            margin:0 auto 18px;
            position: relative;
            >.title {
                border-bottom:2px solid #c5e4de;
                height:34px;
                line-height:34px;
                h2 {
                    font-size:17px;
                    em {
                        font-size:18px
                    }
                }
            }
            ul.content {
                display:flex;
                justify-content: space-between;
                flex-wrap:wrap;
                padding-top:12px;
                li {
                    margin-bottom:12px;
                }
            }
        }
        .recommend {
            border:1px solid pink;
            position:absolute;
            right:0px;
            top:10px;
        }

        .section.s-mbti {
            ul {
                li {
                    flex:0 0 48%;
                    background-color: #eee;
                    height:86px;
                    color:#fff;
                    text-align: center;
                }
            }
        }
        .section.s-examp {
            ul.content {
                li {
                    flex:0 0 24.5%;
                    // background-color: #eee;
                    padding:5px 3px;
                    // max-width:150px;
                    &>a>div,&>a>img {
                        margin:0 auto;
                        text-align: center;
                    }
                    img {
                        display:block;
                        width:120px;
                        height:152px;
                        object-fit: cover;
                        margin-bottom:5px;
                    }
                    .name {
                        font-size:14px;
                    }
                }
                @media screen and (max-width:520px){
                    li {
                        flex:0 0 49%;
                    }
                }
            }
        }
        .section.s-test {
            ul.content {
                li {
                    flex:0 0 49%;
                    a {
                        display:block;
                        height:44px;
                        line-height:44px;
                        border-radius:5px;
                        padding-left:1.2em;
                    }


                }
                li:nth-of-type(1)>a{
                    background-color: #f39483;
                    color:#fff;
                }
                li:nth-of-type(2)>a{
                    background-color: #f3e0bf;
                    color:#bd9041;
                }
                li:nth-of-type(3)>a{
                    background-color: #c3e4de;
                    color:#5f968e;
                }
                li:nth-of-type(4)>a{
                    background-color: #b9d6eb;
                    color:#4e86a7;
                }
                @media screen and (max-width:350px){
                    li {
                        flex:0 0 100%;
                    }
                }
            }
        }
        .section.s-forum {
            ul.content {
                li {
                    flex:0 0 100%;
                    margin:0;

                }
                @media screen and (max-width:520px){
                    li {
                        // flex:0 0 49%;
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

    @media screen and (max-width:992px){
        .h-main {
            padding:0 16px;
            .recommend {
                position: relative;
                right:0px;
                top:0px;
            }
        }
    }
    @media screen and (max-width:768px){
        .h-news-inner {
            height:29vw;
            flex-wrap:wrap;
            .wrapper {
                flex:0 0 100%;
                img {
                }
            }
            .login {
                display:none;
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
        .h-main {
            .section {
                ul.content {
                    li {
                        // flex:0 0 100%;
                    }
                }
            }
        }
    }

}
</style>


