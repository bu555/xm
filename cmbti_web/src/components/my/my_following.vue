<template>
  <div class="my-following" v-loading="loading">
    <div class="content">
      <div class="items" v-for="(v,i) in data" :key="i">
        <!-- <router-link :to="'/info/'+v._id">
            <div class="avatar">
              <img :src="v.avatar?$pathAvatar+v.avatar:'/static/img/logo_a.png'" alt="">
            </div>
            <div class="name overflow-row-1">{{v.r_name}}</div>
        </router-link> -->
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
        <!--<el-button type="default" plain size="small"  style="padding:7px 7px;font-size:13px" @click="followUser('0',i,v._id)"><i class="el-icon-remove icon-remove" style="font-size:14px;"></i> 移除TA</el-button>
        <el-button type="default" plain size="small"  style="padding:7px 7px;font-size:13px"></i> 移除TA</el-button>-->
      </div>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==size">
      或许还有更多...
    </div>
    
  </div>
</template>
<script>
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
    methods:{
        getUserList(){
            this.loading = true
            this.$axios.getMyFollowing({page:this.page,size:this.size}).then(res=>{
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
        this.$store.state.myTabName = '关注我'
    }
}
</script>
<style lang="less">
.my-following {
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

