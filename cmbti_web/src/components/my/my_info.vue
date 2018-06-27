<template>
  <div class="my-info" v-loading="loading">
    <div class="m-title" style="padding:0px 5px 10px;margin-bottom:5px;border-bottom:1px solid #cee1f5">
      <router-link to="/my">
      <i class="fa fa-reply" style="font-size:17px;margin-left:-2px;padding:5px 10px 5px 5px;color:#777"></i> 
      </router-link>
      <span style="padding:0 10px 0 2px;color:#ddd">|</span>
      <i class="fa fa-user-o"></i> 个人档案
    </div>
    <el-form ref="form" :model="infoForm" label-width="80px" size="small">
      <el-form-item label="昵称">
        <el-input v-model="infoForm.r_name"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="infoForm.city" placeholder="请选择活动区域" style="width:100%">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="廣州" value="廣州"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="infoForm.sex" size="medium">
          <el-radio label="1">男 <i class="fa fa-mars"></i> </el-radio>
          <el-radio label="0">女 <i class="fa fa-venus"></i></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="4" v-model="infoForm.profile"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="modifyUserInfo">保 存</el-button>
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
      return {
        infoForm:{
            r_name:'',
            city:'',
            birth:'',
            sex:'',
            profile:''
        },
        loading:false
      }
    },
    watch:{
      "$store.state.userInfo":function(){
          this.init()
      }
    },
    methods:{
        modifyUserInfo(){
            this.loading = true
            // 修改账户信息
            this.$axios.modifyUserInfo(this.infoForm).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.$store.state.refUser = true
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        init(){
          this.infoForm = JSON.parse(localStorage.getItem('USER'))
        }
    },
    created(){
      this.init()
    }
}
</script>
<style lang="less">
.my-info {
  // max-width:370px;
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  form {
    padding-top:15px;
    max-width:404px;
  }
  @media screen and (max-width:525px) {
      form {
        .el-form-item__label {
          width:45px !important;
        }
        .el-form-item__content {
          margin-left:45px !important;
        }
      }
  }
}
</style>

