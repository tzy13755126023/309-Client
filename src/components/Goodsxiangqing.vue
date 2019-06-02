<template>
	<div class="contain">
		<div class="header1">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>{{this.goodsID}}</span>
			<i class="el-icon-star-on" v-if="isShoucangGoods" @click="QXStarGoods()"></i>
			<i class="el-icon-star-off" v-else @click="StarGoods()"></i>
		</div>
		<div class="goodsShang" v-for="item in GoodsxiangqingData" >
			<img v-lazy="item.goodsimageurl" alt="">
			<div class="nameAndprice">
				<span>商品名称：{{item.goodsName}}</span>
				<span>商品价格：<i>{{item.goodsprice |money }}</i></span>
			</div>
			<div class="WenhaoRules">
				<span><i>批准文号：</i>{{item.goodsWenhao}}</span>
				<span><i>包装规格：</i>{{item.goodsrules}}</span>
				<span><i>保存方法：</i>{{item.goodszhucang}}</span>
			</div>
			<div class="kuncunAndbuy">
				<div class="kuncunAndbuy1">库存：{{item.kucun}}</div>
				<div>
					<div class="yangshi">
						<i class="el-icon-remove-outline" @click.prevent.stop="SubCount()"></i>
						<i><input type="text" v-model="MorenCount"></i>
						<i class="el-icon-circle-plus-outline" @click.prevent.stop="AddCount(item)"></i>
					</div>
				</div>
				<div>
					<!-- 购物车 整块float在右边 -->
					<div class="gouwuche" @click="addTocart2($event,item)">
					<i class="iconfont">&#xe60c</i>
					<span>加入购物车</span>
					</div>
				</div>
			</div>
			<div class="Address">
				<span>送至</span>
				<span>{{item.storeAddress}}</span>
				<span>{{item.fahuoTime}}</span>
			</div>
			<div class="StoreInfo">
				<img :src="item.imagesurl" alt="">
				<span class="wenzi">{{item.storesName}}</span>
				<span class="right">
					<span class="centerBox">
						<i class="el-icon-star-on"></i>	
						<span v-if="isShoucangStore" @click="QXStarStores(item)">已收藏</span>
						<span v-else @click="StarStores(item)">收藏</span>
					</span>
				</span>
				<ul class="xia">
					<li>
						<span>客户服务</span>
						<span>{{item.haoping}}分</span>
					</li>
					<li>
						<span>发货速度</span>
						<span>{{item.haoping}}分</span>
					</li>
					<li>
						<span>物流速度</span>
						<span>{{item.haoping}}分</span>
					</li>
					<li>
						<span>商品包装</span>
						<span>{{item.haoping}}分</span>
					</li>
				</ul>
				<router-link tag="div" class="Jrdp" :to="{name:'StoreInfo',params:{storesID:item.storesID}}">
					进入店铺
				</router-link>		
			</div>
				<!--  将商品ID传给评价页面 -->
				<GoodsPJ :goodsID="goodsID" />  
		</div>
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
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';
import GoodsPJ from '@/components/goodsPj'
export default{
	name:'Goodsxiangqing',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			GoodsxiangqingData:{},   			//接收商品详情数据
			storesID:'',    					//获取商家ID
			isShoucangStore:'',			    	//商家是否被收藏 依据
			isShoucangGoods:'',			    //商品是否被收藏 依据
			storesName:'',
			MorenCount:1,
			goodsID:this.$route.params.goodsID, //获取商品ID(写在Header中的goodsID)
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
		//商品减一
		SubCount(){
			if (this.MorenCount>1) {		
				this.MorenCount --
			}else{
				MessageBox('', '不能再减了，商品数量至少为一件!');
   		 		return 1
			}
			
		},
		//商品加一
		AddCount(item){
			if(this.MorenCount<item.kucun){
				this.MorenCount ++
			}else{
				MessageBox.alert('最大商品数量不能超过库存量！')
			}
		},
		//将商品添加到购物车
		addTocart2(e,item){
			//setTimeout让小球掉落完毕，购物车数量显示加
			setTimeout(() => {
			  	this.$store.commit("addToCart2",{"item":item,"MorenCount":this.MorenCount})
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
			const x = rect.left-window.innerWidth*0.64
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
		//取消收藏商家
		QXStarStores(item){
			// console.log(item.storesID)
			// console.log(this.storesName)
			// console.log(this.username)
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
				this.isShoucangStore =false
			}) 
			.catch( error => {
				console.log(error)
			})
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
				  message: res.data.message,  //收藏商家成功
				  iconClass: 'el-icon-check'
				})
				//显示  '已收藏'
				this.isShoucangStore = true;
			})
			.catch( error =>{
				console.log(error)
			})
		},
		//取消收藏商品
		QXStarGoods(){
			this.$axios.post('/api/QXStarGoods',{
				username:this.username,
				goodsID:this.goodsID
			})
			.then( res =>{
				Toast({
				  message: res.data.message,  //取消收藏成功！
				  iconClass: 'el-icon-check'
				})
				//显示为  '收藏'
				this.isShoucangGoods =false
			}) 
			.catch( error => {
				console.log(error)
			})
		},
		//收藏 商品
		StarGoods(){
			// console.log(this.goodsID)
			// console.log(this.username)
			this.$axios.post('/api/starGoods',{
				username:this.username,
				goodsID:this.goodsID
			})
			.then( res =>{
				Toast({
				  message: res.data.message,  //收藏商品成功
				  iconClass: 'el-icon-check'
				})
				this.isShoucangGoods = true;
			})
			.catch( error =>{
				console.log(error)
			})

		}
	},
	created(){
		//获取该商品详情信息
		this.$axios.get("/api/Goodsxiangqing/"+this.goodsID+" ")
		.then( res =>{
			// console.log(res.data)	
			this.GoodsxiangqingData = res.data
			this.storesID = res.data[0].storesID
			this.storesName = res.data[0].storesName
			// console.log(this.storesID)
			// console.log(this.username)
				if (this.storesID&&this.username) {  
					//如果storesID和usernme都存在
					//则判断该用户是否收藏了该商家
					this.$axios.post('/api/selectByuserAnStoresID',{
						username:this.username,
						storesID:this.storesID
					})
					.then( res => {
						// console.log(res.data)
						if(res.data.length!=0){
							this.isShoucangStore = true     //返回值不为零,已收藏过了该商家
						}else{
							this.isShoucangStore = false    //返回为空,没有收藏
						}
					})
					.catch( error => {
						console.log(error)
					})
					//判断该用户是否收藏了该商品
					this.$axios.post('/api/PDstarsGoods',{
						username:this.username,
						goodsID:this.goodsID
					})
					.then( res => {
						// console.log(res.data)
						if(res.data.length!=0){
							this.isShoucangGoods = true     //返回值不为零,已收藏了该商品
						}else{
							this.isShoucangGoods = false    //返回为空,没有收藏
						}
					})
					.catch( error => {
						console.log(error)
					})
				}/*else{
					// Toast({
					//   message: '查询错误！',  //查询错误！
					//   iconClass: 'el-icon-close'
					// })
					console.log('没有收藏')
				}*/
		})
		.catch( error =>{
			console.log(error)
		})


	},
	mounted(){
		
	},
	components:{
		GoodsPJ
	}
}
</script>
<style scopeds>
.contain{
	width:100%;
}
.header1{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.header1 .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.header1 span{
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
.header1 i:last-child{
	vertical-align: center;
	position:absolute;
	font-weight: bold;
	font-size: 25px;
	top:5px;
	right:5%;
}
.header1 .el-icon-star-on{
	color: #FF7F00;
}
.goodsShang{
	padding-top:10px;
	width: 100%;
	background-color:#fff;	
}
.goodsShang img{
	margin-left:30%;
	width: 40%;
	height: 170px
}
.goodsShang .nameAndprice{
	border-top: 1px solid #E3E3E3;
	margin-top: 5px;
	width: 100%;
	height: 50px;
	/*background-color:green;*/
}
.goodsShang .nameAndprice span{
	display: block;
	font-size: 14px;
	padding-top:1%;
	margin-left:8%;
}
.goodsShang .nameAndprice span:last-child{
	padding-top:0.5%;
}
.goodsShang .nameAndprice span i{
	color:#FF7F00;
	font-size: 17px;
}
.goodsShang .WenhaoRules{
	margin-top: 5px;
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
	width: 100%;
	height: 80px;
	/*background-color: black;*/
}
.goodsShang .WenhaoRules span{
	display: block;
	padding-left: 8%;
	height: 20px;
	width: 92%;
	line-height: 20px;
	font-size: 14px;
	margin-bottom: 5px;
}
.goodsShang .WenhaoRules span:first-child{
	margin-top: 5px;
}
.goodsShang .WenhaoRules span i{
	color:#668B8B;
}
.goodsShang .kuncunAndbuy{
	width: 100%;
	height: 46px;
	line-height: 45px;
	display: flex;
	border-bottom: 1px solid #E3E3E3;
	/*background-color:red;*/

}
.goodsShang .kuncunAndbuy div{
	flex: 1;
	/*background-color:green;*/
	
}
.goodsShang .kuncunAndbuy .kuncunAndbuy1{
	text-align: center;
	flex: 1;
	font-size: 13.5px;
}
.goodsShang .kuncunAndbuy div:nth-child(2) .yangshi{
	margin: 12.5px 3%;
	width: 80%;
	height: 20px;
	line-height: 20px;
	display: flex;
	/*background-color:red;*/
	border: 1px solid #E3E3E3;
}
.goodsShang .kuncunAndbuy div:nth-child(2) .yangshi i{
	flex: 1;
	font-size: 18px;
	margin-top:2px; 
	border-right:1px solid #E3E4E3;
}
.goodsShang .kuncunAndbuy div:nth-child(2) .yangshi i:nth-child(1){
	text-align: center;
}
.goodsShang .kuncunAndbuy div:nth-child(2) .yangshi i:nth-child(2) input{
	font-size: 14px;
	text-align: center;
	width: 100%;
}
.goodsShang .kuncunAndbuy div:nth-child(2) .yangshi i:nth-child(3){
	border-right:none; 
	text-align: center;
}
.goodsShang .kuncunAndbuy div:nth-child(3) .gouwuche{
	background-color:#FF7F00;
	float:right;
	color: #fff;
	text-align: center;
	font-size: 14px;
	line-height: 46px;
	width: 80%;
	height: 46px;
}
.goodsShang .Address{
	font-size: 13px;
	margin-top: 5px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #E3E3E3;
	/*background-color: red;*/
}
.goodsShang .Address span{
	margin-left: 10px;
}
.goodsShang .Address span:first-child{
	margin-left: 0;
	padding-left: 10%;
	color:#668B8B;
}
.goodsShang .Address span:last-child{
	font-size: 14px;
	float: right;
	margin-right: 10px;
	color:red;
}
.goodsShang .StoreInfo{
	margin-top: 5px;
	width: 100%;
	height: 175px;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
	/*background-color: red;*/
}
.goodsShang .StoreInfo img{
	margin:8px 16px;
	width: 70px;
	height: 50px;
	border-radius: 50%;
}
.goodsShang .StoreInfo .wenzi{
	display: block;
	width: 50%;
	height: 70px;
	font-size: 17px;
	line-height: 70px;
	text-align: center;
	position: absolute;
	top:0;
	left:95px;
}
.goodsShang .StoreInfo .right{
	width: 25%;
	height: 70px;
	font-size: 16px;
	/*background-color:red;*/
	display: flex;
	justify-content: center;
	align-items:center;
	position: absolute;
	top:0;
	right:0;
}
.goodsShang .StoreInfo .centerBox{
	width: 80%;
	height: 30px;
	line-height: 30px;
	border-radius:5px;
	text-align: center;
	color: #fff;
	background-color:#FF7F00;
}
.goodsShang .StoreInfo .centerBox i{
	font-size: 21px;
	color: #fff;
}
.goodsShang .StoreInfo .xia{
	width: 100%;
	height: 60px;
	display:flex;
}

.goodsShang .StoreInfo .xia li{
	height: 60px;
	flex:1;
	text-align:center;
	/*border-right: 1px solid #E3E3E3; */
	/*background-color:red;*/
}
.goodsShang .StoreInfo .xia li span:first-child{
	font-size: 13px;
	display:block;
	margin:10px 0 5px;
	color:#668B8B;
}
.goodsShang .StoreInfo .xia li span:last-child{
	margin-top: 5px;
	font-size: 16px;
	color:#FF7F00;
}
.goodsShang .StoreInfo .Jrdp{
	margin: 4px auto; 
	width: 85%;
	line-height: 35px;
	color: #66CD00;
	height: 35px;
	border-radius: 20px;
	text-align: center;
	font-size: 16px;
	border: 1px solid #66CD00;
	/*background-color: black;*/
}
/*小球动画*/
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