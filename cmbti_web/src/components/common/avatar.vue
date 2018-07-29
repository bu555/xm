<template>
    <div id="my-active">
        <router-link :to="to">
        <img :src="src" alt="">
        </router-link>
    </div>
</template>
<script>
export default {
  props:{
      size:{
          default: 'small'
      },
      src:{
          default: ''
      },
      to:{
          default: ''
      }
  }
}
</script>

<style lang="less" scoped>
    #my-active{
        display:inline-block;
        img {
            display:inline-block;
            width:28px;
            height:28px;
            border-radius:50%;
            border:1px solid #eee;
        }
    }
</style>

