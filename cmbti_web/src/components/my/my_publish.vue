<template>
  <div class="my-publish">
    <div class="content">
      <div class="items" v-for="(v,i) in 5">
        <div class="type share">分享</div>
        <!--<div class="type ask">问答</div>-->
        <div class="type good">精</div>
        <router-link to="">
              <!--简单的Restful API例子(Golang)-->
              <span>简单的Restful API例子(Golang)</span>
        </router-link>
        <div class="time">2018-06-06 11:11:00</div>
      </div>
    </div>
    <div class="load-more">
      加载更多...
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
      }
    },
    methods:{
      onSubmit(){

      }
    }
}
</script>
<style lang="less">
.my-publish {
  padding:5px 12px 22px;
    width:100%;
  .content {

  }
  .items {
      display:flex;
      align-items:center;
      border-bottom:1px solid #f8f8f8;
      width:100%;
      .type {
        font-size:12px;
        height:17px;
        line-height: 17px;
        padding:0px 2px;
        border-radius:3px;
        margin-right:5px;
        border:1px solid #c1c1c1;
        color:#c1c1c1;
        white-space: nowrap;
      }
      .type.share {
        // background-color: #feae4b;
      }
      .type.good {
        background-color: #feae4b;
        color:#fff;
        border:1px solid #feae4b;
      }
      &>a {
        flex:1;
        padding:7px 0;
        font-size:14px;
        overflow: hidden;
        span {
          width:100%;
          display:block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .time {
        color:#c5c5c5;
        font-size:13px;
      }
  }
  .load-more {
    max-width:365px;
    margin:0 auto;
    text-align:center;
    padding:10px 0;
    cursor:pointer;
    color:#598dd3;
    &:hover {
      color:#456ea5;
    }
  }
  
  @media screen and (max-width:500px) {
    padding:0px 0px 10px;
    .items {
        .time {
          flex:0 0 68px;
          overflow:hidden;
          white-space:nowrap;
          // margin:0 4px;
          // background-color: red;
        }
    }
  }
}
</style>

