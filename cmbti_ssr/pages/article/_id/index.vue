<template>
      <ArticleDetails v-if="detailsArticle&&relatedArticle&&otherArticle" :detailsArticle="detailsArticle" :relatedArticle="relatedArticle" :otherArticle="otherArticle"></ArticleDetails>
</template>

<script>
import ArticleDetails from '~/components/article/article_details.vue'
import axios from '~/plugins/axios'
export default {
    layout:'article',
    components: {
        ArticleDetails
    },  
    validate ({ params }) {
        // Must be a number
        return !!params.id
    },
    data(){
        return {
            detailsArticle:'',  //文章详情
            relatedArticle:'',  //关联文章
            otherArticle:'', //其他文章
        }
    },
    computed: {
    },
    async asyncData ({params,query}) {
        console.log('query',query);
        console.log('params',params);
            let id = params.id
            if(id){
                let res = await Promise.all([
                    axios.article.get_new_info({RelationID:id}), //文章详情
                    axios.article.relevance_article({newsId:id ,size: 20}), //关联文章
                    axios.article.other_article({RelationID:id,pageIndex:1,pageSize:20}), //其他文章
                ])
                return {
                    detailsArticle: res[0].data.Data?res[0].data.Data:{},  //文章详情
                    relatedArticle :res[1].data.Data?res[1].data.Data:[],  //关联文章
                    otherArticle:  res[2].data.Data?res[2].data.Data.news:[], //其他文章
                }
            }
    },


    async fetch ({store, redirect }) {
        await store.dispatch('getNavType')
    },
    head () {
        return {
            title: '标题：'+this.detailsArticle.Title,
            meta: [
                { hid: 'description', name: 'description', content: 'article页测试内容' }
            ]
        }
    },
    mounted(){
    },
    created(){
    }

}
</script>

<style lang="less">


</style>
