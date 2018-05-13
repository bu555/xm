<template>
  <div class="reset">
        <!--重设密码视图-->
        <div class="reset-box" v-if="!resetSuccess"  v-loading="isSubmit">
                <div class="title">设置新密码</div>
                <form>
                    <div class="form-group">
                        <label for="exampleInputPassword">新密码</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword" placeholder="密码由6-16个字母、数字和符号组成" @blur="verifyPassword()">
                        <div v-if="!passwordVerify" class="error-msg">请输入正确密码</div>
                    </div>
                    <div class="form-group" style="margin-bottom:36px">
                        <label for="exampleInputPassword">密码确认</label>
                        <input v-model="password_" type="password" class="form-control" id="exampleInputPassword1" placeholder="新密码确认" @blur="verifyPassword_()">
                         <div class="error-msg" v-if="!password_Verify">两次输入的密码不一致</div>
                    </div>
                    <button @click="reset()" type="button" class="btn btn-primary" style="width:100%">提 交</button>
                </form>

        </div>
        <!--密码设置成功后提示视图-->
        <div class="success-info" v-if="resetSuccess">
                <i class="el-icon-success" style="font-size:50px;color:#67c23a;margin-top:22px"></i><br/>
                <div style="margin-top:25px;margin-bottom:12px">
                    您的密码已设置成功！
                </div>
                <div style="color:#808080;font-size:14px"> 
                    <span @click="goLogin()" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                        前往登录
                    </span>
                </div>
            <p></p>
        </div>
  </div>
</template>
<script>
import verify from "../../assets/verify"
export default {
  data() {
      return {
        password:'',
        password_:'',
        uid:'',
        pwd:'',
        resetSuccess:false,
        passwordVerify:true,
        password_Verify:true,
      }
  },
  mounted() {
  },
  methods: {
        //   验证密码
        verifyPassword(){
            this.passwordVerify = verify.password(this.password)
        },
        //   验证再次输入的密码
        verifyPassword_(){
            if(verify.password(this.password)){
                this.password_Verify = this.password===this.password_ ? true:false
            }else{
                this.password_Verify =  false
            }
        },
        //重设密码提交
        reset() {
            if(this.isSubmit) return;
            this.verifyPassword()
            this.verifyPassword_()
            if(!this.passwordVerify || !this.password_Verify) return;
            this.isSubmit = true;
            this.$axios.resetPwd({
                password:this.password,
                uid:this.uid,
                pwd:this.pwd,
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    this.resetSuccess = true;
                    this.$router.push({
                        query:{
                            status:'success'
                        }
                    })
                }else{

                }
            }).catch(res=>{
                this.isSubmit = false;
            })
        },
        goLogin(){
            this.$router.push({path:'/user/login'})
        }
    
  },
  created(){
      if(this.$route.query.uid && this.$route.query.pwd){
          this.uid = this.$route.query.uid;
          this.pwd = this.$route.query.pwd;
      }
      if(this.$route.query.status && this.$route.query.status==='success'){
          this.resetSuccess = true;
      }
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false); 
  }
};
</script>
<style lang="less">
.reset {
    margin:0 auto;
    max-width: 400px;
    .email-box,.reset-box {
        background-color: #fefefe;
        border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:16px .13rem 32px;;
            background-color: #fdfdfd;
            // background-color: rgba(89,142,210,.2);
        }
        .title {
            text-align: center;
            font-weight: 700;
            border:1px solid #337ab7;
            border-bottom:1px solid #598dd3;
            background-color: #598dd3;
            padding: .04rem 0 .04rem;
            font-size:.06rem;
            margin:-1px -1px;
            color:#f5f5f5;
            border-radius:3px 3px 0  0;
            @media screen and (max-width:992px){
                font-size:.09rem;
            }
            @media screen and (max-width:767px){
                font-size:.18rem;
            }
        }
        
    }
    .success-info {
        text-align: center;
        padding-top:40px;
    }
    .form-group {
        position: relative;
        margin-bottom:15px;
        .error-msg {
            // padding-left:80px;
            color:#f10d0e;
            position:absolute;
            height:30px;
            line-height:15px;
            bottom:-32px;
            left:0;
            font-size:11px;
            padding-left:90px;
            text-indent:-90px; //换行后缩进
            i {
                color:#d62921;
            }
        }
    }
}
</style>



