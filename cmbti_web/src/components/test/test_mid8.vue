<template>
<div class="test-mid8">
    <!--<mySelect @getRes="myRes = sendRes($event)" question = "1、编辑和服务名称是IDR Labs Ltd45"></mySelect>  -->
    <mySelect @getRes="myRes=((val)=>val)($event)" question="1、编辑和服务名称是IDR Labs Ltd45"></mySelect>  
    <mySelect @getRes="myRes=((val)=>val)($event)" question="1、编辑和服务名称是IDR Labs Ltd45"></mySelect>  
    <mySelect @getRes="myRes=((val)=>val)($event)" question="1、编辑和服务名称是IDR Labs Ltd45"></mySelect>  
</div> 
</template>
<script>
import mySelect from "./select"
export default {
    data(){
        return {
            myRes:''
        }
    },
    methods:{
        sendRes(val){
            console.log(val);
            return val;

        }
    },
    watch:{

    },
    created(){

    },
    components:{
        mySelect
    }
};
</script>
<style lang="less">
.test-mid8 {
    max-width:980px;
    margin:0 auto;

        
}

</style>
    