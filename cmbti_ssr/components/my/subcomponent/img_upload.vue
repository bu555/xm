<template>
<div class="crop" v-loading="loading">

    <div class="upload-view" style="max-width:320px;height:300px;margin:0 auto 2px;">
        <vueCropper
        ref="cropper"
        :img="baseImgURL"
        :outputSize="1"
        :outputType="'jpg'"
        :fixedBox="true"
        :autoCrop="true"
        :autoCropWidth="175"
        :autoCropHeight="175"
        @realTime="realTime"
        @canMove="false"
        ></vueCropper>
    </div>
    <!--<input type="file" @change="readImage" ref="upload" style="margin:2% 2% 5%;">-->
    <div style="color:red;height:20px;"><i v-if="fileTypeErr" class="el-icon-warning" style="color:#f16a6e"></i> {{fileTypeErr}}</div>




    <!--预览视图-->
    <!--<div class="show-preview">
        <div :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <img :src="baseImgURL" :style="previews.img">
        </div> 
    </div>-->
    <!--<div class="btns">
        <button v-if="!readyUpload" type="button" class="btn" disabled style="margin-right:12px">圖像保存</button> 
        <button v-if="readyUpload" type="button" class="btn btn-primary" @click="save()" style="margin-right:12px">圖像保存</button>
        <button type="button" class="btn " @click="callClose()">取 消</button> 
    </div>-->
    <div class="btns">
        <button type="button" class="file-btn btn btn-success" style="margin-right:12px">選擇文件
            <input type="file" name="" id="" @change="readImage" ref="upload">
        </button>
        <!--<button v-if="!readyUpload" type="button" class="btn" disabled style="margin-right:12px">圖像保存</button> -->
        <button v-if="readyUpload" type="button" class="btn btn-primary" @click="save()" style="margin-right:12px">圖像保存</button>
        <button type="button" class="btn btn-default " @click="callClose()">取 消</button> 
    </div>
    <div style="color:#aaa;height:25px;padding:12px 0 0 5px;">支持jpg、jpeg、png、gif、webp、bmp格式</div>

</div>  
  
</template>


<script>
import VueCropper from '~/plugins/vue-cropper'
import axios from '~/plugins/axios'
export default {
  data(){
      return{
            previews:{},
            baseImgURL:'',
            loading:false,
            readyUpload:false,
            fileTypeErr:''

      }
  },
  components:{
      VueCropper
  },
  methods:{
    readImage(){
        const reader = new FileReader();
        reader.onload = (e) => {
            const src = e.target.result;
            this.baseImgURL = src
        };
        if (this.$refs.upload.files && this.$refs.upload.files[0]) {
            let fileType = this.$refs.upload.files[0].type
            if(!/image\/\w+/.test(fileType)){
                this.fileTypeErr = '不支持此文件格式！'
                this.readyUpload = false
            }else{
                this.fileTypeErr = ''
                this.readyUpload = true
            }
            
            reader.readAsDataURL(this.$refs.upload.files[0]);
        }
    },
    realTime (data) {
        this.previews = data
    },
    save(){
        this.loading = true
        this.$refs.cropper.getCropBlob((data) => { 
            let uploadData = new FormData();
            uploadData.append('file', data,'avatar.png');
            axios.account.uploadAvatar(uploadData).then((res=>{
                this.loading = false
                if(res.data){
                    this.callClose(true)
                    this.$message({
                    message: '操作成功！',
                    type: 'success'
                    });
                }
            })).catch(err=>{
                this.loading = false
                console.log(err);
            })
        })
    },
    callClose(success=false){
        this.$emit('closeMe',success)
    },
      
  },
  mounted(){
  }

}
</script>
<style lang="less">
.crop {
    margin:0 auto;
    background-color: #fff;
    margin-top:-5% auto;
    // margin:-10% -20% -20%;
    position: relative;
    min-height:400px;
    max-width:320px;
    .show-preview {
        position: absolute;
        right:30px;
        top:30px;
    }
    .btns {
        text-align: center;
        padding-top:0px;
    }
    .vue-cropper {
    // background: #7a7a7a;
    // border:1px solid #999;
    }
    .file-btn {
        position: relative;
        display: inline-block;
        // background: #D0EEFF;
        // border: 1px solid #99D3F5;
        // border-radius: 4px;
        // padding: 4px 12px;
        overflow: hidden;
        // color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
    }
    .file-btn input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    // .file-btn:hover {
    //     background: #AADFFD;
    //     border-color: #78C3F3;
    //     color: #004974;
    //     text-decoration: none;
    // }
}
</style>


