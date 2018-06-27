<template>
  <div class="my-like">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="el-icon-star-off" style="font-size:17px;margin-left:-2px"></i>标记
    </div>
    <div class="content">
      <div class="items" v-for="(v,i) in 5">
        <div class="my-type">文档</div>
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
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .content {

  }
  .items {
    display:flex;
    align-items:center;
    border-bottom:1px solid #f8f8f8;
    .my-type {
      font-size:12px;
      padding:1px 2px;
      text-align:center;
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
      font-size:15px;
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
  
  @media screen and (max-width:525px) {
  }
}
</style>

