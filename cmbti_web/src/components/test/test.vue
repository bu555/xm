<template>
<div class="test bx">
    <nav class="nav">
        <div class="item">
            <div class="icon">
                <router-link to="/test/type16">
                    <img src="../../../static/img/test_icon.jpg" alt="">
                </router-link>
            </div>
            <router-link to="/test/type16">
                <div class="title">
                    16型人格测试
                </div>
            </router-link>
            <div class="info" v-html="'16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格'"> </div>
        </div>
        <div class="item">
            <div class="icon">
                <router-link to="/test/mid8">
                    <img src="../../../static/img/test_icon.jpg" alt="">
                </router-link>
            </div>
            <router-link to="/test/mid8">
            <div class="title">
                八维功能测试
            </div>
            </router-link>
            <div class="info" v-html="'16人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格'"> </div>
        </div>
        <div class="item">
            <div class="icon">
                <router-link to="/test/mbti93">
                    <img src="../../../static/img/test_icon.jpg" alt="">
                </router-link>
            </div>
            <router-link to="/test/mbti93">
            <div class="title">
               MBTI93
            </div>
            </router-link>
            <div class="info" v-html="'16人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人6人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格'"> </div>
        </div>

        <!--<div class="item">
            <div class="icon">
                <img src="../../../static/img/test_icon.jpg" alt="">
            </div>
            <div class="title">16型人格测试</div>
            <div class="info" v-html="'16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格16人格'"> </div>
        </div>-->
    </nav>
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
    max-width:960px;
    padding:2%;
    .nav {
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        min-height:230px;
        .item {
            padding-top:2%;
            padding-bottom:0.5%;
            border:1px solid #eee;
            border-radius:5px;
            margin:0 1%;
            flex:1;
            .icon {
                width:100%;
                // height:100%;
                // width:50%;
                margin:0 auto;
                // background-color: #ddd;
                text-align: center;
                img {
                    display:block;
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
            @media screen and (max-width:600px){
                margin:0 0.5%;
                .title {
                    font-size:.13rem;
                }
                .info {
                    font-size:.08rem;
                }

            }
        }
    }
    a:hover {
        text-decoration:none;
    }
}

</style>
    