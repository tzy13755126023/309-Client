<template>
	<div class="containZHGL">
		<div class="headerZHGL">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>账户信息</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<div class="TouxiangImage">
			<span>头像</span>
			<img src="../../assets/images/userInfo.jpg" alt="">
			<i class="el-icon-arrow-right"></i>
		</div>
		<router-link to="zhanghuguanli/updatename" tag="div" class="YangShiDiv">
			<span>真实姓名</span>
			<span>{{username}}</span>
			<i class="el-icon-arrow-right"></i>
		</router-link>
		<router-link to="/zhanghuguanli/updatetel" tag="div" class="YangShiDiv">
			<span>手机号码</span>
			<span>{{morenTel}}</span>
			<i class="el-icon-arrow-right"></i>
		</router-link>
		<router-link to="/zhanghuguanli/updateguhua" tag="div" class="YangShiDiv">
			<span>固话</span>
			<span>{{guhua}}</span>
			<i class="el-icon-arrow-right"></i>
		</router-link>
		<router-link to="/zhanghuguanli/updateqq"  tag="div" class="YangShiDiv">
			<span>QQ</span>
			<span>{{QQ}}</span>
			<i class="el-icon-arrow-right"></i>
		</router-link>
		<router-link to="/zhanghuguanli/updatepwd" tag="div" class="XiugaiMiMa">
			<span>密码</span>
			<span>修改密码</span>
			<i class="el-icon-arrow-right"></i>
		</router-link>
	</div>
</template>
<script>
export default{
	name:'ZhangHuGuanLi',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			morenTel:window.localStorage.getItem("tel"),
			guhua   :window.localStorage.getItem("guhua"),
		  	QQ 		:window.localStorage.getItem("QQ"),
		}
	},
	methods:{
		goback(){
			this.$router.push('/mine')
		}
	}
}
</script>
<style scoped>
.containZHGL{
	width: 100%;
}
.containZHGL .headerZHGL{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerZHGL .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerZHGL span{
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
.headerZHGL img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}
.TouxiangImage{
	margin-top: 10px;
	width: 100%;
	height: 70px;
	line-height: 70px;
	background-color:#fff;
	border-bottom: 1px solid #E3E3E3;
	position: relative;
}
.YangShiDiv{
	width: 100%;
	height: 45px;
	line-height: 45px;
	background-color:#fff;
	border-bottom: 1px solid #E3E3E3;
	position: relative;
}
.containZHGL .YangShiDiv:nth-child(5){
	margin-top: 10px;
}
.TouxiangImage span,.YangShiDiv span{
	font-size: 14px;
	padding-left: 20px;
}
.containZHGL .YangShiDiv:nth-child(4) span:nth-child(2),.containZHGL .YangShiDiv:nth-child(3) span:nth-child(2){
	float: right;
	margin-right: 13%;
}
.containZHGL .YangShiDiv:nth-child(5) span:nth-child(2),.containZHGL .YangShiDiv:nth-child(6) span:nth-child(2){
	float: right;
	margin-right: 13%;
}
.TouxiangImage img{
	margin-top: 10px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	float: right;
	margin-right: 12%;
}
.TouxiangImage i,.YangShiDiv i{
	font-size: 20px;
	position: absolute;
	right: 1%;
	top:30%;
}
.TouxiangImage i{
	top:35%;
}
.XiugaiMiMa{
	margin-top: 15px;
	width:100%;
	height: 40px;
	position: relative;	
	background-color: #fff;
	border-bottom: 1px solid #E3E3E3;
	line-height: 40px; 
}
.XiugaiMiMa span{
	font-size: 14px;
	padding-left: 20px;
}
.XiugaiMiMa span:nth-child(2){
	font-size: 14px;
	padding-left: 60%;
    color:#66CD00;
}
.XiugaiMiMa i{
	font-size: 20px;
	position: absolute;
	right: 1%;
	top:30%;
}

</style>