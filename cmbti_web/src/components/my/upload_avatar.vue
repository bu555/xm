<template>
<div class="crop" v-loading="loading">

    <div class="upload-view" style="max-width:320px;height:300px;margin:0 auto;">
        <vueCropper
        ref="cropper"
        :img="baseImgURL"
        :outputSize="1"
        :outputType="'jpg'"
        :fixedBox="true"
        :autoCrop="true"
        :autoCropWidth="125"
        :autoCropHeight="125"
        @realTime="realTime"
        @canMove="false"
        ></vueCropper>
    </div>
    <input type="file" @change="readImage" ref="upload" style="margin:2% 2% 5%;">
    <!--预览视图-->
    <!--<div class="show-preview">
        <div :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <img :src="baseImgURL" :style="previews.img">
        </div> 
    </div>-->
    <div class="btns">
        <button v-if="!readyUpload" type="button" class="btn" disabled style="margin-right:12px">圖像保存</button> 
        <button v-if="readyUpload" type="button" class="btn btn-primary" @click="save()" style="margin-right:12px">圖像保存</button>
        <button type="button" class="btn " @click="callClose()">取 消</button>
    </div>

</div>
  
</template>


<script>
import VueCropper from 'vue-cropper'
export default {
  data(){
      return{
            previews:{},
            baseImgURL:'',
            loading:false,
            readyUpload:false

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
            this.readyUpload = true
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

            this.$axios.uploadPhoto(uploadData).then(res=>{
                this.loading = false;
                if(res.data.success){
                    console.log('success');
                }else{
                    this.$message({
                        showClose: true,
                        message: '上传失败',
                        type: 'error',
                        duration:2500
                    });
                }
            }).catch(res=>{
                this.loading = false;
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
    }

}
</style>


