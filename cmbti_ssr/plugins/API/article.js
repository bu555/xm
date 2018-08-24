
class Article {
  constructor (axios){
     this.axios = axios
  }
  //获取焦点新闻
  focus_news(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/Daily/Attration/1',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //最近热门
  recent_hot(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/Daily/AppendDaily',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //大家都在读
  all_read(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/Daily/ReadingNews',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //热门文章
  hot_article(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/Daily/Attration/2',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //新增文章
  add_article(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/Daily/AppendDailyForToday',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  // 获取导航分类
  nav_type(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('/api/ArticleTag/GetShowTags',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //查询文章信息
  get_new_info(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('api/Daily/GetNewInfo',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //关联文章
  relevance_article(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('api/Daily/Relation',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
  //同区的其他文章
  other_article(data={}){
    if (data || Object.keys(data).length) {
      return this.axios.get('api/Daily/Index',{params:data})
    } else {
      console.log('参数不规范')
    }
  }
}
export default Article