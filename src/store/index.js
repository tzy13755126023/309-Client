import Vue from 'vue'
import Axios from  'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';

let store = new Vuex.Store({
	state:{
		token:'',
		isLogin:false,
		username:'',
		tel:'',
		address:'',
		userMoney:'',
		//存储购物车数据的数组 如果localStorage有,则为localStorage数据,否则为空
		cartArry:JSON.parse(localStorage.getItem('cartArry')) || [],
		//存储默认地址的数组 如果localStorage有,则为localStorage数据,否则为空
		MorenAddress:JSON.parse(localStorage.getItem('MorenAddress')) || [],
		// userInfo:[],
		MorenCount:''
		
	},
	mutations:{
		//设置vuex的token
		setToken(state,token){
			state.token = token
		},
		//保存用户名
		setUsername(state,username){
			state.username = username
		},
		//保存用户电话
		setTel(state,tel){
			state.tel = tel
		},		
		//保存用户当前余额
		setuserMoney(state,userMoney){
			state.userMoney = userMoney
		},	
		//保存用户地址
		setAddress(state,address){
			state.address = address
		},
		//更新登录状态
		setLogin(state,isLogin){
			state.isLogin = isLogin
		},
		//从GoodsIndo中添加商品到购物车
		addToCart(state,item){
			let goodsInfo =state.cartArry.find(v=>v.storesName==item.storesName&&v.goodsName==item.goodsName)
			if(goodsInfo){
				//设置最大商品数量不能超过库存量
				if(goodsInfo.cartCount<item.kucun){
					goodsInfo.cartCount+=1;
					 Toast('已成功加入购物车！');
				}else{
					MessageBox.alert('最大商品数量不能超过库存量！')
				}
			}else{
				state.cartArry.push({
					storesID:item.storesID,
					storesName:item.storesName,
					yunfei:item.yunfei,
					goodsID:item.goodsID,
					goodsName:item.goodsName,
					goodsimageurl:item.goodsimageurl,
					goodsrules:item.goodsrules,
					goodsprice:item.goodsprice,
					kucun:item.kucun,
					cartCount: 1
				})
				 Toast('已成功加入购物车！');
			}
		},
		//从商品详情页添加商品到购物车
		addToCart2(state,ii){
			console.log(parseInt(ii.MorenCount))
			let goodsInfo =state.cartArry.find(v=>v.storesName==ii.item.storesName&&v.goodsName==ii.item.goodsName)
			if(goodsInfo){
				//设置同一件商品购买最大商品数量不能超过库存量！
				if((parseInt(ii.MorenCount) + goodsInfo.cartCount)<=ii.item.kucun){
					goodsInfo.cartCount+=parseInt(ii.MorenCount);
					Toast('已成功加入购物车！');
				}else{
					MessageBox.alert('同一件商品购买最大商品数量不能超过库存量！')
				}
			}else{
				if(ii.MorenCount<ii.item.kucun){
					state.cartArry.push({
						storesID:ii.item.storesID,
						storesName:ii.item.storesName,
						yunfei:ii.item.yunfei,
						goodsID:ii.item.goodsID,
						goodsName:ii.item.goodsName,
						goodsimageurl:ii.item.goodsimageurl,
						goodsrules:ii.item.goodsrules,
						goodsprice:ii.item.goodsprice,
						kucun:ii.item.kucun,
						cartCount: parseInt(ii.MorenCount)
					})
					Toast('已成功加入购物车！');
				}else{
						MessageBox.alert('最大商品数量不能超过库存量！')
				}

			}
		},
		//购物车商品数量加一
		AddCount(state,index){
			//设置最大商品数量不能超过库存量
			if (state.cartArry[index].cartCount<state.cartArry[index].kucun) {
				state.cartArry[index].cartCount++
			}else{
				MessageBox.alert('最大商品数量不能超过库存量！')
			}
		},
		//购物车商品数量减一
		SubCount(state,index){
			if (state.cartArry[index].cartCount>1) {
				state.cartArry[index].cartCount--
			}else{
   		 		MessageBox('', '不能再减了，商品数量至少为一件!');
   		 		return 1
		  	}
		},
		//点击图片右上角icon删除对应商品
		DeleteGoods(state,index){
			MessageBox.confirm('确定删除该商品吗？','').then(action => {
    		  	 state.cartArry.splice(index,1)
    		  	 //获取localStorage的购物车数据
    		  	 var localCart = (JSON.parse(localStorage.cartArry))
    		  	 // console.log(localCart)
    		  	 //删除选定的index列数据
  				 localCart.splice(index,1)
  				 // console.log(localCart.splice(index,1))
  				 //将删除后的数组重新写进localSotrage
  				 localStorage.setItem('cartArry',JSON.stringify(localCart))
          		 MessageBox('', '删除成功！');
          		 // Toast('删除成功！');
       		 }).catch((error) => {
	          	 MessageBox.alert( '已取消删除！','');
	          	 // Toast('已取消删除！');
			  	 console.log(error)
   		 		});
		},
		//清空购物车
		clearCart(state){
			state.cartArry=[]
		},
		//添加到默认地址
		addToMorenAddress(state,item){
			//localStorage为空,直接设置为默认地址
			if (state.MorenAddress =='') {
				state.MorenAddress.push({
					AddressID :item.AddressID,
					username  :item.username,
					shouhuoren:item.shouhuoren,
					 province :item.province,
					district  :item.district,
						city  :item.city,
					  address :item.address,
					shouhuoTel:item.shouhuoTel,
				})
				Toast('已成功设置为默认地址！')
			}else{
				//localStorage不为空，删除已有的，再添加选中的
				state.MorenAddress=[]
				state.MorenAddress.push({
					AddressID :item.AddressID,
					username  :item.username,
					shouhuoren:item.shouhuoren,
					 province :item.province,
						city  :item.city,
					district  :item.district,
					  address :item.address,
					shouhuoTel:item.shouhuoTel,
				})
				Toast('已成功设置为默认地址！')
			}
		},
		//取消设置为默认地址
		RemoveMorenAddress(state){
			state.MorenAddress=[]
			Toast('已取消设置为默认地址！')
		}
		// getUserinfo(state,data){
  //   		state.userInfo = data
  //   		console.log(state.userInfo)
		// }
	},
	//异步调用mutations中添加购物车方法
	actions:{
		// setUserinfo(context){
		// 	setTimeout(() => {
		// 		  Axios.get('api/getAlluser')
		// 	 		.then((res)=>{
	 //     			 	// console.log(res.data)
	 //              		context.commit('getUserinfo',res.data)
		// 				// state.userInfo = res.data
		// 		}).catch( error => {
		// 				console.log(error)
		// 		})
		// 	}, 1000)
			 	
		// }
	},
	//相当于vue中的计算属性
	getters:{
		//ES6写法
		// countSum:state=>{
		// 	let num = 0
		// 	state.cartArry.forEach((item) => {
		// 	  // Todo...
		// 	  num+=v.cartCount
		// 	})
		// 	return num
		// }
		//计算总个数
		countSum(state){
			let num =0
			state.cartArry.forEach((item) => {
			   num += item.cartCount
			})
			return num
		},
		//计算总价格
		countPrice(state){
			let countPrice = 0
			state.cartArry.forEach((item) => {
		  	   countPrice += item.cartCount * item.goodsprice + item.yunfei
			})
			return countPrice
		},
	}
})

//监听每次调用mutations的时候,都会进入这个方法(利用此方法做数据持久化)
store.subscribe((mutations,state) =>{
	localStorage.setItem('cartArry',JSON.stringify(state.cartArry))
	localStorage.setItem('MorenAddress',JSON.stringify(state.MorenAddress))
})

export default store;