<template>
<div class="example " v-loading="loading">
    <div class="my-tab">
        <div class="my-tab-inner">
            <div class="search-bar">
                <div class="btn-all">
                    <router-link :to="'/example?type=all'">
                    <div :class="$route.query.type==='all'?'type all t-active':'type all'" data-type="all">
                        <div class="bg-l"></div>全 部
                        <div class="bg-r"></div>
                    </div>
                    </router-link>
                </div>
                <div class="search-right">
                    <!--<el-input placeholder="名字搜索" v-model="searchName" class="input-with-select" style="width:250px" @keyup.enter.native="search()" clearable spellcheck=false >
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>-->
                    <el-input
                    placeholder="名字搜索"
                    v-model="searchName"
                    @focus="focusHandler($event)"
                    @blur="blurHandler($event)"
                    @input="inputHandler($event)"
                    @keyup.enter.native="search()"
                    spellcheck="false"
                    >
                    </el-input>
                    <em class="el-icon-search" @click="search()"></em>
                </div>
            </div>
            <div class="s-line">
            </div>
            <div class="types-box">
                <div v-for="(v,i) in $mbti.types" :key="i">
                    <router-link :to="'/example?type='+v">
                    <div :class="$route.query.type===v?'type t-active':'type'" :data-type="v">
                        <div class="bg-l"></div>{{v.toUpperCase()}}
                        <div class="bg-r"></div>
                    </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <div class="bx">
        <!--在线数据-->
        <div class="example-list" style="min-height:300px" v-if="exampleList_bk"> 
                <!--无数据--><!--无数据-->
                <div v-if="(exampleList_bk &&exampleList_bk.length===0)" style="padding-top:20px;text-align:center;width:100%">
                    <p>暂无数据哦("▔□▔)</p>
                </div>
                <!--有数据-->



                <div class="item" v-for="(v,i) in exampleList_bk" :key="i">
                    <!--<router-link :to="'/example/'+v._id">-->
                    <div class="item-box" style="padding-top:18px">
                        <div class="photo">
                            <img :src="v.imgURL" alt="">
                        </div>
                        <div class="name overflow-row-1">{{v.name}}</div>
                        <div class="info overflow-row-5">{{v.name1?v.name1:''}}{{v.info}}</div>
                        <div class=""  style="padding-top:5px;padding-bottom:12px"><el-button type="success" size="small" @click="addExample(i)" >添 加</el-button></div>
                    </div>
                    <!--</router-link>-->
                </div>
        </div>
        <!--数据库的数据-->
        <div class="example-list" style="min-height:300px" v-if="exampleList"> 
                <div v-if="(exampleList &&exampleList.length===0)" style="padding-top:20px;text-align:center;width:100%">
                    <p>暂无数据哦("▔□▔)</p>
                </div>
                <div class="item" v-for="(v,i) in exampleList" :key="i">
                    <router-link :to="'/example/'+v._id">
                    <div class="item-box">
                        <div class="type">{{v.type.toUpperCase()}}</div>
                        <div class="photo">
                            <img :src="$pathImgs+v.img_url" alt="">
                        </div>
                        <div class="name overflow-row-1">{{v.name}}</div>
                        <div class="info overflow-row-5">{{v.name1?v.name1:''}}{{v.info}}</div>
                        <div style="height:1px"></div>
                    </div>
                    </router-link>
                </div>
                <!--<div class="item" v-if="(exampleList instanceof Array)&&exampleList.length>0&&$route.query.s">查看更多同名名人</div>-->

        </div>
        <!--分页-->
        <div class="m-auto t-center pagi" style="padding:20px 0" v-if="exampleList.length>0">
            <el-pagination
            background
            :page-size="size"
            :pager-count="count"
            :total="total"
            :current-page="currentPage"
            @current-change="changePage($event)"
            layout="prev, pager, next"
            >
            </el-pagination>
        </div> 

        <div class="r-side col-xs-0 col-sm-0 col-md-3 col-lg-3">

        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return{
            exampleList:'',
            exampleList_bk:'',
            detailsData:{}, //
            showDetails:false,
            searchName:'',
            sName:'',
            // tab导航条内容
            // color:{
            //     'entp':'#2270d7',
            //     'intp':'#2270d7',
            //     'entj':'#2270d7',
            //     'intj':'#2270d7',

            //     'enfp':'#b225d5',
            //     'infp':'#b225d5',
            //     'enfj':'#b225d5',
            //     'infj':'#b225d5',

            //     'estj':'#f33370',
            //     'istj':'#f33370',
            //     'esfj':'#f33370',
            //     'isfj':'#f33370',

            //     'estp':'#9ea2a2',
            //     'istp':'#9ea2a2',
            //     'esfp':'#9ea2a2',
            //     'isfp':'#9ea2a2',

            // },
            size:12, //每页条数
            count:0,//总页数
            total:0,//总条数
            currentPage:1,
            loading:false,

        }
    },
    methods:{
        focusHandler(e){
            e.target.style.borderColor = '#e4e8eb'
        },
        blurHandler(e){
            e.target.style.borderColor = '#778b9d'
            if(!this.searchName && !this.$route.query.type){
                this.$router.push({query:{type:'all'}})
            }
        },
        inputHandler(){
            if(!this.searchName){
                this.$router.push({query:{type:'all'}})
            }
        },
        search(){
            if(this.searchName){
                let search = this.$route.query.s
                this.$router.push({query:{s:this.searchName}})
                if(search===this.searchName){
                    this.getExamp({ name:search,page:1 })
                }
            }else{
                this.$router.push({query:{type:'all'}})
            }
        },
        changePage(e){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            query.page = e
            this.$router.push({query:query})
        },
        getExamp(option){ //name(模糊),id,type（模糊）
            // if(!option.name || !option.type || !option.id) return;
            option.size = this.size;
            this.loading = true;
            this.$axios.searchExample({
                params:option
            }).then(res=>{
                this.loading = false;
                if(res.data.success){
                    this.exampleList_bk = ''
                    this.exampleList = ''
                    //返回百科数据
                    if(res.data.result.baike){
                        this.exampleList_bk = res.data.result.example
                            this.sName = res.data.result.sName
                        if(!this.exampleList_bk){
                            this.exampleList_bk = []
                        }
                    }else{
                        this.exampleList = res.data.result.example;
                        this.count = res.data.result.count
                        this.total = res.data.result.total
                    }
                    // let query = this.$route.query
                    // query.page = res.data.result.page
                    // console.log(query);
                    // this.$router.push({query:query})
                }else{
                    this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'error',
                        duration:2500
                    });
                }
            }).catch(res=>{
                this.loading = false;
            })

        },
        //添加人物到名人库
        addExample(index){
                
                if(this.exampleList_bk || this.exampleList_bk.length>0){
                    this.loading = true;
                    this.$axios.addExample({
                        // 列表数据
                        baikeList:this.exampleList_bk,
                        // 当前点击的索引
                        currentIndex:index,
                        sName:this.sName
                    }).then(res=>{
                        this.loading = false;
                        if(res.data.success){
                            this.exampleList = [res.data.example];
                            this.exampleList_bk = ''

                        }else{
                            console.log(res.data)
                        }
                    }).catch(res=>{
                        this.loading = false;
                    })
                }

        },
        //详情跳转
        toDetails(value){
            this.$router.push({path:'/example/details',query:{eid:value._id}})
            // localStorage.setItem('exampleItemData',JSON.stringify(value));
        },
        //根据query，调用函数获取对应数据
        changeQuery(){
            let query = this.$route.query
            let type = query.type?query.type:'';
            let search = query.s?query.s:'';
            let page = query.page?query.page:1;
            if(type){
                if(type=='all'){
                    // 获取全部
                    this.getExamp({page:page})
                }else{
                    //根据type获取
                    this.getExamp({ type:type,page:page })
                }
            }else if(search){
                // 按name模糊搜索
                this.getExamp({ name:search,page:page })
                this.searchName = search
            }
            this.currentPage = Number(page)
        }
    },
    watch:{
        '$route.query':'changeQuery',
    },
    created(){

        let search = this.$route.query.s?this.$route.query.s:''
        let type = this.$route.query.type?this.$route.query.type:'';
        if(!type && !search){ //赋予默认type
            this.$router.push({query:{type:'all',page:1}})
        }else{
            this.changeQuery()
        }

        // hex转rgba
        for(var key in this.color){
            this.rgba[key] = this.colorFormat.hex2rgb(this.color[key]);
        }
    },
    mounted(){
    },
    components:{
    }
    
};
</script>
<style lang="less">
.example {
    margin:0 auto;
    .my-tab {
        // background-color: rgba(0,0,100,.15);
        background: #778b9d;
        // padding:10px 0 15px;
        .my-tab-inner {
            max-width:1075px;
            margin:0 auto;
            padding:0px 5px;

        }
        .search-bar {
            padding:5px 0;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items:middle;
            border-bottom:1px solid #708190;
            .search-right {
                position: relative;
                input {
                    display:block;
                    height:31px;
                    border-radius:31px;
                    background-color: rgba(255,255,255,.8);
                    padding-right:50px;
                }
                em {
                    position: absolute;
                    top:1px;
                    right:2px;
                    font-size:20px;
                    font-weight:700;
                    padding:5px;
                    cursor: pointer;
                    color:#728698;
                    &:hover {
                        text-shadow:0 0 1px #586a7a;
                    }
                }
            }
            .btn-all {
                flex:0 0 12.5%;
                margin-right:18px;
                padding-right:3px;
            }
        }
        .types-box {
            display:flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            width:100%;
            padding:5px 0;
            // padding-right:270px;
            &>div {
                flex:0 0 12.5%;
                text-align: center;

            }
        }
        .type {
            font-size:16px;
            margin:2px;
            height:28px;
            line-height: 28px;;
            color:#eee;
            padding:0 3px;
            background:url('/static/img/btn-up.jpg') no-repeat;
            position: relative;
            text-align:center;
            .bg-r {
                width:3px;
                height:28px;
                background:url('/static/img/btn-up.jpg') no-repeat -165px 0px;
                position: absolute;
                right:0;
                top:0;
            }
        }
        .type:hover, .type.t-active{
            background:url('/static/img/btn-down.jpg') no-repeat;
            color:#fff;
            .bg-r {
                background:url('/static/img/btn-down.jpg') no-repeat -165px 0px;
            }
        }
        .type.all {
            width:100%;
        }
    }
    //名人列表
    .example-list {
        background-color: rgba(255,255,255,.72);
        margin:4px auto 0;
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        padding:15px;
        padding-top:20px;
        text-align: center;
        box-sizing: border-box;
        .item {
            flex:0 0 24.8%;
            margin-bottom:22px;
            // background-color: red;
            .item-box {
                margin:0 auto;
                padding:0 3px;
                width:90%;
                height:auto;
                border-radius:3px;
                cursor:pointer;
                position: relative;
                background-color: #f2f2f2;
            }
            .type {
                font-size:18px;
                padding:7px 0 4px;
            }
            .name {
                font-size:15px;
                padding:6px 0 10px;
                font-weight:600;
            }
            .photo {
                height:200px;
                width:150px;
                margin:0 auto;
                overflow: hidden;
                // position: relative;
                // background-color: #666;
                border-radius:1px;
                img {
                    display:block;
                    width:100%;
                    object-fit: cover; //居中
                    // object-fit:fill; //占满 拉伸或压缩 ===img实际设定
                    // object-fit:contain;   //最小方向占满(如果没设高度则按比例)
                    // object-fit:scale-down; //最中间按实际高度 （有宽高则图片大的一侧向占满）
                    height:100%;
                }

            }
            .info {
                font-size:14px;
                height:97px;
                text-align:left; 
                padding:0 2%; 
                margin-bottom:15px;
                font-size:#777;
            }

        }
    }
    @media screen and (max-width:768px){
        .example-list .item {
            flex:0 0 33.33%;
            .item-box {
                width:90%;
            }
            .photo {
                width:20vw;
                height:25vw;
            }
        }
    }
    @media screen and (max-width:500px){
        .example-list .item {
            flex:0 0 50%;
            .item-box {
                width:94%;
            }
            .photo {
                width:32vw;
                height:42vw;
            }
        }
        .input-with-select {
            width:100% !important;
        }
        .types-box {
            &>div {
                flex:0 0 25% !important;
            }
        }
        .search-bar .btn-all {
            flex:0 0 25% !important;
        }
    }
    // 分页
    .pagi{
        background-color: rgba(255,255,255,.72);
    }
    a:hover {color: #1a1a1a;text-decoration:none} 
    .router-link-active,a {
        text-decoration: none;
    }
}

</style>
    