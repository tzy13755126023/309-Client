<template>
	<div class="contain">
		 <input class="input1" ref="input1" type="text" :placeholder="icon"/>
		 <div class="btn1" @click="Search">
		 	<i class="iconfont">&#xe69d</i>
		 </div>
		 <div class="liulei">
		 	<ul>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'ZXYP',index:0}}" tag="li"><i class="iconfont">&#xe73f</i><span>中西药品</span></router-link>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'YSBJ',index:1}}" tag="li"><i class="iconfont">&#xe741</i><span>养生保健</span></router-link>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'YLQX',index:2}}" tag="li"><i class="iconfont">&#xe75f</i><span>医疗器械</span></router-link>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'JSYP',index:3}}" tag="li"><i class="iconfont">&#xe77b</i><span>计生用品</span></router-link>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'ZYYP',index:4}}" tag="li"><i class="iconfont">&#xe781</i><span>中药饮品</span></router-link>
		 		<router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'MRHF',index:5}}" tag="li"><i class="iconfont">&#xe77a</i><span>美容护肤</span></router-link>
		 	</ul>
		 </div>
		 <!-- 附近的药房div -->
		 <div class="fujinyaofang">
		 	<!-- 跳转到所有商家信息页面 -->
		 	<router-link to="/allStore" tag="div" class="wenzi">
		   		<span>附近的药房</span>
		   		<i class="iconfont">&#xe641</i>
		 	</router-link>
		 	<div class="sjnr">
		 		<!-- router-link 商家详细信息页面 -->
		 		<router-link :to="{name:'StoreInfo',params:{storesID:item.storesID}}" tag="li" :key="index" 
		 		v-for="(item,index) in storesData">
		 			<img v-lazy="item.imagesurl" alt="">
		 			<!-- 商家中间店名以及好评距离等信息 -->
		 			<div class="zong">	
		 			<div class="storesNames">
		 				{{ item.storesName}} 
		 			</div>
					<div class="julihaoping">
		 				<span style="margin-right:10px">距离&nbsp;&nbsp;{{ item.juli | juli}} </span>
		 				<span>评价</span>
		 				<span style="color:#66CD00;font-size: 13px;">&nbsp;&nbsp;{{ item.haoping}}</span> 						
		 			</div>
		 			</div>
		 			<!-- 进店看看div -->
					<div class="jdkk">
						<span>进店看看</span>
					</div>
		 		</router-link>
		 	</div>
		 </div>
		 <!-- 高发疾病div -->
		 <div class="gfjb">
		 	<div class="gfjbTitle">		 		
				高发疾病
		 	</div>
		 	<ul>
		 		<router-link tag="li" :to="{name:'Gaofajibing',params:{gaofajibing:item.Title,index:item.index}}" :key="item.index" v-for="item in gaofajibing1" >
		 			{{ item.Title}}	
		 		</router-link>
		 	</ul>
		 	<ul>
		 		<router-link tag="li" :to="{name:'Gaofajibing',params:{gaofajibing:item.Title,index:item.index}}" :key="item.index" v-for="item in gaofajibing2" >
		 			{{ item.Title}}	
		 		</router-link>
		 	</ul>
		 	<ul>
		 		<router-link tag="li" :to="{name:'Gaofajibing',params:{gaofajibing:item.Title,index:item.index}}" :key="item.index" v-for="item in gaofajibing3" >
		 			{{ item.Title}}	
		 		</router-link>
		 	</ul>
		 </div>
		  <!-- 热门品牌div -->
		 <div class="rmpp">
		 	<div class="rmppTitle">		 		
				热门品牌
		 	</div>
		 	<img src="../../assets/images/rmpp/rmpp01.jpg">
		 	<img src="../../assets/images/rmpp/rmpp02.jpg">
		 </div>
	  	<div class="kuochongdibu"></div>
	</div>
</template>
<script>
import "../../assets/css/iconfont.css"
import { MessageBox } from 'mint-ui';
export default{
	name:'Zhaoyao',
	data(){
		return{
			icon:'  \ue69d     请输入 批准文号、商品名、症状',
			storesData:[],
			gaofajibing1:[
			{
				Title:'腹痛腹泻',
				index:0
			},
			{
				Title:'哮喘',
				index:1
			},
			{
				Title:'胃炎',
				index:2
			},
			],
			gaofajibing2:[
			{
				Title:'肺热咳嗽',
				index:3
			},
			{
				Title:'痛风',
				index:4
			},
			{
				Title:'计生医用',
				index:5
			}
			],
			gaofajibing3:[
			{
				Title:'高血压',
				index:6
			},
			{
				Title:'缺钙',
				index:7
			},
			{
				Title:'肝病',
				index:8
			}
			]
		}
	},
	methods:{
		aa(item){
			console.log(item.storesID)
		},
		fetchData(inputValue){
			this.$axios.get("/api/searchLsit/"+inputValue+"/0/200")
				.then( res =>{
					// console.log(res.data)
					//如果返回商品信息量为空，则提示
					if(res.data.length==0){
						MessageBox.alert('暂无相关商品信息','')
					}
					else{
						this.$router.push({name:'Serach',params:{searchvalue:inputValue}})	
					}
				})
				.catch( error =>{
					console.log(error)
				})
		},
		Search(){
			//清除字符串两端的多余的空格
			const inputValue = this.$refs.input1.value.trim()
			console.log(inputValue)
			if(inputValue==''||inputValue==null){
				MessageBox.alert('亲，请您先输入需要查询的内容哟！','')
			}
			else{
				this.fetchData(inputValue)	
			}
		},
	},
	mounted(){
		this.$axios.get("api/selectstores")
			.then( res =>{
				// console.log(res.data)
				this.storesData = res.data
			})
			.catch( error =>{
				console.log(error)
			})
	},
	//回车键绑定Search方法
    created() {
	    let that = this;
	    document.onkeypress = function(e) {
      	var keycode = document.all ? event.keyCode : e.which;
	      	if (keycode == 13) {
	       	 	that.Search();// 搜索方法
	        	 return false;
	      	}
	    }
    },
	components:{

	},
}
</script>
<style scoped>
.contain{
	width: 100%;
}
.iconfont{
	display: inline-block;
	vertical-align: center;
	margin-top: 5px;
	margin-left: 13px;    font-family: "iconfont" !important;
	font-size: 27px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.input1{
    width: 87%;
    height: 38px;
    line-height: 30px;
    font-size: 14px;
    background-color: #E0E0E0;
    border: none;
    border-radius: 20px;
    font-family: iconfont;
    color: #000;
    z-index: 111;
    margin-left: 2%;
    margin-top:2%;
}	
.btn1{
	width: 9%;
	height: 34px;
	/*background-color: red;*/
	border: 1px solid #E3E3E3;
    border-radius: 50%;
    margin-top:2.5%;
	float: right;
}
.btn1 i{
	font-size: 25px;
	line-height: 25px;
	margin-left: 15%;
}
.liulei{
    border-top: 1px solid #E3E3E3;
	margin-top: 10px;
	width:100%;
	height: 90px;
	background-color:#FFFFFF;
	clear: both;
    border-bottom: 1px solid #E3E3E3;
}
.liulei ul{
	list-style: none;
}
.liulei ul li{
	float: left;
	padding: 5px;	
	width: 30%;
}
.liulei ul li:nth-child(2){
	border-left:1px solid #E3E3E3;
	border-right:1px solid #E3E3E3;
}

.liulei ul li:nth-child(4){
	border-top:1px solid #E3E3E3;
}
.liulei ul li:nth-child(5){
	border-left:1px solid #E3E3E3;
	border-right:1px solid #E3E3E3;
	border-top:1px solid #E3E3E3;
}
.liulei ul li:nth-child(6){
	border-top:1px solid #E3E3E3;
}
.liulei ul li .iconfont,.liulei ul li span{
	color:#FF7F00;
}
.liulei ul li:nth-child(2) .iconfont,.liulei ul li:nth-child(2) span{
	color:#66CD00;
}
.liulei ul li:nth-child(3) .iconfont,.liulei ul li:nth-child(3) span{
	color:#7EC0EE;
}
.liulei ul li:nth-child(4) .iconfont,.liulei ul li:nth-child(4) span{
	color:#CD00CD;
}
.liulei ul li:nth-child(5) .iconfont,.liulei ul li:nth-child(5) span{
	color:#668B8B;
}
.liulei ul li:nth-child(6) .iconfont,.liulei ul li:nth-child(6) span{
	color:#CD2626;
}
.liulei ul li span{
	margin-left:3px;
	font-size:15px;
}
.fujinyaofang{
	margin-top: 15px;
	width: 100%;
	min-height: 240px;
	background-color:#FFFFFF;
    border-bottom: 1px solid #E3E3E3;
}
.fujinyaofang .wenzi{
	height: 40px;
	width: 100%;
	border-bottom: 1px solid #E3E3E3;
}
.fujinyaofang .wenzi span:first-child{
	font-size: 18px;
	display: block;
	float: left;
	height: 30px;
	width: 40%;
	color:#66CD00;
	line-height: 30px;
	padding-left: 20px;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	margin-top: 10px;
}
.fujinyaofang .wenzi .iconfont{
	margin-top: 10px;
	color:#66CD00;
	margin-right:30px;
	float: right;
}
.fujinyaofang .sjnr{
    width:100%;
    height:200px;
    /*background-color: red;*/
}
.fujinyaofang .sjnr li{
    width:100%;
    height:60px;
    /*background-color: black;*/
    border-bottom: 1px solid #E3E3E3;
}
.fujinyaofang .sjnr li:nth-child(2),.fujinyaofang .sjnr li:nth-child(3){
	margin-top: 10px;
}
.fujinyaofang .sjnr li:nth-child(3){
	border-bottom: none;
}
.fujinyaofang .sjnr li img{
	width: 15%;
	height: 40px;
	margin: 10px 20px 10px 25px;
	border-radius: 50%;
	float: left;
}
.fujinyaofang .sjnr li .zong{
	width: 45%;
	height: 50px;
	padding-top:8px; 
	/*background-color: red;*/
	float: left;
}
.fujinyaofang .sjnr li .zong .storesNames{
	margin: 0 0 5px 15px; 
	font-size: 14px;
	/*font-weight: bold;*/
	color:#545454;
}
.fujinyaofang .sjnr li .zong .julihaoping{
	font-size: 12px;
	margin-left: 20px; 
}
.fujinyaofang .sjnr li .jdkk{
	width: 16%;
	height: 20px;
	padding:1% 0 0.5% 2%; 
	margin-top:4%; 
	font-size: 13px;
	font-weight: bold;
	margin-right: 3%;
	/*background-color: black;*/
	float: right;
	border: 1px solid #FF7F00;
	color: #FF7F00;;
	border-radius: 15px;
}
.gfjb{
	width: 100%;
	height: 140px;
	margin-top:15px;
	background-color:#FFFFFF;
    border-bottom: 1px solid #E3E3E3;
}
.gfjb .gfjbTitle,.rmpp .rmppTitle{
	width: 94%;
	height: 35px;
	line-height: 35px;
	color:#66CD00;
	font-size: 18px;
	padding-left: 20px;
    border-bottom: 1px solid #E3E3E3;
}
.gfjb ul{
	display: flex;
	width: 100%;
	height: 35px;
	line-height: 35px;
	text-align: center;
	font-family: Arial,Verdana,Sans-serif;
	color:#7A8B8B;	
	font-size: 13px;
	list-style: none;
}
.gfjb ul li{
	flex: 1;
	/*background-color: red;*/
	float: left;
}
.rmpp{
	margin-top:15px;
	width: 100%;
	height: 140px;
	background-color:#FFFFFF;
    border-bottom: 1px solid #E3E3E3;
    margin-bottom: 15px;
}
.rmpp img{
	width: 100%;
	height: 40px;
}
.rmpp img:nth-child(3) {
	margin-top:5px; 
	display: block;
	width: 100%;
	height: 70px;
}
.kuochongdibu{
	height: 55px;
	clear: both;
}
</style>