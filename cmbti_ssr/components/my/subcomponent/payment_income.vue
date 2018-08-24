<template>
<div class="income" v-loading="loading">
        <div class="content" style="text-align:left;min-height:300px" >
            <table class="table table-striped table-bordered" >
            <!--<caption>Optional table caption.</caption>-->
            <thead>
                <tr>
                <th style="width:14%">日期</th>
                <th style="width:10%">點閱<span>(次)</span></th>
                <th style="width:10%">分享<span>(次)</span></th>
                <!-- <th style="width:11%">閱讀</th> -->
                <th style="width:10%">推廣<span>(次)</span></th>
                <th style="width:10%">任務<span>(sBTC)</span></th>
                <th style="width:12%">下線<span>(sBTC)</span></th>
                <th style="width:12%">遊戲<span>(sBTC)</span></th>
                <th style="text-align:center;">總收益</th>
                <!--<th>收益</th>-->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v,i) in profitStatisticsList" :key="i">
                    <!--<th scope="row">1</th>-->
                    <td>{{$moment(v.Date).format("YYYY-MM-DD")}}</td>
                    <td>{{v.Reading}}</td>
                    <td>{{v.Spread}}</td>
                    <td>{{v.Promotion}}</td>
                    <td>{{v.TaskAward.toLocaleString()}}</td>
                    <td>{{v.Pyramid.toLocaleString()}}</td>
                    <td>{{v.GameProfit.toLocaleString()}}</td>
                    <!-- <td>{{v.ViewCount}}</td> -->
                    <!-- <td v-html="$store.state.Bitcoin?$utils.fMoney(v.Pyramid,$store.state.Bitcoin):$utils.fMoney(v.Pyramid)"></td> -->
                    <td v-html="$store.state.Bitcoin?$utils.fMoney(v.Profit,$store.state.Bitcoin):$utils.fMoney(v.Profit)"></td>
                    <!--<td>{{123}}</td>-->
                </tr>

            </tbody>
            </table>
            <p v-if="isEmpty" style="text-align:center">暫無數據...</p>
        </div> 
        <div style="text-align:center;padding:20px 0">
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
                profitStatisticsList:'',
                pageSize:12,
                total:1,
                isEmpty:false,
                active:1
            }
        },
        watch:{
            '$route.query':'getProfitStatistics'
        },
      methods:{
            //最近收益
            getProfitStatistics(){
                this.loading = true
                axios.account.profitStatistics({
                    pageSize:this.pageSize,
                    pageIndex:this.$route.query.pageIndex || "1" ,
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.profitStatisticsList = res.data.Data.Statistics
                        this.total = res.data.Data.total
                        // this.pages = Math.ceil(res.data.Data.total/this.pageSize)
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
                this.getProfitStatistics()
            }
      },
      created(){
          this.$utils = utils
          this.$moment = moment
      }
    }
</script>

<style lang="less" scoped>
.income {
        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            border-left: none;
            border-right: none;
            padding:8px 15px;
            text-align:center;
        }
        .table-bordered > thead > tr > th {
            background-color: #eeeeee;
            vertical-align: middle;
            &>span {
                display:block;
                font-weight:400;
                font-size:12px;
            }
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
        @media screen and (max-width:515px) {
        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            padding:5px 3px;
        } 
            
        }
}
</style>
<style>
        .income thead tr th:nth-last-child(1),.income tbody tr td:nth-last-child(1){
            /*background-color: red !important;*/
            border-left:1px solid #ccc !important;
        }
        /* .income thead tr th:nth-last-child(2),.income tbody tr td:nth-last-child(2){
            border-left:1px solid #ccc !important;
        } */

</style>

