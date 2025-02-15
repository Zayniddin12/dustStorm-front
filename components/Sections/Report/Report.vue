<template>
  <section class="bg-gradient pt-[80px]">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-left">
        <h1 class="text-[28px] sm:text-[32px] text-white font-normal">
          {{ $t('Report__Title') }}
        </h1>
        <NuxtLink to="/report" class="flex items-center gap-3 text-white mt-3 sm:mt-0 duration-300 hover:text-gray-200">
          <p class="text-16 sm:text-16 leading-[130%]">
            {{ $t('Report__btn') }}
          </p>
          <span class="icon-chevron text-2xl rotate-180"></span>
        </NuxtLink>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
      <div class="loader"></div>
    </div>

    <div v-else class="flex-y-center w-full pt-[50px] sm:pt-[70px] pb-[80px] sm:pb-[120px]">
      <swiper :space-between="24" :speed="1000" :autoplay="{ delay: 5000, pauseOnMouseEnter: true }" loop
        allow-touch-move slides-per-view="auto" class="w-full h-full" :modules="[Autoplay]" centered-slides>
        <swiper-slide v-for="(item, index) in reports" :key="index" class="!w-fit h-full flex-y-center justify-center">
          <CardsReport :report="item" />
        </swiper-slide>
      </swiper>
    </div>

  </section>
</template>


<script setup lang="ts">
import 'swiper/css';
import { ref, onMounted } from 'vue';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CardsReport from '@/components/Cards/Report.vue';
import NProgress from "nprogress";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const reports = ref([]);
const isLoading = ref(true);

async function fetchReports() {
  try {
    const response = await useApi().$get('/api/main/report/');
    reports.value = response.results;
  } catch (error) {
    console.error('Ошибка при загрузке отчетов:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchReports);
</script>

<style>
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
