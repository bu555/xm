<template>
  <div class="resetPassword">
      <!--填写邮箱申请视图-->
     <div class="email-retrieve" v-if="isShow">
        <h2 v-if="!emailSuccess" class="title">找回密码</h2>
        <el-form v-if="!emailSuccess" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm c-reset">
            <el-form-item label="" prop="email">
                <el-input placeholder="输入邮箱" v-model="ruleForm.email" class="demo-item" spellcheck="false">
                    <template slot="prepend"><i class="fa fa-envelope-o fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
                <el-input placeholder="验证码" v-model="ruleForm.code" class="demo-item" spellcheck="false">
                    <template slot="prepend" style="width:110px"><img src="" alt="验证码图片" style="width:14px"></template>
                </el-input>
            </el-form-item>
            <el-form-item v-if="!isSubmit">
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">提 交</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
            <el-form-item v-if="isSubmit">
                <el-button type="primary" style="width:100%">提交中<i class="el-icon-loading"></i> </el-button>
            </el-form-item>
            <ul class="link-list">
                <li>或</li>
                <router-link to="/user/login">
                <li class="link">这里登录</li>
                </router-link>
            </ul>
        </el-form>
        <div class="success-info" v-if="emailSuccess">
            <i class="el-icon-success" style="font-size:55px;color:#67c23a;margin-top:22px"></i><br/>
            <div style="margin-top:25px;margin-bottom:12px">
                邮件已发送至{{emailName}}，请登录邮箱进行密码设置操作。
                <span style="font-size:22px;font-family:STHupo;font-style: italic;color:#2c3e50;text-shadow:1px 0 4px #666">
                    <!--{{count}}-->
                </span>
            </div>
            <!--<div style="color:#808080;font-size:14px"> 
                <span style="font-size:15px">
                </span>
                秒后将为你自动跳转登录 或 
                <span @click="goLogin" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                    点此登录
                </span>
            </div>-->
            <p></p>
        </div>
     </div>
     <!--重设密码视图-->
     <div class="reset" v-if="!isShow">
        <h2 class="title" v-if="!resetSuccess">设置新密码</h2>
        <!--<p style="color:#538dd5;font-size:11px">请重新设置你的密码</p>-->
        <el-form v-if="!resetSuccess" :model="resetForm" :rules="rules1" ref="resetForm" label-width="100px" class="demo-ruleForm c-reset">
            <el-form-item label="" prop="password1" class="form-item">
                <el-input type="password" placeholder="输入新密码" v-model="resetForm.password1" class="demo-item" spellcheck="false">
                    <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password2" class="form-item">
                <el-input type="password" placeholder="再次输入密码" v-model="resetForm.password2" class="demo-item" spellcheck="false">
                    <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <!--<el-form-item label="" prop="code">
                <el-input placeholder="驗證碼" v-model="ruleForm.code" class="demo-item">
                    <template slot="prepend" style="width:110px"><img src="" alt="驗證碼圖片" style="width:14px"></template>
                </el-input>
            </el-form-item>-->
            <el-form-item v-if="!isSubmit">
                <el-button type="primary" @click="submitResetForm('resetForm')" style="width:100%">提 交</el-button>
            </el-form-item>
            <el-form-item v-if="isSubmit">
                <el-button type="primary" style="width:100%">提交中<i class="el-icon-loading"></i> </el-button>
            </el-form-item>
        </el-form>
        <div class="success-info" v-if="resetSuccess">
            <i class="el-icon-success" style="font-size:50px;color:#67c23a;margin-top:22px"></i><br/>
            <div style="margin-top:25px;margin-bottom:12px">
                密码设置成功！
            </div>
            <div style="color:#808080;font-size:14px"> 
                <!--<span style="font-size:15px">
                    {{time}}
                </span>
                秒后将为你自动跳转登录 或 -->
                <span @click="goLogin" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                    点击登录
                </span>
            </div>
            <p></p>
        </div>
     </div>
  </div>
</template>
<script>
export default {
  data() {
        //匹配密码强度和长度
        var validatePass1 = (rule, value, callback) => {
            var regArr = [];
            var count = 0;
            regArr.push(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/); //匹配半角符号
            regArr.push(/[a-z]/); 
            regArr.push(/[A-Z]/); 
            regArr.push(/[0-9]/); 
            regArr.forEach((v,i)=>{
                if(v.test(value)){
                    count++;
                }
            })
            if((value.length<6 || value.length>24) || count<2) {
                callback(new Error('不少于6位，需包含大写、小写、数字、半形标点至少2种！'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if(value !== this.ruleForm. password1) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            if(value !== this.resetForm. password1) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
        //密码重设
        resetForm: {
          uid:'',
          pwd:'',
          password1: '',
          password2: '',
          code: 'a'
        },
        rules1: {
          password1: [
                { required: true, message: '输入新密码', trigger: 'blur' },
                { validator: validatePass1, trigger: 'blur' }
            ],
            password2: [
                { required: true, message: '再次输入密码', trigger: 'blur' },
                { validator: validatePass3, trigger: 'blur' }
            ],
            code: [
                { required: true, message: '输入验证码', trigger: 'blur' },
            ]
        },
        //邮箱找回
        ruleForm: {
          email: '',
          code: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入您注册的邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '输入验证码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        isShow:true,
        emailSuccess:false, //邮件申请ok
        emailName:'',
        resetSuccess:false,
        isSubmit:false,
      }
  },
  methods: {
        //邮件找回提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    this.$axios.emailRetrieve({
                        email:this.ruleForm.email
                    }).then(res=>{
                        this.isSubmit = false;
                        if(res.data.success){
                            this.emailSuccess = true;
                            this.emailName = res.data.email;
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                // type: 'warning',
                                type: 'error',
                                duration:5000
                            });
                        }
                    }).catch(res=>{})
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重设密码提交
        submitResetForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    this.isSubmit = true;
                    this.$axios.resetPwd({
                        password:this.resetForm.password1,
                        uid:this.resetForm.uid,
                        pwd:this.resetForm.pwd,
                    }).then(res=>{
                        this.isSubmit = false;
                        if(res.data.success){
                            this.resetSuccess = true;
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'warning',
                                duration:5000
                            });
                        }
                    }).catch(res=>{})
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        goLogin(){
            this.$router.push({path:'/user/login'})
        }
    
  },
  mounted(){
  },
  created(){
      if(this.$route.query.uid && this.$route.query.pwd){
          this.resetForm.uid = this.$route.query.uid;
          this.resetForm.pwd = this.$route.query.pwd;
          this.isShow = false; //将重设密码输入框显示，同时隐藏邮箱找回输入框
      };
      //从模态登录进入，关闭模态框
      this.$store.commit('setModalLogin',false); 
  }
};
</script>
<style lang="less">
    .resetPassword {
        margin-top:30px;
        text-align:center;
        .title {
            font-size:22px;
        }
        .demo-ruleForm.c-reset {
            width: 420px;
            margin:20px auto;
            -webkit-transform:translate(-50px);
            -o-transform:translate(-50px);
            -moz-transform:translate(-50px);
            .demo-item {
                // margin-top:8px;
            }
        }
        .link-list {
            margin:0 auto;
            padding-left:100px;
            text-align:center;
            li {
                // float:left;
                display:inline-block;
                // margin-left:50px;
                font-size:14px;
            }
            li.link {
                color:#3b7ab5;
            }
        }
        .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
            // border-color: #67c23a;
            border-color: #dcdfe6;

        }

    }

</style>



