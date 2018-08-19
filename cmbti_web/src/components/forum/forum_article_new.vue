<template>
<div class="forum-new">
    <div class="main-box">
        <div class="title">
            <!--<i class="icon iconfont icon-brush" style="font-size:22px"></i>-->
            <div v-if="aid">
                <i class="el-icon-edit-outline" style="font-size:20px;padding-right:3px;position:relative;top:2px"></i>
                <font> 编辑文档</font>
            </div>
            <div v-else>
                <i class="el-icon-edit" style="font-size:20px;padding-right:5px"></i>
                <font> 创建文档</font>
            </div>
        </div>
        <div class="my-editor">
            <el-form ref="form" :model="form">
                <div class="f-items">
                    <label for="">标题：</label>
                    <el-input v-model="form.title" spellcheck="false" @blur="verify('title')"></el-input> </br>
                    <!--<div class="err-message" >*文章標題要求為10~96字節</div>-->
                </div>
                <div class="err-message" v-if="ver.title==='empty'">*请输入标题</div>
                <div class="err-message" v-if="ver.title==='notPass'">*标题字数需在2-120个之间</div>
                <div class="f-items">
                    <label for="">分类：</label>
                    <el-radio-group v-model="form.category" @change="verify('category')">
                        <el-radio label="share">分享</el-radio>
                        <el-radio label="ask">问答</el-radio>
                    </el-radio-group>
                </div>
                <div class="err-message two" v-if="ver.category==='empty'">*请选择分类</div>
                <div class="f-items ed">
                    <label for="" style="vertical-align: middle">内容：</label>
                    <!--<el-input v-model="form.title"></el-input>-->
                    <div class="html5-editor" stylel="width:600px" >

                    <!--<vue-html5-editor :content="form.content" :height="200" width="100%" spellcheck="false" @change="updateData" ></vue-html5-editor>-->
                    <VueHtml5Editor @changeContent="getContent" :articleContent="editContent"></VueHtml5Editor>
                
                    </div>
                </div>
                <div class="err-message" v-if="ver.content==='empty'">*请输入内容</div>
                <div class="f-items" style="padding-top:20px">
                    <label for=""></label>
                    <el-form-item>
                        <el-button type="primary" @click="submitArticle()">提交</el-button>
                        <el-button @click="$router.go(-1)">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</div> 
</template>
<script>
import VueHtml5Editor from './editor/editor'
export default {
    data(){
        return {
            form:{
                title:'',
                category:'',
                content:''
            },
            loading:false,
            aid:'',
            editAid:'',
            editContent:'',
            // 输入验证
            ver:{
                title:'',
                category:'',
                content:'',
                all:''
            },
        }
    },
    components: {
        VueHtml5Editor
        // quillEditor,
        // 'editor1' : new VueHtml5Editor(this.options1)
    },
    mounted(){
    },
    methods:{  
        verify(type){
            if(type==='title' || type==='all'){
                this.form.title = this.$utill.strTrim(this.form.title)
                if(!this.form.title){
                    this.ver.title = 'empty'
                }else{
                    let len = this.form.title.length
                    if(len<2 || len>120){
                        this.ver.title = 'notPass'
                    }else{
                        this.ver.title = 'pass'
                    }
                }
            }
            if(type==='category' || type==='all'){
                if(!this.form.category){
                    this.ver.category = 'empty'
                }else{
                    this.ver.category = 'pass'
                }
            }
            if(type==='content' || type==='all'){
                this.form.content = this.form.content.trim()
                let len = this.form.content.length
                if( !(this.form.content.replace(/<\/?.+?\/?>/g,'').trim()) ){
                    this.ver.content = 'empty'
                }else{
                    this.ver.content = 'pass'
                }
            }
            if(this.ver.title==='pass' && this.ver.content==='pass' && this.ver.category==='pass'){
                this.ver.all='pass'
            }else{
                this.ver.all='notPass'
            }

        },
        submitArticle(){
            // console.log(this.form.content)
            // return
            this.verify('all')
            if(!this.ver.all) return
            // if( !(this.form.title.trim()) || !(this.form.category.trim()) || !(this.form.content.trim()) ){
            //     return  this.$message({
            //                 message: '内容输入不完整！',
            //                 type: 'warning'
            //             });
            // }
            this.loading = true
            this.$axios.articlePublish({
                title:this.form.title.trim(),
                category:this.form.category.trim(),
                content:this.form.content.trim(),
                aid:this.editAid
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.form.title = ''
                    this.form.category = ''
                    this.form.content = ''
                    this.aid = ''
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    if(this.editAid){
                        this.$router.go(-1)
                    }
                }
            }).catch(err=>{
                this.loading = false
            })
        },

        getArticleById(){
            this.loading = true
            this.$axios.getArticleById({aid:this.aid}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.editAid = this.aid
                    this.form.title = res.data.data.title
                    this.form.category = res.data.data.category
                    this.editContent = this.form.content = res.data.data.content
                    console.log('jjj',this.editContent);
                    console.log('lll',this.form.content);
                     
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getContent(c){
            this.form.content = c
            this.verify('content')
        }

    },
    created(){
        if(this.$route.path.indexOf('/article/edit/')>-1){
            this.aid = this.$route.path.split('/')[4]
            this.getArticleById()
        }
        
    }
    
};
</script>
<style lang="less">
.forum-new {
    max-width:970px;
    margin:12px auto;
    position: relative;
    display:flex;
    border-radius:4px 4px 0 0;
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        .title {
            font-size:17px;
            padding:15px;
            padding-left:4%;
            vertical-align: middle;
            display:flex;
            align-items:center;
            background-color: #778b9d;   
            color:#fff;   
        }
        .my-editor {
            padding:2%;
            // ul, ol ,li,ol { list-style:square; }
            ol {
                    // list-style-type: disc !important;
                    // list-style-position:outside !important;
            }
            form {
                .f-items {
                    display:flex;
                    align-items:center;
                    &>label {
                        color:#727478;
                        font-weight:400;
                        font-size:15px;
                        flex:0 0 65px;
                        text-align:right;
                        padding-right:3px;
                        
                    }
                    .html5-editor {
                        flex:1;
                        .content {
                            
                        }
                    }
                }
                .f-items.ed {
                    align-items: flex-start;
                }
                .el-radio-group {
                    padding:15px 0px 10px 0px;
                }
                .el-input__inner {
                    height:36px;
                }
            }
        }
    }
    .aside-box {
        flex:0 0 333px;
        margin-left:12px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:15px;
            margin:0 0 10px;
        }
    }
    a:hover {
        text-decoration:none;
    }
    .err-message {
      display:block;
      padding-top:4px;
      color: red;
      line-height: 14px;;
      font-size: 13px;
      margin-bottom:0px;
      padding-left:65px;
    }
    .err-message.two {
      position: relative;
      top:-7px;
      margin-bottom:5px;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {

        }
        .aside-box {
            flex:0 0 100%;
            margin-left:0;
        }

    }
    @media screen and (max-width:525px) {
        .main-box {
            .my-editor {
                form {
                    .f-items {
                        flex-wrap:wrap;
                        &>label {
                            flex:0 0 100%;
                            text-align:left;
                            padding-top:10px;
                        }
                    }
                    .el-radio-group {
                        padding:2px 0px 0px 5px;
                    }
                    .el-input__inner {
                        height:36px;
                    }
                }
            }
        }
        .err-message {
            padding-left:0px;
        }
        .err-message.two {
        top:0px;
        margin-bottom:0px;
        }
    }
}

</style>
    