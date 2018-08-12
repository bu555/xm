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
      <el-form-item label="昵称" class="name-form">
        <el-input v-if="infoForm.modify" v-model="infoForm.r_name" @focus="notModifyHandler()" spellcheck=false></el-input>
        <div id="no-modify-name" v-else>{{infoForm.r_name}}
        </div>
        <i @click="notModifyHandler()">?</i>
        <div id="info-msg" v-if="showNotModify">注：昵称180天内只允许修改一次</div>
      </el-form-item>
      <!-- <el-form-item label="省份">
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

      </el-form-item> -->
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
        china:'', //中国省城数据
        hotCityList:'', //热门城市
        cityAll:'', //所有城市
        cityList:[{name:'未选择'}], //按省提取的城市
        provinceList:'', //省份
        showNotModify:false,
        timeID:'',

      }
    },
    watch:{
      "$store.state.userInfo":"getUser",
      "infoForm" : {
          handler:function() {   //注：箭头函数，this指向全局
              if(JSON.stringify(this.infoForm)!==JSON.stringify(this.initData)){
                    this.edited = true
              }else{
                    this.edited = false
              }
          },
          deep: true    //深度监听
      },
    //   "infoForm.province":function(){
    //       this.infoForm.city = ''
    //       this.getCityByProvince()
    //   }
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
                    this.$store.state.refUser += 1
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        getChina(callback){
            this.$axios.getChina({}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.china = res.data.data
                    callback&&callback()
                }
            }).catch(err=>{
                this.loading = false
            })
        },
        notModifyHandler(){
            clearTimeout(this.timeID)
            this.showNotModify = true
            this.timeID = setTimeout(()=>{
                this.showNotModify = false
            },7555)
        },
        getCityByProvince(){
            for(let i=0;i<this.provinceList.length;i++){
                if(this.provinceList[i].name===this.infoForm.province){
                    let provinceCode = this.provinceList[i].code
                    let list = []
                    this.china.cities.forEach((v,i)=>{
                        if(v.provinceCode===provinceCode){
                            list.push(v)
                        }
                    })

                    this.cityList = list
                    if(this.infoForm.city){

                    }
                    return
                }
            }
        },
        getUser(){
            this.infoForm = JSON.parse(localStorage.getItem('USER'))
            this.initData = JSON.parse(localStorage.getItem('USER'))
        },
        init(){
            this.provinceList = this.china.provinces
            this.getUser()
            if(this.infoForm.province){
                this.getCityByProvince()
            }
        }
    },
    created(){
        this.getUser()
        // if(localStorage.getItem('CHINA')){
        //     this.china = JSON.parse(localStorage.getItem('CHINA'))
        // }else{
        //     this.getChina(this.init)

        // }
    }
}
</script>
<style lang="less">
.my-info {
  // max-width:370px;
  padding:4%;
  padding-top:12px;
  padding-bottom:22px;
  .name-form {
        position:relative;
        i {
            position:absolute;
            right:9px;
            top:8px;
            color:#fff;
            cursor: pointer;
            height:18px;
            width:18px;
            line-height: 18px;
            text-align: center;
            border-radius:50%;
            background-color: #ddd;
            &:hover {
                background-color: #ffc55f;
            }
        }
        #info-msg {
            position:absolute;
            left:0px;
            top:26px;
            color:#ffaf4b;
            font-size:13px;
        }
  }
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

