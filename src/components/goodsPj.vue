<template>
	<div class="contain">		
		<div class="header2">
			<span>顾客评论({{length}})</span>
			<router-link :to="{name:'AllPJ',params:{goodsID:this.goodsID}}"tag="span">
				查看全部评价<i class="el-icon-arrow-right"></i>
			</router-link>
		</div>
		<div class="NoPingjia" v-show="length==0">
	--&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;暂无相关评论&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;--
		</div>
		<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll']" 
		@pull-up="pullUp" @infinite-scroll="infiniteScroll" v-show="length!=0">
		<div class="goodsPJ" :key="item.index" v-for="item in goodsPjData" v-show="length!=0">
			<span>{{ item.PJcontent}}</span>
			<span>{{ item.username | xingxing}}</span>
			<span>{{ item.PJtime}}</span>
		</div>
		<!-- 滚动加载样式 -->
		<div slot="infinite-scroll-loading" class="infinite-scroll-loading">
			<i class="el-icon-loading"></i>
			<span>数据加载中...</span>
		</div>
		<!-- 上拉刷新样式 --> 
		<div slot="pull-up-loading" class="pull-up-loading">
			<i class="el-icon-loading"></i>
			<span>刷新中...</span>
		</div>
		<!-- 数据加载完成时的样式 -->
		<div slot="completed" class="completed">
			<span>已加载全部评论</span>
		</div>
		</vue-data-loading>
		<!-- 腾出底部 -->
		<div class="kuochongdibu"></div>
	</div>

</template>
<script>
import VueDataLoading from 'vue-data-loading'
export default{
	name:'goodsPj',
	data(){
		return{
			loading: false,
            completed: false,
            page: 1,			
            offset:0,        //数据偏移量
			goodsPjData:[],
			goodsPjDataLength:{},
			length:''        //评论总长度
		}
	},
	methods:{
		fetchData(){
			this.loading = true
			setTimeout(() => {
			  	this.$axios.get("/api/goodsPJ/"+this.goodsID+"/"+this.offset+"/6 ")
				.then( res =>{
					//对6取余,因为偏移量pagesize和offset都是6
					//余数不是0的时候已加载全部数据
					if (res.data.length%6!==0||res.data.length==0) {
							this.completed = true
			                // this.loading = false
					}
					this.goodsPjData = this.goodsPjData.concat(res.data)
					// console.log(res.data)
					this.offset+=6
					this.loading = false
					
				})
				.catch( error =>{
					console.log( error)
				})
			}, 800)
			
		},
		//由于屏幕滚动问题，下拉刷新不太方便,改为上拉刷新数据
		pullUp(){
				this.goodsPjData = []
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
	//接收父组件goodsPj的携带值
	props:{
		goodsID:String
	},
	created(){
		this.fetchData()
	},
	//注册组件
	components:{
		VueDataLoading
	},
	//获取全部评论并把总长度赋值给length
	mounted(){
		this.$axios.get("/api/goodsPJ/"+this.goodsID+" ")
		.then( res =>{
			// console.log(res.data)
			this.goodsPjDataLength = res.data
			//总商品评价长度
			this.length = res.data.length
			//如果大于99条 头部则缩写为99+
			if (res.data.length>99) {
				this.length = '99+'
			}
		})
		.catch( error =>{
			console.log( error)
		})
	},
	//定义本地用户名过滤器：
	filters: {
	 	xingxing: function (value) {

	   		return "***"+value+"***"
	  }
	}
}
</script>
<style scoped>
.contain{
	width: 100%;
}
.header2{
	margin: 5px 0;
	width: 100%;
	height: 40px;
	line-height: 40px;
	/*background-color: red;*/
	border-bottom: 1px solid #E3E3E3; 
}
.header2 span:first-child{
	font-size: 13px;
	padding-left: 3%;
	color:#668B8B;
}
.header2 span:last-child{
	float: right;
	padding-right: 2%;
	font-size: 14px;
}
.header2 span:last-child i{
	font-size: 16px;
	font-weight: bold;
}
.goodsPJ{
	width: 100%;
	height: 60px;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
	/*background-color: red;*/
}
.goodsPJ:last-child{
	margin-bottom: 10px;
}
.goodsPJ span{
	padding-left: 3%;
	font-size: 13px;
	height: 30px;
	line-height: 30px;
	display: block;
	color:#000;
}
.goodsPJ span:first-child{
	padding-top:1px;
}
.goodsPJ span:nth-child(2){
	position: absolute;
	/*color:#FF7F00;	*/
	top:0;
	right:3%;
}
.goodsPJ span:last-child{
	color:#668B8B;	
	font-size: 12.5px;
}
.infinite-scroll-loading,.pull-up-loading,.completed{
	font-size: 15px;
	text-align: center;
	width: 100%;
	height: 20px;
	line-height: 60px;
	position: absolute;
	bottom:0px;
}
.pull-up-loading{
	color:#FF7F00;
	bottom:0px;
	right: 0;
}
.infinite-scroll-loading{
	color:#FF7F00;
}
.loading-footer{
	height: 30px;
}
.NoPingjia{
	width:100%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	font-size: 15px;
	letter-spacing: 0.5px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>