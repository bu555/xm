<template>
  <div class="my-comp">
      <MyDashboard ></MyDashboard>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from '~/plugins/moment'
// import utils from '~/plugins/utils'
import MyDashboard from '~/components/my/my_dashboard'
export default {
    data(){
        return {
        }
    },
    components: {
        MyDashboard
    },
    // middleware: 'userAuth',
    head () {
        return {
            title: '个人中心-仪表板',
            meta: [
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    async fetch({store}){

    },
    async asyncData ( {req} ) {

    },
    created(){
    }
}
</script>

<style lang="less">
.my-comp {

}

</style>
