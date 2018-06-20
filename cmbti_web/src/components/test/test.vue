<template>
<div class="test">
    <div class="main-box">
        <router-view></router-view>
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
export default {
    data(){
        return {

        }
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    components:{

    },
    created(){
    },
    
};
</script>
<style lang="less">
.test {
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
        // right:0px;
        // top:0px;
        flex:0 0 333px;
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
    }
    @media screen and (max-width:525px){
    }
}

</style>
    