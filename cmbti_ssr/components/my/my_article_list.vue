<template>
  <div class="article-list">
      <div class="gains item row"  v-loading="loading">
          <div class="title">
              <h5>全部文章</h5>
                <!--<button type="button " class="btn btn-warning write-btn"><i class="glyphicon glyphicon-plus-sign"></i> 文章撰寫</button>-->
                <ul class="pager write-btn" style="margin:0">
                    <li class="previous" style="">
                        <router-link to="/my/article/new" id="btn-icon">
                            <span aria-hidden="true"></span><i ></i> 文章撰寫
                        </router-link>
                    </li>
                </ul>
          </div>
        <div class="content" style="text-align:left;min-height:300px">
            <table class="table table-striped table-bordered" style="width:100% " >
            <!--<caption>Optional table caption.</caption>-->
            <thead>
                <tr>
                    <th class="title-header"  style="padding-left:12.5%">標題</th>
                    <th class="items-hidden" style="width:18%;padding-left:5%">時間</th>
                    <th class="items-hidden" style="">點閱</th>
                    <th class="items-hidden" style="">状态</th>
                    <th class="head-ctrl" style="text-align:center">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(v,i) in newsList" :key="i">
                    <!--<th scope="row">1</th>-->
                    <td>
                            <router-link :to="'/article/'+v.RelationID">
                        <div id="doc-title">
                            <img v-if="v.CoverImges" :src="v.CoverImges" alt="">
                            <img v-else src="/img/OopsDaily.png" alt="">
                            <div class="tit">
                                <!--注：22汉字以内-->
                                <!--<p>美國朝鮮新加坡首次會晤，外交部緊急回應后，於是</p>-->
                                <!--<p class="type">類別：政治</p>-->
                                <div class="overflow-row-2" style="height:35px;margin-bottom:7px;overflow:hidden">
                                    {{v.Title}}
                                </div>
                                <!--<p v-if="v.ArticleTags.length>0" class="type">類別：{{v.ArticleTags.join(' ')}}</p>-->
                                <p v-if="v.ArticleTags.length>0" class="type">類別：{{v.ArticleTags[0]}}</p>
                                <!--<p v-else class="type">類別：未知</p>-->
                            </div>


                        </div>
                            </router-link>
                    </td>
                    <!--时间-->
                    <td  class="items-hidden">{{$moment(v.PublishTime).format("YYYY-MM-DD HH:mm:ss")}}</td>
                    <!--点阅数-->
                    <td  class="items-hidden">{{v.ClickRate }}</td>
                    <td  class="items-hidden status">
                        <div class="status-normal" v-if="v.State==0">
                            正常
                        </div>
                        <div class="status-abnormal"  v-if="v.State==1">
                            未通過
                            <p>與其他文章重複</p>
                        </div>
                        <div class="status-waiting"  v-if="v.State==3">
                            審核中
                        </div>
                        <div class="status-waiting"  v-if="v.State==4">
                            圖片異常
                        </div>
                    </td>
                    <td>
                        <div class="ctrl-bar">
                            <!--<span class="edit-btn" @click="$router.push({path:'/my/article/edit/'+ v.RelationID})"><i class="glyphicon glyphicon-pencil"></i> </span>-->
                            <!--<span class="del-btn" @click="deleteArticle(v.RelationID)"><i class="glyphicon glyphicon-remove"></i> </span>-->
                            <span class="edit-btn" @click="$router.push({path:'/my/article/edit/'+ v.RelationID})"><i class="el-icon-edit"></i> </span>
                            <span class="del-btn" @click="deleteArticle(v.RelationID)"><i class="el-icon-close"></i> </span>
                            <button v-if="v.State==0" type="button" :class="'btn btn-primary copy-btn copy-link-'+i" :data-clipboard-text="linkPathOrigin+v.RelationID+'?r='+ShareID" @click="copyLink('copy-link-'+i)">複製鏈接</button>
                            <!--隱藏時佔位-->
                            <button v-else style="visibility:hidden" type="button" :class="'btn btn-primary copy-btn'"></button>
                        </div>
                    </td>
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
                    @current-change="changePage"
                    :pager-count = "5"
                >
                </el-pagination>
            </div>
          
      </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import utils from '~/plugins/utils'
import axios from '~/plugins/axios'
import moment from '~/plugins/moment'
    export default {
      data(){
        return {
            newsList:null,
            loading:false,
            pages:1, //分页数
            pageSize:15, //默认分页数
            total:1,
            linkPathOrigin:'',
            ShareID:'',
            isEmpty:false
        }
      },
      watch:{
        '$route.query':'getMyNews'
      },
      methods:{
        getMyNews(){
            this.loading = true
            axios.account.getMyNews({
                pageSize:this.pageSize,
                pageIndex:this.$route.query.pageIndex || '1',
                Tag:this.$route.query.Tag || ''
            }).then(res=>{
                this.loading = false
                if(res.data.ResultCode==200){
                    this.newsList = res.data.Data.news
                    this.total = res.data.Data.total
                    this.pages = Math.ceil(res.data.Data.total/this.pageSize)
                }else if(res.data.ResultCode==201){
                    if(!res.data.Data){
                        this.isEmpty = true
                        this.newsList = []
                    }else{
                        this.isEmpty = false
                    }
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        deleteArticle(id){
            if(id){
                this.$confirm('確定刪除?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                        this.loading = true
                        axios.account.deleteArticle({
                            RelationID:id
                        }).then(res=>{
                            this.loading = false
                            if(res.data.ResultCode==200){
                                this.getMyNews()
                                this.$store.commit('refreshUserInfo') //通知刷新userinfo
                                this.$message({
                                    message: '刪除成功！',
                                    type: 'success'
                                });
                            }

                        }).catch(err=>{
                            this.loading = false
                        })

                }).catch(() => {
                    
                });
            }
        },
        changePage(pageIndex){
            let query = Object.assign({},this.$route.query)
            query.pageIndex = pageIndex
            this.$router.push({query:query})
        },
        init(){
            if(!this.$route.query.Tag || !this.$route.query.pageIndex){
                this.$router.push({query:{Tag:'',pageIndex:'1'}})
            }
            this.getMyNews()
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
      components:{},
      mounted(){
            this.linkPathOrigin = window.location.origin + '/article/'
            this.ShareID = this.$utils.getCookie('ShareID')|| ''

      },
      created(){
          this.$utils = utils
          this.$moment = moment
          this.init() 
      }
    }
</script>

<style lang="less" scoped>
.article-list {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
    .row {
        margin:0;
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
             }
        }
    }
    .edit-btn,.del-btn {
        color:#888;
        margin:0 2px;
        cursor:pointer;
        // padding:5px 7px 5px 2px;
        display:inline-block;
        font-size:19px;
        width:28px;
        height:37px;
        line-height:37px ;
        text-align:center;
        &:hover {
            color:#45abe1;
            font-size:25px;
        }
    }
    .del-btn { 
        margin-right:8px;
    }
    .copy-btn {
        width:63px !important;
        height:26px;
        background-color: #e9f3fd;
        color:#2c80da;
        border:1px solid #66a6eb;
        font-size:13px;
        padding:0;
        &:hover {
            color:#1b53a0;
            background-color: #d7e9fa;
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
            .write-btn {
                position: absolute;
                bottom:5px;
                right:0px;
            }
        }
        .content {
            padding-top:20px;
            th.title-header {
                width:380px ;
            }
            .status {
                p {
                    margin-bottom:0px;
                    color:#9b9b9b;
                    font-size:12px;
                }
                .status-normal {
                    color:#3fe034;
                }
                .status-abnormal {
                    color:#f46c6c;
                }
                .status-waiting {
                    color:#fc9436;
                }
            }
            #doc-title {
                // width:380px ;
                display:flex;
                align-items:flex-start;
                // border:none;
                // border-bottom:1px solid #dddddd;
                img {
                    width:33%;
                    object-fit: cover;
                    flex:0 0 33%;
                    max-height:72px;
                }
                .tit {
                    font-size:13px;
                    padding-left:10px;
                    &>div {
                        display: -webkit-box;
                        -webkit-box-orient: vertical; //方向
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        max-width:322px;
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
    #btn-icon {
        // display:inline-block;
        // height:15px;
        // width:15px;
        padding:8px 20px;
        padding-left:38px;
        background: #fb8608 url('/img/edit_add_icon.png') no-repeat 17px 7px;;
        color:#fff;
        font-size:12px;
        border-radius:34px;
        border:none
    }
    .head-ctrl {
        width:220px;
        
    }
    .ctrl-bar {
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-right:20px;
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
    @media screen and (max-width:500px) {
        td,th {
            font-size:13px !important;
        }
        .items-hidden {
            display:none;
        }   
        .head-ctrl {
            width:165px;
            margin-right:0;
        } 
        .ctrl-bar {
            margin-right:0px;
        }
        .item .content {
            #doc-title {
                img {
                    display:none
                }
                .tit {
                    // font-size:12px;
                    padding-left:0px;
                }
            }
            .xs-button {
                a {
                    padding:3px 6px;
                }
            }
        }
        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
            padding:3px;
        }

    }
}
</style>
