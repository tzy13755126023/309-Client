<template>
	<div class="ContainDinigdan">
		<div class="headerUpdateDinigdan">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>我的订单</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="DingdanZhuangTai">
			<router-link to="/dingdan/daifukuan"  tag="li">待付款</router-link>
			<router-link to="/dingdan/daifahuo"   tag="li">待发货</router-link>
			<router-link to="/dingdan/daishouhuo" tag="li">待收货</router-link>
			<router-link to="/dingdan/daipingjia" tag="li">待评价</router-link>
			<router-link to="/dingdan/yiwancheng" tag="li">已完成</router-link>
		</div>
			<router-view></router-view>
	</div>
</template>
<script>
export default{
	name:'Dingdan',
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
.ContainDinigdan{
	width: 100%;
}
.ContainDinigdan .headerUpdateDinigdan{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerUpdateDinigdan .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerUpdateDinigdan span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 2px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 17px;
	font-weight: bold;
	color:#FF7F00;
}	
.headerUpdateDinigdan img{
	position:absolute;
	top:1px;
	right:1%;
	width: 39px;
	height: 39px;
}
.DingdanZhuangTai{
	color: #000;
	width: 100%;
	height: 50px;
	line-height: 50px;
	background-color: #fff;
    border-bottom: 1px solid #E3E3E3;
    display: flex;
}
.DingdanZhuangTai li{
	flex: 1;
	text-align: center;
	font-size: 13px;
}
.active{
	color:#66CD00 !important;
	border-bottom: 1px solid #66CD00;
}
</style>