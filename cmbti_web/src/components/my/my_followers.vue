<template>
  <div class="my-follow" v-loading="loading">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 关注 <span>(2)</span>
    </div>
    <div class="content">
      <div class="items" v-for="(v,i) in data" :key="i">
        <router-link :to="'/info/'+v._id">
            <div class="avatar">
              <img :src="v.avatar?$pathAvatar+v.avatar:'/static/img/logo_a.png'" alt="">
            </div>
            <div class="name overflow-row-1">{{v.r_name}}</div>
        </router-link>
        <el-button type="primary" size="small" v-if="v.notFollow" @click="followUser('1',i,v._id)"><i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 关注Ta</el-button>
        <el-button type="default" plain size="small" v-else style="padding:7px 7px;font-size:13px" @click="followUser('0',i,v._id)"><i class="el-icon-remove-outline" style="font-size:15px"></i> 取消关注</el-button>
          <!--<i class="el-icon-minus" style="font-weight:700"></i> 取消关注</el-button>-->
        <!--<el-button type="primary" plain round size="small"><i class="el-icon-edit"></i> 创建</el-button>-->
      </div>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==size">
      或许还有更多...
    </div>
    <!--<i class="el-icon-remove icon-remove" style="font-size:14px;"></i> 移除TA</el-button>-->
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
        // 取消、关注用户
        followUser(status,index,uuid){
            this.loading = true
            this.$axios.followUser({
                uuid:uuid,  //关注的用户id
                status:status   // 1关注，0取消关注
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    if(res.data.data==1){
                        this.data[index].notFollow = false
                    }else if(res.data.data==0){
                        this.data[index].notFollow = true
                    }
                }
            }).catch(err=>{
                this.loading = false
            })
        },
    },
    created(){
        this.getUserList()
        
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

