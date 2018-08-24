
class Account {
  constructor (axios){
     this.axios = axios
  }
  //获取用户信息
  userInfo(data,Ticket=''){
      return this.axios.get('/api/User/UserInfo',{params:data,headers: {'Ticket': Ticket}})
  }
  //文章发布api/Daily/Publish
  publish(data,Ticket=''){
      return this.axios.post('/api/Daily/Publish',data,{headers: {'Ticket': Ticket}})
  }
  login(data,Ticket=''){
      return this.axios.post('/api/Index/Login',data,{headers: {'Ticket': Ticket}})
  }
  //獲取本人文章
  getMyNews(data,Ticket=''){
      return this.axios.get('/api/Daily/GetMyNews',{params:data,headers: {'Ticket': Ticket}})
  }
  //最近收益
  profitStatistics(data,Ticket=''){
      return this.axios.get('/api/Daily/ProfitStatistics',{params:data,headers: {'Ticket': Ticket}})
  }
  //提現記錄
  getEnchashment(data,Ticket=''){
      return this.axios.get('/api/Daily/GetEnchashment',{params:data,headers: {'Ticket': Ticket}})
  }
  //點閱/點閱詳情
  record(data,Ticket=''){
      return this.axios.get('/api/Daily/ArticleView',{params:data,headers: {'Ticket': Ticket}})
  }
  //修改個人信息
  modifyUserInfo(data,Ticket=''){
      return this.axios.post('/api/User/ModifyUserInfo',data,{headers: {'Ticket': Ticket}})
  }
  //修改用戶密碼
  modifyUserPassword(data,Ticket=''){
      return this.axios.post('/api/User/ModifyPassword',data,{headers: {'Ticket': Ticket}})
  }
  //熱門好文
  hotArticle(data,Ticket=''){
      return this.axios.get('/api/Daily/HotArticle',{params:data,headers: {'Ticket': Ticket}})
  }
  //删除文章
  deleteArticle(data,Ticket=''){
      return this.axios.post('/api/Daily/RemoveDaily',data,{headers: {'Ticket': Ticket}})
  }
  //獲取文章詳情
  getNewInfo(data,Ticket=''){
      return this.axios.get('/api/Daily/GetNewInfo',{params:data,headers: {'Ticket': Ticket}})
  }
  //獲取文章詳情
  getNewInfoForLogin(data,Ticket=''){
      return this.axios.get('/api/Daily/GetNewInfoForLogin',{params:data,headers: {'Ticket': Ticket}})
  }
  //編輯個人文章
  editArticle(data,Ticket=''){
      return this.axios.post('/api/Daily/ModifyDaily',data,{headers: {'Ticket': Ticket}})
  }
  //獲取分類列表
  getCategories(data,Ticket=''){
      return this.axios.get('/api/Daily/GetCategories',{params:data,headers: {'Ticket': Ticket}})
  }
  // 獲取meta
  getMeta(data,Ticket=''){
      return this.axios.get('/api/Meta/GetMeta',{params:data,headers: {'Ticket': Ticket}})
  }
  // 发送邮箱验证码
  sendEmailCode(data,Ticket=''){
      return this.axios.post('/api/User/SendMail',data,{headers: {'Ticket': Ticket}})
  }
  // 郵箱驗證
  verifyEmail(data,Ticket=''){
      return this.axios.post('/api/User/verifyEmail',data,{headers: {'Ticket': Ticket}})
  }
  // 修改用戶郵箱
  modifyEmail(data,Ticket=''){
      return this.axios.post('/api/User/ModifyUserEmail',data,{headers: {'Ticket': Ticket}})
  }
  // 发送手機验证码
  sendPhoneCode(data,Ticket=''){
      return this.axios.post('/api/User/SendSMS',data,{headers: {'Ticket': Ticket}})
  }
  // 校驗手機驗證碼
  verifyPhone(data,Ticket=''){
      return this.axios.post('/api/User/VerifySMS',data,{headers: {'Ticket': Ticket}})
  }
  // 修改手機
  modifyPhone(data,Ticket=''){
      return this.axios.post('/api/User/ModifyUserPhone',data,{headers: {'Ticket': Ticket}})
  }
  // 設置支付方式
  setPayment(data,Ticket=''){
      return this.axios.post('/api/User/RetrievePaymentMethod',data,{headers: {'Ticket': Ticket}})
  }
  // 上传头像像接口, 最大支持80k 文件格式为jpg\png\jpeg
  uploadAvatar(data,Ticket=''){
      return this.axios.post('/api/Upload/UploadAvatar',data,{headers: {'Content-Type': 'multipart/form-data'}})
  }
  // 上传圖片接口
  uploadImages(data,Ticket=''){
      return this.axios.post('/api/Upload/Imges',data,{headers: {'Content-Type': 'multipart/form-data'}})
  }
  // 下綫接口
  getreferralinfo(data,Ticket=''){
    return this.axios.get('/api/User/GetPyramid',{params:data,headers: {'Ticket': Ticket}})
  }
  // 上綫邀請碼
  Invitationcode(data,Ticket=''){
    return this.axios.post('/api/User/SetPyramid',data,{headers: {'Ticket': Ticket}})
  }
  // 获取点击提现时,通过选择支付类型获取可提现的金额 API:/api/pay/PaymentMethod?PaymentMethod=1
  getMoneyByMethod(data,Ticket=''){
        return this.axios.get('/api/pay/PaymentMethod',{params:data,headers: {'Ticket': Ticket}})
  }
  //   用户提现 "PaymentMethod":"2",//支付类型 "AccountNumber":"506955989@qq.com"//支付账号
  userPayment(data,Ticket=''){
        return this.axios.post('/api/pay/Enchashment',data,{headers: {'Ticket': Ticket}})
  }
  //獲取标签列表
  getShowTags(data,Ticket=''){
      return this.axios.get('/api/ArticleTag/GetShowTags',{params:data,headers: {'Ticket': Ticket}})
  }
  //根据TagName模糊查询Tag
  getTags(data,Ticket=''){
      return this.axios.get('/api/ArticleTag/GetTags',{params:data,headers: {'Ticket': Ticket}})
  }
  //排行榜
  getRankingTop(data,Ticket=''){
    return this.axios.get('/api/User/GetProfitRankingForYesterday',{params:data,headers: {'Ticket': Ticket}})
  }
  //富豪榜
  getBalanceTop(data,Ticket=''){
    return this.axios.get('/api/User/GetBalanceRanking',{params:data,headers: {'Ticket': Ticket}})
  }

  //获取当前登录用户的任务数据
  getTaskInfo(data,Ticket=''){
    return this.axios.get('/api/Task/GetUserDailyTask',{params:data,headers: {'Ticket': Ticket}})
  }
  //获取当前登录用户的任务数据
  getAward(data,Ticket=''){
    return this.axios.get('/api/Task/GetTaskAward',{params:data,headers: {'Ticket': Ticket}})
  }
  // 編輯器插入視頻處理
  getEditorVideo(data,Ticket=''){
      return this.axios.get('/api/Daily/VerifyVideoURL',{params:data,headers: {'Ticket': Ticket}})
  }

}
export default Account