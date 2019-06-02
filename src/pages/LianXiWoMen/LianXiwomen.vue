<template>
	<div class="containLXWM">
		<div class="headerLXWM">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>联系我们</span>
		</div>
		<div class="LXKeFu">
			<div class="box1">
				<i class="el-icon-message"></i>
			</div>
			<span>在线客服</span>
			<i class="el-icon-arrow-right"></i>
		</div>
		<!-- 图片Box -->
		<div class="LianXiFangShi">
			<p><i class="el-icon-phone"></i> 137-5512-6023</p>
			<p><i class="el-icon-message"></i>2938526863@qq.com</p>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import Vue from 'vue'

export default{
	name:'LianXiwomen',
	data(){
		return{

		}
	},

	methods:{
		goback(){
			this.$router.push("/mine")
		}
	},
	created(){

	}
}
</script>
<style scoped>
.containLXWM{
	width: 100%;
	height:100%;
	background:url("../../assets/images/zaixiankefu.jpg");
	background-size: 100% 74%;
	background-position:100% 75%;
	/*opacity: 0.9;*/
}
.containLXWM .headerLXWM{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerLXWM .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerLXWM span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 4px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	font-weight: bold;
	color:#FF7F00;
}
.LXKeFu{
	width: 100%;
	height: 90px;
	position: relative;
	background-color: #fff;
}
.LXKeFu .box1{
	position: absolute;
	top: 15px;
	left: 20px;
	width: 70px;
	height: 60px;
	text-align: center;
	background-color: #FF7F00;
}
.LXKeFu .box1 i{
	font-size: 40px;
	color: #fff;
	margin-top: 10px;
}
.LXKeFu span{
	letter-spacing: 3px;
	margin-left: 140px;
	font-size:16px;
	color: #000;
	line-height: 90px;
}
.el-icon-arrow-right{
	float: right;
	font-size: 22px;
	line-height: 90px;
	margin-right: 10px;
}
.LianXiFangShi{
	width: 100%;
	height: 80px;
	position: fixed;
	bottom: 70px;
}
.LianXiFangShi p{
	padding-left: 90px;
	color: #fff;
	/*color: #000;*/
	font-size:15px;
	margin:10px;
}
.LianXiFangShi p:first-child{
	margin-top: 15px;
}
.LianXiFangShi p i{
	margin:0 5px;
	font-size:20px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>