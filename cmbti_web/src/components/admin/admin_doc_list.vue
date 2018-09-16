<template>
<div class="admin-content">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="Date"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.c_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="Category"
        width="180">
      </el-table-column>
      <el-table-column
        prop="key"
        label="Key"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="180">
      </el-table-column>
      <el-table-column
        label="Ctrl">
        <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="editor-base-style" v-html="doc&&doc.content"></div>
</div>
</template>
<script>
export default {
  data() {
    return {
        tableData: [
          // {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }
        ],

        loading:false,

    }
  },
  methods:{
      getDocument(){
            this.loading = true
            this.$axios.getDocument({
                category:'personality'
            }).then(res=>{
                this.loading = false
                if(res.data.success){
                    let d = JSON.parse(res.data.data);
                    let temp = []
                    for(let key in d){
                        // 转换日期
                        d[key].c_time = this.$moment(d[key].c_time).format('YYYY-MM-DD HH:mm:ss')
                        // 添加Category
                        d[key].category = res.data.category
                        d[key].ctrl = '<p>99</p>'
                        temp.push(d[key])
                    }
                    this.tableData = temp
                }
            }).catch(err=>{
                this.loading = false
            })
      }
  },
  created(){
    this.getDocument()
    // console.log('moment:',this.$moment(this.$moment(new Date()).utc().format()).format('YYYY-MM-DD HH:mm:ss')  );
  }
}
</script>
<style lang="less">
.admin-content {

}
</style>


