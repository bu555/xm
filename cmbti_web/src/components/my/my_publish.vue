<template>
  <div class="my-publish" v-loading="loading">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa el-icon-edit"></i> 发表帖子
    </div>
    <div class="content">
      <div class="items" v-for="(v,i) in data" :key="i">
        <div class="my-type share" v-if="v.category==='share'">分享</div>
        <div class="my-type ask"  v-if="v.category==='ask'">问答</div>
        <div class="my-type good" v-if="v.good">精华</div>
        <router-link :to="'/forum/'+v._id">
              <!--简单的Restful API例子(Golang)-->
              <span>{{v.title}}</span>
        </router-link>
        <div class="time">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
      </div>
    </div>
    <div class="load-more" @click="loadMore" v-if="currentData.length==pageSize">
      加载更多...
    </div>
  </div>
</template>
<script>
export default {
   data(){
      return {
        loading:false,
        data:[],
        myList:'',
        pageSize:4,
        page:1,
        currentData:[]
      }
    },
    methods:{
        getArticle(){
            if(this.myList.length<1) return
            let aid = this.myList.slice( (this.page-1)*this.pageSize,this.pageSize+(this.page-1)*this.pageSize )
            if(aid.length<1) {
              this.currentData = []  //觸發加載更多隱藏
              return
            }
            this.loading = true
            this.$axios.getArticleInfoAll({aid:aid}).then(res=>{
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
           this.getArticle()
        }
    },
    created(){
        this.myList = JSON.parse(localStorage.getItem('accountInfo')).my_article
        this.getArticle()
    }
}
</script>
<style lang="less">
.my-publish {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;

  .content {

  }
  .items {
      display:flex;
      align-items:center;
      border-bottom:1px solid #f8f8f8;
      width:100%;
      .my-type {
        font-size:12px;
        padding:1px 2px;
        text-align:center;
        border-radius:3px;
        margin-right:5px;
        border:1px solid #c1c1c1;
        color:#c1c1c1;
        white-space: nowrap;
      }
      .my-type.share {
        // background-color: #feae4b;
      }
      .my-type.good {
        background-color: #feae4b;
        color:#fff;
        border:1px solid #feae4b;
      }
      &>a {
        flex:1;
        padding:7px 0;
        font-size:15px;
        overflow: hidden;
        span {
          width:100%;
          display:block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        &:hover {
          color:#496ea3
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
  
  @media screen and (max-width:525px) {
    // padding:0px 0px 10px;
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

