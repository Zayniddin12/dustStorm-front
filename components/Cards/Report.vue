<template>
  <div class="bg-white p-5 rounded-28 border border-dark-300/10 w-[280px]">
    <div class="flex-center bg-primary size-12 rounded-xl shadow-card">
      <span class="icon-file text-white text-[28px]"></span>
    </div>
    <p class="font-normal text-20 leading-130 text-dark-100 my-4">
      {{ truncatedTitle }}
    </p>
    <a class="flex gap-1 items-center text-primary text-base leading-130" :href="report.file">
      {{ $t('more') }}
      <span class="icon-chevron text-2xl rotate-[180deg]"></span>
    </a>
    <p class="text-sm text-gray-500">{{ formatFileSize(report.file_size) }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  report: {
    type: Object,
    required: true
  }
});

const truncatedTitle = computed(() => {
  const words = props.report.title.split(' ');
  return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : props.report.title;
});

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}
</script>
