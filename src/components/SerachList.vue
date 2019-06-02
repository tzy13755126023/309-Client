<template>
	<div class="contain">
		<div class="header">
		 	<i class="iconfont" @click="goback">&#xe7eb</i>
		 	<input class="input1" ref="input1" type="text" :placeholder="icon"/>
		 	<div class="btn1" @click="Search">
		 		<i class="iconfont">&#xe69d</i>
		 	</div>
		 </div>
		 <div class="goodsInfo">	
		 	<div class="spanOrder">
		 		<!-- 默认是评分从高到低 -->
		 		<span  class="span1" :class="{on:order==''}" @click="handleDefault()">默认</span>
		 		<!-- 价格分为升序降序 -->
		 		<span class="span1" @click="handlePrice()">
		 			价格
					<i class="el-icon-caret-top" :class="{on:order==='price-asc'}"></i>
					<i class="el-icon-caret-bottom" :class="{on:order==='price-desc'}"></i>
				</span>
				<!-- 距离分远近 -->
				<span class="span1" @click="handleJuli()">
					距离
					<i class="el-icon-caret-top" :class="{on:order==='juli-asc'}"></i>
					<i class="el-icon-caret-bottom" :class="{on:order==='juli-desc'}"></i>
				</span>
				<span class="span1">
					<img src="../../static/favicon.jpg" alt="">
				</span>
		 	</div>
		 	<!-- 如果没有相关商品,显示此DIV -->
		 	<div class="Nogoods" v-if="searchListData==0">
		 		<span>暂无相关商品</span>
		 	</div>
		 	<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll','pull-down']" @pull-up="pullUp" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
			<!-- 路由跳转到该商品详情页 -->
		 	<router-link @click.native="addToThroughGoods(item)"  tag="div" class="goods" 
	 				     :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"
	 					 :key="item.goodsID" v-for="item in FiltersearchListData" 
			 			 v-loading="loading1" 
				 		 fullscreen:true
				 		 lock: true
					 	 element-loading-text="拼命加载中"
			    		 element-loading-spinner="el-icon-loading"
					     element-loading-background="rgba(0, 0, 0, 0.8)">
		 		<img v-lazy="item.goodsimageurl" alt="">
				<div class ="nr_right">
					<span>{{item.goodsName}}({{item.goodsrules}})</span>	
					<span>{{item.goodsWenhao}}</span>	
					<span>
						库存：{{item.kucun}} 
						<i>好评：{{item.haoping}}</i>
						<i>距离：{{item.juli | juli}}</i>
					</span>	
					<span>{{item.goodsprice | money}}
					<!-- 添加到购物车 -->
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
//上、下拉加载数据
import VueDataLoading from 'vue-data-loading'
import { MessageBox } from 'mint-ui'
import {DateTime} from '../util/DataTime'
export default{
	name:'SerachList',
	data(){
		return{
			icon:'  \ue69d     请输入 批准文号、商品名、症状',
			username:window.localStorage.getItem("username"),
			DataTime:'',
			searchValue:this.$route.params.searchvalue,
			searchListData:[],
			order:'',  
			//price-asc 价格降序 price-asc 价格升序
			//juli-desc 距离降序 juli-asc 距离升序
			loading: false,
			loading1:true,
            completed: false,
            inputValue:'',
            pageMax:'',
            page: 1,			
            offset:0,     //数据偏移量  
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
		fetchData(searchValue){
			this.loading = true
			setTimeout(() => {
  				this.$axios.get("/api/searchLsit/"+this.searchValue+"/"+this.offset+"/13")
					.then( res =>{
						//如果返回商品信息量为空，则提示
						//对10取余,因为偏移量pagesize和offset都是13
						//余数不是0的时候已加载全部数据
						if (res.data.length%13!==0) {
							// this.pageMax =this.page
							// console.log(this.pageMax)
							// console.log(this.page)
							// if (this.page==this.pageMax) {
								this.completed = true
				                // this.loading = false
							// }
						}
						this.searchListData =this.searchListData.concat(res.data)
						// this.searchListData =res.data
						// console.log(this.searchListData)
						//请求完毕
						this.loading = false
						this.offset+=13
						this.loading1 = false
					})
					.catch( error =>{
						console.log(error)
					})
			}, 800)

		},
		Search(){
			const searchValue = this.$refs.input1.value.trim()
			if (searchValue==''||searchValue==null) {
				MessageBox.alert('亲，您还没有输入需要查询的内容喔！','')
			}
			else{
				this.searchListData=[]
				this.order=''
				//price-asc 价格降序 price-asc 价格升序
				//juli-desc 距离降序 juli-asc 距离升序
				this.loading=false
				this.loading1=true
	            this.completed=false
	            this.pageMax=''
	            this.page=1		
	            this.offset=0      //数据偏移量   
	            this.$router.push({name:'Serach',params:{searchvalue:searchValue}})	
	            this.fetchData(searchValue) 
	            this.$router.go(0)
			}
		},
		//默认
		handleDefault(){
			this.order = ''
		},
		//价格点击事件方法
		handlePrice(){
			if(this.order==='price-asc'){
				this.order = 'price-desc'
			}else{
				this.order = 'price-asc'
			}
		},
		//距离点击事件方法
		handleJuli(){
			if(this.order==='juli-asc'){
				this.order = 'juli-desc'
			}else{
				this.order = 'juli-asc'
			}
		},
		//上拉加载数据
		pullUp(){
            this.fetchData(this.searchValue)
            this.page++    
		},
		//下拉刷新数据
		pullDown(){
			this.searchListData = []
			this.offset = 0
            this.page = 1
            this.completed = false
            this.fetchData(this.searchValue)
        },
        //滚动数据
		infiniteScroll() {
            this.fetchData(this.searchValue)
            this.page++
        },
    	//添加到浏览记录表
		addToThroughGoods(item){
			// console.log(this.username)
			// console.log(this.DataTime) 
			// console.log(item.goodsID) 
			// console.log(item.storesID)
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
	//第一次数据来自找药页面搜索的内容
	created(){
		this.fetchData(this.searchValue)
		//回车键绑定Search方法
	    let that = this;
	    document.onkeypress = function(e) {
      	var keycode = document.all ? event.keyCode : e.which;
	      	if (keycode == 13) {
	       	 	that.Search();// 搜索方法
	        	 return false;
	      	}
	    }
	    //获取当前时间
	    let date = new DateTime()
	    this.DataTime = date.getDateTime()
	},
	computed:{
		FiltersearchListData(){
			//复制原始数据
			let searchListData = this.searchListData
			//排序
			if(this.order===''){
				searchListData = searchListData.sort((a,b) => b.haoping - a.haoping)
			}
			if(this.order!==''){
				if(this.order==='price-desc') {
					searchListData = searchListData.sort((a,b) => b.goodsprice - a.goodsprice)
				}
				else if(this.order==='price-asc'){
					searchListData = searchListData.sort((a,b) => a.goodsprice - b.goodsprice)
				}
				else if(this.order==='juli-desc'){
					searchListData = searchListData.sort((a,b) => b.juli - a.juli)
				}
				else if(this.order==='juli-asc'){
					searchListData = searchListData.sort((a,b) => a.juli - b.juli)
				}
			}
			
			return searchListData
		}
	},
	components: {
    	VueDataLoading
	},
}
</script>
<style scoped>
.contain{
	min-height: 680px;
	width: 100%;
}
.header{
	width: 100%;
	height: 50px;
	border-bottom:1px solid #E3E3E3;
}
.header .iconfont{
	display: inline-block;
	vertical-align: center;
	margin-top: 3%;
	margin-left: 1%;    
	font-family: "iconfont" !important;
	font-size: 27px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.header .input1{
	border: 1px solid #E3E3E3;
    width: 80%;
    height: 35px;
    line-height: 30px;
    font-size: 14px;
    background-color: #fff;
    /*text-align: center;*/
    border-radius: 10px;
    font-family: iconfont;
    z-index: 111;
    position: absolute;
    left: 9%;
    margin-top:2%;
}
.header .btn1{
	width: 9%;
	height: 34px;
	/*background-color: red;*/
	border: 1px solid #E3E3E3;
    border-radius: 50%;
    margin-top:2.3%;
	float: right;
}
.header .btn1 i{
	font-size: 25px;
	line-height: 32px;
	margin-left: 14%;
}
.goodsInfo{
	margin-top:5px;
	width: 100%;
	/*background-color:red;*/
}
.goodsInfo .spanOrder{
	width: 100%;
	height: 35px;
	line-height: 35px;
	border-bottom: 1px solid #E3E3E3;
}
.goodsInfo .spanOrder .span1{
	text-align: center;
	display: block;
	width: 80px;
	height: 35px;
	font-size: 15px;
	float: left;
	/*background-color:red;*/
	position: relative;
}

.goodsInfo .spanOrder .span1:last-child{
	height: 35px;
	float: right;
	position: relative;
}
.goodsInfo .spanOrder .span1:last-child img{
	position: absolute;
	top:0px;
	right:20%;
	width: 40px;
	height: 35px;
}
.goodsInfo .spanOrder .span1 i:first-child{
	position: absolute;
	right:2px;
	top:6px;
	font-size: 16px;
}
.goodsInfo .spanOrder .span1 i:last-child{
	position: absolute;
	font-size: 16px;
	right:2px;
	bottom:6px;
}
.goodsInfo .spanOrder .span1.on,.goodsInfo .spanOrder .span1 i.on{
	color:#66CD00;
}
.Nogoods{
	width: 100%;
	height: 100px;
	text-align: center;
	line-height: 100px;
}
.Nogoods span{
	font-size: 16px;
}
.goods{
	/*margin-top: 10px;*/
	width: 100%;
	height: 110px;
	/*background-color:red;*/
	position: relative;
	background-color:#fff;
    border-bottom: 1px solid #E3E3E3;
}
.goods img{
	position: absolute;
	left: 20px;
	top: 15px;
	width: 80px;
	height: 80px;
}
.goods .nr_right{
	width: 68%;
	height: 110px;
	position: absolute;
	right:2%;
	/*background-color:green;*/
}
.goods .nr_right span{
	margin: 5px 0 3px 20px;
	display: block;
	font-size: 13px;
}
.goods .nr_right span:first-child{
	margin-top:13px;
	font-size: 14px;
}
.goods .nr_right span:nth-child(2){
	color:#668B8B;
}
.goods .nr_right span:last-child{
	font-size: 15px;
	color: #FF7F00;
}
.goods .nr_right span:nth-child(3) i{
	margin-left:12px;
	font-size: 13px;
}
.goods .nr_right span:last-child i{
	font-size: 17px;
	font-weight: bold;
	color: #FF7F00;
	float: right;
	margin-right: 11%;
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