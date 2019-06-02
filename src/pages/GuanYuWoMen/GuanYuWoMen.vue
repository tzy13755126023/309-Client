<template>
	<div class="containGYWM">
		<div class="headerGYWM">
			<i class="iconfont" @click="goback()">&#xe7eb</i>
			<span>关于我们</span>
		</div>
		<div class="DaYi">
			<div class="Miaoshu">
				<span>那年大一，我们十八</span>
			</div>
			<div class="swiper-container">
				<swiper :options="swiperOption1" ref="mySwiper1">
			      <!-- slides -->
			      <swiper-slide ><img src="../../assets/images/gywm/a1.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a3.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a2.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a4.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a5.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a6.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/a7.jpg" alt=""></swiper-slide>
			      <!-- Optional controls -->
			      <div class="swiper-pagination"  slot="pagination"></div>  <!-- 标页码 -->
			    </swiper>
			</div>
		</div>

		<div class="DaEr">
			<div class="Miaoshu">
				<span>那年大二，我们十九</span>
			</div>
			<div class="swiper-container">
				<swiper :options="swiperOption2" ref="mySwiper2">
			      <!-- slides -->
			      <swiper-slide ><img src="../../assets/images/gywm/b6.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b3.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b2.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b4.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b5.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b1.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/b7.jpg" alt=""></swiper-slide>
			      <!-- Optional controls -->
			      <div class="swiper-pagination"  slot="pagination"></div>  <!-- 标页码 -->
			    </swiper>
			</div>
		</div>
		<div class="DaSan">
			<div class="Miaoshu">
				<span>那年大三，我们二十</span>
			</div>
			<div class="swiper-container">
				<swiper :options="swiperOption3" ref="mySwiper3">
			      <!-- slides -->
			      <swiper-slide ><img src="../../assets/images/gywm/c1.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c3.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c2.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c4.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c5.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c6.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/c7.jpg" alt=""></swiper-slide>
			      <!-- Optional controls -->
			      <div class="swiper-pagination"  slot="pagination"></div>  <!-- 标页码 -->
			    </swiper>
			</div>
		</div>
		<div class="DaSi">
			<div class="Miaoshu">
				<span>那年大四，我们二一</span>
			</div>
			<div class="swiper-container">
				<swiper :options="swiperOption4" ref="mySwiper3">
			      <!-- slides -->
			      <swiper-slide ><img src="../../assets/images/gywm/d1.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d3.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d2.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d4.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d5.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d6.jpg" alt=""></swiper-slide>
			      <swiper-slide ><img src="../../assets/images/gywm/d7.jpg" alt=""></swiper-slide>
			      <!-- Optional controls -->
			      <div class="swiper-pagination"  slot="pagination"></div>  <!-- 标页码 -->
			    </swiper>
			</div>
		</div>
		<div class="kuochongdibu"></div>
	</div>
</template>
<script>
export default{
	name:'GuanYuWoMen',
	data(){
		return{
			swiperOption1: {
	            autoplay:true,//等同于以下设置
	           /*autoplay: {
	            delay: 3000,
	            stopOnLastSlide: false,
	            disableOnInteraction: true,
	            },*/
	            notNextTick: true,	
	            speed: 1500,
	            loop: true,
	            effect : 'coverflow',  //切换效果
	            slidesPerView : 2,
				centeredSlides : true,
	        coverflowEffect: {
			    rotate: 30,
			    stretch: 10,
			    depth: 60,
			    modifier: 2,
			    slideShadows : true
		    },
            pagination: {
                el: '.swiper-pagination'
            },
		},
			swiperOption2: {
	            autoplay:true,//等同于以下设置
	           /*autoplay: {
	            delay: 3000,
	            stopOnLastSlide: false,
	            disableOnInteraction: true,
	            },*/
	            notNextTick: true,	
	            speed: 2000,
	            loop: true,
	            effect : 'coverflow',  //切换效果
	            slidesPerView : 2,
				centeredSlides : true,
	        coverflowEffect: {
			    rotate: 40,
			    stretch: 20,
			    depth: 80,
			    modifier: 3,
			    slideShadows : true
		    },
            pagination: {
                el: '.swiper-pagination'
            },
		},
			swiperOption3: {
	            autoplay:true,//等同于以下设置
	           /*autoplay: {
	            delay: 3000,
	            stopOnLastSlide: false,
	            disableOnInteraction: true,
	            },*/
	            notNextTick: true,	
	            speed: 2500,
	            loop: true,
	            effect : 'coverflow',  //切换效果
	            slidesPerView : 2,
				centeredSlides : true,
	        coverflowEffect: {
			    rotate: 50,
			    stretch: 20,
			    depth: 80,
			    modifier: 4,
			    slideShadows : true
		    },
            pagination: {
                el: '.swiper-pagination'
            },
		},
    		swiperOption4: {
	            autoplay:true,//等同于以下设置
	           /*autoplay: {
	            delay: 3000,
	            stopOnLastSlide: false,
	            disableOnInteraction: true,
	            },*/
	            notNextTick: true,	
	            speed: 3000,
	            loop: true,
	            slidesPerView : 2,
				centeredSlides : true,
	        	effect : 'coverflow',  //切换效果
			    coverflowEffect: {
				    rotate: 40,
				    stretch: 20,
				    depth: 80,
				    modifier: 4,
				    slideShadows : true
		    },
            pagination: {
                el: '.swiper-pagination'
            },
        },
		}
	},
	methods:{
		goback(){
			this.$router.push('/mine')
		}
	}
}
</script>
<style scoped>
.containGYWM{
	width: 100%;
}
.containGYWM .headerGYWM{
	height:40px;
	line-height: 40px;
	width:100%;
	background-color: #ffff;
	position: relative;
    border-bottom: 1px solid #E3E3E3;
}
.headerGYWM .iconfont{
	display: inline-block;
	vertical-align: center;
	font-family: "iconfont" !important;
	margin-left: 3%;
	font-size: 22px;
	font-weight: bold;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.headerGYWM span{
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
.DaYi,.DaEr,.DaSan,.DaSi{
	border-top: 1px solid #E3E3E3;
	border-bottom: 1px solid #E3E3E3;
	background-color: rgba(1,0,0,.01);
	width: 100%;
	height: 260px;
}
.DaYi{
	border-top: none;
}
.DaEr,.DaSan,.DaSi{
	margin-top: 10px;
}
.DaYi .Miaoshu,.DaEr .Miaoshu,.DaSan .Miaoshu,.DaSi .Miaoshu{
	height:40px;
	text-align:center;
}
.DaYi .Miaoshu span,.DaEr .Miaoshu span,.DaSan .Miaoshu span,.DaSi .Miaoshu span{
	color: #000;
	letter-spacing: 2px;
	font-size: 16px;
	line-height: 40px;
}
.swiper-container{
	width: 100%;
	height: 220px;
}
.swiper-container img{
	/*margin-left: 10%;*/
	width: 100%;
	height:220px;
}
.kuochongdibu{
	width: 100%;
	height: 65px;
	clear: both;
}
</style>