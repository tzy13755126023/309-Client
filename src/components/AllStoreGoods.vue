<template>
<!-- 所有商品信息组件 -->
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>商品列表</span>
			<img src="../../static/favicon.jpg" alt="">
		</div>
		<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll','pull-down']" @pull-up="pullUp" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
		<!-- 点击跳转到该商品详情页 -->
		<router-link  @click.native="addToThroughGoods(item)" tag="div" class="allStoresGoods" 
			:key="index"  v-for="(item,index) in allStoresGoods" 
		    :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"  
 		    v-loading="loading1" 
 		    fullscreen:true
	        lock: true
	 	    element-loading-text="拼命加载中"
		    element-loading-spinner="el-icon-loading"
	        element-loading-background="rgba(0, 0, 0, 0.8)">
			<img v-lazy="item.goodsimageurl"  alt="">
			<div class="nr_right">
				<span>{{item.goodsName}}({{item.goodsrules}})</span>	
				<span>{{item.goodsWenhao}}</span>	
				<span>库存：{{item.kucun}}</span>	
				<span>{{item.goodsprice | money}}
				<!-- .prevent阻止默认事件跳转 -->
				<i class="iconfont" @click.prevent="addToCart($event,item)">&#xe60c</i>
				</span>	
			</div>
		</router-link>
		<!-- 滚动加载样式 -->
		<div slot="infinite-scroll-loading" class="infinite-scroll-loading">
			<i class="el-icon-loading"></i>
			<span>数据加载中...</span>
		</div>
		<!-- 上拉加载样式 --> 
		<div slot="pull-up-loading" class="pull-up-loading">
			<i class="el-icon-loading"></i>
			<span>数据加载中...</span>
		</div>
		<!-- 下拉刷新样式 --> 
		<div slot="pull-down-loading" class="pull-down-loading">
			<i class="el-icon-loading"></i>
			<span>刷新中...</span>
		</div>
		<!-- 数据加载完成时的样式 -->
		<div slot="completed" class="completed">
			<span>数据全部加载完成</span>
		</div>
		</vue-data-loading>
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
//上、下拉加载数据
import VueDataLoading from 'vue-data-loading'
import {DateTime} from '../util/DataTime'
export default{
	name:'AllStoreGoods',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			DataTime:'',
			loading: false,
			loading1:true,
            completed: false,
            page: 1,			
            offset:0,           //数据偏移量
			allStoresGoods:[],  //获取所有商品的数组
			ball:{
				show:false,
				el:''
			}
		}
	},
	created(){
		this.fetchData()
		let date = new DateTime()
		// console.log(data)
		// 获取当前时间
		this.DataTime = date.getDateTime()
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
		fetchData(){
			this.loading = true
			setTimeout(() => {
			  	const storesID = this.$route.params.storesID
				//请求对应商家所有商品
				this.$axios.get("/api/storeInfo/"+storesID+"/"+this.offset+"/6")
				.then( res =>{
					//判断是否全部加载完毕
					//对6取余,因为偏移量pagesize和offset都是6
					//余数不是0的时候已加载全部数据
					if (res.data.length%6!==0) {
							this.completed = true
					}
					this.allStoresGoods =this.allStoresGoods.concat(res.data)
					// console.log(this.allStoresGoods)
					//请求完毕
					this.loading = false
					this.offset+=6
					this.loading1 = false
				})
				.catch( error =>{
					console.log(error)
				})
			}, 1000)
			
		},
		//上拉加载数据
		pullUp(){
            this.fetchData()
            this.page++    
		},
		//下拉刷新数据
		pullDown(){
			this.allStoresGoods = []
			this.offset = 0
            this.page = 1
            this.completed = false
            this.fetchData()
        },
        //滚动数据
		infiniteScroll() {
            this.fetchData()
            this.page++
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
	components: {
    	VueDataLoading
	},
	mounted(){
		// const storesID = this.$route.params.storesID
		// //请求对应商家所有商品
		// this.$axios.get("/api/storeInfo/"+storesID+"")
		// .then( res =>{
		// 	console.log(res.data)
		// 	this.allStoresGoods = res.data
		// })
		// .catch( error =>{
		// 	console.log(error)
		// })
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
.allStoresGoods{
	/*margin-top: 10px;*/
	height: 100px;
	/*background-color:red;*/
	position: relative;
	background-color:#fff;
    border-bottom: 1px solid #E3E3E3;
}
.allStoresGoods img{
	position: absolute;
	left: 20px;
	top: 10px;
	width: 80px;
	height: 80px;
}
.allStoresGoods .nr_right{
	width: 63%;
	height: 100px;
	position: absolute;
	right:5%;
	/*background-color:green;*/
}
.allStoresGoods .nr_right span{
	margin: 5px 0 3px 20px;
	display: block;
	font-size: 13px;
}
.allStoresGoods .nr_right span:first-child{
	font-size: 14px;
}
.allStoresGoods .nr_right span:nth-child(2){
	color:#668B8B;
}
.allStoresGoods .nr_right span:last-child{
	font-size: 15px;
	color: #FF7F00;
}
.allStoresGoods .nr_right span:last-child i{
	font-size: 17px;
	font-weight: bold;
	color: #FF7F00;
	float: right;
	margin-right: 10%;
} 
.infinite-scroll-loading,.pull-up-loading,.pull-down-loading,.completed{
	font-size: 16px;
	text-align: center;
	width: 100%;
	height: 30px;
	line-height: 30px;
	position: absolute;
	top:-10px;
}
.pull-up-loading,.pull-down-loading{
	color:#FF7F00;
	top:-20px;
	right: 0;
}
.infinite-scroll-loading{
	color:#FF7F00;
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