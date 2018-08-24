<template>
  <div class="related_articles">
    <div class="hot_article_title">
      <span><i class="fa fa-file-text"></i></span>
      <span style="font-weight: 900"> 相關文章</span>
      <span class="hot_article_title_line"></span>
    </div>
    <div class="hot_article_content clearfix related_articles_content" v-for="(item,index) in related_article" :key="index">
      
    <div v-if="related_article.length == 0 || !related_article" style="text-align:center;margin: 10px 0 ;cursor:default;">
      <p >暫無相關文章...</p>
    </div>
      <router-link :to="{path:'/article/'+ item.RelationID}">
        <img :src="item.CoverImges?item.CoverImges:'/img/OopsDaily.png'">
        <p style="-webkit-box-orient: vertical" class="related_articles_p">{{item.Title}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // related_article:this.relatedArticleList
        related_article:this.relatedArticleList
      }
    },
    props:[ 'relatedArticleList' ],
    computed:{
    },
    watch: {
      'relatedArticleList':function(value){
          this.related_article = value
      }

    },
    mounted(){
      
    }
  }
</script>

<style scoped lang="less">
  @media screen and (min-width: 1200px) {
    .related_articles {
      max-width: 320px;
    }

    .hot_article_content {
      max-width: 320px;
    }
  }

  @media screen and (max-width: 1200px) {
    .related_articles{
      margin-top: 20px;
    }
    .hot_article_content {
      max-width: 48%;
      display: inline-block;
      margin-right: 2%;
    }
  }

  @media screen and (max-width: 768px) {
    .related_articles{
      margin-top: 20px;
    }
    .hot_article_content {
      max-width: 48%;
      display: inline-block;
      margin-right: 2%;
    }
    .related_articles_p{
      min-height: 40px;
    }
  }

  @media screen and (max-width: 414px) {
    .hot_article_content {
      max-width: 100%;
      display: inline-block;
      max-height: 270px;
      a{
        img{
          height: 170px !important;
        }
      }
      .related_articles_p{
        min-height: 0;
      }
    }
  }

  .related_articles {
    width: 100%;
    background-color: white;
    text-align: left;
    padding: 0 7px;
    border-top: 7px solid #f1463f;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    padding-bottom: 60px;
    .hot_article_title {
      width: 100%;
      padding: 14px 0;
      border-bottom: 3px solid #eeeeee;
      position: relative;
      :nth-child(1) {
        i {
          color: #f0473f;
          font-size: 20px;
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
      width: 100%;
      font-size: 14px;
      border-bottom: 3px dashed #f6f6f6;
      margin-top: 15px;
      cursor: pointer;
      vertical-align: top;
      a {
        display: inline-block;
        width: 100%;
        color: black;
        overflow: hidden;
      }
      img {
        height: 130px;
        width: 100%;
        object-fit: cover;
      }
      p {
        margin: 5px 0 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space: normal;
        -webkit-line-clamp: 2
      }
    }
  }
</style>
