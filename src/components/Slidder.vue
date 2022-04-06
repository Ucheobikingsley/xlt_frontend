<template>
  <div class="components entry slidder">
    <swiper
      :space-between="50"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :centered-slides="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      class="swiper"
      @swiper="onSwiper"
    >
      <swiper-slide
        ><img src="../assets/images/jpegs/2.jpg"
      /></swiper-slide>
      <swiper-slide
        ><img src="../assets/images/jpegs/3.jpg"
      /></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { defineComponent, computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const stringImg = ref('../assets/images/');
    const dataValue = computed(() => [
      {
        name: 'jpegs/2.jpg',
      },
      {
        name: 'jpegs/3.jpg',
      },
    ]);
    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    return {
      dataValue,
      onSwiper,
      stringImg,
    };
  },
});
</script>
<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
.components.entry.slidder {
  width: 100%;

  .swiper {
    img {
      width: 100%;
      // min-height: 500px;
    }
  }
}
</style>
