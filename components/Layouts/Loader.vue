<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="background-shadow-loader w-full h-screen fixed inset-0 z-[99999] flex-center bg-white"
    >
      <div
        class="flex-col justify-between h-[100dvh] flex items-center relative"
      >
        <div
          class="text-gradient h-full flex-center md:text-32 text-xl text-primary uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#33B34A] to-[#10161C]"
        >
          DUST STORM
        </div>
        <client-only>
          <vue3-lottie
            :animation-data="LottieLoading"
            :class="{ '!opacity-100 translate-x-0': fullSvg }"
            :height="76"
            :loop="true"
            :width="82"
            class="absolute bottom-[8%] opacity-0 transition-300 duration-300"
          />
        </client-only>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import 'vue3-lottie/dist/style.css'

import { onMounted } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

import LottieLoading from '@/public/lottie/lottie.json'

const fullSvg = ref(false)
const loading = ref(true)
const visitorId = useCookie('visitor-id')
// const store = useStore()
// const mainLoading = computed(() => store.mainLoading)
onMounted(() => {
  const body = document.body
  body.style.overflow = 'hidden'
  fullSvg.value = true
  loading.value = true // Har safar sahifa yuklanganda loader ishlaydi

  console.log(LottieLoading)

  setTimeout(() => {
    body.style.overflow = ''
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.background-shadow-loader {
  background-image: url('/images/loader-bg.svg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
}

@keyframes animateFirstPath {
  0% {
    fill: #52618f;
  }
  100% {
    fill: #a2bcde;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
  to {
    transform: rotate(359deg) translate3d(0, 0, 0);
  }
}

@keyframes rotate-reverse {
  from {
    transform: rotate(359deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>

<style>
svg.spinner {
  width: 80px;
  height: 80px;
}

svg.spinner circle {
  fill: transparent;
  stroke: #0067ff;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 130;
  transform-origin: 40px 40px 0;
  animation: spinner 3s linear infinite;
}

svg.spinner circle.small {
  position: absolute;
  stroke: #33b34a;
  stroke-width: 4.5;
  top: 0;
  left: 0;
  stroke-dasharray: 70;
  animation: spinner 3s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(420deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
</style>
