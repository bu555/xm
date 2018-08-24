<template>
  <div class="recent_hot card" style="margin-top: 20px">
    <h5 style="font-weight: 900;font-size: 20px">
      <i class="fa fa-line-chart" style="color: #f39900;margin-right: 20px"></i>最近熱門</h5>
    <div class=" recent_hot_wrap">
      <div class="recent_hot_content clearfix recent_hot_advert" v-for="(item,index) in recent_hots" :key="index">
        <router-link :to="{path:'/article/'+item.RelationID}">
          <div class="row flexRow" style="display:flex;">
            <div class="photo">
              <img :src="item.CoverImges?item.CoverImges:'/img/OopsDaily.png'">
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
                    {{item.ArticleTags[0]}}
                  </span>
                  <span><img :src="item.Avatar?item.Avatar:'/img/timg.jpg'"></span>
                  <span>{{item.AuthorName}}</span>
                  <i class="fa fa-clock-o"></i>
                  <span style="vertical-align:center;">發表時間：</span>
                  <!--| timezone_filter-->
                  <!-- <span style="vertical-align:center;">{{$moment(item.PublishTime ).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="!recent_hots" style="text-align:center;margin: 10px 0 ;cursor:default;">
      <p>暫無熱門新聞...</p>
    </div>
  </div>
</template>

<script>
// 时区转换
// import filtration from "@/assets/filtration";
// 引入广告 插件
// import advertising from "@/assets/advertHandler";

// import moment from 'moment'
export default {
  name: "recent_hot_",
  data() {
    return {
      '/img/timg.jpg': "/img/timg.jpg", // 默认头像
      default_backgrund_photo: "/img/OopsDaily.png", //默认背景图
      // $moment:moment
    };
  },
  props: ["recent_hots"],
  watch: {
    recent_hots: {
      deep: true,
      // handler(newval, oldval) {
      //   let advertisings = document.querySelectorAll(
      //     ".recent_hot_wrap .advertising"
      //   );
      //   if (!this.recent_hots) {
      //     $(".hint_null").css("display", "block");
      //   }

      //   if (newval && oldval) {
      //     advertising.reloadAdvert(advertisings);
      //     setTimeout(() => {
      //       let recent_hot_content = advertising.createDiv(
      //         ".recent_hot_advert"
      //       );
      //       if (recent_hot_content.length > 0) {
      //         advertising.insertToIndex(recent_hot_content);
      //       }
      //     }, 30);
      //   } else if (newval) {
      //     if (advertisings.length == 0) {
      //       setTimeout(() => {
      //         let recent_hot_content = advertising.createDiv(
      //           ".recent_hot_advert"
      //         );
      //         if (recent_hot_content.length > 0) {
      //           advertising.insertToIndex(recent_hot_content);
      //         }
      //       }, 30);
      //     }
      //   }
      // }
    }
  },
  // filters: {
  //   timezone_filter: function(value) {
  //     return filtration.timezone_filter(value);
  //   }
  // },
  mounted() {
    // let advertisings = document.querySelectorAll(
    //   ".recent_hot_wrap .advertising"
    // );
    // let recent_hot_content = advertising.createDiv(".recent_hot_advert");
    // if (advertisings.length == 0) {
    //   setTimeout(() => {
    //     if (recent_hot_content.length > 0) {
    //       advertising.insertToIndex(recent_hot_content);
    //     }
    //   }, 30);
    // }
  },
  methods: {}
};
</script>

<style scoped lang="less">
@media screen and (min-width: 1200px) {
  .container {
    max-width: 848px;
    width: 100%;
  }
}

@media screen and(max-width: 768px) {
  .photo {
    width: 30% !important;
    vertical-align: top;
  }

  .charater {
    max-width: 69% !important;
  }
}

@media screen and(max-width: 430px) {
  .flexRow{
    display: block !important;
  }
  .recent_hot {
    padding: 10px 10px !important;
  }
  .charater {
    padding-left: 0 !important;
  }
  .recent_hot_content {
    .photo {
      width: 100% !important;
    }
    .charater {
      margin-top: 10px;
      max-width: 100% !important;
    }
  }
}

.recent_hot {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: white;
  border-top: 8px solid #f39900;
  padding: 10px 20px 20px;
  text-align: left;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  .recent_hot_wrap {
    padding: 0;
    margin: 0;
    max-width: 846px;
    .recent_hot_content:last-child {
      border-bottom: none;
    }
    .row {
      margin: 0;
    }
    h5 {
      font-size: 20px;
    }
    .recent_hot_content {
      padding-bottom: 20px;
      border-bottom: 1px solid #f6f6f6;
      margin-top: 20px;
      cursor: pointer;
      a {
        color: black;
        display: block;
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
        min-height: 160px;
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
            -webkit-line-clamp: 3;
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
              min-width: 46px;
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
              width: 26px;
              height: 26px;
              display: inline-block;
              border-radius: 50%;
              vertical-align: middle;
              background-color: white;
              border: none;
              vertical-align: center;
              overflow: hidden;
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
