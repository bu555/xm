<template>
  <div class="register">
      <div class="box">
        <div class="title">注 册</div>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">邮箱地址</label>
                <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱" @input="verifyName()" spellcheck="false">
                <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码" @input="verifyPassword()">
                <div v-if="!passwordVerify" class="error-msg">请输入正确密码</div>
                <!--<div v-if="!passwordVerify" class="error-msg">请输入正确密码 <span></span>规则(6位以上,包含大小写、数字、半角符号至少两种)</div>-->
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2">确认密码</label>
                <input v-model="password_" type="password" class="form-control" id="exampleInputPassword2" placeholder="确认密码" @input="verifyPassword_()">
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
            console.log('submin!');
            this.isSubmit = true;
            this.$axios.register({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    this.$message({
                        message: '注册成功！',
                        type: 'success'
                    });
                    //带上用户名，跳转到login
                    this.$router.push({
                                path:'/user/login',
                                query:{name:res.data.name}
                            })
                    // this.success = true;
                    // this.count = res.data.count;
                    // this.loginedName = res.data.name;
                    // var _this = this;
                    // this.timeID = setInterval(function() {
                    //     _this.time--;
                    //     if(_this.time==0){
                    //         _this.$router.push({
                    //             path:'/user/login',
                    //             query:{name:_this.loginedName}
                    //         })
                    //         clearInterval(_this.timeID);
                    //     }
                    // },1000);
                }else{
                    this.$message.error('注册失败！'+ res.data.message?res.data.message:'');
                }
            }).catch(res=>{
                this.isSubmit = false;
            })
        },
    
  },
  mounted(){
  },
  created(){
      //从注册成功跳转的会带name
    //   this.ruleForm.name = this.$route.query.name || 'bzg@qq.com';
  }
};
</script>
<style lang="less">
    .register {
    margin:0 auto;
    max-width: 400px;
        .box {
            background-color: #fefefe;
            border:1px solid #eee;
            border-radius:3px;
            margin:42px 4px;
            form {
                padding:10px 20px 32px;;
                // background-color: rgba(89,142,210,.2);
            }
            .title {
                text-align: center;
                font-weight: 700;
                border-bottom:1px solid #f5f5f5;
                // background-color: #fdfdfd;
                padding: .04rem 0 .04rem;
                font-size:.07rem;
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
                color:#d55152;
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
        .check-box {
             margin-bottom:18px;
             position: relative;
            .agree-msg {
                position: absolute;
                bottom:-9px;
                left:0;
                font-size:11px;
                line-height:15px;
                color:#d55152;
            }

        }
        
    }

</style>



