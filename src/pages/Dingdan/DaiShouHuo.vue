<template>
	<div class="DaiShouHuoInfo" >
		<!-- 如果待收货数据为空，则显示此div -->
		<div class="showKongDaiShouHuo" v-show="CountNum==0">
			<span>什么都没有喔</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div class="DaiShouHuo" v-for="(item,index) in DaiShouHuoData" :key="index">
			<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"
						 tag="img" v-lazy="item.goodsimageurl" alt="">
			</router-link>
			<span>订单编号&nbsp;&nbsp;:&nbsp;{{item.orderBianhao}}</span>
			<span>商家名称&nbsp;&nbsp;:&nbsp;{{item.storesName}}</span>
			<span>商品名称&nbsp;&nbsp;:&nbsp;{{item.goodsName}}</span>
			<span>商品规格&nbsp;&nbsp;:&nbsp;{{item.goodsrules}}<i>x{{item.goodsCount}}件</i></span>
			<span>商品总价&nbsp;&nbsp;:&nbsp;<i>{{item.goodsAmount | money}}</i></span>
			<div class="bofore"></div>
			<button class="txfh" @click="ckwl(item)">查看物流</button>
			<button class="mlhq" @click="qrsh(item)">确认收货</button>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default{
	name:'DaiShouHuo',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			DaiShouHuoData:{}
		}
	},
	methods:{
		ckwl(item){
			MessageBox('温馨提示！','亲,请耐❤等候喔,宝贝已经上路了！')
		},
		qrsh(item){
			console.log(item.orderID)
			MessageBox.confirm('亲,您确定宝贝到手了吗?','温馨提示！').then(action => {
				this.$axios.put('/api/updateOrderDaiPingJia',{
					orderID : item.orderID
				})
				.then( res =>{
					if(res.data.affectedRows){
						Toast({
               				message: '确认收货成功❤❤❤！',
            				iconClass: 'el-icon-success'
            			});
            			//刷新页面
						setTimeout(() => {
							this.$router.go(0)   
						}, 2000)
					}
				})
				.catch(error =>{
					console.log(error)
				})
			})
			.catch( error =>{
				MessageBox('温馨提示！','❤❤❤您已取消确认收货！❤❤❤')
			})
		}
	},
	mounted(){
		this.$axios.post("/api/selectDaiShouhuo",{
			username:this.username
		})
		.then( res => {
			this.DaiShouHuoData = res.data
			// console.log(this.DaiShouHuoData)
		})
		.catch( error =>{
			console.log(error)
		})
	},
		//计算属性
	computed:{
		//总数量
		CountNum(){
			let CountNumData = this.DaiShouHuoData
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
.DaiShouHuoInfo{
	width:100%;
}	
.showKongDaiShouHuo{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongDaiShouHuo span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:37%;
}
.showKongDaiShouHuo span:nth-child(even){
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
.DaiShouHuo{
	width: 100%;
	height: 175px;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.DaiShouHuo img{
	padding: 3% 5% 0; 
	width: 80px;
	height: 90px;
	float: left;
}
.DaiShouHuo span{
	width:61%;
	display: block;
	margin:1%;
	font-size: 13px;
	float: right;
}
.DaiShouHuo span:nth-child(2){
	margin-top: 10px;
}
.DaiShouHuo span:nth-child(5){
	color:#668B8B;
}
.DaiShouHuo span:nth-child(5) i{
	float: right;
	margin-right: 10%;
}
.DaiShouHuo span:nth-child(6) i{
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