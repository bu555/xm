<template>
    <div class="my-examp">
        <!-- <router-link :to="'/info/'+UID" v-if="UID" >
        <img :src="src?$pathAvatar+src:'/static/img/logo_a.png'" alt="" :class="className">
        </router-link>
        <img v-else :src="src?$pathAvatar+src:'/static/img/logo_a.png'" alt="" :class="className"> -->

        <div class="item-box">
            <div class="type">{{v.type.toUpperCase()}}</div>
        <router-link :to="'/example/'+v._id">
            <div class="photo">
                <img :src="$pathImgs+v.img_url" alt="">
            </div>
        </router-link>
            <div class="name overflow-row-1">{{v.name==='马拉多纳'?'马拉多纳马拉多纳马拉多纳马拉多纳马拉多纳':v.name}}</div>
            <div class="info overflow-row-5">{{v.name1?v.name1:''}}{{v.info}}</div>
            <div style="height:1px"></div>
        </div>



    </div>
</template>
<script>
export default {
    data(){
        return{
            className:'',
            imgSrc:'',
            UID:''
        }
    },
    props:{
        size:{
            default: ''
        },
        src:{
            default: ''
        },
        uid:{
            default: ''
        },
        round:{
            default:false
        }
    },
    watch:{
        'uid':function(uid){
            this.UID = uid
        },
        'src':function(src){
            this.imgSrc = src
        }
    },
    methods:{
    },
    created(){
        switch(this.size){
            case 'mini':
            this.className = 'mini'
            break
            case 'small':
            this.className = 'small'
            break
            default:
            this.className = ''
            break
        }
        this.className = this.round?this.className+' round':this.className
        this.UID = this.uid
        this.imgSrc = this.src
    }
}
</script>

<style lang="less" scoped>
    .my-examp{
        display:inline-block;
        img {
            display:inline-block;
            width:98px;
            height:98px;
            border-radius:3%;
            border:1px solid #eee;
        }
        img.round {
            border-radius:50%;
        }
        img.small {
            width:38px;
            height:38px;
        }
        img.mini {
            width:28px;
            height:28px;
        }
    }
</style>

