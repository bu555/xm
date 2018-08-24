<template>
    <div class="task" v-loading="load">
        <div class="title">
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <h5> 我的任務</h5>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 left_photo">
                    <span class="photo">
                        <img src="/static/img/task1.png" alt="">
                    </span>
                    <span class="the_chara">
                        <p style="font-weight:500;font-size:16px;color:black;">{{one.TypeName}}</p>
                        <p style="margin-top:10px;">
                            <span style="margin-right:10px;">進度:</span>
                            <span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" :aria-valuenow="one.Progress*20" aria-valuemin="0" aria-valuemax="100" :style="{'width':one.Target-one.Progress<=0?'120px':one.Progress*100/one.Target+'px'}  ">
                                        <span class="chara">{{one.Progress}}/{{one.Target}}</span>
                                    </div>
                                </div>
                            </span>
                            <span style="margin-left:25px;">任務系統獎勵&nbsp;{{one.Award}} sBTC</span>
                        </p>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 right_btn">
                    <el-button type="info" round v-if="one.State==0" disabled>未完成</el-button>
                    <el-button type="warning" round v-if="one.State==1" @click="getAwards(one.Type)">可領取</el-button>
                    <el-button type="warning" round v-if="one.State==2" plain disabled>已領取</el-button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 left_photo">
                    <span class="photo">
                        <img src="/static/img/task2.png" alt="">
                    </span>
                    <span class="the_chara">
                        <p style="font-weight:500;font-size:16px;color:black;">{{two.TypeName}}</p>
                        <p style="margin-top:10px;">
                            <span style="margin-right:10px;">進度:</span>
                            <span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" :aria-valuenow="two.Progress*20" aria-valuemin="0" aria-valuemax="100" :style="{'width':two.Target-two.Progress<=0?'120px':two.Progress*100/two.Target+'px'} ">
                                        <span class="chara">{{two.Progress}}/{{two.Target}}</span>
                                    </div>
                                </div>
                            </span>
                            <span style="margin-left:25px;">任務系統獎勵&nbsp;{{two.Award}} sBTC</span>
                        </p>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 right_btn">
                    <el-button type="info" round v-if="two.State==0" disabled>未完成</el-button>
                    <el-button type="warning" round v-if="two.State==1" @click="getAwards(two.Type)">可領取</el-button>
                    <el-button type="warning" round v-if="two.State==2" plain disabled>已領取</el-button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 left_photo">
                    <span class="photo">
                        <img src="/static/img/task3.png" alt="">
                    </span>
                    <span class="the_chara">
                        <p style="font-weight:500;font-size:16px;color:black;">{{three.TypeName}}</p>
                        <p style="margin-top:10px;">
                            <span style="margin-right:10px;">進度:</span>
                            <span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" :aria-valuenow="three.Progress*20" aria-valuemin="0" aria-valuemax="100" :style="{'width':three.Target-three.Progress<=0?'120px':three.Progress*100/three.Target+'px'} ">
                                        <span class="chara">{{three.Progress}}/{{three.Target}}</span>
                                    </div>
                                </div>
                            </span>
                            <span style="margin-left:25px;">任務系統獎勵&nbsp;{{three.Award}} sBTC</span>
                        </p>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 right_btn">
                    <el-button type="info" round v-if="three.State==0" disabled>未完成</el-button>
                    <el-button type="warning" round v-if="three.State==1" @click="getAwards(three.Type)">可領取</el-button>
                    <el-button type="warning" round v-if="three.State==2" plain disabled>已領取</el-button>
                </div>
            </div>
            <div class="row" style="border-bottom:none;">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 left_photo">
                    <span class="photo">
                        <img src="/static/img/task4.png" alt="">
                    </span>
                    <span class="the_chara">
                        <p style="font-weight:500;font-size:16px;color:black;">{{four.TypeName}}</p>
                        <p style="margin-top:10px;" class="pro">
                            <span style="margin-right:10px;">進度:</span>
                            <span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" :aria-valuenow="four.Progress*20" aria-valuemin="0" aria-valuemax="100" :style="{'width':four.Target-four.Progress<=0?'120px':four.Progress*100/four.Target+'px'} ">
                                        <span class="chara" v-if="four.State==0">未完成</span>
                                        <span class="chara" v-if="four.State==1 || four.State==2">已完成</span>
                                    </div>
                                </div>
                            </span>
                            <span style="margin-left:25px;">任務系統獎勵&nbsp;{{four.Award}} sBTC</span>
                        </p>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 right_btn">
                    <el-button type="info" round v-if="four.State==0" disabled>未完成</el-button>
                    <el-button type="warning" round v-if="four.State==1" @click="getAwards(four.Type)">可領取</el-button>
                    <el-button type="warning" round v-if="four.State==2" plain disabled>已領取</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import accountAxios from "../../axios_joggle/axios_account";
export default {
  data() {
    return {
      btnType: ["warning", "warning", "warning", "warning"],
      btnChara: "可領取",
      one: [],
      two: [],
      three: [],
      four: [],
      load: true
    };
  },
  created() {
    accountAxios.getTaskInfo().then(res => {
      this.arrangement(res.data.Data);
      this.load = false;
    });
  },
  methods: {
    getAwards(ty) {
      this.load = true;
      accountAxios.getAward({ type: ty }).then(res => {
        if (res.data.ResultCode == 200) {
          this.$store.state.refreshUserInfo = true;
          this.arrangement(res.data.Data);
       
        let awads ; 
        for(let i = 0 ; i<res.data.Data.length ; i++){
            if(res.data.Data[i].Type==ty){
                awads = res.data.Data[i].Award
            }
        }
        this.$message.success("恭喜您,成功領取了 "+awads+" sBTC")
        }
        this.load = false;
      });
    },
    arrangement(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].Type == 1) {
          this.four = data[i];
        } else if (data[i].Type == 2) {
          this.one = data[i];
        } else if (data[i].Type == 3) {
          this.two = data[i];
        } else {
          this.three = data[i];
        }
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@media screen and (max-width: 520px) {
  .task .content .left_photo {
    text-align: center !important;
  }
  .task .content .left_photo .the_chara {
    margin-left: 0 !important;
  }
}
.task {
  background: white;
  max-width: 1180px;
  margin: 15px auto 40px;
  padding: 11.5px 23.5px;
  .row {
    margin: 0;
  }
  .title {
    text-align: left;
    border-bottom: 3px solid #eeeeee;
    position: relative;
    h5 {
      display: inline-block;
      padding: 2px 3px;
      font-weight: 700;
      position: relative;
      &:after {
        content: "";
        display: block;
        height: 3px;
        width: 100%;
        background-color: #0a53a2;
        position: absolute;
        bottom: -13px;
        left: 0px;
      }
    }
    .write-btn {
      position: absolute;
      bottom: 6px;
      right: 0px;
      border-radius: 16px;
    }
  }
  .content {
    padding-top: 22px;
    .row {
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
    }
    .left_photo {
      text-align: left;
      .photo {
        display: inline-block;
        vertical-align: middle;
      }
      .the_chara {
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        .pro {
          span:nth-child(1) {
            vertical-align: bottom;
          }
        }
        p {
          > span {
            display: inline-block;
            color: #b8b8b8;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 118px;
        height: 14px;
        position: relative;
        background-color: #dcdcdc;
        margin-bottom: 0;
        .progress-bar {
          line-height: 12px;
          .chara {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .right_btn {
      line-height: 68px;
    }
  }
}
</style>
