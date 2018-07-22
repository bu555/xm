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
            <!--<div class="age">年龄</div>-->
            <div class=""></div>
        </div>
        <div class="items i2" v-for="(v,i) in data" :key="i">
            <div class="overflow-row-1">{{v.category}}</div>
            <div class="overflow-row-1">{{v.type&&v.type.toUpperCase()}}</div>
            <div class="">
              <span class="date-pc">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</span>
              <span class="date-mob">{{$moment(v.c_time).format("YYYY-MM-DD")}}</span>
              
            </div>
            <!--<div class="age">22</div>-->
            <div class="show-link">
              <router-link to="">
                查看详情
              </router-link>
            </div>
        </div>
        <p v-if="data&&data.length===0" style="color:#ccc;text-align:center;font-size:15px">暂无数据</p>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==pageSize">
      或许还有更多...
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
        data:[],
        loading:false,
        currentData:'',
        pageSize:3,
        page:1,
      }
    },
    methods:{
      getMyTest(){
            this.loading = true
            this.$axios.getMyTest({size:this.pageSize,page:this.page}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.data = this.data.concat(res.data.data) 
                    this.currentData = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
      },
      loadMore(){
          this.page = this.page+1
          this.getMyTest()
      },
    },
    created(){
       this.getMyTest()
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
  .items.i1,.items.i2 {
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
  }
    .date-pc {
        display:block;
    }
    .date-mob {
        display:none;
    }
  .items.i2 {
      &:hover {
        background-color: #fafafa;
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
  
  @media screen and (max-width:768px) {
    .items.i1,.items.i2  {
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
          font-size:13px;
           display:none;
        }
        .date-mob {
           font-size:13px;
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

