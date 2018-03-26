<template>
<div class="vote_result">
    <!--<el-progress :percentage="50" status="success"></el-progress>-->
    <div class="mid" v-for="(v,i) in res" :key="i">
        <div class="left-count">
            <div class="count">{{v.l_val}}人</div>
        </div>
        <div class="left-text">
            <div class="type">{{v.l}}</div>
        </div>
        <div class="left">
            <div class="left-prog" :style="'width:'+ v.l_val/(v.l_val+v.r_val)*100 +'%;'+'background-color:'+(result.e>result.i?bigColor:smallColor)">
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right">
            <div class="right-prog" :style="'width:'+ v.r_val/(v.l_val+v.r_val)*100 +'%;'+'background-color:'+(result.i>=result.e?bigColor:smallColor)">
            </div>
        </div>
        <div class="right-text">
            <div class="type">{{v.r}}</div>  
        </div>
        <div class="right-count">
            <div class="count">{{v.r_val}}人</div>
        </div>
    </div>
   
    <div class="count-vote" style="padding-top:8px;font-size:13px">
        共 {{count}} 人参与
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return{
            bigColor:'#6ac342',
            smallColor:'#6ac342',
            res:[],
            count:0
        }
    },
    props:[
        'result'
    ],
    created(){
        this.count = this.result.voteLog.length;
        this.result = this.result.vote;
            this.res =  [
                {
                    l:'E',
                    l_val:this.result.e,
                    r:'I',
                    r_val:this.result.i
                },
                {
                    l:'S',
                    l_val:this.result.e,
                    r:'N',
                    r_val:this.result.i
                },
                {
                    l:'T',
                    l_val:this.result.t,
                    r:'F',
                    r_val:this.result.f
                },
                {
                    l:'J',
                    l_val:this.result.j,
                    r:'P',
                    r_val:this.result.p
                }
            ]
            console.log('res',this.res);
            // let temp1 = (this.result.e + this.result.i)>(this.result.s + this.result.n)?(this.result.e + this.result.i):(this.result.s + this.result.n);
            // let temp2 = (this.result.t + this.result.j)>(this.result.j + this.result.p)?(this.result.e + this.result.i):(this.result.s + this.result.n);
    },
    methods:{
    }
    
};
</script>
<style lang="less">
@progressHeight:15px;
@progressColor:#6ac342;
.vote_result {
    padding-top:10px;
    // width:300px;
    .mid {
        display: flex;
        display: -webkit-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        justify-content:center; //元素水平居中
        align-items:center; //元素垂直居中
        // 子元素
        // flex属性默认是0 1 auto 
        // flex-grow为0，则存在剩余空间也不放大 
        // flex-shrink为1，则空间不足该项目缩小 
        // flex-basis为auto，则该项目本来的大小 
    }
    // 进度条
    .left,.right {
        flex: 0 0 20%;
        height:@progressHeight;
        background-color: #eeeeee;
        // background-color: #dddddd;
        border-radius:@progressHeight/2 0 0 @progressHeight/2;
            
    }
    .right {
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
        &:hover {
            .right-prog {
                // box-shadow:1px 0px 5px #666;
            }
        }
    }
    .left {
        &:hover {
            .left-prog {
                // box-shadow:-1px 0px 5px #478a2a;
            }
        }
    }
    .left-text {
        &:hover {
            .left-prog {
                // box-shadow:-1px 0px 5px #478a2a;
            }
        }
    }
    //中间线
    .middle-line {
        width:1px;
        height:@progressHeight;
        flex: 0 1 auto;
        background-color:@progressColor;
    }
    // 类型
    .left-text,.right-text {
        width:22px;
        flex: 0 1 auto;
        height:@progressHeight*2;
        .type {
            // background-color:pink;
            line-height: @progressHeight*2;
            text-align:center;
            color:#272822;
            font-weight:700;
            // font-size:12px;
        }
    }
    // 每个维度的投票数
    .left-count,.right-count {
        flex: 0 0 20%;
        height:@progressHeight*2;
        // background-color:skyblue;
        color:#ccc;
        .count {
            line-height: @progressHeight*2;
            text-align:right;
            font-size:12px;
            padding-right:3px;
        }
    }
    .right-count .count {
        text-align: left;
        padding-left:3px;
    }
    // 进度条
    .left-prog,.right-prog {
        height: @progressHeight;
    }
    .left-prog {
        background-color: @progressColor;
        float:right;
        border-radius:@progressHeight/2 0 0 @progressHeight/2;
    }
    .right-prog {
        float:left;
        background-color: @progressColor;
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
    }

}
</style>
    