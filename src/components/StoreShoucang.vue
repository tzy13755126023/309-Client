<template>
	<div class="StoreShoucang">
		<!-- 如果收藏商家数据为空，则显示此div -->
		<div class="showKongstoresShoucang" v-show="CountNum==0">
			<span>还没有收藏商家喔！</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<!-- 从收藏页路由跳转对应商家详情 -->
		<router-link  :to="{name:'StoreInfo',params:{storesID:item.storesID}}"tag="div" class="starStores" 
            :key="index" v-for="(item,index) in starStoresData">
			<img v-lazy="item.imagesurl" alt="">
			<span class="storesName">{{ item.storesName}}</span>
			<span class="haoping">评分：{{ item.haoping}}分</span>
			<span class="juli">距离：{{ item.juli  | juli}}</span>
			<span class="storeAddress">{{ item.storeAddress}}</span>
		</router-link>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'StoreShoucang',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			starStoresData:{},     //接收商家信息
			CountNum:'',
		}
	},
	methods:{
		tzy(item){
			console.log(item)
		}
	},
	mounted(){
		this.$axios.post('/api/ChaxunStarStore',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data)
			this.starStoresData = res.data
			this.CountNum  = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
.showKongstoresShoucang{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongstoresShoucang span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:33%;
}
.showKongstoresShoucang span:nth-child(even){
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
.StoreShoucang{
	width: 100%;
	/*height: 500px;*/
	/*background-color: red;*/
}
.starStores{
	width: 100%;
	height: 70px;
	position: relative;
	background-color: #fff;
	border-bottom: 1px solid #E3E3E3;
}
.starStores:first-child{
	margin-top: 10px;
}
.starStores img{
	margin-top:10px;
	margin-left:25px;
	border-radius:50%;
	width: 70px;
	height: 50px;
}
.starStores .storesName{
	font-size: 17px;
	position: absolute;
	top:15%;
	left:38%;
}
.starStores .haoping,.juli,.storeAddress{
	font-size: 13px;
	position: absolute;
	color: #668B8B;
	top:60%;
}
.starStores .haoping{
	left:33%;
}
.starStores .juli{
	left:54%;
}
.starStores .storeAddress{
	right:2%;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>