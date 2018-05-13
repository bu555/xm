<template>
<div class="discuss">
     <!--discuss 交流区-->
     <div class="left-box">
        左
     </div>
     <div class="right-box">
         右
     </div>
</div> 
</template>
<script>
export default {

    
};
</script>
<style lang="less">
.discuss {
    max-width:1050px;
    margin:0 auto;
    display:flex;
    .left-box {
        background: #ccc;
        flex:1;
    }
    .right-box {
        background-color: #ddd;
        flex:0 0 25%;
    }

}

</style>
    