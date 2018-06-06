<template>
<div class="type">
    <div class="main-box">
        <h2>16种性格类型的档案</h2>
        <ua></ua>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 5">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>
</div> 
</template>
<script>
import ua from '../my/upload_avatar'
export default {
    data(){
        return {

        }
    },
    components:{
        ua
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    created(){
    },
    
};
</script>
<style lang="less">
.type {
    max-width:1180px;
    margin:12px auto;
    position: relative;
    display:flex;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
    }
    .aside-box {
        flex:0 0 342px;
        margin-left:12px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }
        .test-list {
        }
    }
    @media screen and (max-width:500px){

    }
}

</style>
    