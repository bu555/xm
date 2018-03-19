<template>
  <div class="register">
        <h2 class="title">註冊一個賬號</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="" prop="name">
                <el-input placeholder="郵箱地址" v-model="ruleForm.name" class="demo-item">
                    <template slot="prepend"><i class="fa fa-envelope-o fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password1" class="form-item">
                <el-input type="password" placeholder="輸入密碼" v-model="ruleForm.password1" class="demo-item">
                    <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="password2" class="form-item">
                <el-input type="password" placeholder="再次輸入密碼" v-model="ruleForm.password2" class="demo-item">
                    <template slot="prepend"><i class="fa fa-lock fa-fw" style="font-size: 20px;width:14px"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item label="" prop="code">
                <el-input placeholder="驗證碼" v-model="ruleForm.code" class="demo-item">
                    <template slot="prepend" style="width:110px"><img src="" alt="驗證碼圖片" style="width:14px"></template>
                </el-input>
            </el-form-item>
                <div style="margin-bottom:18px;font-size:13px;text-align:left;padding-left:101px"> 
                    <!--<el-checkbox label="注册即代表你同意" name="type"></el-checkbox>-->
                    注册即代表你同意
                    <span style="color:#4d9efc;cursor:pointer" @click="serverTerm()">服務條款</span>
                </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%">現在註冊</el-button>
                <el-button type="primary" @click="search()" style="width:100%">search</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
            <ul class="link-list">
                <li>已經註冊了賬戶？</li>
                <li class="link">
                    <router-link to="/user/login">
                        <span>這裡登錄</span>
                    </router-link>
                </li>
            </ul>
        </el-form>
  </div>
</template>
<script>
import userManager from "../../axiosJoggle/UserManager"
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
                callback(new Error('包含大寫、小寫、數字、半形標點至少2種，6-24個字符!'));
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
        ruleForm: {
          name: 'bzg@qq.com',
          password1: 'a123456',
          password2: 'a123456',
          code: 'a'
        },
        rules: {
          name: [
            { required: true, message: '這是必填項', trigger: 'blur' },
            { type: 'email', message: '請輸入正確的郵箱地址', trigger: 'blur,change' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password1: [
            { required: true, message: '這是必填項', trigger: 'blur' },
            // { min: 8, max: 24, message: '包含大寫字母、小寫字母、數字、半形標點至少三種，8-24個字符', trigger: 'blur' },
            { validator: validatePass1, trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '這是必填項', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '這是必填項', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
  },
  mounted() {
  },
  methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.$http);
                console.log(this.url);
                // this.$http({
                //     url:this.url+'/api/user/register',
                //     method:'post',
                //     data:{
                //         name:this.name,
                //         password:this.password1
                //     }
                // })
                // var data =  {
                //         name:this.name,
                //         password:this.password1
                //     }
                // this.$http.post(this.url+'/api/user/register', data)
                // .then(function (response) {
                //     console.log(response);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });

            this.register()


            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        search(){
                this.$http({
                    url:this.url+'/api/user/search',
                    method:'post',
                    data:{
                        name:this.ruleForm.name,
                        password:this.ruleForm.password1
                    }
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
        },
        register(){
                this.$http({
                    url:this.url+'/api/user/login',
                    method:'post',
                    data:{
                        name:this.ruleForm.name,
                        password:this.ruleForm.password1
                    }
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
                

                // this.$http({
                //     url:this.url+'/api/user/register',
                //     method:'post',
                //     data:{
                //         name:this.ruleForm.name,
                //         password:this.ruleForm.password1
                //     }
                // }).then(function (response) {
                //     console.log(response);
                // }).catch(function (error) {
                //     console.log(error);
                // });
        },
        serverTerm(){
            this.$msgbox({
            title: '服務條款',
            message: "content"
            })
        }
    
  },
  components: {
  }
};
</script>
<style lang="less" scoped>
    .register {
        margin-top:38px;
        .title {
            font-size:22px;
        }
        .demo-ruleForm {
            width: 420px;
            margin:10px auto;
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
    }

</style>



