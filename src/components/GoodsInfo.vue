<template>
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<i class="iconfont" @click="">&#xe69d</i>
		</div>
		<div v-show="index===0" :key="index" v-for="(item,index) in goodsInfo" class="goodsInfo">
			<div class="shang">
				<img v-lazy="item.goodsimageurl" alt="">
				<div class="right_weizi">
					<p>{{ item.goodsName}}</p>
					<p>规格：<span>{{ item.goodsrules}}</span></p>
					<p>贮藏：{{ item.goodszhucang}}</p>
					<p><span>{{storesNumber}}</span>个商家报价</p>
				</div>
				<div class="xia">
					<p><span class="span1">批准文号：</span><span class="span2">{{ item.goodsWenhao}}</span></p>
					<p><span class="span1">使用方法：</span><span class="span2">{{ item.goodsways}}</span></p>
					<p><span class="span1">适应症状：</span><span class="span2">{{ item.goodszz}}</span></p>
				</div>
			</div> 
		</div>
		<div class="spanlast">
		<span class="spanleft">附近所有的商家</span>
		<span class="spanright">
			<img src="../../static/favicon.jpg" alt="">
			<img src="../../static/favicon.jpg" alt="">
			<img src="../../static/favicon.jpg" alt="">
		</span>
		</div>
		<div class="storegoodsInfo">
			<div :key="index" v-for="(item,index) in goodsInfo" class="storesgoods" >
				<!-- 路由跳转 -->
				<!-- <router-link :to="{name:'StoreInfo',params:{storesID:item.storesID}}" tag="p" class="storegoodsP1"> -->
				<router-link @click.native="addToThroughGoods(item)" tag="p" class="storegoodsP1"
							 :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}" >
					<span class="span1">{{item.storesName}}</span>
					<span class="span2">{{item.goodsprice | money}}</span>
				</router-link>
				<p class="storegoodsP2">
					<span>评价：{{item.haoping}}</span>
					<span>库存：{{item.kucun}}</span>
					<span>运费：{{item.yunfei| money}}</span>
					<span>{{item.storeAddress}}</span>
				</p>
				<p class="storegoodsP3">
					<span>{{item.fahuoTime}}</span>
					<!-- 购物车方法及动画 -->
					<i class="iconfont" @click="addtoCart($event,item)"> &#xe60c</i>
				</p>
			</div>
		</div>
		<div class="kuochongdibu"></div>
		<!-- 小球掉落动画 -->
		<div class="ball_wrap">
			<transition
				@before-enter="beforeEnter"
				@enter="Enter"
				@after-enter="afterEnter"
			>
				<div class="ball" v-if="ball.show">
					<div class="inner">
						<i class="iconfont">&#xe60c</i>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
import {DateTime} from '../util/DataTime'
export default{
	name:'GoodsInfo',
	data(){
		return{
			DataTime:'',   //存储当前时间变量
			username:window.localStorage.getItem("username"),
			goodsInfo:[],
			storesNumber:'',
			active:true,
			ball:{
				show:false,
				el:''
			}
		}
	},
	methods:{
		goback(){
		 	this.$router.go(-1)
		},
		//添加商品到购物车
		addtoCart(e,item){
			setTimeout(() => {
			  	this.$store.commit("addToCart",item)
			}, 1000)
			//让小球显示
			this.ball.show=true
			//获取点击元素
			this.ball.el =e.target
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
		},
		beforeEnter(el){
			//让小球移动到点击位置
			//获取点击位置
			const dom = this.ball.el
			// console.log(dom)
			//获取点击Dom的位置
			const rect = dom.getBoundingClientRect()
			// console.log(rect)
			const x = rect.left-window.innerWidth*0.6
			const y =-(window.innerHeight-rect.top)
			// console.log(x,y)
			el.style.display ='block'
			el.style.transform =`translate3d(0,${y}px,0)`
			const inner =el.querySelector('.inner')
			inner.style.transform =`translate3d(${x}px,0,0)`

		},
		Enter(el,done){
			//触发重绘
			document.body.offsetHeight
			//小球移动到原点,就是购物车原来的位置
			el.style.transform =`translate3d(0,0,0)`
			const inner =el.querySelector('.inner')
			inner.style.transform =`translate3d(0,0,0)`
			//过度完成后执行的事件
			el.addEventListener('transitionend',done);

		},
		afterEnter(el){
			//动画结束后隐藏小球
			this.ball.show = false
			el.style.display='none'
		}

	},
	mounted(){
		//拥有该商品的商家以及商品信息
		const goodsEname =this.$route.params.goodsename
		// console.log(goodsEname)
		this.$axios.get("/api/storegoods/"+goodsEname+" ")
		.then( res =>{
			// console.log(res.data)
			this.goodsInfo = res.data
			this.storesNumber =res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
	},
	created(){
		let date = new DateTime()
		// 获取当前时间
		this.DataTime = date.getDateTime()	
	},
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
.header .iconfont:nth-child(2){
	margin-right: 3%;
	float: right;
}
.goodsInfo{
	width: 100%;
	height: 200px;
	background-color: #fff;
}
.goodsInfo .shang{
	width: 100%;
	height: 120px;
	border-bottom: 1px solid #E3E3E3;
}
.goodsInfo .shang img{
	margin: 2% 5%;
	width: 30%;
	height: 106px;
	float: left;
}
.goodsInfo .shang .right_weizi{
	width: 55%;
	height: 120px;
	float: right;
}
.goodsInfo .shang .right_weizi p{
	margin:7px 0 5px 5%; 
	font-size: 13px;
	color:#668B8B;
}
.goodsInfo .shang .right_weizi p:first-child{
	margin:6px 4%;
	font-size: 17px;
	color:#FF7F00;
}
.goodsInfo .shang .right_weizi p:last-child span{
	font-weight: bold;
	font-size: 14px;
	margin-right: 5px;
	color:#66CD00;
}
.goodsInfo .xia{
	width: 100%;
	height: 79px;
	clear:both;
    border-bottom: 1px solid #E3E3E3;
}
.goodsInfo .xia .span1,.goodsInfo .xia .span2{
	float:left;
	margin:4px 8px 3px 55px;
	font-size: 13px;
}
.goodsInfo .xia .span1{
	color:#668B8B;
}
.storegoodsInfo{
    border-top: 1px solid #E3E3E3;
    background-color: #fff;
	width:100%;
}
.storesgoods{
	/*margin-top:10px;*/
	width:100%;
	height:85px;
    border-bottom: 1px solid #E3E3E3;
}
.storesgoods .storegoodsP1{
	height: 29px;
	line-height: 29px;
}
.storesgoods .storegoodsP1 .span1{
	margin-left: 4%;
	float: left;
	font-size: 15px;	
}
.storesgoods .storegoodsP1 .span2{
	margin-right: 5%;
	float: right;
	color:#FF7F00;
	font-size: 15px;	
}
.storesgoods .storegoodsP2{
	height: 25px;
	line-height: 25px;
}
.storesgoods .storegoodsP2 span{
	font-size: 13px;
	margin-left: 5%;
}
.storesgoods .storegoodsP2 span:last-child{
	float: right;
	margin-right:2%;
}
.storesgoods .storegoodsP3{
	height: 28px;
	width: 100%;
	line-height: 28px;
}
.storesgoods .storegoodsP3 span:first-child{
	font-size: 13px;
	font-weight: bold;
	float: left;
	text-align: center;
	margin-left: 4%;
	color:#66CD00;
	display: block;
	width: 25%;
	height: 28px;
	background-color: rgba(176,224,230,.4);
}
.storesgoods .storegoodsP3 .iconfont{
	font-size: 20px;
	float: right;
	color:#FF7F00;
	margin-right:9%;
}
.spanlast{
	width: 100%;
	height: 45px;
	line-height: 45px;
	margin-top:10px; 
	background-color: #fff;
}
.spanlast .spanleft{
	display: block;
	font-size: 16px;
	padding-left: 4%;
	float: left;
	font-weight: bold;
	/*color:#66CD00;*/
	color:#FF7F00;
}
.spanlast .spanright img{
	height: 40px;
	line-height: 45px;
	padding-top: 3px;
	padding-right: 1px;
	width: 40px;
	float: right;
	font-weight: bold;
	background-color: #fff;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
.ball_wrap .ball{
	position: fixed;
	left:60%;
	bottom:0;
	z-index: 1002;
	color: red;
	transition: all 1s cubic-bezier(0.49,-0.29,0.75,0.41)
}
.ball_wrap .ball .inner{
	width: 30px;
	height: 25px;
	text-align: center;
	transition: all 1s linear;
}
.ball_wrap .ball .inner .iconfont{
	font-size: 21px;
}
</style>