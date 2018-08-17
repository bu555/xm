<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/common/nav'
export default {
  name: 'App',
  components:{
    Nav
  }
}
</script>

<style lang="less">
@import '../static/css/base.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;

  .h5-bx {
    max-width:1180px;
    margin:0 auto;
  }
}
</style>
