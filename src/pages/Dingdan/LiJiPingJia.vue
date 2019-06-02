<template>
	<div class="containLiPingJia">
		<div class="headerLiPingJia">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>立即评价</span>
			<img src="../../../static/favicon.jpg" alt="">
		</div>
		<textarea  type="text" v-model="PJcontent" ref="pjcontent"
				   placeholder="♥♥♥♥您的评价对我们非常重要,给个好评喔,谢谢！♥♥♥♥">
		</textarea>
		<div class="TJcontent">
			<button class="button1" type="button" @click="TJ()">提交</button>
			<button class="button2" type="button" @click="CZ()">重置</button>
		</div>
	</div>
</template>
<script>
import { DateTime } from '../../util/DataTime' 
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default{
	name:'LiJiDaiPingJia',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			item:this.$route.params.item,
			DataTime:'',
			PJcontent:'',
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
		TJ(){
			if (this.PJcontent=='') {
				MessageBox('❤❤❤温馨提示❤❤❤','亲，评价内容不能为空喔！')
			}else{
				 MessageBox.confirm('亲,您确定要提交吗?','❤❤温馨提示❤❤').then( action =>{
				 //添加评论
					this.$axios.post('/api/addToGoodsPJ',{
						username : this.username,
	    				goodsID  : this.item.goodsID,
					    PJcontent: this.PJcontent,
					    PJtime   : this.DataTime,
					    storesID : this.item.storesID
					})
					.then( res =>{
						if(res.data.affectedRows){
							Toast({
								message:'❤❤评价成功❤❤',
								iconClass: 'el-icon-check'
							})
							setTimeout(() => {
							  this.$router.push('/dingdan/daipingjia')
							}, 2000)
						}
					})
					.catch( error=>{
							Toast({
								message:'❤❤评价错误❤❤',
								iconClass: 'el-icon-close'
							})
					})
					//修改为已完成
					this.$axios.put('/api/updateOrderYiWancheng',{
						orderID:this.item.orderID
					})
					.then( res =>{
						if(res.data.affectedRows){
							console.log('❤❤❤修改状态成功❤❤❤')
						}else{
							console.log('❤❤❤修改失败！❤❤❤')
						}
					})
					.catch( error =>{
						console.log(error)
					})
				})
				.catch( error =>{
					Toast({
						message:'❤❤❤已取消！❤❤❤',
						iconClass: 'el-icon-check'
					})
				}) 
			}	
		},
		CZ(){
			this.$refs.pjcontent.value='';
		},
	},
	//获取当前时间
	created(){
		let date = new DateTime()
		this.DataTime = date.getDateTime()
	},
}
</script>
<style scoped>
.containLiPingJia{
	width: 100%;
}
.containLiPingJia .headerLiPingJia{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerLiPingJia .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerLiPingJia span{
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
.headerLiPingJia img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}
.containLiPingJia textarea{
	margin-top: 5px;
	width: 100%;
	height: 200px;
	font-size: 15px;
	background-color: #fff;
	border-bottom:1px solid #E3E3E3;
	color:#668B8B;
}
.TJcontent{
	width: 100%;
	height: 40px;
	line-height: 40px;
	background-color: #fff;
	position: relative;
}
.TJcontent button{
	font-size:14px;
	text-align: center;
	width: 25%;
	height: 30px;
	line-height: 30px;
	border-radius: 14px;
	background-color: #FF7F00;
	border:0;
	color: #FFF;
	top:5px;
	position: absolute;
}
.button1{
	left:20%;
}
.button2{
	left:50%;
}
</style>