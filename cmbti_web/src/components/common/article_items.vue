<template>
  <div class="article-items">
        <div class="article-preview">
            <router-link  :to="'/forum/'+items._id" class="title">{{items.title}}</router-link>
            <router-link  :to="'/forum/'+items._id" class="content">{{items.title}}</router-link>
            <div class="info">
                    <!-- <img src="/static/img/si.jpg" alt=""> -->
                    <span class="author">{{items.r_name}}</span>
                    <span class="comments fa fa-comment">{{' '+ (items.comment || 'null')}}</span>
                    <span class="replay-time fa fa-heart">{{' '+ items.likes}}</span>
                
            </div>
        </div>
        <router-link  :to="'/forum/'+items._id" class="img-preview">
            <img src="/static/img/si.jpg" alt="">
        </router-link>
  </div>
</template>
<script>
export default {
    props:[
        'data'
    ],
    computed:{
        items(){
            return this.data || {}
        }
    }
}
</script>
<style lang="less" scoped>
.article-items {
    max-width:768px;
    display:flex;
    min-height:120px;
    overflow: hidden;
    border-top:1px solid #f1f1f1;
    padding: 8px 0;
    .article-preview {
        flex:1;
        a.title {
            font-size:16px;
            line-height: 18px;
            margin-bottom:4px;
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 2;    
            overflow: hidden;
            word-wrap:break-word;
            white-space:normal; 
            word-break:break-all;

        }
        .content {
            display:block;
            height:50px;
            margin-bottom:5px;
            font-size:13px;
            color:#b4b4b4;
            display: -webkit-box;    
            -webkit-box-orient: vertical;    
            -webkit-line-clamp: 3; 
            overflow: hidden;
            word-wrap:break-word;
            white-space:normal; 
            word-break:break-all;
        }
        div.info {
            display:flex;
            justify-content: flex-start;
            align-items: center;
            span {
                font-size:13px;
                color:#ccc;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            span+span {
                margin-left:.8em;
                font-size:12px;
            }
            span.author{
                max-width:125px;
            }
        }
    }
    .img-preview {
        flex:0 0 132px;
        height:92px;
        border-radius:2px;
        margin:2px 0 0 8px;
        overflow: hidden;
        img {
            width:100%;
            height:100%;
            object-fit: cover;
        }
    }
    
    @media screen and (max-width:500px){
        .img-preview {
            flex: 0 0 120px;
            height:88px;
            img {
            }
        } 
        .article-preview {
            h2 {
            }
            .content {
            }
            div.info {
                span.author{
                    max-width:100px;
                }
            }
            
        }
    }
    @media screen and (max-width:400px){
        .img-preview {
            flex: 0 0 105px;
            height:88px;
            img {
            }
        }   
    }
    
}
</style>


