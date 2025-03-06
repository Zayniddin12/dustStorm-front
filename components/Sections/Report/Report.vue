<template>
  <section class="bg-gradient pt-[80px]">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-left">
        <h1 class="text-[28px] sm:text-[32px] text-white font-normal">
          {{ $t('Report__Title') }}
        </h1>
        <NuxtLink
          to="/report"
          class="flex items-center gap-3 text-white mt-3 sm:mt-0 duration-300 hover:text-gray-200"
        >
          <p class="text-16 sm:text-16 leading-[130%]">
            {{ $t('Report__btn') }}
          </p>
          <span class="icon-chevron text-2xl rotate-180"></span>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="flex flex-nowrap gap-4 justify-center items-center min-h-[200px] pt-[50px] sm:pt-[70px] pb-[80px] sm:pb-[120px]"
    >
      <div v-for="i in 4" :key="i" class="shimmer-card_report_section shrink-0"></div>
    </div>

    <div
      v-else
      class="pt-[50px] sm:pt-[70px] pb-[80px] sm:pb-[120px] container"
    >
      <swiper
        :space-between="24"
        :speed="1000"
        :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
        loop
        allow-touch-move
        slides-per-view="auto"
        class="!ml-0 !overflow-visible"
      >
        <swiper-slide
          v-for="(item, index) in reports"
          :key="index"
          class="!w-fit !overflow-visible"
        >
          <CardsReport :report="item" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import { ref, onMounted } from 'vue'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import CardsReport from '@/components/Cards/Report.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const reports = ref([])
const isLoading = ref(true)

async function fetchReports() {
  try {
    const response = await useApi().$get('/api/main/report/')
    reports.value = response.results
  } catch (error) {
    console.error('Ошибка при загрузке отчетов:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchReports)
</script>

<style>
.shimmer-card_report_section {
  width: 280px;
  height: 220px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200% 100%;
  border-radius: 28px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
