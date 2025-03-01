<template>
  <div
    class="relative w-full p-2 bg-white rounded-xl lg:rounded-full flex flex-col gap-5 lg:flex-row overflow-hidden"
    :class="mainClass"
  >
    <div
      :class="activeClass"
      class="absolute h-11 hidden lg:flex rounded-xl lg:rounded-full pt-2 bg-blue w-full -translate-y-1/2 top-1/2 transition-300 shadow-tab"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
    ></div>
    <button
      :class="[
        itemClass,
        modelValue === tab?.value
          ? 'text-white !font-semibold bg-blue hover:bg-primary lg:bg-transparent border-blue transition-300'
          : 'text-dark',
        modelValue === tab?.value ? customeClass : '',
      ]"
      class="py-2 rounded-full transition-300 text-dark w-full text-lg border border-gray font-semibold z-10 hover:bg-primary hover:border-primary hover:text-white"
      :id="`item_${tab.value}`"
      v-for="(tab, idx) in list"
      :key="idx"
      @click="pick(tab.value, $event)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Tab {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  list: Tab[]
  itemClass?: string
  activeClass?: string
  mainClass?: string
  customeClass?: string
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const $emit = defineEmits<Emits>()

const active = ref({ left: 0, width: 0 })
const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e.target as HTMLButtonElement
  active.value = {
    left: target?.offsetLeft,
    width: target?.offsetWidth,
  }
  $emit('update:modelValue', tab)
}

watch(
  () => props.modelValue,
  (newValue) => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    pick(newValue, { target: item })
  },
  { deep: true }
)

onMounted(() => {
  const item = document.getElementById(
    `item_${props.modelValue}`
  ) as HTMLButtonElement
  setTimeout(() => {
    pick(props.modelValue, { target: item })
  }, 1)
})
</script>
