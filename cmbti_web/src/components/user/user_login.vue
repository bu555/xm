<template>
  <div class="login">
      <div class="box">
            <div class="title">登 录</div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">邮箱地址</label>
                    <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">密码</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
                </div>
                <!--<div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile">
                    <p class="help-block">Example block-level help text here.</p>
                </div>-->
                <button @click="login()" type="button" class="btn btn-primary" style="width:100%">登 录</button>
                <div style="text-align:center;padding-top:16px">
                    <div>
                        <router-link to="/user/register"><a>注册账号</a></router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/user/reset"><a>找回密码</a></router-link>
                    </div>
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
        isSubmit:false
      }
  },
  mounted() {
  },
  methods: {
        //点击登录
        login() {
            if(this.isSubmit) return;
            this.isSubmit = true;
            this.$axios.login({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    //用户信息存入本地，并更新vuex
                    localStorage.setItem('user',JSON.stringify(res.data.user));
                    this.$store.commit('setUserName',res.data.user.role_name);
                    console.log('888',this.$store.state);
                    // if(this.$store.state.modalLogin){ //如果是模态框登录，留在当前页面，并刷新
                    //     this.$router.go();
                    //     this.$store.commit('setModalLogin',false); 
                    // }else{  //非模态登录，跳转个人中心
                    //     this.$router.push({
                    //         // path:beforeLoginPath
                    //         path:'/'
                    //     })
                    // }
                }else{

                }
            }).catch(res=>{ })
        }
    
  },
  created(){
      //从注册成功跳转的会带name
      this.name = this.$route.query.name || '';
  }
};
</script>
<style lang="less">
.login {
    margin:0 auto;
    max-width: 400px;
    .box {
        background-color: #fefefe;
        border:1px solid #f5f5f5;
        border-radius:3px;
        margin:4px;
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
}
</style>



