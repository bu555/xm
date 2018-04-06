<template>
<div class="example ">
    <div class="my-tab  container-fluid">
        <div class="bx clearfix">
            <div class="col-md-4">
                <div class="input-group">
                <input v-model="searchName" type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                    <button @click="getExamp(searchName,'')" class="btn btn-default" type="button">Go!</button>
                </span>
                </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
            <!--types导航-->
            <div class="types-box">
                <div class="types-box1">
                    <router-link to="/example?type=all">
                    <div class="all">全</br>部</div>
                    </router-link>
                </div>
                <div class="types-box2">
                        <div v-for="(v,i) in types" :key="i">
                            <router-link :to="'/example?type='+v.type">
                            <div class="type" :style="'background:'+v.color">{{v.type.toUpperCase()}}</div>
                            </router-link>
                        </div>
                </div>
            </div><!--types导航-->
        </div>
    </div>
    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <div class="bx">
        <div class="row">
        <div class="example-list"> 
                <!--无数据--><!--无数据-->
                <div v-if="(exampleList.length===0)" style="padding-top:70px;text-align:center;width:100%">
                    <p>暂无数据哦("▔□▔)</p>
                    <div v-if="$route.query.search">
                        点击<button class="cupid-green" style="margin:20px 2px;width:50px" @click="addExample($route.query.search)">添加</button>{{$route.query.search}}到名人库
                    </div>
                </div>
                <!--有数据-->
                <div  class="item"  v-for="(v,i) in exampleList" :key="i">
                    <router-link :to="{path:'/example/details',query:{eid:v._id}}">
                    <div class="item-box">
                        <div class="type">{{v.type.toUpperCase()}}</div>
                        <div class="photo">
                            <img :src="v.img_url" alt="">
                            <div class="info">
                                {{v.voteLog.length}}人参与
                            </div>
                            <!--投票提示-->
                            <div v-if="v.type==='****'" class="redirect-flag  ech-shake-time" data-class="ec-rotate-in">
                                <span>投个票去！</span><i class="icon iconfont icon-new"></i>
                                
                            </div>
                        </div>
                        <div class="name">{{v.name==='王石'?'奥斯特路夫斯基芭芭':v.name}}</div>
                        <!--左上角new标-->
                        <!--<div  v-if="v.type==='****'" class="new-flag" data-class="ec-rotate-in"><i class="icon iconfont icon-iconfontzhizuobiaozhun023113"></i></div>-->
                        <i v-if="v.type==='****'" class="new-flag icon iconfont icon-iconfontzhizuobiaozhun023113"></i>
                    </div>
                    </router-link>
                </div>
        </div>
        <div class="r-side col-xs-0 col-sm-0 col-md-3 col-lg-3">

        </div>
        </div>
    </div>
    <!--<div class="tab-nav">
        <div class="nav-view">
            <div class="search-box">
                <el-input placeholder="输入名字" v-model="searchName" class="input-with-select" @change="getExamp(searchName)">
                    <el-button slot="append" icon="el-icon-search" @click="getExamp(searchName)"></el-button>
                </el-input>
            </div>
        </div>
    </div>
    <myTab :tabs="tabs"></myTab>-->
    <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
</div> 
</template>
<script>
import myTab from '../common/tab'
export default {
    data(){
        return{
            exampleList:[],
            detailsData:{}, //
            showDetails:false,
            searchName:'',
            // tab导航条内容
            types:[
                {
                    type:'entp',
                    title:'ENTP',
                    color:'#008cd0'
                },
                {
                    type:'intp',
                    title:'INTP',
                    color:'#008cd0'
                },
                {
                    type:'entj',
                    title:'ENTJ',
                    color:'#008cd0'
                },
                {
                    type:'intj',
                    title:'INTJ',
                    color:'#008cd0'
                },
                {
                    type:'enfp',
                    title:'ENFP',
                    color:'#149d30'
                },
                {
                    type:'infp',
                    title:'INFP',
                    color:'#149d30'
                },
                {
                    type:'enfj',
                    title:'ENFJ',
                    color:'#149d30'
                },
                {
                    type:'infj',
                    title:'INFJ',
                    color:'#149d30'
                },

                {
                    type:'estj',
                    title:'ESTJ',
                    color:'#ffbb34'
                },
                {
                    type:'istj',
                    title:'ISTJ',
                    color:'#ffbb34'
                },
                {
                    type:'esfj',
                    title:'ESFJ',
                    color:'#ffbb34'
                },
                {
                    type:'isfj',
                    title:'ISFJ',
                    color:'#ffbb34'
                },
                {
                    type:'estp',
                    title:'ESTP',
                    color:'#ff2414'
                },
                {
                    type:'istp',
                    title:'ISTP',
                    color:'#ff2414'
                },
                {
                    type:'esfp',
                    title:'ESFP',
                    color:'#ff2414'
                },
                {
                    type:'isfp',
                    title:'ISFP',
                    color:'#ff2414'
                }
            ],
            currentType:'',
        }
    },
    methods:{
        getExamp(name,type){
            //模糊搜索原则：优先name查询
            if(name){ //搜索框输入
                this.$router.push({
                    query:{
                        type:'all',
                        search:name
                    }
                })
            }
            this.$axios.searchExample({
                name:name || '',
                type:name || (type || '')
            }).then(res=>{
                if(res.data.success){
                    console.log(res.data);
                    this.exampleList = res.data.example;
                    let data = {
                        data:res.data.example,
                        createTime:Date.now()  //添加存储本地时间
                    }
                    sessionStorage.setItem('exampleList',JSON.stringify(data)); //保存到本地
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        // type: 'warning',
                        type: 'error',
                        duration:2500
                    });
                }
            }).catch(res=>{})

        },
        //添加人物到名人库
        addExample(name){
                if(!name) return;
                this.$axios.addExample({
                    name:name
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
                        this.exampleList = res.data.example;
                        let data = {
                            data:res.data.example,
                            createTime:Date.now()  //添加存储本地时间
                        }
                        sessionStorage.setItem('exampleList',JSON.stringify(data)); //保存到本地

                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{})

        },
        //详情跳转
        toDetails(value){
            this.$router.push({path:'/example/details',query:{eid:value._id}})
            // localStorage.setItem('exampleItemData',JSON.stringify(value));
        },
        changeQuery(){
            let type = this.$route.query.type;
            if(!type || this.currentType === type) return;
            if(type && type!=='all'){
                //根据type获取
                this.getExamp('',this.$route.query.type)
            }else{
                // 获取全部
                this.getExamp('','')
            }
            this.currentType = type;
            this.searchName = '';
        }
    },
    watch:{
        '$route.query.type':'changeQuery',
        '$route.fullPath':function(){
            let type = this.$route.query.type;
            if(!type){
                this.$router.push({query:{type:'all'}});
                type = 'all';
            }
        }
    },
    created(){
        let type = this.$route.query.type;
        if(!type){
            this.$router.push({query:{type:'all'}});
            type = 'all';
        }
        if(this.$route.query.search){
            // 输入框有内容
            this.searchName = this.$route.query.search;
            this.getExamp(this.$route.query.search,'')
        }else{
            // 输入框无内容
            this.changeQuery();
        }
    },
    components:{
        myTab
    }
    
};
</script>
<style lang="less">
.example {
    background-color: #fdfdfd;
    .my-tab {
        // height:56px;
        background-color: #f7f7f7;
        padding:10px 0;
        .types-box {
            display:flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            width:100%;
        }
        .types-box1 {
            flex:0; 
            margin-top:10px;
            border:1px solid transparent;
            div.all {
                width:0.25rem;
                height:100%;
                vertical-align:middle;
                font-size:0.05rem;
                margin-left:.02rem;
                background-color: #4c4ce4;
                color:#fff;
                margin-right:1px;
                border-radius:3px;
                text-align: center;
                padding-top:.02rem;
            }
        }
        .types-box2 {
            flex:1;
            padding:0 .02rem 0 0;
            margin-top:10px;
            // width:100%;
            display:flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            position: relative;
            &>div {
                flex-basis:12.5%;
                text-align: center;
                .type {
                    background:#eee;
                    // border:1px solid #bbb;
                    border-radius:3px;
                    font-size:0.045rem;
                    margin:1px;
                    margin-bottom:2px;
                    padding:0.02rem 0.01rem;
                    color:#fff;
                }
            }
            @media screen and (min-width:992px){
                padding:0 .05rem 0 0;
                &>div .type {
                    padding:0.01rem;
                }

            }
        }
    }
    //名人列表
    .example-list {
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        // padding:.06rem 0 .06rem .1rem;
        padding:.02rem 0 .1rem .2rem;
        text-align: center;
        .item {
            // float:left;
            width:23.6%;
            padding:.04rem;
            .item-box {
                padding:0 .03rem;
                width:100%;
                border:1px solid #eee;
                border-radius:0.05rem;
                cursor:pointer;
                position: relative;
                &:hover {
                    box-shadow: -0px -0px 1px #bbb;
                    .info {
                        display:inline-block;
                    }
                }
                .new-flag {
                    position: absolute;
                    top:-0.08rem;
                    left:-1px;
                    font-size:.17rem;
                    color:red;
                    i {
                    }
                }
            }
            .type {
                font-size:.07rem;
                padding-top:0.01rem;
            }
            .name {
                // height:.18rem;
                // line-height: .18rem;
                font-size:.05rem;
                padding:0.02rem 0;
            }
            .photo {
                height:.9rem;
                width:100%;
                overflow: hidden;
                position: relative;
                background-color: #666;
                img {
                    display:block;
                    width:100%;
                    height:auto;
                }
                .info {
                    display:none;
                    width:100%;
                    background-color: rgba(255,255,255,.3);
                    height:.07rem;
                    line-height: .07rem;
                    font-size:.04rem;
                    position: absolute;
                    bottom:0px;
                    left:50%;
                    transform:translateX(-50%);
                }
                .redirect-flag {
                    width:15rem;
                    // height:30px;
                    // background-color: pink;
                    position: absolute;
                    bottom:2.2rem;
                    right:0;
                    color:lime;
                    i {
                        font-size:2.5rem;
                    }
                    span {
                        font-size:1.3rem;
                    }
                }

            }

        }
        @media screen and (min-width:992px){
                .item {
                    width:19.4%;
                    // .type,.name {
                    //     font-size:.07rem;
                    // }
                    .photo {
                        height:165px;
                    }
                }
                padding-left:.3rem;
                padding-right:.45rem;
        } //@media screen and (min-width:992px)
    }
    a:hover {color: #1a1a1a;text-decoration:none} 
    .router-link-active {
        text-decoration: none;
    }
}

</style>
    