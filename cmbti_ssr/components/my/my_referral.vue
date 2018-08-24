<template>
  <div class="my-referral">
    <div class="gains item row" v-loading="loading">
      <div class="title">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <h5> 信息總覽</h5>
          </div>

        </div>
      </div>

      <div class="content" style="text-align:left;min-height:300px">

        <div class="divide" style="margin-bottom:20px;">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 one">
              <div style="margin-bottom:15px;"><img src="/static/img/referral2.png" alt=""></div>
              <div style="color:#999999;font-size:16px;">獲得總分成</div>
              <div style="color:#ff0000;font-size:20px;" class="divide_money" v-html="$store.state.Bitcoin?$utill.fMoney($store.state.bottom_info.PyramidProfit,$store.state.Bitcoin):$utill.fMoney($store.state.bottom_info.PyramidProfit)"></div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 two">
              <div style="margin-bottom:15px;"><img src="/static/img/referral4.png" alt=""></div>
              <div style="color:#999999;font-size:16px;">下缐數量</div>
              <div style="color:#ff0000;font-size:22px;" class="divide_money">{{$store.state.bottom_info.PyramidUserNum}}</div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6">
              <div style="margin-bottom:15px;"><img src="/static/img/referral3.png" alt=""></div>
              <div style="color:#999999;font-size:16px;">我的邀請碼</div>
              <div style="color:#ff0000;font-size:22px;" class="divide_money">{{shareId}}</div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6" style="border-right:none;">
              <div style="margin-bottom:15px;"><img src="/static/img/referral1.png" alt=""></div>
              <div>
                <shareBtn/>
              </div>
            </div>
          </div>
        </div>
        <div class="title" v-if="online">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12" style="">
              <h5> 我的上缐</h5>
            </div>
          </div>
        </div>
        <div class="my_top" style="margin-bottom:20px;margin-top:18px;" v-if="online">
          <div class="row search_code" v-if="$store.state.boo_top&&dataRead">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 invitation_code">
              <span>上缐邀請碼：</span>
              <span class="code_input" v-if="$store.state.boo_top">
                <el-input v-if="$store.state.boo_top" v-model="invitation_code" @keyup.enter.native="submit_code"></el-input>
              </span>
              <span class="code_btn">
                <el-button type="primary" size="small" @click="submit_code">確認</el-button>
              </span>
            </div>
          </div>
          <div v-if="$store.state.boo_top==false&&dataRead">
            <span class="img">
              <img :src="$store.state.bottom_info.PyramidAvatar?$store.state.bottom_info.PyramidAvatar:defalut_photo">
            </span>
            <span style="font-size:16px;padding-left:15px;">{{$store.state.bottom_info.PyramidName}}</span>
          </div>
          <!-- r -->
        </div>
        <div class="title">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
              <h5>下缐團隊</h5>
            </div>

          </div>
        </div>
        <div class="member">

          <div class="member_photo">

            <ul class="clearfix member_photo_ul" v-if="$store.state.bottom_info.UserList">
              <li v-for="(item,index) in $store.state.bottom_info.UserList" :key="index">
                <div class="photo">
                  <div class="photo_wrap">
                    <img :src="item.Avatar?item.Avatar:defalut_photo" alt="">
                  </div>
                </div>
                <div class="chara">
                  <h4 style="color:#333333;">{{item.Name}}</h4>
                  <div>
                    <span style="color:#999999;">積累分成：</span>
                    <span style="color:#ff0000;font-size:15px;" v-html="$store.state.Bitcoin?$utill.fMoney(item.Profit,$store.state.Bitcoin):$utill.fMoney(item.Profit)"></span>
                    <!--<span style="color:#ff0000;font-size:16px;">{{item.Profit}}</span>
                                        <span style="color:#ff0000;font-size:10px;">聰</span>
                                        <span style="color:#ff0000;">(～USD2552)</span>-->
                  </div>
                </div>
              </li>
            </ul>
            
            <p style="text-align:center;" v-else="$store.state.bottom_info.UserList">暫無下缐成員...</p>
          </div>
        </div>
      </div>
      <!-- <div class="why">
        <h4 style="color:#333333;">如何成爲上下綫？</h4>
        <p>如果您申請了新密碼但未收到密碼重置電子郵件：</p>
        <p>檢查與 Facebook 帳戶關聯的電子郵箱中的垃圾郵件文件夾。檢查與您的 Facebook 帳戶關聯的手機號碼。再次嘗試重置密碼。</p>
        <p>為安全起見，電子郵箱和手機號碼的部分字符將被隱藏（例如：fxxxxxxk@fxxxxxxk.com、xxxxxxx5555）。</p>
        <p>請記住，如果您在申請密碼重置後仍然收不到郵件，我們可幫助您恢復帳戶。</p>
      </div> -->
      
    </div>
  </div>
</template>

<script>
import accountAxios from "../../axios_joggle/axios_account";
import shareBtn from "@/components/common/share.1";
import filtration from "@/assets/filtration";
export default {
  data() {
    return {
      invitation_code: "", // 上綫邀請碼
      info: "", // 獲取信息
      shareId: "",
      lock: true,
      loading: false,
      defalut_photo: "/static/img/timg.jpg",
      dataRead: false,
      online: true
    };
  },
  watch: {},
  components: {
    shareBtn
  },
  methods: {
    
    submit_code() {
      if (this.lock) {
        this.lock = false;
        if (this.invitation_code) {
          accountAxios
            .Invitationcode({ PyramidID: this.invitation_code })
            .then(res => {
              this.lock = true;
              if (res.data.ResultCode == 200) {
                this.$message.success("提交成功");
                this.invitation_code = "";
              }
              this.get_info();
            })
            .catch(err => {
              this.lock = true;
            });
        } else {
          this.lock = true;
          this.$message.error("請勿為空");
        }
      } else {
        this.$message.warning("請勿重複提交");
      }
    },
    get_info() {
      this.loading = true;
      accountAxios
        .getreferralinfo()
        .then(res => {
          this.dataRead = true;
          this.loading = false;
          if (res.data.ResultCode == 200) {
            this.$store.state.bottom_info = res.data.Data;
            if(!this.$store.state.bottom_info.PyramidName){
              this.$store.state.boo_top = "ture";
            }
            this.dataRead = true;
          }
          if (this.$store.state.bottom_info.PyramidName.length > 0) {
            this.$store.state.boo_top = false;
          }
          // 如果 注册超过三天没写上线 不显示 我的上线模块
          let time1 = JSON.parse(localStorage.getItem("user_info")).CreatedAt;
          this.timeFn(
            filtration.timezone_filter(time1).replace(/-/g, "/"),
            this.$store.state.boo_top
          );
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    timeFn(d1, n1) {
      //d1作为一个变量传进来
      //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
      var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
      var dateEnd = new Date(); //获取当前时间
      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
      var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      console.log(dayDiff);
      console.log(11, n1);
      if (dayDiff >= 3 && n1) {
        this.online = false;
      } else {
        this.online = true;
      }
      // console.log(
      //   " 相差 " +
      //     dayDiff +
      //     "天 " +
      //     hours +
      //     "小时 " +
      //     minutes +
      //     " 分钟" +
      //     seconds +
      //     " 秒"
      // );
    }
  },
  created() {
    // 此操作 防止 出现 ‘我的上线 input ’ 跳 闪
    if (localStorage.getItem("bottom_info")) {
      // console.log(JSON.parse(localStorage.getItem("bottom_info")).PyramidName.length > 0);
      if (
        JSON.parse(localStorage.getItem("bottom_info")).PyramidName.length > 0
      ) {
        this.$store.state.boo_top = false;
      } else {
        this.$store.state.boo_top = true;
      }
    }
    this.get_info();

    // new Promise((resolve, reject) => {
    // if (JSON.parse(localStorage.getItem("pyramid")).PyramidName) {
    //   this.info = JSON.parse(localStorage.getItem("pyramid"));
    //
    // }
    // });
    this.shareId = localStorage.getItem("ShareID");
  },
  mounted() {
    $(".dropdown-menu").css("transform", "translateX(60%)");
    // 將分析facebook 原本Like 字樣改成 Share （由於插件提供的屬性“Label” 無效 所以用JS改變）
    setTimeout(() => {
      $(".jssocials-share-facebook .jssocials-share-label").html("Share");
    }, 200);
  }
};
</script>

<style lang="less">
@media screen and(max-width: 768px) {
  .two {
    border-right: none !important;
  }
  .member {
    padding: 22px 10px 58px !important;
    .member_photo {
      ul {
        li {
          width: 48% !important;
        }
      }
    }
  }
}
@media screen and(max-width: 414px) {
  .two {
    border-right: none !important;
  }
  .member {
    padding: 22px 10px 58px !important;
    .member_photo {
      ul {
        li {
          width: 98% !important;
        }
      }
    }
  }
  .divide {
    padding: 0 !important;
    .row {
      > div {
        padding: 10px !important;
        height: 150px !important;
      }
      .one {
        border-bottom: 1px solid #eeeeee;
      }
      .two {
        border-bottom: 1px solid #eeeeee;
      }
      .divide_money {
        word-wrap: break-word;
        font-size: 16px !important;
      }
    }
  }
  .invitation_code {
    text-align: left !important;
    margin: 10px 0 !important;
  }
}
.my-referral {
  max-width: 1180px;
  margin: 15px auto 40px;
  .row {
    margin: 0;
  }
  .item {
    padding: 11.5px 23.5px;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      // height:38px;
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
    .search_code {
      .invitation_code {
        text-align: left;
        color: #666666;
        vertical-align: center;
        span {
          display: inline-block;
        }
        .code_input {
          .el-input__inner {
            width: 136px;
            height: 31px;
          }
        }
        .code_btn {
          button {
            height: 31px;
          }
        }
      }
    }

    .my_top {
      border: 1px solid #eeeeee;
      padding: 26px 30px;
      .img {
        display: inline-block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        vertical-align: middle;
        overflow: hidden;
        border: 1px solid #f2f2f2;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
    .content {
      padding-top: 0px;
      margin-top: 18px;
      .divide {
        padding: 30px 0;
        border: 1px solid #eeeeee;
        .row {
          > div {
            border-right: 1px solid #e5e5e5;
            text-align: center;
          }
        }
      }
      .member {
        padding: 22px 19px 58px;
        border: 1px solid #eeeeee;
        margin-top: 18px;
        .member_photo {
          >.member_photo_ul {
            width: 100%;
            height: 100%;
            >li {
              float: left;
              width: 24%;
              border: 1px solid #e5e5e5;
              margin: 20px 0.5% 0;
              .photo {
                height: 129px;
                line-height: 129px;
                text-align: center;
                overflow: hidden;
                background-color: #eeeeee;
                display: flex;
                .photo_wrap {
                  display: flex;
                  align-content: center;
                  width: 90px;
                  height: 90px;
                  border-radius: 50%;
                  margin: auto auto;
                  border: 2px solid white;
                  overflow: hidden;
                  background: white;
                  img {
                    width: 100%;
                    object-fit: cover;
                  }
                }
              }
              .chara {
                padding: 26px 0 30px 0;
                text-align: center;
                > div {
                  span:nth-child(1) {
                    vertical-align: bottom;
                  }
                  span:nth-child(2) {
                    display: inline-block;
                    max-width: 165px;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    vertical-align: bottom;
                    text-align: left;
                    cursor: default;
                  }
                }
              }
            }
          }
        }
      }
    }
    .why {
      text-align: left;
      padding-left: 21px;
      padding-bottom: 98px;
      margin-top: 35px;
      p {
        color: #999999;
      }
    }
  }
}
</style>

