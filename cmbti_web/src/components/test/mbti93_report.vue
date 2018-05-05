<template>
<div class="test-result bx">
    <div class="main">
        <h4>MBTI 测试报告</h4>
        <div class="line1"></div>
        <!--头部-->
        <div class="header">
            <!--<h2>测试报告</h2>-->
            <h3 class="tit">{{mbtiRes.type}}<span> ({{mbtiRes.type_ch}})</span></h3>
            <p class="sub-tit">—— {{mbtiRes.subTitle}}</p>
            <div class="test-msg">
                <span>报告接收者：user00mmm</br>测试日期：2002-2-2</span>
            </div>
        </div>
        <div class="line2"></div>
        <!--描述-->
        <div class="list list-details">
            <div class="content feature txt-left">
                <h5>MBTI倾向与功能</h5>
            <div class="chart">
                <div class="m-chart">
                    <div class="my-tit">MBTI 倾向图</div>
                    <div class="mids">
                        <div class="mid">
                            <div class="type">E 外倾</div>
                            <div class="prog l">
                                <div class="e" :style="'width:'+ (Res.e>Res.i? Res.e/(Res.e+Res.i)*100+'%': '0%')">
                                    <div class="val">{{Res.e>Res.i? (Res.e/(Res.e+Res.i)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="prog r">
                                <div class="i" :style="'width:'+ (Res.e<Res.i? Res.i/(Res.e+Res.i)*100+'%': '0%')">
                                    <div class="val">{{Res.i>Res.e? (Res.i/(Res.e+Res.i)*100).toString().substr(0,4)+'%':''}}</div>
                                </div>
                            </div>
                            <div class="type">I 内倾</div>
                        </div>
                        <div class="mid">
                            <div class="type">S 感觉</div>
                            <div class="prog l">
                                <div class="s" :style="'width:'+ (Res.s>Res.n? Res.s/(Res.s+Res.n)*100+'%': '0%')">
                                    <div class="val">{{Res.s>Res.n? (Res.s/(Res.s+Res.n)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="prog r">
                                <div class="n" :style="'width:'+ (Res.n>Res.s? Res.n/(Res.s+Res.n)*100+'%': '0%')">
                                    <div class="val">{{Res.n>Res.s? (Res.n/(Res.s+Res.n)*100).toString().substr(0,4) +'%': ''}}</div>
                                </div>
                            </div>
                            <div class="type">N 直觉</div>
                        </div>
                        <div class="mid">
                            <div class="type">T 思考</div>
                            <div class="prog l">
                                <div class="t" :style="'width:'+ (Res.t>Res.f? Res.t/(Res.t+Res.f)*100+'%': '0%')">
                                    <div class="val">{{Res.t>Res.f? (Res.t/(Res.t+Res.f)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="prog r">
                                <div class="f" :style="'width:'+ (Res.f>Res.t? Res.f/(Res.t+Res.f)*100+'%': '0%')">
                                    <div class="val">{{Res.f>Res.t? (Res.f/(Res.t+Res.f)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="type">F 情感</div>
                        </div>
                        <div class="mid">
                            <div class="type">J 判断</div>
                            <div class="prog l">
                                <div class="j" :style="'width:'+ (Res.j>Res.p? Res.j/(Res.j+Res.p)*100+'%': '0%')">
                                    <div class="val">{{Res.j>Res.p? (Res.j/(Res.j+Res.p)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="prog r">
                                <div class="p" :style="'width:'+ (Res.p>Res.j? Res.p/(Res.j+Res.p)*100+'%': '0%')">
                                    <div class="val">{{Res.p>Res.j? (Res.p/(Res.j+Res.p)*100).toString().substr(0,4)+'%': ''}}</div>
                                </div>
                            </div>
                            <div class="type">P 感知</div>
                        </div>
                        <div class="info">
                            <span>类 型：{{mbtiRes.type}}</span></br>
                            <span>倾向度：55%</span>
                        </div>
                    </div>
                </div>
                <div class="f-chart">
                    <div class="my-tit">{{mbtiRes.type}} 功能</div>
                    <div class="f-f txt-center">
                        <div class="f1">{{mbtiRes.f[0]}}
                            <div class="f2">{{mbtiRes.f[1]}}
                                <div class="f3">{{mbtiRes.f[2]}}
                                    <div class="f4"><span>{{mbtiRes.f[3]}}</span></div>                    
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <p>主导功能：{{mbtiRes.f[0].substr(0,2)}}（{{mbtiRes.f_ch[0]}} {{mbtiRes.f_en[0]}}）</p>
                            <p>辅助功能：{{mbtiRes.f[1].substr(0,2)}}（{{mbtiRes.f_ch[1]}} {{mbtiRes.f_en[1]}}）</p>
                            <p>第三功能：{{mbtiRes.f[2].substr(0,2)}}（{{mbtiRes.f_ch[2]}} {{mbtiRes.f_en[2]}}）</p>
                            <p>第四功能：{{mbtiRes.f[3].substr(0,2)}}（{{mbtiRes.f_ch[3]}} {{mbtiRes.f_en[3]}}）</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            <div class="content feature txt-left">
                <h5>性格特征</h5>
                <p>{{mbtiRes.feature}}</p>
            </div>
            <div class="content feature txt-left">
                <h5>优势</h5>
                <p v-html="mbtiRes.advantage"></p>
            </div>
            <div class="content feature txt-left">
                <h5>劣势</h5>
                <p v-html="mbtiRes.shortcoming"></p>
            </div>
            <div class="content feature txt-left">
                <h5>擅长领域</h5>
                <p v-html="mbtiRes.domain"></p>
            </div>
            <div class="content feature txt-left">
                <h5>职业</h5>
                <p v-html="mbtiRes.job"></p>
            </div>
        </div>
    </div>
    <!--<div class="aside"></div>-->
</div> 
</template>
<script>
import mbtiRes from './r_mbti'
export default {
    data(){
        return {
            mbtiRes:{},
            Res:{

            }
        }
    },
    methods:{

    },
    components:{

    },
    created(){
        console.log(JSON.parse(this.$route.query.result));
        this.Res = JSON.parse(this.$route.query.result);
        console.log(this.Res.e>this.Res.i? this.Res.e/(this.Res.e+this.Res.i)*100+'%':'0');
        let type = ''
        type += this.Res.e>this.Res.i?'e':'i'
        type += this.Res.s>this.Res.n?'s':'n'
        type += this.Res.t>this.Res.f?'t':'f'
        type += this.Res.j>this.Res.p?'j':'p'
        console.log('type:',type);
        this.mbtiRes = mbtiRes['intj']
    },
    
};
</script>
<style lang="less">
.test-result {
    display:flex;
    max-width:770px;
    .main {
        flex:1;
        text-align:center;
        padding:4% 5%;
        &>h4 {
            // display:inline-block;
            background-color: #70a9e5;
            border-bottom:2px solid rgba(69,110,165,.4);
            color:#fff;
            padding:12px;
            padding-bottom:15px;
            font-size:28px;
            
        }
        .line1 {
            border-top:1px solid rgba(69,110,165,.4);
            // border-bottom:1px dotted #f5f5f5;
            margin:-9px 0 26px;
            // box-shadow:0 1px 1px #456ea5;
        }
        .line2 {
            border-bottom:1px dotted #f5f5f5;
            margin:5px 0 20px;
        }
        .header {
            h3 {
                height:25px;
                line-height: 25px;;
                span {
                    height:25px;
                    font-size:18px;
                }
            }
            .sub-tit {
                font-size:15px;
            }
            .test-msg {
                text-align:right;
                color:#777;
                font-size:12px;
                span{
                    display: inline-block;
                    text-align:left;
                    min-width:128px;
                }
            }
        }
        .list {
            .content {
                // padding:5px;
                padding-bottom:8px;
                h5 {
                    font-size:16px;
                    font-weight:700;
                }
                p {
                    // padding-left:5px;
                }


            }
        }
        .chart {
            display:flex;
            justify-content:center;
            
            .m-chart {
                // min-width:300px;
                flex:0 0 50%;
                padding:18px 5px;
                .mids {
                    background-color: #fff;
                    height:238px;
                    margin:0 auto;
                    // max-width:320px;
                    padding-top:25px;
                    border:1px solid #f0f5f5;
                    border-radius:2px;
                    // box-shadow:0 0 22px #eee inset;
                    .info {
                        width:158px;
                        margin:0 auto;
                        padding:7px 0 0 33px;
                        font-weight:700;
                    }
                }
                .mid {
                    text-align:left;
                    box-sizing: border-box;
                    display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                    justify-content: center;
                    margin:12px 0;
                    font-size:13px;
                    .type {
                        // flex-basis:0;
                        width:50px;
                        text-align: center;
                        // background-color: pink;
                    }
                    .prog.l {
                        border-right:none;
                    }
                    .prog {
                        // flex-basis:0;
                        width:80px;
                        border:1px solid #80c342;
                        padding:1px;
                        &>div {
                            height:15px;
                            background-color: #80c342;
                            // width:33%;
                            .val {
                                padding:0 1px;
                                font-size:12px;
                            }
                        }
                        .e,.s,.t,.j {
                            float:right;
                        }
                        .i,.n,.f,.p {
                            float:left;
                            .val {
                                float:right;
                            }
                        }
                    }
                }

            }
            .f-chart {
                // min-width:300px;
                flex:0 0 50%;
                padding:18px 5px;
                .f-f{
                margin:0 auto;
                // max-width:320px;
                height:238px;
                background: #fff;
                padding-top:12px;
                border:1px solid #f0f5f5;
                border-radius:2px;
                // box-shadow:0 0 22px #eee inset;
                    .f1 {
                        color:#fff;
                        border-radius:50%;
                        height:60px;
                        line-height:60px;
                        width:155px;
                        background-color:skyblue;
                        margin:0 auto;
                        font-size:15px;
                        position: relative;;
                            .f2 {
                                border-radius:50%;
                                height:47px;
                                line-height:47px;
                                width:118px;
                                margin:-9px 0 0 -22px;
                                background-color: #f77;
                                font-size:14px;
                            }
                            .f3 {
                                border-radius:50%;
                                height:36px;
                                line-height:36px;
                                width:100px;
                                margin:-13px 0 0 60%;
                                background-color: blue;
                                font-size:13px;
                            }
                            .f4 {
                                border-radius:50%;
                                height:23px;
                                line-height: 23px;
                                width:65px;
                                margin:-6px 0 0 -12%;
                                background-color: hotpink;
                                font-size:12px;
                                position: relative;
                                span{
                                    position: absolute;
                                    left:2px;
                                    top:1px;
                                    width:100px;
                                    color:#eee;
                                }

                            }
                        }
                    .info{
                        padding-top:88px;
                        padding-left:20%;
                        text-align:left;
                        p{
                            font-size:13px;
                            margin-bottom:-2px;
                        }
                    }

                }
            }
            @media screen and (max-width:636px){
                flex-wrap: wrap;
                .m-chart,.f-chart {
                    flex:0 0 100%;
                   
                }
            }
        }
        .details {

        }

    }
    .aside{
        width:27%;
        background-color: #ddd;
        @media screen and (max-width:768px){
            display:none;
        }
    }

}

</style>
    