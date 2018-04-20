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
    <div class="ctrl-box" style="margin-top:10px">
            <div>
                <button class="punch default" style="width:60px" @click="exitVote()">取消</button>
            </div>
            <div>
                <button class="punch" @click="goVote()">投 票</button>
            </div>
            <div>
                <button class="punch default" style="width:60px" @click="reset()">重置</button>
            </div>
        <!--<el-button type="primary" @click="goVote()" style="height:34px;padding:0 22px">投票</el-button>
        <el-button type="default" @click="exitVote()" style="height:34px;padding:0 22px">取消</el-button>-->
    </div>
    <div class="err-msg" v-if="showError">
        <i class="glyphicon glyphicon-info-sign"></i> 请至少选择一个维度！
    </div>
    <div class="succ-msg" v-if="showSucc">
        <i class="el-icon-success"></i><br/>
        <p>投票成功</p>
        <div>感谢您的参与！ {{showTime}}s后自动返回</div>
        <button class="clean-gray" style="width:80px" @click="exitVote()">确定</button>
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
            showError:false,
            showSucc:false,
            timeID:'',
            resData:null,
            showTime:3,
        }
    },
    methods:{
        goVote(){
            if(this.resEn ==='****'){
                this.showError = true;
                return;
            }
            this.showSucc = true;
                this.$axios.goVote({
                    eid:this.$route.query.eid,
                    vote:this.resEn
                }).then(res=>{
                    if(res.data.success){
                        this.resData = res.data.example;
                        let _this = this;
                        this.timeID = setInterval(function(){
                            _this.showTime--;
                            if(_this.showTime===0){
                                _this.exitVote();
                            }
                        },1000);
                        //投票成功
                        // this.$message({
                        //     showClose: true,
                        //     message: res.data.message,
                        //     type: 'warning',
                        //     duration:2500
                        // });
                    }
                }).catch(res=>{})
                
        },
        // 向父组件发送关闭信号,并传回数据
        exitVote(){
            clearInterval(this.timeID);
            this.$emit('sonSend',this.resData);
        },
        hoverHandle(e){
            let activeDOM = e.currentTarget;
            if(/right/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-r").style.color = "#bdeca8";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.backgroundColor = "#bdeca8";
                activeDOM.parentNode.parentNode.querySelector(".right-prog").style.boxShadow = "-1px 0px 5px #478a2a";
                activeDOM.parentNode.parentNode.querySelector(".right-type").style.color = "#67c23a";
            }else if(/left/.test(activeDOM.getAttribute('class'))){
                activeDOM.parentNode.parentNode.querySelector(".i-l").style.color = "#bdeca8";
                activeDOM.parentNode.parentNode.querySelector(".left-prog").style.backgroundColor = "#bdeca8";
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
            this.showError = false;
        },
        reset(e){
            // document.querySelector('.vote_console').querySelectorAll('.type').forEach((v,i)=>{
            //     v.classList.remove('active')
            // })
            // document.querySelector('.vote_console').querySelectorAll('.left-prog').forEach((v,i)=>{
            //     v.classList.remove('active')
            // })
            // document.querySelector('.vote_console').querySelectorAll('.right-prog').forEach((v,i)=>{
            //     v.classList.remove('active')
            // })
            document.querySelector('.vote_console').querySelectorAll('i').forEach((v,i)=>{
                v.classList.remove('active')
            })
            document.querySelector('.vote_console').querySelectorAll('.mid div').forEach((v,i)=>{
                v.classList.remove('active')
            })
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
@bg:#fdfdfd;
.vote_console {
    padding-top:10px;
    position: relative;
    background-color: @bg;
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
    .ctrl-box {
        display: flex; display: -webkit-flex;
        justify-content:center; //垂直居中
        &>div {
            margin:0 2px;
        }
    }
    .err-msg {
        box-sizing: border-box;
        color:#d9534f;
        position: absolute;
        bottom:62px;
        left:0px;
        background-color: @bg;
        width:100%;
        height:42px;
        padding-top:10px;
    }
    .succ-msg {
        box-sizing: border-box;
        color:red;
        position: absolute;
        top:7px;
        left:0px;
        background-color: @bg;
        width:100%;
        height:100%;
        padding-top:10px;
        i{
            font-size:55px;
            color:#67c23a;
            margin-top:22px;
        }
        p{
            font-size:16px;
            font-weight:600;
            color:#67c23a;
            margin-top:5px;
        }
        div{
            font-size:13px;
            color:#ccc;
            margin-top:5px;
            margin-bottom:15px;
        }

    }

}
</style>
    