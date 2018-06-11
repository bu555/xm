<template>
<div class="person-type">
    <div class="main-box">
        <!--<div class="types-animation">
            16类型旋转动图
        </div>-->
        <div class="types-menu">
            <!--NT NF SP SJ-->
            <div>
                <div class="head">
                    <router-link to="">NT</router-link>
                </div>
                <div class="item">
                    <router-link to="">ENTJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ENTP</router-link>
                </div>
                <div class="item">
                    <router-link to="">INTJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">INTP</router-link>
                </div>
            </div>
            <div>
                <div class="head">
                    <router-link to="">NF</router-link>
                </div>
                <div class="item">
                    <router-link to="">ENFJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ENFP</router-link>
                </div>
                <div class="item">
                    <router-link to="">INFJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">INFP</router-link>
                </div>
            </div>
            <div>
                <div class="head">
                    <router-link to="">SJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ESFJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ESTJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ISFJ</router-link>
                </div>
                <div class="item">
                    <router-link to="">ISTJ</router-link>
                </div>
            </div>
            <div>
                <div class="head">
                    <router-link to="">SP</router-link>
                </div>
                <div class="item">
                    <router-link to="">ESFP</router-link>
                </div>
                <div class="item">
                    <router-link to="">ESTP</router-link>
                </div>
                <div class="item">
                    <router-link to="">ISFP</router-link>
                </div>
                <div class="item">
                    <router-link to="">ISTP</router-link>
                </div>
            </div>

        </div>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 3">
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
    components:{
    },
    methods:{

    },
    watch:{

    },
    mounted(){

    },
    created(){
    },
    
};
</script>
<style lang="less">
.person-type {
    max-width:1100px;
    margin:12px auto;
    position: relative;
    padding-right:332px;
    padding-top:0px;
    // display:flex;
    .main-box {
        margin-bottom:12px;
        width:100%;
        background-color: #fff;
        .types-animation {
            height: 220px;
            background-color: skyblue;
        }
        .types-menu {
            display:flex;
            padding:20px 0;
            &>div {
                flex:0 0 25%;
                padding-left:5%;
                padding-right:5%;
                // border:1px solid #ccc;
                // text-align:center;
                .head {
                    font-size:22px;
                    font-weight:700;
                    border-bottom:1px solid #f29899;
                }
                .item {
                    height:32px;
                    line-height: 32px;;
                }
            }
        }
    }
    .aside-box {
        width:320px;
        position: absolute;
        right: 0;
        top: 0;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .aside-box {
            position: relative;
            width:100%;
        }
    }
    @media screen and (max-width:525px){

        .main-box {

        }
    }
}

</style>
    