<template>
<div class="vote_result">
    <!--<el-progress :percentage="50" status="success"></el-progress>-->
    <div class="mid">
        <div class="left-count">
            <div class="count">{{result.e}}人</div>
        </div>
        <div class="left-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">E</div>
        </div>
        <div class="left" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="left-prog" :style="'width:'+ result.e/(result.i+result.e)*100 +'%;'+'background-color:'+(result.e>result.i?bigColor:smallColor)">
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="right-prog" :style="'width:'+ result.i/(result.i+result.e)*100 +'%;'+'background-color:'+(result.i>=result.e?bigColor:smallColor)">
            </div>
        </div>
        <div class="right-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">I</div>  
        </div>
        <div class="right-count">
            <div class="count">{{result.i}}人</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <div class="count">{{result.s}}人</div>
        </div>
        <div class="left-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">S</div>
        </div>
        <div class="left" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="left-prog" :style="'width:'+ result.s/(result.s+result.n)*100 +'%;'+'background-color:'+(result.s>result.n?bigColor:smallColor)">
            <!--+'proground-color:'+result.s>result.n?''-->
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="right-prog" :style="'width:'+ result.n/(result.s+result.n)*100 +'%;'+'background-color:'+ (result.n>=result.s?bigColor:smallColor)">
            </div>
        </div>
        <div class="right-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">N</div>
        </div>
        <div class="right-count">
            <div class="count">{{result.n}}人</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <div class="count">{{result.t}}人</div>
        </div>
        <div class="left-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">T</div>
        </div>
        <div class="left" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="left-prog" :style="'width:'+ result.t/(result.t+result.f)*100 +'%;'+'background-color:'+(result.t>result.f?bigColor:smallColor)">
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="right-prog" :style="'width:'+ result.f/(result.t+result.f)*100 +'%;'+'background-color:'+(result.f>=result.t?bigColor:smallColor)">
            </div>
        </div>
        <div class="right-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">F</div>            
        </div>
        <div class="right-count">
            <div class="count">{{result.f}}人</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <!--<div class="count">{{result.j}}人</div>-->
            <div class="count">9800000人</div>
        </div>
        <div class="left-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">J</div>
        </div>
        <div class="left" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="left-prog" :style="'width:'+ result.j/(result.j+result.p)*100 +'%;'+'background-color:'+(result.j>result.p?bigColor:smallColor)">
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="right-prog" :style="'width:'+ result.p/(result.j+result.p)*100 +'%;'+'background-color:'+(result.p>=result.j?bigColor:smallColor)">
            </div>
        </div>
        <div class="right-text" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)">
            <div class="type">P</div>            
        </div>
        <div class="right-count">
            <!--<div class="count">{{result.p}}人</div>-->
            <div class="count">1000000人</div>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return{
            // result: {e:434,i:143,s:11929,n:234434,t:3343,f:434,j:43,p:44},
            // result: {},
            bigColor:'@progressColor',
            smallColor:'@progressColor',
            // smallColor:'#ffaf4b',
        }
    },
    props:[
        'result'
    ],
    methods:{
        hoverHandle(e){
            let activeDOM = e.currentTarget;
            console.log(activeDOM.getAttribute('class'));
            if(/right/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.querySelector(".right-count").style.color = "#019a62";
                activeDOM.parentNode.querySelector(".right-count").style.fontWeight = 700;
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.querySelector(".left-count").style.color = "#019a62";
                activeDOM.parentNode.querySelector(".left-count").style.fontWeight = 700;
            }
        },
        outHandle(e){
            let activeDOM = e.currentTarget;
            if(/right/.test(activeDOM.getAttribute('class'))){
                    activeDOM.parentNode.querySelector(".right-count").style.color = "#ccc";
                    activeDOM.parentNode.querySelector(".right-count").style.fontWeight = 400;
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                    activeDOM.parentNode.querySelector(".left-count").style.color = "#ccc";
                    activeDOM.parentNode.querySelector(".left-count").style.fontWeight = 400;
                }
        },
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
        cursor:pointer;
            
    }
    .right {
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
        &:hover {
            .right-prog {
                box-shadow:1px 0px 5px #666;
            }
        }
    }
    .left {
        &:hover {
            .left-prog {
                box-shadow:-1px 0px 5px #478a2a;
            }
        }
    }
    .left-text {
        &:hover {
            .left-prog {
                box-shadow:-1px 0px 5px #478a2a;
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
    