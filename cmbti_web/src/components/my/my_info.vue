<template>
  <div class="my-info">
    <el-form ref="form" :model="infoForm" label-width="80px" size="mini">
      <el-form-item label="昵称">
        <el-input v-model="infoForm.r_name"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="infoForm.city" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="infoForm.sex" size="medium">
          <el-radio label="1">男 <i class="fa fa-mars"></i> </el-radio>
          <el-radio label="0">女 <i class="fa fa-venus"></i></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="infoForm.profile"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保 存</el-button>
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
        }
      }
    },
    methods:{
      onSubmit(){

      }
    }
}
</script>
<style lang="less">
.my-info {
  max-width:370px;
  padding-top:22px;
  padding-bottom:22px;
  @media screen and (max-width:500px) {
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

