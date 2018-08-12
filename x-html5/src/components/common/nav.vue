<template>
    <div class="nav">
		<ul>
			<li class="first"> 
				<router-link to="/">网址</router-link>
				
				<ul>
					<li>
						<router-link to="http://www.baidu.com">百度</router-link>
					</li>
 
					<li>
						<router-link to="http://www.sina.com">新浪</router-link>
					</li>
 
				</ul>
			</li>
 
			<li> 
				<router-link to="/css3">CSS3</router-link>
			</li>
 
			<li> 
				<router-link to="/comp">组件</router-link>
			</li>
 
			<li> 
				<router-link to="/">音乐</router-link>
			</li>
 
			<li> 
				<router-link to="/">地图</router-link>
			</li>
 
			<li> 
				<router-link to="/">问问</router-link>
			</li>
 
			<li class="last" style="border:none;"> 
				<router-link to="/">关于</router-link>
			</li>
		</ul>

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>

		// body{background:url("images/bg_title.jpg") repeat-x,url("images/bg.jpg");}
		
		.nav{
            max-width:1180px;
            margin:10px auto 12px;
			height:45px;
			border-radius:10px;
			/*html + css3 渐变画图 */
            background-image:-webkit-linear-gradient(rgba(41,41,41,0.75) 0% ,rgba(54,54,54,0.72) 50%,rgba(24,23,23,0.94) 51%);
			box-shadow:1px 1px 33px #fff;/*设计阴影的*/
		}
		.nav ul li
		{
            width:127px; 
            height:45px;
			list-style:none;/*去掉圆点*/
			float:left;/*水平显示*/
			color:white;/* #fff */
			font-size:18px;
			font-family:"微软雅黑";
			text-align:center;
			line-height:45px;/* 行高跟 高度一致时，竖直居中*/
			border-right:1px solid #000;/*右边框*/
		}
		
		.nav ul li a
		{
			color:white;/* #fff */
			font-size:18px;
			font-family:"微软雅黑";
            text-decoration:none;
            display:block;
            width:100%;
            height:45px;
		}
		
		.nav ul li:hover
		{
			background:rgba(10,5,5,0.45);
		}
		
		.nav ul li.first:hover
		{
			border-radius:10px 0px 0px 10px;/*左上 左下 圆弧显示 */
		}
		
		.nav ul li.last:hover
		{
			border-radius:0px 10px 10px 0px;/*右上 右下 圆弧显示 */
		}
 
		.nav ul li ul li 
		{
			border:none;
			border-top:1px solid #989898;
			background:rgba(10,5,5,0.45);/*颜色透明度 */
			border-radius:10px;
			
		}
 
		.nav ul li ul
		{
			display:none;/*不显示*/
		}
		.nav ul li ul li:hover
		{
			background:rgba(10,5,5,0.8);/*颜色透明度 */
			border-radius:10px;
		}
		
		.nav ul li:hover ul
		{
			display:block;
			-webkit-animation:roll 1s ease;/*roll 旋转名称，1s旋转效果 */
		}
		
		@-webkit-keyframes roll /*roll旋转名称与上面一致*/
		{
			0% {-webkit-transform:rotate(0deg);}
			100% {-webkit-transform:rotate(360deg);}
		}

</style>


