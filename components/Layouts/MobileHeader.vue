<template>
  <div
    class="w-full absolute top-0 left-0 h-screen z-50 flex flex-col justify-between transition-all duration-300 bg-white pl-4"
  >
    <div>
      <div class="py-2 md:py-4 flex items-center pr-4">
        <div class="flex items-center gap-x-3">
          <div @click="$emit('closeMobileHeader')">
            <i class="icon-close text-primary cursor-pointer text-2xl" />
          </div>
          <NuxtLink to="/">
            <p class="md:text-32 text-xl text-primary uppercase font-medium">
              dust storm
            </p>
          </NuxtLink>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4">
        <UILang class="pt-6" />
      </div>
      <ul class="mt-6">
        <li v-for="(item, idx) of links" :key="idx">
          <div class="flex items-center justify-between pr-4">
            <NuxtLink
              :to="'/' + item?.slug"
              class="text-dark text-base font-medium !leading-130 transition-colors duration-300 hover:text-primary"
              >{{ $t(`${item.title}`) }}
            </NuxtLink>
          </div>
          <div class="bg-dark/10 my-4 w-full h-[1px]"></div>
        </li>
      </ul>
    </div>
    <div class="pb-4 flex-center gap-[14px]">
      <a
        v-for="(social, index) in socials"
        :key="index"
        :href="social?.link"
        class="size-10 flex items-center justify-center"
        target="_blank"
      >
        <i :class="social?.icon" class="text-xl text-primary" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { Links } from '~/data/menu'
interface Props {
  links: Array<Links>
}

defineProps<Props>()
const emit = defineEmits(['closeMobileHeader'])

const route = useRoute()

const socials = [
  {
    name: 'Twitter',
    link: 'https://www.facebook.com/sarafscreening/',
    icon: 'icon-twitter',
  },
  {
    name: 'YouTube',
    link: 'https://www.youtube.com/channel/UC01vVZLtkiDaUr5LDPnRWsw',
    icon: 'icon-youtube',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/sarafscreening/',
    icon: 'icon-instagram',
  },
  {
    name: 'Telegram',
    link: 'https://fb.com',
    icon: 'icon-telegram',
  },
]

// watch route
watch(
  () => route.path,
  () => {
    emit('closeMobileHeader')
  }
)
</script>

<style scoped></style>
