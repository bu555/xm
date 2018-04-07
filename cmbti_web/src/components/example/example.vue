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
                    <div class="all">默</br>认</div>
                    </router-link>
                </div>
                <div class="types-box2">
                        <div v-for="(v,i) in types" :key="i">
                            <router-link :to="'/example?type='+v.type">
                            <div class="type ech-big" :style="'background:'+color[v.type]">{{v.type.toUpperCase()}}</div>
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
                <div  class="item" v-for="(v,i) in exampleList" :key="i">
                    <router-link :to="{path:'/example/details',query:{eid:v._id}}">
                    <!--<div class="item-box" :style="'border-color:'+color[v.type]+';color:'+color[v.type] ">-->
                    <div class="item-box" :style="'border-color:'+(typeof rgba[v.type]=='string'?rgba[v.type].substr(0,rgba[v.type].length-1)+',.4)':'')+';color:'+color[v.type] ">
                        <div class="type">{{v.type.toUpperCase()}}</div>
                        <div class="photo" :style="'box-shadow: 0 0 5px '+color[v.type]+';'">
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
            color:{
                'entp':'#2270d7',
                'intp':'#2270d7',
                'entj':'#2270d7',
                'intj':'#2270d7',

                'enfp':'#b225d5',
                'infp':'#b225d5',
                'enfj':'#b225d5',
                'infj':'#b225d5',

                'estj':'#f33370',
                'istj':'#f33370',
                'esfj':'#f33370',
                'isfj':'#f33370',

                'estp':'#9ea2a2',
                'istp':'#9ea2a2',
                'esfp':'#9ea2a2',
                'isfp':'#9ea2a2',

            },
            rgba:{},
            types:[
                {
                    type:'entp',
                    title:'ENTP'
                },
                {
                    type:'intp',
                    title:'INTP'
                },
                {
                    type:'entj',
                    title:'ENTJ'
                },
                {
                    type:'intj',
                    title:'INTJ'
                },
                {
                    type:'enfp',
                    title:'ENFP'
                },
                {
                    type:'infp',
                    title:'INFP'
                },
                {
                    type:'enfj',
                    title:'ENFJ'
                },
                {
                    type:'infj',
                    title:'INFJ'
                },

                {
                    type:'estj',
                    title:'ESTJ'
                },
                {
                    type:'istj',
                    title:'ISTJ'
                },
                {
                    type:'esfj',
                    title:'ESFJ'
                },
                {
                    type:'isfj',
                    title:'ISFJ'
                },
                {
                    type:'estp',
                    title:'ESTP'
                },
                {
                    type:'istp',
                    title:'ISTP'
                },
                {
                    type:'esfp',
                    title:'ESFP'
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
        // 设置types激活样式
        setTypesStyle(type){
                if(!document.querySelector('.types-box .all')) return;
                document.querySelector('.types-box .all').classList.remove('t-active');
                document.querySelectorAll('.types-box .type').forEach(v=>{
                    v.classList.add('ech-big');
                    v.classList.remove('t-active');
                })
                if(type==='all'){
                    document.querySelector('.types-box .all').classList.add('t-active');
                }else{
                    document.querySelectorAll('.types-box .type').forEach(v=>{
                        if(v.innerHTML.toLowerCase()===type){
                            v.classList.add('t-active');
                            v.classList.remove('ech-big');
                        }
                    })
                }
                // let target = event.currentTarget;
                // target.classList.remove('ech-big');
                // target.classList.add('t-active');
            
        },
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
        //改变query.type，调用函数获取对应数据
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
            // 设置types样式
            this.setTypesStyle(type);
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
        if(!type){ //赋予默认type
            this.$router.push({query:{type:'all'}});
            type = 'all';
        }
        if(this.$route.query.search){
            // 如果带有search输入框内容，按内容搜索数据
            this.searchName = this.$route.query.search;
            this.getExamp(this.$route.query.search,'')
        }else{
            // 输入框无内容，调函数按type获取数据
            this.changeQuery();
        }
        // hex转rgba
        for(var key in this.color){
            this.rgba[key] = this.colorFormat.hex2rgb(this.color[key]);
        }
        console.log(this.rgba);
    },
    mounted(){
        // 加载完后，设置types激活样式
        if(this.$route.query.type){
            this.setTypesStyle(this.$route.query.type);
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
                font-size:0.045rem;
                margin-left:.02rem;
                background-color: #7e77c7;
                color:#fff;
                margin-right:1px;
                border-radius:3px;
                text-align: center;
                padding-top:.03rem;
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
                    // box-shadow: 0 0 18px #fff inset;
                    // -moz-box-shadow: 0 0 18px #fff inset;
                    // -webkit-box-shadow: 0 0 18px #fff inset;
                    // text-shadow: 1px -1px 2px #222;
                    // -moz-text-shadow: 1px -1px 2px #222;
                    // -webkit-text-shadow: 1px -1px 2px #222;
                }

            }
            @media screen and (min-width:992px){
                padding:0 .05rem 0 0;
                &>div .type {
                    padding:0.01rem;
                }

            }
        }
        .types-box .type,.types-box .all {
                    box-shadow: 0 0 18px #fff inset;
                    -moz-box-shadow: 0 0 18px #fff inset;
                    -webkit-box-shadow: 0 0 18px #fff inset;
                    text-shadow: 1px -1px 2px #222;
                    -moz-text-shadow: 1px -1px 2px #222;
                    -webkit-text-shadow: 1px -1px 2px #222;
        }
        .types-box .all.t-active {
            font-weight:700;
            // text-decoration: underline;
        }
        .types-box .type.t-active {
            font-weight:700;
            text-decoration: underline;
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
    