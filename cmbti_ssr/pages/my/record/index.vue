<template>
  <div class="my-comp">
      <MyRecord ></MyRecord>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import MyRecord from '~/components/my/my_record'
export default {
    data(){
        return {
        }
    },
    components: {
        MyRecord
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
