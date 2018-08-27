<template>
<div class="forum">
    <NavMain></NavMain>

    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <NavSub :data="data" :search="setSearch" @searchVal="currentSearch" @submit="searchSubmit()" placeholder="输入内容搜索"></NavSub>
    <div class="forum-index" v-loading="loading">
        <div class="main-box">

            <ArticleItems v-for="(v,i) in list" :key="i" :data="v"></ArticleItems>
            <!-- 推荐的内容 -->
            <div class="recommend"  v-if=" (list instanceof Array) && list.length>0">
                <router-link to="/forum/article/new"  style="margin:11px 0;display:block">
                    <button class="bu-button bu-black">发帖</button>
                </router-link>
                <h2>你可能喜欢</h2>
                <ul>
                    <li v-for="(v,i) in list" :key="i">
                        <router-link :to="'/forum/'+v._id"><i class="el-icon-document"></i> {{v.title}}</router-link>
                    </li>
                </ul>
            </div>
            <p v-if=" (list instanceof Array) && list.length===0" class="if-data-empty">暂无数据("▔□▔)</p>
            <!--分页-->
            <div style="text-align:center;padding:15px 0 22px;" v-else>
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
        </div>
    </div>     
</div>
</template>
<script>
import Switch111 from  '../common/switch'
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
import ArticleItems from '@/components/common/article_items'
export default {
    data(){
        return {
            active:false,
            list:'',
            total:0,
            size:12,
            currentPage:0,
            loading:false,    
            setSearch:'', 
            search:''  ,     
            data:{
                title:'M论坛',
                list:[
                    {
                        value:'全部',
                        link:'/forum?category=all&page=1'
                    },
                    {
                        value:'精华',
                        link:'/forum?good=good&page=1'
                    },
                    {
                        value:'分享',
                        link:'/forum?category=share&page=1'
                    },
                    {
                        value:'问答',
                        link:'/forum?category=ask&page=1'
                    },
                ]
            }

        }
    },
    components:{
        Switch111,
        NavMain,
        NavSub,
        ArticleItems
    },
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
        searchSubmit(){
            console.log('点击搜索');
        },
        currentSearch(val){
            this.search = val
            // if(!this.searchName && !this.$route.query.type){
            //     this.$router.push({query:{type:'all'}})
            // }
        },
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

            this.init()
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum-index {
    max-width:970px;
    margin:25px auto;
    position: relative;
    display:flex;
    border-radius:4px 4px 0 0;
    padding-right:355px;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        min-height:370px;
        // 右侧推荐区
        .recommend {
            width:300px;
            // border:1px solid #f7f7f7;
            position:absolute;
            right:12px;
            top:0;
            padding:0 12px 12px;
            h2 {
                font-size:15px;
                margin-bottom:6px;
                padding-bottom:4px;
                color:#0e959d;
                // font-weight:600;
                border-bottom:1px solid #f1f1f1;
            }
            ul{
                li {
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    overflow:hidden;
                    margin-bottom:3px;
                    a {
                        color:#b4b4b4;
                        font-size:14px;
                        &:hover {
                            color:#0e959d;
                        }
                        i {
                            color:#0e959d;

                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 12px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:250px;
        .main-box {
            .recommend {
                width:235px;
                h2 {
                }
                ul{
                    li {
                        a {
                            &:hover {
                            }
                            i {

                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width:600px) {
        padding-right:0px;
        .main-box {
            .recommend {
                display:none;
            }
        }
    }
}

</style>
    