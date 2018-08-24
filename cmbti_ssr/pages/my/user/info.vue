<template>
  <div class="my-comp">
      <MyInfo ></MyInfo>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
// import moment from '~/plugins/moment'
// import utils from '~/plugins/utils'
import MyInfo from '~/components/my/my_info'
export default {
    data(){
        return {
        }
    },
    components: {
        MyInfo
    },
    head () {
        return {
            title: '个人中心-个人信息',
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
