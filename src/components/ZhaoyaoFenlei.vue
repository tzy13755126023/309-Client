<template>
<!-- 商家商品分类组件 -->
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>{{this.FenleiTitle}}列表</span>
			<img src="../../static/smile.jpg" alt="">
		</div>
		<!-- 左边六类标签 -->
		<div class="left_liulei">
			<ul>
				<li :key="item.index" v-for="item in liLiulei" :class="item.index==number?'current':''" 
				@click="TzyFenlei(item)">
					<span>{{ item.spanTitle}}</span>
				</li>
			</ul>
		</div>
		
		<!-- 展示对应标签的商品 -->
		<div class="right_goodfenlei">
			<vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','infinite-scroll','pull-down']" @pull-up="pullUp" @infinite-scroll="infiniteScroll" @pull-down="pullDown">
			    <!-- 该路由跳转到该商品详情页 -->
				<router-link  @click.native="addToThroughGoods(item)" tag="div" class="img_goodsName"
					:to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}"
				    :key="item.goodsID" v-for="item in zhaoyaoFenleiData">
					<img v-lazy="item.goodsimageurl" alt="" >	
					<span> {{ item.goodsName }} </span> 
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
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
//上、下拉加载数据
import VueDataLoading from 'vue-data-loading'
import {DateTime} from '../util/DataTime'
export default{
	data(){
		return{
			DataTime:'',   //存储当前时间变量
			username:window.localStorage.getItem("username"),
			FenleiTitle:'',
			loading: false,
			loading1:true,
            completed: false,
            page: 1,			
            offset:0,       //数据偏移量
			number:this.$route.params.index,
			goodstype:this.$route.params.goodstype,
			liLiulei:[
			{
				spanTitle:'中西药品',
				goodstype:'ZXYP',
				index:0
			},
			{
				spanTitle:'养生保健',
				goodstype:'YSBJ',
				index:1
			},
			{
				spanTitle:'医疗器械',
				goodstype:'YLQX',
				index:2
			},
			{
				spanTitle:'计生用品',
				goodstype:'JSYP',
				index:3
			},
			{
				spanTitle:'中药饮品',
				goodstype:'ZYYP',
				index:4
			},
			{
				spanTitle:'美容护肤',
				goodstype:'MRHF',
				index:5
			}
			],
			//接收请求数据的数组：
			zhaoyaoFenleiData:[]
		}
	},
	methods:{
		//返回上一个页面
		goback(){
			this.$router.go(-1)  
		},
		//封装数据请求接口方法
		fetchData(){
			this.loading = true
			const goodstype = this.goodstype
			setTimeout(() => {
				//判断是否全部加载完毕
				if (this.page > 2) {
                        this.completed = true
                        this.loading = false
                        return
                }
			  	this.$axios.get("/api/ZhaoyaoFenlei/"+goodstype+"/"+this.offset+"/10 ")
				.then( res =>{
					this.zhaoyaoFenleiData =this.zhaoyaoFenleiData.concat(res.data)
					// console.log(this.zhaoyaoFenleiData)
					//请求完毕
					this.loading = false
					this.offset+=10
					this.loading1 = false
				})
				.catch( error =>{
					console.log(error)
				})
			}, 700)
			
		},
		//上拉加载数据
		pullUp(){
            this.fetchData()
            this.page++    
		},
		//下拉刷新数据
		pullDown(){
			this.zhaoyaoFenleiData = []
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
		//左侧更换分类时所做的数据更改
		TzyFenlei(item){
			this.number = item.index   				//更换当前高亮
			this.FenleiTitle = item.spanTitle 		//更换header
			this.goodstype = item.goodstype         //改变fetchData中的goostype变量
			// this.zhaoyaoFenleiData = []             //重置接收数据的数组
			// this.offset = 0
			// this.completed = false
			// this.fetchData()                        //重新获取分类数据
			this.pullDown()
		},
		//添加到浏览记录表
		addToThroughGoods(item){
			// console.log(this.username)console.log(this.DataTime)
			// console.log(item.goodsID)console.log(item.storesID)
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
		this.fetchData()                            //页面第一次跳转进来显示的数据
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
		// 获取当前时间
		this.DataTime = date.getDateTime()	
	},
	components: {
    	VueDataLoading
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
	letter-spacing: 1px;
	font-size: 16px;
	font-weight: bold;
	color:#FF7F00;
}	
.header img{
	position:absolute;
	top:5px;
	right:3%;
	width: 35px;
	height: 30px;
}
.left_liulei{
	padding-top: 30px;
	width: 24%;
	/*height: 600px;*/
	/*background-color:red;*/
	float: left;
}
.left_liulei ul li{
	width: 100%;
	height: 40px;
	text-align:center;
	line-height: 30px;
	font-size:15px;
	/*background-color:black;*/
}
.left_liulei ul .current{
	color:#66CD00 !important;
} 
.right_goodfenlei{
	border-left: 1px solid #E3E3E3;
	padding-top: 30px;
	width: 75%;
	float: right;
	position: relative;
	/*background-color:green;*/
}
.right_goodfenlei .img_goodsName{
	/*clear:both;*/
	float: left;
	width: 40%;
	height: 110px;
	position: relative;
	margin: 0  5% 5px;
}
.right_goodfenlei .img_goodsName img{
	position: relative;
	width: 80%;
	height: 80px;
	margin: 5px 10%;
}
.right_goodfenlei .img_goodsName span{
	display: block;
	font-size: 13px;
	height: 20px;
	line-height: 20px;
	text-align:center;
}
.infinite-scroll-loading,.pull-up-loading,.pull-down-loading,.completed{
	font-size: 16px;
	text-align: center;
	width: 100%;
	height: 20px;
	line-height: 20px;
	position: absolute;
	right: 0;
	top:-50px;
}
.pull-up-loading,.pull-down-loading{
	color:#FF7F00;
	top:-20px;
	right: 0;
}
.infinite-scroll-loading{
	color:#FF7F00;
}
.completed{
	top:-45px;
	font-size: 14px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>