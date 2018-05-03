<template>
<div class="test-16type">
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
                    <div class="title">{{v.q}}</div>
                    <template>
                        <el-radio v-model="v.res" :label="v.at">{{v.a}}</el-radio><br/>
                        <el-radio v-model="v.res" :label="v.bt">{{v.b}}</el-radio>
                    </template>
                </div>
            </div>

</div> 
</template>
<script>
import {type16} from './question.js'
import mySelect from "./select"
import mbti93 from './q_mbti93'
export default {
    data(){
        return {
            mbti93:[],
            res93:[],
            list:'',
            result:{},
            clacRes:{
                e:0,
                i:0,
                s:0,
                n:0,
                t:0,
                f:0,
                j:0,
                p:0
            }
        }
    },
    methods:{
        submitTest(){

            let result = Object.assign({
                date:Date.now(),
                user:'123456'
            },{
                res:this.result
            })
            console.log(this.result);
            // this.$router.push({ query:{
            //     result:JSON.stringify(result)
            // } });
            // 计算结果
            for(let key in this.result){
                let val = this.result[key];
                if(key.indexOf('e') !== -1){
                    val>0? this.clacRes.e=this.clacRes.e+val:this.clacRes.i=this.clacRes.i-val
                }else if(key.indexOf('i') !== -1){
                    val>0? this.clacRes.i=this.clacRes.i+val:this.clacRes.e=this.clacRes.e-val
                }else if(key.indexOf('s') !== -1){
                    val>0? this.clacRes.s=this.clacRes.s+val:this.clacRes.n=this.clacRes.n-val
                }else if(key.indexOf('n') !== -1){
                    val>0? this.clacRes.n=this.clacRes.n+val:this.clacRes.s=this.clacRes.s-val
                }else if(key.indexOf('t') !== -1){
                    val>0? this.clacRes.t=this.clacRes.t+val:this.clacRes.f=this.clacRes.f-val
                }else if(key.indexOf('f') !== -1){
                    val>0? this.clacRes.f=this.clacRes.f+val:this.clacRes.t=this.clacRes.t-val
                }else if(key.indexOf('j') !== -1){
                    val>0? this.clacRes.j=this.clacRes.j+val:this.clacRes.p=this.clacRes.p-val
                }else if(key.indexOf('p') !== -1){
                    val>0? this.clacRes.p=this.clacRes.p+val:this.clacRes.j=this.clacRes.j-val
                }
            }
            console.log(this.clacRes);
            console.log(this.clacRes);
            this.$router.push({
                path:'/test/type16/report',
                query:{
                    result:JSON.stringify(this.clacRes)
                }
            })
        }

    },
    created(){
        this.list = type16;
        console.log('格式化',this.$moment().format('YYYY-MM-DD hh:mm:ss'));

        this.mbti93 = mbti93
        // this.res93 


    },
    components:{
        mySelect
    }
    
};
</script>
<style lang="less">
.test-16type {
        max-width:960px;
        margin:0 auto;
        .left-box {
            flex-grow:1;
            flex-basis:70%;
            min-height:255px;
            // border:1px solid #eee;
            .test-list {
                padding:10px;
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
        .el-radio__label {
            font-size: 13px;
        }
        
}

</style>
    