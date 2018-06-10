<template>
<div class="test">
    <div class="main-box">
        <div class="test-list">
            <div class="item">
                <div class="icon">
                    <router-link to="/test/personality">
                        <img src="../../../static/img/test_icon.jpg" alt="">
                    </router-link>
                </div>
                    <div class="title">
                <router-link to="/test/personality">
                        16型人格测试
                </router-link>
                    </div>
            </div>
            <div class="item">
                <div class="icon">
                    <router-link to="/test/function">
                        <img src="../../../static/img/test_icon.jpg" alt="">
                    </router-link>
                </div>
                <div class="title">
                <router-link to="/test/function">
                    八维功能测试
                </router-link>
                </div>
            </div>
            <div class="item" v-for="i in 5">
                <div class="icon">
                    <router-link to="/test/mbti93">
                        <img src="../../../static/img/test_icon.jpg" alt="">
                    </router-link>
                </div>
                <div class="title">
                <router-link to="/test/mbti93">
                MBTI93
                </router-link>
                </div>
            </div>
        </div>
        <!--<div class="item">
            <div class="icon">
                <img src="../../../static/img/test_icon.jpg" alt="">
            </div>
            <div class="title">16型人格测试</div>
            <div class="info" v-html="'16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格'"> </div>
        </div>-->
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
    .test-list {
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        justify-content:flex-start;
        flex-wrap:wrap;
        min-height:230px;
        padding:2.5%;
        .item {
            flex:0 0 25%;
            border:1px solid #eee;
            border-radius:5px;
            background-color: #fff;
            padding:20px 10px;
            max-height:300px;
            .icon {
                width:100%;
                // height:100%;
                // width:50%;
                margin:0 auto;
                text-align: center;
                img {
                    // display:block;
                    width:50%;
                    margin:0 auto;
                    // height:auto;
                }
            }
            .title {
                font-size:18px;
                text-align: center;
                padding-top:4%;
            }
            .info {
                padding:3%;
            }

        }

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
        .test-list {
        }
    }
    @media screen and (max-width:525px){
        .test-list {
            .item {
                flex:0 0 50% ;
            }
        }
    }
}

</style>
    