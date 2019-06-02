<template>
	<div class="DaiPingJiaInfo" >
		<!-- 如果待评价数据为空，则显示此div -->
		<div class="showKongDaiPingJia" v-show="CountNum==0">
			<span>什么都没有喔</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div class="DaiPingJia" v-for="(item,index) in DaiPingJiaData" :key="index">
			<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"
						 tag="img" v-lazy="item.goodsimageurl" alt="">
			</router-link>
			<span>订单编号&nbsp;&nbsp;:&nbsp;{{item.orderBianhao}}</span>
			<span>商品名称&nbsp;&nbsp;:&nbsp;{{item.goodsName}}</span>
			<span>商品规格&nbsp;&nbsp;:&nbsp;{{item.goodsrules}}<i>x{{item.goodsCount}}件</i></span>
			<span>商品总价&nbsp;&nbsp;:&nbsp;<i>{{item.goodsAmount | money}}</i></span>
			<div class="bofore"></div>
			<button class="txfh" @click="zlyd(item)">再来一单</button>
			<button class="mlhq" @click="ljpj(item)">立即评价</button>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default{
	name:'DaiPingJia',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			DaiPingJiaData:{}
		}
	},
	methods:{
		zlyd(item){
			MessageBox.confirm('亲,您确定还要再来一单吗?','温馨提示！').then( action =>{
				// 跳转到商品详情页,继续购买
				this.$router.push({name:'Goodsxiangqing',params:{goodsID:item.goodsID}})
			})
			.catch( error =>{
				Toast({
					message:'已取消再来一单！',
					iconClass: 'el-icon-check'
				})
			})
			
		},
		ljpj(item){
			console.log(item.orderID)
			MessageBox.confirm('亲,确定要立即评价吗','温馨提示！').then( action =>{
				// 跳转 到  立即评价页面
				this.$router.push({name:'LiJiPingJia',params:{item:item}})
			})
			.catch( error =>{
				Toast({
					message:'已取消立即评价！',
					iconClass: 'el-icon-check'
				})
			})
		}	
	},
	mounted(){
		this.$axios.post("/api/selectDaiPingJia",{
			username:this.username
		})
		.then( res => {
			this.DaiPingJiaData = res.data
			// console.log(this.DaiPingJiaData)
		})
		.catch( error =>{
			console.log(error)
		})
	},
	//计算属性
	computed:{
		//总数量
		CountNum(){
			let CountNumData = this.DaiPingJiaData
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
.DaiPingJiaInfo{
	width:100%;
}	
.showKongDaiPingJia{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongDaiPingJia span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:37%;
}
.showKongDaiPingJia span:nth-child(even){
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
.DaiPingJia{
	width: 100%;
	height: 163px;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.DaiPingJia img{
	padding: 3% 5% 0; 
	width: 80px;
	height: 90px;
	float: left;
}
.DaiPingJia span{
	width:61%;
	display: block;
	margin:1%;
	font-size: 13px;
	float: right;
}
.DaiPingJia span:nth-child(2){
	margin-top: 10px;
}
.DaiPingJia span:nth-child(4){
	color:#668B8B;
}
.DaiPingJia span:nth-child(4) i{
	float: right;
	margin-right: 10%;
}
.DaiPingJia span:nth-child(5){
	margin-bottom: 4%;
}
.DaiPingJia span:nth-child(5) i{
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
.txfh,.mlhq{
	font-size:14px;
	text-align: center;
	width: 25%;
	height: 30px;
	line-height: 30px;
	border-radius: 14px;
	background-color: #FF7F00;
	border:0;
	color: #FFF;
	position: absolute;
	bottom:4%;
}
.txfh{
	left:38%;
}
.mlhq{
	left:70%;
}
</style>

