<template>
  <div class="my-test">
    <div class="content">
        <!-- <div class="items i1">
            <div class="">名字</div>
            <div class="">投票结果</div>
            <div class=""></div>
        </div>
        <div class="items i2" v-for="(v,i) in data" :key="i">
            <router-link :to="'/example/'+v.eid">
                <div class="overflow-row-1">{{v.name+v.name1}}</div>
                <div class="overflow-row-1">{{v.type&&v.type.toUpperCase()}}</div>
            </router-link>
        </div> -->

        <div class="item" v-for="(v,i) in data" :key="i">
           <div class="photo">
              <router-link :to="'/example/'+v.eid">
                  <img :src="$pathImgs+v.img_url" alt="">
              </router-link>
           </div>
           <ul class="info">
              <li class="overflow-row-1">名字：{{v.name+v.name1}}</li>
              <li class="overflow-row-1">类型：{{v.type&&v.type.toUpperCase()}}</li>
              <li class="overflow-row-1">人气：{{v.total}}</li>
              <li class="overflow-row-2">简介：{{v.info}}</li>
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
      getMyMarkExample(){
            this.loading = true
            this.$axios.getMyMarkExample({size:this.pageSize,page:this.page}).then(res=>{
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
          this.getMyMarkExample()
      },
    },
    created(){
       this.getMyMarkExample()
       this.$store.state.myTabName = '人物关注'
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
    display:flex;
    // .age {
    //   padding-left:22px;
    // }
    // &>div>div {
    //   display:block;
    //   overflow: hidden;
    //   text-overflow:ellipsis;
    //   white-space: nowrap; 
    // }
    // .show-link {
    //   text-align:right;
    //   padding-right:20px;
    // }
    
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
         width:152px;
         height:82px;
         font-size:12px;
         padding-left:7px;
         li{

         }
       }
    }
  }
  .items.i1,.items.i2>a {
      display:flex;
      align-items:center;
      border-bottom:1px solid #f8f8f8;
      width:100%;
      color:#444;
      text-align:left;
      &>div {
        flex:0 0 30%;
        padding:5px 5px;
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
    .items.i2:hover {
      background-color: #fafafa;
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

  }
  
  @media screen and (max-width:525px) {
    .content {
      flex-wrap:wrap;
      .item ul.info {
        width:100%;
      }
    }
    .items.i1,.items.i2>a {
      &>div {
        flex:0 0 33%;
      }
    }
    .content {
      font-size:14px;
        .age{
          display:none;
        }
        .date-pc {
           display:none;
        }
        .date-mob {
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

