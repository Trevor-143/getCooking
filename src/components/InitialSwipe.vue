<template>
    <swiper
      :spaceBetween="0"
      :centeredSlides="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: false,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(i, index) in images" :key="index" >
        <img :src="i" alt="display image" />
      </swiper-slide>
    </swiper>
  </template>

<script setup >
    import { IonImg } from "@ionic/vue";
    import { ref } from "vue"
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import { Autoplay, Pagination, Navigation } from 'swiper/modules';

    const images = ref([
        "/start/one.webp",
        "/start/two.webp",
        "/start/three.webp",
        "/start/four.webp",
        "/start/five.webp",
        "/start/six.webp",
        "/start/seven.webp",
        "/start/eight.webp",
        "/start/nine.webp",
        "/start/ten.webp"
    ])
    
    const modules = [Autoplay, Pagination, Navigation]
</script>
  
<style scoped>

img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

</style>