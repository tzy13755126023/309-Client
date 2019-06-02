import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'Index',
      component:  () => import ('../pages/Index'),     
    }, 
    {
      path: '/zhaoyao',
      name: 'ZhaoYao',
      component: () => import ('../pages/ZhaoYao/ZhaoYao'),
    },
    //购物车路由
    {
      path: '/carts',
      name: 'Carts',
      meta: {
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
      component: () => import ('../pages/Carts/Carts'),
    },
    //个人中心
    {
      path: '/mine',
      name: 'Mine',
      // meta:{
      //       requireAuth:true  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: () => import('../pages/Mine/Mine'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>import('../pages/Login/Login'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () =>import('../pages/Register/Register'),
    },
    {
      path:'/setting',
      name:'Setting',
      // meta:{
      //   requireAuth:true
      // },
      component: () =>import('../components/setting')
    },
    {
      path:'/GoodsInfo/:goodsename',
      name:'GoodsInfo',
      component: () =>import('../components/GoodsInfo')
    },
    //精选商品
    {
      path:'/jxsp',
      name:'JXSP2',
      component: () =>import('../components/JXSP2')
    },
    //商家详细信息
    {
      path:'/storeInfo/:storesID',
      name:'StoreInfo',
      component: () =>import('../components/StoreInfo')
    },
    //商家全部商品
    {
      path:'/allStoreGoods/:storesID',
      name:'AllStoreGoods',
      component: () =>import('../components/AllStoreGoods')
    },
    //对应商家分类商品信息
    {
      path:'/storeFenlei/:storesID/:goodstype',
      name:'StoreFenleiGoods',
      component: () =>import('../components/StoreFenleiGoods')
    },
    //找药页面中的商品分类
    {
      path:'/ZhaoyaoFenlei/:goodstype/:index',
      name:'ZhaoyaoFenlei',
      component: () =>import('../components/ZhaoyaoFenlei')
    },
    //找药页面中的高发疾病
    {
      path:'/Gaofajibing/:gaofajibing/:index',
      name:'Gaofajibing',
      component: () =>import('../components/Gaofajibing')
    },
    {
      path:'/searchList/:searchvalue',
      name:'Serach',
      component: () =>import('../components/SerachList')
    },
    //商品详情页
    {
      path:'/goodsxiangqing/:goodsID',
      name:'Goodsxiangqing',
      component: () =>import('../components/Goodsxiangqing')
    },
    //查看全部商品评论
    {
      path:'/allpj/:goodsID',
      name:'AllPJ',
      component: () =>import('../components/AllPJ')
    },
    //我的收藏
    {
      path:'/shoucang',
      name:'ShouCang',
      component: () =>import('../pages/ShouCang/ShouCang'),
      redirect:'/shoucang/goodshoucang',
      children:[
          //商家收藏
          {
            path:'storeshoucang',
            name:'StoreShoucang',
            component: () =>import('../components/StoreShoucang'),
          },
          //商品收藏
          {
            path:'goodshoucang',
            name:'GoodsShoucang',
            meta:{
                requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../components/GoodsShoucang'),
          }
      ],
    },
    //浏览记录
    {
      path:'/historyGoogs',
      name:'HistoryGoogs',
      meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () =>import('../components/HistoryGoogs'),
    },
    //意见反馈
    {
      path:'/mine/yjfk',
      name:'YJFK',
      meta:{
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () =>import('../pages/YJFK/YJFK'),
    },
    //联系我们
    {
      path:'/mine/lxwm',
      name:'LianXiWoMen',
      component: () =>import('../pages/LianXiWoMen/LianXiwomen'),
    },
    //关于我们
    {
      path:'/mine/gywm',
      name:'GuanYuWoMen',
      component: () =>import('../pages/GuanYuWoMen/GuanYuWoMen')
    },
    //资质证书
    {
      path:'/mine/zzzs',
      name:'ZiZhiZhengShu',
      component: () =>import('../pages/ZiZhiZhengShu/ZiZhiZhengShu')
    },
    //收货地址
    {
      path:'/shouhuodizhi',
      name:'ShouHuoDiZhi',
      meta:{
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () =>import('../pages/ShouHuoDiZhi/ShouHuoDiZhi')
    },
    //添加收货地址
    {
      path:'/shouhuodizhi/BJshouhuodizhi',
      name:'BJshouhuodizhi',
      // meta:{
      //     requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: () =>import('../pages/ShouHuoDiZhi/BJshouhuodizhi')
    },
    //修改收货地址
    {
      path:'/shouhuodizhi/UpdataShouhuoDiZhi/:item',
      name:'UpdataShouhuoDiZhi',
      component: () =>import('../pages/ShouHuoDiZhi/UpdataShouhuoDiZhi')
    },
    //修改用户信息
    {
      path:'/zhanghuguanli',
      name:'ZhangHuGuanLi',
      meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
      component: () =>import('../pages/ZhangHuGuanLi/ZhangHuGuanLi')
    }, 
    //修改用户真实姓名
    {
      path:'/zhanghuguanli/updatename',
      name:'UpdateName',
      component: () =>import('../pages/ZhangHuGuanLi/UpdateName')
    }, 
    //修改用户手机号
    {
      path:'/zhanghuguanli/updatetel',
      name:'UpdateTel',
      component: () =>import('../pages/ZhangHuGuanLi/UpdateTel')
    }, 
    //修改固话
    {
      path:'/zhanghuguanli/updateguhua',
      name:'UpdateGuHua',
      component: () =>import('../pages/ZhangHuGuanLi/UpdateGuHua')
    },  
    //修改QQ
    {
      path:'/zhanghuguanli/updateqq',
      name:'UpdateQQ',
      component: () =>import('../pages/ZhangHuGuanLi/UpdateQQ')
    }, 
    //修改密码
    {
      path:'/zhanghuguanli/updatepwd',
      name:'UpdatePwd',
      component: () =>import('../pages/ZhangHuGuanLi/UpdatePwd')
    }, 
    //我的订单
    {
      path:'/dingdan',
      name:'Dingdan',
      component: () =>import('../pages/Dingdan/Dingdan'),
      redirect:'/dingdan/daifukuan',
      children:[
          //待付款
          {
            path:'daifukuan',
            name:'DaiFuKuan',
            meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../pages/Dingdan/DaiFuKuan'),
          },
          //待发货
          {
            path:'daifahuo',
            name:'DaiFaHuo',
            meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../pages/Dingdan/DaiFaHuo'),
          },
          //待收货
          {
            path:'daishouhuo',
            name:'DaiShouHuo',
            meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../pages/Dingdan/DaiShouHuo'),
          },
          //待评价
          {
            path:'daipingjia',
            name:'DaiPingJia',
            meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../pages/Dingdan/DaiPingJia'),
          },
           //已完成
          {
            path:'yiwancheng',
            name:'YiWanCheng',
            meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () =>import('../pages/Dingdan/YiWanCheng'),
          },  
      ]
    }, 
    //立即评价
    {
      path:'/lijipingjia/:item',
      name:'LiJiPingJia',
      meta: {
               requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
            },
      component: () =>import('../pages/Dingdan/LiJiPingJia'),
    },
    //所有健康资讯数据
    {
      path:'/healthdatas',
      name:'HealthDatas',
      component: () =>import('../pages/HealthDatas/HealthDatas'),
    },
    //详细健康资讯
    {
      path:'/xxhealthdatas/:healthdatasID',
      name:'XXHealthDatas',
      component: () =>import('../components/XXHealthDatas'),
    },
    //九九包邮模块
    {
      path:'/jiujiubaoyou',
      name:'JiuJiuBaoYou',
      component: () =>import('../pages/JiuJiuBaoyou/JiuJiuBaoYou'),
    },
    //当季必备模块
    {
      path:'/dangjibibei',
      name:'DangJiBiBei',
      component: () =>import('../pages/DangJiBiBei/DangJiBiBei'),
    },
    //商家入驻
    {
      path:'/storesruzhu',
      name:'StoresRuZhu',
      meta:{
          requireAuth:true
      },
      component: () =>import('../components/StoresRuZhu'),
    },
    //获取所有商家信息列表
    {
      path:'/allStore',
      name:'AllStoreInfo',
      component: () =>import('../pages/AllStoreInfo/AllStoreInfo'),
    },
    
    ],

})
