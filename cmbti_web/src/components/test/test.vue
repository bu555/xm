<template>
<div class="x-test">
    <NavMain></NavMain>
    <NavSub :data="data"></NavSub>
    <router-view></router-view>
</div> 
</template>
<script>
import NavMain from '@/components/common/nav_main'
import NavSub from '@/components/common/nav_sub'
export default {
    components:{
        NavMain,
        NavSub
    },
    data(){
        return{
            data:{
                title:'测试',
                list:[
                    {
                        value:'MBTI职业性格测试',
                        link:'/test/mbti'
                    }
                ]

            }
        } 
    },
    methods:{
        getSearch(val){
            console.log(val);
        }
    }
    
};
</script>
<style lang="less">
.x-test {


}

</style>
    