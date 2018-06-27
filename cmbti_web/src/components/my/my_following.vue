<template>
  <div class="my-follow">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-plus-square-o "></i> 被关注<span>(2)</span>
    </div>
    <div class="content">
      <div class="items" v-for="(v,i) in 5">
        <router-link to="">
            <div class="avatar">
              <img src="/static/img/logo_a.png" alt="">
            </div>
            <div class="name overflow-row-1">汤姆猫汤姆猫汤姆猫汤姆猫汤姆猫</div>
        </router-link>
        <el-button type="default"class="btn-remove" plain size="small" style="padding:7px 7px;font-size:13px">
          <i class="el-icon-remove icon-remove" style="font-size:14px;"></i> 移除TA</el-button>
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
.my-follow {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .content {

  }
  .items {
    display:flex;
    align-items:center;
    border-bottom:1px solid #f8f8f8;
    &>a {
      display:flex;
      align-items:center;
      flex:1;
      padding:5px 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &:visited {
        text-decoration: none;
      }
      &:link {
        text-decoration: none;
      }
      .avatar {
        flex:0 0 38px;
        width:38px;
        height: 38px;
        border-radius:3px;
        overflow:hidden;
        margin-right:8px;
        img {
          width:100%;
          height:auto;
        }
      }
      .name {
        font-size:15px;
      }
    }
    .btn-remove {

        .icon-remove {
          color:#777;
        }
        &:hover,&:active,&:focus {
          .icon-remove {
              color:#409eff;
          }
      }
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

