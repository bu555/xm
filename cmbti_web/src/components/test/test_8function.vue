<template>
<div class="test-8function">
    8function
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

                
                </div>
                <div class="btn">
                    <el-button type="primary" round @click="submitTest()">提 交</el-button>
                </div>
            </div>
</div> 
</template>
<script>
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
            result:[

            ]
        }
    },
    methods:{
        submitTest(){
            console.log(this.result);
        }
    },
    created(){
        //将qid添加到result,和res映射，统计时使用
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
.test-8function {
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
                // .el-radio__input.is-checked+.el-radio__label {
                //     color: #538dd5;
                // }
                // .el-radio__input.is-checked .el-radio__inner {
                //     background: #538dd5;
                // }
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

</style>
    