<template>
<div class="func-8">
        <ul class="types-menu">
                <li v-for="(v,i) in $mbti.f8" :key="i" :class="'item '+($route.path.split('/')[2]===v?'active':'')" :style="'background-image:url(/static/img/'+v+'_btn.jpg)'">
                    <router-link :to="'/functions/'+v">
                        {{v[0].toUpperCase()+v[1] }}
                    </router-link>
                </li>

        </ul>
        <div class="content">
            <img class="func-img" :src="'/static/img/'+id+'.jpg'" alt="">
            <div v-html="f8[id]"></div>
        </div>
</div> 
</template>
<script>
import f8 from './f8'
export default {
    data(){
        return {
            id:'',
            f8:f8
        }
    },
    components:{
    },
    watch:{
        '$route.path':'getId'
    },
    methods:{
        getId(){
            this.id = this.$route.path.split('/')[2]
        }
    },
    mounted(){

    },
    created(){
        this.getId()
    },
    
};
</script>
<style lang="less">
.func-8 {
    position: relative;
    ul.types-menu {
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            .item {
                flex:0 0 11%;
                height:38px;
                line-height: 38px;
                color:#3e4652;
                border-color:#fff;
                background-color: lime;
                margin:3px;
                text-align: center;
                a:hover {
                    text-shadow:1px 1px 1px #4b647b
                    // font-size:18px;
                }
                a {
                    display:block;
                    height:100%;
                }
            }
            .item.active a {
                text-shadow:1px 1px 1px #4b647b;

            }
    }
    .content {
        // padding:3%;
        padding-top:5%;
        background-color: #fff;
        img.func-img {
            display:block;
            max-width:400px;
            height:auto;
            margin:0px auto 15px;
        }
    }
    @media screen and (max-width:768px){
        }
    @media screen and (max-width:500px){
        ul.types-menu {
                .item {
                    flex:0 0 20%;
                }
        }
        .content {
            img.func-img {
                width:100%;
            }
        }
    }
}

</style>
    