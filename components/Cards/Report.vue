<template>
  <div
    class="bg-white p-5 rounded-28 border border-dark-300/10 w-[280px] md:min-h-[220px] min-h-[150px] flex flex-col"
  >
    <div class="flex-center bg-primary size-12 rounded-xl shadow-card">
      <span class="icon-file text-white text-[28px]"></span>
    </div>
    <p
      class="font-normal sm:text-20 text-sm leading-130 text-dark-100 md:my-4 my-2 line-clamp-2 overflow-hidden text-ellipsis"
    >
      {{ report.title }}
    </p>
    <div class="mt-auto">
      <a
        class="flex gap-1 items-center text-primary text-base leading-130"
        :href="report.file"
      >
        {{ $t('more') }}
        <span class="icon-chevron text-2xl rotate-[180deg]"></span>
      </a>
      <p class="text-sm text-gray-500">
        {{ formatFileSize(report.file_size) }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
})

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Обрезает текст на 2 строках */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
