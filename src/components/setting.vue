<template>
<!-- 设置组件 -->
	<div class="contian">
		<div class="header">
			<router-link to='/mine'><i class="iconfont">&#xe7eb</i></router-link>
			<span>设置</span>
		</div>
		<div class="zjnr">
			<ul class="ul1">
				<li><span class="span_left">清除图片缓存</span><span class="span_rihgt">2.09MB</span></li>
				<li><span class="span_left">检查更新</span><span class="span_rihgt">v2.9.60</span></li>
			</ul>
		</div>
		<div class="zjnr2">
			<ul class="ul2">
				<li><span class="span_left">服务条款</span>
					<span class="span_rihgt"><i class="iconfont">&#xe641</i></span>
				</li>
				<li><span class="span_left">商品验收标准</span>
					<span class="span_rihgt"><i class="iconfont">&#xe641</i></span>
				</li>
				<li><span class="span_left">商品退货政策</span>
					<span class="span_rihgt"><i class="iconfont">&#xe641</i></span>
				</li>
			</ul>
		</div>
		<div class="loginOut" @click.prevent.stop="loginOut" v-show="this.$store.state.isLogin">
			<span>退出登录</span>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {DateTime} from '../util/DataTime'
export default{
	name:'Setting',
	data(){
		return{
			username:window.localStorage.getItem('username'),
			recordtype:'登出',	
			DataTime:'',        //获取当前时间
		}
	},
	methods:{
		loginOut(){
			MessageBox.confirm('确定要退出当前账号吗?','退出登录').then(action => {
					//添加登出日志
				   this.$axios.post('/api/addToRecord',{
				   	username:this.username,
				   	recordtype:this.recordtype,
				   	recordtime:this.DataTime
				   })
				   .then( res =>{
				   		if (res.data.affectedRows) {
				   			//退出时删除所有localStorage中的数据
				   			localStorage.removeItem('token')
						    localStorage.removeItem('username')
						    localStorage.removeItem('tel')
						    localStorage.removeItem('QQ')
						    localStorage.removeItem('guhua')
						    localStorage.removeItem('address')
						    localStorage.removeItem('userMoney')
						    localStorage.removeItem('MorenAddress')
						    this.$store.commit("setToken",'')
						    localStorage.setItem("isLogin",false)
						    this.$store.commit("setLogin",window.localStorage.getItem('isLogin'))
						    Toast({
							   message: '退出成功',
							   iconClass: 'el-icon-check'
							});
						    this.$router.push('/mine')
				   		}
				   })
				   .catch(error =>{
				   	 console.log(error)
				   })
				   
				}).catch( error =>{
			 	   MessageBox.alert( '已取消退出登录！','提示');
				   console.log(error)
				})	
		},
	},
	created(){
		let date = new DateTime()
		// 获取当前时间
		this.DataTime = date.getDateTime()	
	},
	mounted(){
		const islogin = window.localStorage.getItem('isLogin')
		if (islogin=='true') {
			this.$store.commit('setLogin',window.localStorage.getItem('isLogin'))
			// console.log(this.$store.state.isLogin)
		}
		if(islogin=='false'){
			this.$store.commit('setLogin',false)
			// console.log(this.$store.state.isLogin)
		}
	}
}
</script>
<style scoped>
.iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 4%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.contian{
	width: 100%;
}
.header{
	height: 40px;
	width: 100%;
	line-height: 40px;
	background-color: #ffffff;	
	position: relative;
}
.header span{
	font-size: 18px;
	position: absolute;
	color: #FF7F00;
	right:45%;
}
.zjnr{
	width: 100%;
	margin-top:15px; 
	background-color: #ffffff;
}
.zjnr ..ul1{
	list-style:none;
	height: 80px;
}
.zjnr .ul1 li{
	height: 40px;
	width: 100%;
	line-height:40px;
	position: relative;
}
.zjnr .ul1 li:first-child{
	 border-bottom: 1px solid #E3E3E3;
}
.zjnr .ul1 li .span_left{
	position: absolute;
	left:4%;
	font-size: 15px;
}
.zjnr .ul1 li .span_rihgt{
	position: absolute;
	right:4%;
	font-size: 15px;

}
/*第二个ul*/
.zjnr2{
	width: 100%;
	margin-top:15px; 
	background-color: #ffffff;
}
.zjnr2 ..ul2{
	list-style:none;
	height: 120px;
	margin-top:10px;
}
.zjnr2 .ul2 li {
	height: 40px;
	width: 100%;
	line-height:40px;
	position: relative;
}
.zjnr2 .ul2 li:first-child{
	 border-bottom: 1px solid #E3E3E3;
}
.zjnr2 .ul2 li .span_left{
	position: absolute;
	left:4%;
	font-size: 15px;
}
.zjnr2 .ul2 li .span_rihgt{
	position: absolute;
	right:4%;
	font-size: 15px;

}
.zjnr2 .ul2 li .span_rihgt i{
	font-size: 15px;
}
.loginOut{
	margin-top: 20%;
	width: 100%;
	height: 50px;
	background-color: #33ff99;
	line-height: 50px;
	font-size:19px;
	text-align: center;
}
</style>