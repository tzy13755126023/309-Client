<template>
	<div>
		<Header/>
		<div class="content">
			<Zjnr1/>
			<Zjnr2/>
			<Zjnr3/>
			<Zjnr4/>
			<JXSP/>
    <!-- <p :key="index" v-for="(item,index) in userData"> {{index}}---{{ item.username}}---{{item.password}}</p> -->
		</div>
		<Footer/>		
	</div>
</template>
<script>
import Header from '../components/Header'
import Zjnr1 from './ZhongJian/Zjnr1'
import Footer from '../components/Footer'
import Zjnr2 from './ZhongJian/Zjnr2'
import Zjnr3 from './ZhongJian/Zjnr3'
import Zjnr4 from './ZhongJian/Zjnr4'
import JXSP from '../components/JXSP'

export default{
	name:'index',
	data(){
		return{
			
		}
	},
	components:{
		Header,
		Footer,
		Zjnr1,
		Zjnr2,
		Zjnr3,
		Zjnr4,
		JXSP,
	},
}	
</script>

<style scoped>
	
.content{
	width: 100%;
	min-height:800px ;
	float: left;
}
</style>