<template>
  <div class="my-comment-a">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-edit"></i> 评论<span>(2)</span>
    </div>
    <div class="content" v-if="listOk">
      <div class="c-tabs">
        <!--<div style="padding-right:0">分类：</div>-->
        <div :class="typeActive==='aid'?'active':''" @click="typeActive='aid'">文档</div>
        <div :class="typeActive==='eid'?'active':''" @click="typeActive='eid'">名人</div>
      </div>
      <div v-if="typeActive==='aid'">
          <div class="aid-comment"  v-for="(v,i) in dataA" :key="i">
                <div class="h5 overflow-row-1">
                  <div class="h5-icon">文档</div><router-link :to="{path:'/forum/'+v.aid,query:{index:i},hash:'a-com'}"><span>{{v.title}}</span></router-link>
                </div>
                
                <p class="p-more" v-if="(v.comment instanceof Array) && v.comment.length>3" @click="showAll($event)">更多.......</p>
                <div class="items" v-for="(v,i) in v.comment" :key="i" :style="i==0?'border-top:1px solid #f8f8f8':''">
                  <!--<div class="my-type share">分享</div>-->
                  <!--<div class="my-type ask">问答</div>-->
                  <!--<div class="my-type good">精华</div>-->
                  <router-link to="">
                        <span> <i class="fa fa-commenting" style="color:#ddd"></i> {{v.content}}</span>
                  </router-link>
                  <div class="time">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                </div>
          </div>
      </div>
      <div v-if="typeActive==='eid'">
          <div class="eid-comment"   v-for="(v,i) in dataE" :key="i" :style="i==0?'border-top:1px solid #f8f8f8':''">
                <router-link to="">
                <div class="h5  overflow-row-1">
                  <div class="h5-icon">名人</div><router-link to=""><span>{{v.title}}</span></router-link>
                </div>
                </router-link>
                <p class="p-more" v-if="(v.comment instanceof Array) && v.comment.length>3" @click="showAll($event)">更多.......</p>
                <div class="items" v-for="(v,i) in v.comment" :key="i">
                  <!--<div class="my-type share">分享</div>-->
                  <!--<div class="my-type ask">问答</div>-->
                  <!--<div class="my-type good">精华</div>-->
                  <router-link to="">
                        <span><i class="fa fa-commenting" style="color:#ddd"></i> {{v.content}}</span>
                  </router-link>
                  <div class="time">{{$moment(v.c_time).format("YYYY-MM-DD HH:mm:ss")}}</div>
                </div>
          </div>
      </div>
      <p v-if="empty" style="color:#ccc;text-align:center;font-size:15px">暂无数据</p>
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
        pageSize:2,
        pageA:1,
        pageE:1,
        currentData:[],
        eidCommentList:'',  //存放评论列表
        aidCommentList:'',  //存放评论列表  
        empty:false,
        typeActive:'aid',
        listOk:false

      }
    },
    watch:{
        'typeActive':function(){
            this.dataA=[]
            this.dataE=[]
            this.pageA=1
            this.pageE=1
            this.currentData=[]
            this.empty=false
            this.getMyComment()
        }
    },
    methods:{
        showAll(e){
            e.target.parentNode.style.maxHeight="9999px"
            e.target.style.display = 'none'
        },
        getMyCommentList(){
            this.$axios.getCommentList({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.listOk = true
                    this.eidCommentList = res.data.data.eid?res.data.data.eid:''
                    this.aidCommentList = res.data.data.aid?res.data.data.aid:''
                    // 获取aidlist的评论
                    if(this.typeActive==='aid' && this.aidCommentList && (this.aidCommentList instanceof Array) && this.aidCommentList.length>0 ){
                        this.getMyComment()
                        this.empty = false
                        return
                    }
                    // 获取eidlist的评论
                    if(this.typeActive==='eid' && this.eidCommentList && (this.eidCommentList instanceof Array) && this.eidCommentList.length>0 ){
                        // this.getMyComment()
                        this.getMyComment()
                        this.empty = false
                        return
                    }
                    this.empty = true
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getMyComment(){
            if(this.typeActive==='aid'){
                if(this.aidCommentList<1){
                   this.empty = true
                   return;
                }
                let aid = this.aidCommentList.slice( (this.pageA-1)*this.pageSize,this.pageSize+(this.pageA-1)*this.pageSize )
                if(aid.length<1) {
                  this.currentData = []  //觸發加載更多隱藏
                  return
                }
                this.empty = false
                this.$axios.getMyCommentArt({aid:aid }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        let d = JSON.parse(JSON.stringify(res.data.data))
                        if(!d[0]){
                            this.currentData = []  //觸發加載更多隱藏
                            if(this.dataA.length<1){
                                this.empty = true
                            }
                        }else{
                            this.dataA = this.dataA.concat(d)   //  res.data.data
                            this.currentData = res.data.data
                            localStorage.setItem('dataA',JSON.stringify(this.dataA))
                        }
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }else if(this.typeActive==='eid'){
                if(this.eidCommentList<1){
                   this.empty = true
                   return;
                }
                let eid = this.eidCommentList.slice( (this.pageE-1)*this.pageSize,this.pageSize+(this.pageE-1)*this.pageSize )
                if(eid.length<1) {
                  this.currentData = []  //觸發加載更多隱藏
                  return
                }
                this.empty = false
                this.$axios.getMyCommentExa({eid:eid }).then(res=>{
                    this.loading = false
                    if(res.data.success){
                        let d = JSON.parse(JSON.stringify(res.data.data))
                        if(!d[0]){
                            this.currentData = []  //觸發加載更多隱藏
                            if(this.dataE.length<1){
                                this.empty = true
                            }
                        }else{
                            this.dataE = this.dataE.concat(d)   //  res.data.data
                            this.currentData = res.data.data
                            localStorage.setItem('dataE',JSON.stringify(this.dataE))
                        }
                    }
                }).catch(err=>{
                    this.loading = false
                })
            }
        },
        loadMore(){
          if(this.typeActive==='aid'){
              this.pageA = this.pageA+1
              this.getMyComment()
          }else if(this.typeActive==='eid'){
              this.pageE = this.pageE+1
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
    padding-left:12px;
    margin-bottom:4px;
    background-color: #f7f7f7;
    &>div {
      font-size:16px;
      padding:10px 7px 0px;
      color:#aaa;
      font-weight:700;
      margin-right:10px;
      cursor:pointer;
      &:hover {
        color:#70a9e5;
      }
    }
    &>div.active {
      border-bottom:2px solid #70a9e5;
      color:#70a9e5;
    }

  }
  .aid-comment,.eid-comment {
    padding-bottom:8px;
    border-bottom:1px solid #f0f0f0;
    max-height:136px;
    overflow: hidden;
    position: relative;
     .h5 {
       font-size:15px;
       line-height:25px;
       height:25px;
       padding-top:2px;
       margin:5px 0;
       font-weight:700;
       &>a:hover {
         color:#496ea3
       }
       .h5-icon {
          height:18px;
          line-height: 18px;
          font-weight:400;
          font-size:12px;
          padding:0 3px;
          text-align:center;
          border-radius:3px;
          display:inline-block;
          margin-right:5px;
          border:1px solid #ddd;
          color:#ddd;
          white-space: nowrap;
       }
     }
     .p-more {
       position: absolute;
       bottom:-8px;
       left:0;
       width:100%;
       font-size:14px;
       height: 25px;
       line-height: 25px;
       background-color: #fdfdfd;
       padding-left:5%;
       padding-top: 1px;
       color:#c5c5d0;
       cursor: pointer;
     }
  }
  .content {

  }
  .items {
      display:flex;
      align-items:center;
      border-bottom:1px solid #fafafa;
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
        height:24px;
        line-height:24px;
        padding-left:3%;
        font-size:14px;
        overflow: hidden;
        color:#555;
        span {
          width:100%;
          display:block;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        // &:hover {
        //   color:#496ea3
        // }
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

