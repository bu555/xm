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
            // background-color: #fcfcfc;
            // background-color: rgba(255,255,255,.5);
            // background-color: #e5e5e5;
            max-width:370px;
            margin:100px auto;
            height:auto;
            // padding-bottom:10px;
            // padding-top:1px;
            border-radius:5px;
            position:relative;
            .demo-ruleForm.c-login {
                max-width: 370px;
            }
            .close {
                width: 28px;
                height: 28px;
                background-color: transparent;
                position: absolute;
                top: 9px;
                right: 11px;
                font-size: 20px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
                color:#fff;
                &:hover {
                    color:#fff;
                }
            }

        }

    }

</style>



