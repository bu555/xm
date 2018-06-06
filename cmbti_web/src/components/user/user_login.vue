<template>
  <div class="login">
      <div class="box"  v-loading="isSubmit">
            <div class="title">用户登录</div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">账号</label>
                    <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" placeholder="邮箱" @blur="nameVerify?verifyName():''"  @input="!nameVerify?verifyName():''"  @keyup.enter="login()" spellcheck="false">
                    <div v-if="!nameVerify" class="error-msg">请输入正确的邮箱</div>
                </div>
                <div class="form-group" style="margin-bottom:26px">
                    <label for="exampleInputPassword1">密码</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="密码" @blur="passwordVerify?verifyPassword():''" @input="!passwordVerify?verifyPassword():''"  @keyup.enter="login()" spellcheck="false">
                    <div v-if="!passwordVerify" class="error-msg">请输入密码</div>
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
                        <router-link to="/user/verify"><a>找回密码</a></router-link>
                    </div>
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
        password:'Aa111111',
        isSubmit:false,
        nameVerify:true,
        passwordVerify:true,
        fromPath:''
      }
  },
  mounted() {

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
        //点击登录
        login() {
            if(this.isSubmit) return;
            this.verifyName()
            this.verifyPassword()
            if(!this.nameVerify || !this.passwordVerify) return;
            this.isSubmit = true;
            this.$axios.login({
                name:this.name,
                password:this.password
            }).then(res=>{
                this.isSubmit = false;
                if(res.data.success){
                    //用户信息存入本地，并更新vuex
                    localStorage.setItem('USER',JSON.stringify(res.data.user));
                    this.$store.commit('setUserName',res.data.user.r_name);
                    this.$message({
                        message: '登录成功！',
                        type: 'success'
                    });
                    if(this.$store.state.modalLogin){ //如果是模态框登录
                        this.$store.commit('setModalLogin',false); 
                        this.$store.commit('setModalLoginSuccess',true); 
                    }else{  //非模态登录
                        this.$router.push({path: this.fromPath})
                    }
                }else{
                    this.$message.error('账号或密码错误！');
                }
            },res=>{
                this.isSubmit = false;
                this.$message.error('登录失败！');
            }).catch(res=>{ 
                this.isSubmit = false;
            })
        }
    
  },
  created(){
      //从注册成功跳转的会带name
      this.name = this.$route.query.name || '';

        this.fromPath = localStorage.getItem('fromPath')
        if(this.fromPath === '/' || this.fromPath.indexOf('/user')!==-1){
            this.fromPath = '/'
        }
  },
beforeRouteEnter (to, from, next) {
    localStorage.setItem('fromPath',from.fullPath)
    next()
},
  beforeRouteUpdate (to, from, next) {
      next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
      next()
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
};
</script>
<style lang="less">
.login {
    margin:0 auto;
    max-width: 400px;
    .box {
        background-color: #fefefe;
        border:1px solid #ddd;
        border-radius:3px 3px 2px 2px;
        margin:30px 4px;
        form {
            padding:16px .13rem 32px;;
            background-color: #fdfdfd;
            // background-color: rgba(89,142,210,.2);
        }
        .title {
            text-align: center;
            font-weight: 700;
            border:1px solid #337ab7;
            border-bottom:1px solid #598dd3;
            background-color: #598dd3;
            padding: 11px 0;
            font-size:.06rem;
            margin:-1px -1px;
            color:#f5f5f5;
            border-radius:3px 3px 0  0;
            // box-shadow: 0 0px 2px #337ab7;
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



