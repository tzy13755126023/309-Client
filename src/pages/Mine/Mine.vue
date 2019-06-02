<template>
	<div class="mine">
		<div class="shang">
			<div class="settings">
				<span style="font-size: 21px">个人中心</span>
				<router-link to='/setting' tag="div" class="settings1">
					<i class="iconfont">&#xe78e</i>
				</router-link>
			</div>
			<div  class="xia">
				<div class="loginzhuce">
					<i class="iconfont" v-show="!this.$store.state.username">&#xe658</i>
					<img src="../../assets/images/userInfo.jpg" v-show="this.$store.state.username">
				</div>
					<!-- {{ this.$store.state.isLogin }} -->
				<router-link :to="this.$store.state.username ?'/zhanghuguanli':'/login'" 
				tag="span" :class="this.$store.state.username?'span1true':'span1false'">
					{{ this.$store.state.username ? this.$store.state.username : '登录/注册'}}
					&nbsp;
					{{ this.$store.state.address  ? this.$store.state.address : ''}} 

				</router-link> 
				<span class="yue">
					{{ this.$store.state.username ? '账户余额：' : ''}}
					{{this.$store.state.userMoney ? this.$store.state.userMoney: ''}}
				</span>
				<span class="Youhuiquan">
					{{ this.$store.state.username ? '优惠券：' : ''}}
					{{this.$store.state.userMoney ? '0张': ''}}
				</span>
				<span class="Hongbao">
					{{ this.$store.state.username ? '红包：' : ''}}
					{{this.$store.state.userMoney ? '0个': ''}}
				</span>
				<div class="youjiantou">
					<img src="../../../static/favicon.jpg" alt="">
				</div>	
			</div>	
		</div>
			<div class="dingdan">
				<router-link to="/dingdan" tag="div" class="dingdanshang">
					<span class="ddspan">我的订单</span>
					<i class="iconfont">&#xe641</i>
				</router-link>
			<ul class="dingdanzhuangtai">
				<router-link to="/dingdan/daifukuan" tag="li">
					<i class="iconfont">&#xe601</i><span>待付款</span>
					<div class="OrderStatus" v-show="Daifukuan!=0&&this.username">
						<span>{{Daifukuan}}</span>
					</div>
				</router-link>
				<router-link to="/dingdan/daifahuo" tag="li">
					<i class="iconfont">&#xe706</i><span>待发货</span>
					<div class="OrderStatus" v-show="Daifahuo!=0&&this.username">
						<span>{{Daifahuo}}</span>
					</div>
				</router-link>
				<router-link to="/dingdan/daishouhuo" tag="li">
					<i class="iconfont">&#xe62f</i><span>待收货</span>
					<div class="OrderStatus" v-show="Daishouhuo!=0&&this.username">
						<span>{{Daishouhuo}}</span>
					</div>
				</router-link>
				<router-link to="/dingdan/daipingjia" tag="li">
					<i class="el-icon-more"></i><span>待评价</span>
					<div class="OrderStatus" v-show="Daipingjia!=0&&this.username">
						<span>{{Daipingjia}}</span>
					</div>
				</router-link>
			</ul>
			</div>
			<div class="xiaSi">
				<router-link to="/historyGoogs" tag="li">
					<i class="iconfont">&#xe630</i><span>最近浏览</span>
				</router-link>
				<router-link to="/shoucang" tag="li">
					<i class="iconfont">&#xe610</i><span>我的收藏</span>
				</router-link>
				<router-link to="/shouhuodizhi" tag="li">
					<i class="iconfont">&#xe6b5</i><span>收货地址</span>
				</router-link>
				<router-link to="/zhanghuguanli" tag="li">
					<i class="iconfont">&#xe63d</i><span>账户管理</span>
				</router-link>
			</div>
			<div class="dibu">
				<ul>
					<router-link to="/mine/yjfk" tag="li">
						<span>意见反馈</span><i class="iconfont">&#xe641</i>
					</router-link>
					<router-link to="/mine/lxwm" tag="li">
						<span>联系我们</span><i class="iconfont">&#xe641</i>
					</router-link>
					<router-link to="/mine/gywm" tag="li">
						<span>关于我们</span><i class="iconfont">&#xe641</i>
					</router-link>
					<router-link to="/mine/zzzs" tag="li">
						<span>资质证书</span><i class="iconfont">&#xe641</i>
					</router-link>
					<router-link to="/storesruzhu" tag="li">
						<span>{{isStoreStatus==1?'我的店铺':'商家入驻'}}</span><i class="iconfont">&#xe641</i>
					</router-link>
				</ul>
			</div>
	</div>
</template>
<script>
export default{
	name:'Mine',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			Daifukuan:'',     //代付款
			Daifahuo:'',      //待发货
			Daishouhuo:'',    //待收货
			Daipingjia:'',    //待评价
			isStoreStatus:'', //接收该用户是否通过审核
		}
	},
	created(){
		this.$store.commit('setUsername',window.localStorage.getItem("username"));
		this.$store.commit('setAddress',window.localStorage.getItem("address"));
		this.$store.commit('setuserMoney',window.localStorage.getItem("userMoney"));
		if (this.$store.state.username) {
			//获取当前帐户金额
			this.$axios.post('/api/getUserMoney',{
				username:this.username
			})
			.then( res =>{
				// console.log(res.data)
				localStorage.setItem("userMoney",res.data[0].money)
				
			})
			.catch( error =>{
				console.log(error)
			})
		}
		
		//获取状态为代付款的订单数据
		this.$axios.post('/api/selectDaifukuan',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data.length)
			this.Daifukuan = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
		//获取状态为待发货的订单数据
		this.$axios.post('/api/selectDaifahuo',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data.length)
			this.Daifahuo = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
		//获取状态为待收货的订单数据
		this.$axios.post('/api/selectDaiShouhuo',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data.length)
			this.Daishouhuo = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
		//获取状态为待评价的订单数据 
		this.$axios.post('/api/selectDaiPingJia',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data.length)
			this.Daipingjia = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
	},
	mounted(){
		//获取商家入驻数据  来判断当前用户是否是入驻商家以及商家状态
		this.$axios.post('/api/GetStoresInfo',{
			danbaoren : this.username
		})
		.then( res =>{
			if (res.data!='') {
				this.isStoreStatus = res.data[0].storeStatus
			}
		})
		.catch( error =>{
			console.log(error)
		})
	},
}
</script>
<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 25px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*float:right;*/
    /*color:#ffffff;*/
    margin-right:5px 
}
.mine{
	width:100%;
}
.mine .shang{
	width:100%;
	height: 160px;
	background: #33ff99;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.settings{
	height: 40px;
	width:100%;
	text-align: center;
	font-size:20px;
	line-height: 40px;
	position: relative;
	border-bottom: 1px solid gray;
}
.settings span{
	letter-spacing: 1px;
}
.settings .settings1{
	position:absolute;
	top:0;
	right:7px;
}
.loginzhuce{
    height:70px;
    width: 70px;
    border: 1px solid #E3E3E3;
    border-radius: 50%;
    background: gray;
    position: absolute;
    left:5%;
    bottom: 18%;
}
.loginzhuce i{
	font-size: 50px;
	margin-top:5%;
	float: right;
	margin-right:10%;
}
.loginzhuce img{
	border-radius: 50%;
}
/*登录之前  登录注册  样式*/
.span1false{
	font-size: 20px;
	display: block;
	position: absolute;
    left:36%;
    bottom: 22%;
}
/*登录之后  样式变成span1true*/
.span1true{
	font-size: 20px;
	display: block;
	position: absolute;
    left:30%;
    bottom: 22%;
}
.yue,.Youhuiquan,.Hongbao{
	position: absolute;
	bottom:2%;
	color:red;
	font-size:14px;
	left:3%;
}
.Youhuiquan{
	left:44%;
}
.Hongbao{
	left:78%;
}
.youjiantou img{
	height:63px;
	width: 58px;
	font-size: 38px;
	position: absolute;
	bottom: 16%;
	right:5%;
}
.dingdan{
	margin-top: 10px;
	height:125px;
	width: 100%;
	line-height: 50px;
	background-color: #fff;
	/*background-color: red;*/
    border-bottom: 1px solid #E3E3E3;
}
.dingdan .dingdanshang{
	height: 40px;
	width: 100%;
	line-height: 40px;
	background-color: #ffffff;
    border-bottom: 1px solid #E3E3E3;
}
.dingdan .ddspan{
	font-size: 17px;
	padding-left:20px; 
	text-align: center;
}
.dingdan .dingdanshang i{
	float: right;
}
.dingdan .dingdanzhuangtai{
	height: 80px;
	width: 100%;
	margin: 5px 0 0 0;
    text-align: center;
    overflow: hidden;
    display: flex;
}
.dingdan .dingdanzhuangtai li{
	/*background-color: pink;*/
	position: relative;
    flex:1;
}
.dingdan .dingdanzhuangtai li i,.xiaSi li i,.dingdan .dingdanzhuangtai li .el-icon-more{
    display: block;
	text-align: center;
	height: 30px;
	color:#66CD00;
	vertical-align: center;
}
.dingdan .dingdanzhuangtai li .el-icon-more{
	line-height: 55px;
	font-size:23px;
}

.dingdan .dingdanzhuangtai li span,.xiaSi li span{
	margin-top: 5px;
	height: 30px;
    display:block;
    font-size: 16px;   
}
.xiaSi{
	margin-top: 10px;
	height: 80px;
	width: 100%;
	background: #FFFFFF;
	text-align: center;
	display: flex;
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
}
.xiaSi li{
    text-align: center;
    vertical-align: center;
    padding-top: 10px;
    flex:1;
}
.dibu{
	margin-top: 10px;
	width: 100%;
	background: #ffffff;
}
.dibu ul{
	list-style: none;
}
.dibu ul li{
	width: 100%;
	height: 40px;
	line-height: 39px;
	vertical-align: center;
	border-bottom: 1px solid #E3E3E3;
}
.dibu ul li span{
	font-size: 15px;
	padding-left: 20px;
}
.dibu ul li i{
	float: right;
}
.OrderStatus{
	position: absolute;
	top:6%;
	right:27%;
	width: 24%;
	height: 24%;
	text-align: center;
	line-height: 80%;
	border-radius: 50%;
	color: #fff;
	background-color: red;
}
.dingdan .dingdanzhuangtai .OrderStatus span{
	font-size: 14px;
}
</style>