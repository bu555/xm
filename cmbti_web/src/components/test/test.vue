<template>
<div class="test">
        <!--<myTab :tabs="tabs"></myTab>-->
        <div class="test-tab clearfix">
            <!--<div class="tabs-blank-start"></div>-->
            <div class="tabs" index="1" @click="$router.push({path:'/test/16type'})">
                16type
            </div>
            <div class="tabs" index="2" @click="$router.push({path:'/test/8func'})">
                8func
            </div>
            <div class="tabs">
                标题3
            </div>
            <div class="tabs-blank-end"></div>
        </div> 
        <div class="main-box">
            <div class="left-box">
                <router-view/>
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
            tabs:{
                '/16type':'1',
                '/8func':'2',
            },
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
            let path = this.$route.path;
            console.log(path);
            for(let key in this.tabs){
                if(path.indexOf(key)!=-1){
                    console.log(this.tabs[key]);
                    this.setTabStyle(this.tabs[key]);
                }
            }

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
        '$route.path':'chengeRoute'
    },
    mounted(){

        this.chengeRoute();
    },
    components:{
        myTab
    },
    created(){
        // let type = this.$route.query.type;
        // if(!type){
        //     this.$router.push({
        //         path:'/test/16type',
        //         query:{type:'16type'}
        //     });
        //     type = '16type';
        // }
        // this.$router.push({
        //     path:'/test/16type'
        // });

    },
    
};
</script>
<style lang="less">
.test {
    .test-tab {
        padding-top:6px;
        display: flex; display: -webkit-flex;
        background-color: #f7f7f7;
        border-top: 1px solid #eee;
        .tabs {
            flex:0 1 157px;
            text-align: center;
            font-size:14px;
            height:25px;
            line-height: 25px;
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
                border-bottom:1px solid #fdfdfd;
            }
        }
        .tabs.active {
            background-color: #fdfdfd;
            border-bottom:1px solid #fdfdfd;
            color:#1c2633;
        }
        .tabs-blank-start {
            width:5px;
            border-bottom:1px solid #d8d9db;
        }
        .tabs-blank-end {
            flex-grow:1;
            border-bottom:1px solid #d8d9db;
        }
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
    