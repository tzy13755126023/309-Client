<template>
	<div class="containUpdateQQ">
		<div class="headerUpdateQQ">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>修改QQ</span>
		</div>
		<div class="Input1">
			<input type="text" v-model="NewQQ" name="NewQQ" placeholder="请输入新的QQ号" autofocus>
		</div>
		<div class="Baocun" @click="baocun()">
			<span>保存</span>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui'
export default{
	name:'UpdateQQ',
	data(){
		return{
			NewQQ:'',
			username:window.localStorage.getItem("username"),
		}
	},
	methods:{
		goback(){
			this.$router.push('/zhanghuguanli')
		},
		baocun(){
			if (this.NewQQ=='') {
				MessageBox('','输入内容不能为空！')
			}else{
				setTimeout(() => {
					this.$axios.put('/api/UpdataQQ',{
						NewQQ   :this.NewQQ.trim(),
						username:this.username
					})
				 	.then( res =>{
						if (res.data.affectedRows) {
							Toast({
			                   message: '修改成功！',
			                   iconClass: 'el-icon-check'
			                })
							setTimeout(() => {
								this.$router.push('/zhanghuguanli')
							}, 1500)
						}else{
							MessageBox('','修改有误，请您5s后再试，谢谢！')
						}
					})
					.catch( error =>{
						console.log(error)
					})
				}, 500)
				localStorage.setItem("QQ",this.NewQQ)
			}
		}
	}
}
</script>
<style scoped>
.containUpdateQQ{
	width: 100%;
}
.containUpdateQQ .headerUpdateQQ{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerUpdateQQ .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerUpdateQQ span{
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
.Input1{
	padding-left: 20px;
	margin-top: 10px;
	width: 100%;
	height: 40px;
	background-color: #fff;
}
.Input1 input{
	width: 100%;
	height:100%;
	font-size: 14px;
}
.Baocun{
	margin:40% auto;
	width: 80%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 18px;
	color:#fff;
	background-color:#66CD00;
}	
</style>