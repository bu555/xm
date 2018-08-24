<template>
  <div class="my-comp">
      <MyPayment ></MyPayment>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import MyPayment from '~/components/my/my_payment'
export default {
    data(){
        return {
        }
    },
    components: {
        MyPayment
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
