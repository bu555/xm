<template>
  <div class="my-dashboard">
      <MyArticleList ></MyArticleList>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from '~/plugins/moment'
// import utils from '~/plugins/utils'
import MyArticleList from '~/components/my/my_article_list'
export default {
    data(){
        return {
        }
    },
    components: {
        MyArticleList
    },
    head () {
        return {
            title: '个人中心-文章列表',
            meta: [
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    async fetch({store}){

    },
    async asyncData ( {req} ) {

    },
    created(){
    }
}
</script>

<style lang="less">
.my-dashboard {

}

</style>
