<template>
  <div class="accountdoc"  v-loading="loading" ref="accountdoc">
      <div class="gains item row">
          <div class="title">
              <h5 v-if="status==='add'">文章撰寫</h5>
              <h5 v-if="status==='edit'">文章編輯</h5>
                <!--<button type="button " class="btn btn-warning write-btn"><i class="glyphicon glyphicon-plus-sign"></i> 文章撰寫</button>-->
                <router-link to="/my/article/list">
                <ul class="pager write-btn" style="margin:0">
                    <li class="previous" style="">
                        <a href="javascript:;"   id="btn-icon"  style="">
                            <span aria-hidden="true"></span><i></i> 返回列表
                        </a>
                    </li>
                </ul>
                </router-link>
          </div>
        <div class="content" style="text-align:left">
            <!--<div class="form-group">
                    <label for="category" style="color:#747474">分類：</label></br>
                    <el-select v-model="article.category" filterable placeholder="分類"  @change="verify('category')" style="">
                        <el-option
                        v-for="(item,i) in $store.state.nav_type?$store.state.nav_type:1"
                        :key="i"
                        :label="item.CategoryName"
                        :value="item.ID">
                            <span style="float: left">{{item.CategoryName}}</span>
                        </el-option>
                    </el-select>
                    <div class="err-message" v-if="ver.category==='empty'">*請選擇一個類別</div>


            </div>-->
            <div class="form-group">
                    <label for="1" style="color:#747474">標題：</label>
                    <el-input @blur="titleBlurHandler"  @focus="showTitleErr='';titleFocus=true" spellcheck="false" @input="titleInputHandler"
                    placeholder="文章標題"
                    v-model="article.title"
                    clearable>
                    </el-input>
                    <!--<input type="text" class="form-control" id="t" placeholder="文章標題" v-model="article.title"  @focusout="verify('title')" autocomplete="off">-->
                    <div class="err-message" v-if="ver.title==='empty'">*請輸入文章標題</div>
                    <!-- <div class="err-message" v-if="ver.title==='notPass'">*文章標題要求為10~96字節</div> -->
                    <div class="err-message" v-else-if="ver.title==='notPass' && showTitleErr">{{showTitleErr}}</div>
                    <!-- <div class="err-message" v-if="ver.title==='notPass'">標題字數不足</div> -->
                    <div class="err-message" v-else-if=" titleFocus && titleLength>0" :style="'color:'+ (titleLength<9?'red':'#16a05d')">{{titleLength}}/{{titleMaxLength}}</div>
            </div>
            <div class="form-group" style="margin-bottom:0px;">
                <label for="" style="color:#747474">內容：</label>
                <div class="my-editor-box" v-loading="loading_video||uploadingBase64">
                    <!--编辑器-->
                    <div id="editor" spellcheck="false" >
                        <!--<p>Welcome!</p>-->
                    </div>
                </div>
                <!--<form class="visible-xs">
                    <textarea class="form-control" rows="10" placeholder="文章內容"></textarea>
                </form>-->
            </div>
            <div class="err-message" v-if="contentLength===0 && contentLength!==-1 ">*請輸入文字內容</div>
            <div class="err-message" v-else-if="(contentLength>0&&contentLength<=contentMaxLength)">*文字總數需{{contentMaxLength}}以上 ({{contentLength+'/'+contentMaxLength}})</div>
            <div class="err-message" v-if="ver.content_img==='notPass'">*請在內容中加入至少一張圖片或影片</div>
            <div class="form-group" style="padding-top:15px;">
                    <label for="1" style="color:#747474">標籤：</label>
                    <div id="tags-container"  ref="tagsContainer" autocomplete="off">
                        <div class="tag-item" ref="tagItem" contenteditable="false" v-for="(v,i) in article.tagsList" :key="i">
                            <span>{{v}}</span>
                            <i class="el-icon-error" @click="delTags(i)"></i>
                        </div>
                        <div  class="tag-input" ref="tagInput" style="display:inline-block;width:100%">
                            <div class="tag-err-msg" v-if="tagErrMsg"><i class="el-icon-warning" style="color:#e94242"></i> {{tagErrMsg}}</div>
                            <el-input
                            placeholder="輸入標籤"
                            v-model="inputTag"
                            @input="querySearch"
                            @blur="inputBlur()"
                            @keydown.delete.native="deleteTagsByBtn"
                            @keydown.down.native="downBtnHandler"
                            @keydown.up.native="upBtnHandler"
                            @keyup.space.native="spaceBtnHandler"
                            @keydown.enter.native="enterBtnHandler"
                            spellcheck="false"
                            >
                            <!--@keyup.space.native="tagsCheck(inputTag,'btn')"-->
                            </el-input>
                            <!--<div class="btn-add" ref="btnAdd" v-if="showAddBtn">
                                <el-button type="primary" round size="mini" @click="tagsCheck(inputTag,'btn')"><i class="el-icon-plus"></i>添加</el-button>
                            </div>-->
                            <ul v-if="searchTagsList.length>0" style="min-width:155px;max-width:240px" class="search-items-box">
                                <li v-if="searchTagsList[0]['empty']" class="tag-empty-show">無匹配數據</li>
                                <li v-else @click="tagsCheck(v.TagName,'select')"  v-for="(v,i) in searchTagsList" :key="i" ref="searchItem" :class="searchActiveIndex===i?'active':''">{{v.TagName}}</li>
                            </ul>
                            <ul v-if="searchTagsList.length==0 && requestTags" style="width:145px;">
                                <li ><i class="el-icon-loading"></i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="define-tags" v-if="defineTagsList.length>0">
                        <span>熱門標籤：</span>
                        <span class="d-items" v-for="(v,i) in defineTagsList" :key="i" @click="tagsCheck(v.TagName)">{{v.TagName}}</span>

                    </div>
                    <div class="err-message" v-if="ver.tagsList==='empty'">*請添加至少一個標籤</div>
            </div>
            <div style="padding-top:0px">
                <button v-if="status==='add'" type="button" class="btn btn-primary" style="padding:11px 35px;margin-top:18px;font-size:14px" @click="submitArticle()">發 表</button>
                <button v-if="status==='edit'" type="button" class="btn btn-primary" style="padding:11px 35px;margin-top:18px;font-size:14px" @click="submitArticle()">保 存</button>
            </div>
        </div>
          <div>
          </div>
          <!-- 圖片上傳遮罩，預覽圖 -->
        <!-- <div class="img-upload-cover" v-if="uploadingBase64">
            <div class="show-img">
                <img :src="uploadingBase64" alt="">
                <div class="progr">进度</div>
            </div>
        </div> -->
      </div>
  </div>
</template>

<script>
// import E from 'wangeditor'
// import E from '~/plugins/wangEditor'
import Chinese from 'chinese-s2t'
import axios from '~/plugins/axios'
import utils from '~/plugins/utils'
export default {
      data(){
        return {
            
            editor:null,
            article:{
                category:'',
                title:'',
                tags:'',
                tagsList:[]
            },
            xss:'',
            status:'',
            loading:false,
            loading_video:false,
            categoryList:'',
            initData:{},
            textarea3:'',
            // 输入验证
            ver:{
                tagsList:'',
                category:'',
                title:'',
                tags:'',
                content_img:'',
                content_txt:'',
                all:''
            },
            selectTag:'',
            inputTag:'', //标签输入
            defineTagsList:[], //预定义标签
            searchTagsList:[], //搜索备选标签
            timeId:'',
            timeId1:'', //標籤錯誤顯示時間定時
            showAddBtn:false, //显示添加标签按钮
            tagErrMsg:'', //標籤輸入錯誤
            requestTags:false, //请求匹配的标签
            searchActiveIndex:'null', //搜索標籤選中角標
            uploadingBase64:'', //正在上傳圖片
            grade:1, //可以添加Tag等级
            titleFocus:false, //获得title输入获取焦点
            titleLength:0, //標題字節長度
            titleMaxLength:192, //標題最大長度
            contentLength:-1, //内容字節長度
            contentMaxLength:300, //標題最大長度
            showTitleErr:'', //標題報錯
            isFinish:false,
            $utils:null
        }
      },
      components:{},
      watch:{
        "article.tagsList":function(){
            this.verify('tagsList')
            this.setInputWidth()
        }
      },
      beforeMount(){
            if(this.status === 'edit'){
                this.getEditData()
            }
            this.getShowTags()
      },
      mounted(){
            this.initEditor()
            this.pasteHandler()
            //   视频处理方法赋予window
            window.editorVideoHandler = this.editorVideoHandler
      },
      methods:{
            //   简体转繁体
            s2t(){
                this.editor.txt.html(Chinese.s2t(this.editor.txt.html())) 
                this.article.title = Chinese.s2t(this.article.title) 
            },
            //   繁体转简体
            t2s(){
                this.editor.txt.html(Chinese.t2s(this.editor.txt.html())) 
                this.article.title = Chinese.t2s(this.article.title) 
            },
            initEditor(){
                this.editor = new wangEditor('#editor') 
                // console.log('eeeee',this.editor.cmd.do('insertHTML', '9999999999999' + '<p><br></p>'));
                this.editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
                // 配置服务器端地址
                this.editor.customConfig.uploadImgServer = axios.account.path  +'api/Upload/Imges'
                this.editor.customConfig.withCredentials = true
                let _this = this
                //  this.editor.create()
                this.editor.customConfig.uploadImgHooks = {
                    before: function (xhr, editor, files) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            _this.uploadingBase64 = this.result;
                            console.log(files[0]);
                        }
                        reader.readAsDataURL( files[0] );

                        if(files[0].size/1000/1024>100){    //不大於100M
                            return {
                                prevent: true,
                                msg: '圖片大小不可超過100M'
                            }
                        }

                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                        
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                    },
                    success: function (xhr, editor, result) {
                        _this.uploadingBase64 = ''

                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    fail: function (xhr, editor, result) {
                        _this.uploadingBase64 = ''
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, editor) {
                        _this.uploadingBase64 = ''
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },
                    timeout: function (xhr, editor) {
                        _this.uploadingBase64 = ''
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                    },

                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, editor) {
                        _this.uploadingBase64 = ''
                        let imgURL = result.data[0]
                        if(process.env.NODE_ENV === "development"){
                            imgURL = process.env.API_HOST + imgURL
                        }
                        // _this.editor.txt.append('<img src="'+imgURL+'">')
                        insertImg(imgURL)
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        // var url = result.url
                        // insertImg(url)
                        // console.log('配置',result);

                        // result 必须是一个 JSON 格式字符串！！！否则报错 
                    }

                }
                this.editor.create()
                let weText = document.querySelector('.w-e-text')
                weText.blur()
                weText.addEventListener('blur',()=>{
                    this.verify('content')
                })
                weText.addEventListener('input',()=>{
                    let text = weText.innerText.replace(/[\s\r\n]+/g,'')
                    this.contentLength = this.$utils.strLength(text)
                })
                let toolbar = document.querySelector('.w-e-toolbar')
                let trad = toolbar.firstChild.cloneNode()
                trad.innerHTML = `<i>繁</i>`
                toolbar.appendChild(trad)
                let simp = toolbar.firstChild.cloneNode()
                simp.innerHTML = `<i>简</i>`
                toolbar.appendChild(simp)
                trad.addEventListener('click',this.s2t)
                simp.addEventListener('click',this.t2s)

                if(this.status === 'add'){
                    // 新建时，记录原始值
                    this.getInitData()
                }
            },
            //   驗證各欄位輸入
            verify(type,flag){
                if(type==='tagsList' || type==='all'){
                    if(this.article.tagsList.length>0){
                        this.ver.tagsList = 'pass'
                    }else{
                        this.ver.tagsList = 'empty'
                    }
                }
                if(type==='title' || type==='all'){
                    this.article.title = this.$utils.strTrim(this.article.title)
                    if(!this.article.title){
                        this.ver.title = 'empty'
                    }else{
                        let len = this.$utils.strLength(this.article.title)
                        if(len<9 || len>this.titleMaxLength){
                                if( (flag==='blur'&&len<9) || type==='all' ){
                                    this.showTitleErr = '標題字數不足'
                                }
                                this.ver.title = 'notPass'
                        }else{
                                this.ver.title = 'pass'
                        }
                    }
                }
                if(type==='content' || type==='all'){
                        // if( !this.editor.txt.html().replace(/&nbsp;|<p>|<\/p>|<br>|\s/g,'')){
                        //     this.ver.content_txt = 'empty'
                        // }else{
                        
                        this.contentLength = this.$utils.strLength(document.querySelector('.w-e-text').innerText.replace(/[\s\r\n]+/g,''))
                        // 验证文字长度
                        if(this.contentLength<this.contentMaxLength){
                            this.ver.content_txt = 'notPass'
                        }else{
                            this.ver.content_txt = 'pass'
                        }
                        // 圖片 或 youtube視頻
                        // if(/<img/.test(this.editor.txt.html()) ||
                        //  /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/.test(this.editor.txt.html())  || 
                        //  /(?:https?:\/\/)?(?:www.|web.|m.)?facebook.com\/(?:video.php\?v=\d+|photo.php\?v=\d+|\?v=\d+)|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/.test(this.editor.txt.html())  
                        //  ){
                        let hasVideo = false
                        this.editor.txt.html().replace(/<\s?iframe[^>]*><\/iframe>/gi, function( tag ) {
                            if( /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/.test(tag) || 
                                /(?:https?:\/\/)?(?:www.|web.|m.)?facebook.com\/(?:video.php\?v=\d+|photo.php\?v=\d+|\?v=\d+)|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/.test(tag)
                            ){
                                hasVideo = true
                            }
                        })




                        if( hasVideo || /<img/.test(this.editor.txt.html()) ){
                            this.ver.content_img = 'pass'
                        }else{
                            this.ver.content_img = 'notPass'
                        }
                }
                if(this.ver.tagsList==='pass' && this.ver.title==='pass' && this.ver.content_img==='pass' && this.ver.content_txt==='pass'){
                    this.ver.all='pass'
                }else{
                    this.ver.all='notPass'
                }

            },
            //   验证内容是否改动（編輯時使用）
            isModifyVerify(){
                if(
                    JSON.stringify(this.article.tagsList) === JSON.stringify(this.initData.tagsList) &&
                    this.article.title === this.initData.title &&
                    this.editor.txt.html() === this.initData.html
                ){
                    return false
                }
                return true
            },
            submitArticle(){
                //   驗證所有輸入合法性
                this.verify('all') 
                if(this.ver.all!=='pass'){
                    this.$message({
                        message: '請將文章輸入完整後提交！',
                        type: 'error',
                        duration:4000,
                        showClose:true
                    });
                    return 
                }
                let content = this.editor.txt.html()

                // 處理微軟edge瀏覽器，切換字體自動替換font問題
                content = content.replace(/<\s?font[^>]*>[^>]*<\/font>/g,function(tag){
                    return tag.replace(/<font/,'<span').replace(/<\/font>/,'</span>').replace(/face=\"/,'style="font-family:').replace(/\"/,'"')
                })

                // 判断是否超出文章最大长度
                let len = this.$utils.strLength(content)
                if(len>16777215){
                    this.$message({
                        message: '文字已超出最大限度',
                        type: 'error',
                        duration:4000,
                        showClose:true
                    });
                    return  
                }
                // 开发环境下，对内容做特殊处理
                if(process.env.NODE_ENV === "development"){
                    let reg = new RegExp('<img src="'+process.env.API_HOST,'g')
                    content = content.replace(reg,function(){
                        return '<img src="'
                    })
                }

                if(this.status==='add'){
                    this.loading = true;
                    axios.account.publish({
                        Title: this.article.title,
                        Content: content,
                        // CategoryID: this.article.category
                        ArticleTags: this.article.tagsList
                    }).then(res=>{
                        this.loading = false; 
                        if(res.data.ResultCode==200){
                            this.isFinish = true
                            this.$message({
                                message: '發表成功！',
                                type: 'success'
                            });
                            this.$store.state.refreshUserInfo++  //通知刷新userinfo
                            this.article.title = ''
                            this.article.category = ''
                            this.editor.txt.html('<p><br></p>')
                            this.$router.push({
                                path:'/my/article/list?Tag=&pageIndex=1'
                            })
                        }
                    }).catch(err=>{
                        this.loading = false;
                    })
                }else if(this.status==='edit'){
                    // 验证内容是否经过修改
                    if(!this.isModifyVerify()){
                        return this.$message({
                            message: '請編輯後再提交',
                            type: 'error',
                            duration:4000,
                            showClose:true
                        });
                    }
                    this.loading = true;
                    // ｛"RelationID":"","Title":"文章标题","Content":"文章内容","CategoryID":"文章所属分类ID"｝
                    axios.account.editArticle({
                        RelationID:this.initData.RelationID,
                        Title: this.article.title,
                        Content: content,
                        ArticleTags: this.article.tagsList
                    }).then(res=>{
                        this.loading = false;
                        if(res.data.ResultCode==200){
                            this.isFinish = true
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$router.push({
                                path:'/my/article/list?Tag=&pageIndex=1'
                            })
                        }
                    }).catch(err=>{
                        this.loading = false;
                    })

                }
            },
            //   獲取熱門標籤
            getShowTags(){
                    axios.account.getShowTags({}).then(res=>{
                        if(res.data.ResultCode==200){
                            this.defineTagsList = res.data.Data
                        }
                    }).catch(err=>{
                        console.log('error!',err);
                    })

            },
            //   刪除鍵刪除事件
            deleteTagsByBtn(){
                if(this.inputTag.length==0 && this.article.tagsList.length>0){
                    this.article.tagsList.pop(this.article.tagsList.length-1)
                }
            },
            delTags(index){
                this.article.tagsList.splice(index,1)
            },
            //   輸入標籤處理函數
            querySearch() {
                    this.searchTagsList = []
                    this.searchActiveIndex = 'null'
                    clearTimeout(this.timeId)
                    let len = this.$utils.strLength(this.inputTag.trim())
                    if(len>24){
                        setTimeout(()=>{
                            // 对超出长度的裁剪
                            this.inputTag = this.$utils.tooLongTrim(this.inputTag,24)
                        },28)
                        this.tagErrMsg = '標籤長度過長'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2500)
                        return
                    }


                    // this.inputTag = this.$utils.strTrim(this.inputTag)
                    if(this.inputTag){
                        if(this.$store.state.user_info.Grade && this.$store.state.user_info.Grade>=this.grade){  //判定等級，符合等級后添加
                            this.showAddBtn = true
                            // 根據文字設置按鈕left距離
                            setTimeout(()=>{
                                let w = this.inputTag.length * 15 + 22
                                w = w>145? 145:w
                                w = w<70? 70:w
                                if(this.$refs.btnAdd){
                                    this.$refs.btnAdd.style.left = w +'px' 
                                }
                            },32)
                        }
                        this.timeId = setTimeout(()=>{
                            // cb([{"TagName": "人物"}])
                            // 标签搜索
                            if(this.inputTag){
                                this.requestTags = true
                                axios.account.getTags({
                                    Tag:this.inputTag
                                }).then(res=>{
                                    this.requestTags = false
                                    if(res.data.ResultCode==200){
                                        this.searchTagsList = res.data.Data
                                    }else if(res.data.ResultCode==201){
                                        this.searchTagsList = [{'empty':true}]
                                    }
                                }).catch(err=>{
                                    // this.requestTags = false
                                    console.log('error!',err);
                                })
                            }
                        },1200)
                    }else{
                        this.showAddBtn = false
                    }
            },
            //   選擇添加標籤處理函數
            tagsCheck(tag,flag){
                    tag = tag.replace(/[\s\r\n]+/g,'')
                    if(flag==='btn'){ //通過按鍵添加
                        // if(this.searchTagsList.length>0){
                        //     tag = this.searchTagsList[0].TagName
                        // }
                        if(this.$store.state.user_info.Grade && this.$store.state.user_info.Grade>=this.grade){  //判定等級，符合等級后添加

                        }else{
                            return this.$message({
                            showClose: true,
                            message: '等級'+this.grade+'級以上可創建標籤',
                            type: 'warning'
                            });
                        }
                        if(!this.showAddBtn) return;

                    }
                    let len = this.$utils.strLength(tag)
                    if(len<1 || len>24){
                        this.tagErrMsg = len>24?'標籤長度過長':'標籤不可為空'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2200)
                        return
                    }

                    if(tag && this.article.tagsList.indexOf(tag)==-1 ){
                        if(this.article.tagsList.length>=32){
                            this.tagErrMsg = '最多允許添加32個標籤'
                            clearTimeout(this.timeId1)
                            this.timeId1 = setTimeout(()=>{
                                this.tagErrMsg = ''
                            },2200)
                            return
                        }
                        this.article.tagsList.push(tag)
                        this.searchTagsList=[]
                        if(flag==='btn' || flag==='select'){ //点击按钮或下拉添加
                            this.inputTag = ''
                            this.showAddBtn = false
                        }
                    }else{
                        this.tagErrMsg = '標籤已重複!'
                        clearTimeout(this.timeId1)
                        this.timeId1 = setTimeout(()=>{
                            this.tagErrMsg = ''
                        },2200)
                    }
                    this.requestTags = false
                    clearTimeout(this.timeId)
            },
            //   標籤輸入失去焦點
            inputBlur(){
                    setTimeout(()=>{
                        this.searchTagsList=[]
                        this.searchActiveIndex = 'null'
                    },220)
            },
            //   设置tag输入框宽度
            setInputWidth(){
                    let parent = this.$refs.tagsContainer
                    let tagInput = this.$refs.tagInput
                    tagInput.style.width = 140+'px'
                    setTimeout(()=>{
                            if(this.$refs.tagItem.length==0){
                                tagInput.style.width = parent.offsetWidth-5 +'px'
                                return
                            }
                            let lastItem = this.$refs.tagItem[this.$refs.tagItem.length-1]
                            let remWidth = parent.offsetWidth - (lastItem.offsetLeft+lastItem.offsetWidth-parent.offsetLeft)
                            if(remWidth<150){
                                tagInput.style.width = parent.offsetWidth-5 +'px'
                            }else{
                                tagInput.style.width = remWidth-5+'px'
                            }
                    },30)
            },
            //   標籤輸入回車鍵
            enterBtnHandler(){
                if(this.searchActiveIndex!=='null' && this.searchTagsList.length>this.searchActiveIndex){
                    this.tagsCheck(this.searchTagsList[this.searchActiveIndex].TagName,'btn')
                }else{
                    this.tagsCheck(this.inputTag,'btn')
                }
                return
            },
            //   標籤輸入上鍵
            downBtnHandler(){
                if(this.$refs.searchItem){
                    let len = this.searchTagsList.length
                    if(!this.searchActiveIndex === 'null'){
                        this.searchActiveIndex = 0
                    }else{
                        if(this.searchActiveIndex<(len-1)){
                            this.searchActiveIndex += 1
                        }else{
                            this.searchActiveIndex = 0
                        }
                    }
                }
            },
            //   標籤輸入下鍵
            upBtnHandler(){
                    if(this.$refs.searchItem && this.searchActiveIndex !== 'null'){
                        let len = this.searchTagsList.length
                        if(this.searchActiveIndex>0){
                            this.searchActiveIndex -= 1
                        }else{
                            this.searchActiveIndex = len-1
                        }
                    }
                
            },
            //   標籤輸入空格鍵事件
            spaceBtnHandler(){
                //   末尾是空白，添加標籤
                let t = this.inputTag.trim()
                let last = this.inputTag[this.inputTag.length-1];
                if( t && /[\s\r\n]/.test(last)){
                    this.tagsCheck(this.inputTag,'btn')
                }
            },
            //   檢測標題輸入，實時變動字節長度
            titleInputHandler(){
                this.verify('title')
                this.titleLength = this.$utils.strLength(this.article.title)
                if(this.titleLength>this.titleMaxLength){
                    setTimeout(()=>{
                        // 对超出长度的裁剪
                        this.article.title = this.$utils.tooLongTrim(this.article.title,this.titleMaxLength)
                        this.titleLength = this.$utils.strLength(this.article.title)
                    },28)
                }
            },
            //   標題失去焦點處理
            titleBlurHandler(){
                this.verify('title','blur');
                this.titleFocus=false;
            },
            //   复制处理
            pasteHandler(){
                document.querySelector('#editor').addEventListener('paste', function (e) {

                if ( !(e.clipboardData && e.clipboardData.items) ) {
                    return;
                }
                for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
                    var item = e.clipboardData.items[i];
                    if (item.kind === "string") {
                            // e.clipboardData.items[i] = null
                        item.getAsString(function (str) {
                            // console.log(i,str);
                        })
                    } else if (item.kind === "file") {
                        var f= item.getAsFile();
                        // console.log(i,f.type);
                        if(/^image/.test(f.type)){
                            console.log('圖片');

                // 上传圖片接口
                //   uploadImages(data){
                //       return axios.post(axios.path + 'api/Upload/UploadAvatar',data,{headers: {'Content-Type': 'multipart/form-data'}})
                //   }
                let uploadData = new FormData();
                uploadData.append('file', f,'img.png');

                                    this.loading = true
                                    axios.account.uploadImages(uploadData).then((res=>{
                                        this.loading = false
                                            if(res.data.errno===0){
                                                // data : ["/upload/image/2018/0726/noiAGl5T.jpg"]
                                                // errno : 0
                                                this.editor.customConfig.customUploadImg = function (files, insert) {
                                                    // files 是 input 中选中的文件列表
                                                    // insert 是获取图片 url 后，插入到编辑器的方法

                                                    // 上传代码返回结果之后，将图片插入到编辑器中
                                                    insert(res.data.data[0])
                                                }
                                            }
                                    })).catch(err=>{
                                        this.loading = false
                                        console.log(err);
                                    })


                                }
                            }
                        }
                    });
            },
            //   視頻插入處理 
            editorVideoHandler(val){
                return new Promise((resolve,reject)=>{
                    this.loading_video = true
                    axios.account.getEditorVideo({
                        url:val
                    }).then(res=>{
                        this.loading_video = false
                        if(res.data.ResultCode==200){
                            // resolve(decodeURIComponent(res.data.Data))
                            // iframe設置寬高，適配屏幕
                            let viewWidth = document.querySelector('.w-e-text').offsetWidth -38;
                            viewWidth = viewWidth<768?768:viewWidth
                            let newData = res.data.Data.replace(/<\s?iframe[^>]*><\/iframe>/gi, function( tag ) {
                                let w, h;
                                tag.replace(/\s+width="[\d]*"/, function(attr) {
                                //width="786"
                                w = attr.split('"')[1];
                                });
                                tag.replace(/\s+height="[\d]*"/, function(attr) {
                                h = attr.split('"')[1];
                                });
                                if (w > viewWidth) {
                                let temp_w = w;
                                w = Math.floor(viewWidth);
                                h = Math.floor(w * (h / temp_w));
                                tag = tag.replace(/\s+width="[\d]*"/, ' width="' + w + '"');
                                tag = tag.replace(/\s+height="[\d]*"/, ' height="' + h + '"');
                                }
                                return tag;
                            })

                            resolve(newData)
                            // 插入后重新驗證內容
                            setTimeout(()=>{
                                this.verify('content')
                            },200)
                        }else if(res.data.ResultCode==1107){
                            this.$message({
                                message: '影片格式不支持！',
                                type: 'error',
                                duration:4000,
                                showClose:true
                            });
                        }
                    }).catch(err=>{
                        this.loading_video = false
                        //   reject('error')
                        reject('error')
                    })
                })
            },
            //   离开页面处理
            thenLeavePage(callback){
                if(this.isModifyVerify()){
                        this.$confirm('文章尚未保存, 是否確定離開?', '提示', {
                            confirmButtonText: '確定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            callback && callback()
                        }).catch(() => {
                            })  
                }else{
                        callback && callback()
                }
                
            },
            getInitData(){
                this.initData.title = this.article.title
                this.initData.tagsList = JSON.parse(JSON.stringify(this.article.tagsList))
                this.initData.html = this.editor.txt.html()
            },
            getEditData(){
                this.loading = true
                axios.account.getNewInfoForLogin({
                    RelationID:this.$route.path.split('/')[4]
                }).then(res=>{
                    this.loading = false
                    if(res.data.ResultCode==200){
                        this.article.tagsList=res.data.Data.ArticleTags
                        this.article.title=res.data.Data.Title
                        this.editor.txt.html(res.data.Data.Content)
                        this.initData.RelationID = res.data.Data.RelationID
                        setTimeout(()=>{
                            this.getInitData()
                            this.titleInputHandler()
                            this.verify('all')
                            this.contentLength = this.$utils.strLength(document.querySelector('.w-e-text').innerText.replace(/[\s\r\n]+/g,''))
                        },200)
                    }
                }).catch(err=>{
                    this.loading = false
                    console.log('error!',err);
                })
            }

      },
      created(){
          if(this.$route.path.indexOf('/edit/')!==-1){
                this.status = 'edit'


          }else{
              this.status = 'add'  
          }
          if(this.$store.state.navTypes){
              this.defineTagsList = this.$store.state.navTypes
          }
          this.$utils = utils

      },
      beforeRouteLeave (to, from, next) {
        //   保存完成跳转
        if(this.isFinish){
            next()
        }else{ 
            this.thenLeavePage(()=>{
                next()
            })
        }
        
      }
    }
</script>

<style lang="less" scoped>
.accountdoc {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
    .row {
        margin:0;
    }
    #editor ul,#editor ol {
        list-style: none;
    }
    .item {
        padding:2%;
        padding-top:1%;
        background-color: #fff;
        box-sizing: border-box;
        .title {
            // height:38px;
            text-align:left;
            border-bottom:3px solid #eeeeee;
            position: relative;
            h5 {
                display:inline-block;
                padding:2px 3px;
                font-weight:700;
                position: relative;
                &:after {
                    content:"";
                    display:block;
                    height:3px;
                    width:100%;
                    background-color: #0a53a2;
                    position: absolute;
                    bottom:-13px;
                    left:0px;
                }
            }
            .write-btn {
                position: absolute;
                bottom:4px;
                right:0px;
                border-radius:16px;
            }
        }
        .content {
            padding:20px 30px;
            th.title-header {
                width:380px ;
            }
        }
    }
    #btn-icon {
        // display:inline-block;
        // height:15px;
        // width:15px;
        padding:8px 20px;
        padding-left:38px;
        background:url('/img/back_icon.png') no-repeat 19px 9px;;
        color:#777;
        font-size:12px;
        border-radius:34px;
        &:hover {
            border-color:#aaa ;
        }
    }
    #tags-container {
        min-height:34px;
        width:100%;
        border:1px solid #ccc;
        display:flex;
        flex-wrap:wrap;
        border-radius:4px;
        .tag-item {
            height:26px;
            line-height: 26px;
            display:inline-block;
            margin:5px;
            margin-right:0px;
            margin-bottom:0px;
            padding:0 7px;
            padding-right:24px;
            position: relative;
            background: #5bc0de;
            color:#fff;
            font-size:14px;
            border-radius:3px;
            &>i {
                position: absolute;
                top:8px;
                right:5px;
                font-size:12px;
                cursor: pointer;
                color:#fff;
                &:hover {
                    // color:#e94242;
                }
            }
        }
    }
    .define-tags {
        display:flex;
        flex-wrap:wrap;
        padding:6px 0 0;
        color:#ccc;
        .d-items {
            margin-right:10px;
            margin-bottom:5px;
            border-radius:3px;
            padding:0px 4px;
            border:1px solid #f0f0f0;
            font-size:13px;
            cursor:pointer;
            &:hover {
                // color:#777;
                color:#fff;
                border-color:#87d2e8;
                background-color: #87d2e8;
                // border-color:#bbb;
                // background-color: #bbb;
            }
        }
    }
    .tag-input {
        position: relative;
        ul {
            position: absolute;
            top:38px;
            left:0px;
            background-color: #fff;
            // border:1px solid #63c1dd;
            box-shadow: 0 0 4px #aaa;
            padding:3px 0;
            z-index:2 ;
            max-height:300px;
            // overflow-y: scroll;
            // border-radius:2px;
            li {
                height:26px;
                line-height:26px;
                padding:0 22px 0 7px;
                cursor:pointer;
                &:hover {
                    background-color: #e7e7e7;
                }
            }

            li.tag-empty-show {
                cursor:auto;
                color:#aaa;
                &:hover {
                    background-color: transparent;
                }
            }

        }
        .search-items-box {
            li.active {
                background-color: #e7e7e7;
            }
        }
        .btn-add {
            position: absolute;
            top:4px;
            left:70px;
            transition: all .1s;
        }
        .tag-err-msg {
            position: absolute;
            left:2px;
            top:-20px;
            font-size:13px;
            color:red;
            background-color: #fdebeb;
            padding:1px 3px;
            border-radius:3px;
        }
    }
    .img-upload-cover {
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
        position: fixed;
        left: 0;
        top:0;
        z-index:4;
        .show-img {
            height: 200px;
            width:300px;
            // background-color: #fff;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            img {   
                height:100%;
                width:100%;
                object-fit: contain;
            }
            .progr {
                position:absolute;
                top:210px;
                left:0;
                background-color: #eee;
                width:100%;
            }
        }
    }

    .err-message {
      display:block;
      color: red;
      line-height: 25px;;
      font-size: 13px;
      margin-bottom:-8px;
    }

    @media screen and (max-width:992px) {
            .item .content {
                padding:20px 0px;
            }
            .user-info {
                .l-box {
                    border-bottom:1px solid transparent;
                }
            }
            p {
                font-size:12px;
            }
    }
    @media screen and (max-width:475px) {
        td,th {
            font-size:12px !important;
        }
    }
}
</style>
<style>
    .accountdoc .el-autocomplete-suggestion__wrap {
        margin-bottom:0 !important;
    }
    .accountdoc .el-input__inner {
        /*border:none;*/
        line-height: 36px;
        height: 36px;
    }
    #tags-container .el-input__inner {
        border:none;
        /*max-width:250px;*/
        width:100%;
        padding-right:70px;
    }
    .w-e-text-container {
        z-index:0 !important;
        height:auto !important;
        min-height:300px;
        max-height:620px;
        border-radius:0 0 3px 3px;
    }
    .w-e-text {
        min-height:300px;
        max-height:620px;
        padding-top:10px ;
        height:auto;
        font-size:15px;
    }
    .w-e-toolbar .w-e-menu {
        z-index:1 !important;
        margin-right: 2px;
    }
    .w-e-toolbar {
        display:flex !important;
        flex-wrap:wrap;
        border-radius:3px 3px 0 0 ;
    }
    /*隱藏 插入代碼 表情  链接*/
    /* .w-e-toolbar>div:nth-last-child(3),
    .w-e-toolbar>div:nth-last-child(7),
    .w-e-toolbar>div:nth-last-child(11) { */
    .w-e-toolbar>div:nth-of-type(10),
    .w-e-toolbar>div:nth-of-type(14),
    .w-e-toolbar>div:nth-of-type(18){
        display:none !important;
    }
    /*隱藏 插入視頻*/
    .w-e-toolbar>div:nth-last-child(4) {
        /*display:none !important;*/
    }
    .el-autocomplete-suggestion__wrap {
        margin-bottom:0 !important;
    }
    .accountdoc .el-input__inner {
        /*border:none;*/
        line-height: 36px;
        height: 36px;
    }
    .w-e-toolbar .w-e-droplist {
        /* background:#caccd4 */
    }
    .w-e-toolbar .w-e-droplist .w-e-dp-title {
        /* color:#333; */
    }
    .w-e-toolbar .w-e-droplist ul.w-e-block{
        display:flex;
        justify-content: center;
        flex-wrap:wrap;
        padding:6px 0px;
    }
    .w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {
        border:1px solid #eee;
        margin:2px;
        padding:3px;
        height:24px;
    }
    .w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {
    }
</style>


