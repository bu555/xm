<template>
    <div class="css3-comp h5-bx">
        <div class="item item-1">
            <div class="item-inner">
                Then add the following elements to your page
            </div>
        </div>
        <div class="item item-2">
            <div class="item-inner">
              Then add the following
            </div>
        </div>
        <br>
        <div class="item item-2">
            <div class="item-inner">
              Then add the following
            </div>
        </div>
        <iframe src="/static/page/cropper/html.html" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="less">
.css3-comp {
  .item.item-1, .item.item-2{
      border-left:12px solid #289093;
      margin-bottom:120px;
      position: relative;
      .item-inner {
        padding-left:1em;
        color: black;
        background: none;
        // // font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        // direction: ltr;
        // text-align: left;
        // // white-space: pre;
        // word-spacing: normal;
        // word-break: normal;
        // word-wrap: normal;
        // line-height: 1.5;
        // -moz-tab-size: 4;
        // -o-tab-size: 4;
        // tab-size: 4;
        // -webkit-hyphens: none;
        // -moz-hyphens: none;
        // -ms-hyphens: none;
        // hyphens: none;
          border:1px solid #dfdfdf;
          &::before,&::after {
            content: '';
            z-index: -2;
            display: block;
            position: absolute;
            bottom: .75em;
            left: 0.18em;
            width: 40%;
            height: 20%;
            max-height: 13em;
            -webkit-box-shadow: 0px 13px 8px #979797;
            -moz-box-shadow: 0px 13px 8px #979797;
            box-shadow: 0px 13px 8px #979797;
            -webkit-transform: rotate(-2deg);
            -moz-transform: rotate(-2deg);
            -ms-transform: rotate(-2deg);
            -o-transform: rotate(-2deg);
            transform: rotate(-2deg);
          }
          &::after {    
            right: 0.75em;
            left: auto;
            transform: rotate(2deg);
          }
      }

  }
  .item.item-1 {
      // width:300px;
      .item-inner {
        height:58px;
        line-height:58px;
      }
  }
  .item.item-2 {
      width:300px;
      .item-inner {
        height:32px;
        line-height: 32px;
        &:hover {
          &:after,&:before {
            display:none
          }
        }
      }
  }
}

</style>


