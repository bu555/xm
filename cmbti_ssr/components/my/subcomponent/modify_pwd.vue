<template>
    <div class="modify-pwd" v-loading="loading">
        <div class="title">修改密碼</div>
        <div class="m-content">
            <div>
                <!--<div class="form-group">
                <label for="exampleInputEmail22">賬號</label>
                <input type="text" class="form-control" id="exampleInputEmail22" placeholder="輸入郵箱" v-model="name" @input="verifyInput('name')" @keyup.enter="modify()">
                <span class="err-message"  v-if="!ver.email">請輸入正確的郵箱</span>
            </div>-->
                <div class="form-group">
                    <label for="exampleInputPassword1">原密碼</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="輸入原密碼" v-model="oldPassword" @focusout="verifyInput('oldPassword')"     @keyup.enter="modify()">
                    <!--<input type="password" class="form-control" id="exampleInputPassword1" placeholder="輸入原密碼" v-model="oldPassword" @focusout="verifyInput('oldPassword')"    @input="oldPwdFoc?verifyInput('oldPassword'):''" @keyup.enter="modify()">-->
                    <span class="err-message" v-if="ver.oldPwd==='empty'">請輸入原密碼</span>
                    <span class="err-message" v-if="ver.oldPwd==='notPass'">請輸入正確的密碼，（8-24位長度字元，支援大寫英文、小寫英文、數字、半形標點，並包含至少三種）</span>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">新密碼</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="輸入新密碼" v-model="newPassword" @focusout="verifyInput('newPassword')"   @keyup.enter="modify()">
                    <!--<input type="password" class="form-control" id="exampleInputPassword2" placeholder="輸入新密碼" v-model="newPassword" @focusout="verifyInput('newPassword')"  @input="newPwdFoc?verifyInput('newPassword'):''" @keyup.enter="modify()">-->
                    <span class="err-message" v-if="ver.newPwd==='empty'">請輸入新密碼</span>
                    <span class="err-message" v-if="ver.newPwd==='notPass'">請輸入正確的密碼，（8-24位長度字元，支援大寫英文、小寫英文、數字、半形標點，並包含至少三種）</span>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword3">確認密碼</label>
                    <input type="password" class="form-control" id="exampleInputPassword3" placeholder="確認新密碼" v-model="newPassword1" @focusout="verifyInput('newPassword1')"  @keyup.enter="modify()">
                    <!--<input type="password" class="form-control" id="exampleInputPassword3" placeholder="確認新密碼" v-model="newPassword1" @focusout="verifyInput('newPassword1')"  @input="newPwd1Foc?verifyInput('newPassword1'):''" @keyup.enter="modify()">-->
                    <span class="err-message" v-if="ver.newPwd1==='empty'">再次輸入新密碼</span>
                    <span class="err-message" v-if="ver.newPwd1==='notPass' ">請輸入正確的密碼，（8-24位長度字元，支援大寫英文、小寫英文、數字、半形標點，並包含至少三種）</span>
                    <span class="err-message" v-if="ver.newPwd1==='notSame' ">兩次輸入密碼不一致</span>
                </div>
                <br/>
                <div class="btns">
                    <button type="" class="btn btn-default" @click="callClose()">取 消</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="" class="btn btn-primary" v-if="ver.all==='pass'" @click="modify()">保存更改</button>
                    <button type="" class="btn btn-default" v-else disabled>保存更改</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from '~/plugins/axios'
import verify from "../../../assets/verify";

export default {
  data() {
    return {
      name: "a@qq.com",
      oldPassword: "",
      newPassword: "",
      newPassword1: "",
      loading: false,
      ver: {
        email:'',
        oldPwd:'',
        newPwd:'',
        newPwd1:'',
        newPwdSame:'',
        all: ''
      },
      oldPwdFoc:false,
      newPwdFoc:false,
      newPwd1Foc:false,
    };
  },
  watch: {},
  methods: {
    callClose(success = false) {
      this.$emit("closeMe", success);
    },
    //   輸入驗證
    verifyInput(status) {
      if (status === "oldPassword" || status==="all") {
        this.oldPwdFoc = true
        if(this.oldPassword){
            this.ver.oldPwd = verify.password(this.oldPassword) ? 'pass' : 'notPass'
        }else{
            this.ver.oldPwd = 'empty'
        }
      }
      if (status === "newPassword" || status==="all") {
        this.newPwdFoc = true
        if(this.newPassword){
            this.ver.newPwd = verify.password(this.newPassword) ? 'pass' : 'notPass'
        }else{
            this.ver.newPwd = 'empty'
        }
      }
      if (status === "newPassword1" || status==="all") {
        this.newPwd1Foc = true
        if(this.newPassword1){
            this.ver.newPwd1 = verify.password(this.newPassword1) ? 'pass' : 'notPass'
        }else{
            this.ver.newPwd1 = 'empty'
        }
      }
      // 比對一致性
      if((this.ver.newPwd1==='pass'||this.ver.newPwd1==='notSame') && this.ver.newPwd==='pass'){
        this.ver.newPwd1 = this.newPassword1 === this.newPassword ? 'pass' : 'notSame'
      }
      if ( this.ver.oldPwd==='pass' && this.ver.newPwd==='pass' && this.ver.newPwd1==='pass' ) {
          this.ver.all = "pass";
      } else {
        this.ver.all = "notPass";
      }
    },
    //   修改密碼
    //   JSON{"loginName":"","loginPwd":"","NewPassword":""}
    modify() {
      // if(!this.name || !this.newPassword || !this.newPassword1 || !this.oldPassword){
      //     this.$message({
      //         message: '信息輸入不完整',
      //         type: 'warning'
      //     });
      //     return;
      // }
      // if(!verify.email(this.name)){
      //     this.$message({
      //         message: '郵箱格式不正確',
      //         type: 'warning'
      //     });
      //     return;
      // }
      // if(!verify.password(this.newPassword) || !verify.password(this.newPassword1)){
      //     this.$message({
      //         message: '密碼格式不正確（8-24位長度字元，大寫英文、小寫英文、數字、半形標點包含至少三種）',
      //         type: 'warning'
      //     });
      //     return;
      // }
      // if(this.newPassword1 !== this.newPassword){
      //     this.$message({
      //         message: '密碼兩次輸入不一致',
      //         type: 'warning'
      //     });
      //     return;
      // }
      this.verifyInput("all"); //驗證所有
      if (this.ver.all!=='pass') return;
      this.loading = true;
      axios.account.modifyUserPassword({
          // loginName:this.name,
          loginPwd: this.oldPassword,
          NewPassword: this.newPassword
        })
        .then(res => {
          this.loading = false;
          if (res.data.ResultCode == 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.$router.push({ path: "/user/login" });
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style lang="less">
.modify-pwd {
  .title {
    text-align: center;
    height: 68px;
    line-height: 68px;
    font-size: 18px;
    border-bottom: 4px solid #0a53a2;
    color: #2665ab;
    background-color: #fff;
    border-radius: 6px 6px 0 0;
  }
  .m-content {
    text-align: left;
    min-height: 370px;
    background-color: #fff;
    border-radius: 0 0 6px 6px;
    padding: 4% 12% 7%;
    .btns {
      text-align: center;
      button {
        padding: 8px 18px;
        min-width: 99px;
      }
    }
  }
  .form-group {
    position: relative;
    .err-message {
      // text-align:right;
      // position: absolute;
      // top: 66px;
      // left: 1px;
      display:block;
      padding-top:4px;
      color: red;
      line-height: 14px;;
      font-size: 12px;
      margin-bottom:-12px;
    }
  }
  .form-control {
    height: 41px;
  }
  label {
    color: #666666;
    font-weight: 400;
  }
}
</style>
