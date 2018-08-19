<template>
    <div id="v-h5-edotor">
        <vue-html5-editor :content="content" :height="200" width="100%" spellcheck="false" @change="updateData" ></vue-html5-editor>
    </div>
</template>
<script>
import VueHtml5Editor from 'vue-html5-editor'
import Vue from 'vue'
import editorConfig from './editor.config'
Vue.use(VueHtml5Editor, editorConfig)
export default {
    data(){
        return {
            content:''
        }
    },
    props:[
        'articleContent'
    ],
    watch:{
        'articleContent':function(val){
            this.content = val
        }
    },
    methods:{
        updateData(html){
            this.content = html
            this.$emit('changeContent',this.content)
        },
    },
    created(){
        if(this.articleContent){
            this.content = this.articleContent
        }
    }
}
</script>
<style lang="less" scoped>
 #v-h5-edotor {
    // ul, ol { list-style:initial; }
    form {
        background-color: red;
    }
 }
</style>
<style>
    .vue-html5-editor>.toolbar>ul {
        background-color: #f2f4f6;

    }
</style>



