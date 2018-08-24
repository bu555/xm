<template>
  <div class="ranking">
    <div class="title">
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
          <h5>排行榜 &nbsp;</h5>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="table_left">
        <div class="head">
          <span>一</span>
          <span>富豪榜</span>
          <span>一</span>
        </div>
        <div class="center" v-loading="load1">

          <table>
            <thead>
              <tr>
                <th style="width:19.6%;">排名</th>
                <th style="width:56.6%;">用戶</th>
                <th style="width:24.8%;">sBTC</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in balanceTop" :key="index">
                <td class="one" v-if="item.Ranking==1"><img src="/static/img/team22.png"></td>
                <td class="one" v-if="item.Ranking==2"><img src="/static/img/team23.png"></td>
                <td class="one" v-if="item.Ranking==3"><img src="/static/img/team24.png"></td>
                <td class="one" v-if="item.Ranking!=1 && item.Ranking!=2 &&  item.Ranking!=3">{{item.Ranking}}</td>
                <td class="two">
                  <img :src="item.Avatar?item.Avatar:defalut_photo">
                  <span class="avater">{{item.Name}}</span>
                </td>
                <td class="three" style="color:#de3835">
                  {{item.Profit | numFormat}}
                </td>
              </tr>
              <tr v-if="!balanceTop">
                <td></td>
                <td>暫無排名...</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="width:2%;display:inline-block;">

      </div>
      <div class="table_right">
        <div class="head">
          <span>一</span>
          <span>漲幅榜</span>
          <span>一</span>
        </div>
        <div class="center" v-loading="load2">
          <table>
            <thead>
              <tr>
                <th style="width:19.6%;">排名</th>
                <th style="width:56.6%;">用戶</th>
                <th style="width:24.8%;">sBTC</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in rankingTop" :key="index">
                <td class="one" v-if="item.Ranking==1"><img src="/static/img/team22.png"></td>
                <td class="one" v-if="item.Ranking==2"><img src="/static/img/team23.png"></td>
                <td class="one" v-if="item.Ranking==3"><img src="/static/img/team24.png"></td>
                <td class="one" v-if="item.Ranking!=1 && item.Ranking!=2 &&  item.Ranking!=3">{{item.Ranking}}</td>
                <td class="two">
                  <img :src="item.Avatar?item.Avatar:defalut_photo">
                  <span class="avater">{{item.Name}}</span>
                </td>
                <td class="three" style="color:#de3835">
                  {{item.Profit | numFormat}}
                </td>
              </tr>
              <tr v-if="!rankingTop">
                <td></td>
                <td>暫無排名...</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import accountAxios from "../../axios_joggle/axios_account";
export default {
  data() {
    return {
      rankingTop: [],
      balanceTop: [],
      defalut_photo: "/static/img/timg.jpg",
      load1: true,
      load2: true
    };
  },
  filters: {
    numFormat(val) {
      return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
      //   return val.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
    }
  },
  methods: {},
  created() {
    accountAxios.getRankingTop({ size: 10 }).then(res => {
      this.rankingTop = res.data.Data;
      this.load2 = false;
    });
    
    accountAxios.getBalanceTop({ size: 10 }).then(res => {
      this.balanceTop = res.data.Data;
      this.load1 = false;
    });
  },
  mounted(){
  }
};
</script>
<style lang="less">
@media screen and(max-width:1080px) {
  .center {
    .two {
      padding-left: 0 !important;
      text-align: center !important;
      img {
        margin: 5px 0;
      }
    }
    .avater {
      text-align: left !important;
    }
  }
}
@media screen and(max-width: 768px) {
  .table_left,
  .table_right {
    width: 98% !important;
  }
  .center {
    .two {
      padding-left: 0 !important;
      text-align: center !important;
      img {
        margin: 5px 0;
      }
    }
    .avater {
      max-width: 100% !important;
      text-align: center;
    }
  }
}
@media screen and(max-width: 430px) {
  .table_left,
  .table_right {
    width: 98% !important;
  }
  .center {
    .two {
      padding: 0 !important;
      text-align: center !important;
      img {
        margin: 5px 0;
      }
    }
    .avater {
      text-align: left;
    }
  }
}
.ranking {
  background: white;
  min-height: 600px;
  max-width: 1180px;
  margin: 15px auto 40px;
  padding: 11.5px 23.5px;
  .row {
    margin: 0;
  }
  .title {
    text-align: left;
    border-bottom: 3px solid #eeeeee;
    position: relative;
    h5 {
      display: inline-block;
      padding: 2px 3px;
      font-weight: 700;
      position: relative;
      &:after {
        content: "";
        display: block;
        height: 3px;
        width: 100%;
        background-color: #0a53a2;
        position: absolute;
        bottom: -13px;
        left: 0px;
      }
    }
    .write-btn {
      position: absolute;
      bottom: 6px;
      right: 0px;
      border-radius: 16px;
    }
  }
  .content {
    margin: 30px 0;
    .table_left,
    .table_right {
      width: 48%;
      border: 1px solid #eeeeee;
      display: inline-block;
      min-height: 200px;

      .head {
        padding: 12px 0;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
      }
      .center {
        width: 100%;
        table {
          width: 100%;
          thead {
            width: 100%;
            tr {
              width: 100%;
              th {
                width: 33.3%;
                text-align: center;
                padding: 12px 0;
                font-weight: 300;
                background-color: #f4f4f4;
              }
            }
          }
          tbody {
          min-height: 100px;
            td {
              padding: 18px 0;
              text-align: center;
            }
            .avater {
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 70px;
              vertical-align: middle;
              text-align: left;
              margin-left: 5px;
            }
            .one {
              font-family: "Minion Variable Concept";
              font-size: 22px;
            }
            .two {
              padding-left: 20px;
              color: #666666;
              img {
                width: 54px;
                height: 54px;
                border-radius: 50%;
                overflow: hidden;
                vertical-align: middle;
              }
            }
            .three {
              font-size: 22px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>

