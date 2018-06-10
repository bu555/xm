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
            <div class="info">
                <p>测试须知：</p>
                <div>
                    <p>1、本量表最初由我国心理学专家与美国东卡罗莱纳大学合作完成，1994年完成了MBTI-G人格类型量表的翻译和修订；1998 年后，又修订出版了最新的 MBTI-M人格类型量表。</p>
                    <p>2、心理成长根据新时代的语境、网络特点、以及本站的海量样本分析，对本量表进行了进一步的修订。</p>
                </div>
                <p>测试指导语：</p>
                <div>
                    <p>1、选项没有“对”与“错”之分</p>
                    <p>2、选择更接近你平时的感受或行为的那项</p>
                    <p>3、请选择你是怎么样做的，而不要选择你想要怎样、以为会怎样、或者认为哪样更好</p>
                    <p>4、性格无好坏，本量表检测你的性格倾向，而不是你的知识、技能、经验</p>
                </div>
                <div>
                    <p>本次测试共 93 题`</p>
                </div>
            </div> 
            <div class="t-line">
                <span>以下进入测试</span>
            </div>
            <div class="questions">
                <div class="item" v-for="(v,i) in mbti93" :key="i">
                    <div class="title">{{i+1}}、{{v.q}}</div>
                    <div class="radio-box" style="padding-left:20px">
                        <el-radio v-model="v.res" :label="v.at">{{v.a}}</el-radio><br/>
                        <el-radio v-model="v.res" :label="v.bt">{{v.b}}</el-radio>
                    </div>
                </div>
            </div>
            <div class="btn-ctrl">
                <el-button type="primary" round @click="submitTest()">提 交</el-button>
            </div>

</div> 
</template>
<script>
import mbti93 from './q_mbti93'
export default {
    data(){
        return {
            mbti93:[],
            res:{
                e:0,i:0,s:0,n:0,t:0,f:0,j:0,p:0
            }
        }
    },
    methods:{
        submitTest(){
            console.log(this.mbti93);
            this.mbti93.forEach((v,i)=>{
                if(v.res){
                    this.res[v.res] = this.res[v.res]+1
                    console.log(v.res);
                }
            })
            console.log(this.res);
            this.$router.push({
                path:'/test/mbti93/report',
                query:{
                    result:JSON.stringify(this.res)
                }
            })
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
    font-size:15px;
    background-color: #fff;
    margin:0px auto;
    max-width:768px;
    padding:2% 3%;
    .info {
        padding-bottom:10px;
        &>p {
            font-weight:600;
            margin-bottom:5px;
        }
        &>div>p {
            margin-bottom:4px;
            line-height: 18px;
        }
        &>div {
            padding-bottom:8px;
        }
    }
    .t-line {
        text-align:center;
        border-top:1px dotted #aaa;
        color:#777;
        font-size:15px;
        position: relative;
        span {
            position: absolute;
            top:-11px;
            left:50%;
            padding:0 5px;
            transform:translateX(-50%);
            background-color: #fff;
        }
    }
    .questions{
        margin:0 auto;
        padding-top:20px;
        padding-left:5px;
        .item {
            padding-top:12px;
            font-size:15px;
            .title {
                padding-bottom:4px;
                // text-indent:-32px;
                // padding-left:22px;

            }
            .el-radio {
                white-space:normal; 
                span {
                font-size:15px;
                }
                span.el-radio__label {
                }
                span:last-child{

                }

            }
        }
    }
    .btn-ctrl {
        text-align:center;
        padding:22px 20px;
    }

        
}

</style>
    