<template>
  <div class="share">
      <div class="gains item row" v-loading="loading">
          <div class="title">
              <h5>熱門好文</h5>
          </div>
        <div class="m-search">
                <!--<el-input style="width:122px;height:29px;;"
                    placeholder="ID搜索"
                    v-model="searchID"
                    clearable>
                </el-input>-->
                <el-select v-model="selectCategoryID" filterable placeholder="文章類型" style="margin-right:12px;">
                    <el-option
                    v-for="item in $store.state.navTypes"
                    :key="item.ID"
                    :label="item.TagName"
                    :value="item.TagName">
                    </el-option>
                </el-select>
                <el-date-picker  style="margin-right:5px;width:300px"
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="開始日期"
                    end-placeholder="結束日期">
                </el-date-picker>
                <el-button type="primary" @click="search()">篩選</el-button>
          </div>
        <div class="content" style="text-align:left;min-height:300px">
            <div class="news-list" style="min-height:300px">
                <div class="news-items" v-for="(v,i) in hotList" :key="i">
                    <div style="">
                        <router-link :to="'/article/'+v.RelationID">
                        <div class="photo">
                            <img v-if="v.CoverImges" :src="v.CoverImges" alt="">
                            <img v-else src="/img/OopsDaily.png" alt="">
                        </div>
                        </router-link>
                        <div style="padding:0 4% 3%;max-width: 268px;">
                            <div class="news-title">
                                <div style="height:50px;overflow:hidden" class="hot-title">
                                    <!--<span class="flag overflow-row-1" v-if="v.ArticleTags.length>0">{{v.ArticleTags.join(' ')}}</span> <span class="txt">{{v.Title}}</span>-->
                                    <span class="flag overflow-row-1" v-if="v.ArticleTags.length>0">{{v.ArticleTags[0]}}</span> <span class="txt">{{v.Title}}</span>
                                </div>
                                <div class="sub-title">
                                    <span>時間：{{$moment(v.PublishTime).format("YYYY-MM-DD HH:mm:ss")}}</span>
                                    &nbsp;<i>|</i>&nbsp;
                                    <span>點閱：{{v.ClickRate}}</span>
                                </div>
                            </div>
                            <div class="" style="margin:17px 0px 12px">
                                <button type="button" :class="'btn btn-primary copy-link-'+i" style="width:100%" :data-clipboard-text="linkPathOrigin+v.RelationID+'?r='+ShareID" @click="copyLink('copy-link-'+i)">複製鏈接</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="news-items" v-for="(v,i) in 11" :key="i">
                    <div style="">
                        <div class="photo">
                            
                            <img src="/img/OopsDaily.png" alt="">
                        </div>
                        <div style="padding:0 4% 5%">
                            <div class="news-title">
                                <span class="flag">fsdfs</span> <span class="txt">fafsadf</span>
                                <div class="sub-title">
                                    <span>時間：fafsdaf</span>
                                    &nbsp;<i>|</i>&nbsp;
                                    <span>點閱：fasfsdf</span>
                                </div>
                            </div>
                            <div class="" style="margin:17px 0">
                                <button type="button" class="btn btn-primary" style="width:100%" @click="copyLink">複製鏈接</button>
                            </div>
                        </div>
                    </div>
                </div>-->
                
 

            </div>
          <!--分頁器 -->
          <div style="text-align:center;padding:18px 0;">
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
      </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import moment from '~/plugins/moment'
import utils from '~/plugins/utils'
import Clipboard from 'clipboard';
    export default {
        data(){
            return {
                loading:false,
                hotList:'',
                total:1,
                pageSize:12,
                linkPathOrigin:'',
                ShareID:'',
                selectCategoryID:'',
                selectDate:''
            }
        },
        watch:{
            '$route.query':'hotArticle',
            'selectDate':function(){
                if(this.selectDate === null){
                    let query = Object.assign({},this.$route.query)
                    query.sDateTime = ""
                    query.eDateTime = ""
                    this.$router.push({query:query})
                }
            }
        },

        methods:{
            search(){
                if(this.selectCategoryID || this.selectDate){
                    let query = Object.assign({},this.$route.query)
                    if(this.selectDate){
                        let s = this.$moment(this.selectDate[0]).format("YYYY-MM-DD") 
                        let e = this.$moment(this.selectDate[1]).format("YYYY-MM-DD") 
                        query.sDateTime = this.$moment(s+" 00:00:00").utc().format() //转utc
                        query.eDateTime = this.$moment(e+" 23:59:59").utc().format() //转utc
                    }
                    if(this.selectCategoryID){
                        query.Tag = this.selectCategoryID
                    }
                    query.pageIndex = "1" 
                    this.$router.push({query:query})
                }else{
                    this.$message({
                        message: '搜索內容不能為空！',
                        type: 'warning',
                        duration: 2500,
                        showClose: true
                    });
                }
            },
            //熱門好文
            hotArticle(){
                this.loading = true
                // JSON {"pageSize":"15","pageIndex":"1","CategoryID":"-1","sDateTime":"","eDateTime":""}
                axios.account.hotArticle({
                    pageSize:this.pageSize,
                    pageIndex:this.$route.query.pageIndex || "1",
                    Tag:this.$route.query.Tag || "",
                    sDateTime:this.$route.query.sDateTime || "",
                    eDateTime:this.$route.query.eDateTime || "",
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.hotList = res.data.Data.news
                        this.total = res.data.Data.total
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
            },
            init(){
                let Q = this.$route.query
                if(Object.keys(Q).length < 1){
                    this.$router.push({query:{pageIndex:'1'}})
                }else{
                    if(Q.sDateTime && Q.eDateTime){
                        // this.selectDate  = this.$moment(Q.Date)
                        this.selectDate = []
                        this.selectDate[0] = this.$moment(Q.sDateTime).format("YYYY-MM-DD")  // utc轉當地時間
                        this.selectDate[1] = this.$moment(Q.eDateTime).format("YYYY-MM-DD")  // utc轉當地時間
                    }
                    this.selectCategoryID = Q.Tag ? Q.Tag :''
                    this.hotArticle()
                }
            }

        },
        components:{},
        mounted(){
            this.linkPathOrigin = window.location.origin + '/article/'
            this.ShareID = this.$utils.getCookie('ShareID')|| ''
        },
        created(){
            this.$moment = moment
            this.$utils = utils
            this.init()
        }
    }
</script>

<style lang="less" scoped>
.share {
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
            padding-top:20px;
        }
    }
    .m-search {
        padding:15px 0;
        display:flex;
        border-bottom:1px solid #eeeeee;
        // margin:0 8px;
    }
    .news-list {
        display:flex;
        flex-wrap:wrap;
        padding-left:-0.8%;
        margin-left:-0.7%;
        margin-right:-0.7%;
        .news-items {
            flex:0 0 25%;
            justify-content:space-between;
            max-width:288px;
            box-sizing: border-box;
            &>div{
                border:1px solid #e5e5e5;
                margin:0% 3% 7%;
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
                }
                .hot-title,.sub-title {
                    // 多行省略
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
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
                    border-bottom:1px solid transparent;
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
            .btn-primary {
                height:40px !important;

            }
    }
    @media screen and (max-width:525px) {
            .news-list {
                .news-items {
                    flex:0 0 50% !important;
                }
            }
            .m-search {
                display:block;
                text-align:left;
                line-height: 52px;
            }
    }
    @media screen and (max-width:414px) {
            .news-list {
                .news-items {
                    .photo {
                        height:80px;
                    }
                }
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
    .m-search .el-range-separator {
        padding:0 !important;
    }
</style>
