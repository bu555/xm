<template>
<div class="progress-component">
    <!--<el-progress :percentage="50" status="success"></el-progress>-->
    <div class="mid">
        <div class="left-count">
            <div class="count">321</div>
        </div>
        <div class="left-text">
            <div class="type">E</div>
        </div>
        <div class="left">
            <div class="left-prog" :style="'width:'+ result.e/(result.i+result.e)*100 +'%;'+'background-color:'+(result.e>result.i?bigColor:smallColor)">
                <div class="val">{{result.e}}</div>
            </div>
        </div>
        <div class="right">
            <div class="right-prog" :style="'width:'+ result.i/(result.i+result.e)*100 +'%;'+'background-color:'+(result.i>=result.e?bigColor:smallColor)">
                <div class="val">{{result.i}}</div>
            </div>
        </div>
        <div class="right-text">
            <div class="type">I</div>  
        </div>
        <div class="right-count">
            <div class="count">123</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <div class="count">321</div>
        </div>
        <div class="left-text">
            <div class="type">S</div>
        </div>
        <div class="left">
            <div class="left-prog" :style="'width:'+ result.s/(result.s+result.n)*100 +'%;'+'background-color:'+(result.s>result.n?bigColor:smallColor)">
            <!--+'proground-color:'+result.s>result.n?''-->
                  <div class="val">{{result.s}}</div>
            </div>
        </div>
        <div class="right">
            <div class="right-prog" :style="'width:'+ result.n/(result.s+result.n)*100 +'%;'+'background-color:'+ (result.n>=result.s?bigColor:smallColor)">
                  <div class="val">{{result.n}}</div>
            </div>
        </div>
        <div class="right-text">
            <div class="type">N</div>
        </div>
        <div class="right-count">
            <div class="count">123</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <div class="count">321</div>
        </div>
        <div class="left-text">
            <div class="type">T</div>
        </div>
        <div class="left">
            <div class="left-prog" :style="'width:'+ result.t/(result.t+result.f)*100 +'%;'+'background-color:'+(result.t>result.f?bigColor:smallColor)">
                  <div class="val">{{result.t}}</div>
            </div>
        </div>
        <div class="right">
            <div class="right-prog" :style="'width:'+ result.f/(result.t+result.f)*100 +'%;'+'background-color:'+(result.f>=result.t?bigColor:smallColor)">
                  <div class="val">{{result.f}}</div>
            </div>
        </div>
        <div class="right-text">
            <div class="type">F</div>            
        </div>
        <div class="right-count">
            <div class="count">123</div>
        </div>
    </div>
    <div class="mid">
        <div class="left-count">
            <div class="count">321</div>
        </div>
        <div class="left-text">
            <div class="type">J</div>
        </div>
        <div class="left">
            <div class="left-prog" :style="'width:'+ result.j/(result.j+result.p)*100 +'%;'+'background-color:'+(result.j>result.p?bigColor:smallColor)">
                  <div class="val">{{result.j}}</div>
            </div>
        </div>
        <div class="right">
            <div class="right-prog" :style="'width:'+ result.p/(result.j+result.p)*100 +'%;'+'background-color:'+(result.p>=result.j?bigColor:smallColor)">
                  <div class="val">{{result.p}}</div>
            </div>
        </div>
        <div class="right-text">
            <div class="type">P</div>            
        </div>
        <div class="right-count">
            <div class="count">123</div>
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
            bigColor:'#6ac342',
            smallColor:'#b0b7b1',
        }
    },
    props:[
        'result'
    ]
    
};
</script>
<style lang="less">
@progressHeight:15px;
.progress-component {
    padding:20px;
    // width:300px;
    .mid {
        display: flex;
        display: -webkit-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        justify-content:center; //元素水平居中
        align-items:center; //元素垂直居中
    }
    .left,.right {
        flex: 0 0 20%;
        height:@progressHeight;
        background-color: #eeeeee;
        // background-color: #dddddd;
        border-radius:@progressHeight/2 0 0 @progressHeight/2;
        .val {
            // transition：属性名 总时长 延迟 时间函数
            transition: 'display'; 
            z-index:999;
            display:none;
        }
        &:hover {
            .val {
                display:block;
            }
        }
    }
    .right {
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
    }
    .left-text,.right-text {
        flex: 0 0 10%;
        height:@progressHeight*2;
        background-color:pink;
        .type {
            line-height: @progressHeight*2;
            text-align:right;
            padding-right:20px;
            // font-size:12px;
        }
    }
    .right-text .type {
        text-align: left;
        padding-left:20px;
    }
    .left-count,.right-count {
        flex: 0 0 15%;
        height:@progressHeight*2;
        background-color:skyblue;
        // .type {
        //     line-height: @progressHeight*2;
        //     text-align:right;
        //     padding-right:20px;
        //     // font-size:12px;
        // }

    }
    // 进度条
    .left-prog,.right-prog {
        height: @progressHeight;
    }
    .left-prog {
        background-color: #f1f1f1;
        float:right;
        border-radius:@progressHeight/2 0 0 @progressHeight/2;
        position:relative;
        .val {
            position: absolute;
            left:-1px;
            top:0;
            font-size:12px;
            transform:translateX(-50%);
            -webkit-transform:translateX(-50%);
            -moz-transform:translateX(-50%);
            -ms-transform:translateX(-50%);
            -o-transform:translateX(-50%);
        }
    }
    .right-prog {
        float:left;
        background-color: #6ac342;
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
        position:relative;
        .val {
            position: absolute;
            right:-1px;
            top:0;
            font-size:12px;
            transform:translateX(50%);
            -webkit-transform:translateX(50%);
            -moz-transform:translateX(50%);
            -ms-transform:translateX(50%);
            -o-transform:translateX(50%);
        }
    }

}
</style>
    