<template>
  <div
    @click="navigateTo(`/news/${props.slug}`)"
    class="relative w-full sm:w-[271px] border border-primary rounded-xl p-3 bg-white duration-300 hover:shadow-xl cursor-pointer"
  >
    <img
      class="w-full rounded-10 h-[158px] object-cover"
      :src="imageSrc"
      alt="Фото"
      @error="handleError"
    />
    <div
      class="absolute top-[130px] left-4 z-10 bg-[#1C1F20B8]/[72%] rounded-xl border border-white/10 backdrop-blur-[7] px-2 py-1"
    >
      <span class="text-white text-xs">
        {{ props.date }}
      </span>
    </div>
    <h2 class="mt-3 mb-1 text-16 font-semibold">
      {{ props.title }}
    </h2>
    <p class="text-12 text-gray-600">
      {{ truncatedDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { truncateText } from '@/utils/index'
import DefaultFoto from '@/public/images/default.jpg'

const props = defineProps<{
  image: string
  date: string
  title: string
  description: string
  slug: string
}>()

const imageSrc = ref(props.image || DefaultFoto)

const handleError = () => {
  imageSrc.value = DefaultFoto
}

const truncatedDescription = computed(() => truncateText(props.description, 20))
</script>
