<template>
<div class="payout" v-loading="loading">
        <div class="content" style="text-align:left;min-height:300px" >
            <table class="table table-striped table-bordered" >
            <!--<caption>Optional table caption.</caption>-->
            <thead>
                <tr>
                <th>日期</th>
                <th>提現金額</th>
                <th>實際到賬</th>
                <th>額度</th>
                <th>狀態</th>
                <th class="not-pc">賬號</th>
                <th  class="not-pc">流水號</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v,i) in payoutList" :key="i">   
                    <td>{{$moment(v.CreatedAt).format("YYYY-MM-DD")}}</td>
                    <td><span v-if="v.Currency=='CNY'">¥</span><span v-if="v.Currency=='USD'">$</span>{{v.AmountOfCash}}</td>
                    <td><span v-if="v.Currency=='CNY'">¥</span><span v-if="v.Currency=='USD'">$</span>{{v.ActualAmount}}</td>
                    <td>{{v.SatoshiOfCash.toLocaleString()}}聰</td>
                    <td>
                        <span v-if="v.State==0">待處理</span>   
                        <span v-if="v.State==1">已完成</span>   
                        <span v-if="v.State==2">操作失敗</span>   
                    </td>
                    <td class="not-pc">{{v.AccountNumber}}</td>
                    <td  class="not-pc">{{v.SYS_ID}}</td>
                </tr>

            </tbody>
            </table>
            <p v-if="isEmpty" style="text-align:center">暫無數據...</p>
        </div> 
        <div style="text-align:center;padding:20px 0;">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    :pager-count="5"
                    @current-change="changePage"
                >
                </el-pagination>
        </div>  
</div>
</template>

<script>
import axios from '~/plugins/axios'
import moment from '~/plugins/moment'
import utils from '~/plugins/utils'
    export default {
        data(){
            return {
                loading:false,
                payoutList:'',
                pageSize:12,
                total:1,
                isEmpty:false,
                active:1
            }
        },
        watch:{
            '$route.query':'getPayout'
        },
      methods:{
            //最近收益
            getPayout(){
                this.loading = true
                axios.account.getEnchashment({
                    pageSize:this.pageSize,
                    pageIndex:this.$route.query.pageIndex || "1" ,
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.payoutList = res.data.Data.Statistics
                        this.total = res.data.Data.total
                    }else if(res.data.ResultCode==201){
                        if(!res.data.Data){
                            this.isEmpty = true
                        }else{
                            this.isEmpty = false
                        }
                    }
                }).catch(err=>{
                    this.loading = false
                })
            },
            changePage(pageIndex){
                let query = Object.assign({},this.$route.query)
                query.pageIndex = pageIndex
                this.$router.push({query:query})
            },
      },
      mounted(){

            if(!this.$route.query.pageIndex){
                this.$router.push({query:{pageIndex:'1'}})
            }else{
                this.getPayout()
            }
      },
      created(){
          this.$utils = utils
          this.$moment = moment
      }
    }
</script>

<style lang="less" scoped>
.payout {
        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            border-left: none;
            border-right: none;
            padding:8px 15px;
            text-align:center;
        }
        .table-bordered > thead > tr > th {
            background-color: #eeeeee;
        }
        .content {
            // padding-top:20px;
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
        @media screen and (max-width:768px) {
            .not-pc {
                display:none;
            }
        }
        @media screen and (max-width:515px) {
            .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
                padding:5px 3px;
            } 
        }
}
</style>
