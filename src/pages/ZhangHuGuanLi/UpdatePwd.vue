<template>
	<div class="containUpdatePwd">
		<div class="headerUpdatePwd">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>修改密码</span>
		</div>
		<div class="Input1">
			<input :type="passwordType" v-model="password" name="password" placeholder="请输入当前密码">
			<i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
		</div>
		<div class="Input2">
			<input :type="passwordType" v-model="Newpassword" name="Newpassword" placeholder="请输入新密码">
			<i class="el-icon-view el-input__icon" :style="fontstyle2" slot="suffix" @click="showPassword2"></i>
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
	name:'UpdatePwd',
	data(){
		return{
			password:'',
			Newpassword:'',
			username:window.localStorage.getItem("username"),
	  	 	passwordType: 'password',
 	        fontstyle: {},
 	        fontstyle2:{}
		}
	},
	methods:{
		goback(){
			this.$router.push('/zhanghuguanli')
		},
		baocun(){
			//密码验证规则
			var pattern = /^\S{6,12}$/g
			if (this.password=='') {
				MessageBox('','请您输入当前密码')
				return false
			}
			if (this.Newpassword=='') {
				MessageBox('','请您输入新密码')
				return false
			}
			if (!pattern.test(this.Newpassword)) {
				MessageBox('','请输入6-12个非空白字符!')
				return false
			}
			setTimeout(() => {
				this.$axios.put('/api/UpdataPwd',{
					Newpassword:this.Newpassword.trim(),
					username   :this.username,
					password   :this.password
				})
				.then( res =>{
					if (res.data.affectedRows) {
						Toast({
			                   message: '修改成功！',
			                   iconClass: 'el-icon-check'
			                });
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

		},
		// 通过改变input的type使密码可见
    	showPassword() {
	      this.fontstyle === 'color: red' ? (this.fontstyle = '') : (this.fontstyle = 'color: red') 
	      // 改变密码可见按钮颜色
	      this.passwordType === 'text'
	        ? (this.passwordType = 'password')
	        : (this.passwordType = 'text')
	    },
	    showPassword2(){
	    	this.fontstyle2 === 'color: red' ? (this.fontstyle2 = '') : (this.fontstyle2 = 'color: red') 
	      // 改变密码可见按钮颜色
	      this.passwordType === 'text'
	        ? (this.passwordType = 'password')
	        : (this.passwordType = 'text')
	    },
	}
}
</script>
<style scoped>
.containUpdatePwd{
	width: 100%;
}
.containUpdatePwd .headerUpdatePwd{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerUpdatePwd .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerUpdatePwd span{
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
.Input1,.Input2{
	padding-left: 20px;
	margin-top: 10px;
	width: 100%;
	height: 50px;
	position: relative;
	background-color: #fff;
}
.Input1{
	border-bottom: 1px solid #E3E3E3;
}
.Input2{
	margin-top: 0;
}
.Input1 input,.Input2 input{
	width: 80%;
	height:100%;
	/*background-color: red;*/
	font-size: 14px;
}
.Input1 i,.Input2 i{
	position:absolute;
	font-size: 17px;
	right: 10%;
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