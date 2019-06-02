<template>
	<div class="AddressContain" >
		<!-- 如果默认地址为空，则显示此div -->
		<div class="Address" v-show="this.MorenAddress.length==0&&CountNum!=0">
			<span class="spanNone">您还没有添加详细地址信息！！！
			<router-link to="/shouhuodizhi" tag="i" class="el-icon-arrow-right"></router-link>
			</span>
		</div>
		<!-- 如果待付款数据为空，则显示此div -->
		<div class="showKongDaiFuKuan" v-show="CountNum==0">
			<span>什么都没有喔</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div class="Address" v-show="this.MorenAddress.length!=0&&CountNum!=0">
			<div  class="Address_left" v-for="item in MorenAddress">
				<div class="left_shang">
					<span>{{item.username}}</span>
					<span>{{item.shouhuoTel}}</span>
				</div>
				<div class="left_xia">
					<span>{{item.province}}</span>
					<span>{{item.city}}</span>
					<span>{{item.district}}</span>
					<span>{{item.address}}</span>
				</div>
			</div>
			<div class="Address_right">
				<router-link to="/shouhuodizhi" tag="i" class="el-icon-arrow-right" 
							 v-show="this.MorenAddress.length!=0">		 	
				 </router-link>
			</div>
		</div>
		<div :key="index" class="DaifukuanInfo" v-for="(item,index) in DaifukuanData">
			<!-- 点击storesName跳转到该商家信息页面 -->
			<router-link :to="{name:'StoreInfo',params:{storesID:item.storesID}}"tag="div" class="storesName">
				<i class="el-icon-goods"></i>{{item.storesName}}
				<i class="iconfont">&#xe641</i>
			</router-link>
			<!-- 中间商品图片以及其他信息 -->
			<!-- 该路由跳转到该商品详情页 -->
			<div class="zjnr">
				<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}" 
					tag="div" class="shang">
					<img v-lazy="item.goodsimageurl" alt="">
					<!-- 取消提交 点击的商品 -->
					<i class="el-icon-circle-close-outline" @click.prevent.stop="DeleteDaifukuan(item)"></i>
					<p>名称：{{item.goodsName}}</p>
					<p>价格：<i>{{item.goodsprice | money}}</i></p>
					<p>规格：{{item.goodsrules}}</p>
					<p>x {{item.goodsCount}}</p>
				</router-link>
				<div class="PeiSong">
					<span class="sp1">配送方式</span>
					<i class="iconfont">&#xe641</i>
					<span class="sp2">快递&nbsp;&nbsp;{{item.yunfei | money }}</span>
				</div>
				<div class="Youhuiquan">
					<span class="sp1">睦优惠券</span>
					<i class="iconfont">&#xe641</i>
					<span class="sp2">优惠&nbsp;&nbsp;{{0.00 | money}}</span>
				</div>
				<div class="Hongbao">
					<span class="sp1">店铺红包</span>
					<i class="iconfont">&#xe641</i>
					<span class="sp2">红包&nbsp;&nbsp;{{0.00 | money}}</span>
				</div>
				<div class="ZongJia">
					<span class="left">共{{item.goodsCount}}件商品</span>
					<span class="right">应付金额(包含运费)
						<i>{{item.goodsCount*item.goodsprice+item.yunfei | money}}</i>
					</span>
				</div>
			</div>
		</div>
		<div class="CountPrice" v-show="CountNum!=0">
				<span class="span1">商品数量：{{CountNum}}</span>
				<span class="span2">共计：<i>{{CountPrice | money}}</i></span>
				<span class="span3"><i @click="JieSuan()">结算</i></span>
		</div>
		<div class="kuochongdibu">
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default{
	name:'DaiFuKuan',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			MorenAddress:JSON.parse(window.localStorage.getItem("MorenAddress")),
			userMoney:window.localStorage.getItem("userMoney"),
			DaifukuanData:{},   //代付款

		}
	},
	methods:{
		JieSuan(){
			// console.log(this.CountNum)
			// console.log(this.CountPrice)
			if (this.userMoney<this.countPrice) {
				MessageBox('温馨提示！','您的账户余额不足以提交该订单，请您联系管理员对该账户进行充值！');
			}else{
				//结算   付款 然后   将orderStatus状态改为2(待收货)
				MessageBox.confirm('您确定支付该订单吗?','').then(action => {
					for(let i =0;i<this.DaifukuanData.length;i++){
						const cartArryDataIndex = this.DaifukuanData[i]
						// console.log(cartArryDataIndex.orderID)
						//提交订单
						this.$axios.put('/api/updateOrderStatus',{
							orderID:cartArryDataIndex.orderID
						})
						.then( res =>{
							if (res.data.affectedRows) {
								if (i==(this.DaifukuanData.length-1)) {
									Toast({
					                message: '❤❤亲，订单提交成功，欢迎再次光临❤❤!',
					                iconClass: 'el-icon-check'
				           		 });
									//刷新页面
									setTimeout(() => {
										this.$router.go(0)   
									}, 2000)
								}
							}else{
								MessageBox('','订单提交失败，请您5s后再试试，谢谢！');
							}
						})
						.catch( error =>{
							console.log(error)
						})
					}
						//修改账户金额
						this.$axios.put('/api/updateMoney',{
							money:(this.userMoney-this.CountPrice).toFixed(2),
							username:this.username
						})
						.then( res =>{
							if (res.data.affectedRows) {
	    						// MessageBox('','全部商品下单成功，快快去付款吧！');	
	    						// console.log('修改余额成功')
	    						localStorage.setItem("userMoney",(this.userMoney-this.CountPrice).toFixed(2))
							}else{
								console.log('修改余额失败')
							}
						})
						.catch( error =>{
							console.log(error)
						})
				}).catch( error =>{
					MessageBox('','您已成功取消支付！');
				})
			}
		},
		DeleteDaifukuan(item){
			this.$axios.post('/api/deleteOrder',{
				orderID : item.orderID
			})
			.then( res =>{
				if (res.data.affectedRows) {
					Toast({
						message: '取消订单成功❤❤!',
		                iconClass: 'el-icon-check'
					})
					setTimeout(() => {
					  this.router.go(0)
					}, 1500)
				}else{
					Toast({
						message: '取消订单失败❤❤!',
		                iconClass: 'el-icon-close'
					})
				}
			})
			.catch( error =>{
				console.log(error)
			})
		}
	},
	mounted(){
		//获取状态为代付款的订单数据
		this.$axios.post('/api/selectDaifukuan',{
			username:this.username
		})
		.then( res =>{
			this.DaifukuanData = res.data
			// console.log(this.DaifukuanData)
		})
		.catch( error =>{
			console.log(error)
		})
	},
	//计算属性
	computed:{
		//总数量
		CountNum(){
			let CountNumData = this.DaifukuanData
			let countNum = 0
			for(let i=0;i<CountNumData.length;i++){
				countNum+=CountNumData[i].goodsCount
			}
			// console.log(countNum)
			return countNum 
		},
		//总价格
		CountPrice(){
			let CountpRriceData = this.DaifukuanData
			let countPrice = 0
			for(let i=0;i<CountpRriceData.length;i++){
				countPrice+=CountpRriceData[i].goodsCount*CountpRriceData[i].goodsprice+CountpRriceData[i].yunfei
			}
			// console.log(countPrice)
			return countPrice 
		}

	}
}
</script>
<style scoped>
.AddressContain{
	width:100%;
}
.Address{
	width: 100%;
	height: 80px;
	background-color: #fff;
	border-bottom: 1px solid #E3E3E3;
}
.Address .Address_left{
	width: 85%;
	height: 70px;
	float: left;
}
.Address .Address_right{
	width: 15%;
	height: 70px;
	float: left;
	text-align: center;
}
.Address .Address_right i{
	font-size: 22px;
	height: 70px;
	line-height: 70px;
}
.Address .Address_left .left_shang,.Address .Address_left .left_xia{
	width:100%;
	height: 35px;
	line-height: 35px;
}
.Address .Address_left .left_shang span{
	padding-left: 5%;
	font-size: 14px;
}
.Address .Address_left .left_xia span{
	padding-left: 2%;
	font-size: 13px;
}
.Address .Address_left .left_xia span:first-child{
	padding-left: 5%;
}
.spanNone{
	display: block;
	height: 80px;
	font-size: 15px;
	color: red;
	padding-left: 5%;
	line-height: 80px;
	width:100%;
}
.spanNone i{
	font-size: 22px;
	padding-left: 20%;
	color: black;
}
.showKongDaiFuKuan{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongDaiFuKuan span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:37%;
}
.showKongDaiFuKuan span:nth-child(even){
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
.DaifukuanInfo{
	width: 100%;
	background-color: #fff;
	margin-bottom: 4px;
}
.DaifukuanInfo .storesName{
	padding-left: 4%;
	line-height: 30px;
	font-size: 15px;
	height: 30px;
	width: 96%;
	border-bottom: 1px solid #E3E3E3;
}
.DaifukuanInfo .storesName .el-icon-goods{
	margin:0 5% 0 0;
	font-size: 20px;
}
.DaifukuanInfo .storesName i:last-child{
	font-size: 18px;
	float: right;
	margin-right:8%; 
}
.DaifukuanInfo .zjnr{
	height: 220px;
	position: relative;
	/*background-color: red;*/
	border-bottom: 1px solid #E3E3E3;
}
.DaifukuanInfo .zjnr .shang{
	width: 100%;
	height: 90px;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.DaifukuanInfo .zjnr .shang img{
	padding-left: 4%;
	margin-top: 10px;
	height: 70px;
	width: 70px;
}
.DaifukuanInfo .zjnr .shang .el-icon-circle-close-outline{
	position: absolute;
	margin-top: 8px;
	padding-left: 1%;
	font-size:20px;
}
.DaifukuanInfo .zjnr .shang p{
	position: absolute;
	left: 35%;
	font-size: 13.5px;
}
.DaifukuanInfo .zjnr .shang p:nth-child(3){
	top:10px;
}
.DaifukuanInfo .zjnr .shang p:nth-child(4){
	top:40%;
}
.DaifukuanInfo .zjnr .shang p:nth-child(5){
	top:68%;
	color:#668B8B;
}
.DaifukuanInfo .zjnr .shang p:nth-child(6){
	top:68%;
	left:90%;
	color:#668B8B;
}
.DaifukuanInfo .zjnr .shang p:nth-child(3) i{
	color: #FF7F00;
	font-size: 14px;
}
.DaifukuanInfo .zjnr .PeiSong,.DaifukuanInfo .zjnr .Youhuiquan,.DaifukuanInfo .zjnr .Hongbao{
	width: 94%;
	height: 30px;
	/*background-color: pink;*/
	line-height: 30px;
	font-size: 13px;
	padding-left: 6%;
	position: relative;
}
.DaifukuanInfo .zjnr .PeiSong i,.DaifukuanInfo .zjnr .Youhuiquan i,.DaifukuanInfo .zjnr .Hongbao i{
	position: absolute;
	right: 5%;
}
.DaifukuanInfo .zjnr .PeiSong .sp1,.DaifukuanInfo .zjnr .Youhuiquan .sp1,.DaifukuanInfo .zjnr .Hongbao .sp1{
	color:#668B8B;
}
.DaifukuanInfo .zjnr .PeiSong .sp2,.DaifukuanInfo .zjnr .Youhuiquan .sp2,.DaifukuanInfo .zjnr .Hongbao .sp2{
	position: absolute;
	right:16%;
	color: #000;
}
.DaifukuanInfo .zjnr .ZongJia{
	padding-left: 6%;
	width: 94%;
	height: 40px;
	line-height: 40px;
	position: relative;
	font-size: 13px;
}
.DaifukuanInfo .zjnr .ZongJia .left{
	letter-spacing: 1px;
}
.DaifukuanInfo .zjnr .ZongJia .right{
	position: absolute;
	right:4%;
}
.DaifukuanInfo .zjnr .ZongJia .right i{
	margin-left:5px;
	font-size: 14px;
	color: #FF7F00;
}
.CountPrice{
	width: 100%;
	height: 40px;
	background-color:#fff;
	border-bottom:1px solid #E3E4E3;
	display: flex;
}
.CountPrice .span1,.CountPrice .span2,.CountPrice .span3{
	flex:1;
	height: 40px;
	line-height: 40px;
	font-size: 13px;
	text-align: center;
}
.CountPrice .span2{
	flex:1;
}
.CountPrice .span3{
	flex:1;
	font-size: 15px;
	color: #fff;
}
.CountPrice .span2 i{
	padding-left: 2%;
	font-size: 15px;
	color:#FF7F00;
}
.CountPrice .span3 i{
	display: block;
	float: right;
	width:80%;
	height: 40px;
	background-color:#FF7F00;
}
.kuochongdibu{
	width: 100%;
	height: 70px;
	clear: both;
}
</style>