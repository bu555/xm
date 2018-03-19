<template>
<div class="example">
    example
    <el-button type="primary" @click="addExamp()">新增</el-button>
    <el-button type="primary" @click="getExamp()">get</el-button>
    <el-button type="primary" @click="searchExamp()">查询</el-button>
    <el-button type="primary" @click="goVote()">投票</el-button>
</div> 
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        addExamp(){
                this.$axios.addExample({
                    name:'梁朝伟4',
                    // type:'infj'
                    vote:'**t*'
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
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
        goVote(){
                this.$axios.goVote({
                    eid:'5aaf77710bab4c1fecf96ff7',
                    vote:'***j'
                    // name:'旭',//.."5aaf4bcf1e658b07c063c14a", name: "张旭5"
                    // id:'5aaf4bcf1e658b07c063c14a'
                }).then(res=>{
                    if(res.data.success){
                        console.log(res.data);
                    }else{
                        console.log(res.data)
                    }
                }).catch(res=>{})

        },
    }
    
};
</script>
<style lang="less">
.example {
}

</style>
    