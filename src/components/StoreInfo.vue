<template>
<!-- 具体商家信息 -->
	<div class="contain">
		<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<i class="iconfont" @click="">&#xe69d</i>
			<input class="input1" type="text" :placeholder="icon"/>
		</div>
		<div v-show="index===0" :key="index" class="storeInfo" v-for="(item,index) in storeInfo">
			<div class="shang">
				<img v-lazy="item.imagesurl">
				<span class="zhong">{{item.storesName}}</span>
				<span class="right">
					<!--   收藏商家  -->
					<span class="centerBox">
						<i class="el-icon-star-on"></i>	
						<span v-if="isShoucang" @click="QXStarStores(item)">已收藏</span>
						<span v-else @click="StarStores(item)">收藏</span>
					</span>
				</span>
			</div>
			<ul class="xia">
				<li>
					<span>{{item.haoping}}分</span>
					<span>客户服务</span>
				</li>
				<li>
					<span>{{item.haoping}}分</span>
					<span>发货速度</span>
				</li>
				<li>
					<span>{{item.haoping}}分</span>
					<span>物流速度</span>
				</li>
				<li>
					<span>{{item.haoping}}分</span>
					<span>商品包装</span>
				</li>
			</ul>
		</div>
		<!-- 点击查询对应的分类商品 -->
		<div class="liulei">
 			<router-link :to="{name:'StoreFenleiGoods',params:{storesID:$route.params.storesID,goodstype:item.goodsType}}"  v-for="item in liulei" tag="li"  :key="item.goodsType">
	 			<span>{{item.spanTitle}}</span>
	 		</router-link>
		</div>
		<div class="StoreRecommand">
			<span>商家推荐</span>
		</div>
		<router-link @click.native="addToThroughGoods(item)" tag="div" class="StoreRecommandGoods"
			:to ="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}" v-for="item in StoreRecommandGoods" :key ="item.goodsID">
			<img v-lazy="item.goodsimageurl" alt="">	
			<div class="goodsNameAndprice">
				<span>{{item.goodsName}}</span>	
				<span>{{item.goodsprice | money}}</span>
			</div>			
		</router-link>
		<!-- 查看全部商品 -->
		<router-link :to="{name:'AllStoreGoods',params:{storesID:$route.params.storesID}}"
		tag="div" class="SeeallstoreGoods">
			<span>查看全部商品</span>
			<i class="iconfont">&#xe641</i>
			<i class="iconfont">&#xe641</i>
			<i class="iconfont">&#xe641</i>
			<i class="iconfont">&#xe641</i>
		</router-link>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui'
import {DateTime} from '../util/DataTime'
export default{
	name:'StoreInfo',
	data(){
		return{
			icon:'  \ue69d  搜索店内商品',
			storeInfo:{},
			username:this.$store.state.username,
			StoreRecommandGoods:{},
			storesID:'',
			storesName:'',
			isShoucang:'',   //判断该用户是否收藏过该商店
			liulei:[
			{
				spanTitle:'中西药品',
				goodsType:'ZXYP',
			},
			{
				spanTitle:'养生保健',
				goodsType:'YSBJ',
			},
			{
				spanTitle:'医疗器械',
				goodsType:'YLQX',
			},
			{
				spanTitle:'计生用品',
				goodsType:'JSYP',
			},
			{
				spanTitle:'中药饮品',
				goodsType:'ZYYP',
			},
			{
				spanTitle:'美容护肤',
				goodsType:'MRHF',
			}
			],
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
		//收藏 商家
		StarStores(item){
			this.$axios.post('/api/starStores',{
				username:this.username,
				storesID:item.storesID,
				storesName:this.storesName
			})
			.then( res =>{
				// console.log(res.data)
				Toast({
				  message: res.data.message,  //收藏成功
				  iconClass: 'el-icon-check'
				})
				//显示  '已收藏'
				this.isShoucang = true;
			})
			.catch( error =>{
				console.log(error)
			})
		},
		//取消收藏 商家
		QXStarStores(item){
			this.$axios.post('/api/qxStarStores',{
				username:this.username,
				storesID:this.storesID
			})
			.then( res =>{
				Toast({
				  message: res.data.message,  //取消收藏成功！
				  iconClass: 'el-icon-check'
				})
				//显示为  '收藏'
				this.isShoucang =false
			}) 
			.catch( error => {
				console.log(error)
			})
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
		let date = new DateTime()
		// console.log(data)
		// 获取当前时间
		this.DataTime = date.getDateTime()
	},
	mounted(){
		//从localStorage里面获取username
		this.username = window.localStorage.getItem("username")
		this.storesID = this.$route.params.storesID
		const storesID = this.$route.params.storesID
		// console.log(storesID)
		
		//主要获取商家信息   写在storeInfo里
		this.$axios.get("/api/storeInfo/"+storesID+"")
		.then( res =>{
			// console.log(res.data)
			this.storeInfo = res.data
			if (res.data) {
				this.storesName = res.data[0].storesName    //获取商家名
			}
		})
		.catch( error =>{
			console.log(error)
		})

		//获取商家推荐商品信息  写在StoreRecommandGoods里
		this.$axios.get("/api/StoreRecommandGoods/"+storesID+"")
		.then( res =>{
			// console.log(res.data)
			this.StoreRecommandGoods = res.data
		})
		.catch( error =>{
			console.log(error)
		})

		//进商家页面就判断是否收藏了该商家
		this.$axios.post('/api/selectByuserAnStoresID',{
			username:this.username,
			storesID:this.storesID
		})
		.then( res => {
			// console.log(res.data)
			if(res.data.length!=0){
				this.isShoucang = true     //返回值不为零,已收藏过
			}else{
				this.isShoucang = false    //返回为空,没有收藏
			}
		})
		.catch( error => {
			console.log(error)
		})
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
    /*border-bottom: 1px solid #E3E3E3;*/
}
.header .input1{
    width: 72%;
    height: 25px;
    line-height: 40px;
    font-size: 16px;
    background-color: white;
    border: 1px solid #E3E3E3;
    border-radius: 5px;
    font-family: iconfont;
    background: #E3E3E3;
    z-index: 111;
    margin-left: 3%;
    /*background-color: red;*/
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
	margin-right: 4%;
	float: right;
}
.storeInfo{
	margin-top: 10px;
	width: 100%;
	height: 150px;
	background-color:#fff;
	border-bottom:1px solid #E3E3E3;
}
.storeInfo .shang{
	width: 100%;
	height: 90px;
	position: relative;
	background-color:#33ff99;
}
.storeInfo .shang img{
	margin:20px 16px;
	width: 70px;
	height: 50px;
	border-radius: 50%;
}
.storeInfo .shang .zhong{
	display: block;
	width: 50%;
	height: 90px;
	font-size: 17px;
	line-height: 90px;
	text-align: center;
	/*background-color:red;*/
	position: absolute;
	top:0;
	left:95px;
}
.storeInfo .shang .right{
	width: 25%;
	height: 90px;
	font-size: 16px;
	display: flex;
	justify-content: center;
	align-items:center;
	/*background-color:red;*/
	position: absolute;
	top:0;
	right:0;
}
.storeInfo .shang .right .centerBox{
	width: 80%;
	height: 30px;
	line-height: 30px;
	border-radius:5px;
	text-align: center;
	color: #fff;
	background-color:#FF7F00;
}
.storeInfo .shang .right .centerBox i{
	font-size: 20px;
	color: #fff;
}
.storeInfo .xia{
	width: 100%;
	height: 60px;
	display:flex;
}
.storeInfo .xia li{
	height: 60px;
	flex:1;
	text-align:center;
	border-right: 1px solid #E3E3E3; 
	/*background-color:red;*/
}
.storeInfo .xia li span{
	display:block;
	margin-top: 5px;
	font-size: 15px;
}
.storeInfo .xia li span:last-child{
	font-size: 13px;
	margin:8px;
	color:#668B8B;
}
.contain .liulei{
	border-top: 1px solid #E3E3E3;
	margin-top: 10px;
	width: 100%;
	height: 80px;
	background-color:#fff;
}
.contain .liulei li{
	text-align: center;
	float:left;
	display: block;
	width: 33%;
	font-size: 15px;
	height: 40px;
	line-height: 40px;
	border-right: 1px solid #E3E3E3;
}
.contain .liulei li:nth-child(4),.contain .liulei li:nth-child(5),.contain .liulei li:nth-child(6){
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
}
.contain .liulei li:nth-child(3),.contain .liulei li:nth-child(6){
	border-right:none;
}
.contain .StoreRecommand{
	margin-top: 5px;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	font-weight: bold;
	padding-left: 5%;
	color: #FF7F00;
	background-color:#fff;
	/*border-top: 1px solid #E3E3E3;*/
	border-bottom: 1px solid #E3E3E3;
}
.contain .StoreRecommandGoods{
	margin-bottom: 7px;
	width: 49.5%;
	height: 210px;
	background-color:#fff;
	/*background-color:pink;*/
	float: left;
}
.contain .StoreRecommandGoods:nth-child(even){
	margin-right:1%;
}
.StoreRecommandGoods img{
	margin:10% 25% 5%; 
	width: 50%;
	height: 110px;
}
.StoreRecommandGoods .goodsNameAndprice{
	text-align: center;
	width: 100%;
	height: 80px;
	/*background-color:red;*/
}
.StoreRecommandGoods .goodsNameAndprice span{
	font-size: 14px;
	text-align: center;
	display: block;
	width: 100%;
	height: 30px;
	line-height: 25px;
	/*background-color:red;*/
}
.StoreRecommandGoods .goodsNameAndprice span:last-child{
	height: 40px;
	color: #FF7F00;
}
.SeeallstoreGoods{
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
	clear: both;
	width: 95%;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	font-weight: bold;
	padding-left: 5%;
	color: #FF7F00;
	background-color:#fff;
}
.SeeallstoreGoods i{
	position: absolute;
	right:3%;
}
.SeeallstoreGoods i:nth-child(2){
	right:6%;
}
.SeeallstoreGoods i:nth-child(3){
	right:9%;
}
.SeeallstoreGoods i:nth-child(4){
	right:12%;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>