<template>
	<div class="containZZZS">
		<div class="headerZZZS">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>资质证书</span>
		</div>
		<div class="MainZZZS">
			<span>营业资质执照</span>
			<img src="../../assets/images/zzzs/z6.jpeg" alt="">
			<img src="../../assets/images/zzzs/z5.jpeg" alt="">
			<span>董事长们帅照</span>
			<img src="../../assets/images/zzzs/z1.jpg" alt="">
			<img src="../../assets/images/zzzs/z2.jpg" alt="">
			<img src="../../assets/images/zzzs/z3.jpg" alt="">
			<img src="../../assets/images/zzzs/z4.jpg" alt="">
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'ZiZhiZhengShu',
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
.containZZZS{
	width: 100%;
}
.containZZZS .headerZZZS{
	height:40px;
	line-height: 40px;
	width:100%;
	background:url("../../assets/images/zzzs/header.jpg");
	background-position: 10%;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerZZZS .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	color:#fff;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerZZZS span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 4px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	font-weight: bold;
	color:#fff;
}	
.MainZZZS{
	text-align: center;
	width: 100%;
}
.MainZZZS span{
	margin: 20px 0;
	text-align: center;
	font-weight: bolder;
	display: block;
	font-size: 16px;
}
.MainZZZS img{
	margin-top:10px;
	width: 70%;
}
.MainZZZS img:nth-child(2){
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>