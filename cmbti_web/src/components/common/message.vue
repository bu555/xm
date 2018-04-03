<template>
  <div class="message">
      <div class="prompt ec-bounce-in-t">
            登陆后操作
      </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
.message {
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-color: rgba(0,0,0,.5);
    padding-top:1px;
    border-top:1px solid transparent;
    z-index:9999;
    .prompt {
        width:280px;
        height:200px;
        background-color: skyblue;
        margin:100px auto;
    }
}
</style>


