<template>
	<div class="YiWanChengInfo" >
		<!-- 如果已完成数据为空，则显示此div -->
		<div class="showKongYiWanCheng" v-show="CountNum==0">
			<span>什么都没有喔</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div class="YiWanCheng" v-for="(item,index) in YiWanChengData" :key="index">
			<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"
						 tag="img" v-lazy="item.goodsimageurl" alt="">
			</router-link>
			<span>订单编号&nbsp;&nbsp;:&nbsp;{{item.orderBianhao}}</span>
			<span>商品名称&nbsp;&nbsp;:&nbsp;{{item.goodsName}}</span>
			<span>商品规格&nbsp;&nbsp;:&nbsp;{{item.goodsrules}}<i>x{{item.goodsCount}}件</i></span>
			<span>商品总价&nbsp;&nbsp;:&nbsp;<i>{{item.goodsAmount | money}}</i></span>
			<div class="bofore"></div>
			<span class="xia_left">❤&nbsp;订单已完成</span>
			<span class="xia_right">订单交易时间：{{item.orderTime}}</span>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default{
	name:'YiWanCheng',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			YiWanChengData:{}
		}
	},
	mounted(){
		this.$axios.post('/api/selectYiWanCheng',{
			username:this.username
		})
		.then( res =>{
			this.YiWanChengData = res.data
		})
		.catch( error =>{
			console.log(error)
		})
	},
	//计算属性
	computed:{
		//总数量
		CountNum(){
			let CountNumData = this.YiWanChengData
			let countNum = 0
			for(let i=0;i<CountNumData.length;i++){
				countNum+=CountNumData[i].goodsCount
			}
			return countNum 
		},
	}
}
</script>
<style scoped>
.YiWanChengInfo{
	width:100%;
}	
.showKongYiWanCheng{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongYiWanCheng span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:37%;
}
.showKongYiWanCheng span:nth-child(even){
	display: block;
	width: 25%;
	height: 30px;
	line-height: 30px;
	background-color: green;
	color:#fff;
	font-size: 14px;
	position: absolute;
	bottom: 10%;
	right:36%;
}
.YiWanCheng{
	width: 100%;
	height: 160px;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.YiWanCheng img{
	padding: 3% 5% 0; 
	width: 80px;
	height: 90px;
	float: left;
}
.YiWanCheng span{
	width:61%;
	display: block;
	margin:1%;
	font-size: 13px;
	float: right;
}
.YiWanCheng span:nth-child(2){
	margin-top: 10px;
}
.YiWanCheng span:nth-child(4){
	color:#668B8B;
}
.YiWanCheng span:nth-child(4) i{
	float: right;
	margin-right: 10%;
}
.YiWanCheng span:nth-child(5){
	margin-bottom: 4%;
}
.YiWanCheng span:nth-child(5) i{
	color:#FF7F00;
	font-size: 14px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
.bofore{
	clear: both;
	margin-top: 2%;
	border-bottom: 1px solid #E3E3E3;
}
.YiWanCheng .xia_left,.YiWanCheng .xia_right{
	font-size:13px;
	height: 30px;
	line-height: 30px;
	position: absolute;
	bottom:2%;
}
.YiWanCheng .xia_left{
	padding-left: 6%;
	left:0;
	width: 30%;
	color:#668B8B;
	/*background-color: red;*/
}
.YiWanCheng .xia_right{
	left:38%;
	width: 60%;
	color: red;
}
</style>