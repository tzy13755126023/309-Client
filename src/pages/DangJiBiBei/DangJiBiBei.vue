<template>
	<div class="containDangJiBiBei">
		<div class="headerDangJiBiBei">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>{{seasonDate}}季必备</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="ZhengwenContent" v-for="item in DangJiBiBeiData">
			<img v-lazy="item.imagesurl" >
			{{item.content}}
		</div>	
		<div class="DangjibibeiGoods">
			<i>{{seasonDate}}季推荐药品</i>
			<!-- 路由跳转到   goodsInfo页面 -->
			<router-link :to="{name:'GoodsInfo',params:{goodsename:items.goodsEname}}" tag='div' 
			class="SeasonData" v-for="(items,index) in DangjibieiRecommanGoodsData" :key="index">
				<img v-lazy="items.goodsimageurl" alt="">	
				<div class="goodsNameAndprice">
					<span>{{items.goodsName}}</span>	
					<span>{{items.goodsprice | money}}</span>
				</div>	
			</router-link>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import {DateTime} from '../../util/DataTime'
export default{
	name:'DangJiBiBei',
	data(){
		return{
			DataMonth:'',                       //获取当前月份
			seasonDate:'',                      //根据 DataMonth 判断当前属于哪个季节
			seasontypeEng:'',
			DangJiBiBeiData:{},                //数据库当季数据模板
			DangjibieiRecommanGoodsData:{}     //当季推荐商品数据
		}
	},
	methods:{
		goback(){
			this.$router.push('/')
		}
	},
	created(){
		let date = new DateTime()
		// console.log(data)
		// 获取当前时间
		this.DataMonth = parseInt(date.getMonth())
		// console.log(this.DataMonth)
		if (this.DataMonth==3||this.DataMonth==4||this.DataMonth==5) {
			this.seasonDate ='春'
			this.seasontypeEng ='spring'
		}
		if (this.DataMonth==6||this.DataMonth==7||this.DataMonth==8) {
			this.seasonDate ='夏'
			this.seasontypeEng ='summer'
		}
		if (this.DataMonth==9||this.DataMonth==10||this.DataMonth==11) {
			this.seasonDate ='秋'
			this.seasontypeEng ='austom'
		}
		if (this.DataMonth==12||this.DataMonth==1||this.DataMonth==2) {
			this.seasonDate ='冬'
			this.seasontypeEng = 'winter'
		}
	},
	mounted(){
		//获取当季必备模块数据
		this.$axios.get("/api/selectDangjibiei/"+ this.seasontypeEng +"")
		.then( res =>{
			this.DangJiBiBeiData = res.data
			// console.log(this.DangJiBiBeiData)
		})
		.catch( error =>{
			console.log(error)
		})
		//获取当季推荐商品数据
		this.$axios.get("/api/selectDangjibieiRecommanGoods/"+ this.seasontypeEng +" ")
		.then( res =>{
			this.DangjibieiRecommanGoodsData = res.data
			// console.log(this.DangjibieiRecommanGoodsData)
		})
		.catch( error =>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
.containDangJiBiBei{
	width: 100%;
}
.containDangJiBiBei .headerDangJiBiBei{
	height:40px;
	line-height: 40px;
	width:100%;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerDangJiBiBei .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerDangJiBiBei span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 4px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 17px;
	font-weight: bold;
	color:#FF7F00;
}	
.headerDangJiBiBei img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}	
.ZhengwenContent{
	white-space: pre-line;  /*合并空白符序列，但是保留换行*。
	white-space: pre-wrap;  /*保留空白符序列，但是正常地进行换行。*/
	width:98%;
	margin-left: 1%;
	font-size: 13px;
	letter-spacing: 0.5px;
	background-color:#fff;
}
.ZhengwenContent img{
	margin-top: 1%;
	margin-bottom: 4%;
}
.DangjibibeiGoods{
	width: 100%;
	background-color: #fff;
}
.DangjibibeiGoods i{
	margin-top: 7%;
	/*border-top:1px solid #E3E3E3;*/
	border-bottom:1px solid #E3E3E3;
	display: block;
	width:98%;
	padding-left: 2%;
	height: 50px;
	line-height: 50px;
	font-size: 20px;
	color:#FF7F00;
}
.SeasonData{
	margin-bottom: 7px;
	width: 49.5%;
	height: 210px;
	background-color:#fff;
	/*background-color:pink;*/
	float: left;
}
.SeasonData:nth-child(even){
	margin-right:1%;
}
.SeasonData img{
	margin:10% 25% 5%; 
	width: 50%;
	height: 110px;
}
.SeasonData .goodsNameAndprice{
	text-align: center;
	width: 100%;
	height: 80px;
	/*background-color:red;*/
}
.SeasonData .goodsNameAndprice span{
	font-size: 14px;
	text-align: center;
	display: block;
	width: 100%;
	height: 30px;
	line-height: 25px;
	/*background-color:red;*/
}
.SeasonData .goodsNameAndprice span:last-child{
	height: 40px;
	color: #FF7F00;
	/*background-color:green;*/
}
.kuochongdibu{
	width: 100%;
	height: 70px;
	clear: both;
	background-color: #fff;
}
</style>