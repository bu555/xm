<template>
    <div class="aside-comp">
        <mbtiComp></mbtiComp>
    </div>
</template>
<script>
import mbtiComp from '@/components/common/aside/aside_mbti'
export default {
    data(){
        return {

        }
    },
    components:{
        mbtiComp
    },
    methods:{
        init(){
            let path = this.$route.path
            if(/^\/mbti/.test(path)){
                console.log('mbti');
            }else if(/^\/example/.test(path)){
                console.log('example');
            }else if(/^\/forum/.test(path)){
                console.log('forum');
            }
        }
    }
}
</script>
<style lang="less">
.aside-comp{
    width:280px;
    margin:0 auto;
    ul {
        li {
            margin-bottom:10px;
            height:44px;
            line-height:44px;
            border-radius:5px;
            padding-left:1.8em;
        }
        li:nth-of-type(1){
            background-color: #f39483;
            color:#fff;
        }
        li:nth-of-type(2){
            background-color: #f3e0bf;
            color:#bd9041;
        }
        li:nth-of-type(3){
            background-color: #c3e4de;
            color:#5f968e;
        }
        li:nth-of-type(4){
            background-color: #b9d6eb;
            color:#4e86a7;
        }
    }
    @media screen and (max-width:992px){
        width:280px;

    }
}
</style>


