<template>
  <div class="reset">
      <!--邮件发送视图-->
        <div class="email-box" v-if="!showResetBox">
                <div class="title">找回密码</div>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">邮箱地址</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">验证码</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="验证码">
                    </div>
                    <!--<div class="form-group">
                        <label for="exampleInputFile">File input</label>
                        <input type="file" id="exampleInputFile">
                        <p class="help-block">Example block-level help text here.</p>
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
        <!--重设密码视图-->
        <div class="reset-box" v-if="showResetBox&&!resetSuccess">
                <div class="title">设置新密码</div>
                <form>
                    <div class="form-group">
                        <label for="exampleInputPassword">密码</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword" placeholder="新密码">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword">密码确认</label>
                        <input v-model="password1" type="password" class="form-control" id="exampleInputPassword1" placeholder="新密码确认">
                    </div>
                    <button @click="reset()" type="button" class="btn btn-primary" style="width:100%">提 交</button>
                </form>

        </div>
        <!--密码设置成功后提示视图-->
        <div class="success-info" v-if="resetSuccess">
                <i class="glyphicon glyphicon-ok-sign" style="font-size:50px;color:#67c23a;margin-top:22px"></i><br/>
                <div style="margin-top:25px;margin-bottom:12px">
                    密码设置成功！
                </div>
                <div style="color:#808080;font-size:14px"> 
                    <!--<span style="font-size:15px">
                        {{time}}
                    </span>
                    秒后将为你自动跳转登录 或 -->
                    <span @click="goLogin()" style="color:#8db4e2;text-decoration:underline;cursor:pointer">
                        前往登录
                    </span>
                </div>
            <p></p>
        </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        email:'',
        isSubmit:false,
        emailSuccess:false, //邮件发送成功
        emailName:'',
        password:'',
        password1:'',
        uid:'',
        pwd:'',
        showResetBox:false, //控制重设视图
        resetSuccess:false, //重设成功
        successInfo:false
      }
  },
  mounted() {
  },
  methods: {
        //邮件找回提交
        sendEmail() {
            this.isSubmit = true;
            this.$axios.emailRetrieve({
                email:this.email
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    this.emailSuccess = true;
                    this.emailName = res.data.email;
                }else{
                    
                }
            }).catch(res=>{})
        },
        //重设密码提交
        reset() {
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
            }).catch(res=>{})
        },
        goLogin(){
            this.$router.push({path:'/user/login'})
        }
    
  },
  created(){
      if(this.$route.query.uid && this.$route.query.pwd){
          this.uid = this.$route.query.uid;
          this.pwd = this.$route.query.pwd;
          this.showResetBox = true; //将重设密码输入框显示，同时隐藏邮箱找回输入框
      };
      if(this.$route.query.status && this.$route.query.status==='success'){
          this.showResetBox=true;
          this.resetSuccess=true;
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
        border:1px solid #eee;
        border-radius:3px;
        margin:42px 4px;
        form {
            padding:10px .13rem 32px;;
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
    .success-info {
        text-align: center;
    }
}
</style>



