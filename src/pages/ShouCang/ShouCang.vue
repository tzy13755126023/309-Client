<template>
	<div class="maintain">
		<div class="headertzy">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>我的收藏</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="UlClass">
			<li>
				<router-link to="/ShouCang/goodshoucang" tag="span" exact>商品</router-link>
			</li>
			<li>
				<router-link to="/ShouCang/storeshoucang" tag="span" >商家</router-link>
			</li>
		</div>
			<router-view></router-view>
	</div>
</template>
<script>
export default{
	name:'ShouCang',
	data(){
		return{
			
		}
	},
	methods:{
		goback(){
			this.$router.push('/mine')
		}
	}
}
</script>
<style scoped>
.maintain{
	width: 100%;
}
.headertzy{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headertzy .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headertzy span{
	position: absolute;
	height:40px;
	width: 40%;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	letter-spacing: 3px;
	font-weight: bold;
	color:#FF7F00;
}	
.headertzy img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}
.UlClass{
	margin-top: 5px;
	width: 100%;
	height: 40px;
	background-color: #fff;
    border-bottom: 1px solid #E3E3E3;
}
.UlClass li{
	text-align: center;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	width: 50%;
	float: left;
}
.UlClass li span{
	text-align: center;
	display:block;
	height: 39px;
	/*background-color: red;*/
	margin-left: 25%;
	width: 50%;
	float: left;
}
.active{
	color:#66CD00 !important;
	border-bottom: 1px solid #66CD00;
}
</style>