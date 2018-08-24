<template>
  <div class="details_content">
    <h3 style="margin:0;margin-bottom: 20px">{{details.Title}}</h3>
    <div class="author">
      <span><img :src="details.Avatar?details.Avatar:'/img/timg.jpg'"></span>
      <span>{{details.AuthorName}}</span>
      <i class="fa fa-clock-o"></i>
      <span>發表時間：</span>
      <!-- <span>{{details.PublishTime | timezone_filter}}</span> -->
      <!-- <span>{{$moment(details.PublishTime).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
      
      <i class="fa fa-eye"></i>
      <span>閲讀量:</span>
      <span>{{details.ClickRate}}</span>
    </div>
    <div class="line"></div>
    <div class="share">
      <span style="color: rgb(106, 106, 106)">分享至:</span>
      <div style="display: inline-block">
        <div id="face_share" style="display:inline-block;vertical-align:middle;"></div>
        <div id="google_share" style="display:inline-block;vertical-align:middle;"></div>
        <div id="twitter_share" style="display:inline-block;vertical-align:middle;"></div>
        <div class="dropdown" style="display:inline-block">
          <!-- <more_share /> -->
        </div>
      </div>
    </div>
    <div class="article_conten">
      <label v-html="details.Content" style="width: 100% ;font-size:16px;line-height:25px;">

      </label>
    </div>
    <div style="margin:20px 0;" class="clearfix">
      <div style="display:inline-block;vertical-align:middle;color:rgb(106, 106, 106);width:45.88px;margin-top:10px;">
        標籤:
      </div>
      <div style="display:inline-block;vertical-align:middle;max-width:720px;">
        <ul class="tag clearfix">
          <!-- <li><router-link :to="{path:'/category/'+focus_news_data.RelationID}">123</router-link></li> -->

          <li v-for="(item,index) in details.ArticleTags" :key="index" style="margin-top:8px;">
            <router-link :to="{path:'/tag/'+item}">{{item}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="share">
      <span style="color: rgb(106, 106, 106)">分享至:</span>
      <div style="display: inline-block;margin-bottom: 20px">

        <div id="face_share2" style="display:inline-block;vertical-align:middle;"></div>
        <div id="google_share2" style="display:inline-block;vertical-align:middle;"></div>
        <div id="twitter_share2" style="display:inline-block;vertical-align:middle;"></div>
        <div class="dropdown" style="display:inline-block">
          <!-- <more_share2 /> -->
        </div>
      </div>
    </div>

    <div class="line"></div>
    <div ref="fbcomment">

    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: "details_content",
  data() {
    return {
        details: this.detailsContentList,
        // $moment:moment
    };
  },
  props:['detailsContentList'],
  computed:{
  },
  methods: {
  },
  watch: {
    "detailsContentList": function(value) {
       this.details = value
    }
  },
  mounted() {
    
  },
  updated() {;
  },
  destroyed() {
  }
};
</script>

<style scoped lang="less">
@media screen and(max-width: 430px) {
  .details_content {
    padding: 20px 10px !important;
    .share {
      .twitter,
      .google,
      .facebook {
        max-width: 80px !important;
      }
    }
  }
}
.details_content {
  width: 100%;
  padding: 40px 28px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: left;
  .tag {
    margin-bottom: 0;
    li {
      float: left;
      border: 1px solid rgb(222, 222, 222);
      border-radius: 3px;
      margin-right: 10px;
      text-align: center;
      a {
        display: inline-block;
        min-width: 46px;
        width: 100%;
        height: 26px;
        line-height: 26px;
        padding: 0 5px;
        color: rgb(154, 154, 154);
      }
      a:hover {
        color: #f89c98;
      }
      .router-link-active {
        color: #f89c98;
      }
    }
    li:hover {
      border-color: #f89c98;
    }
  }
  a {
    text-decoration: none;
  }
  .author {
    font-size: 14px;
    color: #999999;
    text-align: left;
    :nth-child(1) {
      width: 30px;
      height: 30px;
      display: inline-block;
      border: 1px solid gray;
      border-radius: 50%;
      vertical-align: middle;
      background-color: white;
      /*border: none;*/
    }
    :nth-child(2) {
      font-size: 12px;
      font-weight: 600;
      padding-left: 5px;
      padding-right: 10px;
      color: #4ba3f8;
    }
    :nth-child(3) {
      margin: 0 5px 0 15px;
    }
    :nth-child(6) {
      margin: 0 5px 0 15px;
    }
  }
  .line {
    border-bottom: 1px solid #eeeeee;
    margin: 12px 0 18px 0;
  }
  .share {
    text-align: left;
    button {
      margin-left: 10px;
      padding: 10px;
      a {
        color: white;
        text-decoration: none;
      }
    }
    i {
      font-size: 20px;
    }
  }
  .article_conten {
    margin: 28px 0 30px;
    width: 100%;
    label {
      font-weight: normal;
    }
  }
}
#fb-iframe {
  border: none;
}
</style>
<style>
.article_conten img {
  max-width: 100%;
}
</style>

