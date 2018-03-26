<template>
<div class="example">
    <div class="tab-nav">
        <div class="nav-view">
            <!--<div class="nav-list">
                <span>名人库</span>
                <span>刘德华</span>
            </div>-->
                <!--搜索框-->
            <div class="search-box">
                <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select">
                    <!--<el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                    </el-select>-->
                    <el-button slot="append" icon="el-icon-search" @click="searchExamp"></el-button>
                </el-input>
            </div>
        </div>
    </div>
    <myTab></myTab>
    <!--<el-button type="primary" @click="goVote()">投票</el-button>-->

    <div class="main-box">
        <div class="example-list">
            <div class="item" v-for="(v,i) in exampleList" :key="i">
                <div class="item-box"  @click="toDetails(v)">
                    <div class="type">{{v.type.toUpperCase()}}</div>
                    <div class="photo">
                        <img :src="v.img_url" alt="">
                    </div>
                    <div class="name">{{v.name}}</div>
                </div>
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
            searchName:''
        }
    },
    methods:{
        getExamp(){
            this.$axios.getExample().then(res=>{
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
        //精确查询example
        searchExamp(){
                this.$axios.searchExample({
                    name:this.searchName
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
                        this.exampleList = res.data.example;

                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{})

        },

        //详情跳转
        toDetails(value){
            this.$router.push({path:'/example/details',query:{eid:value._id}})
            localStorage.setItem('exampleItemData',JSON.stringify(value));
        },
    },
    created(){
        let type = this.$route.query.type;
        if(!type){
            this.$router.push({query:{type:'default'}});
            type = 'default';
        }
        console.log(this.$route.query.type);
        //按type,請求數據顯示
        this.getExamp();

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
        background-color: #f7f7f7;
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
        display: flex; display: -webkit-flex;
        // padding:10px;
        .example-list {
            width:72%;
            display: flex; display: -webkit-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            padding:5px;
            text-align: center;
            .item {
                flex:0 0 25%; 
                //flex属性： 默认参数 0 1 auto
                //第一个参数：flex-grow:0 剩余空间分配比例 （如设为3，则此元素宽是其他的三倍）
                //第二个参数：flex-shrink: 默认1，空间不足时等比例缩小（非1时不缩小）
                //第三个参数：flex-basis 在分配多余空间之前，元素占据主轴空间
                .item-box {
                    margin:7px;
                    border:1px solid #eee;
                    border-radius:8px;
                    padding-top:3px;
                    padding-bottom:3px;
                    cursor:pointer;
                    // width:157px;
                }
                .type,.name {
                    height:32px;
                    line-height: 32px;
                    font-size:15px;
                }
                .photo {
                    height:195px;
                    overflow: hidden;
                    img {
                        width:150px;
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
    