<template>
    <div class="about">
        <NavMain></NavMain>
        <NavSub :data="data"  @submitSearch="searchSubmit"></NavSub>

        <div class="main-box">
            <router-view></router-view>
        </div>


    </div>
</template>
<script>
import NavSub from '@/components/common/nav_sub'
import NavMain from '@/components/common/nav_main'
export default {
    data(){
        return {   
            data:{
                title:{
                    value:'关于',
                    link:'/about'
                },
                items:[
                    {
                        value:'关于XMBI',
                        link:'/about',
                        reg:/^\/about$/
                    },
                    {
                        value:'联系我们',
                        link:'/about/contactus',
                        reg:/contactus/
                    },
                    {
                        value:'免责声明',
                        link:'/about/disclaimer',
                        reg:/disclaimer/
                    },
                    {
                        value:'帮助中心',
                        link:'/about/help',
                        reg:/help/
                    },
                ],
                search:{
                    placeholder:'搜索',
                    value:''
                },
                // maxWidth:970,
            }
        }
    },
    components:{
        NavMain,
        NavSub,
    },
    watch:{
    },
    methods:{
        searchSubmit(value){
            console.log('点击搜索:',value);
        },
    },
    mounted(){
        // this.$message({
        //   showClose: true,
        //   message: '恭喜你，这是一条成功',
        //   type: 'warning',
        //   duration:9922222
        // });


        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });




    },
    created(){

    },
    beforeRouteEnter (to, from, next) {
        // localStorage.setItem('fromPath',from.fullPath)
        next()
    },
    
};
</script>
<style lang="less">
.about {
    position: relative;
    .main-box {
        padding-right:305px;
        max-width:970px;
        margin:0 auto;
        position: relative;
        .recommend {
            border:1px solid pink;
            position:absolute;
            right:0px;
            top:10px;
        }
    }
    @media screen and (max-width:992px){
        .main-box {
            padding:0 16px;
            .recommend {
                position: relative;
                right:0px;
                top:0px;
            }
        }
    }
    @media screen and (max-width:768px){

    }
    @media screen and (max-width:525px) {

    }
    .about-comp {
        padding:15px 0;
            color:#eee;
        &>h3 {
            font-size:19px;
            font-weight:600;
            margin-bottom:4px;
        }
        &>p {
            font-size:15px;
        }
        @media screen and (max-width:992px){

        }
        @media screen and (max-width:768px){
            &>p {
                // font-size:17px;
            }
        }
        @media screen and (max-width:525px) {

        }
    }

}

</style>
<style>
  @media screen and (max-width:768px) {
        .about .x-nav-sub ul.nav-list.in-bottom li {
            margin-right: 2vw;
        }
  }
  @media screen and (max-width:350px) {
        .about .x-nav-sub ul.nav-list.in-bottom li a {
            font-size:15px;
        }
        .about .x-nav-sub ul.nav-list.in-bottom li a em {
            font-size:16px;
        }
  }
</style>

    