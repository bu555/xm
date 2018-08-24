<template>
        <div>
            <CategoryTags :focusNews="focusNews" :hotNews="hotNews" :readingNews="readingNews" :hotArticle="hotArticle" :addArticle="addArticle"></CategoryTags>
        </div>

</template>

<script>
// import Header from '~/components/commom/header.vue'
// import Nav from '~/components/commom/nav.vue'
import CategoryTags from '~/components/article/article_tags.vue'
import axios from '~/plugins/axios'
import utils from '~/plugins/utils'
import {mapState} from 'vuex'
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
    async asyncData ({req}) {
        // axios.
        let res = await Promise.all([
            axios.article.focus_news(),
            axios.article.recent_hot(),
            axios.article.all_read({ pageSize:20,pageIndex:1 }),
            axios.article.hot_article({Tag:''}),
            axios.article.add_article({Tag:''})
        ])
        return {
            focusNews:res[0].data.Data[0], //焦点文章
            hotNews:res[1].data.Data, //最近熱門
            readingNews:res[2].data.Data?res[2].data.Data.news:[], //大家都在讀
            hotArticle:res[3].data.Data, //热门文章
            addArticle:res[4].data.Data, //新增文章
        }
    },
    async fetch ({store}) {
        await store.dispatch('getNavType')
    },
    computed: {
      ...mapState({
        navTypes: state => state.navTypes,
      })
    },
    head () {
        return {
            title: "首页|OOPs",
            meta: [
                { hid: 'description', name: 'description', content: '测试内容' }
            ]
        }
    },
    mounted(){
    },
    created(){
        console.log(this.$route)
        // this.$router.push({
        //     query:{'sss':'123'}
        // })
        

    },
    beforeDestroy(){

    }
}
</script>

<style lang="less">


</style>
