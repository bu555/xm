<template>
  <div class="send-mail">
      <!--邮件发送视图-->
        <div class="email-box" v-if="!emailSuccess" v-loading="isSubmit">
                <div class="title">找回密码</div>
                <form>
                    <div class="form-group" style="margin-bottom:30px">
                        <label for="exampleInputEmail1">邮箱</label>
                        <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="输入邮箱" @blur="verifyName()" spellcheck="false">
                        <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
                    </div>
                    <!--<div class="form-group">
                        <label for="exampleInputPassword1">验证码</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="验证码">
                    </div>-->
                    <button @click="sendEmail()" type="button" class="btn btn-primary" style="width:100%">提 交</button>
                    <div style="text-align:center;padding-top:16px">
                        <div>
                            或
                            <router-link to="/user/login"><a>这里登录</a></router-link>
                        </div>
                    </div>
                </form>
        </div>
        <!--发送邮件成功视图-->
        <div class="success-info" v-if="emailSuccess">
            <i class="el-icon-success" style="font-size:55px;color:#67c23a;margin-top:22px"></i><br/>
            <div style="margin-top:25px;margin-bottom:12px">
                邮件已发送至{{emailName}}，请登录邮箱进行密码设置操作。
                <span style="font-size:22px;font-family:STHupo;font-style: italic;color:#2c3e50;text-shadow:1px 0 4px #666">
                    <!--{{count}}-->
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
        name:'',
        nameVerify:true,
        isSubmit:false,
        emailSuccess:false, //邮件发送成功
        emailName:'',
      }
  },
  mounted() {
  },
  methods: {
        //   验证账号
        verifyName(){
            this.nameVerify = verify.email(this.name)
        },
        //邮件找回提交
        sendEmail() {
            if(this.isSubmit) return
            this.verifyName()
            if(!this.nameVerify) return
            this.isSubmit = true;
            this.$axios.emailRetrieve({
                email:this.name
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    this.emailSuccess = true;
                    this.emailName = res.data.email;
                }else if(res.data.code==='-1'){
                    this.$message.error('此邮箱未注册！');
                }else{
                    this.$message.error('邮件发送失败！');
                }
            }).catch(res=>{
                this.isSubmit = false;
            })
        },
    
  },
  created(){
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false); 
  }
};
</script>
<style lang="less">
.send-mail {
    margin:0 auto;
    max-width: 400px;
    .email-box,.reset-box {
        background-color: #fefefe;
        border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:16px .13rem 32px;;
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



