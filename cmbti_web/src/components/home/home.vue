<template>
    <div class="home">
        <div class="h-poster">

        </div>
        <div class="h-main">
            <div class="h-tab">
                <ul>
                    <li>MBTI是什么</li>
                    <li>MBTI发展历程</li>
                    <li>MBTI于个人的意义</li>
                    <li>XMBTI的初衷</li>
                </ul>
                <div>

                </div>
            </div>
            <Me></Me>
        </div>
    </div>
</template>
<script>
import Me from './home_index'
export default {
    components:{
        Me
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
        max-width:997px;
        margin:0 auto;
    }
}
</style>


