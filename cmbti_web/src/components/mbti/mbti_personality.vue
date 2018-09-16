<template>
<div class="personality">
        <ul class="types-menu">
                <li v-for="(v,i) in $mbti.types" :key="i" :class="'item '+($route.path.split('/')[3]===v?'active':'')">
                    <router-link :to="'/mbti/personality/'+v">
                        {{v.toUpperCase() }}
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
            this.id = this.$route.path.split('/')[3]
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
.personality {
    position: relative;
    ul.types-menu {
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            .item {
                font-size:17px;
                flex:0 0 11%;
                height:30px;
                line-height: 28px;
                border-radius:15px;
                border:1px solid rgba(14, 149, 157,0.6);
                margin:3px;
                text-align: center;
                &:hover {
                    box-shadow:0px 0px 2px #0e959d;
                    a {
                        // color:#05696f;
                    }
                }
                a {
                    color: rgba(14, 149, 157,0.86);
                    display:block;
                    height:100%;
                }
            }
            .item.active {
                background-color: rgba(14, 149, 157,0.99);
                box-shadow:0px 0px 2px #0e959d;
                a {
                    color:#fff;
                    font-weight:600;
                }

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
                margin:-3px;
                .item {
                    flex:0 0 22%;
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
    