<template>
	<div>		
		<ul class="dbdiv">
	    <router-link tag="li" to="/index"><i class="iconfont"> &#xe61e</i>
	      <span>首页 </span>
	    </router-link>
	    <router-link tag="li" to="/zhaoyao"><i class="iconfont" >&#xe69d</i>
	      <span >找药</span>
	    </router-link>
	    <router-link tag="li" to="/carts"><i class="iconfont" >&#xe60c</i>
	        <span>购物车</span>
	        <div class="countSum" v-show="countSum!=0&&this.username">{{countSum}}</div>
 	    </router-link>	  
	    <router-link tag="li" to="/mine"><i class="iconfont" >&#xe658</i>
	      <span>我的</span>
	      	<div class="countMine" v-show="countMine!=0&&this.username">{{countMine}}</div>
	  	</router-link>
	      </ul>
      	<!-- 路由切换 向右滑动 提高用户交互效果 -->
		<transition :name="transitionName">
			<!-- <keep-alive> -->
    			<router-view class="Router"></router-view>
    		<!-- </keep-alive> -->
		</transition>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import "../assets/css/iconfont.css";
export default{
	name:'Footer',
	data(){
		return{
			// countSum:3,
			username:window.localStorage.getItem("username"),
			countMine:'',       //表示未完成订单的数量
		 	transitionName:'slide-right'
		}
	},
	computed:{
		...mapGetters({
			countSum:'countSum'
		})
	},
	mounted(){
		this.$axios.post('/api/selectDiscompleted',{
			username:this.username
		})
		.then( res =>{
			this.countMine = res.data.length
		})
		.catch( error =>{
			console.log(error)
		})
	}
}
</script>
<style scoped>
.iconfont{
	display: block;
	vertical-align: center;
	margin-top: 5px;
	margin-left: 1px;    font-family: "iconfont" !important;
	font-size: 25px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.dbdiv{
	width: 100%;
	height: 55px;
	background-color: aliceblue;
	/*background-color: red;*/
	border-top: .5px solid rgba(23,56,86,0.4);
	z-index: 1000;
	position: fixed;
	display:flex;
	bottom: 0;
}
.dbdiv li{
    text-align: center;
    vertical-align: center;
    /*display: block;*/
    height: 100%;
    flex:1;
}
.dbdiv li span{
    display:block;
    font-size: 16px;
    margin-top:0px;
    margin-left:4px;
}
.dbdiv li .countSum,.dbdiv li .countMine{
	position: absolute;
	top:1%;
	right:28%;
	z-index: 1001;
	width: 30px;
	height: 20px;
	line-height: 20px;
	border-radius: 50%;
	font-size: 14px;
	background-color: red;
	color: #fff;
}
.dbdiv li .countMine{
	top:1%;
	right:3%;
}
.active{
	color:#66CD00 !important;
}
.Router{
	position: absolute;
	width: 100%;
	transition: all 0.8s ease;
}
.slide-left-enter,.slide-right-leave-active{
	opacity: 0;
	-webkit-transform:translate(-100%,0);
	transform:translate(-100%,0);
}
.slide-left-leave-active,.slide-right-enter{
	opacity: 0;
	-webkit-transform:translate(100%,0);
	transform:translate(100%,0);
}
</style>