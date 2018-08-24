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
    validate({ params }) {
        // Must be a number
        return /^[\d\w]+$/.test(params.id)
    },
    async asyncData({ params, error }) {
        // let page = parseInt(params.id);
        // let [pageRes, countRes] = await Promise.all([
        //     axios.get(`/api/post/page/${page}?scope=published`),
        //     axios.get('/api/post/count/published'),
        // ]).catch(err => {
        //     error({ statusCode: 400, message: err })
        // })
        
        // return {
        //     posts: pageRes.data.list,
        //     count: countRes.data.result,
        //     page
        // }
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
