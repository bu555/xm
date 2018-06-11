<template>
<div class="e-item">
    <div class="main-box">
        <div class="result">
            <div class="r-info">
                <div class="photo">
                    <img src="" alt="">
                </div>
                <div class="txt overflow-row-8">
                    <p>阿尔伯特·爱因斯坦（Albert.Einstein，1879年3月14日—1955年4月18日），出生于德国符腾堡王国乌尔姆市，毕业于苏黎世联邦理工学院，犹太裔物理学家。爱因斯坦1879年出生于德国乌尔姆市的一个犹太人家庭（父母均为犹太人），1900年毕业于苏黎世联邦理工学院，入瑞士国籍。1905年.....</p>
                </div>
            </div>
            <div class="r-chart">
                <div class="item" v-for="(v,i) in voteArr.slice(0,6)" :key="i">
                    <div class="type">{{v.type?v.type.toUpperCase():''}}</div>
                    <div class="prog">
                        <div :style="'width:'+v.perce">
                            <div class="count">{{v.count}}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 3">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            voteArr:'',
            exampleItem:''
        }
    },
    methods:{
        exampleHandle(example){
                this.exampleItem = example;
                this.isRepeat = example.voted

                // 类型排序
                let vote = []
                let total = 0
                for(let key in this.exampleItem.vote){
                    total += Number(this.exampleItem.vote[key])
                }
                for(let key in this.exampleItem.vote){
                    vote.push({
                        type:key,
                        count:this.exampleItem.vote[key],
                        perce:total===0?'0%':this.exampleItem.vote[key]/total*100 + '%'
                    })
                }
                for(let i=0;i<vote.length-1;i++){
                    for(let j=0;j<vote.length-1-i;j++){
                        if(vote[j].count < vote[j+1].count){
                            let temp = vote[j+1]
                            vote[j+1] = vote[j]
                            vote[j] = temp
                        }
                    }
                }
                //如果最大与type相等
                if(this.exampleItem.type!=='****' &&vote[0].type!=this.exampleItem.type){
                    let temp;
                    for(let i=0;i<vote.length;i++){
                        if(vote[i].type==this.exampleItem.type){
                            temp = vote[i]
                            vote.splice(i,1)
                            break;
                        }
                    }
                    vote.unshift(temp)
                }
                this.voteArr = vote
        },
    },
    watch:{

    },
    mounted(){

    },
    components:{

    },
    created(){
        let init =  {
        "_id": "5b01af13b9a3bd0bb8cb4181",
        "vote": {
            "entp": 0,
            "intp": 0,
            "entj": 0,
            "intj": 2,
            "enfp": 0,
            "infp": 0,
            "enfj": 0,
            "infj": 0,
            "estj": 0,
            "istj": 0,
            "esfj": 0,
            "isfj": 0,
            "estp": 0,
            "istp": 0,
            "esfp": 0,
            "isfp": 0
        },
        "name": "爱因斯坦",
        "info": "阿尔伯特·爱因斯坦（Albert.Einstein，1879年3月14日—1955年4月18日），出生于德国符腾堡王国乌尔姆市，毕业于苏黎世联邦理工学院，犹太裔物理学家。爱因斯坦1879年出生于德国乌尔姆市的一个犹太人家庭（父母均为犹太人），1900年毕业于苏黎世联邦理工学院，入瑞士国籍。1905年.....",
        "img_url": "/201805/1526837011503v.jpg",
        "total": 0,
        "tag": "",
        "birth": "",
        "conste": "",
        }
        this.exampleHandle(init)
    }

    
};
</script>
<style lang="less">
.e-item {
    max-width:1100px;
    margin:15px auto;
    position: relative;
    padding-right:332px;
    .main-box {
        margin-bottom:12px;
        width:100%;
        .result {
            background-color: #fff;
            padding:15px;
            padding-left:28px;
            display:flex;

            .r-info {
                flex:1;
                height:225px;
                display:flex;
                .photo {
                    flex:0 0 132px;
                    height:165px;
                    background-color: #ccc;
                    img {
                        width:100%;
                        height:auto;
                    }
                }
                .txt {
                    padding:0 32px 0 10px;
                    font-size:14px;
                    color:#777;
                    height:160px;
                }
            }
            .r-chart {
                flex:1;
                height:222px;
                background-color: #eee;

            }
        }
    }
    .aside-box {
        width:320px;
        position: absolute;
        right: 0;
        top: 0;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .aside-box {
            position: relative;
            width:100%;
        }
    }
    @media screen and (max-width:525px){
        .main-box {
            .m-body {
                .m-tab {
                    &>div {
                        padding:7px 0;
                    }
                }
            }
        }
    }
}

</style>
    