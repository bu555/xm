<template>
  <div class="s">
      <h2>my Demo</h2>
      <el-button @click="postMsg">发送</el-button>
  </div>
</template>

<script>
export default {
    methods:{
        postMsg(){
                navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage('Refresh');
        }
    }
}
</script>


<style lang="less" >
.s {
    max-width :1180px;
    margin:0 auto 30px;
    overflow: hidden;
    padding-top:15px;
  
}
</style>
