<template>
	<div class="DaiFaHuoInfo" >
		<!-- 如果待发货数据为空，则显示此div -->
		<div class="showKongDaiFaHui" v-show="CountNum==0">
			<span>什么都没有喔</span>
			<router-link to="/index" tag="span">去首页逛逛</router-link>
		</div>
		<div class="DaiFaHuo" v-for="(item,index) in DaiFaHuoData" :key="index">
			<router-link :to="{name:'Goodsxiangqing',params:{goodsID:item.goodsID}}
						 "tag="img" v-lazy="item.goodsimageurl" alt="">
			</router-link>
			<span>订单编号&nbsp;&nbsp;:&nbsp;{{item.orderBianhao}}</span>
			<span>商家名称&nbsp;&nbsp;:&nbsp;{{item.storesName}}</span>
			<span>商品名称&nbsp;&nbsp;:&nbsp;{{item.goodsName}}</span>
			<span>商品规格&nbsp;&nbsp;:&nbsp;{{item.goodsrules}}<i>x{{item.goodsCount}}件</i></span>
			<!-- 总价包括了运费 -->
			<span>商品总价&nbsp;&nbsp;:&nbsp;<i>{{item.goodsAmount+item.yunfei | money}}</i></span>
			<div class="bofore"></div>
			<button class="txfh" :isTingxing="isTingxing" @click="txfh(index)" >提醒发货
			</button>
			<button class="mlhq" @click="mlhq(index,item)">卖了换钱</button>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default{
	name:'DaiFaHuo',
	data(){
		return{
			username:window.localStorage.getItem("username"),
			userMoney:window.localStorage.getItem("userMoney"),
			isTingxing:true,
			DaiFaHuoData:{},
		}
	},
	methods:{
		txfh(index){
			// MessageBox('','您已成功提醒卖家发货！');
			if(this.isTingxing==true){
    	    	Toast({
                message: '提醒卖家发货成功！',
                iconClass: 'el-icon-check'
            });
    	    	this.isTingxing = false;
    	    	//1小时以后让isTingXing变为true
	   		    setTimeout(() => {
    	      		 this.isTingxing = true;
    	    	}, 3600000)
			}else{
				Toast({
                message: '亲,1小时以后才可以提醒卖家喔，请耐心等候！',
                iconClass: 'el-icon-warning'
            });
			}
		},
		mlhq(index,item){
			MessageBox.confirm('亲,您确定要将它卖了吗?','温馨提示！').then(action => {
				// 修改账户金额
				this.$axios.put('/api/updateMoney',{
					money:(Number(this.userMoney)+Number(item.goodsAmount)+Number(item.yunfei)).toFixed(2),
					username:this.username
				})
				.then(res=>{
					if (res.data.affectedRows){
					localStorage.setItem("userMoney",(Number(this.userMoney)+Number(item.goodsAmount)+Number(item.yunfei)).toFixed(2))	
					}
				})
				.catch( error => {
					console.log(error)
				})	
				// 卖了换钱(删除对应编号)
				this.$axios.post('/api/MaiLeHuanQian',{
							orderID  : item.orderID,
							username : this.username
						})
						.then( res =>{
							if (res.data.affectedRows) {
								MessageBox('温馨提示！','您已换钱成功,看看余额是不是多了喔！！');
								//刷新页面
								setTimeout(() => {
									this.$router.go(0)   
								}, 2000)
							}
						})
						.catch( error =>{
							console.log(error)
						}) 
			
			})
			.catch( error =>{
				console.log(error)
				MessageBox('❤温馨提示！❤','您已成功取消！！');
			})
		},
		
	},
	mounted(){
		this.$axios.post("/api/selectDaifahuo",{
			username:this.username
		})
		.then( res => {
			this.DaiFaHuoData = res.data
			// console.log(this.DaiFaHuoData)
		})
		.catch( error =>{
			console.log(error)
		})
	},
	//计算属性
	computed:{
		//总数量
		CountNum(){
			let CountNumData = this.DaiFaHuoData
			let countNum = 0
			for(let i=0;i<CountNumData.length;i++){
				countNum+=CountNumData[i].goodsCount
			}
			return countNum 
		},
	}
}
</script>
<style scoped>
.DaiFaHuoInfo{
	width:100%;
}
.showKongDaiFaHui{
	text-align: center;
	width: 100%;
	height: 210px;
	background:url("../../assets/images/KongDingdan.jpg") no-repeat;
	background-size: 60%;
	background-position: 55% -5px;    /*让背景图片上移5px*/
	position: relative;
	background-color: #f5f5f5;
}
.showKongDaiFaHui span{
	color:#668B8B;
	font-size: 14px;
	font-weight: bold;
	position: absolute;
	bottom: 30%;
	right:37%;
}
.showKongDaiFaHui span:nth-child(even){
	display: block;
	width: 25%;
	height: 30px;
	line-height: 30px;
	background-color: green;
	color:#fff;
	font-size: 14px;
	position: absolute;
	bottom: 10%;
	right:36%;
}
.DaiFaHuo{
	width: 100%;
	height: 175px;
	background-color: #fff;
	position: relative;
	border-bottom: 1px solid #E3E3E3;
}
.DaiFaHuo img{
	padding: 3% 5% 0; 
	width: 80px;
	height: 90px;
	float: left;
}
.DaiFaHuo span{
	width:61%;
	display: block;
	margin:1%;
	font-size: 13px;
	float: right;
}
.DaiFaHuo span:nth-child(2){
	margin-top: 10px;
}
.DaiFaHuo span:nth-child(5){
	color:#668B8B;
}
.DaiFaHuo span:nth-child(5) i{
	float: right;
	margin-right: 10%;
}
.DaiFaHuo span:nth-child(6) i{
	color:#FF7F00;
	font-size: 14px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
.bofore{
	clear: both;
	margin-top: 2%;
	border-bottom: 1px solid #E3E3E3;
}
.txfh,.mlhq{
	font-size:14px;
	text-align: center;
	width: 25%;
	height: 30px;
	line-height: 30px;
	border-radius: 14px;
	background-color: #FF7F00;
	border:0;
	color: #FFF;
	position: absolute;
	bottom:4%;
}
.txfh{
	left:38%;
}
.mlhq{
	left:70%;
}
</style>