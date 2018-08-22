<template>
<div class="home">
    <div class="h-main">
        <ul class="h-tab">
                <li>
                    <router-link to="/">MBTI理论</router-link></li>
                <li>
                    <router-link to="/personalities">人格类型</router-link></li>
                <li>
                    <router-link to="/functions">认知功能</router-link></li>
        </ul>
        <router-view></router-view>
        
    </div>
</div>
</template>
<script>
export default {
    components:{

    }
}
</script>
<style lang="less">
.home {
    background-color: #fff;
    .h-poster {
        height:239px;
        background-color: #eee;;
    }
    .h-main {
        max-width:800px;
        margin:0 auto;
        padding:3%;
        // background-color: #eee;
        // padding-right:290px;
        ul.h-tab {
            display:flex;
            padding:1em 0;
            li {
                padding:0 1em;
                border-right:1px solid #eee;
                text-align: center;
            }
        }
    }

    @media screen and (max-width:500px){
        .h-main {
            ul.h-tab li {
                padding:0 ;
                flex:1;
            }
        }
    }

}
</style>


