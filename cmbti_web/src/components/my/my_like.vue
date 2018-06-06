<template>
  <div class="my-like">
    <div class="content">
      <div class="items" v-for="(v,i) in 5">
        <div class="type">文档</div>
        <router-link to="">
              简单的Restful API例子(Golang)
        </router-link>
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
.my-like {
  padding:5px 12px 22px;
  .content {

  }
  .items {
    display:flex;
    align-items:center;
    border-bottom:1px solid #f8f8f8;
    .type {
      font-size:12px;
      height:17px;
      line-height: 17px;
      padding:0px 2px;
      border-radius:3px;
      margin-right:5px;
      border:1px solid #c1c1c1;
      color:#c1c1c1;
    }
    &>a {
      flex:1;
      padding:7px 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    a:visited {
        text-decoration: none;
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
  }
}
</style>

