<template>
<div class="details">
        <div class="details-info">
            <div class="left-box">
                <div class="item">
                    <div class="item-box">
                        <div class="type">{{exampleItem.type}}</div>
                        <div class="photo">照片</div>
                        <div class="name">{{exampleItem.name}}</div>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="vote-result" style="height:177px">
                    e => <span>{{exampleItem.vote.e}}</span><br/>
                    i => <span>{{exampleItem.vote.i}}</span><br/>
                    s => <span>{{exampleItem.vote.s}}</span><br/>
                    n => <span>{{exampleItem.vote.n}}</span><br/>
                    t => <span>{{exampleItem.vote.t}}</span><br/>
                    f => <span>{{exampleItem.vote.f}}</span><br/>
                    j => <span>{{exampleItem.vote.j}}</span><br/>
                    p => <span>{{exampleItem.vote.p}}</span><br/>
                </div>
                <div>
                    <el-button type="primary" @click="goVote()">投票</el-button>

                </div>
            </div>
        </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            exampleItem:null,
        }
    },
    methods:{
        //投票
        goVote(){
            console.log("example" ,this.exampleItem);
                this.$axios.goVote({
                    eid:this.exampleItem._id,
                    vote:'intj'
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

            }
        }else{
            //请求数据

        }
    }
    
};
</script>
<style lang="less">
.details {
    .details-info {
            display: flex;
            display: -webkit-flex;
            flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
            .left-box,.right-box {
                flex:0 0 40%;
                height:250px;
                border:1px solid #ccc;
                .photo {
                    height: 177px;
                }

            }
                .item {
                }
            
            .vote-result {
                background-color: #ccc;

            }
    }

    

}

</style>
    