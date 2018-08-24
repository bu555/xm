<template>
  <div class="my-comp">
      <MyRecordItem ></MyRecordItem>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import MyRecordItem from '~/components/my/my_record_item'
export default {
    data(){
        return {
        }
    },
    components: {
        MyRecordItem
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
