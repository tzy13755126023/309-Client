<template>
	<div class="containBJSHDZ">
		<div class="headerBJSHDZ">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>收货地址</span>
			<span class="_right" @click="BaoCun()">
				保存
			</span>
		</div>
		<div class="yangshiDiv">
			<span>姓名</span>
			<input type="text" v-model="shouhuoren" placeholder="请输入收货人姓名" >
		</div>
		<div class="yangshiDiv">
			<span>手机号码</span>
			<input type="text" v-model="shouhuoTel" placeholder="请输收货人联系电话">
		</div>
		<div class="yangshiDiv">
			<span>所在地区</span>
			<i>{{province}} {{city}} {{district}}</i>
		</div>
		<div class="Address">
			<mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>	
		</div>
		<div class="XiangXiAddress">
			<div class="title1">详细地址</div>
			<div class="XxAddress">
				<input type="text" name="XxAddress" v-model="XxAddress" placeholder="请填写详细地址，不少于五字">
			</div>
		</div>
 		<!-- <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p> -->
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Picker } from 'mint-ui';
import myaddress from '../../../static/json/Address3.json' //引入省市区数据
export default{
	name:'BJshouhuodizhi',
	data(){
		return{
			 myAddressSlots: [
		   {
			   flex: 1,
			   defaultIndex: 1, 
			   values: Object.keys(myaddress), //省份数组
			   className: 'slot1',
			   textAlign: 'center',
		   }, {
			   divider: true,
			   content: '-',
			   className: 'slot2',

		   }, {
			   flex: 1,
			   values: [],
			   className: 'slot3',
			   textAlign: 'center'
		   },
		   {
			   divider: true,
			   content: '-',
			   className: 'slot4'
		   },
		   {
			   flex: 1,
			   values: [],
			   className: 'slot5',
			   textAlign: 'center'
		   }
		  ],
			  province:'',      //省
			  city:'',    		//市
			  district:'',      //区/县
			  username:window.localStorage.getItem("username"),
			  shouhuoren:'',
			  shouhuoTel:'',
			  XxAddress:''
	    };			
	},
	methods:{
		goback(){
			this.$router.push('/shouhuodizhi')
		},
		onMyAddressChange(picker, values) {
		  	if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
			   picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
			   picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
			   this.province = values[0];
			   this.city = values[1];
			   this.district = values[2];
	  		}

	  	},
	  	BaoCun(){
	  		const reg = /^1[3|4|5|7|8][0-9]\d{8}$/g     //电话号码正则
	  		var pattern = /^[\w\u4e00-\u9fa5]{5,200}$/g //详细地址正则
	  		if(this.shouhuoren==''){
	  			MessageBox('提示','收货人姓名不能为空！')
	  		}else{
	  			if (this.shouhuoTel=='') {
	  				MessageBox('提示','收货人电话不能为空！')
	  			}else{
	  				if(!reg.test(this.shouhuoTel)) {
	  					MessageBox('提示','请填写正确的手机号！')
	  				}else{		  		
				  		if(this.XxAddress==''){
  							MessageBox('提示','详细地址不能为空！')	
				  		}else{
	  				 		if(!pattern.test(this.XxAddress)){
				  				MessageBox('提示','请填写详细地址，不少于五字！')
					  		}else{
					  			// console.log(this.username)
						  		// console.log(this.shouhuoren)
						  		// console.log(this.shouhuoTel)
						  		// console.log(this.province)
						  		// console.log(this.city)
						  		// console.log(this.district)
						  		// console.log(this.XxAddress)
						  		this.$axios.post('/api/addToAddress',{
						  			username	:this.username,
						  			shouhuoren  :String(this.shouhuoren.trim()),
					  			    province    :String(this.province),
					  				city        :String(this.city),
						  			district	:String(this.district),
						  			address	    :String(this.XxAddress.trim()),
						  			shouhuoTel	:this.shouhuoTel.trim(),
						  			morenAddress:1
						  		})
						  		.then( res =>{
						  			if(res.data.affectedRows){
						  				MessageBox('提示','保存地址成功，我们快去买东西吧！');
						  				this.$router.push('/mine')
						  			}else{
						  				MessageBox('提示','保存错误，请5s后再重试，谢谢！');
						  			}
						  		})
						  		.catch( error =>{
						  			console.log(error)
						  		})


					  		}
				  		}
	  				}
  				}
	  		} 		
	  	}
	},
    mounted(){
	    this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
	    this.myAddressSlots[0].defaultIndex = 0 
	    // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
	    //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
	   });
	 },
	components: {
  		'mt-picker': Picker
 	},
}
</script>
<style scoped>
.containBJSHDZ{
	width: 100%;
}
.containBJSHDZ .headerBJSHDZ{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerBJSHDZ .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerBJSHDZ span{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 4px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 18px;
	font-weight: bold;
	color:#FF7F00;
}
.headerBJSHDZ ._right{
	left: 70%;
	color:#66CD00;
	font-weight: 400;
	letter-spacing: 2px;
	top:0;
}
.yangshiDiv{
	height: 40px;
	line-height: 40px;
	font-size:14px;
	width: 100%;
    border-bottom: 1px solid #E3E3E3;
	/*background-color:red;*/
}
.yangshiDiv span{
	padding-left: 30px;
	display: block;
	float: left;
	width: 25%;
}
.yangshiDiv input{
	display: block;
	width: 60%;
	height: 40px;
	margin-left: 20px;
}
.yangshiDiv i{
	color: red;
}
.Address{
	margin-top: 10px;
	width: 100%;
	height: 180px;
    border-bottom: 1px solid #E3E3E3;
	/*background-color: red;*/
}
.XiangXiAddress{
	margin-top: 5px;
	font-size: 14px;
	width: 100%;
	height: 90px;
    border-bottom: 1px solid #E3E3E3;
}
.XiangXiAddress .title1{
	font-size: 13px;
	height: 40px;
	line-height: 40px;
	padding-left: 30px;
}
.XiangXiAddress .XxAddress{
	height: 50px;
	line-height: 50px;
	padding-left: 30px;
	/*background-color: green;*/
}
.XiangXiAddress .XxAddress input{
	width: 100%;
}
</style>