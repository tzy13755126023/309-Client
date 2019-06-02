<template>
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>{{this.gaofajiBing}}商品列表</span>
			<img src="../../static/favicon.jpg" alt="">
		</div>
		<!-- 左边九类高发疾病标签 -->
		<div class="left_Gaofajibing">
			<ul>
				<li :key="index" v-for="(item,index) in gaofajibingLei" :class="index==number?'current':''" 
				@click="Gaofajibing(item)">
					<span>{{ item.gaofajiBing}}</span>
				</li>
			</ul>
		</div>
		<!-- 展示对应标签的商品 -->
		<div class="right_Gaofajibing">
			<router-link  @click.native="addToThroughGoods(item)"  tag="div"  class="img_goodsName"            :to= " {name:'Goodsxiangqing',params:{ goodsID:item.goodsID }}"  
			            :key="item.goodsID"   v-for="item in gaofajiBingData">
				<img v-lazy="item.goodsimageurl" alt="">	
				<span> {{ item.goodsName }} </span> 
			</router-link>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import {DateTime} from '../util/DataTime'
export default{
	name:'Gaofajibing',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			DataTime:'',
			number:this.$route.params.index,
			gaofajiBing:this.$route.params.gaofajibing,
			gaofajibingLei:[
			{
				gaofajiBing:'腹痛腹泻',
				index:0
			},
			{
				gaofajiBing:'哮喘',
				index:1
			},
			{
				gaofajiBing:'胃炎',
				index:2
			},
			{
				gaofajiBing:'肺热咳嗽',
				index:3
			},
			{
				gaofajiBing:'痛风',
				index:4
			},
			{
				gaofajiBing:'计生医用',
				index:5
			},
			{
				gaofajiBing:'高血压',
				index:6
			},
			{
				gaofajiBing:'缺钙',
				index:7
			},
			{
				gaofajiBing:'肝病',
				index:8
			}
			],
			gaofajiBingData:{}

		}
	},
	methods:{
		goback(){
			this.$router.push('/zhaoyao')
		},
		Gaofajibing(item){
			this.number = item.index
			this.gaofajiBing = item.gaofajiBing
			this.fetchData()

		},
		fetchData(){
			setTimeout(() => {
			  	this.$axios.get("/api/Gaofajibing/"+this.gaofajiBing+"")
				.then( res =>{
					// console.log(res.data)
					this.gaofajiBingData = res.data
				})
				.catch( error =>{
					console.log(error)
				})
			}, 600)	
		},
		//添加到浏览记录表
		addToThroughGoods(item){
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
		this.fetchData()
		let date = new DateTime()
		// 获取当前时间
		this.DataTime = date.getDateTime()	
	},
	// mounted(){
	// 	console.log(this.gaofajiBing)	
	// }
}
</script>
<style scoped>
.contain{
	width:100%;
}
.header{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
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
	position: absolute;
	height:40px;
	width: 40%;
	text-align: center;
	left:30%;
	top:0;
	font-size: 16px;
	font-weight: bold;
	letter-spacing: 1px;
	color:#FF7F00;
}	
.header img{
	position:absolute;
	top:0px;
	right:3%;
	width: 40px;
	height: 40px;
}
.left_Gaofajibing{
	padding-top: 20px;
	width: 24%;
	float: left;
}
.left_Gaofajibing ul li{
	width: 100%;
	height: 40px;
	text-align:center;
	line-height: 30px;
	font-size:15px;
	/*background-color:black;*/
}
.left_Gaofajibing ul .current{
	color:#66CD00 !important;
} 
.right_Gaofajibing{
	border-left: 1px solid #E3E3E3;
	padding-top: 20px;
	width: 75%;
	float: right;
	/*background-color:green;*/
}
.right_Gaofajibing .img_goodsName{
	/*clear:both;*/
	float: left;
	width: 40%;
	height: 110px;
	margin: 0  5% 5px;
	/*background-color:red;*/
}
.right_Gaofajibing .img_goodsName img{
	width: 80%;
	height: 80px;
	margin: 5px 10%;
}
.right_Gaofajibing .img_goodsName span{
	display: block;
	font-size: 13px;
	height: 20px;
	line-height: 20px;
	text-align:center;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>