<template>
  <div class="my-test">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-file-text-o" style="margin:0 2px 0 1px"></i> 测试
    </div>
    <div class="content">
        <div class="items i1">
            <div class="">测试项目</div>
            <div class="">测试结果</div>
            <div class="">测试日期</div>
            <div class="age">年龄</div>
            <div class=""></div>
        </div>
        <div class="items" v-for="(v,i) in 5">
            <div class="overflow-row-1">功能测试</div>
            <div class="overflow-row-1">INTJ</div>
            <div class="">
              <span class="date-pc">2018-09-10 22:00</span>
              <span class="date-mob">2018-09-10</span>
              
            </div>
            <div class="age">22</div>
            <div class="show-link">
              <router-link to="">
                查看详情
              </router-link>
            </div>
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
.my-test {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;

  .content {
    font-size:15px;
    .age {
      padding-left:22px;
    }
    &>div>div {
      display:block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap; 
    }
    .show-link {
      text-align:right;
      padding-right:20px;
    }
  }
  .items {
      display:flex;
      align-items:center;
      border-bottom:1px solid #f8f8f8;
      width:100%;
      color:#444;
      text-align:left;
      &>div {
        flex:0 0 20%;
        padding:5px 2px;
        a {
          padding:3px 0;
          color:#598dd5;
          &:hover {
            color:#456ea5;
          }
        }
        // &:last-child,&:nth-of-type(4) {
        //   margin-right:2%;
        //   flex:0 0 70px;
        // }
      }
      &:hover {
        background-color: #fafafa;
      }
      .date-pc {
          display:block;
      }
      .date-mob {
          display:none;
      }
  }
  .items.i1 {
    &>div {
      font-weight:700;
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
    .items {
      &>div {
        flex:0 0 25%;
      }
    }
    .content {
      font-size:14px;
        .age{
          display:none;
        }
        .date-pc {
           display:none;
        }
        .date-mob {
           display:block;
        }
        .show-link {
          padding-right:0;
          flex:0 0 65px;
        }
    }
  }
}
</style>

