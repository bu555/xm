<template>
    <div class="game">
        <div class="head">
            <!-- <router-link to="/my/palyGames/multiply">MULTIPLY BTC</router-link> -->
            <!-- <router-link to="/my/palyGames/lottery">LOTTERY</router-link> -->
            <div class="title">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <h5> 信息總覽</h5>
          </div>

        </div>
      </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" >
.game {
  max-width: 1180px;
  background: white;
  margin: 15px auto 40px;
  .head{
      padding: 11.5px 0 0 23.5px;
      text-align: left;
    //   a{
    //       display: inline-block;
    //       font-size: 14px;
    //       font-weight: 600;
    //       color: #989898;
    //       padding: 20px 0 5px 0;
    //       margin-right: 54px;
    //       font-family: "微軟雅黑"
    //   }
    //   .router-link-active{
    //       color: #0954a2;
    //       border-bottom: 3px solid #0954a2;
    //   }
    .title {
      // height:38px;
      text-align: left;
      border-bottom: 3px solid #eeeeee;
      position: relative;
    .row{
        margin: 0;
    }
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
  }
}
</style>
