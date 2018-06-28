<template>
    <div class="footer">
        <div class="f-body">
            <div class="f-logo">
                <img v-if="0" src="/static/img/logo_a.png" alt="">
                <span class="m-name">mbti.wang</span>
            </div>
            <div class="f-links">
                <ul>
                    <li>
                        <router-link to="/">
                            关于我们
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            联系我们
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            加入我们
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            服务条款
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            帮助中心
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="f-copy">
            ©2018 mbti.wang
        </div>
    </div>
</template>
<style lang="less">
.footer{
    background-color: #456ea5;
    // background-color: #598dd3;
    // background-color: #ebf5fb;
    text-align: center;
    min-height:70px;
    .f-body {
        max-width:1180px;
        margin:0 auto;
        .f-logo {
            img {
                width:70px;
                height:70px;
                margin:22px;
            }
            .m-name {
                color:#feaf4b;
                font-size:18px;
            }

        }
        .f-links {
            ul{
                display:flex;
                justify-content: center;
                flex-wrap:wrap;
                align-items:center;
                li{
                    padding:0 10px;
                    a {
                        color:#b7bfc7;;
                    }
                }
            }
        }

    }
    .f-copy {
        padding:10px 0 10px;
        border-top:1px solid #457ea5;
    }
}
</style>
