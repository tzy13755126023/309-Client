<template>
	<div class="containStoresRuzhu">
		<div class="headerStoresRuzhu">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span class="span1">{{this.isDanbaorenData.length!=0?'我的店铺':'商家入驻'}}</span>
			<span class="span2" v-if="this.isDanbaorenData.length==0" @click="HandleRuZhu()">提交</span>
			<img src="../../static/favicon.jpg" alt="" v-else>
		</div>
		<!-- 如果是已通过审核的商家则显示商家基本信息 -->
		<div v-if="this.isStoreStatus==1">
			<div  class="ShowStores" v-for="item in isDanbaorenData" >
				<div class="shang">
					<img v-lazy="item.imagesurl">
					<span class="StoreName">{{item.storesName}}</span>
				</div>
				<ul class="xia">
					<li>
						<span>{{item.haoping}}分</span>
						<span>客户服务</span>
					</li>
					<li>
						<span>{{item.haoping}}分</span>
						<span>发货速度</span>
					</li>
					<li>
						<span>{{item.haoping}}分</span>
						<span>物流速度</span>
					</li>
					<li>
						<span>{{item.haoping}}分</span>
						<span>商品包装</span>
					</li>
				</ul>
			</div>
			<div class="liulei">
	 			<li><span>中西药品</span></li>
	 			<li><span>养生保健</span></li>
	 			<li><span>医疗器械</span></li>
	 			<li><span>计生用品</span></li>
	 			<li><span>中药饮品</span></li>
	 			<li><span>美容护肤</span></li>
			</div>	
			<div class="StoreRecommand">
				<span>我的推荐</span>
			</div>
			<div class="StoreRecommandGoods" v-for="items in StoreRecommandGoods" :key ="items.goodsID">
				<img v-lazy="items.goodsimageurl" alt="">	
				<div class="goodsNameAndprice">
					<span>{{items.goodsName}}</span>	
					<span>{{items.goodsprice | money}}</span>
				</div>			
			</div>
			<div class="kuochongdibu"></div>
		</div>
		<!-- 如果是正在待审核的商家则显示此DIV -->
		<div v-if="this.isStoreStatus=='0'">
				<div class="DaiShenhe">
					<p>您提交的申请正在审核中❤❤❤❤❤</p>
					<p>在两个工作日内返回结果❤❤❤❤❤</p>
				</div>
				<div v-for="ApplyInfo in isDanbaorenData" class="ApplyInfo">
					<h1>申请基本信息如下:</h1>
					<p>申请人姓名&nbsp;&nbsp;：{{ApplyInfo.danbaoren}}</p>
					<p>申请商家ID&nbsp;&nbsp;：{{ApplyInfo.storesID}}</p>
					<p>申请商家名&nbsp;&nbsp;：{{ApplyInfo.storesName}}</p>
				</div>

		</div>
		<!-- 如果还不是商家则显示商家入驻 -->
		<div class="showStoresRuzhu" v-if="this.isDanbaorenData.length==0">
			<el-form status-icon :model="StoresRuZhuForm">
				<div class="Divstyle">
					<span>商家ID：</span>
					<input v-model="StoresRuZhuForm.storesID" placeholder="请输入商家ID,类似SJ--,例如SJ1" class="inputStyle">
				</div>
			    <div class="Divstyle">
					<span>商家名称：</span>
					<input v-model="StoresRuZhuForm.storesName" placeholder="请输入商家名" class="inputStyle">
				</div>
				<div class="Divstyle">
					<span>商家好评：</span>
				    <el-select v-model="StoresRuZhuForm.haoping" class=el-select1>
					   <el-option v-for="item2 in haopingLists" :label="item2.label":value ="item2.value"
					   :key="item2.value">
					   </el-option>					    
				    </el-select>
					<span>商家运费：</span>
				    <el-select v-model="StoresRuZhuForm.yunfei" class=el-select1>
					   <el-option v-for="item3 in yunfeiLists" :label="item3.label" :value ="item3.value"
					   :key="item3.value">
					   </el-option>					    
				    </el-select>
				</div>
		        <div class="Divstyle">
		          <span>商家距离：</span>
		          <input v-model="StoresRuZhuForm.juli" placeholder="请输入商家距离" class="inputStyle">
		        </div>
		      	<div class="Divstyle">
		          <span>商家地址：</span>
		          <el-select v-model="StoresRuZhuForm.storeAddress" class="el-select2">
		            <el-option v-for="address in addressData" :label="address.label" :value ="address.value"
		            :key="address.value">
		            </el-option>
		          </el-select>
		        </div>
		        <div class="Divstyle">
		          <span>发货时间	：</span>
		          <el-select v-model="StoresRuZhuForm.fahuoTime" class="el-select2">
		            <el-option v-for="Time in fahuoTimeData" :label="Time.label" :value ="Time.value" 
		            :key="Time.value">
		            </el-option>
		          </el-select>
		      	</div>
		      	<div class="form-group">
					<p class="left">
					    <label class="FileLable">File input:</label>
				   	    <input type="file" name="file" id="file" class="FlieInput">
				    	<span id="result"></span>
					</p>
					<div  class="right">
				    	<img id="img" src="">
					</div>
			    </div>
			</el-form>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui'
export default{
	name:'StoresRuZhu',
	data(){
		return{
			danbaoren:window.localStorage.getItem("username"),
			isStoreStatus:'',					//接收该用户是否通过审核
			isDanbaorenData:{},      			//判断该用户是否已经成为商家的标志
			StoreRecommandGoods:{},  			//接收本商家推荐商品
			storesID :'',            			//接收本商家ID,
			StoresRuZhuForm:{       		    //表单
				storesID:'',         			//商家ID
				storesName:'',       			//商家名
				juli:'',             			//商家距离
				haoping:'4.2',      			//商家好评
				yunfei:'6',        			//商家运费
				storeAddress:'湖南省长沙市',     //商家地址
				fahuoTime:'72小时发货',        	//商家ID
			},
			imagesurl:'',                       //商家图片地址
			storeStatus:0,                      //待审核的商家状态为0(默认)
			//评分数组 
			haopingLists:[
				{ label:"3.8",value:"3.8" },
				{ label:"3.9",value:"3.9" },
				{ label:"4.0",value:"4.0" },
				{ label:"4.1",value:"4.1" },
				{ label:"4.2",value:"4.2" },
				{ label:"4.3",value:"4.3" },
				{ label:"4.4",value:"4.4" },
				{ label:"4.5",value:"4.5" },
				{ label:"4.6",value:"4.6" },
				{ label:"4.7",value:"4.7" },
				{ label:"4.8",value:"4.8" },
				{ label:"4.9",value:"4.9" },
				{ label:"5.0",value:"5.0" }
			],
			//运费数组
			yunfeiLists:[
				{ label:"￥6", value:"6" },
				{ label:"￥7", value:"7" },
				{ label:"￥8", value:"8" },
				{ label:"￥9", value:"9" },
				{ label:"￥10",value:"10" },
				{ label:"￥12",value:"12" },
				{ label:"￥13",value:"13" },
				{ label:"￥14",value:"14" },
			],
			//商家地址数组
			addressData:[
				{ label:"湖南省长沙市", value:"湖南省长沙市" },
				{ label:"湖南省宁乡市", value:"湖南省宁乡市" },
				{ label:"湖南省湘潭市", value:"湖南省湘潭市" },
				{ label:"湖南省株洲市", value:"湖南省株洲市" },
				{ label:"湖北省荆州市", value:"湖北省荆州市" },
				{ label:"四川省成都市", value:"四川省成都市" },
				{ label:"湖北省武汉市", value:"湖北省武汉市" },
				{ label:"广州省广州市", value:"广州省广州市" },
			],
			//发货时间数组
			fahuoTimeData:[
				{ label:"24小时发货", value:"24小时发货" },
				{ label:"48小时发货", value:"48小时发货" },
				{ label:"72小时发货", value:"72小时发货" },
				{ label:"一天内发货", value:"一天内发货" },
				{ label:"两天内发货", value:"两天内发货" },
				{ label:"三天内发货", value:"三天内发货" },
				{ label:"一周内发货", value:"一周内发货" },
			],
			
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
		//上传图片的业务逻辑函数
    	uploadFile(){
    	  var that = this;  //保存this,让它指向vue实例
	      //上传图片的input
	      var file = document.getElementById("file")
	      if (file!=null) {
		      //因为准备用post提交，又因为图片的内容比较大，所以我们选择使用formdata来承载数据
		      //创建formdata对象
		      var formData = new FormData();
		      //给formdata对象中放入数据(键值对的方式)
		      formData.append('file',file.files[0]);
		      //提交请求
		      $.ajax({
		        url: '/api/upload',//请求路径
		        type: 'POST',
		        data: formData,
		        async:false,        //将ajax设置为同步请求,如果ajax是异步请求,下面this.imageurl得不到数据，
		                            //即javascript是非阻塞运行的，在$.ajax还没运行完，命名可能就执行了，
		        contentType: false,//为了让浏览器根据传入的formdata来判断contentType
		        processData: false,//同上
		        // 原因在于在ajax的success函数中，this的指向不再是vue的实例
		        success: function(data){
		          if(200 === data.code) {
		            $('#result').html("上传成功！");
		            $('#img').attr('src','/api'+data.data);
		          	that.imagesurl = "http://localhost:3000"+data.data
		          } else {
		            $('#result').html("上传失败！");
		          }
		        },
		        error: function(){
		          $("#result").html("服务器通信错误!");
		        }
		      });
	  		}
	    },
	    //给按钮添加点击事件
		HandleRuZhu(){
	    	var pattern1 = /^[SJ]{2}[\d]{1,3}$/g       //验证SJ+数字的商家ID
	    	var pattern2 = /^[\u4e00-\u9fa5]{6,10}$/g  //验证6-10汉字
	    	var pattern3 = /^[0-9]+(.[0-9]{1,2})?$/    //验证有1-2位小数的正实数
		    if (this.StoresRuZhuForm.storesID=='') {
		    	Toast({
                  	message: '请输入商家ID！',
                  	iconClass: 'el-icon-close'
	                })
	    	}else if(!pattern1.test(this.StoresRuZhuForm.storesID)){
    			Toast({
                  	message: '请输入类似SJ-的商家ID,如SJ1❤❤❤❤❤!',
                  	iconClass: 'el-icon-close'
	                })
	    	}else if (this.StoresRuZhuForm.storesName=='') {
	    		Toast({
                  	message: '请输入商家名！',
                  	iconClass: 'el-icon-close'
	                })
	    	}else if(!pattern2.test(this.StoresRuZhuForm.storesName)){
    			Toast({
                  	message: '请输入6-10个中文的商家名❤❤❤❤❤!',
                  	iconClass: 'el-icon-close'
	                })
	    	}else if (this.StoresRuZhuForm.juli=='') {
	    		Toast({
                  	message: '请输入商家距离！',
                  	iconClass: 'el-icon-close'
	                })
	    	}else if(!pattern3.test(this.StoresRuZhuForm.juli)){
    			Toast({
                  	message: '请输入1-2位小数的正实数❤❤❤❤❤!',
                  	iconClass: 'el-icon-close'
	                })
	    	}else{
	    		//判断商家ID是否被占用
	    		this.$axios.post('/api/isStoreID',{
	    			storesID : this.StoresRuZhuForm.storesID
	    		})
	    		.then( res =>{
	    			//可用的商家ID
	    			if (res.data.code==0) {
	    				this.uploadFile()
						//申请商家入驻(添加商家)
						this.$axios.post('/api/addStores',{
							 storesID   : this.StoresRuZhuForm.storesID,
							storesName  : this.StoresRuZhuForm.storesName,
							  haoping   : this.StoresRuZhuForm.haoping,
							imagesurl   : this.imagesurl,
							storeStatus : this.storeStatus,
							   juli     : this.StoresRuZhuForm.juli,
							  yunfei    : this.StoresRuZhuForm.yunfei,
							storeAddress: this.StoresRuZhuForm.storeAddress,
							 fahuoTime  : this.StoresRuZhuForm.fahuoTime,
							  danbaoren : this.danbaoren
						})
						.then( res =>{
							if (res.data.affectedRows) {
								Toast({
				                  	message: '已成功申请商家入驻！',
				                  	iconClass: 'el-icon-check'
				                })
				                //1.5s刷新该页面
				                setTimeout(() => {
				                	this.$router.go(0)
				                }, 1500)
							}else{
								Toast({
				                  	message: '申请商家入驻失败！',
				                  	iconClass: 'el-icon-close'
				                })
							}
						})
	    			}else{
	    				Toast({
		                  	message: res.data.message,  //该商家ID已被占用！
		                  	iconClass: 'el-icon-close'
	                	})
	    			}
	    		})
	    		.catch( error =>{
	    			console.log(error)
	    		})
   		 	
	    	}

		}
	},
	mounted(){
		//获取商家入驻数据  来判断当前用户是否是入驻商家以及商家状态
		this.$axios.post('/api/GetStoresInfo',{
			danbaoren : this.danbaoren
		})
		.then( res =>{
			this.isDanbaorenData = res.data
			//如果有数据
			if (this.isDanbaorenData!='') {
				this.storesID = res.data[0].storesID
				this.isStoreStatus = res.data[0].storeStatus
				// console.log(typeof(this.isStoreStatus))
				//获取商家推荐商品信息  写在StoreRecommandGoods里
				this.$axios.get("/api/StoreRecommandGoods/"+this.storesID+"")
				.then( res =>{
					this.StoreRecommandGoods = res.data
				})
				.catch( error =>{
					console.log(error)
				})
			}
		})
		.catch( error =>{
			console.log(error)
		})

	}
}
</script>
<style scoped>
.containStoresRuzhu{
	width: 100%;
}
.containStoresRuzhu .headerStoresRuzhu{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerStoresRuzhu .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerStoresRuzhu .span1{
	position: absolute;
	height:40px;
	width: 40%;
	letter-spacing: 2px;
	text-align: center;
	left:30%;
	top:0;
	font-size: 17px;
	font-weight: bold;
	color:#FF7F00;
}	
.headerStoresRuzhu .span2{
	position:absolute;
	letter-spacing: 2px;
	top:0px;
	right:1%;
	font-size: 17px;
	font-weight: bold;
	color:#000;
	width: 40px;
	height: 40px;
}
.headerStoresRuzhu img{
	position:absolute;
	top:0px;
	right:1%;
	width: 40px;
	height: 40px;
}
.ShowStores{
	width: 100%;
	height: 150px;
	background-color:#fff;
	border-bottom:1px solid #E3E3E3;
}
.ShowStores .shang{
	width: 100%;
	height: 90px;
	position: relative;
	background-color:#33ff99;
}
.ShowStores .shang img{
	margin:20px 22px;
	width: 75px;
	height: 50px;
	border-radius: 50%;
}
.ShowStores .shang .StoreName{
	display: block;
	width: 50%;
	height: 90px;
	font-size: 17px;
	line-height: 90px;
	text-align: center;
	position: absolute;
	top:0;
	left:35%;
}
.ShowStores .xia{
	width: 100%;
	height: 60px;
	display:flex;
}
.ShowStores .xia li{
	height: 60px;
	flex:1;
	text-align:center;
	border-right: 1px solid #E3E3E3; 
	/*background-color:red;*/
}
.ShowStores .xia li span{
	display:block;
	margin-top: 5px;
	font-size: 15px;
}
.ShowStores .xia li span:last-child{
	font-size: 13px;
	margin:8px;
	color:#668B8B;
}
.containStoresRuzhu .liulei{
	border-top: 1px solid #E3E3E3;
	margin-top: 10px;
	width: 100%;
	height: 80px;
	background-color:#fff;
}
.containStoresRuzhu .liulei li{
	text-align: center;
	float:left;
	display: block;
	width: 33%;
	font-size: 15px;
	height: 40px;
	line-height: 40px;
	border-right: 1px solid #E3E3E3;
}
.containStoresRuzhu .liulei li:nth-child(4),.containStoresRuzhu .liulei li:nth-child(5){
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
}
.containStoresRuzhu .liulei li:nth-child(6){
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;	
}
.containStoresRuzhu .liulei li:nth-child(3),.containStoresRuzhu .liulei li:nth-child(6){
	border-right:none;
}
.containStoresRuzhu .StoreRecommand{
	margin-top: 5px;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	font-weight: bold;
	letter-spacing: 2px;
	padding-left: 5%;
	color: #FF7F00;
	border-bottom: 1px solid #E3E3E3;
}
.containStoresRuzhu .StoreRecommandGoods{
	margin-bottom: 7px;
	width: 49.5%;
	height: 200px;
	float: left;
}
.containStoresRuzhu .StoreRecommandGoods:nth-child(even){
	margin-right:1%;
}
.StoreRecommandGoods img{
	margin:10% 25% 5%; 
	width: 50%;
	height: 100px;
}
.StoreRecommandGoods .goodsNameAndprice{
	text-align: center;
	width: 100%;
	height: 80px;
}
.StoreRecommandGoods .goodsNameAndprice span{
	font-size: 14px;
	text-align: center;
	display: block;
	width: 100%;
	height: 30px;
	line-height: 25px;
}
.StoreRecommandGoods .goodsNameAndprice span:last-child{
	height: 40px;
	color: #FF7F00;
}
.kuochongdibu{
	width: 100%;
	height: 70px;
	border-top: 1px solid #E3E3E3;
	clear: both;
}
.showStoresRuzhu{
	width:100%;		
}
.el-form{
	width:100%;
	margin:10% 0;
}
.Divstyle{
	width: 100%;
	height: 35px;
	font-size:14px;
	margin-bottom:4%;
}
.showStoresRuzhu .Divstyle:nth-child(3){
	height: 40px;
	line-height: 40px;
}
.Divstyle span{
	display: block;
	width: 22%;
	margin-left:6.5%;
	text-align: center;
	height: 30px;
	line-height: 30px;
	float: left;
}
.showStoresRuzhu .Divstyle:nth-child(3) span{
	line-height: 40px;
}
.showStoresRuzhu .Divstyle:nth-child(3) span:nth-child(3){
	margin-left:2%;
}
.Divstyle .inputStyle{
	width:59%;
	height: 30px;
	padding-left: 5%;
	margin-left: 2%;
	border-radius: 20px;
	font-size:13px;
	color: red;
	border:1px solid #E3E3E3;
}
.form-group{
	width:100%;
	height: 120px;
	border-top: 1px solid #E3e3e3;
	border-bottom: 1px solid #E3e3e3;
}
.form-group .left{
	float: left;
	width: 52%;
	height: 120px;
}
.form-group .right{
	width: 47%;
	height: 120px;
	float: right;
}
.form-group .right img{
	margin: 5% 10% 0 0%;
	width: 80%;
	height:90%;
	border-radius: 50%;
}
.left .FileLable,.left .FlieInput,.left #result{
	display: block;
	font-size: 13px;
	float: left;
	padding: 5% 3%;
	margin-left:13%;
}
.left .FlieInput{
	width:100%;
}
.left #result{
	font-size:14px;
	height: 20px;
	line-height: 10px;
	color: rgb(255,0,0);
}
.DaiShenhe{
	width:100%;
}
.DaiShenhe p{
	text-align: center;
	font-size: 16px;
	height: 35px;	
	line-height: 35px;
	color: rgb(255,0,0);
}
.DaiShenhe p:first-child{
	margin-top:8%;
}
.ApplyInfo{
	margin-top:5%;
	color: #000;
	text-align: left;
	font-size: 14px;
	height: 35px;	
	line-height: 35px;
}
.ApplyInfo h1{
	font-size:17px;
	letter-spacing: 0.1rem;
	padding-left: 6%;
}
.ApplyInfo p{
	padding-left: 16%;
}
</style>
