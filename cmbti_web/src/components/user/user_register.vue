<template>
  <div class="register">
      <div class="box" v-if="!success"  v-loading="isSubmit">
        <div class="title">用户注册</div>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">邮箱</label>
                <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱（用于登录或找回密码）" @blur="nameVerify?verifyName():''"  @input="!nameVerify?verifyName():''"  spellcheck="false">
                <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码由6-16个字母、数字和符号组成" @blur="passwordVerify?verifyPassword():''" @input="!passwordVerify?verifyPassword():''">
                <div v-if="!passwordVerify" class="error-msg">请输入正确密码</div>
                <!--<div v-if="!passwordVerify" class="error-msg">请输入正确密码 <span></span>规则(6位以上,包含大小写、数字、半角符号至少两种)</div>-->
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2">确认密码</label>
                <input v-model="password_" type="password" class="form-control" id="exampleInputPassword2" placeholder="确认密码" @blur="password_Verify?verifyPassword_():''" @input="!password_Verify?verifyPassword_():''" @keyup.enter="register()">
                <div class="error-msg" v-if="!password_Verify">两次输入的密码不一致</div>
            </div>
            <!--<div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>-->
            <div class="check-box">
                <label>
                <input type="checkbox" v-model="isVoted" style="margin-top:-2px"> 我同意
                </label>&nbsp;&nbsp;
                <a style="cursor:pointer"> xmbti协议</a> 
                <div class="agree-msg" v-if="!agreeVerify" @change="verifyAgree()">请阅读并同意协议！</div>
            </div>
            <button type="button" class="btn btn-primary" style="width:100%"  @click="register()">注 册</button>
            <div style="text-align:center;padding-top:16px">
                <div>已经注册了账户？</div>
                <div><router-link to="/user/login"><a>这里登录</a></router-link></div>
            </div>
            
        </form>
    </div>
    <!--注册成功 提示内容-->
    <div class="success-info" v-if="success" style="text-align:center;margin:50px 0 90px">
        <i class="el-icon-success" style="font-size:70px;color:#67c23a;margin-top:22px"></i><br/>
        <div style="margin-top:25px;margin-bottom:12px">
            注册成功！
            <span style="font-size:22px;font-family:STHupo;font-style: italic;color:#2c3e50;text-shadow:1px 0 4px #666">
            </span>
        </div>
        <div style="color:#808080;font-size:14px"> 
            <span style="font-size:15px">
                {{times}}
            </span>
            秒后将为你自动跳转登录 或 
            <span @click="goLogin" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                点此登录
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
        password:'',
        password_:'',
        isSubmit:false,
        isVoted:'',
        count:0,
        nameVerify:true,
        passwordVerify:true,
        password_Verify:true,
        agreeVerify:true,
        success:false,
        times:6,
        timeID:'',
        registedName:''
      }
  },
  watch:{
        "isVoted":"verifyAgree"
  },
  methods: {
        //   验证账号
        verifyName(){
            this.nameVerify = verify.email(this.name)
        },
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
        // //   验证同意协议
        verifyAgree(){
            if(this.isVoted){
                this.agreeVerify = true
            }else{
                this.agreeVerify = false
            }
        },
        
        //注册提交
        register() {
            if(this.isSubmit) return;
            this.verifyName();
            this.verifyPassword();
            this.verifyPassword_();
            this.verifyAgree();
            if(!this.nameVerify || !this.passwordVerify || !this.password_Verify || !this.agreeVerify ) return;
            this.isSubmit = true;
            this.$axios.register({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    // this.$message({
                    //     message: '注册成功！',
                    //     type: 'success'
                    // });
                    this.success = true;
                    this.registedName = res.data.name
                    this.timeID = setInterval(()=> {
                        this.times--
                        if(this.times===0){
                            //带上用户名，跳转到login
                            this.$router.push({
                                path:'/user/login',
                                query:{name:this.registedName}
                            })
                            clearInterval(this.timeID);
                        }
                    },1000);
                }else if(res.data.code==='-1'){
                    this.$message.error('此账号已注册！');
                }else{
                    this.$message.error('注册失败！');
                }
            }).catch(res=>{
                this.isSubmit = false;
            })
        },
        // 往登录
        goLogin(){
            this.$router.push({
                path:'/user/login',
                query:{name:this.registedName}
            })
        }
    
  },
  mounted(){
  },
  created(){
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false);
  }
};
</script>
<style lang="less">
    .register {
    margin:0 auto;
    max-width: 440px;
        .box {
            background-color: #fefefe;
            margin:22px 4px;
            border:1px solid #ddd;
            border-radius:3px 3px 2px 2px;
            form {
                padding:20px 40px 32px;;
                background-color: #fdfdfd;
                // background-color: rgba(89,142,210,.2);
            }
            @media screen and (max-width:500px){
                form {
                    padding:20px 10px 32px;;
                    // background-color: rgba(89,142,210,.2);
                }
            }
            .title {
                text-align: center;
                font-weight: 700;
                border:1px solid #337ab7;
                // border:1px solid #ddd;
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
        .form-group {
            position: relative;
            margin-bottom:19px;
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
                    color:#f10d0e;
                }
            }
        }
        .check-box {
             margin-bottom:18px;
             position: relative;
            .agree-msg {
                position: absolute;
                bottom:-9px;
                left:0;
                font-size:11px;
                line-height:15px;
                color:#f10d0e;
            }

        }
        
    }

</style>



