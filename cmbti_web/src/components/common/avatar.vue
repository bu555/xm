<template>
    <div id="my-active">
        <router-link :to="'/info/'+uid" v-if="uid" >
        <img :src="src?$pathAvatar+src:'/static/img/logo_a.png'" alt="" :class="className">
        </router-link>
        <img v-if="!uid" :src="src?$pathAvatar+src:'/static/img/logo_a.png'" alt="" :class="className">
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
    #my-active{
        display:inline-block;
        img {
            display:inline-block;
            width:98px;
            height:98px;
            border-radius:8%;
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

