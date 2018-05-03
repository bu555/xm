<template>
<div class="test-mbti93">
            <!--<div class="radio">
                <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                    Option two can be something else and selecting it will deselect option one
                </label>
            </div>
            <div class="left-box">
                <div class="test-list">
                    <mySelect v-for="(v,i) in list" :key="i" @getRes="result[v.id]=((val)=>val)($event)" :question="(i+1)+'. '+v.question"></mySelect>  
                
                </div>
                <div class="btn">
                    <button type="button" class="btn btn-primary" @click="submitTest()">提 交</button>
                    <el-button type="primary" round @click="submitTest()">提 交</el-button>
                </div>
            </div>-->
            <div class="questions">
                <div class="item" v-for="(v,i) in mbti93" :key="i">
                    <div class="title">{{i+1}}、{{v.q}}</div>
                    <template style="">
                        <el-radio v-model="v.res" :label="v.at">{{v.a}}</el-radio><br/>
                        <el-radio v-model="v.res" :label="v.bt">{{v.b}}</el-radio>
                    </template>
                </div>
            </div>
            <el-button type="primary" round @click="submitTest()">提 交</el-button>

</div> 
</template>
<script>
import mbti93 from './q_mbti93'
export default {
    data(){
        return {
            mbti93:[],
            res93:[],
        }
    },
    methods:{
        submitTest(){
            console.log(this.mbti93);
        }

    },
    created(){

        this.mbti93 = mbti93
        // this.res93 


    },
    components:{
    }
    
};
</script>
<style lang="less">
.test-mbti93 {
        max-width:320px;
        margin:0 auto;
        padding-top:50px;
        .questions{
            .item {
                padding-top:10px;
                padding-left:22px;
                .title {
                    padding-bottom:3px;
                    text-indent: -12px;
                }
                .el-radio {
                    white-space: wrap; 
                    span.el-radio__label {
                        padding:115px;
                        text-indent:-15px;
                    }
                }
            }
        }

        
}

</style>
    