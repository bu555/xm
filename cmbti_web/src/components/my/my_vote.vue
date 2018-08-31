<template>
  <div class="my-test">
    <div class="content">

        <div class="item" v-for="(v,i) in data" :key="i">
           <div class="photo">
              <router-link :to="'/example/'+v.eid">
                  <img :src="$pathImgs+v.img_url" alt="">
              </router-link>
           </div>
           <ul class="info">
              <li class="overflow-row-1">投票类型：{{v.result&&v.result.toUpperCase()}}</li>
              <li class="overflow-row-1">投票日期：{{$moment(v.c_time).format("YYYY-MM-DD HH:mm")}}</li>
              <li class="overflow-row-1">名字：{{v.name+v.name1}}</li>
              <li class="overflow-row-1">最高票类型：{{v.type.toUpperCase()}}</li>
              <!-- <li class="overflow-row-2">简介：{{v.info}}</li> -->
           </ul>
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
      getMyVote(){
            this.loading = true
            this.$axios.getMyVote({size:this.pageSize,page:this.page}).then(res=>{
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
          this.getMyVote()
      },
    },
    created(){
       this.getMyVote()
       this.$store.state.myTabName = '投票参与'
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
    .item {
        display:flex;
        margin:4px 5px;
        background-color: #fafafa;
        padding:7px;
        border-radius:3px;
        border:1px solid  #eaeaea;
        .photo {
          flex:0 0 68px;
        }
       .photo img {
         display:block;
         width:68px;
         height:82px;
         object-fit: cover;
         border-radius:1px;
       }
       ul.info {
         width:210px;
         height:82px;
         font-size:12px;
         padding-left:7px;
         li{

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
  
  @media screen and (max-width:768px) {
    .content {
      flex-wrap:wrap;
      .item  {
        width:100%;
        ul.info {
          width:100%;
        }
      }
    }
  }
}
</style>

