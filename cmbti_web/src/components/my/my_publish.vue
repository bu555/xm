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
          <div class="i-ctrl">
              <!--编辑-->
              <i class="el-icon-edit-outline edit" @click="articleHandle('edit',v._id)"><em>编辑</em></i>
              <!--删除-->
              <i class="el-icon-delete del"  style="margin-left:5%" @click="articleHandle('del',v._id)"><em>删除</em></i>
          </div>
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
        getArticle(){
            this.loading = true
            this.$axios.getMyArticle({size:this.size,page:this.page}).then(res=>{
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
        },
        articleHandle(type,aid){
            if(type==='edit'){
                this.$router.push({
                  path:'/forum/article/edit/'+aid
                })
            }else if(type==='del'){
                this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.loading = true
                    this.$axios.deleteArticle({aid:aid}).then(res=>{
                        this.loading = false
                        if(res.data.success){
                              this.$message({
                                type: 'success',
                                message: '删除成功!'
                              });
                        }
                        for(var i=0;i<this.data.length;i++){
                           if(this.data[i]._id===aid){
                              this.data.splice(i,1)
                           }
                        }
                    }).catch(err=>{
                        this.loading = false
                    })
                }).catch(() => {  });
            }
        }
    },
    created(){
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
      padding-bottom:25px;
      position: relative;
      padding-top:3px;
      padding-right:55px;
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
        padding:0px 0;
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
        position: absolute;
        left:35px;
        bottom:5px;
      }
      .i-ctrl {
        position: absolute;
        right:0px;
        top:2px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        width:58px;
        i {
          color:#aaa;
          cursor: pointer;
          width:22px;
          height:22px;
          line-height: 22px;
          text-align:center;
          font-size:20px;
          position: relative;
          &:hover {
            font-size:22px;
            em {
              display:block;
            }
          }
          em {
            display:none;
            position: absolute;
            top:22px;
            left:-3px;
            font-size:12px;
            width:32px;
          }
        }
        i.edit {
          &:hover {
            color:#4d9efc;
          }
        }
        i.del {
          &:hover {
            color:#f16a6e;
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
    // padding:0px 0px 10px;
    .items {
        .time {
          // flex:0 0 68px;
          // overflow:hidden;
          // white-space:nowrap;
          // margin:0 4px;
          // background-color: red;
        }
    }
  }
}
</style>

