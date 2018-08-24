<template>
      <div>
            <CategoryTags :focusNews="focusNews" :hotNews="hotNews" :readingNews="readingNews" :hotArticle="hotArticle" :addArticle="addArticle"></CategoryTags>
      </div>

</template>

<script>
import CategoryTags from '~/components/article/article_tags.vue'
import axios from '~/plugins/axios'
export default {
    components: {
        CategoryTags
    },
    data(){
        return {
            focusNews:'', //焦点文章
            hotNews:'', //最近熱門
            readingNews:'', //大家都在讀
            hotArticle:'', //热门文章
            addArticle:'',
        }
    },
    async asyncData (context) {
        // if(context.params.tag){
            let tag
            if(process.client){
                tag = '000'
            }else if(process.server){
                tag = context.params.tag
            }
            let res = await Promise.all([
                axios.article.focus_news({Tag:tag}),
                axios.article.recent_hot({Tag:tag}),
                axios.article.all_read({ pageSize:20,pageIndex:1 }),
                axios.article.hot_article({Tag:tag}),
                axios.article.add_article({Tag:tag})
            ])
            return {
                // aaa:res,
                focusNews:res[0].data.Data[0], //焦点文章
                hotNews:res[1].data.Data, //最近熱門
                readingNews:res[2].data.Data.news, //大家都在讀
                hotArticle:res[3].data.Data, //热门文章
                addArticle:res[4].data.Data, //新增文章
            }
        // }
    },
    async fetch ({store}) {
        await store.dispatch('getNavType')
    },
    head () {
        return {
            title: '标签：'+this.tag,
            meta: [
                { hid: 'description', name: 'description', content: 'Tag页测试内容' }
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
