<template>
  <div class="oops_footer">
    <div class="oops_footer_wrap ">
      <div class="">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
            <div class="web_name">
              <router-link to="/">
                 <img src="/img/logo_my2.png" alt="">
              </router-link>
            </div>
          </div>
          <div class="col-md-1 col-lg-1">

          </div>
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 type-all">
            <div class="web_type" style="padding-left:3%;">
              <!-- <h5 style="text-align: left">全部分類</h5> -->
              

                  <ul class="tag-list">
                        <li  v-for="(v,i) in tagsList" :key="i">
                            <router-link to="/">{{v.TagName}}</router-link>
                        </li>
                  </ul>


            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 web_share">
            <facebook_share />
            <google_share/>
            <twitter_share/>
            <div style="margin:10px 0;">
              <whatsapp_share2/>
              <in_share2/>
              <pinterest_share2/>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="oops_footer2">
      <div class="oops_footer_wrap2 clearfix" style="font-size:12px">
        <div class="" id="copy">
          <router-link to="">
            <span>©2018 OopsDaily</span>
          </router-link>

        </div>
        <div id="about">
          <span class="want_line">
            <router-link to="/disclaimer">
              重要聲明
            </router-link>
          </span>
          <span style="padding-left: 10px" class="want_line">
            <router-link to="/privacy">
              隱私政策
            </router-link>
          </span>
          <span class="want_line">
            <router-link to="/contactus">
              意見反饋
            </router-link>
          </span>
          <span style="padding-left: 10px">
            <router-link to="/help/1">
              幫助中心
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import type_name from "@/components/common/nav_bar_down2";
import facebook_share from "@/components/common/share_button2/facebook_share_btn";
import google_share from "@/components/common/share_button2/google_share_btn";
import twitter_share from "@/components/common/share_button2/twitter_share_btn";
import pinterest_share2 from "@/components/common/share_button2/pinterest_share_btn";
import in_share2 from "@/components/common/share_button2/in_share_btn";
import whatsapp_share2 from "@/components/common/share_button2/whatsapp_share_btn";
export default {
  data() {
    return {
      judge_login: true,
      judge_login_page: true
    };
  },
  components: {
    // type_name: type_name,
    facebook_share: facebook_share,
    google_share: google_share,
    twitter_share: twitter_share,
    pinterest_share2: pinterest_share2,
    in_share2: in_share2,
    whatsapp_share2:whatsapp_share2
  },
  computed:{
      tagsList(){
         return this.$store.state.navTypes
      }
  },
  created() {
    // this.$store.state.nav_bar_down_contack = false;
  },
  mounted() {

    // setTimeout(() => {
    //   let ulList = document.querySelectorAll(".all_type>ul");
    //   for (let i = 0; i < ulList.length; i++) {
    //     ulList[i].style.borderRight = "none";
    //   }
    // }, 1);
  }
};
</script>

<style scoped lang="less">


@media screen and(max-width: 992px) {
    .oops_footer .web_share {
      text-align: center !important;
    }
    .oops_footer .web_name {
      text-align: center !important;
    }
    .oops_footer ul.tag-list>li {
      text-align: center ;
    }
    .oops_footer .oops_footer_wrap .row .web_type {
      min-height:132px  !important;
      margin:15px 0 0 !important;
    }
}
@media screen and(max-width: 768px) {
    .oops_footer_wrap {
      // display: none;
    }
}

.oops_footer {
  .tag-list {
      display:flex;
      flex-wrap:wrap;
      padding-top:24px;
      li {
        flex:0 0 16%;
        text-align:left;
        padding-bottom:7px;
        a {
          color:#888888;
          &:hover {
            color:#333;
          }
        }

      }
  }
  .row {
    margin: 0;
  }
  background-color: white !important;
  .oops_footer_wrap {
    max-width: 1180px;
    margin: 0 auto;
    .row {
      height: 100%;
      padding: 38px 0 10px;
      .web_name {
        height: 100%;
        a {
          color: #888888;
          display: inline-block;
          height: 100%;
          margin-top: 20px;
        }
      }
      .web_type {
        min-height: 180px;
        /*border-right: 1px solid #f6f6f6;*/
        /*border-left: 1px solid #f6f6f6;*/
        text-align: right;
        .nav_down_footer {
          padding: 0;
          background: none;
          text-align: left;
          .all_type ul li {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
          }
          .all_type ul li a {
            font-size: 12px !important;
          }
        }
        h5 {
          font-size: 14px;
          color: #888888;
          font-weight: 900;
          padding: 15px 0 3px;
          @media screen and (max-width: 768px) {
            text-align: center;
          }
        }
        span {
          display: inline-block;
          width: 90px;
          text-align: left;
        }
      }

      .web_share {
        margin-top: 15px;
        min-height: 70px;
        text-align: right;
        // background-color:red;;
        a {
          display: inline-block;
          width: 48px;
          height: 48px;
          margin: 0 4px;
          img {
            width: 100%;
          }
        }
      }
    }
  }

  .oops_footer2 {
    background-color: #313131;
    .oops_footer_wrap2 {
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      max-width: 1180px;
      width: 100%;

      & > div {
        flex: 0 0 50%;
      }
      #copy {
        text-align: left;
      }
      #about {
        text-align: right;
      }
      a {
        min-height: 44px;
        line-height: 44px;
        color: #8d8d8d;
        font-size: 14px;
      }
      .want_line {
        padding-right: 10px;
        padding-left: 10px;
        border-right: 1px solid #8d8d8d;
        line-height: 48px;
      }
    }
  }
  .types {
    display: flex;
    & > ul {
      flex: 0 0 33%;
      li {
        text-align: center;
        padding: 5px 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .oops_footer2 {
      .oops_footer_wrap2 {
        flex-wrap: wrap;
        & > div {
          flex: 0 0 100%;
        }
        #copy {
          text-align: center;
        }
        #about {
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 414px) {
    #copy,
    #about {
      span,
      a {
        font-size: 13px !important;
      }
    }

    .type-all {
      font-size: 12px;
    }

    .web_share {
      margin-top: 0px !important;
    }
  }
}

.nav_down_footer {
  background: white;
  padding: 20px;
}
</style>
