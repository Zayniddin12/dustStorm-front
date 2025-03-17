<template>
  <NuxtLink :to="`/news/${item.slug}`">
    <div
      class="relative w-full sm:w-[271px] border border-primary rounded-xl p-3 bg-white duration-300 hover:shadow-xl cursor-pointer"
    >
      <img
        class="w-full rounded-10 h-[158px] object-cover"
        :src="item?.image ?? '/images/default.jpg'"
        alt="Фото"
      />
      <div
        class="absolute top-[130px] left-4 z-10 bg-[#1C1F20B8]/[72%] rounded-xl border border-white/10 backdrop-blur-[7] px-2 py-1"
      >
        <span class="text-white text-xs">
          {{ dayjs(item?.date).format('MM.DD.YYYY') }}
        </span>
      </div>
      <h2 class="mt-3 mb-1 text-16 font-semibold line-clamp-1">
        {{ item?.title }}
      </h2>
      <p class="text-12 text-gray-600 line-clamp-2">
        {{ item?.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
interface props {
  item: {
    image: string
    date: string
    title: string
    description: string
    slug: string
    id: string
  }
}
defineProps<props>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>
