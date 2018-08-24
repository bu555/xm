<template>
  <div class="focus_news card">
    <router-link :to="{path:'/article/'+focus_news_data.RelationID}">
      <div class="focus_news_icon">
        <img src="/img/focusNews.png" alt="">
      </div>
      <div class="photo">
        <!--<div class="img-box">-->
        <img :src="focus_news_data.CoverImges?focus_news_data.CoverImges:'/img/OopsDaily.png'" alt="" class="imgs">
        <!--</div>-->

      </div>
      <div class="character">
        <span>{{focus_news_data.Title}}</span>
        <div>{{focus_news_data.Profile}}</div>
        <div class="author">
          <span>
            {{focus_news_data.ArticleTags?focus_news_data.ArticleTags[0]:[]}}
          </span>
          <span><img :src="focus_news_data.Avatar?focus_news_data.Avatar:'/img/timg.jpg'"></span>
          <span>{{focus_news_data.AuthorName}}</span>
          <i class="fa fa-clock-o"></i>
          <span>發表時間：</span>
          <!-- <span>{{$moment(focus_news_data.PublishTime).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
// 时区转换 / 文章類型轉換
// import filtration from "@/assets/filtration";
// import moment from 'moment'
export default {
  name: "focus-news",
  data() {
    return {
      default_photo: "/img/timg.jpg",
      default_backgrund_photo: "/img/OopsDaily.png",
      skip_url: "/article/",
      // $moment:moment
    };
  },
  props: ["focus_news_data"],
  // filters: {
  //   // 時區轉換
  //   timezone_filter: function(value) {
  //     return filtration.timezone_filter(value);
  //   }
  // },
  methods: {},
  created() {
    
  },
  mounted(){
    console.log('foc',this.focus_news_data)
  }

};
</script>

<style scoped lang="less">
@media screen and(max-width: 1200px) {
  .focus_news {
    max-width: 100%;
  }
}
.focus_news {
  width: 100%;
  min-height: 480px;
  background: white;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  a {
    color: black;
  }
  .focus_news_icon {
    position: absolute;
    top: 0;
    left: 0;
  }
  .photo {
    width: 100%;
    height: 338px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .character {
    padding: 20px 20px 40px;
    text-align: left;
    font-size: 13px;
    overflow: hidden;

    :nth-child(1) {
      font-weight: 900;
      font-size: 18px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-break:break-all;
    }
    > p {
      margin-top: 10px;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-break:break-all;
      overflow: hidden;
    }
    .author {
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
      span:nth-child(1) {
        display: inline-block;
        min-width: 48px;
        padding: 0 5px;
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
        margin-left: 10px;
        img{
          width: 100%;
          object-fit: cover;
        }
      }
      :nth-child(3) {
        font-size: 12px;
        font-weight: 600;
        padding-left: 5px;
        padding-right: 10px;
        border-right: 1px solid #999999;
      }
      :nth-child(4) {
        margin: 0 5px 0 15px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .photo {
      height: 74vw !important;
    }
  }
}
</style>
