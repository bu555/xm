<template>
      <div  class="article-details">
          <div class="article-details-main">
              <!-- 详情 -->
              <detailsContentComp :detailsContentList="detailsContentList"></detailsContentComp>
              <!-- 其他文章 -->
              <otherArticleComp :otherArticleList="otherArticleList"></otherArticleComp>
          </div>
          <div class="article-details-aside">
              <!-- 同区文章 -->
              <relatedArticleComp :relatedArticleList="relatedArticleList"></relatedArticleComp>
          </div>
      </div>

</template>

<script>
import detailsContentComp from '../article/sub/details_content'
import relatedArticleComp from '../article/sub/details_related_articles'
import otherArticleComp from '../article/sub/details_other_article'
// import axios from '~/plugins/axios'
export default {
    data(){
        return {
            detailsContentList:this.detailsArticle,
            relatedArticleList:this.relatedArticle,
            otherArticleList:this.otherArticle,
        }
    },
    props:['detailsArticle','relatedArticle','otherArticle'],
    components:{
        detailsContentComp,
        relatedArticleComp,
        otherArticleComp
    },
    watch:{
        'detailsArticle':function(value){
            this.detailsContentList = value
        },
        'relatedArticle':function(value){
            this.relatedArticleList = value
        },
        'otherArticle':function(value){
            this.otherArticleList = value
        },
    },
    methods:{

    },
    mounted(){
  
    },
    created(){
    },
    
}
</script>

<style lang="less">
// 主视图区
.article-details {
    position: relative;
    padding-bottom:20px;
    .article-details-main {
        min-height:533px;
        width:100%;
        padding-right:335px;
        .focus-news {
            .focus-img {
                display:block;
                height:320px;
                width:100%;
                object-fit: cover;
            }
        }
        &>div {
            margin-bottom:15px;
            background-color: #fff;
            min-height:150px;
            box-shadow:0 0 12px #ccc;
            // padding:0 1.5em 1.5em;
            overflow: hidden;
        }
        &>div.orange-line {
            border-top:8px solid #ef9822;
            border-radius:4px;
            overflow: hidden;
        }
        .title {
            height:50px;
            line-height: 50px;
            font-weight:600;
            font-size:20px;
        }
        .items {
            min-height:132px;
            margin-bottom:12px;
            border-bottom: 1px solid #f7f7f7;
            padding-left:250px;
            position: relative;
            .hot-img {
                position: absolute;
                left:0px;
                top:0px;
                width:220px;
                height:120px;
                overflow: hidden;
                img {
                    width:100%;
                    height:100%;
                    object-fit: cover;
                }
            }
        }
    
    }
    // 右侧栏
    .article-details-aside {
        min-height:333px;
        width:320px;
        position: absolute;
        top:0px;
        right:0px;
        &>div {
            margin-bottom:15px;
            background-color: #fff;
            min-height:200px;
            box-shadow:0 0 12px #ccc;
            // padding:0 1.5em 1.5em;
            overflow: hidden;
        }
        &>div.orange-line {
            border-top:7px solid #ed4244;
            border-radius:3px;
            overflow: hidden;
        }
        .title {
            height:40px;
            line-height: 40px;
            font-weight:600;
            font-size:16px;
        }
        .items {
            min-height:100px;
            margin-bottom:12px;
            border-bottom: 1px solid #f7f7f7;
        }
    }
    // 移动适配
    @media screen and (max-width:768px) {
        .article-details-main {
            background-color: #f1f1f1;
            min-height:533px;
            width:100%;
             padding-right:0px;
    
        }
        .article-details-aside {
            width:100%;
            position: relative;
    
        }  
    }
}

</style>
