<template>
<!-- 商家商品分类组件 -->
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>{{this.FenleiTitle}}分类列表</span>
			<img src="../../static/favicon.jpg" alt="">
		</div>
	    <!-- 该路由跳转到该商品详情页 -->
		<router-link @click.native="addToThroughGoods(item)" tag="div"  class="StoreFenleiGoods" 
			:to = "{ name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"   
			:key= "index" v-for="(item,index) in StoreFenleiGoods">
			<img v-lazy="item.goodsimageurl" alt="">
			<div class ="nr_right">
				<span>{{item.goodsName}}({{item.goodsrules}})</span>	
				<span>{{item.goodsWenhao}}</span>	
				<span>库存：{{item.kucun}}</span>	
				<span>{{item.goodsprice | money}}
				<!-- .prevent阻止默认事件跳转 -->
				<i class="iconfont" @click.prevent="addToCart($event,item)">&#xe60c</i>
				</span>	
			</div>
		</router-link >
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
	name:'StoreFenleiGoods',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			StoreFenleiGoods:{},
			FenleiTitle:'',       
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
		addToCart(e,item){
			// console.log(item)
			setTimeout(() => {
			  	this.$store.commit("addToCart",item)
			}, 1000)
			//让小球显示
			this.ball.show=true
			//获取点击元素
			this.ball.el =e.target
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
		},
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
	mounted(){
		const goodstype = this.$route.params.goodstype
		const storesID  = this.$route.params.storesID
		//根据路由传来的 storesID + goodstype 参获取对应的分类信息
		this.$axios.get("/api/StoreFenleiGoods/"+storesID+"/"+goodstype+" ")
		.then( res =>{
			// console.log(res.data)
			this.StoreFenleiGoods = res.data
		})
		.catch( error =>{
			console.log(error)
		})
	},
	created(){
		if(this.$route.params.goodstype=='ZXYP'){
			this.FenleiTitle ='中西药品'
		}
		if(this.$route.params.goodstype=='YSBJ'){
			this.FenleiTitle ='养生保健'
		}
		if(this.$route.params.goodstype=='YLQX'){
			this.FenleiTitle ='医疗器械'
		}
		if(this.$route.params.goodstype=='JSYP'){
			this.FenleiTitle ='计生用品'
		}
		if(this.$route.params.goodstype=='ZYYP'){
			this.FenleiTitle ='中药饮品'
		}
		if(this.$route.params.goodstype=='MRHF'){
			this.FenleiTitle ='美容护肤'
		}
		let date = new DateTime()
		// console.log(data)
		// 获取当前时间
		this.DataTime = date.getDateTime()
	}
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
	color:#FF7F00;
}	
.header img{
	position:absolute;
	top:1px;
	right:3%;
	width: 40px;
	height: 37px;
}
.StoreFenleiGoods{
	/*margin-top: 10px;*/
	height: 100px;
	/*background-color:red;*/
	position: relative;
	background-color:#fff;
    border-bottom: 1px solid #E3E3E3;
}
.StoreFenleiGoods img{
	position: absolute;
	left: 20px;
	top: 10px;
	width: 80px;
	height: 80px;
}
.StoreFenleiGoods .nr_right{
	width: 63%;
	height: 100px;
	position: absolute;
	right:5%;
	/*background-color:green;*/
}
.StoreFenleiGoods .nr_right span{
	margin: 5px 0 3px 20px;
	display: block;
	font-size: 13px;
}
.StoreFenleiGoods .nr_right span:first-child{
	font-size: 14px;
}
.StoreFenleiGoods .nr_right span:nth-child(2){
	color:#668B8B;
}
.StoreFenleiGoods .nr_right span:last-child{
	font-size: 15px;
	color: #FF7F00;
}
.StoreFenleiGoods .nr_right span:last-child i{
	font-size: 17px;
	font-weight: bold;
	color: #FF7F00;
	float: right;
	margin-right: 10%;
} 
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
/*小球动画样式*/
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