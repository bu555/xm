<template>
  <div class="account-payment">
      <div class="gains item row">
          <div class="title">
              <h5>我的收益</h5>

          </div>
        <div class="account-show" v-if="$store.state.user_info">
            <div>賬戶餘額：</div> 
            <div class="number">
                <!--<span style="font-weight:700">{{this.$utils.fMoney($store.state.user_info.Profit,$Bitcoin,'USD')}}</span><span style="font-size:17px"></span>-->
                <!-- <span style="font-weight:700;font-size:28px" v-html="satoshi"></span><span style="font-size:17px"  v-html="toUSD"></span> -->
                <span v-html="$store.state.Bitcoin?$utils.fMoney(this.$store.state.user_info.Profit,$store.state.Bitcoin):$utils.fMoney(this.$store.state.user_info.Profit)"></span>
            </div>
            <!--<el-dropdown>
                <span class="el-dropdown-link ">
                    <span class="span-pc">
                        <i class="el-icon-question el-icon--left" style="font-size:18px"></i>
                    </span>
                    <span class="span-mob">
                        查看匯率<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>1比特幣=1000 CNY </el-dropdown-item>
                    <el-dropdown-item>1比特幣=1000 USD </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>-->
            <div class="ctrl-btn">
                <el-button v-if="$store.state.user_info.Profit<=0" type="warning" style="height:35px;line-height:35px;padding:0 22px;" disabled>提 現</el-button>
                <el-button v-else type="warning" style="height:35px;line-height:35px;padding:0 22px;" @click="showModal=true">提 現</el-button>
            </div>
        </div>
        <div class="m-tab">
            <ul class="clearfix">
                <li :class="active===1?'active':''" @click="active=1">
                    <router-link to="/my/payment/income?pageIndex=1">
                        <span>收益記錄</span>
                    </router-link>
                </li>
                <li :class="active===2?'active':''" @click="active=2">
                    <router-link to="/my/payment/payout?pageIndex=1">
                        <span>提現記錄</span>
                    </router-link>
                </li>
            </ul>
        </div>
        
        <Income v-if="active===1"></Income>
        <Payout v-if="active===2"></Payout>
      </div>
      <Modal v-if="showModal" @closeMe="listenSon"></Modal>
  </div>
</template>

<script>
import utils from '~/plugins/utils'
import Income from './subcomponent/payment_income'
import Payout from './subcomponent/payment_payout'
import Modal from './subcomponent/payment_modal'

    export default {
        data(){
            return {
                // loading:false,
                // profitStatisticsList:'',
                // pageSize:15,
                // total:1,
                // isEmpty:false,
                active:1,
                showModal:false,
                satoshi:'',
                toUSD:''
            }
        },
        components:{
            Income,Payout,Modal
        },
        watch:{
            "$store.state.Bitcoin":function(){
                this.splitProfit()
            },
            "$store.state.user_info":function(){
                this.splitProfit()
            }
        },
      methods:{
            listenSon(e){
                this.showModal = false
            },
            splitProfit(){
                if(!this.$store.state.user_info) return
                let str
                if(this.$store.state.Bitcoin){
                    str = this.$utils.fMoney(this.$store.state.user_info.Profit,this.$store.state.Bitcoin)
                    this.satoshi =  str.split('sBTC')[0]
                    this.toUSD =  'sBTC'+str.split('sBTC')[1]
                }else{
                    str = this.$utils.fMoney(this.$store.state.user_info.Profit)
                    this.satoshi =  str.split('sBTC')[0]
                    this.toUSD =  'sBTC'+str.split('sBTC')[1]
                }
            },
      },
        computed:{
        },
      beforeMount(){
          this.active = this.$route.path.split('/')[3]==='income' ? 1:2
          this.splitProfit()
      },
      mounted(){
          console.log(this.$store.state.user_info);
      },
      created(){
          this.$utils = utils
      }
    }
</script>

<style lang="less" scoped>
.account-payment {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
    .row {
        margin:0;
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
            .write-btn {
                position: absolute;
                bottom:6px;
                right:0px;
                border-radius:16px;
            }
        }
        .account-show {
            box-sizing:border-box;
            min-height:90px;
            background-color: #f6f9fe;
            border:1px solid #bfd9f4;
            margin-top:20px;
            padding-left:3%;
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            font-size:15px;
            &>.number {
                display:flex;
                justify-content:center;
                padding-right:3%;
                color:#fc432f;
                font-size:23px;
                // margin-bottom:5px;
                display:inline-block;
                padding-right:2%;
            }
            .el-dropdown {
                display: inline-block;
                position: relative;
                color: #606266;
                font-size: 14px;
                padding-bottom: 15px;
                color: #4080ea;
                padding-right:3%;
                .span-mob {
                    display:none;
                }
            }
            .ctrl-btn {
                // flex:1;
                // margin-left:22px;
                padding-right:3%;
                text-align:right;
            }
        }
        .m-tab {
            &>ul {
                background-color: #ffffff;
                border:1px solid #dddddd;
                margin-top:22px;
                margin-bottom:-0px;
                margin-right:1px;
                li {
                    float:left;
                    position: relative;
                    // height:48px;
                    span {
                        display: block;
                        padding:15px 35px;
                        font-size:15px;
                        color:#515151;
                    }
                    &:after {
                        content:"";
                        height:3px;
                        width:70px;
                        background-color: #4a8fdf;
                        position: absolute;
                        bottom:1px;
                        left:50%;
                        transform: translateX(-50%);
                        display:none
                    }
                }
                li.active {
                    span {
                        color:#4a8fdf;
                        font-weight:600;
                    }
                    &:after {
                        display:block
                    }
                        
                }

            }
        }
        .content {
            padding-top:20px;
            th.title-header {
                width:380px ;
            }
            #doc-title {
                // width:380px ;
                display:flex;
                align-items:flex-start;
                // border:none;
                // border-bottom:1px solid #dddddd;
                img {
                    width:33%;
                    object-fit: scale-down;
                    flex:0 0 33%;
                }
                .tit {
                    font-size:13px;
                    padding-left:10px;
                }
                p.type {
                    color:#bdbdbd;
                    margin-bottom:0;
                }
            }
        }
    }
    @media screen and (max-width:992px) {
        .item .content {
            #doc-title {
                .tit {
                    font-size:11px;
                }
            }
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
        .item .account-show {
             padding:3%;
            .ctrl-btn {
                text-align:left;
                // padding-left:3%;
            }
            .el-dropdown {
                padding-bottom: 0px;
                padding-top: 2px;
                .span-pc {
                    display:none;
                }
                .span-mob {
                    display:block;
                }
            }
        }
    }
    @media screen and (max-width:475px) {
        td,th {
            font-size:12px !important;
        }
        .item .content {
            #doc-title {
                img {
                    display:none
                }
                .tit {
                    font-size:11px;
                    padding-left:0px;
                }
            }
            .xs-button {
                a {
                    padding:3px 6px;
                }
            }
        }
    }
}
</style>
