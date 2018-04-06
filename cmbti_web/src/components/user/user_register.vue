<template>
  <div class="register">
      <div class="box">
        <div class="title">注 册</div>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">邮箱地址</label>
                <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">密码</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">确认密码</label>
                <input v-model="password1" type="password" class="form-control" id="exampleInputPassword1" placeholder="确认密码">
            </div>
            <!--<div class="form-group">
                <label for="exampleInputFile">File input</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Example block-level help text here.</p>
            </div>-->
            <div class="checkbox">
                <label>
                <input type="checkbox"> 我同意
                </label>
                    <a style="cursor:pointer">《XX协议》</a>
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
export default {
  data() {
      return {
        name:'',
        password:'',
        password1:'',
        isSubmit:false,
        count:0,
      }
  },
  mounted() {
  },
  methods: {
        //注册提交
        register() {
            if(this.isSubmit) return;
            this.isSubmit = true;
            this.$axios.register({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    console.log(res.data);
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
                    console.log('error!',res.data.message);
                }
            }).catch(res=>{})
        },
    
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
            border:1px solid #f5f5f5;
            border-radius:3px;
            margin:4px;
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
        
    }

</style>



