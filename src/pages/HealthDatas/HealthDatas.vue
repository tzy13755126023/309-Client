<template>
	<div class="containHealth">
		<div class="headerHealth">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>健康资讯</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll','pull-down']" @pull-up="pullUp" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
			<router-link  :to="{name:'XXHealthDatas',params:{healthdatasID:item.healthdatasID}}" tag="div" 
	  		  	class="healthInfo" v-for="(item,index) in healthData" :key="index" >
				<li class="listyle">{{index+1}}、{{item.title}}</li>
				<img v-lazy="item.imagesurl" >
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
				<span>----数据全部加载完成----</span>
			</div>
		</vue-data-loading>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
//上、下拉加载数据
import VueDataLoading from 'vue-data-loading'
export default{
	name:'HealthDatas',
	data(){
		return{
			healthData:[],
			loading: false,
            completed: false,
            page: 1,			
            offset:0,     //数据偏移量  
		}
	},
	methods:{
		goback(){
			this.$router.push('/')
		},
		fetchData(){
			this.loading = true
			setTimeout(() => {
  				this.$axios.get("/api/selectHealthsData/"+this.offset+"/6")
					.then( res =>{
						//对6取余,因为偏移量pagesize和offset都是6
						//余数不是0的时候已加载全部数据
						if (res.data.length%6!==0) {
								this.completed = true
						}
						this.healthData =this.healthData.concat(res.data)
						// console.log(this.healthData)
						//请求完毕
						this.loading = false
						this.offset+=6
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
			this.healthData = []
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
		//第一次进来获取六条数据
		this.fetchData()
	},
	components: {
    	VueDataLoading
	},
}
</script>
<style scoped>
.containHealth{
	width: 100%;
}
.containHealth .headerHealth{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerHealth .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerHealth span{
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
.headerHealth img{
	position:absolute;
	right:1%;
	width: 40px;
	height: 40px;
}
.containHealth .healthInfo{
	widows: 100%;
	height: 200px;
	background-color: #FFF;
	color: #000;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.healthInfo img{
	position: absolute;
	left:0;
	right:0;
	bottom:7%;
	width: 80%;
	height: 75%;
	margin:auto;
}
.healthInfo .listyle{
	padding-top: 2%;
	padding-left: 10%;
	font-size: 14px;
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