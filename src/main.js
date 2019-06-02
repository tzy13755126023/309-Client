// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from  'axios'
import qs from 'qs'
import jQuery from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' 
import {Loading,Button,Input,Row,Form,FormItem,Icon,Message} from 'element-ui'
import {Checkbox,Select,Option,OptionGroup} from 'element-ui'
import store from './store'
import { MessageBox } from 'mint-ui';
import { Lazyload } from 'mint-ui';
//全局引入 'mint-ui'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.use(VueAwesomeSwiper);Vue.use(Loading.directive);Vue.use(Input);Vue.use(Button);Vue.use(Row);
Vue.use(Form);Vue.use(FormItem);Vue.use(Icon);Vue.use(Checkbox);Vue.use(Lazyload);Vue.use(Option);
Vue.use(OptionGroup);Vue.use(Select);
window.$ = jQuery
Vue.prototype.$axios = Axios;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

// 超时时间
Axios.defaults.timeout = 5000
var loadinginstace
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  loadinginstace = Loading.service({  fullscreen: true ,
                                      text:"拼命加载中",
                                      spinner:"el-icon-loading",
                                      background:"rgba(0, 0, 0, 0.8)",
                                      lock:false,
                                    })

  // 在发送请求之前做些什么
if (config.method=='post'){
    config.data= qs.stringify(config.data)
}if (store.state.token) {  
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `token ${store.state.token}`
    }
    return config;
}, function (error) {
  // 对请求错误做些什么
  loadinginstace.close()
   Message.error({
   message: '加载超时'
   })
  return Promise.reject(error)
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
if(response.status===200||response.status===304){
    setTimeout(() => {
        //响应成功就关闭loading...
        loadinginstace.close()
    }, 500)
}
  return response;


}, function (error) {
  // 对响应错误做点什么
              
 if (error.response) {
            switch (error.response.status) {
                case 401: 
                    // 返回 401 清除token信息并跳转到登录页面(登录超时)
                    store.commit("setToen",'')
                    localStorage.removeItem('token')
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                case 504:
                    setTimeout(() => {
                        loadinginstace.close()
                        MessageBox('','加载数据失败，请检查您的网络设置！')
                    }, 800)
                   
            }

        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

//注册全局的价格过滤器(保留两位小数)
Vue.filter('money',function (value) {
  // return '￥' + Number(value.toFixed(2));
    return '￥' + value.toFixed(2);
}),

//注册全局的距离过滤器(Km)
Vue.filter('juli',function (value) {
  return value + 'Km';
}),
// 注册全局的电话号码过滤器(tel)
Vue.filter('tel',function (value) {
  var str1 = value.substr(3,4);     //截取中间四位号码
  value = value.replace(str1,"****"); //用星号替换
  return value ;
}),
// 注册全局的订单编号过滤器(dingdan)
Vue.filter('dingdan',function (value) {
  
  return value ;
}),
//路由守卫
router.beforeEach((to, from, next) => {  
    store.commit('setToken',localStorage.getItem('token'))
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            router.app.$message({
              type:'warning',
              message:'请您先登录!'
            })
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })

            }
    }
    else {
        next();
    }
})

// // 注册一个全局自定义指令 `v-focus`
// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


