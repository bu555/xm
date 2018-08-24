<template>
  <div class="other_article" style="margin-top: 20px">
    <h5 style="font-weight: 900;font-size: 20px">
      <i class="fa fa-line-chart" style="color: #f39900;margin-right: 20px"></i>同區的其他文章</h5>
    <div class="other_article_wrap" v-if="other_article && (other_article instanceof Array) && other_article.length>=1">
      <div class="recent_hot_content clearfix other_article_content" v-for="(item,index) in other_article" :key="index">
        <router-link :to="{path:'/article/'+ item.RelationID}">
          <div class="row flexRow" style="display:flex;">
            <!--<div class="float-left">-->
            <div class="photo">
              <img :src="item.CoverImges?item.CoverImges:'/img/OopsDaily.png'">
            </div>
            <!--</div>-->
            <!--<div class="float-left">-->
            <div class="charater">
              <div class="top">

                <div>
                  <p style=" -webkit-box-orient: vertical">{{item.Title}}</p>
                </div>
              </div>
              <div class="center">
                <p>{{item.Profile}}</p>
              </div>
              <div class="bottom">
                <div class="author">
                  <span>{{item.ArticleTags[0]}}</span>
                  <span><img :src="item.Avatar?item.Avatar:'/img/timg.jpg'" alt=""></span>
                  <span>{{item.AuthorName}}</span>
                  <i class="fa fa-clock-o"></i>
                  <span>發表時間：</span>
                  <!-- <span>{{item.PublishTime | timezone_filter}}</span> -->
                  <!-- <span>{{$moment(item.PublishTime).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
                </div>
                <!--</div>-->
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <p v-else style="text-align:center; margin:20px 0 ;cursor:default;">暫無新聞...</p>
    <div id="load-more-icon" style="text-align:center;font-size:22px;padding-top:8px" v-if="moreLoading&&!dataEnd">
       <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from 'moment'
export default {
  name: "other_article",
  data() {
    return {
      pageIndex:1,
      moreLoading:false,
      relationID:'',
      dataEnd:false,
      other_article:null,
      // $moment:moment
    };
  },
  props:[ 'otherArticleList' ],
  computed:{
    
  },
  watch: {
      '$route.path':function(){
          // 数据复位
          this.pageIndex = 1
          this.moreLoading = false
      },
      'otherArticleList':function(value){
          this.other_article = value
      }

  },
  methods: {
      async getData () {
          this.moreLoading = true
          this.pageIndex = this.pageIndex+1
          let res = await Promise.all([
            axios.article.other_article({ pageSize:20,pageIndex:this.pageIndex,RelationID:this.relationID })
          ])
          setTimeout(()=>{
            this.moreLoading = false
            // 等待渲染完成后取消冷却
          },220)
          if(res[0].data.ResultCode==200){
            if(res[0].data.Data.news instanceof Array){
                // this.$store.commit('article/concatOtherArticle',res[0].data.Data.news)
                this.other_article.concat(res[0].data.Data.news)
                if(res[0].data.Data.news.length<20){
                  // 不足20条
                  this.dataEnd = true
                }
            }
          }else{
            // 201 数据为空
            this.dataEnd = true
          }
      },
      scrollHandler(){
              // let loadIcon = document.getElementById('load-more-icon')
            let pageH = document.body.clientHeight
            let viewH = document.documentElement.clientHeight
            let scrollH = window.pageYOffset
            console.log((pageH-scrollH));
            // 提前一屏请求数据
            if((pageH-scrollH-viewH)<(viewH*1) && !this.moreLoading && !this.dataEnd){
                this.getData()
            }
      }
  },
  created() {
      this.pageIndex = 1
      this.relationID = this.$route.path.split('/')[2]
      this.other_article = this.otherArticleList
  },
  mounted() {
        document.addEventListener('scroll',this.scrollHandler,false)
    console.log('绑定');
  },
  beforeDestroy(){
    console.log('销毁');
      document.removeEventListener('scroll',this.scrollHandler,false)
  }
};
</script>

<style scoped lang="less">
@media screen and(max-width: 768px) {
  .photo {
    max-width: 30% !important;
    width: 100%;
    vertical-align: top;
  }

  .charater {
    max-width: 69% !important;
    width: 100%;
  }
}

@media screen and(max-width: 430px) {
  .flexRow {
    display: block !important;
  }
  .other_article {
    padding: 10px !important;
  }
  .charater {
    padding-left: 0 !important;
  }
  .photo {
    max-width: 100% !important;
    width: 100%;
  }

  .charater {
    margin-top: 10px;
    max-width: 100% !important;
    width: 100%;
  }
}

.other_article {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: white;
  border-top: 8px solid #f39900;
  padding: 20px;
  text-align: left;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom:18px;
  .other_article_wrap {
    padding: 0;
    margin: 0;
    max-width: 846px;
    .row {
      margin: 0;
    }
    .recent_hot_content {
      padding-bottom: 20px;
      border-bottom: 1px solid #f6f6f6;
      margin-top: 20px;
      cursor: pointer;
      a {
        color: black;
      }
      .photo {
        background-color: rgba(0, 0, 0, 0.1);
        max-width: 30%;
        width: 100%;
        height: 160px;
        overflow: hidden;
        position: relative;
        display: flex;
        vertical-align: top;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .charater {
        max-width: 69%;
        width: 100%;
        max-height: 160px;
        padding-left: 15px;
        position: relative;
        display: flex;
        flex-direction: column;
        .top {
          display: flex;
          flex-grow: 1;
          padding-bottom: 5px;
          :nth-child(1) {
            width: 100%;
            overflow: hidden;
          }
          :nth-child(1) > p {
            width: 100%;
            height: 100%;
            max-height: 50px;
            margin: 0;
            font-weight: 900;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
          }
        }
        .center {
          font-size: 14px;
          max-height: 80px;
          color: #666;
          display: flex;
          flex-grow: 1;
          p {
            max-height: 60px;
            height: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .bottom {
          .author {
            font-size: 12px;
            color: #999999;
            span:nth-child(1) {
              margin-top: 2px;
              display: inline-block;
              min-width: 42px;
              padding: 0 5px;
              overflow: hidden;
              word-break: keep-all;
              height: 26px;
              color: #f89c98;
              border: 1px solid #f89c98;
              font-size: 12px;
              text-align: center;
              line-height: 26px;
              border-radius: 3px;
              vertical-align: bottom;
            }
            span:nth-child(2) {
              max-width: 26px;
              max-height: 26px;
              display: inline-block;
              border-radius: 50%;
              vertical-align: middle;
              background-color: white;
              border: none;
              vertical-align: center;
              margin-left: 10px;
              img {
                max-width: 26px;
                max-height: 26px;
                display: inline-block;
                border-radius: 50%;
                vertical-align: middle;
                background-color: white;
                border: none;
              }
            }
            span:nth-child(3) {
              font-size: 12px;
              font-weight: 600;
              padding-left: 5px;
              padding-right: 10px;
              border-right: 1px solid #999999;
              vertical-align: center;
            }
            :nth-child(4) {
              margin: 0 5px 0 15px;
              vertical-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
