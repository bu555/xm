<template>
<div class="forum">
    <div class="forum-main-box">
        <router-view></router-view>

    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 5" style="color:#fefefe">
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
    watch:{
    },
    created(){
    }
    
};
</script>
<style lang="less">
@bg:rgba(255,255,255,.75);
.forum {
    max-width:1180px;
    margin:12px auto;
    position: relative;
    display:flex;
    .forum-main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
    }
    .aside-box {
        flex:0 0 333px;
        margin-left:12px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:15px;
            margin:0 0 10px;
        }
    }
    a:hover {
        text-decoration:underline;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .forum-main-box {

        }
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }
    }
    @media screen and (max-width:525px) {
        .forum-main-box {
        }
    }
}

</style>
    