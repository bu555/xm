<template>
<div class="example " v-loading="loading">
    <div class="my-tab">
            <div class="search-bar">
                <el-input placeholder="名字搜索" v-model="searchName" class="input-with-select" style="width:250px" @keyup.enter.native="search()" clearable spellcheck=false >
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </div>
            <div class="types-box">
                <div v-for="(v,i) in types" :key="i">
                    <router-link :to="'/example?type='+v.type">
                    <div class="type" :style="'background:'+color[v.type]" :data-type="v.type">{{v.type.toUpperCase()}}</div>
                    </router-link>
                </div>
            </div>
    </div>
    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <div class="bx">
        <!--在线数据-->
        <div class="example-list" style="min-height:300px" v-if="exampleList_bk"> 
                <!--无数据--><!--无数据-->
                <div v-if="exampleList_bk &&exampleList_bk.length===0" style="padding-top:20px;text-align:center;width:100%">
                    <p>暂无数据哦("▔□▔)</p>
                </div>
                <!--有数据-->



                <div v-else class="item" v-for="(v,i) in exampleList_bk" :key="i">
                    <!--<router-link :to="'/example/'+v._id">-->
                    <div class="item-box">
                        <div class="photo">
                            <img :src="v.imgURL" alt="">
                        </div>
                        <div class="name overflow-row-1">{{v.name}}</div>
                        <div class="info overflow-row-5">{{v.name1?v.name1:''}}{{v.info}}</div>
                        <div class=""  style="padding-top:5px;padding-bottom:12px"><el-button type="success" size="small" @click="addExample(v)" >添 加</el-button></div>
                    </div>
                    <!--</router-link>-->
                </div>
        </div>
        <!--数据库的数据-->
        <div class="example-list" style="min-height:300px" v-if="exampleList"> 
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


        </div>
        <!--分页-->
        <div class="m-auto t-center pagi" style="padding:20px 0" v-if="exampleList">
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
            exampleList:null,
            exampleList_bk:'',
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
            size:12, //每页条数
            count:0,//总页数
            total:0,//总条数
            currentPage:1,
            loading:false,

        }
    },
    methods:{
        search(){
            if(this.searchName){
                this.$router.push({query:{s:this.searchName}})
            }
        },
        changePage(e){
            let query = JSON.parse(JSON.stringify(this.$route.query))
            query.page = e
            this.$router.push({query:query})
        },
        // 设置types激活样式
        setTypesStyle(){
                if(this.$route.query.type){
                    let type = this.$route.query.type
                    document.querySelectorAll('.types-box .type').forEach(v=>{
                        if(v.getAttribute('data-type')===type){
                            v.classList.add('t-active');
                            // v.classList.remove('ech-big');
                        }else{
                            v.classList.remove('t-active');
                            // v.classList.add('ech-big');
                        }
                    })
                }
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
                    this.exampleList_bk = false
                    this.exampleList = false
                    if(res.data.result.baike){
                        this.exampleList_bk = res.data.result.example
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
        addExample(example){
                if(!example) return;
                this.loading = true;
                this.$axios.addExample(example).then(res=>{
                    this.loading = false;
                    if(res.data.success){
                        this.exampleList = [res.data.example];

                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{
                    this.loading = false;
                })

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
            this.setTypesStyle()
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
        // 加载完后，设置types激活样式
        this.setTypesStyle()
    },
    components:{
    }
    
};
</script>
<style lang="less">
.example {
    margin:0 auto;
    .my-tab {
        background-color: rgba(0,0,100,.15);
        // padding:10px 0 15px;
        .search-bar {
            max-width:1075px;
            margin:0 auto;
            padding:8px 10px 0;
            position: relative;
            .el-input__inner {
                height:33px;
                border-radius:33px 0 0 33px;
                // border-radius:33px;
            }
            .el-input-group__append {
                border-radius:0 33px 33px 0 !important;
                margin-left:15px;
            }
            // .search-btn {
            //     position: absolute;
            //     left: 266px;
            //     top:7px;
            //     .el-button.is-circle {
            //         padding: 10px;
            //     }
            // }
        }
        .types-box {
            max-width:1075px;
            margin:0 auto;
            display:flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            width:100%;
            padding:10px;
            padding-top:8px;
            // padding-right:270px;
            &>div {
                flex:0 0 12.5%;
                text-align: center;
                .type {
                    background:#eee;
                    // border:1px solid #bbb;
                    border-radius:3px;
                    font-size:16px;
                    margin:2px;
                    height:32px;
                    line-height: 32px;;
                    color:#eee;
                }

            }
        }
        .types-box .type {
                    // box-shadow: 0 0 18px #fff inset;
                    // -moz-box-shadow: 0 0 18px #fff inset;
                    // -webkit-box-shadow: 0 0 18px #fff inset;
        }
        .types-box .type.t-active {
            font-weight:700;
            box-shadow: none;
            text-decoration: underline;
            color:#fff;
            text-shadow: 1px -1px 2px #222;
            -moz-text-shadow: 1px -1px 2px #222;
            -webkit-text-shadow: 1px -1px 2px #222;
            
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
    