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
      <el-form-item label="名字">
        <el-input v-model="infoForm.r_name" :disabled="!infoForm.modify" spellcheck=false></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-select v-model="infoForm.province"  placeholder="省份" style="width:100%" v-if="provinceList">
            <el-option
            v-for="(item,i) in provinceList"
            :key="i"
            :label="item.name"
            :value="item.name">
                <span style="float: left">{{item.name}}</span>
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="infoForm.city" filterable placeholder="城市" style="width:100%"  v-if="cityList">
          <el-option
          v-for="(item,i) in cityList"
          :key="i"
          :label="''"
          :value="item.name">
              <span style="float: left">{{item.name}}</span>
          </el-option>
        </el-select>
        <el-select filterable placeholder="城市" style="width:100%"  v-else>
          <el-option
          v-for="(item,i) in 1"
          :key="i"
          :label="''"
          :value="'中国'">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="infoForm.sex" size="medium">
          <el-radio label="1">男 <i class="fa fa-mars"></i> </el-radio>
          <el-radio label="0">女 <i class="fa fa-venus"></i></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :rows="3" v-model="infoForm.profile" spellcheck=false></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button v-if="edited" type="primary" @click="modifyUserInfo">保 存</el-button>
        <el-button v-else type="primary" disabled>保 存</el-button>
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
            profile:'',
            province:''
        },
        loading:false,
        initData:'',
        edited:false,

        cityList:'',
        provinceList:''
      }
    },
    watch:{
      "$store.state.userInfo":function(){
          this.init()
      },
      "infoForm" : {
          handler:function() {   //特别注意，不能用箭头函数，箭头函数，this指向全局
              if(JSON.stringify(this.infoForm)!==JSON.stringify(this.initData)){
                    this.edited = true
              }else{
                    this.edited = false
              }
          },
          deep: true    //深度监听
      },
      "infoForm.province":function(){
          if(this.infoForm.province){
                this.provinceList.forEach((v,i)=>{
                    if(v.name===this.infoForm.province){
                        this.getCities(v.code)
                    }
                })
          }
      }
    },
    methods:{
        modifyUserInfo(){
            this.loading = true
            // 修改账户信息
            if(this.infoForm.r_name !=this.initData.r_name){
              this.infoForm.new_r_name = this.infoForm.r_name
            }
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
        getCities(provinceCode){
            this.cityList = ''
            this.$axios.getCities({provinceCode:provinceCode}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.cityList = res.data.data
                    this.infoForm.city = this.cityList[0].name
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getProvinces(callback){
            this.$axios.getProvinces({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.provinceList = res.data.data
                    callback&&callback()
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        init(){
          this.infoForm = JSON.parse(localStorage.getItem('USER'))
          this.initData = JSON.parse(localStorage.getItem('USER'))
        }
    },
    created(){
      // this.getCities()
      this.getProvinces(()=>{
            this.init()
      })
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

