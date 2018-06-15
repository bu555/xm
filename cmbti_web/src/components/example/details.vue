<template>
<div class="details">
    <div class="tab-nav">
        <div class="nav-view bx ">
            <div class="ctrl">
                <!--<span style="cursor:pointer">首页</span>-->
                
                <span @click="back()" style="cursor:pointer"><i class="glyphicon glyphicon-menu-left"></i> 返回名人库</span>
                <!--<i class="glyphicon glyphicon-menu-right"></i> 
                <span style="">{{exampleItem.name}}</span>-->
            </div>
            <div class="search-box  hidden-xs">

            </div>
        </div>
    </div>
    <div class="view-1100px">
        <div class="main-box ">
                    <div class="vote">
                        <!--人物详情-->
                        <div class="example-box">
                                <div class="e-info">
                                    <div class="item">
                                        <!--<img :src="exampleItem.img_url" alt="">-->
                                        <div class="photo">
                                            <img :src="'f'+$pathImgs+exampleItem.img_url" alt="">
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
                                <div class="vote-box" v-if="!isVote">
                                        <div class="info">
                                        </div>
                                        <div class="vote-title">
                                            <p class="tit">{{exampleItem.name}}</p>
                                            <p>( {{exampleItem.type?exampleItem.type.toUpperCase():''}} )</p>
                                            
                                        </div>
                                        <div class="figure"></div>
                                        <div class="vote-result">
                                            <!--<voteResult v-if="exampleItem" :example="exampleItem"></voteResult>-->
                                            <div class="r-item" v-for="(v,i) in voteArr.slice(0,6)" :key="i">
                                                <div class="type">{{v.type?v.type.toUpperCase():''}}</div>
                                                <div class="prog">
                                                    <div :style="'width:'+v.perce">
                                                        <div class="count">{{v.count}}</div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div v-if="isRepeat">你已参与</div>
                                        </div>
                                        <div style="padding-top:14px">
                                            <!--<el-button type="primary" @click="goVote()">投票</el-button>-->
                                            <!--<el-button type="primary" @click="isVote=true" style="height:34px;padding:0 22px">去投票</el-button>-->
                                            <!--<button class="cupid-green" @click="goVote()" v-if="!isRepeat">去投票</button>-->
                                            <!--<button class="clean-gray-nohover" v-if="isRepeat" style="color:#aaa">已投票</button>-->

                                        </div>
                                </div>
                        </div>
                        <!--投票+评论-->
                        <div class="user-ctrl">
                            <div class="u-comment">
                                <p>评论：</p>
                                <el-input type="textarea" v-model="myComment"></el-input></br>
                                <div style="text-align:right;padding-top:5px">
                                    <el-button size="small" type="primary" @click="comment()">评 论</el-button>
                                </div>

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
                                <el-button size="small" type="primary" @click="vote()">投票</el-button>

                            </div>
                            
                                <!--<el-button>取消</el-button>-->
                        </div>
                        <!--评论区-->
                        <div class="comment">
                            <div class="title">评论区</div>
                            <div class="category">
                                <span>分类：</span>
                                <span>热门</span>
                                <span class="line"></span>
                                <span>最新</span>
                            </div>
                            <div class="content">
                                <div class="list">
                                    <myComment :comment="commentList"></myComment>
                                </div> 
                                <div v-if="commentList.length===0" class="empty">暂无评论 (￢_￢)</div>
                                <div v-if="!isOver" @click="getComment()" class="load-more">加载更多.....</div>
                                <div v-if="commentList.length!==0 && isOver" class="nor-more">没有更多了(¬､¬)</div>

                            </div>
                        </div>

            
                    </div>
                    <!--右侧栏-->
                    <div class="aside-box">
                        <div class="aside-items" v-for="i in 3">
                            <p>INTJ和INTP测试</p>
                            <p>INTJ和INTP测试</p>
                            <p>INTJ和INTP测试</p>
                        </div>
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
            fromPath:'',
            voteArr:[],
            myComment:'',
            myVote:'',
            typeList:[],
            commentList:[],
            tabFixed:false, //tab定位
            commentPage:1,
            isOver:true,
            eid:''
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
                eid:this.eid,
                result:this.myVote
            }).then(res=>{
                if(res.data.success){
                    this.exampleHandle(res.data.example)
                    this.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    });
                }
            }).catch(err=>{
            })
        },
        // 提交评论
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
                eid:this.eid,
                result:this.myComment
            }).then(res=>{
                console.log('KKK',res);
                if(res.data.success){
                    this.myComment=''
                    this.commentPage = 1
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
        exampleHandle(example){
                this.exampleItem = example;
                this.isRepeat = example.voted

                // 类型排序
                let vote = []
                let total = 0
                for(let key in this.exampleItem.vote){
                    total += Number(this.exampleItem.vote[key])
                }
                for(let key in this.exampleItem.vote){
                    vote.push({
                        type:key,
                        count:this.exampleItem.vote[key],
                        perce:total===0?'0%':this.exampleItem.vote[key]/total*100 + '%'
                    })
                }
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
                this.voteArr = vote
        },
        //id精确查询example
        getExampleById(){
                this.exampleItem = '';
                this.$axios.getExampleById({
                    eid:this.eid
                }).then(res=>{
                    if(res.data.success){
                        this.exampleHandle(res.data.example)
                    }else{
                    }
                }).catch(res=>{})

        },
        getComment(){
            this.$axios.getComment({
                eid:this.eid,
                page:this.commentPage,
                size:4
            }).then(res=>{
                if(res.data.success){
                    this.commentList = this.commentList.concat(res.data.comment)
                    this.isOver = res.data.over  //是否还有数据
                    this.commentPage = this.commentPage+1
                }
            }).catch(error=>{
                console.log(error);
            })

        },
        handleScroll () {
            this.tabFixed = window.scrollY>102;
            // console.log(window.scrollY);
        },
        initData(flag){
            
            if(flag==='init'){
                this.getExampleById();
                this.getComment()
            }else{
                // 弹窗登录成功后进入此分支
                if(!this.$store.state.modalLoginSuccess) return;
                this.commentPage = 1
                setTimeout(()=>{
                    this.getExampleById();
                    this.getComment()
                },22)
            }
        }
    },
    mounted(){
        // window.addEventListener('scroll', this.handleScroll);
    },
    watch:{
        '$store.state.modalLoginSuccess':'initData'

    },
    created(){
        this.eid = this.$route.path.split('/')[2]
        this.initData('init')
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
    width:100%;
    position: relative;
    .tab-nav {
        height:42px;
        background-color: rgba(0,0,100,.15);
        // border-bottom:1px solid #f1f1f1;
        .nav-view {
            max-width:1020px;
            background-color: transparent;
            height:42px;
            line-height: 42px;
            font-size:13px;
            color:#fcfcfc;
            // border-bottom: 1px solid #eee;
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
    .view-1100px {
            max-width:1100px;
            margin:15px auto;
            position: relative;
            padding-right:332px;
        .main-box {
            margin-bottom:12px;
            width:100%;
            background-color: rgba(255,255,255,.75);
            margin-top:3px;
            padding:1% 1%;
            // 人物详情
            .example-box {
                position: relative;
                padding:2%;
                padding-right:50%;
                background-color: #f5f5f5;
                overflow: hidden;
                font-size:13px;
                color:#777;
                word-break: break-all; //英文换行
                margin-bottom:15px;
                .e-info {
                    height:292px;
                }
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
                    }
                }
                // 投票结果
                .vote-box {
                    height:290px;
                    position: absolute;
                    top:0;
                    right:0px;
                    width:48%;
                    border-left:1px solid #ccc;
                    padding-top:15px;
                    padding-bottom:15px;
                    text-align: center;
                    color:#777;
                    .vote-title {
                        padding:5px 0 8px;
                        p {
                            font-size:15px;
                            line-height: 18px;
                            margin:0;
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
                        // border-bottom:1px solid #f8f8f8;
                    }
                    .figure {
                        margin:4px auto;
                        height:18px;
                        width:255px;
                        background:url('/static/img/figure.png');
                        background-size:cover;
                        opacity:0.2;
                    }
                    .vote-result {
                        padding:15px 0px;
                        &>.r-item {
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


                }

            }   
            .user-ctrl {

            }
            .u-comment {
                max-width:555px;
            }
            .comment {
                padding-top:10px;
                // width:600px;
                .content {
                    background-color: #fefeff;
                    border-radius:2px;
                    padding-bottom:12px;
                    border:1px solid #f5f5f5;
                }
                .title {
                    font-size:15px;
                }
                .category {
                    font-size:14px;
                    display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                    padding-top:2px;
                    margin-bottom:5px;
                    span {
                        height:22px;
                        line-height: 22px;
                    }
                    .line {
                        width:1px;
                        height:15px;
                        background-color:#ccc;
                        margin:3px 6px;
                    }
                }
                .empty {
                    text-align:center;
                    background:#fff;
                    height:42px;
                    line-height: 42px;
                }
                .load-more {
                    margin:0px auto;
                    max-width:200px;
                    height:42px;
                    line-height: 42px;
                    color: blue;
                    text-align:center;
                    // background-color: #eee;
                    cursor:pointer;
                    font-size:15px;
                }
                .nor-more {
                    color:#ccc;
                    text-align: center;
                    padding-top:10px;
                }
            }
        } 

        .aside-box {
            width:320px;
            position: absolute;
            right: 0;
            top: 0;
            .aside-items {
                width:100%;
                min-height:150;
                background-color: #fff;
                padding:2.5%;
                margin:0 0 10px;
            }
        }
        @media screen and (max-width:768px){
            padding-right:0;
            .aside-box {
                position: relative;
                width:100%;
            }
        }
        @media screen and (max-width:525px){
            .main-box {
                .example-box {
                    padding-right:2%;
                    // 投票结果
                    .vote-box {
                        position: relative;
                        width:100%;
                        border-left:none;
                        border-top:1px solid #ccc;
                    }
                }

            }
        }   

    }

    
}

</style>
    