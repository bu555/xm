<template>
<div class="example " v-loading="loading">
    <div class="my-tab  container-fluid">
        <div class="bx clearfix">
            <div class="col-md-4">
                <div class="input-group">
                <input v-model="searchName" type="text" class="form-control" placeholder="Search for..." @keyup.enter="search()">
                <span class="input-group-btn">
                    <button @click="search()" class="btn btn-default" type="button">Go!</button>
                </span>
                </div><!-- /input-group -->
            </div><!-- /.col-lg-6 -->
            <!--types导航-->
            <div class="types-box">
                <!--<div class="types-box1">
                    <router-link to="/example?type=all">
                    <div class="all">默认</div>
                    </router-link>
                </div>-->
                <div>
                    <router-link to="/example?type=all">
                    <!--<div class="all type ech-big" style="background:#666" data-type="all">所有</div>-->
                    <div class="all type" style="background:#666" data-type="all">所有</div>
                    </router-link>
                </div>
                <div v-for="(v,i) in types" :key="i">
                    <router-link :to="'/example?type='+v.type">
                    <div class="type" :style="'background:'+color[v.type]" :data-type="v.type">{{v.type.toUpperCase()}}</div>
                    </router-link>
                </div>
            </div><!--types导航-->
        </div>
    </div>
    <!--<div style="width:2rem;height:2rem;background:#ccc">rem测试</div>-->
    <div class="bx">
        <div class="example-list" style="min-height:300px"> 
                <!--无数据--><!--无数据-->
                <div v-if="exampleList&&exampleList.length===0" style="padding-top:70px;text-align:center;width:100%">
                    <p>暂无数据哦("▔□▔)</p>
                    <div v-if="$route.query.search">
                        你可以点击<button class="cupid-green" style="margin:20px 2px;width:50px" @click="addExample($route.query.search)">添加</button>{{$route.query.search}}到名人库
                    </div>
                </div>
                <!--有数据-->
                <div class="item" v-for="(v,i) in exampleList" :key="i">
                    <router-link :to="{path:'/example/'+v._id}">
                    <!--<div class="item-box" :style="'border-color:'+color[v.type]+';color:'+color[v.type] ">-->
                    <div class="item-box" :style="'border-color:'+(typeof rgba[v.type]=='string'?rgba[v.type].substr(0,rgba[v.type].length-1)+',.4)':'')+';color:'+color[v.type] ">
                        <div class="type">{{v.type.toUpperCase()}}</div>
                        <div class="photo" :style="'box-shadow: 0 0 5px '+color[v.type]+';'">
                            <img :src="$pathImgs+v.img_url" alt="">
                            <!--投票提示-->
                            <!--<div v-if="v.type==='****'" class="redirect-flag  ech-shake-time" data-class="ec-rotate-in">
                                <span>投个票去！</span><i class="icon iconfont icon-new"></i>
                                
                            </div>-->
                        </div>
                        <div class="name">{{v.name==='王石'?'奥斯特路夫斯基芭芭凯特尔恩斯':v.name}}</div>
                        <!--左上角new标-->
                        <!--<div  v-if="v.type==='****'" class="new-flag" data-class="ec-rotate-in"><i class="icon iconfont icon-iconfontzhizuobiaozhun023113"></i></div>-->
                        <!--<i v-if="v.type==='****'" class="new-flag icon iconfont icon-iconfontzhizuobiaozhun023113"></i>-->

                        <!--<div class="new-flag">New</div>-->
                    </div>
                    </router-link>
                </div>
        </div>
        <!--分页-->
        <div class="m-auto t-center pagi" style="padding:20px 0">
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
            size:8, //每页条数
            count:0,//总页数
            total:0,//总条数
            currentPage:1,
            loading:false
        }
    },
    methods:{
        search(){
            if(this.searchName){
                this.$router.push({query:{search:this.searchName}})
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
                    this.exampleList = res.data.result.example;
                    this.count = res.data.result.count
                    this.total = res.data.result.total
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
        addExample(name){
                if(!name) return;
                this.loading = true;
                this.$axios.addExample({
                    name:name
                }).then(res=>{
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
            let search = query.search?query.search:'';
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

        let search = this.$route.query.search?this.$route.query.search:''
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
    // background-color: #fdfdfd;
    // max-width:1070px;
    margin:0 auto;
    .my-tab {
        // height:56px;
        // background-color: #f7f7f7;
        // background-color: rgba(190,190,190,.45);
        background-color: rgba(0,0,100,.15);
        padding:10px 0 15px;

        .types-box {
            display:flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            width:100%;
            padding:8px 15px 0px;
            flex:1;
            &>div {
                // flex-basis:12.5%;

                flex:1;
                text-align: center;
                .type {
                    background:#eee;
                    // border:1px solid #bbb;
                    border-radius:3px;
                    font-size:15px;
                    margin:1px;
                    padding:4px 0;
                    color:#eee;
                }

            }
            @media screen and (max-width:768px){
                &>div {
                    flex:0 0 20%;
                    .type {
                    }

                }


            }
        }
        .types-box .type {
                    box-shadow: 0 0 18px #fff inset;
                    -moz-box-shadow: 0 0 18px #fff inset;
                    -webkit-box-shadow: 0 0 18px #fff inset;
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
        max-width:1066px;
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        padding:22px 4%;
        text-align: center;
        // justify-content:space-between;
        .item {
            margin:8px 0;
            width:20%;
            .item-box {
                margin:0 auto;
                padding:0 8px;
                max-width:155px;
                border:1px solid #eee;
                border-radius:3px;
                cursor:pointer;
                position: relative;
                .new-flag {
                    position: absolute;
                    top:0;
                    left:0px;
                    font-size:.11px;
                    color:red;

                }
            }
            .type {
                font-size:18px;
                padding:4px 0;
            }
            .name {
                font-size:14px;
                padding:6px 0;
            }
            .photo {
                height:170px;
                width:100%;
                overflow: hidden;
                position: relative;
                background-color: #666;
                border-radius:3px;
                img {
                    display:block;
                    width:100%;
                    height:auto;
                }

            }

        }
        @media screen and (max-width:992px){
            .item {
                width:25%;
            }
        }
        @media screen and (max-width:680px){
            .item {
                width:33.3%;
            }
        }
        @media screen and (max-width:525px){
        .item {
            margin:8px 0;
            .item-box {
                max-width:29.5vw;
                padding:0 6px;
                .new-flag {
                }
            }
            .type {
                font-size:17px;
                padding:4px 0;
            }
            .name {
                font-size:13px;
                padding:6px 0;
            }
            .photo {
                height:30vw;
                width:100%;
                border-radius:2px;
                img {
                    display:block;
                    width:100%;
                    height:auto;
                }

            }

        }

        } 
    }
    // 分页
    .pagi{
        max-width:1066px;
        background-color: rgba(255,255,255,.72);
    }
    a:hover {color: #1a1a1a;text-decoration:none} 
    .router-link-active,a {
        text-decoration: none;
    }
}

</style>
    