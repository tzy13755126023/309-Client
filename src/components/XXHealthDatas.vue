<template>
	<!-- 详细健康资讯 -->
	<div class="containHealth">
		<div class="headerHealth">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>详细健康资讯</span>
			<img src="../../static/favicon.jpg" alt="">
		</div>
		<div v-for="(item,index) in XXHealthsData" :key="index">	
			<div class="HeaderTitle" >
				<h1>{{item.title}}</h1>
				<span class="header_left">{{item.time}}</span>
				<span class="header_right">来源：{{item.laiyuan}}</span>
			</div>
			<img v-lazy="item.imagesurl" class="imgStyle">
			<div class="Zhengwen">
				<p v-html="item.content">{{}}</p>
			</div>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'HealthData',
	data(){
		return{
			healthdatasID:this.$route.params.healthdatasID,
			XXHealthsData:{}
		}
	},
	methods:{
		goback(){
			this.$router.push('/healthdatas')
		}
	},
	mounted(){
		this.$axios.get("/api/selectXXHealthsData/"+this.healthdatasID+" ")
		.then(res =>{
			this.XXHealthsData = res.data
			// console.log(this.XXHealthsData)
		})
		.catch( error =>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
.containHealth{
	width: 100%;
	background-color: #fff;
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

.HeaderTitle{
	width:100%;
	height:75px;
	/*background-color: red;*/
	background-color: #fff;
    border-bottom: 1px solid #E3E3E3;
	position: relative;
}
.HeaderTitle h1{
	text-align: center;
	font-size: 22px;
	padding-top: 2%;
}
.HeaderTitle span{
	font-size: 14px;
	position: absolute;
	bottom: 10%;
}
.HeaderTitle .header_left{
	left: 15%;
}
.HeaderTitle .header_right{
	right:12%;
}
.imgStyle{
	width:100%;
	height: 200px;
}
.kuochongdibu{
	width: 100%;
	height: 70px;
	clear: both;
	background-color: #fff;
}
.Zhengwen{
	white-space: pre-line;  /*合并空白符序列，但是保留换行符。*/
	/*white-space: pre-wrap;*/  /*保留空白符序列，但是正常地进行换行。*/
	width:98%;
	margin-left: 1%;
	font-size: 12px;
	letter-spacing: 0.5px;
	color: #000;
}
</style>