<template>
  <div class="aside_add_article card" style="margin-top: 20px">
    <div class="hot_article_title">
      <span><img src="/img/hot.png"></span>
      <span style="font-weight: 900;position:relative;top:1px"> 新增文章</span>
      <span class="hot_article_title_line"></span>
    </div>
    <div class="hot_article_content">
      <div v-if="(add_articles && (add_articles instanceof Array) && add_articles.length>=1  )">
          <!-- <div class="first" v-if="add_articles && (add_articles instanceof Array)"> -->
          <div class="first">
            <router-link :to="{path:'/article/'+ add_articles[0].RelationID}">
              <img :src="add_articles[0].CoverImges?add_articles[0].CoverImges:default_backgrund_photo">
              <p class="Profile" style="padding-left: 15px">{{add_articles[0].Title}}</p>
            </router-link>
          </div>
          <!-- <div class="other"  v-for="(item,index) in  (add_articles && (add_articles instanceof Array) && add_articles.length>=1  ) ? add_articles.slice(1) : []" :key="index"> -->
          <div class="other"  v-for="(item,index) in  add_articles.slice(1)" :key="index">
            <router-link :to="{path:'/article/' + item.RelationID}">
              <p>
                <span>·</span>{{item.Title}}</p>
            </router-link>
          </div>
      </div>
      <div v-else style="text-align:center;margin: 10px 0 ;cursor:default;">
        <p>暫無新增文章...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aside_add_article",
  data() {
    return {
      //新增文章 1
      // hot_article_first: [],
      // 新增文章 2-20
      // hot_article: [],
      default_backgrund_photo: "/img/OopsDaily.png" //默认背景图
    };
  },
  props: ["add_articles"],
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
@media screen and (max-width: 1200px) {
  .aside_add_article {
    .hot_article_content {
      .first {
        a {
          height: 250px;
          overflow: hidden;
          img {
            height: 250px;
          }

          .Profile {
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }
  }
}

.aside_add_article {
  width: 100%;
  background-color: white;
  text-align: left;
  padding: 0 7px;
  border-top: 7px solid #f1463f;
  padding-bottom: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  .hot_article_title {
    padding: 14px 0;
    border-bottom: 3px solid #eeeeee;
    position: relative;
    :nth-child(1) {
      width: 16px;
      height: 18px;
      img {
        vertical-align: middle;
      }
    }
    .hot_article_title_line {
      max-width: 84px;
      width: 100%;
      border-bottom: 3px solid #f24740;
      position: absolute;
      bottom: 0;
      transform: translateY(100%);
      left: 0;
    }
  }
  .hot_article_content {
    font-size: 14px;
    cursor: pointer;
    margin-top: 15px;

    p {
      margin: 5px 0 10px 0;
      color: #333;
    }
    .first {
      position: relative;
      margin-bottom:10px;
      a {
        display: inline-block;
        width: 100%;
        height: 142px;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .Profile {
        width: 100%;
        padding: 6px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        bottom: 4px;
        left: 0;
        color: white;
        font-size: 14px;
        background-color: rgba(0, 0, 0, 0.5);
        margin-top: 0;
        margin-bottom: 0;
      }
      &:hover {
         .Profile { 
           background-color: rgba(0, 0, 0, 0.6);
         }
      }
    }
    .other {
      cursor: pointer;
      p {
        width: 100%;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        word-break:break-all;
        text-overflow: ellipsis;
        border-bottom: 3px dashed #f6f6f6;
        padding: 5px 0;
        margin: 0;
        &:hover {
          color:#25539e;
          // border-bottom: 3px dashed #ddd;
        }
        span {
          font-size: 20px;
          vertical-align: middle;
          font-weight: 600;
          color: rgb(202, 202, 202);
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
