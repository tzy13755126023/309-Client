<template>
	<div class="containSHDZ">
		<div class="headerSHDZ">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>收货地址</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="AddressInfo" :key="index" v-for="(item,index) in AddressData">
			<div class="ShouhuoRen">
					{{item.shouhuoren}}	
			</div>
			<div class="zhongjianneirong">
				<span>{{item.shouhuoTel | tel}}</span>	
				<span>{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.district}}&nbsp;{{item.address}}</span>
			</div>
			<div class="Updata">
				<router-link :to="{name:'UpdataShouhuoDiZhi',params:{item:{item} }}"
				tag="i" class="el-icon-edit" >
			    </router-link>
			</div>
		</div>
		<router-link to="/shouhuodizhi/BJshouhuodizhi" tag="div" class="Addaddress"  >
			<i class="el-icon-plus"></i>
			新增地址
		</router-link>
	</div>
</template>
<script>

export default{
	name:'ShouHuoDiZhi',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			AddressData:{}
 	   }
	},
	methods:{
		goback(){
			this.$router.push('/mine')
		},
	},
	mounted(){
		this.$axios.post('/api/selectAddress',{
			username:this.username
		})
		.then( res =>{
			// console.log(res.data)
			this.AddressData = res.data
			// console.log(this.AddressData)
		})
		.catch( error =>{
			console.log(error)
		})
	}

}
</script>
<style scoped>
.containSHDZ{
	width: 100%;
}
.containSHDZ .headerSHDZ{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerSHDZ .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerSHDZ span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 4px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	font-weight: bold;
	color:#FF7F00;
}
.headerSHDZ img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}
.Addaddress{
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	text-align: center;
	letter-spacing: 2px;
	width: 100%;
	z-index: 1005;
	position: fixed;
	background-color: #33ff99;
	color: #000;
	top:80%;
	left:0;
}
.AddressInfo{
	width: 100%;
	height: 73px;
	/*background-color: red;*/
	border-bottom: 1px solid #E3E3E3; 
	font-size: 13px;
}
.ShouhuoRen{
	width:15%;
	height:73px;
	line-height: 73px;
	text-align: center;
	float: left;
	/*background-color: black;*/
}
.zhongjianneirong{
	width:70%;
	height:60px;
	float: left;
	/*background-color: pink;*/
}
.zhongjianneirong span{
	padding-top: 10px;
	display: block;
	padding-left: 30px;
	line-height: 15px;
	height: 30px;
	/*background-color: pink;*/
}
.zhongjianneirong span:first-child{
	padding-top: 0;
	font-size: 15px;
	letter-spacing: 2px;
	line-height: 45px;
	height: 30px;
}
.zhongjianneirong span:last-child{
	color:#668B8B;	
}
.Updata{
	text-align: center;
	width:15%;
	height: 70px;
	float: left;
	line-height: 80px;
}
.Updata i{
	font-size: 23px;
}
</style>