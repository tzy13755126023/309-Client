<template>
	<div class="containUpdataSHDZ">
		<div class="headerUpdataSHDZ">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>收货地址</span>
			<span class="_right" @click="Updata()">
				修改
			</span>
		</div>
		<div class="yangshiDiv">
			<span>姓名</span>
			<input type="text" v-model="shouhuoren" placeholder="请输入姓名" >
		</div>
		<div class="yangshiDiv">
			<span>手机号码</span>
			<input type="text" v-model="shouhuoTel" placeholder="请输收货手机号">
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
		<div class="MorenAddress">
			<el-checkbox    ref="IsChecked" true-label="1" false-label="2" @change="IsMorenAddress(item)">
			设置为默认地址
			</el-checkbox>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Picker } from 'mint-ui';
import myaddress from '../../../static/json/Address3.json' //引入省市区数据
export default{
	name:'UpdataShouhuoDiZhi',
	data(){
		return{
			item:this.$route.params.item.item,
			AddressID:this.$route.params.item.item.AddressID,
			// MorenAddress:{},
			// isTure:ture,
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
			  XxAddress:'',
		}
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
	  	IsMorenAddress(item){
	  		const a1 = this.$refs.IsChecked
	  		// console.log(a1)
  			if (a1.model==1) {
  				// console.log('选中')
  				this.$store.commit("addToMorenAddress",item)
  				//将选中的收货地址ID的morenAddress为'1',其他为0
  				this.$axios.post('/api/UpdataAddress1',{
  					AddressID : item.AddressID
  				})
  				.then( res =>{
  					console.log('默认地址设置为1修改成功。')
  					if (res.data.affectedRows) {
  						this.$axios.post('/api/UpdataAddress0',{
		  					AddressID : item.AddressID
		  				})
		  				.then( res =>{
		  					console.log('其他修改为0成功。')
		  				})
  					}
  				})
  			}else{
  				// console.log('不选中')
  				this.$store.commit("RemoveMorenAddress")
  			}
	  	},
	  	//修改收货地址信息
	  	Updata(){
	  		this.$axios.put('/api/UpdataAddress',{
	  			shouhuoren:this.shouhuoren,
	  			 province :this.province,
	  				city  :this.city,
	  			district  :this.district,
  				  address :this.XxAddress,
	  			shouhuoTel:this.shouhuoTel,
	  			AddressID :parseInt(this.AddressID)
	  		})
	  		.then( res =>{
	  			if (res.data.affectedRows) {
	  				MessageBox('提示','修改地址信息成功！');
	  			}else{
	  				MessageBox('提示','修改地址信息错误，请5s后再重试，谢谢！');
	  			}
	  		})
	  		.catch( error =>{
	  			console.log(error)
	  		})
	  	}
	},
    mounted(){
	    this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
	    this.myAddressSlots[0].defaultIndex = 0 
	    // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
	    //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
	   });
	    //获取从收货地址页面传过来的基本信息
	     this.shouhuoren = this.item.shouhuoren
		 this.shouhuoTel = this.item.shouhuoTel
		 this.XxAddress  = this.item.address
		 // console.log(this.$store.state.MorenAddress)
		 //判断是否已经设置为默认地址  ture表示已经设置了 false表示没有设置
		 // if (this.$store.state.MorenAddress) {
		 // 	this.MorenAddress=this.$store.state.MorenAddress
 		// 	this.isTure = this.MorenAddress[0].AddressID==this.item.AddressID?'ture':'false'
		 // 	console.log(this.isTure)
		 // }
	 },

	components: {
  		'mt-picker': Picker
 	},
}
</script>
<style scoped>
.containUpdataSHDZ{
	width: 100%;
}
.containUpdataSHDZ .headerUpdataSHDZ{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerUpdataSHDZ .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerUpdataSHDZ span{
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
.headerUpdataSHDZ ._right{
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
.MorenAddress{
	margin-top: 20%;
	padding-left: 10%;
	width: 100%;
	height: 40px;
	/*background-color:red;*/
}
</style>