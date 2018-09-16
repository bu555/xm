<template>
<div class="admin-content-new">
  <el-form ref="form" label-width="55px">
      <el-form-item label="Category">
        <el-input v-model="form.category" spellcheck="false"></el-input>
      </el-form-item>
  </el-form>
  <el-form ref="form" label-width="55px">
      <el-form-item label="Key">
        <el-input v-model="form.key" spellcheck="false"></el-input>
      </el-form-item>
  </el-form>
  <el-form ref="form" label-width="55px">
      <el-form-item label="标题">
        <el-input v-model="form.title" spellcheck="false"></el-input>
      </el-form-item>
  </el-form>
  <el-form ref="form" label-width="55px">
      <el-form-item label="标题">
        <wangEditor @changeContent="getContent" :articleContent="initData.content"></wangEditor>
      </el-form-item>
  </el-form>
  <el-button type="primary" @click="submit()">提 交</el-button>

</div>
</template>
<script>
import wangEditor from '@/components/forum/editor/wEditor'
export default {
    data() {
      return {
        form:{
          content:'',
          title:'',
          key:'',
          category:'personality'
        },
        initData:{
          content:''
        },
        loading:false

      }
    },
    components:{
        wangEditor,
    },
    methods:{
        getContent(c){
            this.form.content = c
        },
        submit(){
            this.loading = true
            this.$axios.setDocument({
                title:this.form.title.trim(),
                content:this.form.content.trim(),
                key:this.form.key,
                category:this.form.category
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.data.message || '操作失败！',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                this.loading = false
            })
        }

    }
}
</script>
<style lang="less">
.admin-content-new {

}
</style>


