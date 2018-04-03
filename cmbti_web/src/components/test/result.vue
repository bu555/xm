<template>
<div class="test-result">
    <div class="chart">
        <div class="mid">
            <div class="type">E 外倾</div>
            <div class="prog">
                <div class="e">
                    <div class="val">73%</div>
                </div>
            </div>
            <div class="prog">
                <div class="i">
                    <div class="val">44%</div>
                </div>
            </div>
            <div class="type">I 内倾</div>
        </div>
        <div class="mid">
            <div class="type">S 感觉</div>
            <div class="prog">
                <div class="s">
                    <div class="val">73%</div>
                </div>
            </div>
            <div class="prog">
                <div class="n">
                    <div class="val">44%</div>
                </div>
            </div>
            <div class="type">N 直觉</div>
        </div>
        <div class="mid">
            <div class="type">T 思考</div>
            <div class="prog">
                <div class="t">
                    <div class="val">73%</div>
                </div>
            </div>
            <div class="prog">
                <div class="f">
                    <div class="val">44%</div>
                </div>
            </div>
            <div class="type">F 情感</div>
        </div>
        <div class="mid">
            <div class="type">J 判断</div>
            <div class="prog">
                <div class="j">
                    <div class="val">73%</div>
                </div>
            </div>
            <div class="prog">
                <div class="p">
                    <div class="val">44%</div>
                </div>
            </div>
            <div class="type">P 感知</div>
        </div>
        <!--<div class="e">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="i">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="s">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="n">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="t">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="f">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="j">
            <div class="type"></div><div class="prog"></div>
        </div>
        <div class="p">
            <div class="type"></div><div class="prog"></div>
        </div>-->
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    },
    components:{

    },
    created(){

    },
    
};
</script>
<style lang="less">
.test-result {
    .chart {
        margin:0 auto;
        width:300px;
        .mid {
            box-sizing: border-box;
            display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
            flex-wrap:wrap;
            margin:5px 0;
            .type {
                flex:1.2;
                text-align: center;
                // background-color: pink;
            }
            .prog {
                flex:2;
                border:1px solid #80c342;
                &>div {
                    height:14px;
                    margin:1px;
                    background-color: #80c342;
                    width:33%;
                    .val {
                        font-size:12px;
                    }
                }
                .e,.s,.t,.j {
                    float:right;
                }
                .i,.n,.f,.p {
                    .val {
                        float:right;
                    }
                }
            }
        }

        // &>div {
        //     margin:3px 0px;
        //     border:1px solid #80c342;
        //     flex-basis:48%;
        //     flex-shrink:0;
        //     display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        //     .type {
        //         flex-basis:20%;
        //     }
        //     .prog {
        //         flex-basis:80%;
        //         height:14px;
        //         margin:1px;
        //         width:33%;
        //         background-color: #80c342;
        //     }
        // }
        // .e,.s,.t,.j {
        //     .prog {
        //         float:right;
        //     }
        // }
    }

}

</style>
    