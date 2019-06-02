<template>
	<!-- 最近浏览 -->
	<div class="history">
		<div class="headerhistory">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>浏览记录</span>
			<!-- 清空浏览记录 -->
			<i @click="deleteThroughGoods()">清空</i>
		</div>
		<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll','pull-down']" @pull-up="pullUp" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
		<router-link  @click.native="addToThroughGoods(item)"  tag="div" class="historyGoodsData"
					:to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"  
			 		:key="index" v-for="(item,index) in historyGoodsData">
			<img v-lazy="item.goodsimageurl" alt="">
			<span class="goodsName">{{ item.goodsName}}({{item.goodsrules}})</span>
			<span class="storesName"><i>商家：{{item.storesName}}</i></span>
			<span class="goodsprice">价格：<i>{{item.goodsprice | money}}</i></span>
			<span class="throughTime">上次浏览时间为：&nbsp;<i>--------&nbsp;{{item.throughTime}}&nbsp;--------</i></span>
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
				<span>-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;&nbsp;数据全部加载完成&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;</span>
			</div>
		</vue-data-loading>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
//上、下拉加载数据
import VueDataLoading from 'vue-data-loading'
import { MessageBox } from 'mint-ui';
import {DateTime} from '../util/DataTime'
export default{
	name:'HistoryGoods',
	data(){
		return{
			username:window.localStorage.getItem('username'),
			historyGoodsData:[],
			loading: false,
            completed: false,
            page: 1,			
            offset:0,     //数据偏移量  
			DataTime:''
		}
	},
	methods:{
		goback(){
			this.$router.push('/mine')
		},
		fetchData(){
			this.loading = true
			setTimeout(() => {
  				this.$axios.post("/api/selectThroughGoods/"+this.offset+"/5",{
  					username:this.username
  				})
					.then( res =>{
						//对5取余,因为偏移量pagesize和offset都是5
						//余数不是0的时候已加载全部数据
						if (res.data.length%5!==0) {
								this.completed = true
						}
						this.historyGoodsData =this.historyGoodsData.concat(res.data)
						// console.log(this.historyGoodsData)
						//请求完毕
						this.loading = false
						this.offset+=5
					})
					.catch( error =>{
						console.log(error)
					})
			}, 800)
		},
		//只要进入过商品详情页就添加到浏览记录中
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
		//清空浏览记录
		deleteThroughGoods(){
			MessageBox.confirm('确定清空所有浏览记录吗?','').then(action => {
				   this.$axios.delete('/api/deleteThroughGoods',{
				   		username:this.username
				   })
				   .then( res =>{
				   		// console.log(res.data)
				   		if (res.data.affectedRows) {
				   			 MessageBox('提示','已成功清空所有浏览记录！');
				   			 //0.8秒之后刷新该页面
				   			 setTimeout(() => {
				   			 	this.$router.go(0)
				   			 }, 800)
			        	}else{
			            	 MessageBox('提示','清空浏览记录失败！！');
			            }
				   })
				   .catch( error =>{
				   		console.log(error)
				   })
				}).catch( error =>{

			 	   MessageBox.alert( '您已取消清空浏览记录！','');
				   console.log(error)
				})	
		},
		//上拉加载数据
		pullUp(){
            this.fetchData()
            this.page++    
		},
		//下拉刷新数据
		pullDown(){
			this.historyGoodsData = []
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
	},
	created(){
		//进来就获取数据
		this.fetchData()
		let date = new DateTime()
		// 获取当前时间
		this.DataTime = date.getDateTime()	

	},
	components: {
    	VueDataLoading
	},
}
</script>
<style scoped>
.history{
	width: 100%;
}
.headerhistory{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerhistory .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerhistory span{
	position: absolute;
	height:40px;
	width: 40%;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	letter-spacing: 3px;
	font-weight: bold;
	color:#FF7F00;
}	
.headerhistory i:last-child{
	position:absolute;
	top:0px;
	color:#FF7F00;
	font-size: 18px;
	letter-spacing: 3px;
	font-weight: bold;
	right:0;
	text-align: center;
	/*background-color: red;*/
	width: 50px;
	height: 60px;
}
.historyGoodsData{
	width: 100%;
	height: 120px;
	/*background-color: red;*/
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.historyGoodsData:first-child{
	margin-top: 10px;
}
.historyGoodsData img{
	width: 70px;
	height: 75px;
	padding-top: 15px;
	padding-left:25px;
}
.historyGoodsData .goodsName,.storesName,.goodsprice,.throughTime{
	position: absolute;
	top:10px;
	left:137px;
	font-size: 15px;
}
.historyGoodsData .storesName{
	top:40px;
	font-size:14px;
}
.historyGoodsData .storesName i{
	color:#668B8B;
}
.historyGoodsData .goodsprice{
	top:70px;
	font-size: 14px;
}
.historyGoodsData .goodsprice i{
	color: #FF7F00;
}
.historyGoodsData .throughTime{
	font-size: 14px;
	left:20px;
	top:80%;
}
.historyGoodsData .throughTime i{
	color: red;
	font-size: 15px;
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

</style>