<template>
	<div class="ContainAllStoreInfo">
		<div class="headerAllStoreInfo">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>附近所有药房</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="fujinyaofang">
			<div class="sjnr">
		 		<!-- router-link 商家详细信息页面 -->
		 		<router-link :to="{name:'StoreInfo',params:{storesID:item.storesID}}" tag="li" :key="index" 
		 		v-for="(item,index) in AllStoresData">
		 			<img v-lazy="item.imagesurl" alt="">
		 			<!-- 商家中间店名以及好评距离等信息 -->
		 			<div class="zong">	
		 			<div class="storesNames">
		 				{{ item.storesName}} 
		 			</div>
					<div class="julihaoping">
		 				<span style="margin-right:10px">距离&nbsp;&nbsp;{{ item.juli | juli}} </span>
		 				<span>评价</span>
		 				<span style="color:#66CD00;font-size: 13px;">&nbsp;&nbsp;{{ item.haoping}}</span> 						
		 			</div>
		 			</div>
		 			<!-- 进店看看div -->
					<div class="jdkk">
						<span>进店看看</span>
					</div>
		 		</router-link>
	 		</div>
	 	</div>
	 	<div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'AllStoreInfo',
	data(){
		return{
			AllStoresData:[],
		}
	},
	methods:{
		goback(){
			this.$router.push('/zhaoyao')
		}
	},
	mounted(){
		this.$axios.get('/api/selectAllStores')
		.then( res =>{
			this.AllStoresData = res.data
		})
		.catch( error =>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
.ContainAllStoreInfo{
	width: 100%;
	min-height: 100%;
}
.ContainAllStoreInfo .headerAllStoreInfo{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerAllStoreInfo .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerAllStoreInfo span{
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
.headerAllStoreInfo img{
	position:absolute;
	top:1px;
	right:1%;
	width: 39px;
	height: 39px;
}
.fujinyaofang{
	margin-top: 15px;
	width: 100%;
}
.fujinyaofang .sjnr{
    width:100%;
}
.fujinyaofang .sjnr li{
    width:100%;
    height:60px;
    border-bottom: 1px solid #E3E3E3;
}
.fujinyaofang .sjnr li{
	margin-top: 10px;
}
.fujinyaofang .sjnr li img{
	width: 15%;
	height: 40px;
	margin: 10px 20px 10px 25px;
	border-radius: 50%;
	float: left;
}
.fujinyaofang .sjnr li .zong{
	width: 45%;
	height: 50px;
	padding-top:8px; 
	float: left;
}
.fujinyaofang .sjnr li .zong .storesNames{
	margin: 0 0 5px 15px; 
	font-size: 14px;
	color:#545454;
}
.fujinyaofang .sjnr li .zong .julihaoping{
	font-size: 12px;
	margin-left: 20px; 
}
.fujinyaofang .sjnr li .jdkk{
	width: 16%;
	height: 20px;
	padding:1% 0 0.5% 2%; 
	margin-top:4%; 
	font-size: 13px;
	font-weight: bold;
	margin-right: 3%;
	float: right;
	border: 1px solid #FF7F00;
	color: #FF7F00;;
	border-radius: 15px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>