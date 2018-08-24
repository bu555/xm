<template>
  <div class="modify-mail" v-loading="loading">
      <div class="title">修改郵箱</div>
      <div class="m-content">
           <div class="m-step">
                <el-steps :align-center="true" :active="currentStep" finish-status="success">
                    <el-step title="身份驗證"></el-step>
                    <el-step title="重置郵箱"></el-step>
                    <el-step title="修改成功"></el-step>
                </el-steps>
           </div>
            <div v-if="currentStep==1">
                <div class="form-group">
                    <label for="oldEmail">原郵箱</label>
                    <input type="text" class="form-control" id="oldEmail" placeholder="郵箱" v-model="step1.name" :disabled="true">
                </div>
                <div class="form-group f-code">
                    <label for="exampleInputPassword1">驗證碼</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="驗證碼" v-model="step1.vCode" :disabled="!step1.sendCode">
                    <!--發送驗證碼-->
                    <button v-if="!step1.sendCode" type="" class="btn btn-default code-btn"  @click="sendEmailCode('old')">發送驗證碼</button>
                    <button v-else type="" class="btn btn-default code-btn"  style="background:#f0f9ec;color:#48c321" disabled>驗證碼已發送</button>
                </div>
                <br>
                <div class="btns">
                    <button type="" class="btn btn-default" @click="callClose()">取 消</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="" class="btn btn-default" style="background:#e6e6e6" disabled v-if="!step1.vCode">下一步</button>
                    <button type="" class="btn btn-primary" @click="verifyEmail('old')" v-if="step1.vCode">下一步</button>
                </div>
            </div>
            <div v-if="currentStep==2">
                <div class="form-group">
                    <label for="newEmail">新郵箱</label>
                    <input type="text" class="form-control" id="newEmail" placeholder="郵箱" v-model="step2.name"  :disabled="step2.sendCode">
                </div>
                <div class="form-group f-code">
                    <label for="exampleInputPassword1">驗證碼</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="驗證碼" v-model="step2.vCode" :disabled="!step2.sendCode">
                    <!--發送驗證碼-->
                    <button v-if="!step2.sendCode" type="" class="btn btn-default code-btn"  @click="sendEmailCode('new')">發送驗證碼</button>
                    <button v-else type="" class="btn btn-default code-btn"  style="background:#f0f9ec;color:#48c321" disabled>驗證碼已發送</button> 
                </div>
                <br>
                <div class="btns">
                    <button type="" class="btn btn-default" @click="callClose()">取 消</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="" class="btn btn-default" style="background:#e6e6e6" disabled v-if="!step2.vCode" >下一步</button>
                    <button type="" class="btn btn-primary" @click="verifyEmail('new')" v-if="step2.vCode">下一步</button>
                </div>
            </div>
            <div v-if="currentStep==3">
                <div class="s3-success" style="display:flex;align-items:center;justify-content: center;">
                    <i class="fa fa-smile-o" aria-hidden="true" style="font-size:50px;color:#fb8507"></i>
                    <span style="font-size:22px;font-weight:700;padding-left:10px">操作成功!</span>
                </div>
                <br>
                <div class="btns" style="padding-top:20px">
                    <button type="" class="btn btn-success" style="background:#f7872b;border:1px solid #f7872b" @click="callClose(true)">確 定</button>
                </div>
            </div>

      </div>
      <!--<button type="" class="btn btn-success" @click="currentStep=1">1</button>
      <button type="" class="btn btn-success" @click="currentStep=2">2</button>
      <button type="" class="btn btn-success" @click="currentStep=3">3</button>-->

  </div>
</template>

<script>
import axios from '~/plugins/axios'
import myVerify from '../../../assets/verify'
    export default {
      data(){
        return {
            oldPassword:'',
            newPassword:'',
            newPassword1:'',
            loading:false,
            currentStep:1,
            step1:{
                name:'',
                sendCode:false,
                vCode:'',
                btnTXT:'發送驗證碼'
            },
            step2:{
                name:'',
                sendCode:false,
                vCode:'',
                btnTXT:'發送驗證碼'
            },
        }
      },
      props:['Email'],
      watch:{
      },
      methods:{
          callClose(success=false){
              this.$emit('closeMe',success)
          },
        sendEmailCode(status){
            if(status==='old'){
                // if(!this.step1.name){
                //     this.$message({
                //         message: '需輸入原郵箱',
                //         type: 'warning'
                //     });
                //     return;
                // }
                // if(!myVerify.email(this.step1.name)){
                //     this.$message({
                //         message: '郵箱格式不正確',
                //         type: 'warning'
                //     });
                //     return;
                // }

                this.loading = true
                // 发送邮箱验证（需登陆） 验证注册邮箱:{"email":""} 修改用户邮箱:{"email":"新邮箱地址"} 频繁操作会返回1200
                axios.account.sendEmailCode({
                    email:"",
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.step1.sendCode = true
                        this.step1.btnTXT = "驗證碼已發送"
                    }
                }).catch(err=>{
                    this.loading = false
                })

            }else if(status==='new'){
                if(!this.step2.name){
                    this.$message({
                        message: '需輸入新郵箱',
                        type: 'warning'
                    });
                    return;
                }
                if( !(myVerify.email(this.step2.name)) ){
                    this.$message({
                        message: '郵箱格式不正確',
                        type: 'warning'
                    });
                    return;
                }

                this.loading = true
                // 发送邮箱验证（需登陆） 验证注册邮箱:{"email":""} 修改用户邮箱:{"email":"新邮箱地址"} 频繁操作会返回1200
                axios.account.sendEmailCode({
                    email:this.step2.name,
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.step2.sendCode = true
                        this.step2.btnTXT = "驗證碼已發送"
                    }
                }).catch(err=>{
                    this.loading = false
                })

            }else{
                return;
            }

            
        }, 
        verifyEmail(status){
            if(status==='old'){
                if(!this.step1.vCode){
                    this.$message({
                        message: '需輸入驗證碼',
                        type: 'warning'
                    });
                    return;
                }

                this.loading = true
                // GET api/User/verifyEmail?Email={Email}&Code={Code}	邮箱验证接口
                axios.account.verifyEmail({
                    Email:"",
                    Code:this.step1.vCode
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.currentStep = 2
                    }
                }).catch(err=>{
                    this.loading = false
                })

            }else if(status==='new'){
                if(!this.step2.name){
                    this.$message({
                        message: '需輸入新郵箱',
                        type: 'warning'
                    });
                    return;
                }

                this.loading = true
                // GET api/User/verifyEmail?Email={Email}&Code={Code}	邮箱验证接口
                axios.account.verifyEmail({
                    Email:this.step2.name,
                    Code:this.step2.vCode
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.modifyEmail()
                    }
                }).catch(err=>{
                    this.loading = false
                })

            }else{
                return;
            }

            
        }, 
        modifyEmail(){
            if(!this.step2.vCode){
                this.$message({
                    message: '需輸入驗證碼',
                    type: 'warning'
                });
                return;
            }

            this.loading = true
            // POST api/User/ModifyUserEmail {"newEmail":"新邮箱地址"} 修改用户邮箱
            axios.account.modifyEmail({
                newEmail:this.step2.name,
            }).then(res=>{
                this.loading = false
                if(res.data.ResultCode==200){
                    this.currentStep = 3
                }
            }).catch(err=>{
                this.loading = false
            })


            
        }, 
        

      },
      mounted(){
      },
      created(){
          this.step1.name = this.Email
      }
    }
</script>

<style lang="less">
.modify-mail {
    .title {
        text-align: center;
        height:68px;
        line-height: 68px;
        font-size:18px;
        border-bottom:4px solid #0a53a2;
        color:#2665ab;
        background-color: #fff;
        border-radius:6px 6px 0 0 ;
    }
    .m-content{
        text-align: left;
        min-height:370px;
        background-color: #fff;
        border-radius:0 0 6px 6px  ;
        padding:4% 12% 7%;
        .btns {
            text-align: center;
            button {
                padding:8px 18px;
                min-width:99px;
            }
        }
    }
    .form-group.f-code{
        position: relative;
        padding-right:112px;
        .code-btn {
            width:110px;
            position: absolute;
            right:0px;
            bottom:0px;
            // font-size:13px;
        }
    }
    .s3-success{
        padding-top:30px;
        font-size:25px;
        text-align: center;
    }
    .m-step {
        padding:10px 0px 20px;
        .el-step__head.is-success {
            color: #0a53a2;
            border-color: #0a53a2;
        }
        .el-step__title.is-success {
            color: #0a53a2;
        }
        .el-step__head.is-process {
            color: #c4c7cf;
            border-color: #c4c7cf;
        }
        .el-step__title.is-process {
            color: #c4c7cf;
        }
        // .el-step__icon.is-text {
        // border-radius: 50%;
        // border: 2px solid;
        // border-color: inherit;
    // }
    }
    .form-control {
        height: 41px;
    }
    label {
        color: #666666;
        font-weight: 400;
    }
    .form-group.f-code .code-btn {
        height: 41px;
    }
    .m-step .el-step__title.is-success,.m-step .el-step__title.is-process,.m-step .el-step__title.is-wait {
        font-size: 12px !important;
        font-weight:400px !important;
    }
}
</style>
