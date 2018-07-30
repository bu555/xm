<template>
    <div class="my-func-chart" v-show="type">
            <div class="f-title">INTJ功能</div>
            <div class="f-sub-title">
                <div>内在</div>
                <div>外在</div>
            </div>
            <div class="f-chart">
                <div class="f-1" :style="'background-color:'+$mbti.color[$mbti.func[type][0][0]]+';left:'+($mbti.func[type][0][1]==='i'?'-26px':'26px')">{{$mbti.func[type][0][0]}}</div>
                <div class="f-2" :style="'background-color:'+$mbti.color[$mbti.func[type][1][0]]+';left:'+($mbti.func[type][1][1]==='i'?'-27px':'27px')">{{$mbti.func[type][1][0]}}</div>
                <div class="f-3" :style="'background-color:'+$mbti.color[$mbti.func[type][2][0]]+';left:'+($mbti.func[type][2][1]==='i'?'-18px':'18px')">{{$mbti.func[type][2][0]}}</div>
                <div class="f-4" :style="'background-color:'+$mbti.color[$mbti.func[type][3][0]]+';left:'+($mbti.func[type][3][1]==='i'?'-5px':'5px')">{{$mbti.func[type][3][0]}}</div>
            </div>
            <div class="f-info">
                <div>
                    <p>主导功能：{{$mbti.func[type][0]}}</p>
                    <p>辅助功能：{{$mbti.func[type][1]}}</p>
                    <p>次等功能：{{$mbti.func[type][2]}}</p>
                    <p>劣等功能：{{$mbti.func[type][3]}}</p>
                </div>
            </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          mbti:''
      }
  },
  props:{
      type:{
          default: ''
      }
  },
  created(){
      this.type = this.type.toLowerCase()
  }
}
</script>

<style lang="less" scoped>
    .my-func-chart{
        box-sizing: border-box;
        width:290px;
        border:1px solid #eee;
        border-radius:8px;
        position: relative;
        text-align: center;
        padding:12px 0;
        .f-title {
            height:30px;
            font-weight:700;
            font-size:16px;;
        }
        .f-sub-title {
            font-size:14px;
            display:flex;
            justify-content: space-around;
            margin-bottom:10px;
        }
        .f-chart {
            &>div {
                border:2px solid #555;
                border-radius:50%;
                margin:0 auto;
                position: relative;
            }
            .f-1 {
                width:155px;
                height:45px;
                line-height:42px;
            }
            .f-2 {
                width:98px;
                height:40px;
                line-height:37px;
                top:-8px;
            }
            .f-3 {
                width:80px;
                height:33px;
                line-height:30px;
                top:-19px;
            }
            .f-4 {
                width:24px;
                height:28px;
                line-height:25px;
                top:-25px;
            }
            &:after {
                content:"";
                display:block;
                width:0px;
                height:150px;
                border-left:1px dashed #555;
                position:absolute;
                top:-18px;
                left:50%;
            }
        }
    }
</style>

