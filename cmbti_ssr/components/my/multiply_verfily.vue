<template>
    <div>
        <h1>HI-LO 游戲結果校驗</h1>
        <p>输入标题为PREVIOUS ROLL DETAILS的部分中的详细信息，您可以在单击显示PROVABLY FAIR的链接后查看，以确认您滚动的数字确实可以证明是公平的（即我们在您点击ROLL后没有更改滚动结果）</p>
        <p>并且我们确实使用了我们在滚动之前向您展示的相同服务器和客户端种子，以生成滚动数字。</p>
        <p>此滚动验证程序完全用javascript编码，因此您可以查看源代码以查看滚动的计算方式，我们将无法以任何方式操作此脚本，因为计算在此处在您的浏览器中完成并且源代码已打开大家都看。</p>
        <div class="line"></div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="top">
                    <p class="name">服務器種子:</p>
                    <div class="in">
                        <input type="text" v-model="serverSeed">
                    </div>
                </div>
                <div class="blank"></div>
                <div class="top">
                    <p class="name">服务器种子HASH:</p>
                    <div class="in">
                        <input type="text" v-model="serverHash">
                    </div>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div class="bottom media_bottom">
                    <p class="name">客户种子：</p>
                    <div class="in">
                        <input type="text" v-model="clientSeed">
                    </div>
                </div>
                <div class="blank"></div>
                <div class="bottom">
                    <p class="name">隨機數:</p>
                    <div class="in">
                        <input type="text" v-model="clientNonce">
                    </div>
                </div>
            </div>
            <div>
                <div class="btn" @click="verify">驗證</div>
            </div>
            <div class="result" v-loading="load_result">
                <p v-if="show_result" style="font-weight:600;color:black;">{{hi_lo}}</p>
                <p v-if="show_result" style="font-size:26px;color:#ac8466;">{{result}}</p>
            </div>
        </div>
        
    </div>
</template>
<script>
import mGame from "@/axios_joggle/axios_game";
let CryptoJS = require("crypto-js");
export default {
  data() {
    return {
      serverSeed: "",
      serverHash: "",
      clientSeed: "",
      clientNonce: "",
      result: "",
      show_result: false,
      lock: true,
      load_result: false,
      hi_lo: "",
    };
  },
  methods: {
    verify() {
      this.show_result = true;
      this.load_result = false;
      this.verify_result();
      //   if (
      //     this.serverHash &&
      //     this.clientSeed &&
      //     this.clientSeed &&
      //     this.clientNonce &&
      //     this.lock
      //   ) {
      //     this.load_result = true;
      //     this.lock = false;
      //     mGame
      //       .verify_random({
      //         ServerSeedHash: this.serverHash,
      //         ServerSeed: this.serverSeed,
      //         ClientSeed: this.clientSeed,
      //         Nonce: this.clientNonce
      //       })
      //       .then(res => {
      //         this.lock = true;
      //         this.load_result = false;
      //         if (res.data.ResultCode == 200) {
      //           this.show_result = true;
      //           this.result = res.data.Data;
      //         }
      //       });
      //   }
    },
    verify_result() {
      // decode服務器種子
      let aa = decodeURIComponent(this.serverSeed);
      let ee = decodeURIComponent(this.serverHash);
      // 客戶端種子
      let bb = this.clientSeed;
      // 服務器hash
      let dd = CryptoJS.SHA256(aa).toString(CryptoJS.enc.Hex);
      // 隨機數
      let no = JSON.stringify(this.clientNonce);
      //   console.log(aa,dd)
      let s1 = no.concat(":", aa, ":", no);
      let s2 = no.concat(":", bb, ":", no);
      let cc = CryptoJS.HmacSHA512(s1, s2).toString(CryptoJS.enc.Hex);
      let s3 = cc.substring(0, 8);
      let num = parseInt(s3, 16);
      var roll = Math.round(num / 429496.7295).toFixed(0);
      this.result = roll;
      if (
        aa == this.$route.query.ServerSeed &&
        ee == this.$route.query.ServerSeedHash
      ) {
        this.hi_lo = "HI-LO 服務種子HASH匹配：";
      } else {
        this.hi_lo = "HI-LO 服務種子HASH不匹配：";
      }
    }
  },
  created() {
    this.serverSeed = this.$route.query.ServerSeed;
    this.serverHash = this.$route.query.ServerSeedHash;
    this.clientSeed = this.$route.query.ClientSeed;
    this.clientNonce = this.$route.query.Nonce;
  }
};
</script>
<style lang="less" scoped>
@media screen and(max-width: 430px) {
  .blank {
    display: none;
  }
  .top {
    margin-bottom: 0 !important;
  }
  .media_bottom {
    margin-top: 20px;
  }
}
h1 {
  color: #ac8466;
  font-weight: 600;
  margin: 40px auto;
}
.result {
  min-height: 100px;
}
.name {
  width: 100%;
  color: black;
}
.blank {
  display: inline-block;
  width: 86px;
}
.btn {
  max-width: 143px;
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: white;
  background: #ac8466;
  border-radius: 32px;
  font-size: 18px;
  margin: 40px auto;
  padding: 0;
}
.btn:hover {
  opacity: 0.8;
}
.top {
  display: inline-block;
  max-width: 344px;
  width: 100%;
  margin-bottom: 45px;
  p {
    text-align: left;
    font-weight: 500;
  }
}
.bottom {
  display: inline-block;
  max-width: 344px;
  width: 100%;
  p {
    text-align: left;
    font-weight: 500;
  }
}
.in {
  input {
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    color: #656565;
    padding-left: 15px;
    max-width: 344px;
    width: 100%;
    height: 46px;
    background: rgb(244, 244, 244);
    font-size: 18px;
  }
}
.row {
  margin: 0;
  padding: 0;
}
.line {
  border-bottom: 1px dashed #e5e5e5;
  margin: 60px auto;
}
p {
  font-size: 18px;
  color: #808080;
}
</style>
<style>
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
