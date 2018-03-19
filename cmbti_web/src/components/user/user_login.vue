<template>
  <div class="login">
        <h2 class="title">请登录</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm c-login">
            <el-form-item label="" prop="name">
                <el-input placeholder="用户名" v-model="ruleForm.name" class="demo-item" spellcheck="false">
                    <template slot="prepend"><i class="fa fa-user fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" class="form-item">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" class="demo-item" spellcheck="false">
                    <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
                <el-input placeholder="验证码" v-model="ruleForm.code" class="demo-item" spellcheck="false">
                    <template slot="prepend" style="width:110px"><img src="" alt="验证码图片" style="width:14px"></template>
                </el-input>
            </el-form-item>
            <el-form-item v-if="!isSubmit">
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">登 录</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
            <el-form-item v-if="isSubmit">
                <el-button type="primary" style="width:100%">正在登录<i class="el-icon-loading"></i> </el-button>
            </el-form-item>
            <ul class="link-list">
                    <li>
                        <router-link to="/user/register">
                            <span>注册</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user/reset">
                            <span>忘记密码</span>
                        </router-link>
                    </li>
            </ul>
        </el-form>
  </div>
</template>
<script>
export default {
  data() {
      return {
        ruleForm: {
          name: '',
          password: 'a55555',
          code: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        isSubmit:false
      }
  },
  mounted() {
  },
  methods: {
        //点击登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isSubmit = true;
                    // alert('submit!');
                    this.$axios.login({
                        name:this.ruleForm.name,
                        password:this.ruleForm.password
                    }).then(res=>{
                        this.isSubmit = false;
                        if(res.data.success){
                            var beforeLoginPath = sessionStorage.getItem('beforeLoginPath')||'/';
                            localStorage.setItem('user',JSON.stringify(res.data.user));
                            this.$store.commit('setUserName',res.data.user.role_name);
                            this.$router.push({
                                path:beforeLoginPath
                            })
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                // type: 'warning',
                                type: 'error',
                                duration:3000
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            showClose: true,
                            message: '操作失败，请稍后重试！',
                            type: 'warning',
                            duration:3000
                        });
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    
  },
  created(){
      //从注册成功跳转的会带name
      this.ruleForm.name = this.$route.query.name || 'bzg@qq.com';
  }
};
</script>
<style lang="less">
    .login {
        margin-top:30px;
        .title {
            font-size:22px;
        }
        .demo-ruleForm.c-login {
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
            padding-left:50px;
            text-align:center;
            li {
                // float:left;
                display:inline-block;
                margin-left:50px;
                span {
                    color:#3b7ab5;
                    font-size:14px;
                }
            }
        }
        .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
            // border-color: #67c23a;
            border-color: #dcdfe6;

        }
    }

</style>



