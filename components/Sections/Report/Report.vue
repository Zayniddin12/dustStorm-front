<template>
  <div>
    <div
      class="flex-y-center w-full flex-y-center pt-[80px] pb-[120px] bg-gradient"
    >
      <div class="flex justify-between items-center">
        <p class="text-white texgt-[32px] leadig-130">{{ $t('report') }}</p>
      </div>
      <swiper
        :space-between="24"
        :speed="1000"
        :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
        loop
        allow-touch-move
        slides-per-view="auto"
        class="w-full h-full"
        :modules="[Autoplay]"
        centered-slides
      >
        <swiper-slide
          v-for="(item, key) in 10"
          :key
          class="!w-fit h-full flex-y-center justify-center"
        >
          <CardsReport />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>
