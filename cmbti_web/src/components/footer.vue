<template>
    <el-row class="hidden-xs-only">
      <el-col class="foot">
          <p >{{$t('footer[0]')}}
              <a href="#">
                  <i class="fa fa-twitter"></i>
                  Twitter
              </a>
              {{$t('footer[1]')}}
              <a href="#">
                  <i class="fa fa-facebook"></i>
                  Facebook
              </a>
            {{$t('footer[2]')}}
            {{$t('footer[3]')}}
            <a href="#">
                BitcoinAverage Price Index
            </a>
            {{$t('footer[4]')}}
          </p>
      </el-col>
    </el-row>
</template>
<style>
.foot{
    background-color: rgb(211, 220, 230);
    line-height: 60px;
    position: relative;
    width: 100%;
    bottom: 0;
    left: 0;
}
</style>
