<template>
	<div>
		<div class="contain">		
		<div class="header1">
			<i class="el-icon-arrow-left" @click="goback()"></i>
			<span>所有顾客评论</span>
		</div>
		<div class="NoPingJia" v-show="Pjlength==0">
			--&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;暂无用户评论&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;--&nbsp;
		</div>
		<div class="goodsPJ" :key="item.index" v-for="item in AllgoodsPjData" v-show="Pjlength!=0">
			<span>{{ item.PJcontent}}</span>
			<span>{{ item.username | xingxing}}</span>
			<span>{{ item.PJtime}}</span>
		</div>
		<!-- 腾出底部 -->
		<div class="kuochongdibu"></div>
	</div>

	</div>
</template>
<script>
export default{
	name:'AllPJ',
	data(){
		return{
			goodsID:this.$route.params.goodsID,
			AllgoodsPjData:{},
			Pjlength:'',       //评价长度
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		}
	},
	mounted(){
		this.$axios.get("/api/goodsPJ/"+this.goodsID+" ")
		.then(res =>{
			// console.log(res.data)
			this.AllgoodsPjData = res.data
			this.Pjlength = res.data.length
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
.header1{
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	/*background-color: red;*/
	border-bottom: 1px solid #E3E3E3; 
	position: relative;
}
.header1 span{
	font-size: 17px;
	color:#FF7F00;
}
.header1 i{
	line-height: 40px;
	position: absolute;
	font-size: 24px;
	font-weight: bold;
	left: 3%;

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
.NoPingJia{
	width:100%;
	height: 60px;
	line-height: 60px;
	margin-top: 5px;
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