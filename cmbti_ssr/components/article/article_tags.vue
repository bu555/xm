<template>
      <div  class="article-tags">
          <div class="article-tags-main">
              <FocusNews :focus_news_data="focusNews"></FocusNews>

              <RecentHot :recent_hots="hotNews"></RecentHot>


              <AllRead :allRead="readingNews"></AllRead>
          </div>
          <div class="article-tags-aside">
                <AsideHotArticle :hot_article="hotArticle"></AsideHotArticle>
                <AsideAddArticle :add_articles="addArticle"></AsideAddArticle>
          </div>
      </div>
      <!-- <div  class="article-tags">
          <div class="article-tags-main">
              <FocusNews :focus_news_data="$store.state.focusNews"></FocusNews>

              <RecentHot :recent_hots="$store.state.hotNews"></RecentHot>


              <AllRead :all_read="$store.state.readingNews"></AllRead>
          </div>
          <div class="article-tags-aside">
                <AsideHotArticle :hot_article="$store.state.hotArticle"></AsideHotArticle>
                <AsideAddArticle :add_articles="$store.state.addArticle"></AsideAddArticle>
          </div>
      </div> -->

</template>

<script>
import FocusNews from '../article/sub/tags_focus_news'
import RecentHot from '../article/sub/tags_recent_hot'
import AllRead from '../article/sub/tags_all_read'
import AsideHotArticle from '../article/sub/tags_aside_hot_article'
import AsideAddArticle from '../article/sub/tags_aside_add_article'
// import axios from '~/plugins/axios'
export default {
    data(){
        return {
            // hotNews:'', //最近熱門
            // readingNews:'', //大家都在讀
            // focusNews:'',
            // res:''
        }
    },
    components:{
        FocusNews,
        RecentHot,
        AllRead,
        AsideHotArticle,
        AsideAddArticle
    },
    props:{
        focusNews:'', // 焦点新闻
        hotNews:'', //最近热门
        readingNews:'', // 大家都在读
        hotArticle:'',  //热门文章
        addArticle:'', //新增文章
    },
    // head () {
    //     return {
    //     title: 'nuxt首页',
    //     meta: [
    //         { hid: 'description', name: 'description', content: 'My custom description' }
    //     ]
    //     }
    // },
    methods:{

    },
    mounted(){
        // this.$alert('这是一段内容', '标题名称', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${ action }`
        //     });
        //   }
        // });
    },
    created(){
    },
    
}
</script>

<style lang="less">
// 主视图区
.article-tags {
    position: relative;
    .article-tags-main {
        min-height:533px;
        width:100%;
        margin-bottom:15px;
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
    .article-tags-aside {
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
        .article-tags-main {
            background-color: #f1f1f1;
            min-height:533px;
            width:100%;
             padding-right:0px;
    
        }
        .article-tags-aside {
            width:100%;
            position: relative;
    
        }  
    }
}

</style>
