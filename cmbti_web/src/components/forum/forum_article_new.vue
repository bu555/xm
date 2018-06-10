<template>
<div class="forum-new">
    <div class="main-box">
        <div class="title">
            <!--<i class="icon iconfont icon-brush" style="font-size:22px"></i>-->
            <i class="el-icon-edit" style="font-size:20px;padding-right:5px"></i>
            <font> 创建文档</font>
        </div>
        <div class="my-editor">
            <el-form ref="form" :model="form">
                <div class="f-items">
                    <label for="">标题：</label>
                    <el-input v-model="form.title" spellcheck="false"></el-input>
                </div>
                <div class="f-items">
                    <label for="">分类：</label>
                    <el-radio-group v-model="form.category">
                        <el-radio label="share">分享</el-radio>
                        <el-radio label="ask">问答</el-radio>
                    </el-radio-group>
                </div>
                <div class="f-items ed">
                    <label for="" style="vertical-align: middle">内容：</label>
                    <!--<el-input v-model="form.title"></el-input>-->
                    <div class="html5-editor" stylel="width:600px" >

        <!--<quill-editor :content="form.content"
                        :options="editorOption"
                        @change="onEditorChange($event)">
        </quill-editor>-->

                    <vue-html5-editor :content="initContent" :height="200" width="100%" @change="updateData" ></vue-html5-editor>
                    <!--<editor :content="content" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false"></editor>-->
                
                    </div>
                </div>
                <div class="f-items" style="padding-top:20px">
                    <label for=""></label>
                    <el-form-item>
                        <el-button type="primary" @click="submitArticle()">提交</el-button>
                        <el-button @click="$router.push({path:'/forum'})">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 5">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <ol>
                <li>jjj</li>
                <li>jjj</li>
            </ol>
        </div>
    </div>
</div> 
</template>
<script>
// require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'


import VueHtml5Editor from 'vue-html5-editor'
export default {
    data(){
        return {
            form:{
                title:'',
                type:'',
                category:'',
                content:''
            },
            initContent:'',
        }
    },
    components: {
        // quillEditor,
        // 'editor1' : new VueHtml5Editor(this.options1)
    },
    mounted(){
            this.$message({
          showClose: true,
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
    },
    methods:{  
        submitArticle(){
            console.log(this.form.title);
            console.log(this.form.category);
            console.log(this.form.content);
            // input : {uid:'',title:'',category:'share',content:''}
            this.$axios.articlePublish({
                title:this.form.title,
                category:this.form.category,
                content:this.form.content
            }).then(res=>{
                if(res.success){
                    
                }
            })
        },
        updateData(html){
            this.form.content = html
            console.log(this.form.content);
        },
        init(){

        }

    },
    created(){
        
    }
    
};
</script>
<style lang="less">
.forum-new {
    max-width:1180px;
    margin:12px auto;
    position: relative;
    display:flex;
    
    .main-box {
        flex:1;
        background-color: #fff;
        margin-bottom:12px;
        width:100%;
        .title {
            font-size:17px;
            background-color: #fcfcfc;
            padding:12px;
            padding-left:4%;
            vertical-align: middle;
            display:flex;
            align-items:center;
        }
        .my-editor {
            padding:3%;
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
    }
}

</style>
    