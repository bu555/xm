<template>
  <div class="oops_nav" >
        <div class="oops-nav-main">
            <ul>
              <li v-for="(v,i) in navTypes" :key="i">
                <!-- <router-link :to="'/tag/'+ encodeURIComponent(v.TagName)" class="item">{{v.TagName}}</router-link> -->
                <nuxt-link :to="'/tag/'+ v.TagName" :class="'item '+(currentTag===v.TagName?'active':'')">{{v.TagName}}</nuxt-link>
              </li>
            </ul>
        </div>
  </div>

</template>

<script>

import {mapState} from 'vuex'
export default {
  data() {
    return {
       currentTag:''
    };
  },
  // computed:{
  //   navTypes(){
  //     return this.$store.state.navTypes.slice(0,10)
  //   }
  // },
  computed: {
    ...mapState({
      navTypes: state => {
        return state.navTypes.slice(0,10)
      },
    })
  },
  watch:{
    '$route.path':'getTag'
  },
  methods:{
    getTag(){
      if(/^\/tag\//.test(this.$route.path)){
        this.currentTag = this.$route.path.split('/')[2]
      }
    }
  },
  mounted(){
   
  },
  created(){
    this.getTag()
  }
};
</script>

<style scoped lang="less">
  .oops_nav {
      width:100%;
      height:52px;
      background-color: #1b53a0;
      margin-bottom:20px;
      .oops-nav-main {
        max-width: 1180px;
        margin:0 auto;
        overflow: hidden;
        &>ul {
          display:flex;
          .item {
            display:block;
            padding:0 1.8em;
            height:52px;
            line-height: 52px;
            font-size:15px;
            cursor:pointer;
            color:#fff;
            &:hover {
              background-color: #4f8aeb;
            }
          }
          .item.active {
              background-color: #4f8aeb;
          }
        }
      }
  }
</style>
