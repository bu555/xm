<template>
  <div class="payment-modal">
      <div class="modal-view" v-loading="loading">
            <div class="title" >賬 戶 餘 額 提 現</div>
            <div class="m-content">
                    <div v-if="currentStep==1">
                        <div class="form-group method">
                            <label for="accountName">支付方式：</label>
                            <div class="form-row-1" style=";position:relative;padding-left:97px">

                                <el-dropdown trigger="click"  @command="changeMethods">
                                    <span class="el-dropdown-link" :style="!methodTxt?'color:#888':''">
                                        {{methodTxt?methodTxt:'請選擇'}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="1">PayPal</el-dropdown-item>
                                        <el-dropdown-item command="2">支付寶</el-dropdown-item>
                                        <el-dropdown-item command="3">Bitcoin</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>

                                <!-- <el-select v-model="step1.method" filterable placeholder="請選擇"  style="max-width:95px;position:absolute;left:0;top:0;">
                                    <el-option value="1" label="PayPal">
                                    </el-option>
                                    <el-option value="2" label="支付寶">
                                    </el-option>
                                    <el-option value="3" label="Bitcoin">
                                    </el-option>
                                </el-select> -->
                                <input  type="text" class="form-control" placeholder="支付賬戶" v-model="step1.accountName" :disabled=" mayPayment!=='yes' ">
                            </div>
                        </div>
                        <div class="form-group f-code">
                            <label for="balance">我的賬戶餘額 ：</label>
                            <!-- <input type="text" class="form-control" id="balance" placeholder="" :value="step1.balance" disabled> -->
                            <div class="my-currency ">
                                <span v-if="step1.balance" style="background-color:#eec06f">sBTC</span>
                                <span :style="'color:'+(!mayPayment?'red':'')">{{step1.balance}}</span>
                            </div>
                        </div>
                        <div class="form-group f-code">
                            <label for="available">預計到賬金額 ：</label>
                            <!-- <input type="text" class="form-control" id="available" placeholder="" :value="step1.available" disabled> -->
                            <div class="my-currency ">
                                <span v-if="step1.available.currency==='USD'" :style="'background-color:#79a271'">{{step1.available.currency}}</span>
                                <span v-else-if="step1.available.currency==='CNY'" :style="'background-color:#cc6851'">{{step1.available.currency}}</span>
                                <span  v-else-if="step1.available.currency==='BTC'" :style="'background-color:#eec06f'">{{step1.available.currency}}</span>
                                <span >{{step1.available.amount}}</span>
                            </div>
                            <!-- <p v-if="errMessage" style="color:#f73f37;position:relative;left:-96px;top:4px">{{errMessage}}</p> -->
                        </div>
                            <p :style="'color:'+(!mayPayment?'red':'#999') +';position:relative;left:0px;top:-7px'">餘額提現需{{minWithdrawal}}<span style="font-size:.7em;position:relative;top:1px;padding-left:2px">sBTC</span> 以上<span v-if="!mayPayment">，您的餘額不足！</span></p>
                        <br> 
                        <div class="btns">
                            <button type="" class="btn btn-primary" @click="submitHandle" v-if="step1.method && step1.accountName">提交</button>
                            <button type="" class="btn btn-default" style="background:#e6e6e6" disabled v-else>提交</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="" class="btn btn-default" @click="callClose()">取 消</button>
                        </div>
                    </div>
                    <div v-if="currentStep==2">
                        <div class="success-msg">
                            <div class="s-m-icon" style="text-align:center">
                                <i class="el-icon-success"  style="color:#75b64e;font-size:100px;margin-bottom:12px"></i>
                            </div>
                            <div class="s-m-txt">
                                <p class="p1" style="color:#75b64e;font-size:20px">申請提交成功!</p>
                                <p class="p2" style="font-size:13px">工作人員將會在3個工作日內處理您的申請，敬請留意通知!</p>
                                <p class="p2" style="word-break:break-all;">提現賬戶：
                                    <span v-if="step1.method==1">PayPal</span>
                                    <span v-if="step1.method==2">支付寶</span>
                                    <span v-if="step1.method==3">Bitcoin</span>
                                    {{step1.accountName}}
                                </p>
                                <p class="p2">預計到賬金額： <span style="color:#ff4341">{{step1.available.currency}} {{step1.available.amount}}</span></p>
                            </div>
                        </div>
                        <div class="btns" style="padding-top:12px">
                            <button type="" class="btn btn-default" @click="callClose(true)">確定</button>
                        </div>
                    </div>

            </div>
      </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios'
    export default {
      data(){
        return {
            currentStep:1,
            step1:{
                method:'',
                accountName:'', 
                balance:'', //余额
                available:'', //结算金额
            },
            options: '', //下拉列表
            loading:false,
            mayPayment:true, //可否提現
            errMessage:'',
            minWithdrawal:'', //最小提现额
        }
      },
      watch:{
          'step1.method':function(){
                this.getMoneyByMethod()
          }
      },
      computed:{
          methodTxt(){
                let method = ''
                switch(this.step1.method){
                    case '1':
                    method='PayPal'
                    break
                    case '2':
                    method='支付寶'
                    break
                    case '3':
                    method='Bitcoin'
                    break
                }
                return method
          }
      },
      methods:{
          callClose(success=false){
              this.$emit('closeMe',success)
          },
          changeMethods(m){
              this.step1.method = m
          },
          submitHandle(){
              this.payment()
          },
          getMoneyByMethod(){
              this.loading = true
              axios.account.getMoneyByMethod({
                  PaymentMethod:this.step1.method
              }).then(res=>{
                    this.loading = false
                  if(res.data.ResultCode==200){
                      if(res.data.Data.Satoshi<res.data.Data.MinimumWithdrawal){
                            this.mayPayment = false 
                            // this.errMessage = '暫不可操作，提現需餘額'+res.data.Data.MinimumWithdrawal.toLocaleString()+' sBTC 以上'
                            // return;
                      }else{
                          this.mayPayment = 'yes'
                          this.errMessage = ''
                      }
                      this.step1.balance =  res.data.Data.Satoshi.toLocaleString()
                      this.step1.available = {
                          currency:res.data.Data.Currency,
                          amount:res.data.Data.amount
                      }
                  }
              }).catch(err=>{
                  this.loading = false
                  this.$message.error('操作失敗');
              })
          },     
        //   获取最小提现额     
          getMinimumWithdrawal(){
              this.loading = true
              axios.account.getMoneyByMethod({
                  PaymentMethod:1
              }).then(res=>{
                    this.loading = false
                  if(res.data.ResultCode==200){

                      this.minWithdrawal = res.data.Data.MinimumWithdrawal.toLocaleString()
                  }
              }).catch(err=>{
                  this.loading = false
              })
          },
          payment(){
                let method = ''
                switch(this.step1.method){
                    case '1':
                    method='PayPal'
                    break
                    case '2':
                    method='支付寶'
                    break
                    case '3':
                    method='Bitcoin'
                    break
                }
                this.$confirm('提交後將轉賬至您 '+method+' '+this.step1.accountName+' 賬戶 , 是否繼續?', '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true
                    axios.account.userPayment({
                          PaymentMethod:this.step1.method, //支付类型
                          AccountNumber:this.step1.accountName //支付账号
                    }).then(res=>{
                          this.loading = false
                          if(res.data.ResultCode==200){
                              this.currentStep = 2
                              this.$store.state.refreshUserInfo++  //刷新userinfo
                          }else if(res.data.ResultCode==1102){
                              this.$alert('您未綁定電話，暫不可進行提現操作。', '提示', {
                                  confirmButtonText: '確定',
                                  callback: action => {
                                      this.callClose()
                                  }
                              });
                          }
                    }).catch(err=>{
                        this.loading = false
                        this.$message.error('操作失敗');
                    })

                }).catch(() => {
                })  

          }
        

      },
      mounted(){
      },
      created(){
          this.getMinimumWithdrawal()
      }
    }
</script>

<style lang="less">
.payment-modal {
    background-color: rgba(0,0,0,.5);
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index:999;
    .modal-view {
        margin:10% auto;
        max-width:550px;
        min-height:300px;
    }
    .form-row-1 {
        input {
            color:#0675e9;
            font-weight:700;
        }
    }
    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
        color: red;
    }
    .success-msg {
        display:flex;
        align-items:center;
        margin:32px -20px 42px;
        .s-m-icon {
            flex:0 0 100px;
        }
        .s-m-txt {
            flex:1;
            padding-left:20px;
        }
    }
    .my-currency {
        height:42px;
        background-color: #eee;
        display:flex;
        border-radius:3px;
        overflow: hidden;
        
        &>span {
            height:42px;
            line-height: 42px;
        }
        &>span:nth-of-type(1){
            flex:0 0 95px;
            padding-left:30px;
            text-shadow:0 0 3px #777;
            color:#fff;
            font-size:15px;
        }
        &>span:nth-of-type(2){
            font-weight:700;
            padding-left:15px;
            font-size:16px;
            color: #444;
        }
    }
    @media screen and (max-width:555px) {
            .success-msg {
                flex-wrap:wrap;
                align-items:center;
                margin:0px 0px;
                .s-m-icon {
                    flex:0 0 100%;
                }
                .s-m-txt {
                    flex:0 0 100%;
                    .p1 {
                        text-align:center;
                    }
                }
            }
            .modal-view {
                margin:10% 2%;
                .m-content{ 
                    padding:3%;
                }
            }
    }
    .title {
        text-align: center;
        height:68px;
        line-height: 68px;
        font-size:20px;
        color:#eee;
        background-color: #fff;
        border-radius:6px 6px 0 0 ;
        font-weight:600;
        background-color: #3e6085;
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
    }
    .s3-success{
        padding-top:30px;
        font-size:25px;
        text-align: center;
    }
    .el-select .el-input__inner {
        height: 41px !important;
        border:1px solid #cccccc !important;
        &::-webkit-input-placeholder {
            color:#999999;
        }
    }
    .el-input__inner {
        // border:1px solid #ccc !important;
    }

    // .el-select .el-input .el-input__inner::-webkit-input-placeholder {;
        
    // }

    .el-input {
    }
    .form-control {
        height: 41px;
    }
    label {
        color: #666666;
        font-weight: 400;
    }
    .text-cover {
        position: absolute;
        top: 9px;
        left: 10px;
        border: 1px solid rgb(204, 204, 204);
        width: 60px;
        height: 25px;
    }
    .method .el-dropdown {
       position:absolute;
       left:0;
       top:0;

    }
    .method .el-dropdown-link {
        height: 41px;
        line-height: 41px;
        text-align:right;
        padding-right:12px;
        width:95px;
        display: block;
        border: 1px solid #ccc;
        border-radius:5px;
        color:#2575e8;
        font-weight:600;
        -moz-user-select: -moz-none; 
        -moz-user-select: none; 
        -o-user-select:none; 
        -khtml-user-select:none; 
        -webkit-user-select:none; 
        -ms-user-select:none; 
        user-select:none;
    }

}
</style>
