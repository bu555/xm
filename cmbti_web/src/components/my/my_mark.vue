<template>
  <div class="my-like" v-loading="loading">
    <div class="content">
      <div class="items" v-for="(v,i) in data" :key="i">
        <div class="my-type">文档</div>
        <router-link :to="'/forum/'+v._id">
              {{v.title}}
        </router-link>
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
        myList:'',
        size:4,
        page:1,
        currentData:[]
      }
    },
    methods:{
        getArticle(){
            this.loading = true
            this.$axios.getMyLikes({page:this.page,size:this.size}).then(res=>{
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
        this.getArticle()
        this.$store.state.myTabName = '收藏'
    }
}
</script>
<style lang="less">
.my-like {
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .content {

  }
  .items {
    display:flex;
    align-items:center;
    border-bottom:1px solid #f8f8f8;
    .my-type {
      font-size:12px;
      padding:1px 2px;
      text-align:center;
      border-radius:3px;
      margin-right:5px;
      border:1px solid #c1c1c1;
      color:#c1c1c1;
    }
    &>a {
      flex:1;
      padding:7px 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size:15px;
      &:hover {
        color:#496ea3
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

