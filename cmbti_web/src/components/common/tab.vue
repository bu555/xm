<template>
<div class="my-tab clearfix">
    <div class="tabs-blank-start"></div>
    <div class="tabs" v-for="(v,i) in tabs" :key="i" :data-type="v.type" @click="clickHandle(v.type)">
        {{v.title}}
    </div>
    <!--<div class="tabs-blank-end"></div>-->
</div> 
</template>
<script>
export default {
    data(){
        return {
            // activeIndex:'0',
            tabs:[
                {
                    type:'default',
                    title:'默認'
                },
                {
                    type:'enfj',
                    title:'ENFJ'
                },
                {
                    type:'enfp',
                    title:'ENFP'
                },
                {
                    type:'infj',
                    title:'INFJ'
                },
                {
                    type:'infp',
                    title:'INFP'
                },
                {
                    type:'entj',
                    title:'ENTJ'
                },
                {
                    type:'entp',
                    title:'ENTP'
                },
                {
                    type:'intj',
                    title:'INTJ'
                },
                {
                    type:'intp',
                    title:'INTP'
                },
                {
                    type:'estj',
                    title:'ESTJ'
                },
                {
                    type:'estp',
                    title:'ESTP'
                },
                {
                    type:'istj',
                    title:'ISTJ'
                },
                {
                    type:'istp',
                    title:'ISTP'
                },
                {
                    type:'esfj',
                    title:'ESFJ'
                },
                {
                    type:'esfp',
                    title:'ESFP'
                },
                {
                    type:'isfj',
                    title:'ISFJ'
                },
                {
                    type:'isfp',
                    title:'ISFP'
                }
            ]
        }
    },
    methods:{
        //設置激活样式
        setActiveStyle(type){
            document.querySelectorAll('.tabs').forEach(v=>{
                if(v.getAttribute('data-type')===type){
                    console.log("等于");
                    v.classList.add('active');
                }else{
                    v.classList.remove('active');
                }
            })
        },
        clickHandle(type){
            let currentType = this.$route.query.type;
            if(type!=this.$route.query.type){
                this.$router.push({query:{type:type}});
                this.setActiveStyle(type);
            }
        },

    },
    mounted(){
        this.setActiveStyle(this.$route.query.type);
    }
};
</script>
<style lang="less">
@tabHeight:20px;
.my-tab {
    padding-top:6px;
    display: flex;
    display: -webkit-flex;
    flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
    background-color: #f7f7f7;
    border-top: 1px solid #eee;
    
    &>div {
        // flex:0 0 auto;
    }
    .tabs {
        flex:1;
        height:@tabHeight;
        line-height:@tabHeight+4px ;
        text-align: center;
        font-size:13px;
        border-radius: 14px 14px 0 0;
        border:1px solid #d8d9db;
        position: relative;
        background-color: #f5f7fa;
        color:#72748a;
        cursor:pointer;
        margin:0 3px;
        // margin-bottom:10px;
        &:after {
            content:'';
            width:5px;
            border-bottom:1px solid #d8d9db;
            position: absolute;
            bottom:-1px;
            left:-5px;

        }
        &:before {
            content:'';
            width:5px;
            border-bottom:1px solid #d8d9db;
            position: absolute;
            bottom:-1px;
            right:-5px;

        }
        &:hover {
            background-color: #fefefe;
            border-bottom:none;
        }
    }
    .tabs.active {
        background-color: #fdfdfd;
        border-bottom:1px solid #fdfdfd;
        color:#1c2633;
    }
    .tabs-blank-start {
        width:5px;
        height:@tabHeight+1px;
        border-bottom:1px solid #d8d9db;
    }
    .tabs-blank-end {
        // flex:1;
        width:100%;
        height:@tabHeight+1px;
        border-bottom:1px solid #d8d9db;
    }
    

}

</style>
    