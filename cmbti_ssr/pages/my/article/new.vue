<template>
  <div class="my-dashboard">
      <MyArticleNew ></MyArticleNew>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from '~/plugins/moment'
// import utils from '~/plugins/utils'
import MyArticleNew from '~/components/my/my_article_new'
export default {
    data(){
        return {
        }
    },
    components: {
        MyArticleNew
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
