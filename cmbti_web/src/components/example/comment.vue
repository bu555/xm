<template>
<div class="my-comment">
    <!--<div class="title">评论区</div>
    <div class="category">
        <span>分类：</span>
        <span>热门</span>
        <span class="line"></span>
        <span>最新</span>
    </div>-->
    <div class="comment-list">
        <div class="items" v-for="(v,i) in comment" :key="i">
            <div class="photo">
                <img src="/static/img/logo_a.png" alt="">
            </div>
            <div class="com-header"> 
                <div class="role-name">{{v.role_name}}</div> 
                <div class="date">{{$moment(v.c_time).fromNow()}}</div>
            </div>
            <div class="com-content">
                <p>{{v.result}}</p>
            </div>
            <div class="handle">
                <div :class="v.zaned?'zan active':'zan'" :ref="'zan'+i" @click="zan({cid:v._id},'zan'+i)" >
                    <!--<span class="el-icon-star-on"></span> {{v.zanCount}}-->
                    <span class="el-icon-caret-top"></span> <em>{{v.zanCount}}</em>
                </div>
                <!--<div class="reply">
                    O 1234
                </div>
                <div class="share">
                    →
                </div>-->
            </div>
        </div>

    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            // comment:[]
        }
    },
    props:['comment'],
    methods:{
        zan(options,ref){
                options.eid = this.$route.path.split('/')[2]
                if(this.zaning) return;
                this.zaning = true;
                this.$axios.clickZan(options).then(res=>{
                    this.zaning = false
                    if(res.data.success){
                        console.log(res);
                        console.log(this.$refs[ref]);
                        let currentDOM = this.$refs[ref][0];
                        currentDOM.classList.toggle('active')
                        if(currentDOM.classList.contains('active')){
                            console.log(currentDOM.querySelector('em').innerHTML)
                            currentDOM.querySelector('em').innerHTML = Number(currentDOM.querySelector('em').innerHTML) +1
                        }else{
                            currentDOM.querySelector('em').innerHTML = Number(currentDOM.querySelector('em').innerHTML) -1
                        }
                    }
                }).catch(err=>{
                    this.zaning = false
                })
        }
    },
    created(){
        
    }
}
</script>
<style lang='less'>
.my-comment {
    text-align: left;
    // max-width:600px;
    margin:15px;
    margin-top:7px;
    .comment-list {
        .items {
            font-size:14px;
            padding-left:70px;
            border-bottom:1px solid #f5f5f5;
            position: relative;
            .photo {
                width:42px;
                height:42px;
                // border-radius:50%;
                overflow: hidden;
                border:1px solid #eee;
                background-color: #eee;
                position: absolute;
                left: 7px;
                top:10px;
                img {
                    width:100%;
                    // height:auto;
                    // object-fit: cover;
                }
            }
            .com-header {
                display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                align-items: center; //垂直居中
                // justify-content: center; //水平居中
                padding:7px 0 3px;
                &>div{
                    margin-right:10px;
                }
                .role-name {
                    color:#598dd3;
                }
                .date {
                    color:#ccc;
                    font-size:12px;
                }
            }
            .com-content {
                border-top:1px dotted #f7f7f7;
                // border-bottom:1px solid #fafafd;
                padding-top:4px;
                min-height:28px;
                max-width:555px;
            }
            .handle {
                display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                align-items: center; //垂直居中
                // justify-content: center; //水平居中
                padding:2px 0 15px;
                .zan {
                    background-color: #fafcfc;
                    padding:1px 7px;
                    padding-right:10px;
                    border:1px solid #f2f2f2;
                    border-radius:4px;
                    cursor:pointer;
                    color:#aaa;
                }
                .zan.active {
                    border:1px solid #d5edfd;
                    background-color: #f6fdff;
                    color:#288ef7;
                }
            }
        }

    }
    @media screen and (max-width:500px){
        .comment-list {
            .items {
                padding-left:57px;
                .photo {
                    left: -1px;
                    top:10px;
                }
            }

        }
    }
}
</style>

