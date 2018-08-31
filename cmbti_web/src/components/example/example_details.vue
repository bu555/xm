<template>
<div class="examp-details">
    <NavMain></NavMain>
    <NavSub :data="data" ></NavSub>
        <div class="main-box "  v-loading="loading3">
            <!--人物详情-->
            <div class="example-box">
                    <div class="e-info overflow-row-14">
                        <div class="item">
                            <!--<img :src="exampleItem.img_url" alt="">-->
                            <div class="photo">
                                <img v-if="exampleItem" :src="$pathImgs+exampleItem.img_url" alt="">
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
            <div class="main-ctrl">
                <!--<div>
                    <span class="a-zan btns1" @click="clickZanArticle"><i class="fa fa-thumbs-up"></i><br/>赞 <em>({{data.likes}})</em></span>
                </div>-->
                <div>
                    <span  :class="'a-like btns2 '+ (exampleItem.isLiked?'active':'')"  @click="clickLike"><i class="fa fa-star"></i><br/>关注 <em>({{exampleItem.likes}})</em></span>
                    <!--<span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-star-o"></i> 收藏 <em>({{data.likes}})</em></span>-->
                    
                </div>
                <div>
                    <span  :class="'a-vote btns2 '+ (exampleItem.isVoted?'active':'')" :style="exampleItem.isVoted?'cursor:auto':''" @click="!exampleItem.isVoted?showVote=!showVote:showVote=showVote"><i class="fa fa-bar-chart"></i><br/>投票 <em>({{exampleItem.total}})</em></span>
                    <!--<span  v-else class="a-like btns1" style="margin-right:15px" @click="clickLike"><i class="fa fa-star-o"></i> 收藏 <em>({{data.likes}})</em></span>-->
                    
                </div>
                <div>
                    <span :class="showComment?'a-comm active':'a-comm'" @click="showComment=!showComment"><i class="fa fa-pencil-square-o"></i><br/>写评论</span>
                    <!--<el-button plain size="small"  style="font-size:15px" @click=""><i class="el-icon-edit-outline"  style="font-size:16px"></i> 评论</el-button>-->
                </div>
            </div>
            
            <!-- <div class="a-vote-view" v-if="showVote && !exampleItem.isVoted"> -->
            <div class="a-vote-view" v-if="showVote">
                <div>
                    <p style="margin-bottom:5px">请选择类型：</p>
                    <div class="vote-16">
                        <div class="v-item" v-for="(v,i) in $mbti.kTypes" :style="$mbti.color" :key="i">
                            <p>{{v.t.toUpperCase()}}</p>
                            <div v-for="(v1,i1) in v.t4" @click="myVote=v1" :key="i1" :class="myVote===v1?'active':''">
                                <div class="icon-1"><i class="el-icon-success"></i></div>
                                <font>{{v1.toUpperCase()}}</font>
                            </div>
                            <!-- <button  v-for="(v1,i1) in v.t4" @click="myVote=v1" :key="i1" :class="myVote===v1?'active bu-button bu-gblue':'bu-button bu-gblue'">{{v1.toUpperCase()}}</button> -->
                        </div>
                    </div>
                    <div class="v-result" v-if="myVote">
                        <div>
                            <span>{{myVote.toUpperCase() }}</span> {{myVote2chinese}}
                        </div>
                        <button class="bu-button bu-gblue" @click="vote()">投 票</button>
                    </div>
                    <i class="close-btn el-icon-close " @click="showVote=false"></i>
                </div>
                
            </div>
            <div class="a-publish-comment" v-if="showComment">
                <p style="margin-bottom:5px">评论：</p>
                <el-input type="textarea" v-model="myComment" placeholder="发表评论" :rows="4"></el-input><br>
                <div style="text-align:right;padding-top:10px">
                    <button class="bu-button bu-default" @click="showComment=false;myComment=''">取 消</button>
                    <!-- <el-button size="small" type="primary" @click="comment()">发 表</el-button> -->
                    <button class="bu-button bu-gblue" @click="comment()">发 表</button>
                </div>
            </div>
            
            <!-- 推荐的内容 -->
            <div class="recommend">
                <h2>你可能喜欢</h2>
                <ul>
                    <li v-for="(v,i) in 5" :key="i">
                        <router-link :to="'/forum/'+i"><i class="el-icon-document"></i> {{i+".推荐123"}}</router-link>
                    </li>
                </ul>
            </div>

            <!--评论区-->
            <Comment v-if="eid" :eid="eid"></Comment>


            
        </div>
</div> 
</template>
<script>
import voteResult from "./vote_result"
import voteConsole from "./vote_console"
import Comment from '../common/comment'
import NavMain from '@/components/common/nav_main'
import NavSub from '@/components/common/nav_sub'
export default {
    data(){
        return {
            exampleItem:'',
            isVote:false,
            isGetDate:true,
            isRepeat:false,
            fromPath:'',
            voteArr:[],
            myComment:'',
            myVote:'',
            typeList:[],
            tabFixed:false, //tab定位
            eid:'',
            loading2:false,
            loading3:false,
            showVote:false,
            showComment:false,            
            data:{
                title:'名人库',
                list:[
                    // {
                    //     value:'全部',
                    //     link:'/example?type=all'
                    // }
                ]

            }

        }
    },
    components:{
        voteResult,
        voteConsole,
        Comment,
        NavMain,
        NavSub,
    },
    watch:{
        // 监控登录成功
        '$store.state.userInfo':function(){
            if(this.$store.state.userInfo){
                this.initData()
            }
        }
    },
    computed:{
        myVote2chinese(){
            if(this.myVote){
                let str = ''
                for(let i=0;i<this.myVote.length;i++){
                    str += this.$mbti.e2c[this.myVote[i].toLowerCase()]
                }
                return str+"型"
            }
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
                    // this.exampleHandle(res.data.example)
                    this.showVote = false
                    this.getExampleById()
                    this.exampleItem.isVoted = true
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
                content:this.myComment
            }).then(res=>{
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
        clickLike(){
                this.loading3 = true
                this.$axios.clickExampleLike( {eid: this.eid }).then(res=>{
                    this.loading3 = false
                    if(res.data.success){
                        this.exampleItem.likes = this.exampleItem.likes+res.data.result.count
                        if(res.data.result.count>0){
                            this.exampleItem.isLiked = true
                        }else{
                            this.exampleItem.isLiked = false
                        }
                    }
                }).catch(err=>{
                    this.loading3 = false
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
                this.isRepeat = example.isVoted
                // this.showVote = !example.isVoted

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
        handleScroll () {
            this.tabFixed = window.scrollY>102;
            // console.log(window.scrollY);
        },
        initData(){
            this.commentList=[]
            this.commentPage=1
            this.currentCommentList = []
            this.getExampleById()
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

        //处理typeList数据
        this.$mbti.types.forEach((v,i)=>{
            this.typeList.push({
                value:v,
                label:v.toUpperCase()
            })
        })

    }
    
};
</script>
<style lang="less">
.examp-details {
    width:100%;
        .main-box {
            max-width:970px;
            margin:25px auto;
            width:100%;
            background-color: rgba(255,255,255,.75);
            padding-right:355px;
            position: relative;
            // 人物详情
            .example-box {
                position: relative;
                padding-right:50%;
                overflow: hidden;
                font-size:14px;
                color:#777;
                word-break: break-all; //英文换行
                margin-bottom:15px;
                .e-info {
                    height:268px;
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
                        height:210px;
                        overflow: hidden;
                        background-color: #777;
                    }
                    img {
                        display:block;
                        width:100%;
                        object-fit: cover; //居中
                        // object-fit:fill; //占满 拉伸或压缩 ===img实际设定
                        // object-fit:contain;   //最小方向占满(如果没设高度则按比例)
                        // object-fit:scale-down; //最中间按实际高度 （有宽高则图片大的一侧向占满）
                        height:100%;
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
                            margin-bottom:4px;
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
                        padding:0px;
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
                                font-weight:600;
                                // background-color: pink;
                            }
                            .prog{
                                flex:1;
                                height:25px;
                                border-left:1px solid #7ea1b7;
                                display:flex;
                                align-items:center;
                                &>div {
                                    height:16px;
                                    background-color: #6ac342;
                                    background-image: linear-gradient(to bottom, #aed5ed 0%, #7bbbe2 70%, #5aaadb 100%);
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
            .main-ctrl {
                padding:2% 8% 3% 8%;
                border-top:1px solid #eee;
                border-bottom:1px solid #eee;
                background-color: #fefefe;
                display:flex;
                justify-content: space-between;
                margin-bottom:22px;
                &>div {
                    height:36px;
                    text-align:center;
                    em {
                        font-size:14px;
                    }
                    i {
                        font-size:19px;
                    }
                    span {
                        color:#888;
                        // line-height: 18px;
                        border-radius:2px;
                        cursor:pointer;
                        display:inline-block;
                        font-size:15px;
                    }
                    &>span.active {
                        color:#1b6eb2;
                    }
                }
                .a-like {}
                .a-vote.active {
                    position: relative;
                    &:after {
                        content:'已参与';
                        display: block;
                        height: 17px;
                        width: 42px;
                        color: #fff;
                        font-size: 11px;
                        position: absolute;
                        top: 0px;
                        right: -38px;
                        background-color: #7db3f6;
                        border-radius: 6px 6px 6px 0;
                    }
                }

            }

            .a-vote-view {
                position:fixed;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:5;
                background-color: rgba(0,0,0,.5);
                &>div {
                    max-width:500px;
                    background-color: #fefefe;
                    padding:25px 2%;
                    border-top:1px solid #eee;
                    margin:15vh auto;
                    border-radius:3px;
                    position: relative;
                }
                .vote-16 {
                    display:flex;
                    &>div {
                        flex:0 0 25%;
                    }
                    .v-item {
                        // display:flex;
                        // flex-wrap:wrap;
                        // justify-content: space-between;
                        background-color: #fcfcfc;
                            background: linear-gradient(to bottom, #eaeaea 0%, #f5ece0 100%);
                        // padding:12px;
                        padding-bottom:2px;
                        border:1px solid #eaeaea;
                        border-right:none;
                        padding-top:45px;
                        position: relative;
                        margin-bottom:3px;
                        &>p {
                            position: absolute;
                            top:7px;
                            left:0;
                            width:100%;
                            text-align: center;
                            font-weight:700;
                            font-size:17px;
                            color:#746f6f;

                            color: #fafafa;
                            letter-spacing: 0;
                            text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 ;
                        }
                        &>div {
                            width:69px;
                            // border:1px solid #aaa;
                            margin:0px auto 10px;
                            text-align:left;
                            cursor:pointer;
                            color:#555;
                            padding:2px 0;
                            border-radius:3px;
                            text-shadow: 1px 1px 1px #fff;
                            position: relative;
                            padding-left:1.5em;
                            &>.icon-1 {
                                position: absolute;
                                top:2px;
                                left:.3em;
                                i {
                                    color:#bbb;
                                    opacity: 0;
                                    transition: all .5s;
                                }
                            }
                            &:hover {
                                // font {
                                //     font-weight:700;
                                // }
                                // &>.icon-1 i{
                                //     color:#888;
                                // }
                                &>.icon-1 {
                                    i {
                                        opacity:1;
                                    }
                                }
                            }
                        }
                        &>div.active {
                            font-weight:700;
                            color:#15a743;
                            color: #5d7f94;
                            text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
                            font-weight: bold;
                            text-align: center;
                            // background: linear-gradient(to bottom, #ece4d9 0%,#e9dfd1 100%); 

                            font {

                                // text-shadow: 0 0 1px #0db542;
                            }
                            &>.icon-1 {
                                i {
                                    opacity:1;
                                    color:#0db542;
                                    color:#8799a7;
                                }
                            }
                        }
                    }
                    .v-item:nth-of-type(1){
                        border-radius:3px 0 0 3px;
                    }
                    .v-item:nth-last-child(1){
                        border:1px solid #e1e1e1;
                        border-radius:0 3px 3px 0;
                    }
                    
                }
                .v-result {
                    background-color: #fcfcfc;
                    background-color: #e9fbed;
                    border-radius:3px;
                    padding:6px 0 15px;
                    text-align:center;
                    color:#627887;
                    font-size:14px;
                    border:1px solid #eaeaea;
                    color: #5d7f94;
                    text-shadow: 0 8px 9px #c4b59d, 0px -2px 1px #fff;
                    font-weight: bold;
                    text-align: center;
                    background: linear-gradient(to bottom, #ece4d9 0%,#e9dfd1 100%);                
                    &>div {
                        margin-bottom:10px;
                    }
                    span {
                        font-weight:600;
                        font-size:19px;
                    }
                    button {
                        width:100%;
                        max-width:180px;
                        margin:0 auto;
                        font-size:15px;
                        color:#464f59;
                        font-weight:700;
                    }
                }
                .close-btn {
                    position:absolute;
                    top:12px;
                    right:22px;
                    font-size:18px;
                    cursor:pointer;
                    color:#586a7a;
                    &:hover {
                        color:#454f5a;
                        font-weight:700;
                    }
                }
            }
            .a-publish-comment {
                background-color: #fefefe;
                padding:3%;
                border-top:1px solid #eee;
            }
            // 右侧推荐区
            .recommend {
                width:300px;
                position:absolute;
                right:12px;
                top:0;
                padding:0 12px 12px;
                margin-bottom:22px;
                h2 {
                    font-size:15px;
                    margin-bottom:6px;
                    padding-bottom:4px;
                    color:#0e959d;
                    // font-weight:600;
                    border-bottom:1px solid #f1f1f1;
                }
                ul{
                    li {
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        overflow:hidden;
                        margin-bottom:3px;
                        a {
                            color:#b4b4b4;
                            font-size:14px;
                            &:hover {
                                color:#0e959d;
                            }
                            i {
                                color:#0e959d;

                            }
                        }
                    }
                }
            }
        } 
        @media screen and (max-width:992px){
            .main-box {
                padding:0 12px;            // 右侧推荐区
                .recommend {
                    width:100%;
                    position:relative;
                    right:0px;
                    top:0;
                    padding:0;
                    h2 {
                    }
                    ul{
                        li {
                            a {
                                &:hover {
                                    
                                }
                                i {

                                }
                            }
                        }
                    }
                }
            }
            .a-vote-view .vote-16 .v-item>div {
                flex:0 0 100%;
            }
        }
        @media screen and (max-width:525px){
            .a-vote-view>div {
                margin: 22vh 5px;
            }
            .main-box {
                .example-box {
                    padding-right:0;
                    // 投票结果
                    .vote-box {
                        position: relative;
                        width:100%;
                        border-left:none;
                        border-top:1px solid #ccc;
                        margin-top:15px;
                    }
                }

            }
        }   

    

    
}

</style>
    