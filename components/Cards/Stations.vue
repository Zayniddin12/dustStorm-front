<template>
  <div
    class="bg-white rounded-xl py-4 px-5 mt-3 first:mt-0 border duration-300 flex flex-col justify-between"
    :class="
      active
        ? 'shadow-map-hover border-primary'
        : 'border-grey-300  hover:shadow-map-hover'
    "
  >
    <div class="flex items-center justify-between">
      <CommonBlockPreloader
        :loading="loading"
        border-radius="4px"
        height="21px"
        margin="0"
        width="144px"
      >
      </CommonBlockPreloader>
    </div>
    <div class="flex-center-between">
      <CommonPreloader
        :loading="loading"
        border-radius="4px"
        height="17px"
        width="100px"
        margin="12px 0 0 32px"
      >
        <p
          class="flex items-center mt-4 sm:mt-0 text-dark leading-16 text-sm font-medium"
        >
          <i class="icon-location text-blue transition duration-300" />
          <Highlighter
            class="my-highlight leading-20 text-dark line-clamp-2 ml-1.5"
            :searchWords="[keywords]"
            :autoEscape="true"
            :textToHighlight="item?.name"
          />
        </p>
      </CommonPreloader>

      <div
        @click="$emit('getLocation')"
        class="border border-blue border-opacity-20 hover:border-opacity-100 text-sm leading-115 text-blue duration-300 rounded-lg px-4 pt-[9px] pb-[11px] flex-y-center cursor-pointer"
      >
        {{ $t('on_map') }}

        <span class="icon-map ml-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import Highlighter from 'vue-highlight-words'
const route = useRoute()

interface Props {
  item?: any
  loading?: boolean
  active?: boolean
  keywords?: string
}

defineProps<Props>()
</script>
