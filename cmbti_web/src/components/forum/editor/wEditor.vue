<template>
    <!--编辑器-->
    <div id="editor" class="" spellcheck="false" >
        <!--<p>Welcome!</p>-->
    </div>
</template> 
<script>
import E from './wangEditor.js'
export default{
    data(){
        return{

        }
    },
    props:[
        // 所需编辑内容
        'articleContent'
    ],
    watch:{
        'articleContent':function(){
            if(this.articleContent){
                this.editor.txt.html(this.articleContent)
            }
        }
    },
    methods:{
        initEditor(){
            let e = E()
            this.editor = new e('#editor') 

            this.editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
            // 配置服务器端地址
            // this.editor.customConfig.uploadImgServer = accountAxios.path  +'api/Upload/Imges'
            this.editor.customConfig.uploadImgServer = ''
            this.editor.customConfig.withCredentials = true

            this.editor.customConfig.customUploadImg = (files, insert)=> {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                console.log(files[0]);
                    let uploadData = new FormData();
                    uploadData.append('file', files[0],files[0].name);
                    uploadData.append('type', 'article');
                    console.log(uploadData);
                    this.$axios.uploadImage(uploadData).then(res=>{
                        if(res.data.success){
                            
                            console.log('1',process.env.NODE_ENV);
                        if(process.env.NODE_ENV === "development"){
                            
                        }
                            insert('/apis'+res.data.url)
                        }
                    }).catch(err=>{

                    })

                    // if(files[0].size/1000/1024>100){    //不大於100M
                    //     return {
                    //         prevent: true,
                    //         msg: '圖片大小不可超過100M'
                    //     }
                    // }



                // 上传代码返回结果之后，将图片插入到编辑器中
                // insert('/static/img/ni.jpg')
            }


            let _this = this
            //  this.editor.create()
            console.log('this.config',this.editor.config);




            this.editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.uploadingBase64 = this.result;
                        _this.coverImg.tempBase64 = this.result
                        console.log(files[0]);
                    }
                    console.log(files);




                    reader.readAsDataURL( files[0] );
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    if(files[0].size/1000/1024>100){    //不大於100M
                        return {
                            prevent: true,
                            msg: '圖片大小不可超過100M'
                        }
                    }
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
                        // imgURL = process.env.API_HOST + imgURL
                    }
                    // _this.editor.txt.append('<img src="'+imgURL+'">')
                    _this.coverImg.list.push({
                        url:imgURL,
                        base64: _this.coverImg.tempBase64
                    })
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
            weText.classList.add('editor-base-style')
            weText.blur()
            weText.addEventListener('blur',()=>{
                document.querySelector('.w-e-text-container').classList.remove('focus')
            })
            weText.addEventListener('focus',()=>{
                document.querySelector('.w-e-text-container').classList.add('focus')
            })
            weText.addEventListener('input',()=>{
                this.$emit('changeContent',this.editor.txt.html())
            })
            // 如父组件有内容（即编辑）
            if(this.articleContent){
                this.editor.txt.html(this.articleContent)
            }
            // let toolbar = document.querySelector('.w-e-toolbar')
            // let trad = toolbar.firstChild.cloneNode()
            // trad.innerHTML = `<i>繁</i>`
            // toolbar.appendChild(trad)
            // let simp = toolbar.firstChild.cloneNode()
            // simp.innerHTML = `<i>简</i>`
            // toolbar.appendChild(simp)
            // trad.addEventListener('click',this.s2t)
            // simp.addEventListener('click',this.t2s)

        },
        // //   简体转繁体
        // s2t(){
        //     this.editor.txt.html(Chinese.s2t(this.editor.txt.html())) 
        //     this.article.title = Chinese.s2t(this.article.title) 
        // },
        // //   繁体转简体
        // t2s(){
        //     this.editor.txt.html(Chinese.t2s(this.editor.txt.html())) 
        //     this.article.title = Chinese.t2s(this.article.title) 
        // },
    },
    mounted(){
        this.initEditor()
    },
    created(){
    }
}
</script>  
<style lang="less">
    #editor {
        // border:1px solid #dcdfe6;
        // border-radius:4px;
        text-align:left;
    }
</style>
<style>
    .w-e-text-container {
        z-index:0 !important;
        height:auto !important;
        min-height:300px;
        max-height:620px;
        border-radius:0 0 3px 3px;
        overflow: hidden;
        border:1px solid #dcdfe6 !important;
    }
    .w-e-text-container.focus {
        border:1px solid #bcdae5 !important;
    }
    .w-e-text-container .w-e-text {
        min-height:300px;
        max-height:620px;
        padding:10px;
        height:auto;
        overflow-y: auto;
        background-color: #fff;
    }
    .w-e-toolbar .w-e-menu {
        z-index:1 !important;
        margin-right: 2px;
        line-height: 30px;
        /* font-size:14px; */
    }
    .w-e-droplist {
        /* z-index:10002 !important;
        background-color: lime !important; */
    }
    .w-e-toolbar {
        display:flex !important;
        flex-wrap:wrap;
        border-radius:3px 3px 0 0 ;
        border:1px solid #dcdfe6 !important;
        border-bottom:none !important;
        background-color: #fafafa !important;
    }
    /*隱藏 插入代碼 表情  链接*/
    /* .w-e-toolbar>div:nth-last-child(3),
    .w-e-toolbar>div:nth-last-child(7),
    .w-e-toolbar>div:nth-last-child(11) { */

    /* .w-e-toolbar>div:nth-of-type(10),
    .w-e-toolbar>div:nth-of-type(14),
    .w-e-toolbar>div:nth-of-type(18){
        display:none !important;
    } */

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
    .w-e-toolbar h1,.w-e-toolbar h2,.w-e-toolbar h3 {
        line-height: 0.8 !important;
        text-align:left;
        padding-left:.3em;
        color:#333;
    }
</style>
