<template>
	<div class="zhong1">	
      <router-link :to="{name:'ZhaoyaoFenlei',params:{goodstype:'ZXYP',index:0}}" tag="li">
          <img src="../../assets/images/zjnr1/spfl.jpg" alt="">
          <span>商品分类</span>
      </router-link>
      <router-link to="/jiujiubaoyou" tag="li"> 
          <img src="../../assets/images/zjnr1/jjby.jpg" alt="">
          <span>九九包邮</span>
      </router-link>
      <router-link to="/healthdatas" tag="li">
          <img src="../../assets/images/zjnr1/jkzx.jpg" alt="">
          <span>健康资讯</span>
       </router-link>
      <router-link to="/dangjibibei" tag="li">
          <img src="../../assets/images/zjnr1/djbb.jpg" alt="">
          <span>当季必备</span>
      </router-link>
      <router-link to="/jxsp" tag="li"> 
          <img src="../../assets/images/zjnr1/jxsp.jpg" alt="">
          <span>精选商品</span>
      </router-link>
     <router-link to="/storesruzhu" tag="li"> 
          <img src="../../assets/images/zjnr1/sjrz.jpg" alt="">
          <span>{{isStoreStatus==1?'我的店铺':'商家入驻'}}</span>
      </router-link>
</div>
</template>
<script>
export default{
  	name:'Zjnr1',
  	data(){
  		return{
          danbaoren:window.localStorage.getItem("username"),
          isStoreStatus:'',         //接收该用户是否通过审核
  		}
  	},
    mounted(){
      //获取商家入驻数据  来判断当前用户是否是入驻商家以及商家状态
      this.$axios.post('/api/GetStoresInfo',{
        danbaoren : this.danbaoren
      })
      .then( res =>{
        if (res.data!='') {
          this.isStoreStatus = res.data[0].storeStatus
        }
      })
      .catch( error =>{
        console.log(error)
      })
    },
}
</script>
<style scoped>
   .zhong1{
	 width: 100%;
	 height: 170px;
	 background-color: #f8ffff;

  }
  .zhong1 li{
    text-align: center;
    width: 33.33%;
    margin-top: 5px;
    height: 77px;
    float: left;
  }
  .zhong1 li a:link{
      color:black;
  }
  .zhong1 li:nth-child(4), .zhong1 li:nth-child(5), .zhong1 li:nth-child(6){

    margin-top: 10px;
  }
  .zhong1 li img{
    margin: 4px 20%;
    width: 60%;
    height: 50px;
  }
</style>