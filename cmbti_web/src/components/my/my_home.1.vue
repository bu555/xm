<template>
<div class="my-home">
     <div class="left-box">
        <div class="m-header">
            <div class="photo">
                <img src="/static/img/logo_a.png" alt="">
            </div>
            <div class="edit-photo">
                <button>上传封面照片</button>
            </div>
            <div class="edit-info">
                <button>编辑个人资料</button>
            </div>
            <div class="m-info">
                <div><span  class="r-name">密南</span> <span  class="sex">男</span></div>
                <p>质量管理/汽车制造/爬山&骑行爱好者</p>
            </div>
        </div>
        <div class="m-body">
            
        </div>

     </div>
     <div class="right-box">
         右88
     </div>
</div> 
</template>
<script>
export default {
    methods:{
        init(){

        }

    },
    mounted(){
    },
    created(){
    }
    
};
</script>
<style lang="less" socped>
.my-home {
    max-width:1050px;
    margin:8px auto;
    display:flex;
    .left-box {
        width:100%;
        .m-header {
            height:170px;
            padding-top:85px;
            background:url('/static/img/yssl_bg.png') no-repeat;
            background-size:cover;
            position: relative;
            margin-bottom:8px;
            .photo {
                width:115px;
                height:115px;
                position: absolute;
                bottom:15px;
                left:15px;
                background-color: #ccc;
                border:1px solid #aaa;
                box-shadow: 0 0 12px #70a9e5 inset;
                border-radius:2px;
                img {
                    width:100%;
                    height:100%;
                }
            }
            .edit-info,.edit-photo {
                position: absolute;
                right:2%;
                top:98px;
            }
            .edit-photo {
                top:20px;
            }
            .m-info {
                background: rgba(255,255,255,.8);
                height:100%;
                padding-left:145px;
                padding-top:18px;
                span.r-name {
                    font-size:16px;
                    font-weight:700;
                    margin-bottom:5px;
                }
                span.sex {
                    color:#555;
                    font-size:15px;
                    padding-left:15px;
                }
            }
        }
        .m-body {
            min-height:300px;
            width:100%;
            background-color: rgba(255,255,255,.8);
        }
    }
    .right-box {
        background-color: #ddd;
        flex:0 0 25%;
    }


    @media screen and (max-width:768px) {
        .left-box {

        }
        .right-box {
            display:none;
            // flex:0 0 0;
        }
    }
    @media screen and (max-width:480px) {
        .left-box {
            .m-header {
                .photo {
                    width:85px;
                    height:85px;
                    img {
                    }
                }
                .edit-info {
                    top:90px;
                }
                .edit-photo {
                    top:15px;
                }
                .m-info {
                    padding-left:115px;
                    span.r-name {
                    }
                    span.sex {
                    }
                }
            }
        }
        .right-box {
            display:none;
            // flex:0 0 0;
        }
    }

}

</style>
    