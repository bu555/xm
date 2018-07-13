<template>
  <div class="modal-login">
      <div class="main-box">
            <Login/>
            <div class="close"  @click="closedHandle"><i class="el-icon-close"></i></div>
      </div>
  </div>
</template>
<script>
import Login from './user_login'
export default {
    components:{
        Login
    },
    methods:{
        closedHandle(){
            this.$store.commit('setModalLogin',false);
            if(/^\/my/.test(this.$route.path)){
                this.$router.push({
                    path:'/forum?category=all&page=1'
                })
                // 如果点击关闭登录框，通知退出
                this.$store.state.loginOut = true
            }
        }
    }
};
</script>
<style lang="less">
    .modal-login {
        position:fixed;
        top:0;
        left:0;
        z-index:9999;
        background-color: rgba(0,0,0,.5);
        width:100%;
        height:100%;
        .main-box {
            background-color: #f0f0f0;
            max-width:400px;
            margin:100px auto 0;
            height:auto;
            padding-top:47px;
            border-radius:2px;
            position:relative;
            overflow: hidden;
            .demo-ruleForm.c-login {
                max-width: 370px;
            }
            .close {
                width: 28px;
                height: 28px;
                background-color: transparent;
                position: absolute;
                top: 9px;
                right: 15px;
                font-size: 22px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                color:#999;
                &:hover {
                    color:#333;
                }
            }

        }
        .login .box {
            border-radius:0px;
            border:none;
            margin:0;
        }
        @media screen and (max-width:515px) {
            .main-box {
                background-color: #f5f5f5;
                max-width:370px;
                margin:100px auto 0;   
            }
        }

    }

</style>



