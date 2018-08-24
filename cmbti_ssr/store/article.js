

  

export const state = () => ({
    detailsArticle: '',
    relatedArticle:'',
    otherArticle:''
})

export const mutations = {
    // 文章详情
    setDetailsArticle(state,val) {
        state.detailsArticle = val
    },
    // 关联文章
    setRelatedArticle(state,val) {
        state.relatedArticle = val
        
    },
    // 其他文章
    setOtherArticle(state,val) {
        state.otherArticle = val
        
    },
    // 拼接其他文章列表
    concatOtherArticle(state,val) {
        if(state.otherArticle instanceof Array){
            state.otherArticle = state.otherArticle.concat(val)
        }
        
    }
}
