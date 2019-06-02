<template>
	<div class="contain">
		<div class="header">
      <i class="iconfont" @click="goback">&#xe7eb</i>
      <span class="span1">登录</span>
      <router-link to="/register" tag="span" class="span2">注册</router-link>
		</div>
		<div class="loginType">
			<li>
				<img src="../../assets/images/loginType/qq.png" alt="">
				<p class="title">QQ</p>
			</li>
			<li>
				<img src="../../assets/images/loginType/wechat.png" alt="">
				<p class="title">微信</p>
			</li>
			<li>
				<img src="../../assets/images/loginType/alipay.png" alt="">
				<p class="title">支付宝</p>
			</li>
			<li>
				<img src="../../assets/images/loginType/blog.png" alt="">
				<p class="title">新浪微博</p>
			</li>
		</div>
		<div class="LoginForm">
		<!-- <el-row type="flex" justify="center"> -->
		<el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    		<el-form-item prop="username">
      		<el-input  size="small"  v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
      		</el-input>
    		</el-form-item>
    	<el-form-item prop="password">
     	 <el-input size="small" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        	<i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
     	 </el-input>
   	 	</el-form-item>
    	<el-form-item  prop="verifycode">
     	 <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
      	<el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
    	</el-form-item>
    <el-form-item>
      <div class="identifybox">
        <div>
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
        <el-button type='text' @click="refreshCode"  class="textbtn">看不清，换一张</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button size="small" class="login-submit" @click.native.prevent="handleLogin"><span style="font-size: 15px">登录</span></el-button>
      <el-button size="small" class="login-submit" @click="chongZhi"><span style="font-size: 15px">重置</span></el-button>
    </el-form-item>
  	</el-form>
	<!-- </el-row> -->
		</div>
	</div>

</template>
<script>
import { DateTime } from '../../util/DataTime' 
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import SIdentify from '../../components/identify.vue';
export default{
	data(){
		 // 用户名自定义验证规则
	    const validateUsername = (rule, value, callback) => {
  	      if (value==='') {
  	        callback(new Error('请输入正确的用户名'))
  	      } else {
  	        // console.log('user', value)
  	        this.username =value
  	        callback()
  	      }
	    };
	    //密码自定义验证规则
	    const validatePassword =(rule, value, callback) =>{
  	    	if(value===''){
      		   callback(new Error('请输入密码'))
  	    	}else if(value.length<6){
      		   callback(new Error('密码长度最少为6位!'))
  	    	}else{
  	    		this.password = value
      		   callback()
  	    	}
	    };
	    // 验证码自定义验证规则
	    const validateVerifycode = (rule, value, callback) => {
  	      if (value === '') {
  	        callback(new Error('请输入验证码'))
  	      } else if (value !== this.identifyCode) {
  	        console.log('validateVerifycode:', value)
  	        callback(new Error('验证码不正确!'))
  	      } else {
  	        callback()
  	      }
	    };
		return{
        recordtype:'登录',  
        DataTime:'',        //获取当前时间
        fontstyle: {
        },
        loginForm: {
          username: '',
          password: '',
          verifycode: ''
        },
        checked: false,
        identifyCodes: '1234567890',
        identifyCode: '',
        loginRules: { // 绑定在form表单中的验证规则
          username: [
            { required: true, trigger: 'blur',  /*message:'请输入正确的用户名'*/validator:validateUsername}
          ],
          password: [
             { required: true, trigger: 'blur',  /*message:'请输入正确的用户名'*/validator:validatePassword}
          ],
          verifycode: [
            { required: true, trigger: 'blur', validator: validateVerifycode }
          ]
        },
        passwordType: 'password'
    }
  },
  components: {
      SIdentify
  },
  created() {
      let date = new DateTime()
      // 获取当前时间
      this.DataTime = date.getDateTime()  
  },
  mounted() {
      // 验证码初始化
      this.identifyCode = '',
      this.makeCode(this.identifyCodes, 4)

      //回车键绑定Search方法
      let that = this;
      document.onkeypress = function(e) {
        var keycode = document.all ? event.keyCode : e.which;
          if (keycode == 13) {
            that.handleLogin();// 登录方法
             return false;
          }
      }
  },  
  computed: {
  },
  props: [],
  methods: {
    //返回上一页
    goback(){
      this.$router.go(-1)
    },
    // 通过改变input的type使密码可见
    showPassword() {
      this.fontstyle === '' ? (this.fontstyle = 'color: green') : (this.fontstyle = '') // 改变密码可见按钮颜色
      this.passwordType === 'text'
        ? (this.passwordType = 'password')
        : (this.passwordType = 'text')
    },
    // 点击登入按钮
    handleLogin() {
    	// this.LoginForm.username=this.LoginForm.username.value;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // console.log(this.username);
          // console.log(this.password);
          this.$axios.post("api/login",{
          	username:this.username,
          	password:this.password
          })
          .then( res =>{
          	// return res.data;
          	if(res.data.code==0){   
                console.log(res.data);
                // console.log(res.data.token);
                // console.log(res.data.userInfo[0].username);
                // console.log(res.data.userInfo[0].address);
                // console.log(res.data.userInfo[0].tel);
                //添加登录日志
                this.$axios.post('/api/addToRecord',{
                username:this.username,
                recordtype:this.recordtype,
                recordtime:this.DataTime
                })
                .then( res =>{
                    if (res.data.affectedRows) {
                      console.log('添加登录日志成功')
                    }
                })
                .catch(error =>{
                   // console.log(error)
                 })
               Toast({
                  message: '登录成功！',
                  iconClass: 'el-icon-check'
                });
                //将token值保存到Vuex中
                this.$store.commit("setToken",res.data.token)
                //将登录状态改为true
                // this.$store.commit("setLogin",true)
                window.localStorage.setItem("isLogin",true)
                window.localStorage.setItem('token',res.data.token)
                window.localStorage.setItem('username',this.username)
                window.localStorage.setItem('address',res.data.userInfo[0].address)
                window.localStorage.setItem('tel',res.data.userInfo[0].tel)
                window.localStorage.setItem('guhua',res.data.userInfo[0].guhua)
                window.localStorage.setItem('QQ',res.data.userInfo[0].QQ)
                window.localStorage.setItem('userMoney',res.data.userInfo[0].money)
                //判断路由是否带参，带参就去到重定向参数地址，否则就去首页
                if(this.$route.query.redirect){
                  this.$router.replace({path:this.$route.query.redirect})
                }else{
                  this.$router.push('/index')
                }
      		  }else{
                Toast({
                  message: '用户名或密码不正确！',
                  iconClass: 'el-icon-close'
                });
      		  }
          	})
        }else{
            Toast({
                  message: '请您填写完用户信息再提交！',
                  iconClass: 'el-icon-warning'
                });
            return false
        }
      })
    },
    //重置方法
    chongZhi(){
    	this.$refs.loginForm.resetFields();
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
          // this.randomNum(0, 10)
        ]
      }
      console.log(this.identifyCode)
    }
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
.loginType{
	width: 100%;
	height: 80px;
	display: flex;
	margin: 10px 0 20px 0;
}
.loginType li{
	flex: 1;
	text-align: center;
	/*background-color: red;*/
}

.loginType li img{
	padding:10px 0 8px; 
	width: 45px;
	height: 45px;
}
.loginType li .title{
	font-size: 13px;
}
.LoginForm{
	width: 80%;
	margin-left:10%;
}
.identifybox{
    display: flex;
    height: 35px;
    line-height: 35px;
    margin-left: 10%;
    /*margin-top:7px;*/
}
.iconstyle{
  color:#409EFF;
}
.textbtn{
	margin-left: 10%;
}
.login-submit{
	margin-top: 20px;
	margin-left: 1%;
	width: 48%;
	height: 35px;
	float: left;
	background-color: rgba(240,0,0,.6);
	border-radius: 15px;
}
</style>