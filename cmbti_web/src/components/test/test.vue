<template>
<div class="test">
        <myTab :tabs="tabs"></myTab>
        <div class="main-box">
            <div class="left-box">
                <myType16 v-if="this.currentType==='type16'"></myType16>
                <myMid8 v-if="this.currentType==='mid8'"></myMid8>
                <!--<div class="test-list">
                    <div class="t-items" v-for="(v,i) in questionList" :key="i">
                        <div class="question">
                            {{i+1}}、{{v.question}}{{v.qid}}
                        </div>
                        <div class="answer">
                            <template>
                                <el-radio v-model="result[i].res" label="a">{{v.l}}</el-radio><br/>
                                <el-radio v-model="result[i].res" label="b">{{v.r}}</el-radio>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" round @click="submitTest()">提 交</el-button>
                </div>-->
            </div>
            <div class="right-box">

            </div>
        </div>
</div> 
</template>
<script>
import myTab from '../common/tab'
import myMid8 from './mid8'
import myType16 from './type16'
export default {
    data(){
        return {
            questionList:[
                {
                    qid:'jp5',
                    question:'你习惯于：',
                    l:'A．及时处理不愉快的事情，务求把它们抛诸脑后。',
                    r:'B．暂时放下不愉快的事情，直至有心情时才处理。',
                    remark:28
                },
                {
                    qid:'jp6',
                    question:'你喜欢的工作是：',
                    l:'A．需要定出目标，然后逐步实现，井井有条的。',
                    r:'B．需要迅速和即时做出反应，没有过多约束的。',
                    remark:28
                },
            ],  
            // tab和路由映射
            // tabs:{
            //     '/16type':'1',
            //     '/8func':'2',
            // },
            // tab导航条内容
            currentType:'',
            tabs:[
                {
                    type:'type16',
                    title:'16型'
                },
                {
                    type:'mid8',
                    title:'八维功能'
                }
            ],
            result:[

            ]
        }
    },
    methods:{
        submitTest(){
            console.log(this.result);
            this.$router.push({
                path:'/test/result'
            })
        },
        chengeRoute(){
            this.currentType = this.$route.query.type;

        },
        //设置tab激活样式
        setTabStyle(index){
            let tabs = document.querySelectorAll('.test .tabs');
            tabs.forEach(v=>{
                if(v.getAttribute('index')===index){
                    v.classList.add('active');
                }else{
                    v.classList.remove('active');
                }
            })
        }
    },
    watch:{
        '$route.query':'chengeRoute'
    },
    mounted(){

        this.chengeRoute();
    },
    components:{
        myTab,
        myMid8,
        myType16

    },
    created(){
        this.currentType = this.$route.query.type;
        if(!this.currentType){
            this.$router.push({
                query:{type:'type16'}
            });
            this.currentType = 'type16';
        }
    },
    
};
</script>
<style lang="less">
.test {
    .my-tab .tabs {
        flex:0 1 150px;
        height:28px;
        line-height: 28px;
    }
    .my-tab .tabs-blank-start {
        height:29px
    }
    .my-tab .tabs-blank-end {
        flex:1;
        height:29px;
    }
    .main-box {
        display: flex; display: -webkit-flex;display: -ms-flex;
        padding-top:12px;
        .left-box {
            flex-grow:1;
            flex-basis:70%;
            min-height:255px;
            border:1px solid #eee;
            .test-list {
                padding:15px 40px;
                .answer {
                    padding-left:20px;
                    padding-top:5px;
                }
                .el-radio {
                    margin:5px;
                }
                .t-items {
                    padding:6px 0;
                }
                .el-radio__input.is-checked+.el-radio__label {
                    color: #538dd5;
                }
                .el-radio__input.is-checked .el-radio__inner {
                    background: #538dd5;
                }
            }
            .btn {
                text-align:center;
                margin:20px;
                .el-button.is-round {
                    padding:10px 32px;
                }
            }
            
        }
        .right-box {
            flex-grow:1;
            flex-basis:30%;
            min-height:255px;
            border:1px solid #eee;

        }
        
    }

}

</style>
    