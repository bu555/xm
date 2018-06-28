<template>
  <div class="my-home">
        <div class="m-tab-b">
            <div><router-link to="/my/info">
                    <i class="fa fa-user-o"></i> 个人档案
                </router-link></div>
            <div><router-link to="/my/followers">
                    <i class="el-icon-plus" style="margin:0 -1px 0 -2px"></i> 关注<span>(2)</span>
                </router-link></div>
            <div><router-link to="/my/following">
                    <i class="fa fa-plus-square-o "></i> 被关注<span>(2)</span>
                </router-link></div>
            <div><router-link to="/my/mark">
                    <i class="el-icon-star-off" style="font-size:17px;margin-left:-2px"></i> 收藏<span>(2)</span>
                </router-link></div>
            <div><router-link to="/my/test">
                    <i class="fa fa-file-text-o" style="margin:0 2px 0 1px"></i> 测试
                </router-link></div>
            <div><router-link to="/my/publish">
                    <i class="fa el-icon-edit"></i> 发表<span>(2)</span>
                </router-link></div>
            <div><router-link to="/my/comment">
                    <i class="fa fa-edit"></i> 评论<span>(2)</span>
                </router-link></div>
            <div><router-link to="">
                    <i class="fa fa-envelope-o"></i> 消息<span>(2)</span>
                </router-link></div>
            <!--<div><router-link to="">
                    <i class="fa fa-group "></i> 好友<span>(2)</span>
                </router-link></div>-->
        </div>
  </div>
</template>
<script>
export default {
    data(){
      return {
      }
    },
    methods:{
      onSubmit(){

      }
    }
}
</script>
<style lang="less">
.my-home {
    .m-tab-b {
        width:100%;
        padding:3px 0 70px;
        
        a {
            display:block;
            padding:10px 15px;
            padding-left:7%;
            border-bottom:1px solid #f7f7f7;
            &:hover {
                background-color: #fafafa;
            }
            &:visited {
                text-decoration: none;
            }
            &:link {
                text-decoration: none;
            }
            span {
                color:#909aae;
                font-size:13px;
                padding-left:5px;
            }
        }

    }
  
  @media screen and (max-width:525px) {
    padding:0px 0px 10px;
  }
}
</style>

