<template>
<div class="comment">
    <div class="title">评论区</div>
    <div class="category">
        <span>分类：</span>
        <span>热门</span>
        <span class="line"></span>
        <span>最新</span>
    </div>
    <div class="comment-list">
        <div class="items">
            <div class="com-header"> 
                <div class="photo">像</div>
                <div class="role-name">角色名55</div> 
                <div class="date">2002-6-6</div>
            </div>
            <div class="com-content">XXXXXXXXXXXXXXXXXXXXXXXXXX</br>XXXXXXXXXXXXXX</div>
            <div class="handle">
                <div class="zan">
                    ↑ 1234
                </div>
                <div class="reply">
                    O 1234
                </div>
                <div class="share">
                    →
                </div>
            </div>
        </div>
        <div class="items">
            <div class="com-header"> 
                <div class="photo">像</div>
                <div class="role-name">角色名55</div> 
                <div class="date">2002-6-6</div>
            </div>
            <div class="com-content">XXXXXXXXXXXXXXXXXXXXXXXXXX</br>XXXXXXXXXXXXXX</div>
            <div class="handle">
                <div class="zan">
                    ↑ 1234
                </div>
                <div class="reply">
                    O 1234
                </div>
                <div class="share">
                    →
                </div>
            </div>
        </div>
        <div class="items">
            <div class="com-header"> 
                <div class="photo">像</div>
                <div class="role-name">角色名55</div> 
                <div class="date">2002-6-6</div>
            </div>
            <div class="com-content">XXXXXXXXXXXXXXXXXXXXXXXXXX</br>XXXXXXXXXXXXXX</div>
            <div class="handle">
                <div class="zan">
                    ↑ 1234
                </div>
                <div class="reply">
                    O 1234
                </div>
                <div class="share">
                    →
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang='less'>
.comment {
    text-align: left;
    padding:8px;
    .title {
        font-size:15px;
    }
    .category {
        font-size:14px;
        display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
        padding-top:2px;
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
    .comment-list {
        .items {
            font-size:12px;
            padding:6px 0;
            border-top:1px solid #ddd;
            .com-header {
                display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                align-items: center; //垂直居中
                // justify-content: center; //水平居中
                padding:1px 0;
                &>div{
                    margin-right:10px;
                }
                .photo {
                    width:28px;
                    height:20px;
                    border-radius:14px;
                    text-align:center;
                    line-height:20px;
                    border:1px solid #eee;
                    background-color: #ccc;
                }
                .role-name {
                }
                .date {
                    color:#aaa;
                }
            }
            .com-content {
                border-top:1px solid #f5f5f5;
                padding:6px 0;
                min-height:32px;
            }
            .handle {
                display: flex; display: -webkit-flex;display: -ms-flex;display: -o-flex;
                align-items: center; //垂直居中
                // justify-content: center; //水平居中
                padding:2px 0 8px;

            }
        }
    }
}
</style>

