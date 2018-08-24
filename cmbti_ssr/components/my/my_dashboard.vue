<template>
  <div class="account-home" v-loading="requestCount<3">
      <div class="user-info row">
          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 l-box">
              <div class="photo"  @click="$router.push({path:'/my/user/info'})" style="cursor:pointer">
                    <img v-if="user_info.Avatar" :src="user_info.Avatar" alt="">
                    <img v-else src="/img/timg.jpg" alt="">
                  <!--<img src="/img/timg.jpg" alt="">-->
              </div>
              <div class="msg">
                  <h5 style="margin:0 0 5px 0" class="overflow-row-1">{{user_info.Name}}</h5>
                  <span class="overflow-row-1" style="display:block">會員等級：<em style="color:#fcae69">{{user_info.Grade}} 級</em></span>
                  <span class="" style="display:block">賬戶餘額：<em style="color:#fb8b82;display:inline-block" v-html="$store.state.Bitcoin?$utils.fMoney(user_info.Profit,$store.state.Bitcoin):$utils.fMoney(user_info.Profit)"></em></span>
              </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 r-box">
                <div>
                    <div class="bg bg1"></div>
                    <div class="p1">最新消息<div class="mob-show overflow-row-1"><span>0</span></div></div> 
                </div>
                <div>
                    <div class="bg bg2" @click="$router.push({path:'/my/article/list?CategoryID=0&pageIndex=1'})"></div>
                    <div class="p1" @click="$router.push({path:'/my/article/list?CategoryID=0&pageIndex=1'})">發表文章<div class="mob-show"><span>{{user_info.ArticleCount || 0}}</span></div></div> 
                </div>
                <div>
                    <div class="bg bg3" @click="$router.push({path:'/my/payment/income?CategoryID=0&pageIndex=1'})"></div>
                    <div class="p1" @click="$router.push({path:'/my/payment/income?CategoryID=0&pageIndex=1'})">我的收益<div class="mob-show"><span  style="word-break:break-all;" v-html="$store.state.Bitcoin?$utils.fMoney(user_info.Profit,$store.state.Bitcoin):$utils.fMoney(user_info.Profit)"></span></div></div> 
                    
                </div>
          </div>
      </div>
      <div class="gains item row income">
          <div class="title">
              <h5>最近收益</h5>
          </div>
        <div class="content" style="text-align:left;min-height:100px">
            <table class="table table-striped table-bordered" style="width:100%">
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
                    <!-- <td v-html="$store.state.Bitcoin?$utils.fMoney(v.Pyramid,$store.state.Bitcoin):$utils.fMoney(v.Pyramid)"  style="text-align:center"></td> -->
                    <td v-html="$store.state.Bitcoin?$utils.fMoney(v.Profit,$store.state.Bitcoin):$utils.fMoney(v.Profit)"  style="text-align:center"></td>
                    <!--<td>{{123}}</td>-->
                </tr>

            </tbody>
            </table>
            <p v-if="isEmpty" style="text-align:center">暫無數據...</p>
        </div>   
      </div>




      <div class="gains item row record">
          <div class="title">
              <h5>最近點閱</h5>
          </div>
        <div class="content" style="text-align:left;min-height:300px">
            <table class=" table-bordered"  style="width:100%">
            <!--<caption>Optional table caption.</caption>-->
            <thead>
                <tr>
                    <th class="title-header" style="padding-left:4%;width:30%">標題</th>
                    <th style="width:12%;">日期</th>
                    <th style="width:9%;">點閱</th>
                    <th style="width:9%;">分享</th>
                    <th style="width:9%;">推廣</th>
                    <!--<th style="width:115px;">下線</th>-->
                    <th style="width:22%;">總收益</th>
                    <th style="">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v,i) in articleList" :key="i">
                    <!--<th scope="row">1</th>-->
                    <td>
                        <router-link :to="'/article/'+v.RelationID">
                        <div id="doc-title">
                            <img v-if="v.CoverImges" :src="v.CoverImges" alt="">
                            <img v-else src="/img/OopsDaily.png" alt="">
                            <div class="tit" style="color:#373737;text-align:left" >
                                <div style="height:36px;margin-bottom:5px">
                                    <p>{{v.Title}}</p>
                                </div>
                                <p class="type">類別:{{v.ArticleTags && v.ArticleTags.length>0 ? v.ArticleTags[0]:''}} <span style="padding:0 4px">|</span> ID:{{v.RelationID.length>12?v.RelationID.substr(0,12)+"...":v.RelationID}}</p>
                            </div>
                        </div>
                        </router-link>
                    </td>
                    <td>{{$moment(v.Date).format("YYYY/MM/DD")}}</td>
                    <td>{{v.Reading}}</td>
                    <td>{{v.Spread}}</td>
                    <!--<td>{{v.Pyramid}}</td>-->
                    <td>{{v.Promotion}}</td>
                    <td v-html="$store.state.Bitcoin?$utils.fMoney(v.Profit,$store.state.Bitcoin):$utils.fMoney(v.Profit)"></td>
                    <td>
                            <router-link :to="'/my/record/'+v.RelationID">查看</router-link>
                    </td>
                </tr>

            </tbody>
            </table>
            <p v-if="isEmpty1" style="text-align:center;padding-top:18px">暫無數據...</p>
        </div>  
      </div>
      
      <div class="gains item row">
          <div class="title">
              <router-link to="/my/share?pageIndex=1&CategoryID=-1">
              <h5>熱門文章</h5>
              </router-link>
          </div>
        <div class="content" style="text-align:left;min-height:300px">
            <div class="news-list">
                <div class="news-items" v-for="(v,i) in hotList" :key="i">
                    <div style="">
                        <div class="photo">
                            <router-link :to="'/article/'+v.RelationID">
                            <img v-if="v.CoverImges" :src="v.CoverImges" alt="">
                            <img v-else src="/img/OopsDaily.png" alt="">
                            </router-link>
                        </div>
                        <div style="padding:0 4% 5%;max-width: 268px;">
                            <div class="news-title">
                                <div style="height:50px;overflow:hidden;" class="hot-title">
                                    <!--<span class="flag overflow-row-1" v-if="v.ArticleTags.length>0">{{v.ArticleTags.join(' ')}}</span> <span class="txt">{{v.Title}}</span>-->
                                    <span class="flag overflow-row-1" style="margin-right:4px" v-if="v.ArticleTags.length>0">{{v.ArticleTags[0]}}</span> <span class="txt">{{v.Title}}</span>
                                    <!--<span class="flag">{{v.CategoryName}}</span> <span class="txt">{{v.NewsTitle.length<25?v.NewsTitle:v.NewsTitle.substr(0,25)+'...' }}</span>-->
                                </div>
                                <div class="sub-title">
                                    <span>時間：{{$moment(v.PublishTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
                                    &nbsp;<i>|</i>&nbsp;
                                    <span>點閱：{{v.ClickRate}}</span>
                                </div>
                            </div>
                            <div class="" style="margin:17px 0 12px">
                                <button type="button" :class="'btn btn-primary copy-link-'+i" style="width:100%" :data-clipboard-text="linkPathOrigin+v.RelationID+'?r='+ShareID" @click="copyLink('copy-link-'+i)">複製鏈接</button>
                            </div>
                        </div>
                    </div>
                </div>
                
 

            </div>
        </div>   
      </div>

  </div>
</template>

<script>
import Clipboard from 'clipboard'
import utils from '~/plugins/utils'
import axios from '~/plugins/axios'
import moment from '~/plugins/moment'
    export default {
        data(){
            return {
                userInfo:'',
                loading:false,
                profitStatisticsList:'',
                hotList:'',
                paymentRequest:false,
                recordRequest:false,
                linkPathOrigin:'',
                requestCount:0,
                ShareID:'',
                isEmpty:false,
                isEmpty1:false,
                times:'',
                articleList:'',
                pageSize:10,
                $utils:utils,
                $moment:moment
            }
        },
        watch:{
            '$route.query':'getProfitStatistics',
        },
        computed:{
            user_info(){
                return this.$store.state.user_info?this.$store.state.user_info:{}
            }
        },
        methods:{
            getRecord(){
                this.recordRequest = true
                this.isEmpty1 = false
                // this.currentPage = Number(this.$route.query.pageIndex)
                // {"pageSize":"","pageIndex":"","Date":"日期,可传入''或空","type":"1:共推,2:撰写,-1为全部","RelationID":"文章ID,用于查询单篇文章的点击信息可传入''或空"}
                axios.account.record({
                    pageSize:String(this.pageSize),
                    pageIndex:this.$route.query.pageIndex || "1",
                    // CategoryID:this.$route.query.CategoryID,
                    Date:'',
                    type:this.$route.query.type || "-1",
                    RelationID:''
                }).then(res=>{
                    this.requestCount++
                    this.recordRequest = false
                    if(res.data.ResultCode==200){
                        this.articleList = res.data.Data.ArticleView.slice(0,5)
                        this.total = res.data.Data.total
                    }else if(res.data.ResultCode==201){
                        this.isEmpty1 = true
                    }
                }).catch(err=>{
                    this.recordRequest = false
                    this.requestCount++
                })
            },
            //最近收益
            getProfitStatistics(){
                this.paymentRequest = true
                axios.account.profitStatistics({
                    pageSize:this.pageSize,
                    pageIndex:this.$route.query.pageIndex || "1" ,
                }).then(res=>{
                    this.requestCount++
                    this.paymentRequest = false
                    if(res.data.ResultCode==200){
                        this.profitStatisticsList = res.data.Data.Statistics
                        // this.pages = Math.ceil(res.data.Data.total/this.pageSize)
                    }else if(res.data.ResultCode==201){
                        if(!res.data.Data){
                            this.isEmpty = true
                        }else{
                            this.isEmpty = false
                        }
                    }
                }).catch(err=>{
                    this.paymentRequest = false
                    this.requestCount++
                })
            },
            //熱門好文
            hotArticle(){
                this.loading = true
                // JSON {"pageSize":"15","pageIndex":"1","CategoryID":"-1","sDateTime":"","eDateTime":""} 
                axios.account.hotArticle({
                    pageSize:"8",
                    pageIndex:"1",
                    CategoryID:"-1",
                    // sDateTime:"",
                    // eDateTime:""
                }).then(res=>{
                    this.requestCount++
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.hotList = res.data.Data.news
                        // this.pages = Math.ceil(res.data.Data.total/this.pageSize)
                        this.copyLink()
                    }
                }).catch(err=>{
                    this.loading = false
                    this.requestCount++
                })
            },
            copyLink(className){
                const clipboard = new Clipboard('.'+className);
                clipboard.on('success', e=> {
                    // console.info('Action:', e.action);
                    // console.info('Text:', e.text);
                    // console.info('Trigger:', e.trigger);
                    this.$message({
                        message: '複製成功！',
                        type: 'success'
                    });
                    e.clearSelection();
                });

                clipboard.on('error', function(e) {
                    // console.error('Action:', e.action);
                    // console.error('Trigger:', e.trigger);
                });
            }

        },
        mounted(){
            // this.$utils = utils
            this.getProfitStatistics()
            this.hotArticle()
            this.getRecord()

            this.linkPathOrigin = window.location.origin + '/article/'
            this.ShareID = this.$utils.getCookie('ShareID')|| ''
        },
        created(){
            this.$utils = utils
            this.$moment = moment
        }
    }
</script>

<style lang="less" scoped>
.account-home {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
    .row {
        margin:0;
    }
    .hot-title {
        // 多行省略
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        .txt {
        }
    }
    .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
         border-left: none;
         border-right: none;
         padding:15px;
    }
    thead {
        tr {
             background:#eeeeee;
             th {
                 padding-top:10px !important;
                 padding-bottom:10px !important;
                 text-align:center;
                 vertical-align: middle;
                    &>span {
                        display:block;
                        font-weight:400;
                        font-size:12px;
                    }
             }
        }
    }
    tbody {
        tr {
             td {
                 text-align:center;
             }
        }
    }
    .user-info {
        background-color: #fff;
        margin-bottom:10px;
        display:flex;
       &>div {
           min-height:140px;
       }

       .l-box {
            border-right:1px solid #eeeeee;
            display:flex;
            align-items:center;
            flex:0 0 442px;
            // padding:15px;
            .photo {
                // flex:0 0 122px;
                width:70px;
                height:70px;
                border-radius:50%;
                overflow: hidden;
                margin:15px;
                margin-left:40px;
                border:1px solid #ccc;
                img {
                    width:100%;
                    height:auto;
                    object-fit:cover; 
                    //    object-fit: fill | contian | cover | none | scale-down;  
                }
            }
            .msg {
                text-align: left;
                max-width:325px;
                overflow: hidden;
                h5 {
                    display:block;
                    font-size:15px;
                    font-weight: 700;
                    width:120px;
                    color:#2e3e4f;
                    &:hover{
                        color:#2e3e4f
                    }
                }
                span {
                    font-size:13px;
                    color:#aaaaaa;
                }
            }
       }
        .r-box {
            display:flex;
            align-items:center;
            justify-content: space-around;;
            flex:1;
            &>div {
                flex:0 0 200px;
                min-height:95px;
                overflow: hidden;
                .bg{
                    width:50px;
                    height:50px;
                    margin:2px auto;
                    background-color:#eee;
                }
                .bg1 {
                    background:url('/img/msg_icon.png') no-repeat 0px 7px;
                }
                .bg2 {
                    cursor:pointer;
                    background:url('/img/doc_icon.png') no-repeat 0px 7px;
                }
                .bg3 {
                    cursor:pointer;
                    background:url('/img/gains_icon.png') no-repeat 0px 7px;
                }
                .p1{
                    font-size:13px;
                    display:inline-block;
                    width:100%;
                    text-align:center;
                    cursor:pointer;
                    span {
                        color:#f06a6e;
                    }
                    .mob-show {
                        width:100%;
                    }
                }
                @media screen and (max-width:414px) {
                    p {
                        font-size:12px;
                    }
                }
                
            }
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
            h5 {
                display:inline-block;
                padding:2px 3px;
                font-weight:700;
                position: relative;
                color:#2e3e4f;
                &:hover{
                    color:#2e3e4f
                }
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
            padding-top:20px;
        }
    }
    .record {
            .content {
            min-height:200px;
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
                    height:68px;
                    object-fit: cover;
                    flex:0 0 33%;
                }
                .tit {
                    font-size:13px;
                    padding-left:10px;
                    &>div {
                        // 多行省略
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        word-break:break-all;
                    }

                }
                p.type {
                    color:#bdbdbd;
                    margin-bottom:0;
                }
            }
        }
    }


    .news-list {
        display:flex;
        flex-wrap:wrap;
        .news-items {
            flex:0 0 25%;
            justify-content:space-between;
            max-width:288px;
            box-sizing: border-box;
            &>div{
                border:1px solid #e5e5e5;
                margin:1.5% 3% 5%;
            }
            .photo {
                width:100%;
                height:132px;
                margin-bottom:5px;
                background-color: #eee;
                overflow: hidden;
                img {
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
            .news-title {
                height:74px;
                span.flag {
                    display:inline-block;
                    height:20px;
                    max-width:175px;
                    padding-left:3px;
                    padding-right:3px;
                    border:1px solid #fa9b97;
                    color:#fa9b97;
                    border-radius:3px;
                    font-size: 12px;
                    text-align: center;
                    line-height: 20px;
                     position: relative;
                    top: 5px;
                }
                span.txt {
                    line-height:25px;
                }
                .sub-title {
                    font-size:12px;
                    color:#999999;
                    padding-top:5px;
                    height:38px;
                    // 多行省略
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break:break-all;
                }
            }
            .btn-primary {
                background-color: #2c7fdb;
                height:45px;
                border-color:#2c7fdb;
                &:hover {
                    background-color: #2d70cb;
                }

            }
        }
    }
    @media screen and (max-width:992px) {
            padding:0;
            .user-info {
                .l-box {
                    border-bottom:1px solid #eee;
                    border-right:none
                }
            }
            p {
                font-size:12px;
            }
            .news-list {
                .news-items {
                    flex:0 0 33%;
                    .photo {
                        height:120px;
                    }
                }
            }
    }
    @media screen and (max-width:768px) {
            padding:0;
            .news-list {
                .news-items {
                    .photo {
                        height:100px;
                    }
                }
                .sub-title {
                    font-size:12px !important;
                }
            }
        .user-info .r-box {
            &>div {
                height:108px;
                span {
                    font-size:12px;
                }
            }
        }
    }
    @media screen and (max-width:525px) {
       .user-info .l-box {
            .photo {
                // flex:0 0 122px;
                width:55px;
                height:55px;
                margin-left:15px;
                margin-right:11px;
                img { 
                }
            }
            .msg {
                span {
                    font-size:12px;
                }
            }
       }
        .news-list {
            .news-items {
                flex:0 0 50% !important;
            }
        }
        .user-info .r-box {
            &>div {
                flex:0 0 100px;
            }
        }
    }
    @media screen and (max-width:450px) {
            .news-list {
                .news-items {
                    .photo {
                        height:80px;
                    }
                }
            }
        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            padding:2px;
        }
        .tit {
            padding-left:2px !important;
        }
        .record {
            .content {
                #doc-title {
                    img {
                        display:none
                    }
                }
            }
        }
        .news-title {
            // height:62px !important;
        }

    }
    @media screen and (max-width:330px) {
            .news-list {
                .news-items {
                    .photo {
                        height:65px;
                    }
                }
            }
    }
    @media screen and (max-width:475px) {
        td,th {
            font-size:12px !important;
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
        .m-search .el-range-separator {
            padding:0 !important;
        }
        .record thead tr th:nth-last-child(2),.record tbody tr td:nth-last-child(2){
            /*background-color: red !important;*/
            border-left:1px solid #ccc !important;
            border-right:1px solid #ccc !important;
            text-align:center;
        }
        .record thead tr th:nth-last-child(1),.record tbody tr td:nth-last-child(1){
            text-align:center;
            /*padding-left:3% !important;*/
        }     

</style>