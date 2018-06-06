<template>
<div class="my-home">
    <div class="main-box">
        <div class="m-header">
            <div class="photo">
                <img src="/static/img/logo_a.png" alt="">
            </div>
            <div class="edit-photo">
                <button>上传封面照片</button>
            </div>
            <div class="edit-info">
                <button>编辑个人资料</button>
            </div>
            <div class="m-info">
                <div><span  class="r-name">密南</span> <span  class="sex"></span></div>
                <div style="line-height:18px;height:36px;overflow:hidden">质量管理/汽车制造/爬山&骑行爱好者</div>
            </div>
        </div>
        <div class="m-body">
            <!--<div class="m-tab">
                <div @click="tabIndex='1'" :class="tabIndex==='1'?'active':''">档案</div>
                <div @click="tabIndex='2'" :class="tabIndex==='2'?'active':''">标记</div>
                <div @click="tabIndex='3'" :class="tabIndex==='3'?'active':''">关注</div>
                <div @click="tabIndex='4'" :class="tabIndex==='4'?'active':''">发表</div>
                <div @click="tabIndex='5'" :class="tabIndex==='5'?'active':''">评论</div>
                <div @click="tabIndex='5'" :class="tabIndex==='5'?'active':''">评论</div>
            </div>-->
            <div class="m-tab-b">
                <div>
                    <router-link to="">
                        个人档案
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        我关注
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        关注我
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        标记
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        测试
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        发表
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        评论
                    </router-link>
                </div>
                <div>
                    <router-link to="">
                        消息
                    </router-link>
                </div>
            </div>
            <div class="m-content">
                <!--<router-view></router-view>-->
                <!--<div v-if="tabIndex==='1'">
                    档案
                </div>
                <div v-if="tabIndex==='2'">
                    喜欢
                </div>
                <div v-if="tabIndex==='3'">
                    关注
                </div>-->
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
    data(){
        return {
            tabIndex:'2'
        }
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    components:{

    },
    created(){
    },
    
};
</script>
<style lang="less">
.my-home {
    max-width:1100px;
    margin:12px auto;
    position: relative;
    display:flex;
    .main-box {
        flex:1;
        margin-bottom:12px;
        width:100%;
        .m-header {
            height:170px;
            padding-top:85px;
            background:url('/static/img/my_bg.jpg') no-repeat;
            background-size:cover;
            position: relative;
            margin-bottom:8px;
            .photo {
                width:115px;
                height:115px;
                position: absolute;
                bottom:15px;
                left:25px;
                background-color: #ccc;
                border:1px solid #aaa;
                box-shadow: 0 0 12px #70a9e5 inset;
                border-radius:2px;
                img {
                    width:100%;
                    height:100%;
                }
            }
            .edit-info,.edit-photo {
                position: absolute;
                right:2%;
                top:98px;
            }
            .edit-photo {
                top:20px;
            }
            .m-info {
                background: rgba(255,255,255,.8);
                height:100%;
                padding-left:152px;
                padding-top:18px;
                span.r-name {
                    font-size:15px;
                    font-weight:700;
                    margin-bottom:5px;
                }
                span.sex {
                    color:#555;
                    font-size:14px;
                    padding-left:15px;
                }
            }
        }
        .m-body {
            min-height:300px;
            width:100%;
            background-color: rgba(255,255,255,.8);
            .m-tab {
                display:flex;
                padding:0 5px;
                background-color: #f9f9f9;
                &>div {
                    flex:1;
                    text-align:center;
                    padding:10px 0;
                    border-bottom:1px solid #f5f5f5;
                    border-top:1px solid #efefef;
                    cursor:pointer;
                    background-color: #f9f9f9;
                    max-width:100px;
                    &:hover {
                        border-bottom:1px solid #cbdff5;
                        font-weight:700;
                    }
                }
                &>div.active {
                    font-weight:700;
                    border-bottom:2px solid #70a9e5;
                }
            }
            .m-tab-b {
                a {
                    display:block;
                    padding:5px  0;
                    border-bottom:1px solid #f7f7f7;
                    &:visited {
                        text-decoration: none;
                    }
                    &:link {
                        text-decoration: none;
                    }
                }

            }
            .m-content {
                padding:12px;
                
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
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }
    }
    @media screen and (max-width:500px){
        .main-box {
            .m-header {
                .photo {
                    width:85px;
                    height:85px;
                    left:10px;
                    img {
                    }
                }
                .edit-info {
                    top:90px;
                }
                .edit-photo {
                    top:15px;
                }
                .m-info {
                    padding-left:105px;
                    span.r-name {
                    }
                    span.sex {
                    }
                }
            }
            .m-body {
                .m-tab {
                    &>div {
                        padding:7px 0;
                    }
                }
            }
        }
    }
}

</style>
    