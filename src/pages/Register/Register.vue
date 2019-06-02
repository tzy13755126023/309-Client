<template>
	<div class="contain">
		<div class="header">
			<router-link to='/mine'><i class="iconfont">&#xe7eb</i></router-link>
			<span class="span1">注册</span>
			<router-link to="/login" tag="span" class="span2">登录</router-link>
		</div>
		<div class="RegForm">
			<el-form status-icon :rules="RegRules" ref="RegForm" :model="RegForm" label-width="0">
				<el-form-item prop="username">
      				<el-input  size="small"  v-model="RegForm.username" auto-complete="off" placeholder="请输入用户名">
      				</el-input>
    			</el-form-item>
    			<el-form-item prop="password">
     				 <el-input size="small" :type="passwordType" v-model="RegForm.password" auto-complete="off" placeholder="请输入密码">
        			<i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
     	 			</el-input>
   	 			</el-form-item>
   	 			<el-form-item prop="repassword">
     				 <el-input size="small" :type="passwordType" v-model="RegForm.repassword" auto-complete="off" placeholder="请输入确认密码">
     	 			</el-input>
   	 			</el-form-item>
   	 			<el-form-item prop="tel">
     				 <el-input size="small"  v-model="RegForm.tel" auto-complete="off" placeholder="请输入电话号码">
     	 			</el-input>
   	 			</el-form-item>
   	 			<el-form-item prop="address">
     				 <el-input size="small"  v-model="RegForm.address" auto-complete="off" placeholder="请输入现居住地址">
     	 			</el-input>
   	 			</el-form-item>
   	 			<el-form-item>
		      		<el-button size="small" class="login-submit" @click.native.prevent="handleReg"><span style="font-size: 15px">注册</span></el-button>
			      	<el-button size="small" class="login-submit" @click="chongZhi"><span style="font-size: 15px">重置</span></el-button>
			    </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { DateTime } from '../../util/DataTime'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default{
	name:'Register',
	data(){
		// 用户名自定义验证规则
	    const validateUsername = (rule, value, callback) => {
	    	 // var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g  //匹配3-10个字母/汉字/数字/下划线
	    	  var pattern = /^[\w]{3,10}$/g
	      if (value==='') {
	        callback(new Error('请输入用户名！'))
	      }else if (!pattern.test(value)) {
        	callback(new Error('请输入3-10个字母/数字/下划线'))
	      }else {
	        // console.log('user', value)
	        this.username = value.trim()
	        callback()
	      }
	    };
	    // 密码自定义验证规则
	    const validatePassword =(rule, value, callback) =>{
	    	var pattern = /^\S{6,12}$/g
	    	if(value===''){
    		   callback(new Error('请输入密码!'))
	    	}else if(!pattern.test(value)){
    		   callback(new Error('请输入6-12个非空白字符!'))
	    	}else{
	    		this.password = value.trim()
    		    callback()
	    	}
	    };
	    // 确认密码自定义验证规则
	    const validaterePassword =(rule,value,callback) =>{
	    	if(!value){
	    		callback(new Error('请输入确认密码！'))
	    	}else if(value!=this.password){
	    		callback(new Error('两次密码输入不一致！'))	
	    	}else{
	    		// this.password = value
    		    callback()
	    	}
	    };
	    // 电话自定义验证规则
	    const validateTel =(rule,value,callback) =>{
	    	if(value===''){
	    		callback(new Error('请输入电话号码！'))
	    	}else{
    			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/g
    			// console.log(reg.test(value));
			if (reg.test(value)){
           	 	callback()
           	 	this.tel = value.trim()
      		}else{
          	  return callback(new Error('请输入正确的手机号'));
          }
        }
      };
	    // 收货地址自定义验证规则
	    const validateAddress =(rule,value,callback) =>{
	    	if(!value){
	    		callback(new Error('请输入您的现居住地址！'))
	    	}else{
    		    callback()
    		    this.address = value.trim()
	    	}
	    };
		return{
	        recordtype:'注册',  
        	DataTime:'',       //获取当前时间
	        fontstyle: {},
	        money:0,  // 注册时的账户金额为0
			RegForm: {
			    username: '',
        		password: '',
        		repassword: '',
        		tel:'',
        		address:'',
      		},
      		RegRules: { // 绑定在form表单中的验证规则
        		username:   [{ required: true, trigger: 'blur', /* message:'请输入正确的用户名'*/validator:validateUsername}],
        		// { required: true, message: '请输入密码', trigger: 'blur' },
          		// { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
       		    password:   [{ required: true, trigger: 'blur',  /*message:'请输入正确的密码'*/ validator:validatePassword}],
        		repassword: [{ required: true, trigger: 'blur',  validator:validaterePassword  }],
        		tel:        [{ required: true, trigger: 'blur',  validator:validateTel         }], 
        		address:    [{ required: true, trigger: 'blur',  validator:validateAddress     }],  		
     	    },
      		passwordType: 'password',
		}
	},
  	props: [],
	methods:{
		// 通过改变input的type使密码可见
    	showPassword() {
     	 this.fontstyle === '' ? (this.fontstyle = 'color: green') : (this.fontstyle = '') // 改变密码可见按钮颜色
     	 this.passwordType === 'text'
      	  ? (this.passwordType = 'password')
      	  : (this.passwordType = 'text')
    },
		
       	//注册提交
        handleReg(){
 			this.$refs.RegForm.validate(valid => {
       		 if (valid) {
	        	console.log(this.username)
	        	console.log(this.password)
	        	console.log(this.tel)
	        	console.log(typeof(this.money))
	        	console.log(this.address)
	        	this.$axios.post("api/getbyusername",{
	        		username:this.username
	        	})
	        	.then( res =>{
	        		// console.log(res.data)
	        		if (res.data.length>0) {
	        			Toast({
		                  	message: '该用户名已存在!',
		                  	iconClass: 'el-icon-close'
		                });
	        		}else{
	        			// console.log('可以注册')
	        			this.$axios.post('api/register',{
	        				username:this.username,
	        				password:this.password,
	        				   tel  :this.tel,
	        				 address:this.address,
	        				 money : parseInt(this.money)
	        			})
	        			.then( res =>{
	        				if(res.data.code==0){
			                    Toast({
				                    message: res.data.message,
				                    iconClass: 'el-icon-check'
				                });
	        					this.$router.push('/login')
	        				}
	        			})
	        			.catch(error =>{
	        				console.log(error)
	        			})
	        			//添加注册日志
			            this.$axios.post('/api/addToRecord',{
			            username:this.username,
			            recordtype:this.recordtype,
			            recordtime:this.DataTime
			            })
			            .then( res =>{
			                if (res.data.affectedRows) {
			                  console.log('添加注册日志成功')
			                }
			            })
			            .catch(error =>{
			               console.log(error)
			            })
	        		}
	        	})
	        }
       })
	},
		//重置方法
		chongZhi(){
			this.$refs.RegForm.resetFields();
	    },
  },
  created() {
		let that = this;
        document.onkeypress = function(e) {
        var keycode = document.all ? event.keyCode : e.which;
          if (keycode == 13) {
            that.handleReg();// 注册方法
             return false;
          }
      }
      let date = new DateTime()
      // 获取当前时间
      this.DataTime = date.getDateTime()  
  },
  mounted(){

  },
}
</script>
<style scoped>
.iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 10px;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.contain{
	width: 100%;
}
.header{
	width: 100%;
	height: 45px;
	line-height: 45px;
	padding: 5px 0;
	position: relative;
}
.header .span1,.header .span2{
	font-size: 18px;
	color:#000000;
}
.header .span1{
	position: absolute;
	left:44%;
}
.header .span2{
	position: absolute;
	right:3%;
}
.RegForm{
	margin-top: 10%;
	width: 80%;
	margin-left:10%;
}
.login-submit{
	margin-top: 15px;
	margin-left: 1%;
	width: 48%;
	height: 35px;
	float: left;
	background-color: rgba(240,0,0,.6);
	border-radius: 15px;
}
</style>