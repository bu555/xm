<template>
  <div class="my-nav">
      <div class="bx">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Brand</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <!--<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>-->
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">开始使用 <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">什么是MBTI</a></li>
                    <li><a href="#">荣格八维功能</a></li>
                    <li><a href="#">应用实例</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
                <li><a href="#">测 试</a></li>
                <li class="active"><a href="#">名人库</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">资料库 <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
              </ul>
              <!--<form class="navbar-form navbar-left">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
              </form>-->
              <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
      </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  methods:{

  },
  mounted(){
  }
}
</script>

<style lang="less">
  .my-nav {
    background-color: #598dd3;
    margin-top:50px;
    .navbar.navbar-default {
      background-color:#598dd3;
      border:none;
    }
    .navbar-default .navbar-nav>li>a {
        color: #fff;
    }
    .navbar-default .navbar-nav>.active>a {
        background-color: #456ea5;
    }
    .navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover {
        color: #fff;
        background-color: transparent;
        background-color: rgba(255,255,255,.2);
        background-color: rgba(0,0,0,.1);
    }
    .navbar-default .navbar-nav>.active>a {
        color: #fff;
        // background-color: #456ea5;
    }
    .navbar-default .navbar-toggle .icon-bar {
        background-color: #eee;
    }
    .navbar-default .navbar-toggle:focus, .navbar-default .navbar-toggle:hover {
        background-color: transparent;
    }
  }
</style>