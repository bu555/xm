<template>
<div class="example">
    <div class="tab-nav">
        <div class="nav-view">
                <!--搜索框-->
            <div class="search-box">
                <el-input placeholder="输入名字" v-model="searchName" class="input-with-select" @change="getExamp(searchName)">
                    <el-button slot="append" icon="el-icon-search" @click="getExamp(searchName)"></el-button>
                </el-input>
            </div>
        </div>
    </div>
    <myTab :tabs="tabs"></myTab>
    <!--<el-button type="primary" @click="goVote()">投票</el-button>-->

    <div class="main-box">
        <div class="example-list">
            <!--无数据-->
            <div v-if="(exampleList.length===0)" style="padding-top:70px;text-align:center;width:100%">
                <p>暂无数据哦("▔□▔)</p>
                <div v-if="$route.query.search">
                    点击<button class="cupid-green" style="margin:20px 2px;width:50px" @click="addExample($route.query.search)">添加</button>{{$route.query.search}}到名人库
                </div>
            </div>

            <!--有数据-->
            <div  class="item" v-for="(v,i) in exampleList" :key="i">
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
                    <div class="name">{{v.name}}</div>
                    <!--左上角new标-->
                    <!--<div  v-if="v.type==='****'" class="new-flag" data-class="ec-rotate-in"><i class="icon iconfont icon-iconfontzhizuobiaozhun023113"></i></div>-->
                    <i v-if="v.type==='****'" class="new-flag icon iconfont icon-iconfontzhizuobiaozhun023113"></i>
                </div>
                </router-link>
            </div>
        </div>
        <div class="right-side">
            <div class="top-side">
            </div>
        </div>

    </div>
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
            tabs:[
                {
                    type:'all',
                    title:'全部'
                },
                {
                    type:'enfj',
                    title:'ENFJ'
                },
                {
                    type:'enfp',
                    title:'ENFP'
                },
                {
                    type:'infj',
                    title:'INFJ'
                },
                {
                    type:'infp',
                    title:'INFP'
                },
                {
                    type:'entj',
                    title:'ENTJ'
                },
                {
                    type:'entp',
                    title:'ENTP'
                },
                {
                    type:'intj',
                    title:'INTJ'
                },
                {
                    type:'intp',
                    title:'INTP'
                },
                {
                    type:'estj',
                    title:'ESTJ'
                },
                {
                    type:'estp',
                    title:'ESTP'
                },
                {
                    type:'istj',
                    title:'ISTJ'
                },
                {
                    type:'istp',
                    title:'ISTP'
                },
                {
                    type:'esfj',
                    title:'ESFJ'
                },
                {
                    type:'esfp',
                    title:'ESFP'
                },
                {
                    type:'isfj',
                    title:'ISFJ'
                },
                {
                    type:'isfp',
                    title:'ISFP'
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
    .tab-nav {
        height:40px;
        // background-color: #e8ecf5;
        background-color: #fafafa;
        .nav-view {
            background-color: transparent;
            height:40px;
            line-height: 40px;
            font-size:13px;
            color:#72748a;
            .search-box {
                float:left;
                margin-left:6px;
                text-align:left;
                padding-top:1px;
                .input-with-select {
                    width:255px;
                }
                .el-input__inner {
                    height:27px;
                }
            }
        }
    }
    .main-box {
        display: flex; display: -webkit-flex;display: -ms-flex;
        // padding:10px;
        .example-list {
            width:72%;
            display: flex; display: -webkit-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            padding:5px;
            text-align: center;
            .item {
                flex:0 0 25%; 
                .item-box {
                    margin:7px;
                    border:1px solid #eee;
                    border-radius:8px;
                    padding-top:3px;
                    padding-bottom:3px;
                    cursor:pointer;
                    position: relative;
                    // width:157px;
                    &:hover {
                        box-shadow: -0px -0px 1px #bbb;
                        .info {
                            display:inline-block;
                        }
                    }
                    .new-flag {
                        position: absolute;
                        top:-2px;
                        left:-1px;
                        font-size:38px;
                        color:red;
                        i {
                        }
                    }
                }
                .type,.name {
                    height:32px;
                    line-height: 32px;
                    font-size:15px;
                }
                .photo {
                    height:195px;
                    overflow: hidden;
                    position: relative;
                    img {
                        width:150px;
                    }
                    .info {
                        display:none;
                        width:150px;
                        background-color: rgba(255,255,255,.7);
                        height:20px;
                        line-height: 20px;
                        font-size:13px;
                        position: absolute;
                        bottom:0px;
                        left:50%;
                        margin-left:-75px;
                    }
                    .redirect-flag {
                        width:150px;
                        // height:30px;
                        // background-color: pink;
                        position: absolute;
                        bottom:22px;
                        right:0;
                        color:lime;
                        i {
                            font-size:25px;
                        }
                        span {
                            font-size:13px;
                        }
                    }

                }
            }

        }
        .right-side {
            flex:1;
            padding:12px;

            .top-side {
                height:400px;
                border:1px solid #ddd;
                border-radius:4px;
            }
        }


    }

}

</style>
    