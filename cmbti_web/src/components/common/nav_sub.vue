<template>
    <div class="x-nav-sub">
        <div class="sub-nav-inner">
            <div class="nav-title" v-html="format(navList.title)">
                
            </div>
            <div class="search" v-if="typeof searchVal==='string'">
                <input type="text" spellcheck="false" v-model="searchVal" @input="inputHandler" @keyup.enter="submit" :placeholder="placeholder">
                <span class="search-btn"><i class="el-icon-search"  @click="submit"></i></span>
            </div>
            <ul class="nav-list in-top" v-else>
                <li v-for="(v,i) in navList.list" :key="i">
                    <router-link :to="v.link" v-html="format(v.value)"></router-link>
                </li>
            </ul>
        </div>
        <div class="bottom-nav" v-if="typeof searchVal==='string'">
            <ul :class="'nav-list in-bottom '">
                <li v-for="(v,i) in navList.list" :key="i" :class="$route.fullPath.indexOf(v.link)>-1?'active':''">
                    <router-link :to="v.link" v-html="format(v.value)"></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchVal:null,
            inputPlaceholder:''

        }
    },
    props:[
        'data',
        'search',
        'placeholder'
    ],
    watch: {
        'search':'init'
    },
    computed:{
        navList(){
            return this.data
        }
    },
    methods: {
        init(){
            this.searchVal = this.search
            this.inputPlaceholder = this.placeholder || ''
        },
        inputHandler(){
            this.$emit('searchVal',this.searchVal)
        },
        format(str){
            return str.replace(/\w+/g,function(s){
                return `<em>${s}</em>`
            })
        },
        submit(){
            if(this.searchVal){
                this.$emit('submit')
            }
        }
    },
    created(){
        this.init()
    }
}
</script>

<style lang="less">
  .x-nav-sub{
    // background-color: #f0f6f3;;s
    background-color: #f0f3ef;
    .sub-nav-inner {
        max-width:970px;
        margin:0 auto;
        display:flex;
        justify-content: flex-start;
        align-items: flex-start;
        // height:70px;
        padding:22px 0;
        .nav-title {
            font-size:27px;
            font-weight:550;
            color:#0e959d;
            margin-right:1.8em;
            white-space: nowrap;
            em {
                font-size:28px;
            }
        }
        .search {
                height:30px;
                display:flex;
                align-items: center;
                border:1px solid #eee;
                border-radius:3px;
                padding-left:2px;
                width:290px;
                background-color: #fcfcfc;
                margin-top: 4px;
            input {
                flex:1;
                height:28px;
                border:0;outline:none; //去除蓝色框
                font-size:14px;
                padding-left:5px;
                color:#888;
                background-color: transparent;
                width:100%;
            }
            .search-btn {
                padding:2px 5px;
                cursor:pointer;
                margin-right:3px;
                color:#d5d5d5;
                &:hover {
                    text-shadow: 0 0 1px #545652;
                }
            }
        }
    }
    .bottom-nav {
        border-top:1px solid #e3e9e2;
        min-height:36px;
    }
    
    ul.nav-list.in-top {
    }
    ul.nav-list {
        display:flex;
        justify-content: flex-start;
        align-items:center;
        min-height:33px;
        padding-top:3px;
        li {
            // padding-left:50px;
            a {
                font-size:15px;
                color:#4d7b9e;
                em {
                    font-size:16px;
                }
            }
        }    
        li.active a {
            font-weight:700;
        }
        li+li {
            padding-left:32px;
        }    
    }
    ul.nav-list.in-bottom {
        // min-height:38px;
        max-width:970px;
        margin:0 auto;
        align-items:center;
    }
    @media screen and (max-width:992px) {
        .sub-nav-inner,.bottom-nav {
            padding-left:12px;
            padding-right:12px;
        }
    }
    @media screen and (max-width:500px) {
        .sub-nav-inner,.bottom-nav {
            .nav-title {
                margin-right:1.5em;
            }
            .search { 
                width:100%;
            }
        }
        ul.nav-list.in-top {
            align-items:flex-start;
            flex-wrap:wrap;
            li {
                flex:0 0 100%;
                padding-left:0;
            }
        }
        ul.nav-list {
            display:flex;
            justify-content: flex-start;
            align-items:center;
            min-height:33px;
            padding-top:3px;
            li {
                
            }
        }
    }
  }
</style>
