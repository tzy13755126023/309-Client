<template>
  <router-link to="/healthdatas" tag="div" class="swiper-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide ><img src="../assets/images/slideshow/lunbotu01.jpg" alt=""></swiper-slide>
      <swiper-slide ><img src="../assets/images/slideshow/lunbotu02.jpg" alt=""></swiper-slide>
      <swiper-slide ><img src="../assets/images/slideshow/lunbotu03.jpg" alt=""></swiper-slide>
      <swiper-slide ><img src="../assets/images/slideshow/lunbotu04.jpg" alt=""></swiper-slide>
      <swiper-slide ><img src="../assets/images/slideshow/lunbotu05.jpg" alt=""></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>  <!-- 标页码 -->
      <div class="swiper-button-prev" slot="button-prev"></div> <!-- 上一项 -->
      <div class="swiper-button-next" slot="button-next"></div> <!-- 下一项 -->
    </swiper>
    <!-- <input class="input1" type="text" :placeholder='icon'/> -->
  </router-link>
</template>
<script>
  import "../assets/css/iconfont.css";
  export default {
    name: "Header",
    data(){
      return {
        swiperOption: {
          autoplay:true,//等同于以下设置
          /*autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            },*/
          notNextTick: true,
          speed: 1000,
          loop: true,
          effect : 'coverflow',
          pagination: {
            el: '.swiper-pagination'
          },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
       },
        // icon:'  \ue69d     请输入 批准文号、商品名、症状',
      }
    },
   
  }


</script>

<style scoped>
  .swiper-container{
    width: 100%;
    height: 230px;
    position: relative;
    z-index: 100;
  }
.input1{
   width: 94%;
   height: 30px;
  background-color: white;
  border: none;
  border-radius: 5%;
  font-family: iconfont;
  fone-size:25px;
  z-index: 111;
  position: absolute;
  left: 3%;
  top:1%;
}

  .swiper-container img{
    width: 100%;
    height: 100%;
  }
</style>
