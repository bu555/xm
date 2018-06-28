<template>
  <div class="my-comment-a">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-edit"></i> 评论<span>(2)</span>
    </div>
    <div class="content">
      <div class="c-tabs">
        <!--<div style="padding-right:0">分类：</div>-->
        <div :class="typeActive==='article'?'active':''" @click="typeActive='article'">文档</div>
        <div :class="typeActive==='example'?'active':''" @click="typeActive='example'">名人</div>
      </div>
      <div class="aid-comment"  v-for="(v,i) in dataA" :key="i">
          <h5>{{v.title}}</h5>
            <div class="items" v-for="(v,i) in v.comment" :key="i">
              <!--<div class="my-type share">分享</div>-->
              <!--<div class="my-type ask">问答</div>-->
              <!--<div class="my-type good">精华</div>-->
              <router-link to="">
                    <span>{{v.content}}</span>
              </router-link>
              <div class="time">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
            </div>
      </div>
      <!--<p v-if="empty">暂无数据</p>-->
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
        dataA:[],
        dataE:[],
        myList:'',
        pageSize:2,
        pageA:1,
        pageE:1,
        currentData:[],
        eidCommentList:'',
        aidCommentList:'',
        type:'aid',
        empty:false,
        typeActive:'article'

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
        getMyCommentList(){
            this.$axios.getCommentList({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    console.log('myCommentList',res);
                    this.eidCommentList = res.data.data.eid?res.data.data.eid:''
                    this.aidCommentList = res.data.data.aid?res.data.data.aid:''
                    // 获取aidlist的评论
                    if(this.aidCommentList){
                        this.getMyComment()
                    }
                    // 获取eidlist的评论
                    if(this.aidCommentList){
                        // this.getMyComment()
                    }
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getMyComment(){
            if(this.type==='aid'){
                if(this.aidCommentList<1){
                   this.empty = true
                   return;
                }
                let aid = this.aidCommentList.slice( (this.pageA-1)*this.pageSize,this.pageSize+(this.pageA-1)*this.pageSize )
                if(aid.length<1) {
                  this.currentData = []  //觸發加載更多隱藏
                  return
                }
                this.$axios.getMyComment({aid:aid }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        let d = JSON.parse(JSON.stringify(res.data.data))
                        this.dataA = this.dataA.concat(d)   //  res.data.data
                        this.currentData = res.data.data
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }
        },
        loadMore(){
          if(this.type==='aid'){
              this.pageA = this.pageA+1
              this.getMyComment()
          }
        }
    },
    created(){
       this.getMyCommentList()
    }
}
</script>
<style lang="less">
.my-comment-a {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .c-tabs {
    display:flex;
    padding-bottom:8px;
    padding-left:12px;
    margin-bottom:10px;
    background-color: #f7f7f7;
    &>div {
      font-size:16px;
      padding:10px 7px 0px;
      color:#aaa;
      font-weight:700;
      margin-right:10px;
      cursor:pointer;
    }
    &>div.active {
      border-bottom:2px solid #70a9e5;
      color:#70a9e5;
    }

  }
  .aid-comment,.eid-comment {
    padding-bottom:8px;
    border-bottom:1px solid #eee;
     h5 {
       font-size:15px;
       line-height:22px;
       margin:0;
     }
  }
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
        padding:0 ;
        padding-left:15px;
        font-size:14px;
        overflow: hidden;
        color:#777;
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

