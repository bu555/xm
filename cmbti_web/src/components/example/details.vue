<template>
<div class="details">
    <div class="tab-nav">
        <div class="nav-view bx ">
            <div class="ctrl">
                <!--<span style="cursor:pointer">首页</span>-->
                
                <span @click="back()" style="cursor:pointer"><i class="glyphicon glyphicon-th"></i> 名人库</span>
                <i class="glyphicon glyphicon-menu-right"></i> 
                <span style="">{{exampleItem.name}}</span>
            </div>
            <div class="search-box  hidden-xs">

            </div>
        </div>
    </div>

    <div class="main-box bx ">
            <div class="left-vote">
                <div class="vote">
                    <!--人物详情-->
                    <div v-if="exampleItem" class="example-box clearfix col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div class="item">
                            <!--<img :src="exampleItem.img_url" alt="">-->
                            <div class="photo">
                                <img :src="exampleItem.img_url" alt="">
                            </div>
                        </div>
                        <!--<div class="txt">-->
                            {{exampleItem.info}}
                            <a href="" target="_blank">
                                [百度百科]
                            </a>
                            <a href="" target="_blank">
                                [互动百科]
                            </a>
                        </div>
                        <!--投票-->
                        <div class="vote-box col-xs-12 col-sm-6 col-md-6 col-lg-6" v-if="!isVote">
                            <div class="info">
                            </div>
                            <div class="vote-title">
                                <p class="tit">{{exampleItem.name}}</p>
                                <p>( {{exampleItem.type?exampleItem.type.toUpperCase():''}} )</p>
                                
                            </div>
                            <div class="vote-result">
                                <!--<voteResult v-if="exampleItem" :example="exampleItem"></voteResult>-->
                                <div class="item" v-for="(v,i) in voteArr.slice(0,6)" :key="i">
                                    <div class="type">{{v.type?v.type.toUpperCase():''}}</div>
                                    <div class="prog">
                                        <div :style="'width:'+v.perce">
                                            <div class="count">{{v.count}}</div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div style="padding-top:14px">
                                <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
                                <!--<el-button type="primary" @click="isVote=true" style="height:34px;padding:0 22px">去投票</el-button>-->
                                <!--<button class="cupid-green" @click="goVote()" v-if="!isRepeat">去投票</button>-->
                                <!--<button class="clean-gray-nohover" v-if="isRepeat" style="color:#aaa">已投票</button>-->

                            </div>
                        </div>
                        <div class="vote-box clearfix col-xs-12 col-sm-6 col-md-6 col-lg-6" v-if="isVote">
                            <div class="vote-title">
                                <p class="tit">投 票</p>
                            </div>
                            <div class="vote-result">
                                <voteConsole @sonSend="lestionSon($event)"></voteConsole>
                            </div>

                        </div>
                    </div>
                    <!--投票+评论-->
                    <div class="user-ctrl">
                        <br>
                        <div class="u-comment">
                            <p>评论：</p>
                            <el-input type="textarea" v-model="myComment"></el-input></br>
                            <el-button size="small" class="u-btn" @click="comment()">评论</el-button>

                        </div>
                        <div class="u-vote" v-if="!isRepeat">
                            <br>
                            <p>投票：</p>
                            <el-select v-model="myVote" filterable clearable placeholder="请选择">
                                <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            </br>
                            <el-button size="small" class="u-btn" @click="vote()">投票</el-button>

                        </div>
                        
                            <!--<el-button>取消</el-button>-->
                    </div>
                    <!--评论区-->
                    <div class="comment">
                        <myComment :comment="commentList"></myComment>
                    </div>
                </div>
                <!--右侧栏-->
                <div class="right-side">
                    <div class="r-content">
                        right-side
                        <button type="button" id="myButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" @click="vote()">Loading state</button>
                        <button type="button" id="myButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" @click="comment()">comment</button>
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
            //     voteLog:[]
            // },
            isVote:false,
            isGetDate:true,
            isRepeat:false,
            fromPath:'',
            voteArr:[],
            myComment:'',
            myVote:'',
            typeList:[],
            commentList:[]
        }
    },
    methods:{
        //投票
        vote(){
            if(!this.myVote){
                this.$message({
                    showClose: true,
                    message: '请先选择类型',
                    type: 'warning'
                });
                return;
            }
            this.$axios.goVote({
                eid:this.$route.query.eid,
                result:this.myVote
            }).then(res=>{
                if(res.data.success){
                    this.getExampleById()  //更新数据
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            })
        },
        comment(){
            if(!this.myComment){
                this.$message({
                    showClose: true,
                    message: '请输入评论内容',
                    type: 'warning'
                });
                return;
            }
            this.$axios.addComment({
                eid:this.$route.query.eid,
                result:this.myComment
            }).then(res=>{
                if(res.data.success){
                    this.getComment()
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            }).catch(error=>{
                console.log(error);
            })
        },

        // 返回名人庫
        back(){
            this.$router.push({path:this.fromPath})
        },
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
        //id精确查询example
        getExampleById(){
                if(this.$route.query.eid){
                    var eid = this.$route.query.eid.trim()
                }else{
                    return;
                }
                this.exampleItem = '';
                this.$axios.getExampleById({
                    eid:eid
                }).then(res=>{
                    console.log(res);
                    if(res.data.success){
                        this.exampleItem = res.data.example;
                        this.isRepeat = res.data.repeat
                        console.log('isRepeat:',this.isRepeat);

                        // 类型排序
                        let vote = []
                        let total = 0
                        for(let key in this.exampleItem.vote){
                            total += Number(this.exampleItem.vote[key])
                        }
                        console.log(total);
                        for(let key in this.exampleItem.vote){
                            console.log(this.exampleItem.vote[key]);
                            vote.push({
                                type:key,
                                count:this.exampleItem.vote[key],
                                perce:total===0?'0%':this.exampleItem.vote[key]/total*100 + '%'
                            })
                        }
                        console.log(vote);
                        for(let i=0;i<vote.length-1;i++){
                            for(let j=0;j<vote.length-1-i;j++){
                                if(vote[j].count < vote[j+1].count){
                                    let temp = vote[j+1]
                                    vote[j+1] = vote[j]
                                    vote[j] = temp
                                }
                            }
                        }
                        //如果最大与type相等
                        if(this.exampleItem.type!=='****' &&vote[0].type!=this.exampleItem.type){
                            let temp;
                            for(let i=0;i<vote.length;i++){
                                if(vote[i].type==this.exampleItem.type){
                                    temp = vote[i]
                                    vote.splice(i,1)
                                    break;
                                }
                            }
                            vote.unshift(temp)
                        }
                        console.log('vote排序：',vote);
                        this.voteArr = vote

                    }else{
                    }
                }).catch(res=>{})

        },
        getComment(){
            this.$axios.getComment({
                eid:this.$route.query.eid,
            }).then(res=>{
                if(res.data.success){
                    this.commentList = res.data.comment
                }
                console.log(res);
            }).catch(error=>{
                console.log(error);
            })

        },
        //检查重复投票
        checkRepeat(){
            if(localStorage.getItem('USER')){
                let uid = JSON.parse(localStorage.getItem('USER'))._id;
                // this.exampleItem.voteLog.forEach(v=>{
                //     if(v.uid===uid){
                //         this.isRepeat = true;
                //     }
                // })
            }
        }
    },
    watch:{
        exampleItem:'checkRepeat'
    },
    created(){
        this.getExampleById();
        this.getComment()

        //设置返回位置
        this.fromPath = localStorage.getItem('fromPath')
        if(this.fromPath === '/' || this.fromPath.indexOf('/user/')!==-1 ){
            this.fromPath = '/example'
        }

        //处理typeList数据
        this.$mbti.types.forEach((v,i)=>{
            this.typeList.push({
                value:v,
                label:v.toUpperCase()
            })
        })

    },
    components:{
        voteResult,
        voteConsole,
        myComment
    },
    beforeRouteEnter (to, from, next) {
        localStorage.setItem('fromPath',from.fullPath)
        next()
    },
    
};
</script>
<style lang="less">
.details {
    .tab-nav {
        height:40px;
        // background-color: #e8ecf5;
        background-color: #f7f7f7;
        .nav-view {
            max-width:1020px;
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
                padding-left:12px;
                height:40px;
                line-height: 40px;
                span {
                    font-size:14px
                }

            }
        }
    }
    .main-box {
        max-width:1020px;
        display:flex;
        padding:1% 2.5%;
        .left-vote {
            margin:0;
            padding-top:8px;
            flex:1;
            @media screen and(min-width:416px) and (max-width:768px){
                .example-box {
                        height:auto;
                        padding-right:13%;
                        padding-left:13%;
                        // max-width:500px;
                        border:1px solid #f0f0f0;
                        border-radius:4px 4px 0 0;
                        overflow: hidden;
                }
                .vote-box {
                    // border:1px solid #f0f0f0;
                    
                    border-radius:0 0 4px 4px;
                    border-left-color:#f0f0f0 !important;
                    border-top-color:transparent;
                    // padding-top:15px;
                    // padding-bottom:15px;
                    // text-align: center;
                }
            }
            @media screen and(max-width:415px){
                .example-box {
                        padding:5% 6%;
                        height:auto;
                        // padding-right:13%;
                        // padding-left:13%;
                        // max-width:500px;
                        border:1px solid #f0f0f0;
                        border-radius:4px 4px 0 0;
                        overflow: hidden;
                }
                .vote-box {
                    // border:1px solid #f0f0f0;
                    
                    border-radius:0 0 4px 4px;
                    border-left-color:#f0f0f0 !important;
                    border-top-color:transparent;
                    // padding-top:15px;
                    // padding-bottom:15px;
                    // text-align: center;
                }
            }
        }
        // 人物详情
        .example-box {
            // display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
            // background-color: #eee;
            height:300px;
            border:1px solid #f0f0f0;
            border-radius:4px 0 0 4px;
            overflow: hidden;
            border-right:none;
            padding:3% ;
            // padding-left:.09rem;
            font-size:13px;
            color:#777;
            word-break: break-all; //英文换行
            a {
            color:#70a9e5;
            }
            .item {
                // flex:1 0 46%;
                box-sizing: border-box;
                float:right;
                margin-right:5px;
                padding-left:12px;
                margin-bottom:8px;
                width:170px;
                position: relative;
                .photo {
                    width:100%;
                    height:200px;
                    overflow: hidden;
                    background-color: #777;
                }
                img {
                    width:100%;
                    // height:100%;
                    // display:block;
                    // width:auto;
                    // height:auto;
                }
            }
        }   
        .vote-result {
            padding:32px 0px;
            &>.item {
                margin:0 auto;
                display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                max-width:270px;
                padding-right:70px;
                .type{
                    flex:0 0 55px;
                    height:25px;
                    line-height: 25px;
                    text-align:right;
                    padding-right:5px;
                    // background-color: pink;
                }
                .prog{
                    flex:1;
                    height:25px;
                    border-left:1px solid #6ac342;
                    display:flex;
                    align-items:center;
                    &>div {
                        height:16px;
                        background-color: #6ac342;
                        width:100%;
                        border-radius:0px 8px 8px 0px;
                        position: relative;
                        .count{
                            position: absolute;
                            right:0;
                            top:0;
                            transform:translateX(100%);
                            height:16px;
                            line-height: 16px;
                            text-align:left;
                            padding-left:4px;

                        }
                    }
                }
            }
            
        }
        // 投票结果
        .vote-box {
            height:300px;
            border:1px solid #f0f0f0;
            border-radius:0 4px 4px 0;
            border-left-color:#f8f8f8;
            padding-top:15px;
            padding-bottom:15px;
            text-align: center;
            .info {
            }
            .vote-title {
                padding:5px 0 8px;
                p {
                    font-size:15px;
                    line-height: 18px;
                    margin:0;
                    color:#777;
                    font-weight: 700;
                }
                p.tit {
                    font-size:18px;
                    // font-weight: 500;
                    height:19px;
                    color:#555;
                }
                // font-weight:700;
                margin:0 28px;
                // background-color: #eee;
                border-bottom:1px solid #f8f8f8;
                // box-shadow: 1px 0 3px #ccc;
            }
        }
        .user-ctrl {
            .u-btn {
                margin-top: 10px;
                margin-right: 40px;
            }
        }

        .comment {
            padding-top:20px;
        }
        .right-side {
            @media screen and (max-width:1024px){
                display:none;
            }
            padding:8px;
            flex:0 0 310px;
            .r-content {
                border:1px solid #f2f2f2;
                min-height: 322px;
            }
        }
    }    

    
}

</style>
    