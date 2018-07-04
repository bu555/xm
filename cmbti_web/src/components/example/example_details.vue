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
                        <div class="e-show">
                            <!--人物详情-->
                            <div class="example-box">
                                    <div class="e-info overflow-row-13">
                                        <div class="item">
                                            <!--<img :src="exampleItem.img_url" alt="">-->
                                            <div class="photo">
                                                <img :src="$pathImgs+exampleItem.img_url" alt="">
                                            </div>
                                            <div class="e-more">
                                                <a href="" target="_blank">[维基百科]</a>
                                                <a href="" target="_blank">[百度百科]</a>查看更多
                                            </div>
                                        </div>
                                        {{exampleItem.info}}
                                    </div>
                                    <!--投票-->
                                    <div class="vote-box" v-if="!isVote">
                                            <div class="info">
                                            </div>
                                            <div class="vote-title">
                                                <p class="tit overflow-row-1">{{exampleItem.name}}</p>
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
                        </div>
                        <!--评论区-->
                        <div class="comment" v-loading="loading2||zaning">
                            <div class="c-header" >
                                <span class="icon iconfont icon-interactive" style="font-size:25px"></span> 
                                <span> 评论</span>
                            </div>
                            <div class="c-tab">
                                <span>按</span>
                                <span :class="commentActive==='hot'?'c-type active':'c-type'" @click="commentActive='hot'">热门</span>
                                <span style="color:#bbb">|</span>
                                <span :class="commentActive==='time'?'c-type active':'c-type'" @click="commentActive='time'">时间</span>
                            </div>
                            <div class="c-body">
                                <div v-if="!loading2 && commentList.length<1" style="text-align:center;color:#bbb">暂无评论</div>
                                <div class="c-list" v-for="(v,i) in commentList">
                                    <div class="photo">
                                        <router-link :to="'/info/'+v.uid">
                                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                                            <img v-else src="/static/img/logo_a.png" alt="">
                                        </router-link>
                                    </div>
                                    <div class="c-name">
                                        <em class="overflow-row-1">{{v.r_name}}</em>
                                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                                        <div class="zan c-c">
                                            <i :class="v.isZaned?'fa fa-thumbs-up active':'fa fa-thumbs-up'"  @click="zan($event,v.cid,v.zans)"><em>{{v.zans>999?'999+':v.zans}}</em> </i> 
                                            <i class="fa fa-comment" @click="v.zan=!v.zan;v.comment=''"></i> 
                                        </div>
                                    </div>
                                    <!--回复用户-->
                                    <div v-if="v.rep" class="c-content overflow-row-5" @click="showAllComment($event)" style="background:#eee;padding:3px;padding-left:5px">
                                        <span style="color:#5e8dd0">{{v.rep.r_name}}：</span>
                                        {{v.rep.content}}
                                    </div>
                                    <div class="c-content overflow-row-5" @click="showAllComment($event)" >{{v.content}}
                                    </div>
                                    <div class="reply" v-if="v.zan">
                                        <el-input
                                        type="textarea"
                                        autosize
                                        placeholder="回复内容："
                                        v-model="v.repContent">
                                        </el-input>
                                        <div class="reply-btn">
                                            <el-button type="primary" size="mini" @click="reply(v.cid,v.repContent,()=>{v.zan=false;v.comment=''})">发送</el-button>
                                        </div>
                                    </div>
                                </div>

                                <div class="load-more" v-if="!loading2 && currentCommentList.length==size" @click="moreComment">
                                加载更多...
                                </div>
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
            eid:'',
            size:4,
            currentCommentList:[],
            commentActive:'hot',
            loading2:false,
            zaning:false

        }
    },
    watch:{
        '$store.state.modalLoginSuccess':'initData',
        'commentActive':function(){
            console.log('kkkkkkkkk');
            this.commentPage = 1
            this.commentList = []
            this.getComment()
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
        reply(cid,repContent,callback){
            repContent = repContent?repContent:''
            if(!repContent.trim()){
                this.$message.error('请输入回复内容！');
                return 
            }
            this.loading = true
            this.$axios.addComment({eid:this.eid,result:repContent,cid:cid}).then(res=>{
                this.loading = false
                if(res.data.success){
                    this.$message({
                        message: '回复成功！',
                        type: 'success'
                    });
                    callback && callback()
                }
            }).catch(err=>{
                this.loading = false
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
                    // this.commentPage = 1
                    // this.getComment()
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
                    params:{
                        eid:this.eid
                    }
                }).then(res=>{
                    if(res.data.success){
                        this.exampleHandle(res.data.example)
                    }else{
                    }
                }).catch(res=>{})

        },
        getComment(){
            this.loading2 = true
            this.$axios.getComment({
                eid:this.eid,
                page:this.commentPage,
                size:this.size,
                type:this.commentActive
            }).then(res=>{
                this.loading2 = false
                if(res.data.success){
                    this.currentCommentList = res.data.comment
                    this.commentList = this.commentList.concat(res.data.comment)
                }
            }).catch(error=>{
                this.loading2 = false
                console.log(error);
            })

        },
        zan(e,cid,zans){
            if(this.zaning) return
            this.zaning = true
            let d = e.currentTarget.querySelector('em')
            let iTag = e.currentTarget
            let count = d.innerHTML
            this.$axios.clickExampleCommentZan({eid:this.eid,cid:cid}).then(res=>{
                this.zaning = false
                if(res.data.success){
                    if(/^\d+$/.test(count)){
                        d.innerHTML = Number(count)+res.data.result.count
                    }else{
                        console.log('非数字');
                    }
                    if(res.data.result.count==1){
                        iTag.classList.add('active')
                    }else if(res.data.result.count==-1){
                        iTag.classList.remove('active')
                    }
                }
            }).catch(err=>{
                this.zaning = false
            })

        },
        moreComment(){
            this.commentPage = this.commentPage-0+1  //页数加1
            this.getComment()  //获取下一页评论
        },
        // 显示所有评论
        showAllComment(e){
            e.currentTarget.classList.toggle('overflow-row-5')
        },
        handleScroll () {
            this.tabFixed = window.scrollY>102;
            // console.log(window.scrollY);
        },
        initData(){
            this.commentList=[]
            this.commentPage=1
            this.currentCommentList = []
            this.getExampleById()
            this.getComment()
        }
    },
    mounted(){
        // window.addEventListener('scroll', this.handleScroll);

        navigator.serviceWorker.addEventListener('message', function (event) {
            if (e.data === 'sw.update') {
                console.log('接收到',e.data);
                // 此处可以操作页面的 DOM 元素啦
            }
        });
    },
    created(){
        this.eid = this.$route.path.split('/')[2]
        this.initData()
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
            max-width:1180px;
            margin:15px auto;
            position: relative;
            padding-right:332px;
        .main-box {
            margin-bottom:12px;
            width:100%;
            background-color: rgba(255,255,255,.75);
            margin-top:3px;
            // padding:1% 1%;
            // 人物详情
            .example-box {
                position: relative;
                padding:2%;
                padding-right:50%;
                // background-color: #f5f5f5;
                overflow: hidden;
                font-size:14px;
                color:#777;
                word-break: break-all; //英文换行
                margin-bottom:15px;
                .e-info {
                    height:262px;
                    padding-right:180px;
                    position: relative;
                }
                a {
                    color:#70a9e5;
                }
                .item {
                    // flex:1 0 46%;
                    box-sizing: border-box;
                    width:170px;
                    position: absolute;
                    right:0px;
                    top:0px;
                    .photo {
                        width:100%;
                        height:200px;
                        overflow: hidden;
                        background-color: #777;
                    }
                    img {
                        width:100%;
                    }
                    .e-more {
                        padding:7px 0;
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
            .e-show {
                padding:2%;
            }
            .user-ctrl {
                margin-bottom:25px;
            }
            .u-comment {
                max-width:555px;
            }
            .comment {
                background-color: #fff;
                min-height:150px;
                padding-bottom:10px;
                min-height:470px;
                border-top:15px solid #f7f7f7;
                .c-header {
                    height:40px;
                    line-height: 40px;
                    border-bottom:1px solid #eee;
                    background-color: #a4c8ed;
                    padding-left:4%;
                    color:#fff;
                    font-size:16px;
                    display:flex;
                    align-items:center;
                }
                .c-tab {
                        height:42px;
                        line-height: 42px;
                        border-bottom:1px solid #fafafa;
                        background-color: #fafafa;
                        padding-left:4%;
                        font-size:16px;
                        display:flex;
                        color:#555;
                        &>span {
                            margin-right:7px;
                        }
                        .c-type {
                            cursor:pointer;
                        }
                        &>.c-type.active {
                            font-weight:700;
                            color:#496ea3;
                        }
                    }
                    .c-body {
                        padding:1% 4.5% 3% 4%;
                        .c-list {
                            // background: pink;
                            min-height:60px;
                            padding:12px 0px 9px 50px;
                            border-bottom:1px solid #f7f7f7;
                            position: relative;
                            color:#3c3c3c;
                            .photo {
                                width:39px;
                                height:39px;
                                border:1px solid #eee;
                                position: absolute;
                                top:15px;
                                left:0px;
                                border-radius:2px;
                                img {
                                    width:100%;
                                    height:100%;
                                }
                            }
                            .c-name {
                                font-size:15px;
                                display:flex;
                                align-items:center;
                                color:#7f7d7d;
                                position: relative;
                                margin-bottom: 2px;
                                &>em {
                                    display:inline-block;
                                    max-width:97px;
                                    color:#555;
                                }
                                &>span {
                                    padding-left:10px;
                                    font-weight:400;
                                    font-size:14px;
                                }
                                .zan.c-c {
                                    line-height: 20px;;
                                    // vertical-align: middle;
                                    display:flex;
                                    align-items: center;
                                    min-width:55px;
                                    max-width:82px;
                                    // margin-right:42px;
                                    color:#cbcbcb;
                                    position: absolute;
                                    padding-right:1px;
                                    right:0px;
                                    top:-2px;
                                    i {
                                        cursor:pointer;
                                        font-size:19px;
                                    }
                                    i.active {
                                        color:#75a9e3;
                                    }
                                    em {
                                        font-size:14px;
                                        position: relative;
                                        top:1px;
                                    }
                                    i.fa-comment {
                                        font-size:17px;
                                        margin-left:22px;
                                    }
                                }
                            }
                            .c-content {
                                padding:2px 0 5px;
                                font-size:14px;
                                word-break:break-all; //英文换行
                            }
                            .reply {
                                padding-right:58px;
                                position: relative;
                                padding-top:10px;
                                border-top:1px dotted #eee;
                                background-color: #f5f5f5;
                                .reply-btn {
                                    position: absolute;
                                    top:10px;
                                    right:0px;
                                }
                                .el-button--mini, .el-button--mini.is-round {
                                    padding: 9px 15px;
                                    padding-bottom:10px;
                                }
                            }
                        }
                        .load-more {
                            max-width:365px;
                            margin:0 auto;
                            text-align:center;
                            padding:10px 0;
                            cursor:pointer;
                            color:#598dd3;
                            &:hover {
                                color:#456ea5;
                            }
                        }
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
    