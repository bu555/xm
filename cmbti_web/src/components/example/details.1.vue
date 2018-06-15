<template>
<div class="details">
    <div class="tab-nav">
        <div class="nav-view">
            <div class="ctrl">
                <span @click="$router.go(-1)" style="cursor:pointer">
                    <i class="el-icon-d-arrow-left"></i> 返回名人库
                </span>
            </div>
            <!--<div class="nav-list">
                <span>名人库</span>
                <span>刘德华</span>
            </div>-->
                <!--搜索框-->
            <div class="search-box">
                <el-input placeholder="请输入内容"  class="input-with-select">
                    <!--<el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                    </el-select>-->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
    </div>

    <div class="main-box">
        <div class="left-side">
            <div class="vote">
                <div v-if="exampleItem" class="left-box">
                    <div class="info-txt">
                        {{exampleItem.info}}
                    </div>
                    <div class="item">
                        <div class="item-box">
                            <div class="type">{{exampleItem.type.toUpperCase()}}</div>
                            <div class="photo">
                                <img :src="exampleItem.img_url" alt="">
                            </div>
                            <div class="name">{{exampleItem.name}}</div>
                        </div>
                    </div>
                    <div class="baike">
                        <a href="" target="_blank">
                            <img src="../../../static/img/hudongbaike.jpg" alt="前往互动百科">
                        </a>
                        <a href="" target="_blank" style="margin-left:10px">
                            <img src="../../../static/img/baidubaike.jpg" alt="前往百度百科">
                        </a>
                    </div>
                </div>
                <div class="right-box" v-if="!isVote">
                    <div class="vote-title">投票结果</div>
                    <div class="vote-result" style="height:177px">
                        <voteResult v-if="exampleItem" :example="exampleItem"></voteResult>
                    </div>
                    <div>
                        <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
                        <!--<el-button type="primary" @click="isVote=true" style="height:34px;padding:0 22px">去投票</el-button>-->
                        <button class="cupid-green" @click="goVote()" v-if="!isRepeat">去投票</button>
                        <button class="clean-gray-nohover" v-if="isRepeat" style="color:#aaa">已投票</button>

                    </div>
                </div>
                <div class="right-box" v-if="isVote">
                    <div class="vote-title">投 票 台</div>
                    <div class="vote-result" style="height:177px">
                        <voteConsole @sonSend="lestionSon($event)"></voteConsole>
                    </div>

                </div>
            </div>
            <div class="comment">
                <myComment></myComment>
            </div>
        </div>
        <div class="right-side">
            <div class="top-side">
                top-side
            </div>
        </div>
    </div>
</div> 
</template>
<script>
import voteResult from "./vote_result"
import voteConsole from "./vote_console"
import myComment from './comment'
export default {
    data(){
        return {
            exampleItem:'',
            // exampleItem:{
            //     type:'',
            //     info:'',
            //     vote:{e:0,i:0,s:0,n:0,t:0,f:0,j:0,p:0},
            //     vote_log:[]
            // },
            isVote:false,
            isGetDate:true,
            isRepeat:false,
        }
    },
    methods:{
        //监听子组件传话
        lestionSon(data){
            this.isVote = false;
            if(data){
                // 子组件传递过来的更新后数据
                this.exampleItem = '';
                this.exampleItem = data;
            }
        },
        //投票按钮
        goVote(){
            // if(localStorage.getItem('USER'))
            //先确认登录是否有效
            this.$axios.isLogin().then(res=>{
                if(res.data.success===true){
                    this.isVote = true; //如果登录有效则进入投票界面
                }
            })
            
        },
        //精确查询example
        searchExamp(id){
                this.exampleItem = '';
                this.$axios.searchExample({
                    id:id
                }).then(res=>{
                    if(res.data.success){
                        this.exampleItem = res.data.example[0];
                        // this.isGetDate = true;
                        console.log(this.exampleItem);

                    }else{
                    }
                }).catch(res=>{})

        },
        //检查重复投票
        checkRepeat(){
            if(localStorage.getItem('USER')){
                let uid = JSON.parse(localStorage.getItem('USER'))._id;
                this.exampleItem.vote_log.forEach(v=>{
                    if(v.uid===uid){
                        this.isRepeat = true;
                    }
                })
            }
        }
    },
    watch:{
        exampleItem:'checkRepeat'
    },
    created(){
        // 判断list数据是否存在，不存在则通过eid请求，存在则判断时间是否过期，如果过期则重新请求
        let exampleList = sessionStorage.getItem('exampleList') || '';
        if(exampleList){
            exampleList = JSON.parse(exampleList);
            if( (Date.now()-exampleList.createTime)<this.maxAge){
                var _this = this;
                exampleList.data.forEach(v=>{
                    if(v._id === this.$route.query.eid){
                        _this.exampleItem = Object.create(v); //直接使用local的数据
                    }
                })
            }else{
                //重新请求数据
                this.searchExamp(this.$route.query.eid);
            }
        }else{
            //重新请求数据
            this.searchExamp(this.$route.query.eid);

        }

    },
    components:{
        voteResult,
        voteConsole,
        myComment
    }
    
};
</script>
<style lang="less">
.details {
    .tab-nav {
        height:40px;
        // background-color: #e8ecf5;
        background-color: #f7f7f7;
        .nav-view {
            background-color: transparent;
            height:40px;
            line-height: 40px;
            font-size:13px;
            color:#72748a;
            border-bottom: 1px solid #eee;
            .search-box {
                float:left;
                margin-left:25px;
                text-align:left;
                .input-with-select {
                    width:255px;
                }
                .el-input__inner {
                    height:27px;
                }
            }
            .ctrl {
                float:left;
                text-align:left;
                padding-left:5px;
                height:40px;
                line-height: 40px;
            }
        }
    }
    .main-box {
        display: flex; display: -webkit-flex;
        text-align: center;
        .left-side {
                flex-basis:72%;
            .vote {
                    display: flex;
                    display: -webkit-flex;
                    // flex-wrap:wrap; //让弹性盒元素在必要的时候拆行
                    padding:5px;
                    height:310px;
                    
                    .left-box {
                        flex:1;
                        // border:1px solid #ccc;
                        display: flex; display: -webkit-flex;
                        padding-top:15px;
                        position: relative;
                        border:1px solid #ddd;
                        border-right:none;
                        border-radius:5px 0 0 5px;
                        .info-txt {
                            width:150px;
                            height:206px;
                            padding:15px 28px;
                            padding-right:0px;
                            text-align:left;
                            font-size:12px;
                            position: relative;
                            overflow:hidden;
                        }
                        .baike {
                            position: absolute;
                            left:28px;
                            bottom:28px;
                            img {
                                height:20px;
                                border:1px solid #ddd;
                                border-radius:5px;
                            }
                            a {
                            }
                        }
                        .item {
                            margin:0 auto;
                        }
                        .item-box {
                            flex:1;
                            margin:7px;
                            width:200px;
                            border:1px solid #eee;
                            border-radius:8px;
                            // width:157px;
                            .type,.name {
                                height:32px;
                                line-height: 32px;
                                font-size:15px;
                            }
                            .photo {
                                height:195px;
                                overflow: hidden;
                                img {
                                    width:150px;
                                }
                            }
                        }
                    }
                    // 投票结果
                    .right-box {
                        // flex:1;
                        flex-basis:328px;
                        border:1px solid #ddd;
                        border-radius:0 5px 5px 0;
                        padding-top:15px;
                        .vote-title {
                            // font-weight:700;
                            margin:0 28px;
                            font-size:17px;
                            height:30px;
                            // background-color: #eee;
                            border-bottom:1px solid #eee;
                            // box-shadow: 1px 0 3px #ccc;
                        }

                        .vote-result {
                            // background-color: #ccc;

                        }
                    }
            }
            .comment {

            }
        }
        .right-side {
            flex-basis:28%;
            padding:5px;
            .top-side {
                // height:400px;
                border:1px solid #ddd;
                border-radius:4px;
            }
        }

    }

    

}

</style>
    