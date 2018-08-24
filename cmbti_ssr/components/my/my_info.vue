<template>
  <div class="account-data" v-if="userInfo">
      <div class="gains item row">
          <div class="title">
              <h5>個人資料</h5>
          </div>
        <div class="content" style="text-align:left" v-loading="loading">
            <div class="photo"  @click="clickModify('avatar')">
                <img v-if="userInfo.Avatar" :src="userInfo.Avatar" alt="">
                <img v-else src="/img/timg.jpg" alt="">
                <div class="a-cover">修改頭像</div>
            </div>
            <div class="user-info">
               <div class="u-left">
                    <form class="form-horizontal">
                      <div class="form-group l-side">
                        <label  class="col-sm-2 control-label"  style="max-width:110px">名字：</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" placeholder="名字" v-model="userInfo.Name" @keyup.enter.native="modifyInfo()">
                        </div>
                          <input style="display:none" type="text" >
                      </div>
                      <!--<div class="form-group l-side">
                        <label for="select1" class="col-sm-2 control-label"  style="max-width:110px">喜好語言：</label>
                        <div class="col-sm-10">
                          <select class="form-control"  v-model="userInfo.Language">
                            <option>en</option>
                            <option>zh-tw</option>
                            <option>zh-cn</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group l-side">
                        <label for="inputEmail2" class="col-sm-2 control-label"  style="max-width:110px">等級：</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputEmail2" placeholder="Level" disabled>
                        </div>
                      </div>
                      <div class="form-group l-side">
                        <label for="inputEmail1" class="col-sm-2 control-label"  style="max-width:110px">總類：</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputEmail1" placeholder="總類" disabled>
                        </div>
                      </div>-->
                      <div class="form-group l-side">
                        <label for="" class="col-sm-2 control-label"  style="max-width:110px"></label>
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary" style="padding:8px 25px;font-size:14px" @click="modifyInfo()">保存更改</button>
                        </div>
                      </div>
                    </form>
               </div>
               <div class="u-right">
                    <ul>
                        <li>
                           <div>
                                <p style="margin-bottom:2px;">綁定郵箱</p>
                                <span class="show-number" style="color:#5aa1fa">{{userInfo.Email}}</span><br>
                                <span v-if="userInfo.IsEmailVerified==0"  style="color:#fb8507"><i class="el-icon-warning"></i> 未激活</span>
                           </div>
                           <div class="u-btn">
                              <button v-if="userInfo.IsEmailVerified==0" type="button" class="btn btn-warning" style="padding:6px 22px;background:#f78323"  @click="clickModify('activeMail','')">激活</button>
                              <button v-else type="button" class="btn btn-primary" style="padding:6px 22px;" @click="clickModify('mail')">修改</button>
                           </div>
                        </li>
                        <li>
                           <div>
                                <p style="margin-bottom:2px;">綁定電話</p>
                                <span class="show-number" v-if="userInfo.Phone" style="color:#5aa1fa">{{userInfo.Phone}}</span>
                                <span v-else style="color:#fb8507"><i class="el-icon-warning"></i> 未綁定</span>
                           </div>
                           <div class="u-btn">
                              <button v-if="typeof(userInfo.Phone)==='string' && userInfo.Phone.length>=2" type="button" class="btn btn-primary" style="padding:6px 22px;" @click="clickModify('phone',userInfo.Phone)">修改</button>
                              <button v-else type="button" class="btn btn-warning" style="padding:6px 22px;background:#f78323"  @click="clickModify('phone','')">綁定</button>
                           </div>
                        </li>
                        <li v-if="false">
                           <div>
                               <p style="margin-bottom:2px;">支付方式/賬號</p>
                                <!-- <span style="color:#5aa1fa">支付寶 <span style="padding:0 5px;color:#2e3e4f">|</span> {{userInfo.Email}}</span>-->
                                <span class="show-number" v-if="typeof(userInfo.AccountNumber)==='string' && userInfo.AccountNumber.length>=2" style="color:#5aa1fa">{{userInfo.AccountNumber}}</span>
                                <span v-else style="color:#fb8507"><i class="glyphicon glyphicon-exclamation-sign"></i> 未設定</span>
                           </div>
                           <div class="u-btn">
                              <button v-if="typeof(userInfo.AccountNumber)==='string' && userInfo.AccountNumber.length>=2" type="button" class="btn btn-primary" style="padding:6px 22px;" @click="clickModify('payment',userInfo.Phone,userInfo.AccountNumber)">修改</button>
                              <button v-else type="button" class="btn btn-warning" style="padding:6px 22px;background:#f78323"  @click="clickModify('payment',userInfo.Phone,'')">設定</button>
                              <!--<button type="button" class="btn btn-primary" style="padding:6px 22px;" @click="clickModify('payment')">修改</button>-->
                           </div>
                        </li>
                        <li>
                           <div>
                                <p style="margin-bottom:2px;">登錄密碼</p>
                                <span class="show-number" style="color:#5aa1fa">******</span>
                           </div>
                           <div class="u-btn">
                              <button type="button" class="btn btn-primary" style="padding:6px 22px;" @click="clickModify('pwd')">修改</button>
                           </div>
                        </li>
                    </ul>
               </div>
            </div>
        </div>
          
      </div>

      <!--彈層-->
      <div class="modify-cover" v-if="modify">
          <!-- <div class="upload-avatar">
          </div> -->
          <div class="m-view" >
                <!-- <imgUpload @closeMe="closeSubcomponent" v-if="modify==='avatar'"></imgUpload> -->
                <modifyPWD @closeMe="closeSubcomponent" v-if="modify==='pwd'"></modifyPWD>
                <modifyMail @closeMe="closeSubcomponent" v-if="modify==='mail'" :email="userInfo.Email"></modifyMail>
                <activeMail @closeMe="closeSubcomponent" v-if="modify==='activeMail'" :email="userInfo.Email"></activeMail>
                <modifyPhone @closeMe="closeSubcomponent" v-if="modify==='phone'" :phoneNum="phoneNum"></modifyPhone>
                <!-- <modifyPayment @closeMe="closeSubcomponent" v-if="modify==='payment'" :accountNumber="userInfo.AccountNumber" :paymentMethod="userInfo.PaymentMethod" :phoneNum="phoneNum"></modifyPayment> -->
          </div>
      </div>
  </div>
</template>

<script>
// import accountAxios from '../../axios_joggle/axios_account'
import modifyPWD from './subcomponent/modify_pwd'
import modifyMail from './subcomponent/modify_mail'
import activeMail from './subcomponent/active_mail'
import modifyPhone from './subcomponent/modify_phone'
// import modifyPayment from './subcomponent/modify_payment'
// import imgUpload from './subcomponent/img_upload'
import utils from '~/plugins/utils'
import axios from '~/plugins/axios'
import moment from '~/plugins/moment'

export default {
    data(){
        return {
            userInfo:'',
            initUserInfo:'', //修改前數據
            modify:'',
            loading:false,
            phoneNum:'',
        }
    },
    watch:{
        // '$store.state.refreshUserInfo':function(){
        //     if(!this.$store.state.refreshUserInfo){ //数据获取完成 状态false
        //         setTimeout(()=>{
        //             this.init()
        //         },50)
        //     }
        // },
        '$store.state.user_info':function(){
            this.init()
        }
    },
    computed:{
    },
    components:{
        modifyPWD,
        modifyMail,
        activeMail,
        modifyPhone,
        // modifyPayment,
        // imgUpload,
    },
    methods:{
        // 監聽子組件關閉信號
        closeSubcomponent(success){
            if(success){
                this.$store.commit('refreshUserInfo')  //通知刷新userinfo
            }
            this.modify = ''
        },
        //修改名字和语言
        modifyInfo(){
        //   if(JSON.stringify(this.userInfo) === JSON.stringify(this.initUserInfo)){
            this.userInfo.Name = this.$utils.strTrim(this.userInfo.Name)
            let len = this.$utils.strLength(this.userInfo.Name)
            if(typeof(this.userInfo.Name)!=='string' || len<4 || len>32 ){
                    this.$message({
                        message: '名字要求為4-32字節',
                        type: 'warning'
                    });
                    return;
            }
            if(this.userInfo.Language === this.initUserInfo.Language && this.userInfo.Name === this.initUserInfo.Name){
                    this.$message({
                        message: '請修改后再保存',
                        type: 'warning'
                    });
                    return;
            }
            this.loading = true
            axios.account.modifyUserInfo({
                Language:this.userInfo.Language,
                Name:this.userInfo.Name
            }).then(res=>{
                this.loading = false
                if(res.data.ResultCode==200){
                        this.$message({
                        message: '修改成功！',
                        type: 'success'
                        });
                        this.$store.commit('refreshUserInfo')
                }else{
                    this.$message({
                        message: '修改失敗！'+ (res.data.ResultMessage?res.data.ResultMessage:res.data.ResultCode),
                        type: 'warning'
                    });
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        clickModify(value,phoneNum,accountNumber){
            if(value==='payment' ){  //&& (typeof(paymentMethod)==='string' && paymentMethod.length>3)
                if(typeof(phoneNum)!=='string' || phoneNum.length<2){  //判斷是否綁定了手機
                    this.$alert('此操作需要先綁定電話', '提示：', {
                        confirmButtonText: '確定',
                        callback: action => {
                            this.modify='phone'
                        }
                    }); 
                    return
                }else{
                    this.phoneNum = phoneNum //是手機用戶
                    this.modify=value
                    return
                }
            }
            // 操作手机  判斷是否是手機用戶
            if(value==='phone' && phoneNum){
                this.phoneNum = phoneNum //是手機用戶
                this.modify=value
                return
            }
            //激活邮箱 或 修改邮箱
            this.modify=value
        },
        init(){
            this.userInfo = JSON.parse(JSON.stringify(this.$store.state.user_info))
            if(this.userInfo){
                this.userInfo.Language = this.userInfo?this.userInfo.Language:'en'
                this.initUserInfo = JSON.parse(JSON.stringify(this.userInfo))
            }
        }
    },
    mounted(){
        
        
        },
    created(){
        this.init()
        this.$utils = utils
        this.$moment = moment
    }
    
}
</script>

<style lang="less" scoped>
.account-data {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
    min-height:400px;
    .row {
        margin:0;
    }
    form {
        font-size:14px;
        .form-group {
        }
        label {
            height: 45px;
            line-height: 45px !important;
        }
        input,select {
            height:45px;
        }
    }
    .btn-primary {
        background-color: #397fd9;
        border-color: #397fd9;
        &:hover {
            background-color: #2e6da4;
            border-color: #2e6da4;
        }
    }
    // 彈層
    .modify-cover {
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
        z-index:999;
        .m-view {
            max-width:550px;
            max-height:470px;
            margin:15vh auto;
        }
    }
    .item {
        padding:2%;
        padding-top:1%;
        background-color: #fff;
        box-sizing: border-box;
        .title {
            // height:38px;
            text-align:left;
            border-bottom:3px solid #eeeeee;
            position: relative;
            h5 {
                display:inline-block;
                padding:2px 3px;
                font-weight:700;
                position: relative;
                &:after {
                    content:"";
                    display:block;
                    height:3px;
                    width:100%;
                    background-color: #0a53a2;
                    position: absolute;
                    bottom:-13px;
                    left:0px;
                }
            }
        }
        .content {
            padding:32px 0px;
            .photo {
              margin:5px auto 25px;
              width:126px;
              height:126px;
              border-radius:50%;
              border:1px solid #ccc;
              overflow: hidden;
              position: relative;
              cursor:pointer;
              img {
                width:100%;
                object-fit: cover;
              }
              .a-cover {
                  width:100%;
                  padding:2px 0 6px;
                  position: absolute;
                  bottom:0;
                  left:0;
                  text-align: center;
                  background-color: rgba(0,0,0,.5);
                  color:#fff;
                //   display:none;
                  opacity: 0;
                  transition:opacity 0.5s;
              }
              &:hover {
                  .a-cover {
                    opacity:1;
                  }
              }
            }
            .user-info {
                display:flex;
                padding:2%;
            }
            .u-left {
                flex:0  0 46%;
                padding-top:35px;
                .form-horizontal .form-group {
                    margin-right: 0px;
                    margin-left: 0px;
                    label {
                      line-height: 34px;;
                    }
                }

            }
            .u-right {
                flex:0  0 54%;
                padding:0 4.5% 0 2%;
                margin-left:4%;
                border-left:1px solid #eeeeee;
               ul {
                 padding: -0px 15px;
                 padding-right:50px;
                 li {
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    min-height:92px;
                    padding-left:80px;
                    border-bottom:1px solid #f3f3f3;
                    background:url('/img/set_icon.png') no-repeat 0px 13px;
                    &:nth-child(2){
                      background:url('/img/set_icon.png') no-repeat 0px -83px;
                    }
                    &:nth-child(3){
                      background:url('/img/set_icon.png') no-repeat 0px -181px;
                    }
                    &:nth-child(4){
                      background:url('/img/set_icon.png') no-repeat 0px -279px;
                    }
                   .u-btn {

                   }
                 }
               }
               .show-number {
                    display:inline-block;
                    width:150px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
               }
            }
            .form-group.l-side  {
              margin-bottom:25px;
            }
        }
    }
    @media screen and (max-width:992px) {
            .item .content {
                padding:20px 0px;
            }
            .user-info {
                .l-box {
                    border-bottom:1px solid transparent;
                }
            }
            p {
                font-size:12px;
            }
    }
    @media screen and (max-width:768px) {
            .l-side {
                .btn {
                    position: relative;
                    top:-40px;
                }
            }
            .form-group label {
              line-height:20px !important;
            }
            .user-info {
                flex-wrap:wrap;
                padding:2% 5% !important;
                .u-left {
                    flex:0  0 100% !important;
                }
                .u-right {
                    flex:0  0 100% !important;
                    margin:11% 0 !important;
                    border-left:none !important;
                        .show-number {
                            width:115px !important;
                        }
                        li {
                            // width:100%;
                        }
                }
            }
    }
    @media screen and (max-width:475px) {
        .u-right {
            margin-left:0;
            ul {
              padding-right:0 !important;
            }
            li {
            // margin-left:-10% !important;
            margin-right:0 !important;
                .u-btn {
                }
            }

        }
        td,th {
            font-size:12px !important;
        }
        form {
            label {
                height:18px;
            }
        }
    }
    @media screen and (max-width:380px) {
        .u-right {
            padding-right:10px;
            li {
            margin-left:-5% !important;
            margin-right:5% !important;
                .u-btn {
                }
            }

        }
    }
}
</style>
