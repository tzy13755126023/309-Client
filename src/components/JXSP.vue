<template>
	<div class="contain">
	 <div class="line4"></div>
		<router-link :to="{name:'GoodsInfo',params:{goodsename:item.goodsEname}}" tag='div' :key="index"
		 v-for="(item,index) in jxspDatas" @click="goodsEname">
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
	name:'JXSP',
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
		goodsEname(event){
			for(let i=0;i<this.jxspDatas.length;i++)
			console.log(this.jxspDatas[i].goodsID)

		}
	},
	components:{
	}

}
</script>
<style scoped>
.contain{
	width: 100%;
	clear: both;
}
.line4{
    width: 100%;
    height: 50px;
    background-image: url("../assets/images/title/title04.jpg");
    background-size: 100%;
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