<template>
	<div class="GoodsShoucang">
		<!-- 如果收藏商品数据为空，则显示此div -->
		<div class="showKongGoodsShoucang" v-show="CountNum==0">
			<span>还没有收藏商品喔！</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<!-- 点击跳转到该商品详情页 -->
		<router-link  @click.native="addToThroughGoods(item)" tag="div"  class="StarsGoodsData"
			:to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}" 
	        :key="index" v-for="(item,index) in StarsGoodsData">
			<img v-lazy="item.goodsimageurl" alt="">
			<span class="goodsName">{{ item.goodsName}}({{item.goodsrules}})</span>
			<span class="storesName"><i>商家：{{item.storesName}}</i></span>
			<span class="goodsprice">价格：<i>{{item.goodsprice | money}}</i></span>
		</router-link>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import {DateTime} from '../util/DataTime'
export default{
	name:'GoodsShoucang',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			StarsGoodsData:{},
			DataTime:'',
			CountNum:'',   //数据长度,判断是否隐藏的依据
		}
	},
	methods:{
		//添加到浏览记录表
		addToThroughGoods(item){
			// console.log(this.DataTime) console.log(this.username)
			// console.log(item.goodsID) console.log(item.storesID)
			this.$axios.post('/api/addToThroughGoods',{
				username:this.username,
				goodsID:item.goodsID,
				storesID:item.storesID,
				throughTime:this.DataTime
			})
			.then( res =>{
				// console.log(res.data)
				// 已加入浏览记录表中
			})
			.catch (error =>{
				console.log(error)
			})
		}
	},
	created(){  
			let date = new DateTime()
			// console.log(data)
			// 获取当前时间
			this.DataTime = date.getDateTime()	
	},
	mounted(){
		this.$axios.post('/api/selectStarsGoods',{
			username:this.username
			})
			.then( res =>{
				// console.log(res.data)
				this.StarsGoodsData = res.data
				this.CountNum = res.data.length
			})
			.catch(error => {
				console.log(error)
		})
	},
}
</script>
<style scoped>
.showKongGoodsShoucang{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongGoodsShoucang span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:33%;
}
.showKongGoodsShoucang span:nth-child(even){
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
.StarsGoodsData{
	width: 100%;
	height: 120px;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.StarsGoodsData:first-child{
	margin-top: 10px;
}
.StarsGoodsData img{
	width: 85px;
	height: 90px;
	padding-top: 15px;
	padding-left:20px;
}
.StarsGoodsData .goodsName,.storesName,.goodsprice{
	position: absolute;
	top:10px;
	left:135px;
	font-size: 15px;
}
.StarsGoodsData .storesName{
	top:45px;
	font-size:14px;
}
.StarsGoodsData .storesName i{
	color:#668B8B;
}
.StarsGoodsData .goodsprice{
	top:80px;
	font-size: 14px;
}
.StarsGoodsData .goodsprice i{
	color: #FF7F00;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>