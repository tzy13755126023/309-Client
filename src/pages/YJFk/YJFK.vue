<template>
	<div class="contianYJFK">
		<div class="headerYJFK">
			<i class="iconfont" @click="goback">&#xe7eb</i>
			<span>意见反馈</span>
			<!-- 清空浏览记录 -->
			<i @click="addToYJFK()">提交</i>
		</div>
		<textarea  type="text"  v-model="content"
			placeholder="♥♥♥♥♥♥您的意见对我们非常重要，我们会不断的优化和改善努力为您带来更好的体验，谢谢！♥♥♥♥♥♥♥">
		</textarea>
	</div>
</template>
<script>
import { DateTime } from '../../util/DataTime' 
import { MessageBox } from 'mint-ui';
export default{
	name:'YJFK',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			content:'',
			DataTime:''
		}
	},
	methods:{
		goback(){
			this.$router.push("/mine")
		},
		addToYJFK(){
			if (this.content=='') {
				MessageBox('❤❤❤❤温馨提示❤❤❤❤','亲，反馈内容不能为空喔！')
			}else{
				this.$axios.post('/api/addToYJFK',{
				username:this.username,
				yjfkContent:this.content,
				yjfkTime:this.DataTime
				})
				.then( res =>{
					if (res.data.affectedRows) {
					    MessageBox('提示','反馈成功，感谢您的反馈！');
						    //1.3秒之后刷新该页面
				   			 setTimeout(() => {
				   			 	this.$router.go(0)
				   			 }, 1500)
					}else{
						MessageBox('提示','提交失败，请您5s后再进行反馈！');
					}
				})
				.catch( error =>{
					console.log(error)
				})
			}
		}
	},
	created(){
		let date = new DateTime()
		this.DataTime = date.getDateTime()
	}
}
</script>
<style scoped>
.contianYJFK{
	width: 100%;
}
.contianYJFK .headerYJFK{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerYJFK .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerYJFK span{
	position: absolute;
	height:40px;
	width: 40%;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	letter-spacing: 3px;
	font-weight: bold;
	color:#FF7F00;
}	
.headerYJFK i:last-child{
	position:absolute;
	top:0px;
	font-size: 18px;
	letter-spacing: 3px;
	font-weight: bold;
	right:0;
	text-align: center;
	width: 50px;
	height: 60px;
}
textarea{
	margin-top: 10px;
	width: 100%;
	height: 200px;
	font-size: 15px;
	background-color: #fff;
	color:#668B8B;
}
</style>