<template>
  <div class="aside_hot_article card" >
    <div class="hot_article_title">
      <span ><img src="/img/hot.png"></span>
      <span style="font-weight: 900;position:relative;top:1px"> 熱門文章</span>
      <span class="hot_article_title_line"></span>
    </div>
    <div v-if="(hot_article && (hot_article instanceof Array) && hot_article.length>=1  )">
        <div class="hot_article_content aside_hot" v-for="(item,index) in hot_article" :key="index" style="text-align:left">
            <router-link :to="{path:'/article/'+item.RelationID}">
            <img :src="item.CoverImges?item.CoverImges:'/img/OopsDaily.png'">
            <p style=" -webkit-box-orient: vertical">{{item.Title}}</p>
            </router-link>
        </div>
    </div>
    <div v-else style="text-align:center;margin: 10px 0 ;cursor:default;">
        <p >暫無熱門文章...</p>
    </div>
  </div>
</template>

<script>
  // 引入广告 插件
  // import advertising from '@/assets/advertHandler'
  export default {
    name: "aside_hot_article",
    data() {
      return {
        default_backgrund_photo:"/img/OopsDaily.png" //默认背景图
      }
    },
    props:["hot_article"],
    watch:{
      "hot_article" :{
        deep :true ,
        // handler(newval,oldval){
        //   let advertisings = document.querySelectorAll(".aside_hot .advertising")
        //   if(newval && oldval){
        //     advertising.reloadAdvert(advertisings)
        //     setTimeout(()=>{
        //       let aside_hot = advertising.createDiv(".aside_hot")
        //       if(aside_hot.length>0){
        //         advertising.insertToAside(aside_hot)
        //       }
        //     },30)
        //   }else if(advertisings.length==0){
        //     setTimeout(()=>{
        //       let aside_hot = advertising.createDiv(".aside_hot")
        //       if(aside_hot.length>0){
        //         advertising.insertToAside(aside_hot)
        //       }
        //     },30)
        //   }
        // }
      }
    },
    mounted(){
      // let aside_hot = advertising.createDiv(".aside_hot")
      // let advertisings = document.querySelectorAll(".aside_hot .advertising")
      // if(advertisings.length==0){
      //   setTimeout(()=>{
      //     if(aside_hot.length>0){
      //       advertising.insertToAside(aside_hot)
      //     }
      //   },30)
      // }
    }
  }
</script>

<style scoped lang="less">
  @media screen and (max-width: 430px){
    .aside_hot_article {
      margin-top: 0px;
      background-color: transparent !important;
      box-shadow: none !important;
      .hot_article_content {
        width: 100% !important;
        display: inline-block;
        box-shadow: 0 0 10px rgba(0,0,0,.2);
        img {
          height: 130px;
        }
        p{
          min-height: 0 !important;
        }
      }
    }
  }
  @media screen and (max-width:768px ) {
    .aside_hot_article {
      margin-top: 0px;
      background-color: transparent !important;
      box-shadow: none !important;
      .hot_article_content {
        width: 48%;
        display: inline-block;
        margin-right: 2%;
        box-shadow: 0 0 10px rgba(0,0,0,.2);
        img {
          height: 130px;
        }
        p{
          min-height: 44px;
        }
      }
    }
  }
  @media screen and (max-width:1200px ) {
    .aside_hot_article {
      .hot_article_content {
        width: 48%;
        display: inline-block;
        margin-right: 2%;
        max-height: 270px !important;
        border: 1px solid #e5e5e5 !important;
        a {
          img {
            height: 172px !important;
          }
          p {
            padding: 0 10px;
            font-size: 16px;
            color: #333333;
          }
        }
      }
    }
  }
  .aside_hot_article {
    width: 100%;
    background-color: white;
    text-align: left;
    padding: 0 7px;
    border-top: 7px solid #f1463f;
    padding-bottom: 60px;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    margin-top: 0px;
    .hot_article_title {
      padding: 14px 0;
      border-bottom: 3px solid #eeeeee;
      position: relative;
      :nth-child(1) {
        width: 16px;
        height: 18px;
        display: inline-block;
        img {
          width: 100%;
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
      border-bottom: 3px dashed #f6f6f6;
      margin-top: 15px;
      cursor: pointer;
      text-align: center;
      vertical-align: top;
      a{
        color: black;
        display: inline-block;
        width: 100%;
        height: 100%;;

      }
      img {
        width: 100%;
        height: 130px;
        object-fit: cover;
      }
      p {
        color: #333333;
        margin: 5px 0 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        white-space: normal;
        word-break:break-all;

        
      }
    }

  }
</style>
