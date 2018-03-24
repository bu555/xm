<template>
  <div class="register">
        <div v-if="!showTerms">
            <h2 class="title" v-if="!success">注册一个账号</h2>
            <el-form v-if="!success" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm c-register">
                <el-form-item label="" prop="name">
                    <el-input placeholder="输入邮箱进行注册" v-model="ruleForm.name" class="demo-item" spellcheck="false">
                        <template slot="prepend"><i class="fa fa-envelope-o fa-fw" style="font-size: 20px;width:14px"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password1" class="form-item">
                    <el-input type="password" placeholder="输入密码" v-model="ruleForm.password1" class="demo-item" spellcheck="false">
                        <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password2" class="form-item">
                    <el-input type="password" placeholder="再次输入密码" v-model="ruleForm.password2" class="demo-item" spellcheck="false">
                        <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="code">
                    <el-input placeholder="验证码" v-model="ruleForm.code" class="demo-item" spellcheck="false">
                        <template slot="prepend" style="width:110px"><img src="" alt="验证码图" style="width:14px"></template>
                    </el-input>
                </el-form-item>
                    <div style="margin-bottom:18px;font-size:13px;text-align:left;padding-left:101px"> 
                        注册即代表你同意
                        <span style="color:#4d9efc;cursor:pointer" @click="serverTerm()">服务协议</span>
                    </div>
                <el-form-item v-if="!isSubmit">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">注 册</el-button>
                    <el-button type="primary" @click="search()" style="width:100%">查询</el-button>
                </el-form-item>
                <el-form-item v-if="isSubmit">
                    <el-button type="primary" style="width:100%">注册申请中<i class="el-icon-loading"></i> </el-button>
                </el-form-item>
                <ul class="link-list">
                    <li>已经注册了账户？</li>
                    <li class="link">
                        <router-link to="/user/login">
                            <span>这里登录</span>
                        </router-link>
                    </li>
                </ul>
            </el-form>
            <div class="success-info" v-if="success">
                <i class="el-icon-success" style="font-size:70px;color:#67c23a;margin-top:22px"></i><br/>
                <div style="margin-top:25px;margin-bottom:12px">
                    恭喜注册成功！您是我们的第
                    <span style="font-size:22px;font-family:STHupo;font-style: italic;color:#2c3e50;text-shadow:1px 0 4px #666">
                        {{count}}
                    </span>位用户，欢迎您的加入。
                </div>
                <div style="color:#808080;font-size:14px"> 
                    <span style="font-size:15px">
                        {{time}}
                    </span>
                    秒后将为你自动跳转登录 或 
                    <span @click="goLogin" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                        点此登录
                    </span>
                </div>
                <p></p>
            </div>
        </div>
        <!--服务条款组件-->
        <serviceTerms v-on:child-say="listenChild" v-if="showTerms"></serviceTerms>
  </div>
</template>
<script>
import serviceTerms from "./service_terms"
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
      return {
        success:false,
        count:123456789,
        timeID:'',
        loginedName:'', //已登录的name
        time:9,
        isSubmit:false,
        showTerms:false,
        ruleForm: {
          name: 'bzg@qq.com',
          password1: 'a55555',
          password2: 'a55555',
          code: 'a'
        },
        rules: {
          name: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password1: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass1, trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      }
  },
  mounted() {
  },
  methods: {
      //注册提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.isSubmit = true;
                this.$axios.register({
                    name:this.ruleForm.name,
                    password:this.ruleForm.password1
                }).then(res=>{
                    this.isSubmit = false;
                    if(res.data.success){
                        this.success = true;
                        this.count = res.data.count;
                        this.loginedName = res.data.name;
                        var _this = this;
                        this.timeID = setInterval(function() {
                            _this.time--;
                            if(_this.time==0){
                                _this.$router.push({
                                    path:'/user/login',
                                    query:{name:_this.loginedName}
                                })
                                clearInterval(_this.timeID);
                            }
                        },1000);
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            // type: 'warning',
                            type: 'error',
                            duration:3000
                        });
                    }
                }).catch(res=>{})

            } else {
                return false;
            }
            });
        },
        goLogin(){
            clearInterval(this.timeID);
            this.$router.push({
                path:'/user/login',
                query:{name:this.loginedName}
            });
        },
        // 监听子组件传值
        listenChild(data){
            this.showTerms = false;
            this.$router.push({
                hash:''
            })
        },
        search(){
            
                this.$axios.search().then(res=>{
                    console.log(res);
                }).catch(res=>{
                    console.log(res);
                })
        },
        serverTerm(){
            this.showTerms = true;
            this.$router.push({
                hash:'terms'
            })
        }
    
  },
  components: {
      serviceTerms
  },
  created(){
      console.log(this.$route.hash);
      if(this.$route.hash === '#terms'){
          this.showTerms = true;
      }
  }
};
</script>
<style lang="less">
    .register {
        margin-top:30px;
        text-align:center;
        .title {
            font-size:22px;
        }
        .demo-ruleForm.c-register {
            width: 442px;
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
                font-size:14px;
                span {
                    color:#3b7ab5;
                }
            }
        }
        .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
            // border-color: #67c23a;
            border-color: #dcdfe6;

        }
    }

</style>



