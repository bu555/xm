<template>
<div class="select">
    <div class="answer-item">
        <div class="answer">
            <p>{{answer}}</p>
        </div>
        <input type="text" v-model="res" v-if="false"> 
        <div class="select-ctrl">
            <div class="item l-big3 left"><i class="glyphicon glyphicon-thumbs-up" @click="clickHandle($event,3)"></i><span>同意</span></div>
            <div class="item l-big2 left"><i class="glyphicon glyphicon-thumbs-up" @click="clickHandle($event,2)"></i><span>同意</span></div>
            <div class="item l-big1 left"><i class="glyphicon glyphicon-thumbs-up" @click="clickHandle($event,1)"></i><span>同意</span></div>
            <div class="item big0"><i class="glyphicon glyphicon-unchecked" @click="clickHandle($event,0)"></i></i><span>中立</span></div>
            <div class="item r-big1 right"><i class="glyphicon glyphicon-thumbs-down" @click="clickHandle($event,-1)"></i><span>反对</span></div>
            <div class="item r-big2 right"><i class="glyphicon glyphicon-thumbs-down" @click="clickHandle($event,-2)"></i><span>反对</span></div>
            <div class="item r-big3 right"><i class="glyphicon glyphicon-thumbs-down" @click="clickHandle($event,-3)"></i><span>反对</span></div>
        </div>
        <div class="txt">
            <!--<div class="vote">同 意</div>
            <div class="not-vote">反 对</div>-->
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            res:''
        }
    },
    props:[
        'answer'
    ],
    methods:{
        clickHandle(event,val){
            let target = event.currentTarget;
            console.log(target);
            console.log(val);
            this.$emit('getRes',val,function(value){return value});
            target.parentNode.parentNode.querySelectorAll('.item').forEach(function(v,i){
                v.classList.remove('active');
            })
            target.parentNode.classList.add('active');
        }
    },
    created(){

    },
    
};
</script>
<style lang="less">
.select {
    max-width:400px;
    margin:0 auto;
    padding:4px 10px;
    border-bottom:1px solid #f5f5f5;
    .answer-item {
        .answer {
            margin:0 auto;
            padding:6px 0;
            p {
                margin:0;
            }
        }
        .select-ctrl {
            margin:0 auto;
            max-width:370px;
            padding:5px 0;
            display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
            .item {
                // border:1px solid #ccc;
                text-align:center;
                padding:1px 0;
                height:36px;
                line-height: 36px;
                color:#f2f2f2;
                color:#ccc;
                position: relative;
                span {
                    color:transparent;
                }
            }
            .big0 {
                flex:2;
                span {
                    position: absolute;
                    bottom:-16px;
                    left:0;
                    width:100%;
                    height:16px;
                    line-height: 16px;
                    font-size:11px;
                }
            }
            .r-big1,.l-big1 {
                flex:2;
                font-size:21px;
                span {
                    position: absolute;
                    bottom:-16px;
                    left:0;
                    width:100%;
                    height:16px;
                    line-height: 16px;
                    font-size:12px;
                }
            }
            .r-big2,.l-big2 {
                flex:3;
                font-size:26px;
                span {
                    position: absolute;
                    bottom:-18px;
                    left:0;
                    width:100%;
                    height:16px;
                    line-height: 16px;
                    font-size:13px;
                }
            }
            .r-big3,.l-big3 {
                flex:3;
                font-size:32px;
                span {
                    position: absolute;
                    bottom:-22px;
                    left:0;
                    width:100%;
                    height:16px;
                    line-height: 16px;
                    font-size:14px;
                }
            }
            .big0.active i {
                color:#777;
                font-weight:400;
                text-shadow:1px 1px 4px #555;
            }
            .left i {
                color:rgba(30, 138, 54,.3);
            }
            .right i {
                color:rgba(233, 66, 66,.3);
            }
            .left.active i{
                color:#1e8a36;
                text-shadow:1px 1px 8px #555;
                font-weight:700;
            }
            .left.active span {
                color:#1e8a36;
            }
            .big0.active span {
                color:#aaa
            }
            .right.active span {
                color:#e94242;
            }
            .right.active i {
                color:#e94242;
                text-shadow:1px 1px 8px #555;
                font-weight:700;
            }
            .item i {
                cursor:pointer;
            }
            .r-big1 i,.l-big1 i{
                padding:5px;
                display: inline-block;
            }
            .r-big2 i,.l-big2 i{
                padding:3px;
            }
            .big0 i {
                padding:5px;
            }
            // .r-big1 i,.l-big1 i{
            //     padding:0;
            //     width:22px;
            //     height:22px;
            //     display: inline-block;
            //     border:2px solid red;
            //     border-radius:11px;

            // }
            // .r-big2 i,.l-big2 i{
            //     padding:3px;
            //     padding:0;
            //     width:26px;
            //     height:26px;
            //     display: inline-block;
            //     border:2px solid red;
            //     border-radius:13px;
            // }
            // .big0 i {
            //     padding:5px;
            // }
        }
        .txt {
            margin:0 auto;
            max-width:370px;
            padding:0px 6px 22px;
            margin-bottom:6px;
            font-size:13px;
            display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
            .vote {
                flex:1;
                color:rgba(30, 138, 54,.7);
                padding-left:2px;
                // text-shadow: 0 0 2px #bbb;
            }
            .not-vote {
                flex:1;
                color:rgba(233, 66, 66,.7);
                text-align: right;
                // text-shadow: 0 0 1px #bbb;
            }
        }
        @media screen and (max-width:414px){
            .txt,.select-ctrl {
                max-width:300px;
            }
        }
        @media screen and (max-width:320px){
            .txt,.select-ctrl {
                max-width:260px;
            }
        }
    }
        
}

</style>
    