<template>
<div class="details">
    <div class="ctrl">
        <div style="text-align:left;color:#538dd5;margin:10px 0">
            <span @click="$router.go(-1)" style="cursor:pointer">
                <i class="el-icon-back"></i> 返回
            </span>
        </div>
    </div>
    <div class="main-box">
        <div class="details-info">
            <div class="left-box">
                <div class="info-txt">
                    {{exampleItem.info}}
                </div>
                <div class="item">
                    <div class="item-box">
                        <div class="type">{{exampleItem.type.toUpperCase()}}</div>
                        <div class="photo">
                            <img :src="exampleItem.img_url" alt="">
                        </div>
                        <div class="name">{{exampleItem.name}}</div>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="vote-result" style="height:177px">
                    <!--e => <span>{{exampleItem.vote.e}}</span><br/>
                    i => <span>{{exampleItem.vote.i}}</span><br/>
                    s => <span>{{exampleItem.vote.s}}</span><br/>
                    n => <span>{{exampleItem.vote.n}}</span><br/>
                    t => <span>{{exampleItem.vote.t}}</span><br/>
                    f => <span>{{exampleItem.vote.f}}</span><br/>
                    j => <span>{{exampleItem.vote.j}}</span><br/>
                    p => <span>{{exampleItem.vote.p}}</span><br/>-->
                    <progressCom :result="exampleItem.vote"></progressCom>
                </div>
                <div>
                    <el-button type="primary" @click="goVote()">投票</el-button>

                </div>
            </div>
        </div>
        <div class="right-side">
            <div class="top-side">
                top-side
            </div>
        </div>
    </div>
</div> 
</template>
<script>
import progressCom from "./progress"
export default {
    data(){
        return {
            exampleItem:null,
        }
    },
    methods:{
        //投票
        goVote(){
            this.$prompt('请输入名字', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            // inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                this.$axios.goVote({
                    eid:this.exampleItem._id,
                    vote:value
                    // name:'旭',//.."5aaf4bcf1e658b07c063c14a", name: "张旭5"
                    // id:'5aaf4bcf1e658b07c063c14a'
                }).then(res=>{
                    if(res.data.success){
                        this.exampleItem = res.data.example;
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning',
                            duration:2500
                        });
                    }
                }).catch(res=>{})
                
            }).catch(() => {
     
            });
        },
        //精确查询example
        searchExamp(id){
                this.$axios.searchExample({
                    id:id
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
                        this.exampleItem = res.data.example[0];

                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{})

        },
    },
    created(){
        console.log(this.$route);
        // 判断list数据是否存在，不存在则通过eid请求，存在则判断时间是否过期，如果过期则重新请求
        let exampleList = sessionStorage.getItem('exampleList') || '';
        console.log(exampleList);
        if(exampleList){
            exampleList = JSON.parse(exampleList);
            console.log(typeof exampleList.createTime);
            console.log(exampleList);
            if( (Date.now()-exampleList.createTime)<this.maxAge){
                var _this = this;
                exampleList.data.forEach(v=>{
                    if(v._id === this.$route.query.eid){
                        _this.exampleItem = Object.create(v); //直接使用local的数据
                        console.log(v);
                    }
                })
            }else{
                //请求数据
                this.searchExamp(this.$route.query.eid);

            }
        }else{
            //请求数据

        }
    },
    components:{
        progressCom
    }
    
};
</script>
<style lang="less">
.details {
    .ctrl {
        padding-left:5px;
    }
    .main-box {
        display: flex; display: -webkit-flex;
        text-align: center;
        .details-info {
                width:72%;
                display: flex;
                display: -webkit-flex;
                flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
                padding:5px;
                .left-box {
                    flex:1;
                    border:1px solid #ccc;
                    display: flex; display: -webkit-flex;
                    padding-top:15px;
                    .info-txt {
                        width:150px;
                        padding:15px 28px;
                        padding-right:0px;
                        text-align:left;
                        font-size:13px;
                    }
                    .item {
                        margin:0 auto;
                    }
                    .item-box {
                        flex:1;
                        margin:7px;
                        width:200px;
                        border:1px solid #eee;
                        border-radius:8px;
                        // width:157px;
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
                .right-box {
                    // flex:1;
                    width:315px;
                    border:1px solid #ccc;
                    .photo {
                        height: 177px;
                    }
                }
                .item {
                }
            
                .vote-result {
                    // background-color: #ccc;

                }
        }
        .right-side {
            flex:1;
            padding:5px;
            .top-side {
                height:400px;
                border:1px solid #ddd;
                border-radius:4px;
            }
        }

    }

    

}

</style>
    