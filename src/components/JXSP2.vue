<template>
	<div class="contain">
	 	<div class="header">	
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>精选商品</span>
			<img src="../../static/favicon.jpg" alt="">
		</div>
		<router-link :to="{name:'GoodsInfo',params:{goodsename:item.goodsEname}}" tag='div' :key="index"
		 v-for="(item,index) in jxspDatas" >
			<img v-lazy="item.goodsimageurl" alt="" >
			<span class="font">{{item.goodsName}}</span>
			<span class="rules">{{item.goodsrules}}</span>
			<h3>{{item.goodsprice | money}}</h3>
		</router-link>
	  <div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'JXSP2',
	data(){
		return{
			jxspDatas:[],
		}
	},
	components:{
	},
	mounted(){
		setTimeout(() => {
			  this.$axios.get("api/selectjxsp")
			 	.then( res =>{
			 		// console.log(res.data)
			 		this.jxspDatas = res.data
			 	})
			 	.catch( error =>{
			 		console.log(error)
			 	})
		}, 700)
		
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
	},
	components:{
	}

}
</script>
<style scoped>
.contain{
	width: 100%;
	clear: both;
	background-color: #ffff;
}
.header{
	height:40px;
	line-height: 40px;
	width:100%;
	margin-bottom:10px;
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
	font-size: 16px;
	font-weight: bold;
	color:#FF7F00;
}	
.header img{
	position:absolute;
	top:2px;
	right:3%;
	width: 40px;
	height: 35px;
}
/*遍历所有div的样式*/
.contain div:nth-child(2),.contain div:nth-child(3),.contain div:nth-child(4),.contain div:nth-child(5),.contain div:nth-child(6),.contain div:nth-child(7){
    width: 50%;
    height: 190px;
    text-align: center;
    float:left;
    position: relative;
}
/*所有div下图片样式*/
.contain div:nth-child(2)>img,.contain div:nth-child(3)>img,.contain div:nth-child(4)>img,.contain div:nth-child(5)>img,.contain div:nth-child(6)>img,.contain div:nth-child(7)>img{
	width:60%;
	height: 120px;
	position: absolute;
	/*top:5px;*/
	right: 20%;
}
.contain div:nth-child(2)>h3,.contain div:nth-child(3)>h3,.contain div:nth-child(4)>h3,.contain div:nth-child(5)>h3,.contain div:nth-child(6)>h3,.contain div:nth-child(7)>h3{
	position: absolute;
	font-size: 12px;
	color:#FF7F00;
	right:41%;
	bottom: 5px;
}
.font{
	position: absolute;
	font-size: 13px;
	font-weight: bold;
	bottom: 43px;
	right:25%;
}
.contain div:nth-child(6)>span{
	font-size: 13px;
	right:29%;
}
.contain div:nth-child(7)>span{
	right:23%;
}
.rules{
	position: absolute;
	font-size: 12px;
	right:30%;
	bottom: 24px;
}
.contain div:nth-child(3)> .rules{
	right: 26%;
	bottom: 24px;
}
.contain div:nth-child(4)> .rules{
	right: 21%;
	bottom: 24px;
}
.contain div:nth-child(7)> .rules{
	right: 40%;
	bottom: 24px;
}
.kuochongdibu{
	height: 65px;
	clear: both;
}
</style>