<template>
  <header ref="scroll" class="md:h-screen h-[300px] relative hero">
    <Client-Only>
      <Swiper
        v-if="banners?.length"
        class="swiper md:!w-screen md:!h-screen max-md:!absolute w-full h-full"
        :settings="settings"
        v-bind="settings"
        @autoplay-time-left="onAutoplayTimeLeft"
      >
        <SwiperSlide
          v-for="(banner, index) in banners"
          :key="index"
          class="relative md:!w-screen md:!h-screen !h-full !w-full z-1"
        >
          <!--          <NuxtImg-->
          <!--            alt="hero Section image"-->
          <!--            class="bottom-0 md:!w-screen md:!h-screen !h-full !w-full top-0 object-cover"-->
          <!--            :src="banner"-->
          <!--          />-->
          <SectionsMainBanner :banner="banner" />
        </SwiperSlide>
      </Swiper>
    </Client-Only>
  </header>
</template>

<script lang="ts" setup>
import { SectionsMainBanner } from '#components'
import 'swiper/css'
import 'swiper/css/effect-fade'

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import type { IBanner, IResponse } from '~/types/common'

const progressCircle = ref<SVGElement | null>(null)
const progressContent = ref<HTMLElement | null>(null)
const { t } = useI18n()
const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
  if (progressCircle.value) {
    progressCircle.value.style.setProperty('--progress', `${1 - progress}`)
  }
  if (progressContent.value) {
    progressContent.value.textContent = `${Math.ceil(time / 1000)}s`
  }
}
const { locale } = useI18n()
const banners = ref<IBanner[]>()

const settings = {
  pagination: {
    clickable: true,
  },
  effect: 'fade',
  initialSlide: 0,
  navigation: { nextEl: '.living-next-el', prevEl: '.living-prev-el' },
  loop: true,
  modules: [EffectFade, Autoplay, Pagination, Navigation],
  autoplay: {
    delay: 5000,
  },
}

async function getListBanners() {
  await useApi()
    .$get<IResponse<IBanner>>(`${locale.value}/api/main/main-slide/`)
    .then((res) => {
      banners.value = res
    })
}

getListBanners()
</script>
<style>
.swiper .swiper-pagination {
  max-width: 1224px;
  width: 100% !important;
  left: 50% !important;
  transform: translateX(-50%);
  padding-left: 1rem;
  padding-right: 40%;
}
.swiper .swiper-pagi0nation-bullets {
  width: 437px;
  position: absolute;
  z-index: 4;
  display: flex !important;
  gap: 7px;
  bottom: 156px;
  left: 0%;
  transform: translate(-50%, -50%);
}

.swiper .swiper-pagination-bullet {
  position: relative;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.24) !important;
  border-radius: 5px;
  overflow: hidden;
  opacity: 1 !important;
  width: 30%;
  height: 4px;
  z-index: 100;
}

.swiper .swiper-pagination-bullet-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background: #33b34a; /* Progress bar color */
  height: 4px;
  width: 0; /* Start with 0 width */
  border-radius: 4px;
  animation: progressBar 5s linear forwards; /* Adjust duration to autoplay delay */
}

/* Keyframes for the progress animation */
@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .swiper .swiper-pagination-bullets {
    bottom: 10px;
  }
}
</style>
