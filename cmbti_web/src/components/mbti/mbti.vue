<template>
<div class="mbti">
    <NavMain></NavMain>
    <NavSub :data="data"></NavSub>
    <div class="main-box">
        <router-view></router-view>
        <!-- 推荐的内容 -->
        <div class="recommend">
            <h2>推荐</h2>
            <ul>
                <li v-for="(v,i) in 7" :key="i">
                    <router-link :to="'/forum/'+i"><i class="el-icon-document"></i> {{'INTP人格类型：思想者与追求者INTP人格类型：思想者与追求者INTP人格类型：思想者与追求者'}}</router-link>
                </li>
            </ul>
        </div>
        
    </div>
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
                        link:'/mbti/function/si'
                    },
                    {
                        value:'认知功能',
                        link:'/mbti/function/si'
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
    .main-box {   
        max-width:970px;
        margin:12px auto;
        padding-right:300px;
        position: relative;   
        // 右侧推荐区
        .recommend {
            width:275px;
            // border:1px solid #f7f7f7;
            position:absolute;
            right:12px;
            top:10px;
            padding:0 12px 12px;
            margin-bottom:12px;
            h2 {
                font-size:15px;
                margin-bottom:6px;
                padding-bottom:4px;
                color:#0e959d;
                // font-weight:600;
                border-bottom:1px solid #f1f1f1;
            }
            ul{
                li {
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    overflow:hidden;
                    margin-bottom:3px;
                    a {
                        color:#b4b4b4;
                        font-size:14px;
                        &:hover {
                            color:#0e959d;
                        }
                        i {
                            color:#0e959d;

                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 12px;            // 右侧推荐区
            .recommend {
                width:100%;
                position:relative;
                right:0px;
                top:0;
                padding:0;
            }
        }
    }
    @media screen and (max-width:500px){
        .x-nav-sub ul.nav-list.in-top li {
            position: relative;
            &:after {
                content:"";
                display:block;
                height:3px;
                width:3px;
                background-color: #aaa;
                position: absolute;
                top:11px;
                left:-10px;
                border-radius:50%;
            }
        }
    }

}

</style>
    