<template>
<div class="mbti">
    <NavMain></NavMain>
    <NavSub :data="data"></NavSub>

    <router-view></router-view>
</div> 
</template>
<script>
import NavMain from '@/components/common/nav_main'
import NavSub from '@/components/common/nav_sub'
export default {
    data(){
        return {
            data:{
                title:'MBTI',
                list:[
                    {
                        value:'MBTI理论',
                        link:'/mbti/theory'
                    },
                    {
                        value:'人格类型',
                        link:'/mbti/theory'
                    },
                    {
                        value:'认知功能',
                        link:'/mbti/theory'
                    },
                ]

            }
        }
    },
    components:{
        NavMain,
        NavSub
    }
    
};
</script>
<style lang="less">
.mbti {

}

</style>
    