<template>
<div class="example">
    example
    <el-button type="primary" @click="openInput">新增</el-button>
    <el-button type="primary" @click="getExamp()">get</el-button>
    <el-button type="primary" @click="searchExamp()">查询</el-button>
    <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
    <br/>
    <div class="example-list">
        <div class="item" v-for="(v,i) in exampleList" :key="i"  @click="toDetails(v)">
            <div class="item-box">
                <div class="type">{{v.type}}</div>
                <div class="photo">照片</div>
                <div class="name">{{v.name}}</div>
            </div>
        </div>
    </div>
</div> 
</template>
<script>

export default {
    data(){
        return{
            exampleList:[],
            detailsData:{}, //
            showDetails:false,
        }
    },
    methods:{
        addExamp(name){
                this.$axios.addExample({
                    name:name,
                    // type:'infj'
                    vote:'infj'
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data.message);
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            // type: 'warning',
                            type: 'success',
                            duration:3000
                        });
                    }else{
                        console.log(res.data.message);
                        // this.$message({
                        //     showClose: true,
                        //     message: res.data.message,
                        //     // type: 'warning',
                        //     type: 'error',
                        //     duration:3000
                        // });
                    }
                }).catch(res=>{})
        },
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
                            duration:3000
                        });
                    }
                }).catch(res=>{})

        },
        searchExamp(){
                this.$axios.searchExample({
                    name:'旭',//.."5aaf4bcf1e658b07c063c14a", name: "张旭5"
                    // id:'5aaf4bcf1e658b07c063c14a'
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{})

        },

        //详情跳转
        toDetails(value){
            this.$router.push({path:'/example/details',query:{eid:value._id}})
            console.log(value);
            localStorage.setItem('exampleItemData',JSON.stringify(value));
        },
        //打开新增input
        openInput() {
            this.$prompt('请输入名字', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            // inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.addExamp(value);
            }).catch(() => {
     
            });
        }
    },
    created(){
        this.getExamp();
    },

    
};
</script>
<style lang="less">
.example {
    .example-list {
            // padding-right:220px;
            display: flex;
            display: -webkit-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行

        .item {
            flex:0 0 25%; 
            //flex属性： 默认参数 0 1 auto
            //第一个参数：flex-grow:0 剩余空间分配比例 （如设为3，则此元素宽是其他的三倍）
            //第二个参数：flex-shrink: 默认1，空间不足时等比例缩小（非1时不缩小）
            //第三个参数：flex-basis 在分配多余空间之前，元素占据主轴空间
            .item-box {
                margin:5px 10px;
                border:1px solid #ccc;
            }
            .photo {
                height:150px;


            }
        }

    }

}

</style>
    