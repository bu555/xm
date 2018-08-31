<template>
  <div class="my-follow" v-loading="loading">
    <div class="content">
      <div class="items" v-for="(v,i) in data" :key="i">
        <router-link :to="'/info/'+v._id">
            <!-- <div class="avatar">
              <img :src="v.avatar?$pathAvatar+v.avatar:'/static/img/logo_a.png'" alt="">
            </div> -->
            <Avatar :src="v.avatar" :uid="''" size="small" round="true"></Avatar>&nbsp;
            <div class="u-name overflow-row-1">
              <span class="r-name">{{v.r_name}}</span> <br/>
              <span class="profile overflow-row-2">profile profile profile profifile profifile profifile profile profile profile</span>
            </div>
        </router-link>
        <!-- 关注按钮 -->
        <followBtn :isFollow="true" :uuid="v._id"></followBtn>
      </div>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==size">
      或许还有更多...
    </div>
    <!--<i class="el-icon-remove icon-remove" style="font-size:14px;"></i> 移除TA</el-button>-->
  </div>
</template>
<script>
import followBtn from '@/components/common/follow_btn'
export default {
    data(){
      return {
        loading:false,
        data:[],
        size:4,
        page:1,
        currentData:[]
      }
    },
    components:{
      followBtn
    },
    methods:{
        getUserList(){
            this.loading = true
            this.$axios.getMyFollowers({page:this.page,size:this.size}).then(res=>{
                this.loading = false
                if(res.data.success){
                    let d = JSON.parse(JSON.stringify(res.data.data))
                    this.data = this.data.concat(d)   //  res.data.data
                    this.currentData = res.data.data
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        loadMore(){
           this.page = this.page+1
           this.getUserList()
        },
    },
    created(){
        this.getUserList()
        this.$store.state.myTabName = '我关注'
        
    }
}
</script>
<style lang="less">
.my-follow {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  min-height:250px;
  .content {

  }
  .items {
    display:flex;
    align-items:flex-start;
    border-bottom:1px solid #f8f8f8;
    padding:2px 0 5px;
    min-height:70px;
    &>a {
      display:flex;
      align-items:flex-start;
      flex:1;
      padding:5px 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-right:3px;
      .u-name {
        font-size:15px;
        // position: relative;
        .profile {
          font-size:13px;
          color:#999;
        }
      }
    }
    a:visited {
        text-decoration: none;
    }
      &>span {
          font-size:14px;
          text-align:center;
          display:inline-block;
          width:78px;
          height:30px;
          line-height:30px;
          border-radius:3px;
          cursor: pointer;
          background-color: #eee;
      }
      &>span.c1 {
          background-color: #409eff;
          color:#fff;
      }
      &>span.c2 {
          background-color: #acacac;
          color:#fff;
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

