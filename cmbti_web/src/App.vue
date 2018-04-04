<template>
  <div class="root-app">
      <myNav></myNav>
  </div>
</template>

<script>
import myNav from './components/common/nav'
export default {
  name: 'App',
  components: {
    myNav,
  },
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="less">
    .root-app {
    }
</style>
