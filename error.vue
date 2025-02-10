<template>
  <div class="h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-[80px] sm:text-[100px] md:text-[120px] font-bold text-[#33B34A]">
        404
      </h1>
      <p class="w-full sm:w-[400px] md:w-[580px] text-[#707377] text-[16px] sm:text-[18px]">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px] mt-[24px] sm:mt-[32px]">
        <button
          @click="goHome"
          class="bg-[#33B34A] text-white py-[10px] px-[16px] sm:py-[12px] sm:px-[20px] border-[2px] duration-500 border-[#33B34A] hover:text-[#33B34A] hover:bg-transparent"
        >
          Go to homepage
        </button>
        <button
          class="bg-transparent sm:w-[168px] text-black py-[10px] px-[45px] sm:py-[12px] sm:px-[20px] border-[2px] duration-500 border-[#D5D7DB] hover:border-[#33B34A] hover:text-white hover:bg-[#33B34A]"
        >
          About us
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
