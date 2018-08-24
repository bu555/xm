<template>
  <div class="nav_bar">
    <div class="container-fluid">
      <div class="row" style="overflow: hidden">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 nav_name">
          <ul class="clearfix nav_list">
            <li v-for="(item,index) in $store.state.nav_type" :key="index">
              <router-link :to="{path:'/tag/'+item.TagName}">
                {{item.TagName}}
              </router-link>
            </li>

          </ul>
        </div>
        <div class="col-sm-10 col-xs-10 media_block">
          <router-link to="/">
          <!-- <img src="/static/img/logo.png" alt=""> -->
            <img :src="$store.state.logo_style>768?'/static/img/logo.png':'/static/img/logo_phone.png'" alt="" class="logo-img">
          </router-link>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" style="position: relative">
          <div @click="nav_toggle" class="click_icon" style="position: absolute;top: 13px;right: 10px">
            <i :class="$store.state.nav_down_icon" id="nav_down_icon" style="color:white;font-size: 20px;cursor:pointer"></i>
          </div>
        </div>
      </div>
      <div style="height: 100%">
        <div v-show="$store.state.nav_down" class="nav_bar_down" style="position: absolute;transform: translateY(3%);right: 0">
          <div>
            <div class="triangle_border_up">
              <span></span>
            </div>
            <!--<div class="relation_us">-->
            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 relation_chara">-->
            <!--<div>-->
            <!--<img src="/static/img/relation.png">-->
            <!--</div>-->
            <!--<div style="padding-left: 15px">-->
            <!--<div>聯係我們</div>-->
            <!--<div style="color: #999999;font-size: 12px">在綫時間：9:30-18:30</div>-->
            <!--</div>-->
            <!--<div></div>-->
            <!--</div>-->
            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 relation_btn">-->
            <!--<div>-->
            <!--<router-link to="/contactus">-->
            <!--在綫留言-->
            <!--</router-link>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="line"></div>
            <nav_bar_down/>
            <div class="line"></div>
            <div class="col-lg-0 col-md-0 col-sm-0 col-xs-12 phone_share" style="margin: 20px 0;display: none">
              <facebook_share2/>
              <google_share2/>
              <twitter_share2/>
              <whatsapp_share2/>
              <in_share2/>
              <pinterest_share2/>
            </div>
            <div class="relation_foot row">
              <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 chara">
                <div>
                  <router-link to="/disclaimer">重要聲明</router-link>
                  <span style="border-right: 1px solid #ccc;margin: 0px 5px 0 3px;"></span>
                  <router-link to="/privacy">隱私政策</router-link>
                  <span style="border-right: 1px solid #ccc;margin: 0px 5px 0 3px;"></span>
                  <router-link to="/contactus">意見反饋</router-link>
                  <span style="border-right: 1px solid #ccc;margin: 0px 5px 0 3px;"></span>
                  <router-link to="/help/1">幫助中心</router-link>
                </div>
                <div class="oo" style="color: #999;text-align: left;margin: 10px 0;font-size: 12px">
                  © 2018 OopsDaily
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 share_modil" style="text-align: right">
                <div class="dropdown">
                  <share/>
                </div>
              </div>

              <div class="col-xs-12">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nav_bar_down from "@/components/common/nav_bar_down";

import facebook_share2 from "@/components/common/share_button2/facebook_share_btn";
import google_share2 from "@/components/common/share_button2/google_share_btn";
import twitter_share2 from "@/components/common/share_button2/twitter_share_btn";
import pinterest_share2 from "@/components/common/share_button2/pinterest_share_btn"
import in_share2 from "@/components/common/share_button2/in_share_btn"
import whatsapp_share2 from "@/components/common/share_button2/whatsapp_share_btn";

import share from "@/components/common/share"
export default {
  name: "nav_bar",
  data() {
    return {};
  },
  components: {
    nav_bar_down: nav_bar_down, //導航下拉
    facebook_share2: facebook_share2,
    google_share2: google_share2,
    twitter_share2: twitter_share2,
    pinterest_share2:pinterest_share2,
    in_share2:in_share2,
    whatsapp_share2:whatsapp_share2,
    share:share,
    nav_type: [],
    logo_boolean:""
    
  },
  created() {
  },
  watch: {},
  methods: {
    // 显示 / 隐藏
    nav_toggle() {
      if (this.$store.state.nav_down_icon == "fa fa-bars") {
        this.$store.state.nav_down = true;
        this.$store.state.nav_down_icon = "fa fa-close";
      } else {
        this.$store.state.nav_down = false;
        this.$store.state.nav_down_icon = "fa fa-bars";
      }
    },
    footer_show() {
      this.$store.state.foot_all_style = true;
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped lang="less">
@media screen and(max-width: 414px) {
  .media_414_none {
    display: none;
  }
  .relation_foot{
    .col-xs-8{
      width: 100%;
    }
  }
  .media_block {
    text-align: center !important;
  }
  .media_block > a {
    display: inline-block !important;
  }
  .oo {
    text-align: center !important;
  }
  .chara {
    text-align: center !important;
  }
  .phone_share {
    display: block !important;
  }
  .nav_bar_down .relation_foot {
    padding: 13px !important;
  }
  .share_modil {
    display: none;
  }
  .dropdown-menu {
    transform: none !important;
  }
}
@media screen and(min-width: 768px ) {
  .media_block {
    display: none;
  }

}

@media screen and(max-width: 768px) {
  .nav_name {
    display: none;
  }
  .dropdown-menu {
    width: 100%;
    max-width: 110px;
    min-width: 110px;
    li {
      text-align: center;
    }
  }
  .the_footer_chara {
    float: none;
  }

  .the_footer_icon {
    float: none;
    text-align: center;
    width: 100%;
  }

  .router-link-active {
    background: none !important;
  }

  .click_icon {
    left: 50%;
    transform: translateX(-50%);
  }

  .media_block {
    display: block;
  }  
  .logo-img {
        display:inline-block;
        width: 152px;
        height: 30px;
  }
}

.nav_bar {
  width: 100%;
  height: 50px;
  .router-link-active {
    background: rgb(70, 138, 237);
  }
  .container-fluid {
    height: 100%;
    .active {
      background: rgb(70, 138, 237);
    }
    .want_line {
      margin-right: 10px;
      margin-left: 10px;
      border-right: 1px solid rgb(213, 213, 213);
    }
    .the_footer {
      padding: 50px 0;
      background: rgb(244, 244, 244);
      vertical-align: top;
      a {
        color: rgb(167, 167, 167);
        background: none;
      }
      .the_footer_chara {
        line-height: 38px;
      }
    }
    .media_block {
      height: 100%;
      text-align: left;
      line-height: 50px;
      a {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 32px;
        height: 100%;
      }
      :nth-child(1) {
        font-size: 24px;
        font-weight: 400;
        color: white;
      }
      :nth-child(2) {
        color: #a4a4a4;
        margin: 0 8px;
      }
      :nth-child(3) {
        color: #a4a4a4;
        font-size: 14px;
        font-weight: 300;
        color: white;
      }
    }
    .row {
      height: 100%;
    }
    .nav_name {
      ul {
        margin: 0;
        li {
          float: left;
          line-height: 50px;
          max-width: 80px;
          width: 100%;
          a {
            color: white;
            width: 100%;
            display: inline-block;
          }
        }
        li:hover {
          background: rgb(70, 138, 237);
        }
      }
    }
  }
}

.nav_bar_down {
  max-width: 448px;
  width: 100%;
  box-shadow: 2px 2px 15px gray;
  z-index: 2;
  background: white;
  .triangle_border_up {
    width: 0;
    height: 0;
    border-width: 0 6px 10px;
    border-style: solid;
    border-color: transparent transparent white; /*透明 透明  灰*/
    position: absolute;
    right: 15px;
    top: -10px;
  }
  .nav_down_footer {
    height: 272px;
    overflow-y: auto;
  }
  .line {
    border-bottom: 1px solid #eeeeee;
  }
  .relation_us {
    padding: 30px;
    display: flex;
    .relation_chara {
      display: flex;
      text-align: left;
    }
    .relation_btn {
      display: flex;
      flex-direction: row-reverse;
      > div {
        max-width: 90px;
        width: 100%;
        text-align: center;
        height: 35px;
        line-height: 35px;
        background: #269ff1;
        border-radius: 3px;
        a {
          color: white;
        }
      }
    }
  }
  .row {
    margin: 0;
  }
  .relation_foot {
    padding: 26px;
    a {
      font-size: 12px !important;
    }
    .open > .dropdown-toggle.btn-default:hover {
      background: none;
    }
    .open > .dropdown-toggle.btn-default:focus {
      background: none;
    }
    .btn-default:hover {
      background: none;
    }
    .btn-default:focus {
      background: none !important;
    }
    .dropdown {
      .btn {
        padding: 8px 20px;
        color: #999;
      }
    }
    .chara {
      text-align: left;
      a {
        color: #999;
        background: none;
        font-size: 13px;
      }
    }
  }
}
</style>
