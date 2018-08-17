<template>
    <div class="my-comment">
         <div class="comment" v-if="!accountComment && (this.aid || this.eid)" v-loading="loading2||zaning">
            <div class="c-header" >
                 <span class="fa fa-comments" style="font-size:20px;margin-right:4px"></span> 
                  评论
             </div>
            <div class="c-tab">
                <!-- <span>按</span>
                <span :class="commentActive==='hot'?'c-type active':'c-type'" @click="commentActive='hot'">热门</span>
                <span style="color:#bbb">|</span>
                <span :class="commentActive==='time'?'c-type active':'c-type'" @click="commentActive='time'">时间</span> -->
                <SwitchComp @getKey="(key)=>commentActive=key " :active="tabList[0]" :list="tabList"></SwitchComp>
            </div>
             <div class="c-body">
                <div v-if="commentList && !loading2 && commentList.length<1" style="text-align:center;color:#bbb">暂无评论</div>
                <div v-if="commentList && commentList.length>1" class="c-list" v-for="(v,i) in commentList" :key="i">
                    <div class="photo">
                        <Avatar :src="v.avatar" :uid="v.uid" size="small"></Avatar>
                        <!-- <router-link :to="'/info/'+v.uid">
                            <img v-if="v.avatar" :src="$pathAvatar+v.avatar" alt="">
                            <img v-else src="/static/img/logo_a.png" alt="">
                        </router-link> -->
                    </div>
                    <div class="c-name">
                        <em class="overflow-row-1">{{v.r_name}}</em>
                        <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                        <div class="zan c-c">
                            <i :class="'fa fa-thumbs-up'+ (v.isZaned?' active':'')"  @click="zan($event,v.cid,v.zans)"><em>{{v.zans>999?'999+':v.zans}}</em> </i> 
                            <!-- 借用zan字段控制评论（服务端统一返回的是null） -->
                            <i :class="'fa fa-comment'+ (v.zan?' active':'')" @click="v.zan=!v.zan;v.comment=''"></i> 
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
                或许还有更多...
                </div>
             </div>
         </div>
        <!-- 来自account的评论展示 -->
        <div class="comment" v-else-if="(accountComment instanceof Array) && accountComment.length>0 " style="margin-top:15px;min-height:100px">
            <div style="height:15px;background:#f7f7f7"></div>
            <div style="height:40px;line-height:40px;padding-left:4%;background:#a7c8ec;color:#fff">
                <span class="fa fa-commenting" style="font-size:18px;margin-right:4px"></span> 
                我的评论
            </div>
            <div class="c-body">
                <div class="c-list" v-for="(v,i) in accountComment" :key="i">
                        <div class="photo">
                            <Avatar :src="v.avatar" :uid="v.uid" size="small"></Avatar>
                            <!-- <router-link :to="'/info/'+v.uid">
                                <img :src="$store.state.userInfo.avatar?$pathAvatar +$store.state.userInfo.avatar:'/static/img/logo_a.png'" alt="">
                            </router-link> -->
                        </div>
                        <div class="c-name">
                            <em class="overflow-row-1">{{$store.state.userInfo.r_name}}</em>
                            <span>{{$moment(v.c_time).startOf().fromNow()}}</span> 
                            <div class="zan c-c">
                                <i :class="v.isZaned?'fa fa-thumbs-up active':'fa fa-thumbs-up'"  style="cursor:auto"><em>{{v.zans>999?'999+':v.zans}}</em> </i> 
                                <i class="fa fa-comment" style="cursor:auto"></i> 
                            </div>
                        </div>
                        <div v-if="v.rep" class="c-content overflow-row-5" @click="showAllComment($event)" style="background:#eee;padding-left:5px">
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
            </div>
        </div> <!--来自account的评论 end-->
        
    </div>
</template>
<script>
import Avatar from './avatar'
import SwitchComp from './switch'
export default {
    data(){
        return {
            commentActive:'hot',
            loading2:false,
            zaning:false,
            commentList:'',
            // commentList:[
            //     {
            //         avatar:"/5b5eddfab0d08d195c8be81b.jpg",
            //         c_time:"2018-08-15T01:07:37.684Z",
            //         cid:"lgbyD2f",
            //         content:"spaceX??",
            //         isZaned:false,
            //         r_name:"盖茨先生",
            //         rep:{content: "特斯拉的市值约为720亿美元", r_name: "C1046835", uid: "5b6a677d19fe6c35cc71df3c"},
            //         replay:"wyRAyi5",
            //         uid:"5b5eddfab0d08d195c8be81b",
            //         zan:null,
            //         zans:0,
            //         _id:"5b737cd9528891378c64056c"
            //     },
            // ],
            currentCommentList:'',
            size:3,
            commentPage:1,
            accountComment:'',
            tabList:[
                {
                    val:'热门',
                    key:'hot'
                },
                {
                    val:'时间',
                    key:'time'
                }
            ]
        }
    },
    components:{
        Avatar,
        SwitchComp
    },
    props:[
        'aid',
        'eid',
        'accountCommentList', //用户评论
    ],
    watch:{
        'commentActive':function(){
            this.commentPage = 1
            this.getCommentByAid()
        }
    },
    computed:{
        
    },
    methods:{
        zan(e,cid,zans){
            let pro 
            let params = {
                cid:cid
            }
            if(this.aid){
                params.aid = this.aid
                pro = this.$axios.clickArticleCommentZan(params)
            }else if(this.eid){
                params.eid = this.eid
                pro = this.$axios.clickExampleCommentZan(params)
            }else{
                return
            }
            if(this.zaning) return
            this.zaning = true
            let d = e.currentTarget.querySelector('em')
            let iTag = e.currentTarget
            let count = d.innerHTML
            pro.then(res=>{
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
        getCommentByAid(){
            let pro
            let params = {
                page:this.commentPage,
                size:this.size,
                type:this.commentActive
            }
            if(this.aid){
                params.aid = this.aid
                pro = this.$axios.getCommentByAid(params)
            }else if(this.eid){
                params.eid = this.eid
                pro = this.$axios.getComment(params)
            }else{
                return
            }

            this.loading2 = true
            pro.then(res=>{
                this.loading2 = false
                if(res.data.success){
                    this.currentCommentList = res.data.data
                    if(this.commentPage===1){
                        this.commentList = []
                    }
                    this.commentList = this.commentList.concat(res.data.data)
                }
            }).catch(err=>{
                this.loading2 = false
            })
        },
        reply(cid,repContent,callback){
            repContent = repContent?repContent:''
            if(!repContent.trim()){
                this.$message.error('请输入回复内容！');
                return 
            }
            this.loading = true
            this.$axios.articleAddComment({aid:this.aid,content:repContent,cid:cid}).then(res=>{
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
        moreComment(){
            this.commentPage = this.commentPage-0+1  //页数加1
            this.getCommentByAid()  //获取下一页评论
        },
        // 显示所有评论
        showAllComment(e){
            e.currentTarget.classList.toggle('overflow-row-5')
        }

    },
    created(){
        if(this.accountCommentList){
            this.accountComment = this.accountCommentList
        }else if(this.aid || this.eid){
            this.getCommentByAid()
        }
    }
}
</script>
<style lang="less" scoped>
.my-comment {
    .comment {
        box-shadow: 0 2px 3px #cacaca;
        border-radius:4px 4px 0 0;
        overflow: hidden;
        .c-header {
            height:50px;
            line-height: 50px;
            background: linear-gradient(#7d90a1, #6e8294);
            padding-left:4%;
            color:#fff;
            font-size:16px;
            display:flex;
            align-items:center;
        }
        .c-tab {
                height:52px;
                // line-height: 52px;
                box-shadow: 0 1px 2px #44505e inset;
                padding-left:4%;
                font-size:16px;
                display:flex;
                justify-content: left;
                align-items:center;
                color:#555;
                // background: #586978;
                background: #96a3ae;
                border-top: 1px solid #44505e;
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
            padding:1% 4.5% 5% 4%;
            min-height:420px;
            background-color: #fff;
            .c-list {
                // background: pink;
                padding:12px 0px 9px 50px;
                border-bottom:1px solid #f7f7f7;
                position: relative;
                color:#3c3c3c;
                .photo {
                    // width:38px;
                    // height:38px;
                    // border:1px solid #eee;
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
                            margin-right: 3px;
                        }
                    }
                }
                .c-content {
                    padding:2px 0 2px;
                    font-size:14px;
                    word-break:break-all; //英文换行
                }
                .reply {
                    padding-right:58px;
                    position: relative;
                    padding-top:10px;
                    border-top:1px dotted #eee;
                    // background-color: #f5f5f5;
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
    .overflow-row-1 {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .overflow-row-5 {
        display: -webkit-box;    
        -webkit-box-orient: vertical;    
        -webkit-line-clamp: 5;    
        overflow: hidden;
    }
    a:hover {
        text-decoration:none;
    }
    @media screen and (max-width:768px){
        flex-wrap:wrap;
        .main-box {

        }
    }
    @media screen and (max-width:525px) {
        .main-box {
            .a-header {
                .title {
                    padding:4% 2.5%;
                    .h1 {
                        padding-right:0;
                        font-size:20px;
                    }
                    .t-info {
                        .text {
                            // padding-right:82px;
                            background: #fcfcfc;
                            .btns {
                                // position: absolute;
                                // right:0px;
                                // top:5px;
                            }
                        }
                        .author {
                            position:relative;
                            display:flex;
                            justify-content:space-between;
                            align-items:center;
                            width:100%;
                            top:0px;
                            right:0px;
                            background-color: #fcfcfc;
                            padding:5px 5px;
                            border-radius:3px;
                            margin-top:4px;
                            img {
                                flex:0 0 auto;
                                width:35px;
                                height:35px;
                                // border-radius:50%;
                                border-radius:4px;
                                border:1px solid #f5f5f5;
                                display:block;
                                margin:0;
                            }
                            &>span {
                                display:block;
                                margin:0;
                                text-align:center;
                            }
                            .a-name {
                                flex:1;
                                text-align:left;
                                font-size:14px;
                                padding-left:5px;
                            }
                            .btns {
                            }
                        }

                    }
                    
                }
            }
            .a-body {
                padding:3% 2.5% 5% 3%;
                font-size:17px;
            }
            .comment {
                // padding:2% 2.5% 2% 3%;
                padding:0;
                .c-body {
                    padding:2% 2.5% 2% 3%;
                    .c-list {
                        padding-left:45px;
                        .c-content {
                        }
                    }
                }

            }
            .main-ctrl {
                padding:2% 2.5% 2% 4%;
            }
        }
    }
}
</style>


