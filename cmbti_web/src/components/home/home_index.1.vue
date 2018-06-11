<template>
<div class="home-index">
    <div class="h-body" style="height:1500px">

    </div>
</div> 
</template>
<script>
export default {

    components:{
        
    },
    created(){
        // this.$layer.alert({
        //     title:'标题123',
        //     message:'确定伤处？'
        // }).then(()=>{
        //     console.log('确定');
        // }).catch(()=>{
        //     console.log('取消');
        // })

        // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });

        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
    }
    
};
</script>
<style lang="less">
.home-index {
   .top-bg {
       max-width:1180px;
       height:15vw;
       margin:0 auto;
    //    width:100%;
       background: lime;
       background-image:url('/static/img/yssl_bg.png');
       background-repeat:no-repeat;
       background-size:cover;
   }
   .h-body {
        max-width: 1180px;
        margin:0 auto;
        .my-info {
            background-color: #fff;
        }
        .item-t {
            // background:rgba(255,255,255,.7);
            // background:#70a9e5;
            // background:url('/static/img/bg_1.png');
            background-color: #fff;
            text-align:center;
            padding-top:2.5%;
        }
        .h-title {
            // text-align: center;
            display:inline-block;
            font-size:28px;
            // padding:30px 0 10px;
            height:70px;
            line-height: 70px;
            color:#456ea5;
            position: relative;
            &:after,&:before {
                content:"";
                display:block;
                height:25px;
                width:25px;
                border:1px solid #75a9de;
                position:absolute;
                top:12px;
                left:-40px;
            }
            &:before {
                height:18px;
                width:18px;
                border:1px solid #ffaf4b;
                top:26px;
                left:-25px;
            }
            
        }
        .my-info {
            padding:1px 4% 5%;
            margin:0;
            // background-color: #fdfdfd;
            background-color: #fff;
            border-bottom:1px solid #f2f2f2;
            h2 {
                font-size:19px;
                margin:10px 0;
            }
            p {
                font-size:16px;
                margin-bottom:5px;
            }
        }
        ul.my-tasks {
            &>li{
                display:flex;
                padding:4% 0 ;
                .li-left{
                    flex:0 0 40%;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    img {
                        // width:30%;
                        width:310px;
                        height:310px;
                        border-radius:50%;
                    }
                }
                .li-right{
                    flex:0 0 60%;
                    padding-right:5%;
                    padding-top:2%;
                    font-size:15px;
                    h2 {
                        position: relative;
                        font-size:23px;
                        &:after {
                            content:"";
                            display:block;
                            height:3px;
                            width:70px;
                            background: #ffaf4b;
                            position:absolute;
                            bottom:-7px;
                            left:0px;
                        }
                    }
                    h3 {
                        font-size:18px;
                        margin-bottom:15px;
                    }
                    h4 {
                        font-size:16px;
                        margin-bottom:5px;
                    }
                    p {
                        padding-left:10px;
                        margin-bottom:4px;
                        position: relative;
                        color:#555;
                        &:after {
                            content:"";
                            display:block;
                            height:4px;
                            width:4px;
                            background: #ffaf4b;
                            position:absolute;
                            top:8px;
                            left:0px;
                        }
                    }
                }
                &:nth-child(2n+1){
                    background-color: #fff;
                }
                &:nth-child(2n+0){
                    background-color: #fcfcfc;
                    // background-color: #fdfdfd;
                    // background-color: #fafafa;
                }
            }
        }
   }

   @media screen and (max-width:768px) {
        .h-body {

            ul.my-tasks {
                li{
                    padding:4% 0 ;
                    flex-wrap:wrap;
                    .li-left{
                        flex:0 0 100%;
                        img {
                            width:232px;
                            height:232px;
                            object-fit: cover;
                        }
                    }
                    .li-right{
                        flex:0 0 100%;
                        padding:2% 4%;
                        h2 {
                            position: relative;
                            font-size:23px;
                            &:after {
                            }
                        }
                        h3 {
                            font-size:18px;
                        }
                    }
                }
            }
    }
   }
}

</style>
    