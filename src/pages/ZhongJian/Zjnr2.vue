<template>
	<div class="contain">
	 <div class="line1"></div>
		<router-link :to="{name:'GoodsInfo',params:{goodsename:item.goodsEname}}" 
     tag='div' :key="index" v-for="(item,index) in line1Data" >
			<h3>{{item.goodsmiaoshu1}}</h3>
			<span>{{item.goodsmiaoshu2}}</span>
			<img v-lazy="item.goodsimageurl" alt="">
		</router-link>
	</div>
</template>
<script>
export default{
    name:'Zjnr2',
  	data(){
  		return{
  			line1Data:[],
  			loading2: true
  		}
  	},
  	components:{
  	},
  	mounted(){
        setTimeout(() => {
          this.$axios.get("api/selectLine1")
            .then( res =>{
            // console.log(res.data)
             this.line1Data = res.data
            })
            .catch( error =>{
             console.log(error)
            })
         }, 700) 		
	}

}
</script>
<style scoped>
.contain{
	width: 100%;
	height: 300px;
}
.line1{
    width: 100%;
    height: 50px;
    background-image: url("../../assets/images/title/title01.jpg");
    background-size: 100%;
}

/*遍历的第一个div的样式*/
.contain div:nth-child(2){
    width: 50%;
    height: 150px;
	/*background: red;*/
	float: left;
	position: relative;
}
.contain div:nth-child(2)>img{
    width: 50%;
    height: 100px;
    position: absolute;
    right:0;
    bottom: 0
}
/*遍历的第二个div的样式*/
.contain div:nth-child(3){
    width: 50%;
    height: 150px;
	/*background: red;*/
	float: right;
	position: relative;
}
.contain div:nth-child(3)>img{
    width: 70%;
    height: 70px;
    position: absolute;
    right:0;
    bottom: 0
}
.contain div:nth-child(2)>h3,.contain div:nth-child(3)>h3{
  font-size: 13px;
  margin-top: 20px;
  margin-left: 14px;
}
.contain div:nth-child(2)>span,.contain div:nth-child(3)>span{
  font-size: 13px;
  margin-top: 20px;
  margin-left: 14px;
  color: orange;
}
/*遍历的line1 下方四个div的样式*/
.contain div:nth-child(4),.contain div:nth-child(5),.contain div:nth-child(6),.contain div:nth-child(7){
	/*margin-top: 5px;*/
    width: 25%;
    height: 150px;
	/*background: red;*/
	position: relative;
	float: left;
}
.contain div:nth-child(4)>img,.contain div:nth-child(5)>img,.contain div:nth-child(6)>img,.contain div:nth-child(7)>img{
    width: 100%;
    height: 100px;
    position: absolute;
    right:0;
    bottom: 0;
}
.contain div:nth-child(4)>h3,.contain div:nth-child(5)>h3,.contain div:nth-child(6)>h3,.contain div:nth-child(7)>h3{
	margin-top: 5px;
    color: #050505;
    /*display: block;*/
    text-align: center;
     /*font-weight: bold;*/
    font-size: 12px;
 }
 .contain div:nth-child(4)>span,.contain div:nth-child(5)>span,.contain div:nth-child(6)>span,.contain div:nth-child(7)>span{
	margin-top: 2px;
    color: #050505;
    display: block;
    text-align: center;
     /*font-weight: bold;*/
    font-size: 12px;
 }
</style>