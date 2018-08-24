<template>
  <div class="all_read card" style="margin-top: 20px">
    <h5 style="font-weight: 900;font-size: 20px">
      <i class="fa fa-eye" style="color: #f39900;margin-right: 20px"></i>大家都在讀
    </h5>
    <div class="all_read_wrap" id="all-read-container" v-if="all_read && (all_read instanceof Array) && all_read.length>=1">
      <div class="recent_hot_content all_read_content clearfix " v-for="(item,index) in all_read" :key="index" :ref="'allReadItem'">
        <router-link :to="{path:'/article/'+item.RelationID}">
          <div class="row flexRow" style="display:flex;">
            <!--<router-link to="index/particulars">-->
            <div class="photo">
              <img :src="item.CoverImges?item.CoverImges:'/img/OopsDaily.png'" alt="">
            </div>
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
                  <span>
                    {{ item.ArticleTags instanceof Array? item.ArticleTags[0]:'' }}
                  </span>
                  <span><img :src="item.Avatar?item.Avatar:'/img/timg.jpg'" alt=""></span>
                  <span>{{item.AuthorName}} </span>&nbsp;
                  <i style="vertical-align:center;" class="fa fa-clock-o"></i>
                  <span style="vertical-align:center;"> 發表時間：</span>
                  <!-- <span style="vertical-align:center;">{{$moment(item.PublishTime ).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
                </div>
              </div>
            </div>
            <!--</router-link>-->
          </div>
        </router-link>
      </div>
    </div>
    <p v-else style="text-align:center; margin:20px 0 ;cursor:default;">暫無新聞...</p>
    <div id="load-more-icon" style="text-align:center;font-size:22px;padding-top:8px" v-if="moreLoading">
       <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from 'moment'
export default {
  data() {
    return {
        all_read:[],
        moreLoading:false,
        pageIndex:1,
        // $moment:moment
    };
  },
  components: {
    // loading //loading组件引入
  },
  props: ["allRead"],
  watch: {
      '$route.path':function(){
        this.pageIndex = 1
        this.all_read = []
      },
      'allRead':function(val){
        this.all_read = val
      }
  },
  methods: {
      async getData () {
          this.moreLoading = true
          this.pageIndex = this.pageIndex+1
          let res = await Promise.all([
            axios.article.all_read({ pageSize:20,pageIndex:this.pageIndex })
          ])
          setTimeout(()=>{
            // 等待渲染完成后取消冷却
            this.moreLoading = false
          },120)
          this.all_read = this.all_read.concat( res[0].data.Data.news );
      },
      scrollHandler(){
            let pageH = document.body.clientHeight
            let viewH = document.documentElement.clientHeight
            let scrollH = window.pageYOffset
            // console.log((pageH-scrollH));
            // console.log(this.$route.path);
            // 提前一屏请求数据
            if((pageH-scrollH-viewH)<(viewH*1) && !this.moreLoading &&(  /^\//.test(this.$route.path) ||  /^\/tag/.test(this.$route.path)  )){
                this.getData()
            }
      }
  },
  created() {
    this.all_read = this.allRead
  },
  mounted() {
        document.addEventListener('scroll',this.scrollHandler,false)
  },
  beforeDestroy(){
        console.log('beforeDestroy!!!');
        document.removeEventListener('scroll',this.scrollHandler,false)
  }
};
</script>

<style scoped lang="less">
@media screen and (min-width: 1200px) {
  .container {
    max-width: 848px;
  }
}

@media screen and(max-width: 768px) {
  .all_read_wrap .photo {
    width: 30%;
    vertical-align: top;
  }
  .charater {
    max-width: 69% !important;
    width: 100%;
  }
}

@media screen and(max-width: 430px) {
  .flexRow{
    display: block !important;
  }
  .all_read_wrap .photo {
    width: 100% !important;
  }
  .all_read {
    padding: 10px !important;
  }
  .charater {
    margin-top: 10px;
    max-width: 100% !important;
    padding-left: 0 !important;
  }
}

.all_read {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: white;
  border-top: 8px solid #f39900;
  padding: 10px 20px 20px;
  text-align: left;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .all_read_wrap {
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
        width: 30%;
        height: 160px;
        overflow: hidden;
        display: flex;
        position: relative;
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
        display: flex;
        flex-direction: column;
        position: relative;
        padding-left: 15px;
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
              min-width: 46px;
              padding: 5px;
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
              width: 26px;
              height: 26px;
              display: inline-block;
              border-radius: 50%;
              vertical-align: middle;
              background-color: white;
              overflow: hidden;
              border: none;
              vertical-align: center;
              margin-left: 10px;
              img {
                width: 100%;
                object-fit: cover;
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
            span:nth-child(4) {
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
