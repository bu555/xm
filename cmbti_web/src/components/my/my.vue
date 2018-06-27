<template>
<div class="my" v-if="$store.state.userInfo">
    <div class="m-header">
        <div class="photo" @click="showUploadAvatar=true">
            <img v-if="$store.state.userInfo" :src="$pathAvatar +$store.state.userInfo.avatar" alt="">
            <img v-else src="/static/img/logo_a.png" alt="">
        </div>
        <div class="edit-photo">
            <button>上传封面照片</button>
        </div>
        <div class="edit-info">
            <!--<button>编辑个人资料</button>-->
        </div>
        <div class="m-info">
            <div class="overflow-row-1" style="padding-bottom:1px;"><span  class="r-name">{{$store.state.userInfo.r_name}}</span> <span  class="sex"></span></div>
            <div class="overflow-row-2" style="font-size:14px;line-height:15px;padding-right:5px">{{$store.state.userInfo.profile?$store.state.userInfo.profile:'未設置'}}</div>
        </div>
    </div>
    <div class="main-box">
        <div class="m-body">
            <div class="m-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <div class="aside-box">
        <div class="aside-items" v-for="i in 3">
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
            <p>INTJ和INTP测试</p>
        </div>
    </div>
    <div class="upload-avatar" v-if="showUploadAvatar" >
        <div class="inner-box">
            <!--头像上传组件-->
            <uploadAvatar @closeMe="listenSon"></uploadAvatar>
        </div>
    </div>
</div> 
</template>
<script>
import uploadAvatar from './upload_avatar'
export default {
    data(){
        return {
            showUploadAvatar:false,
        }
    },
    components:{
        uploadAvatar
    },
    watch:{
        '$store.state.modalLoginSuccess':'getAccount'
    },
    methods:{
        listenSon(success){
            this.showUploadAvatar = false;
            if(success){
                // 修改成功

            }
        },
        getAccount(){
            // 获取账户信息
            this.$axios.getAccountInfo().then(res=>{
                if(res.success){
                    this.$store.commit('setAccountInfo',res.data)
                }
            })
        },
        getUser(){
            // 获取账户信息
            this.$axios.getUserInfo().then(res=>{
                if(res.success){
                    console.log(res);
                    localStorage.setItem('USER',JSON.stringify(res.data));
                    this.$store.commit('setUserInfo',res.data)
                }
            })
        }
    },
    mounted(){
    },
    created(){
        this.getAccount()
        this.getUser()
    },
    
};
</script>
<style lang="less">
.my {
    max-width:1100px;
    margin:0px auto;
    position: relative;
    padding-right:332px;
    padding-top:170px;
    // display:flex;
    .m-header {
        height:160px;
        padding-top:85px;
        background:url('/static/img/my_bg.jpg') no-repeat;
        background-size:cover;
        position: relative;
        margin-bottom:8px;
        position: absolute;
        top:0px;
        left:0px;
        width:100%;
        .photo {
            width:100px;
            height:100px;
            position: absolute;
            bottom:15px;
            left:25px;
            background-color: #ccc;
            border:1px solid #aaa;
            box-shadow: 0 0 12px #70a9e5 inset;
            border-radius:2px;
            cursor:pointer;
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
            padding-left:150px;
            padding-top:12px;
            span.r-name {
                // font-size:15px;
                font-weight:700;
                margin-bottom:7px;
            }
            span.sex {
                color:#555;
                font-size:14px;
                padding-left:15px;
            }
            &>div:last-child {
            }
            &>div:first-child {
            }
        }
    }
    .main-box {
        margin-bottom:12px;
        width:100%;
        .m-body {
            min-height:300px;
            width:100%;
            background-color: rgba(255,255,255,.8);
            .menu {
                display:flex;
                flex-wrap:wrap;
                background-color: #f7f7f7;
                border:1px solid #fff;
                &>div {
                    flex:0 0 33.3%;
                    height:50px;
                    // border:1px solid blue;
                    line-height: 50px;;
                    text-align:center;
                }
            }

            .m-content {
                // padding:12px;
                width:100%;
                border-top:5px solid #cee1f5;
                border-radius:3px 3px 0 0 ;
                min-height:420px;
                background-color: #fdfdfd;
                
            }
        }
    }
    .aside-box {
        width:320px;
        position: absolute;
        right: 0;
        top: 170px;
        .aside-items {
            width:100%;
            min-height:150;
            background-color: #fff;
            padding:2.5%;
            margin:0 0 10px;
        }
    }
    .upload-avatar {
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.5);
        .inner-box {
            width:320px;
            margin:70px auto 0;
            background-color: red;
            // top:100px;
            // left:50%;
            // transform:translate(-50%);
            border:1px solid #777;
        }

        // margin:0 auto;
    }
    @media screen and (max-width:768px){
        padding-right:0;
        .aside-box {
            position: relative;
            width:100%;
            top:0;
        }
    }
    @media screen and (max-width:525px){
        .m-header {
            .photo {
                width:85px;
                height:85px;
                left:15px;
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
                padding-left:112px ;
                span.r-name {
                }
                span.sex {
                }
            }
        }
        .main-box {
            .m-body {
                .m-tab {
                    &>div {
                        padding:7px 0;
                    }
                }
            }
        }
    }
}

</style>
    