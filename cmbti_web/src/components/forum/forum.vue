<template>
<div class="forum-index" v-loading="loading">
    <div class="main-box">
        <div class="tabs">
            <router-link :to="{query:{category:'all',page:'1'}}">
                <span :class="'bu-ios-button '+($route.query.category==='all'?'active':'')">全部</span>
            </router-link>
            <router-link :to="{query:{good:'good',page:'1'}}">
                <span :class="'bu-ios-button '+($route.query.good==='good'?'active':'')">精华</span>
            </router-link>
            <router-link :to="{query:{category:'share',page:'1'}}">
                <span :class="'bu-ios-button '+($route.query.category==='share'?'active':'')">分享</span>
            </router-link>
            <router-link :to="{query:{category:'ask',page:'1'}}">
                <span :class="'bu-ios-button '+($route.query.category==='ask'?'active':'')">问答</span>
            </router-link>
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
                <li v-for="(v,i) in list" :key="i">
                        <div class="author u-photo">
                            <!-- <router-link :to="'/info/'+v.uid">
                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                            <div class="u-name">{{v.r_name}}</div>
                            </router-link> -->
                            <Avatar :src="v.avatar" :uid="v.uid" size="small" round=""></Avatar>
                        </div>
                        <div class="title1">
                            <span class="category-type" v-if="v.good">精</span>
                            <router-link :to="'/forum/'+v._id">
                            <!--<span class="txt" style="white-space: nowrap;">-->
                            <span class="txt" style="">
                                {{v.title}}
                            </span>
                            </router-link>
                        </div>
                        <!--<div class="last-replay u-photo">
                            <img src="/static/img/logo_a.png" alt="">
                            <div class="u-name">名字123</div>
                        </div>-->
                        <div class="last-replay-date">{{$moment(v.update_time ? v.update_time:v.c_time).startOf().fromNow()}} 更新</div>
                </li>
 
            </ul>

        </div>
        <!--分页-->
        <div style="text-align:center;padding:15px 0 22px;">
            <el-pagination
            background
            :current-page="currentPage"
            :page-size ="size"
            :pager-count="5"
            @current-change="changePage"
            layout="prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
        <div style="padding:18px 18px 5px;text-align:center;background:#7e90a0">
            <div :class="'bu-ios-button'+(active?' active':'')" @click="active=!active">按钮</div> &nbsp;<div :class="'bu-ios-button'">按钮</div>
        </div>
        <div style="padding:18px 18px 22px;text-align:center;background:#7e90a0">
            <div class="bu-ios-button active">按钮</div>
            <br>
            <br>
            <Switch111></Switch111>
        </div>

        <div>单选： 
            <input type="radio" id="radio-2-1" name="radio-2-set" class="regular-radio big-radio" />
        </div>
    </div>
</div> 
</template>
<script>
import Switch111 from  '../common/switch'
export default {
    data(){
        return {
            active:false,
            list:'',
            total:0,
            size:12,
            currentPage:0,
            loading:false
        }
    },
    components:{Switch111},
    watch:{
        "$route.query":function(){
            this.getArticle({
                category:this.$route.query.category || '',
                page:this.$route.query.page || '1',
                good:this.$route.query.good || ''
            })
        }
    },
    methods:{
        // 获取文章 options {keyword:'',category:'ask',likes:'Number',good:boolean}
        getArticle(options){
            this.loading = true
            this.$axios.getArticle(Object.assign({
                size:this.size
            },options)).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.list = res.data.data
                    this.total = res.data.total
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        changePage(p){
            this.currentPage = p
            let q = JSON.parse(JSON.stringify(this.$route.query))
            q.page = p
            this.$router.push({query:q} )
            // console.log(val);
        },
        init(){
            let query = this.$route.query;
            if(!query.category || !query.page){
                // this.$router.push({
                //     query:{
                //         category:'all',
                //         page:'1'
                //     }
                // })
            }
            this.getArticle({
                category:this.$route.query.category,
                page:this.$route.query.page
            })
            this.currentPage = query.page?Number(query.page):1
        }

    },
    created(){
            // let category = this.$route.query.category
            // if(!category){
            //     this.$router.push({
            //         query:{category:'all'}
            //     })
            // }

            this.init()
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum-index {
    max-width:997px;
    margin:0px auto;
    position: relative;
    display:flex;
    border-radius:4px 4px 0 0;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        .tabs {
            padding:12px 15px;
            background-color: #778b9d;
            position: relative;
            &>a>span {
                // display:inline-block;
                // width:47px;
                // height:25px;
                // margin-right:10px;
                // font-size:17px;
                // border-radius:3px;
                // color:#104996;
                // text-align:center;
                // line-height: 25px;
                &:hover {
                    text-decoration: none;
                }
            }
            &>a>span.active {
                // background-color: #456ea5;
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
                    min-height:420px;
                    ul {}
                    li{
                        display:flex;
                        justify-content:flex-start;
                        align-items:center;
                        border-bottom:1px solid #f2f6f6;
                        padding:5px 5px 5px 1.8%;
                        font-size:16px;
                        position: relative;
                    &:hover {
                        // background:#f2f6f6;
                        background:#fcfcfc;
                    }
                    }
                    li>div,a{
                        margin:0px 0.7%;
                        // overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
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
                        font-size:14px;
                        flex:0 0 16%;
                        color:#d4cfcf;
                    }
                
        }
    }
    a:hover {
        text-decoration:underline;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {
            .tabs {
                padding-left:5px !important;
                &>a>span {
                    margin-right:2px !important;
                }
            }
            .ctrl-bar button {
                padding:8px 15px !important;
            }
            .article-list{
                ul {
                    li {
                    }
                }
            }

        }
    }
    @media screen and (max-width:525px) {
        .main-box {
            .article-list{
                ul {
                    li {
                        // font-size:13px !important;
                        padding-bottom:15px;
                        .u-photo {
                            // width:32px;
                            // height:32px;
                            position: relative;
                            top:8px;
                        }
                        .last-replay {
                            display:none;
                        }
                        .last-replay-date {
                            // font-size:12px;
                            // margin:0;
                            // flex:0 0 22%;
                            position: absolute;
                            left:55px;
                            bottom:3px;
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
    