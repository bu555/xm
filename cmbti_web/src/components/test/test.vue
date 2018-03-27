<template>
<div class="test">
        <myTab :tabs="tabs"></myTab>
        <div class="main-box">
            <div class="left-box">
                <div class="test-list">
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
                    <!--<div class="t-items">
                        <div class="question">
                            1、矿池有：
                        </div>
                        <div class="answer">
                            <template>
                                <el-radio v-model="radio1" label="1">备选项</el-radio><br/>
                                <el-radio v-model="radio1" label="2">备选项</el-radio>
                            </template>
                        </div>
                    </div>-->
                </div>
                <div class="btn">
                    <el-button type="primary" round @click="submitTest()">提 交</el-button>
                </div>
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
            // tab导航条内容
            tabs:[
                {
                    type:'16type',
                    title:'16Test'
                },
                {
                    type:'rg',
                    title:'RGTest'
                },
                {
                    type:'functions',
                    title:'Function'
                },
       
            ],
            result:[

            ]
        }
    },
    methods:{
        submitTest(){
            console.log(this.result);
        }
    },
    components:{
        myTab
    },
    created(){
        let type = this.$route.query.type;
        if(!type){
            this.$router.push({query:{type:'16type'}});
            type = '16type';
        }
        //将qid添加到result
        this.questionList.forEach(v=>{
            this.result.push({
                id:v.qid,
                res:''
            })
        })

    },
    
};
</script>
<style lang="less">
.test {
    //修改tabs组件样式
    .my-tab .tabs {
        flex-grow:0;
        flex-basis:152px; //宽度固定
        height:30px;
        line-height: 30px;
    }
    .tabs-blank-end {
        flex-grow:1; //自身占满一行
    }
    .tabs-blank-start,.tabs-blank-end {
        height:31px !important;
        line-height: 31px !important;

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
    