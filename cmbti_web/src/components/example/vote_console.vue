<template>
<div class="vote_console">
    <!--<el-progress :percentage="50" status="success"></el-progress>-->
    <div class="mid" v-for="(v,i) in midArr" :key="i">
        <div class="l-select">
            <div class="left-select"  @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)">
                <i class="el-icon-success i-l"></i>
            </div>
        </div>
        <div class="left-text" >
            <div class="type left-type" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)">{{v.l.toUpperCase()}}</div>
        </div>
        <div class="left">
            <div class="left-prog" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)">
            </div>
        </div>
        <div class="middle-line"></div>
        <div class="right">
            <div class="right-prog"  @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)"> </div>
        </div>
        <div class="right-text">
            <div class="type right-type" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)">{{v.r.toUpperCase()}}</div>  
        </div>
        <div class="r-select" >
            <div class="right-select" @mouseover="hoverHandle($event)"  @mouseout="outHandle($event)" @click="clickHandle($event)">
                <i class="el-icon-success i-r"></i>
            </div>
        </div>
    </div>
    <div class="result-box">
        <div class="en">{{resEn.toUpperCase()}}</div>
        <div class="ch">{{resCH}}</div>   
    </div>
    <div style="margin-top:10px">
        <el-button type="primary" @click="getResult()">投票</el-button>
        <el-button type="default" @click="getResult()">取消</el-button>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return{
            result: {e:1,i:1,s:1,n:1,t:1,f:1,j:1,p:1},
            midArr:[
                {
                    'l':'e',
                    'r':'i'
                },
                {
                    'l':'s',
                    'r':'n'
                },
                {
                    'l':'t',
                    'r':'f'
                },
                {
                    'l':'j',
                    'r':'p'
                }
            ],
            resEn:'****',
            resCH:'XX-XX-XX-XX',
        }
    },
    methods:{
        hoverHandle(e){
            let activeDOM = e.currentTarget;
            if(/right/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-r").style.color = "#8cd66b";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.backgroundColor = "#8cd66b";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.boxShadow = "-1px 0px 5px #478a2a";
                activeDOM.parentNode.parentNode.querySelector(".right-type").style.color = "#67c23a";
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-l").style.color = "#8cd66b";
                activeDOM.parentNode.parentNode.querySelector(".left-prog").style.backgroundColor = "#8cd66b";
                activeDOM.parentNode.parentNode.querySelector(".left-prog").style.boxShadow = "1px 0px 5px #478a2a";
                activeDOM.parentNode.parentNode.querySelector(".left-type").style.color = "#67c23a";
            }
        },
        outHandle(e){
            let activeDOM = e.currentTarget;
            if(/right/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-r").style.color = "#eee";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.backgroundColor = "transparent";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.boxShadow = "";
                activeDOM.parentNode.parentNode.querySelector(".right-type").style.color = "#bbb";
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-l").style.color = "#eee";
                activeDOM.parentNode.parentNode.querySelector(".left-prog").style.backgroundColor = "transparent";
                activeDOM.parentNode.parentNode.querySelector(".left-prog").style.boxShadow = "";
                activeDOM.parentNode.parentNode.querySelector(".left-type").style.color = "#bbb";
            }
        },
        clickHandle(e){
            let activeDOM = e.currentTarget;
            if(/right/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-r").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".right-prog").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".right-type").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".i-l").classList.remove('active');
                activeDOM.parentNode.parentNode.querySelector(".left-prog").classList.remove('active');
                activeDOM.parentNode.parentNode.querySelector(".left-type").classList.remove('active');
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-l").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".left-prog").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".left-type").classList.toggle('active');
                activeDOM.parentNode.parentNode.querySelector(".i-r").classList.remove('active');
                activeDOM.parentNode.parentNode.querySelector(".right-prog").classList.remove('active');
                activeDOM.parentNode.parentNode.querySelector(".right-type").classList.remove('active');
            }
            this.getResult();
        },
        getResult(){
            let result = '';
            document.querySelector('.vote_console').querySelectorAll('.type.active').forEach((v,i)=>{
                result+=v.innerHTML;
            })
            result = result.toLowerCase(result);
            let resEn = ''; let resCH = '';
            let arrCH = ['外倾-内倾','感觉-直觉','思考-情感','判断-感知'];
            ['ei','sn','tf','jp'].forEach((v,i)=>{
                if(result.indexOf(v[0]) != -1){
                    resEn+=v[0];
                    resCH+=arrCH[i].split('-')[0];
                    if(i!=3){
                        resCH+='-';
                    }
                }else if(result.indexOf(v[1]) != -1){
                    resEn+=v[1];
                    resCH+=arrCH[i].split('-')[1];
                    if(i!=3){
                        resCH+='-';
                    }
                }else{
                    resEn+='*';
                    resCH+='XX';
                    if(i!=3){
                        resCH+='-';
                    }
                }
            })
            this.resEn = resEn;
            this.resCH = resCH;
        }
    }
    
};
</script>
<style lang="less">
@progressHeight:15px;
@progressColor:#6ac342;
.vote_console {
    padding-top:10px;
    // width:300px;
    .mid {
        display: flex;
        display: -webkit-flex;
        flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
        justify-content:center; //元素水平居中
        align-items:center; //元素垂直居中
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
    // .left {
    //     &:hover {
    //         .left-prog {
    //             box-shadow:-1px 0px 5px #478a2a;
    //         }
    //     }
    // }
    // .left-text {
    //     &:hover {
    //         .left-prog {
    //             box-shadow:-1px 0px 5px #478a2a;
    //         }
    //     }
    // }
    //中间线
    .middle-line {
        width:1px;
        height:@progressHeight;
        flex: 0 1 auto;
        background-color:@progressColor;
        z-index:1000;
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
            color:#bbb;
            font-weight:700;
            cursor:pointer;
        }
        .type.active {
            color:#777 !important;
        }
    }
    // 每个维度的投票数
    .l-select,.r-select {
        flex: 0 0 20%;
        height:@progressHeight*2;
        // background-color:skyblue;
        color:#ccc;
        .right-select,.left-select {
            // line-height: @progressHeight*1;
            height:@progressHeight*2;
            text-align:right;
            font-size:12px;
            // padding-right:3px;
            float:right;
            width:25px;
            i {
                line-height:@progressHeight*2;
                font-size:22px;
                cursor: pointer;
                color:#eee;
            }
            i.active {
                color:@progressColor !important;
            }
        }
    }
    .r-select .right-select {
        float:left;
        text-align: left;
        // padding-left:3px;
    }
    // 进度条
    .left-prog,.right-prog {
        height: @progressHeight;
        background-color: transparent;
    }
    .left-prog.active,.right-prog.active {
        background-color:@progressColor !important;
    }
    .left-prog {
        float:right;
        border-radius:@progressHeight/2 0 0 @progressHeight/2;
        width:100%;
    }
    .right-prog {
        float:left;
        border-radius:0 @progressHeight/2 @progressHeight/2 0;
        width:100%;
    }
    .result-box {
        // height:50px;
        padding-top:10px;
        .en {
            font-size:20px;
            height:22px;
            line-height: 22px;
        }
        .ch {
            font-size:13px;
            height:20px;
            line-height: 20px;
        }
    }

}
</style>
    