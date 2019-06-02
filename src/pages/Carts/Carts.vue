<template>
<!-- 购物车页面 -->
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>购物车</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<!-- 如果购物车为空，则显示此div -->
		<div class="showKongcart" v-if="countSum===0">
			<span>购物车是空的</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div :key="index" class="cartInfo" v-for="(item,index) in cartArry">
			<!-- 商家名字 -->
			<!-- 点击storesName跳转到该商家信息页面 -->
			<router-link :to="{name:'StoreInfo',params:{storesID:item.storesID}}" tag="div" class="storesName">
				<i class="el-icon-goods"></i>{{item.storesName}}
				<i class="iconfont">&#xe641</i>
			</router-link>
			<!-- 中间商品图片以及其他信息 -->
			<!-- 该路由跳转到该商品详情页 -->
			<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}" tag="div" class="zjnr">
				<img v-lazy="item.goodsimageurl" alt="">
				<!-- 删除商品 -->
				<i class="el-icon-circle-close-outline" @click.prevent.stop="DeleteGoods"></i>
				<div class="ps">
					<p>名称：{{item.goodsName}}</p>
					<p>规格：{{item.goodsrules}}</p>
					<p>价格：{{item.goodsprice | money}}</p>
					<p>库存：{{item.kucun}}</p>
				</div>
				<!-- 计算数量 -->
				<div class="cartJiaJian">
					<i class="el-icon-remove-outline" @click.prevent.stop="SubCount(index)"></i>
					<i>{{item.cartCount}}</i>
					<i class="el-icon-circle-plus-outline" @click.prevent.stop="AddCount(index)"></i>
				</div>
			</router-link>
			<div class="CountNumber">
				<div class="left">
					运费：<span>{{item.yunfei | money}}</span>
				</div>
				<div class="center">
					<span>共 <span style="margin: 0 1px">{{item.cartCount}}</span>商品</span> 
				</div>
				<div  class="right">
					<span>合计:</span>
					<span style="color:#FF7F00;">{{item.cartCount*item.goodsprice+item.yunfei | money}}</span>
				</div>
			</div>
		</div>
			<div class="CountPrice" v-if="countSum!==0">
				<span class="span1">商品总件数：{{countSum}}</span>
				<span class="span2">商品总价格：<i>{{countPrice | money}}</i></span>
			</div>
			<div class="XDAndQK" v-if="countSum!==0">
			    <el-button size="small" class="login-submit" @click.native.prevent.stop="handleXD">
				 	<span style="font-size: 15px">下单</span>
			    </el-button>
  				<el-button size="small" class="login-submit" @click.native.prevent.stop="clearCart">
  					<span style="font-size: 15px">清空购物车</span>
  				</el-button>
			</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import { DateTime } from '../../util/DataTime' 
export default{
	name:'Carts',
	data(){
		return{	 
			DataTime:'',        //获取当前时间
			orderStatus: 1,		//订单状态   提交订单时取消 (为待付款)
			orderStatus2:2,		//订单状态   确定提交订单（为待收货）
			userMoney:window.localStorage.getItem("userMoney"),
			username :window.localStorage.getItem("username"),
			payMoney:'',        //所剩余额			
		}
	},
	computed:{
		...mapState({
			cartArry:state => state.cartArry
		}),
		...mapGetters({
			countSum:'countSum',         //单个商品数量
			countPrice:'countPrice',     //所有商品总价格
		}),
		//随机编号
		FliterBianHao:function(){
			return this.RandomNumber()
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
		//数量加一
		AddCount(index){
			this.$store.commit("AddCount",index);
		},
		//数量减一
		SubCount(index){
			this.$store.commit("SubCount",index);
		},
		//处理下单(提交订单)
		handleXD(){
	    	const cartArryData = JSON.parse(localStorage.getItem('cartArry'))  //购物车数据
	    	const AddressData  = JSON.parse(localStorage.getItem("MorenAddress"))  //默认地址数据
			if (this.userMoney<this.countPrice) {
				MessageBox('温馨提示！','您的账户余额不足以提交该订单，请您联系管理员对该账户进行充值！');
			}else if(AddressData.length==0){
				MessageBox.confirm('亲，您还没有添加默认收货地址喔！','温馨提示！').then( action =>{
				// 跳转 到  立即评价页面
				this.$router.push('/shouhuodizhi')
			})
			}else{
				//确认提交订单   付款 然后   orderStatus 为2(待收货)
				MessageBox.confirm('您确定提交该订单吗?','').then(action => {
					for(let i =0;i<cartArryData.length;i++){
						// console.log(i)
						// console.log(this.FliterBianHao)
						const cartArryDataIndex = cartArryData[i]
						// console.log(this.username)
						// console.log(cartArryDataIndex.goodsID)
						// console.log(cartArryDataIndex.storesID)
						// console.log(res.data[0].yunfei)
						// console.log(cartArryDataIndex.storesName)
						// console.log(cartArryDataIndex.cartCount)
						// console.log(cartArryDataIndex.cartCount*cartArryDataIndex.goodsprice)
						// console.log(AddressData[0].AddressID)
						// console.log(this.orderStatus2)
						// console.log(this.DataTime)	
						//提交订单
						this.$axios.post('/api/addToOrder',{		
						   orderBianhao : this.FliterBianHao,
							 username   : this.username,
							 goodsID    : cartArryDataIndex.goodsID,
							 goodsName  : cartArryDataIndex.goodsName,
						     storesID   : cartArryDataIndex.storesID,
							storesName  : cartArryDataIndex.storesName,
							goodsCount  : cartArryDataIndex.cartCount,
							goodsAmount : cartArryDataIndex.cartCount*cartArryDataIndex.goodsprice,
							AddressID   : AddressData[0].AddressID,
							orderStatus : this.orderStatus2,
							orderTime   : this.DataTime
						})
						.then( res =>{
							if (res.data.affectedRows) {
								if (i==(cartArryData.length-1)) {
		    						Toast({
					                	message: '❤❤亲，订单提交成功，欢迎下次光临❤❤!',
					                	iconClass: 'el-icon-check'
				           		 	});
									//刷新页面
									setTimeout(() => {
										this.$router.go(0)   
									}, 2000)
								}
							}else{
		    					MessageBox('','提交订单失败，请您5s后再试试，谢谢！');	
							}
						})
						.catch( error =>{
							console.log(error)
						})
					}
					//修改账户金额
					this.$axios.put('/api/updateMoney',{
						money:(this.userMoney-this.countPrice).toFixed(2),
						username:this.username
					})
					.then( res =>{
						if (res.data.affectedRows) {
    						// MessageBox('','全部商品下单成功，快快去付款吧！');	
    						// console.log('修改余额成功')
    						localStorage.setItem("userMoney",(this.userMoney-this.countPrice).toFixed(2))
    						this.$store.commit("clearCart")
						}else{
							console.log('修改余额失败')
						}
					})
					.catch( error =>{
						console.log(error)
					})
						
				}).catch( error =>{
					   //取消确认提交订单  orderStatus 为1(待付款)
					for(let i =0;i<cartArryData.length;i++){
						const cartArryDataIndex = cartArryData[i]
						//提交订单
						this.$axios.post('/api/addToOrder',{
						  orderBianhao : this.FliterBianHao,
							 username  : this.username,
							 goodsID   : cartArryDataIndex.goodsID,
							 goodsName : cartArryDataIndex.goodsName,
						     storesID  : cartArryDataIndex.storesID,
							storesName : cartArryDataIndex.storesName,
							goodsCount : cartArryDataIndex.cartCount,
							goodsAmount: cartArryDataIndex.cartCount*cartArryDataIndex.goodsprice,
							AddressID  : AddressData[0].AddressID,
							orderStatus: this.orderStatus,
							orderTime  : this.DataTime
						})
						.then( res =>{
							if (res.data.affectedRows) {
								if (i==(cartArryData.length-1)) {
		    						MessageBox('','取消成功，但已保存到待付款中，可以随时去付款喔！');	
		    						//清除购物车
		    						this.$store.commit("clearCart")
									//刷新页面
									setTimeout(() => {
										this.$router.go(0)   
									}, 2400)
								}
							}
						})
						.catch( error =>{
							console.log(error)
						})
					}
				})				
			
			}
		},
		//清空购物车
		clearCart(){
			MessageBox.confirm('确定清空购物车所有商品吗?','').then(action => {
				   this.$store.commit("clearCart")
				   MessageBox('提示','已成功清空购物车！');

				}).catch( error =>{

			 	   MessageBox.alert( '已取消清空购物车！','');
				   console.log(error)
				})	
		},
		//点击图片右上角icon删除对应商品
		DeleteGoods(index){
			this.$store.commit("DeleteGoods",index)
		},
		RandomRange(min,max) {
     	 	return Math.floor(Math.random()*(max-min)+min);
   		},
   		//随机数
		RandomNumber() {
       		// var str1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYQ0123456789';
       		var str1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYQ';
       		var finalstr='';
       		for (var i=0;i<18;i++){
	            var index=this.RandomRange(0,52);
	            var strstr=str1[index];
	            finalstr+=strstr;
       		}
			return finalstr;
   		}
	},
	//获取当前时间
	created(){
		let date = new DateTime()
		this.DataTime = date.getDateTime()
	},
	components:{
	},
}
</script>
<style scoped>
.contain{
	width: 100%;
}
.header{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
    border-bottom: 1px solid #E3E3E3;
}
.header .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.header span{
	margin-left: 30%;
	color:#FF7F00;
	font-size: 20px;
	letter-spacing: 3px;
}
.header img{
	margin-top:3px;
	margin-right: 3%;
	width: 35px;
	height: 35px;
	float: right;
}
.showKongcart{
	text-align: center;
	width: 100%;
	height: 225px;
	background-image: url("../../assets/images/KongCart.jpg");
	background-size: 100%;
	background-position: 0 -20px;    /*让背景图片上移20px*/
	position: relative;
}
.showKongcart span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 23%;
	right:36%;
}
.showKongcart span:nth-child(even){
	display: block;
	width: 25%;
	height: 30px;
	line-height: 30px;
	background-color: green;
	color:#dddddd;
	font-size: 14px;
	position: absolute;
	bottom: 5%;
	right:35%;
}
.cartInfo{
	border-top:1px solid #E3E3E3;
	margin-top:10px;
	width: 100%;
	height: 202px;
	background-color: #fff;
	border-bottom: 1px solid #E3E3E3;
}
.cartInfo .storesName{
	padding-left: 4%;
	line-height: 40px;
	font-size: 16px;
	height: 40px;
	width: 96%;
	border-bottom: 1px solid #E3E3E3;
	/*background-color: red;*/
}
.cartInfo .storesName .el-icon-goods{
	margin:0 7px 0 0;
	font-size: 20px;
}
.cartInfo .storesName i:last-child{
	font-size: 20px;
	float: right;
	margin-right:3%; 
}
.cartInfo .zjnr{
	padding-left: 2%;
	height: 115px;
	position: relative;
	/*background-color: red;*/
	border-bottom: 1px solid #E3E3E3;
}
.cartInfo .zjnr img{
	margin-top: 10px;
	height: 100px;
	width: 100px;
}
.cartInfo .zjnr .el-icon-circle-close-outline{
	position: absolute;
	font-size: 20px;
	margin-top: 10px;
}
.cartInfo .zjnr .ps{
	width: 180px;
	height: 100%;
	position: absolute;
	/*background-color:red;*/
	top:0;
	left:135px;
	padding-left: 5px;
}
.cartInfo .zjnr .ps p{
	margin: 5px 0 5px 13px;
	font-size: 14px;
}
.cartInfo .zjnr .ps p:first-child{
	margin-top:20px;
}
/*选择偶数nth-child(even) 选择奇数 nth-child(odd)
.cartInfo .zjnr .ps p:nth-child(even){
	color:#FF7F00;
}*/
.cartInfo .zjnr .ps p:nth-child(2){
	font-size: 13px;
	margin: 5px 0 5px 14px;
	color:#668B8B;
}
.cartInfo .zjnr .ps p:nth-child(3){
	color:#FF7F00;
	margin: 4px 0 2px 13px;
}
.cartInfo .zjnr .ps p:last-child{
	margin: 4px 0 0 14px;
	height: 20px;
	line-height: 18px;
	font-size: 13.5px;
	color:#668B8B;
}
.cartInfo .zjnr .cartJiaJian{
	width: 90px;
	height: 28px;
	line-height: 30px;
	position: absolute;
	text-align: center;
	display: flex;
	/*background-color: green;*/
	border: 1px solid #C9C9C9;
	border-radius:10px;
	bottom: 3px;
	right:5px;
}
.cartInfo .zjnr .cartJiaJian i{
	flex:1;
	line-height: 30px;
	font-size: 21px;
	border-right:1px solid #E3E4E3;
}
.cartInfo .zjnr .cartJiaJian i:last-child{
	border-right:none;
}
.cartInfo .CountNumber{
	margin-top:1px;
	width: 100%;
	height: 40px;
	text-align:center;
	/*background-color: red;*/
	line-height: 40px;
	font-size: 14px;
	position: relative;
}
.cartInfo .CountNumber .left{
	width: 35%;
	height: 40px;
	float: right;
	position: absolute;
	top:0;
	right: 65%;
	/*background-color: green;*/
}
.cartInfo .CountNumber .left span{
	color: #FF7F00;
}
.cartInfo .CountNumber .center{
	width: 25%;
	height: 40px;
	float: right;
	position: absolute;
	top:0;
	right: 38%;
	/*background-color: green;*/
}
.cartInfo .CountNumber .right{
	width: 31%;
	height: 40px;
	float: right;
	position: absolute;
	top:0;
	right: 0%;
	/*background-color: green;*/
}
.cartInfo .CountNumber .right span{
	padding-left:4%;
}
.cartInfo .CountNumber .right span:first-child{
	padding-left: 2%;
}
.CountPrice{
	margin-top: 10px;
	width: 100%;
	height: 40px;
	background-color:#fff;
	border-bottom:1px solid #E3E4E3;
	position: relative;
}
.CountPrice .span1,.CountPrice .span2{
	display: block;
	width: 40%;
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	right:60%;
	text-align: center;
	position: absolute;
}
.CountPrice .span2{
	width: 60%;
	right:0%;
	font-size: 14px;
}
.CountPrice .span2 i{
	padding-left: 2%;
	font-size: 16px;
	color:#FF7F00;
}
.XDAndQK{
	width: 100%;
	height: 55px;
	background-color:#fff;
}
.XDAndQK .login-submit{
	margin-top: 10px;
	margin-left: 1%;
	width: 48%;
	height: 35px;
	float: left;
	background-color: rgba(240,0,0,.6);
	border-radius: 15px;
}
.kuochongdibu{
	width: 100%;
	height: 70px;
	clear: both;
}
</style>