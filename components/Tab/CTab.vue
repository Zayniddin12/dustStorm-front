<template>
  <div
    class="main-tab space-x-5 relative bg-white/12 flex w-max transition-all duration-200 border-b border-solid border-gray-300 dark:border-gray-300/10"
  >
    <div
      :class="activeClass"
      :style="{ width: `${active.width}`, left: `${active.left}px` }"
      class="absolute h-[2px] bg-primary w-full -bottom-px transition-all duration-200"
    ></div>

    <button
      v-for="(tab, idx) in store.windInfoData"
      :id="`item_${tab.parameter_name}`"
      :key="idx"
      :class="[
        itemClass,
        localeValue === tab.parameter_name
          ? activeItemsClass
          : 'text-dark hover:text-dark/60',
      ]"
      class="py-4 transition-all duration-200 w-max sm:text-base text-xs font-medium z-10"
      @click="pick(tab.parameter_name, $event)"
    >
      {{ tab.name }} ({{ tab.unit }})
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useSupportStore } from '@/Store/store'

const store = useSupportStore()

interface Props {
  modelValue: string | number
  itemClass?: string
  activeClass?: string
  activeItemsClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'wind_speed',
  activeItemsClass: 'text-primary hover:text-primary/60',
})

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}
const emit = defineEmits<Emits>()

const localeValue = ref(props?.modelValue)
const active = ref({ left: 0, width: '0px' })

const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e?.target as HTMLButtonElement
  if (target) {
    active.value = {
      left: target.offsetLeft,
      width: target.offsetWidth + 'px',
    }
  }
  localeValue.value = tab
  emit('update:modelValue', tab)
  store.getWindSpeedAvg(tab)
}

onMounted(async () => {
  await store.getWindInfo()

  if (store.windInfoData.length === 0) return

  const defaultParam = store.windInfoData[0].parameter_name
  localeValue.value = defaultParam
  emit('update:modelValue', defaultParam)

  store.getWindSpeedAvg(defaultParam)

  const item = document.getElementById(
    `item_${defaultParam}`
  ) as HTMLButtonElement
  if (item) {
    active.value = {
      left: item.offsetLeft,
      width: item.offsetWidth + 'px',
    }
  }
})
</script>
