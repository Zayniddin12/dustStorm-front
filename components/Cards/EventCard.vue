<template>
  <NuxtLink :to="`/news/${slug}`">
    <div
      class="InfoActCard cursor-pointer bg-white rounded-16 hover:shadow-xl duration-300"
    >
      <img
        class="rounded-t-16 h-[180px] sm:h-[200px] md:h-[250px] lg:h-[327px] w-full object-cover"
        :src="imageSrc"
        alt="Foto"
        @error="handleError"
      />
      <div class="p-[16px] sm:p-[20px]">
        <h2 class="text-[18px] sm:text-[20px] text-dark-100 line-clamp-1">
          {{ title }}
        </h2>
        <p
          class="text-gray-300 mt-[6px] text-[14px] sm:text-[16px] line-clamp-3"
        >
          {{ truncatedParagraph }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { truncateText } from '@/utils/index'
import DefaultFoto from '@/public/images/default.jpg'

const props = defineProps<{
  foto: string
  title: string
  paragraph: string
  slug: string
}>()

const imageSrc = ref(props.foto || DefaultFoto)

const handleError = () => {
  imageSrc.value = DefaultFoto
}

const truncatedParagraph = computed(() => truncateText(props.paragraph, 20))
</script>
