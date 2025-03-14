<template>
  <header
    :class="shouldStick ? 'bg-gradient' : 'bg-tranparent'"
    class="fixed top-0 left-0 w-full !z-50 md:py-4 py-2 transition-300"
  >
    <nav class="container flex items-center">
      <div class="cursor-pointer mr-3 lg:hidden" @click="showMobileHeader">
        <i
          :class="shouldStick ? 'text-white' : 'text-primary'"
          class="icon-burger text-xl"
        ></i>
      </div>
      <NuxtLink to="/">
        <p
          :class="shouldStick ? 'text-white' : 'text-primary'"
          class="md:text-32 text-xl text-primary uppercase font-medium"
        >
          dust storm
        </p>
      </NuxtLink>
      <ul class="md:flex hidden ml-[97px] gap-4">
        <li v-for="(item, key) in headerMenu" :key>
          <NuxtLink
            :to="`${item.slug}`"
            class="text-dark/30 text-sm font-medium !leading-130 transition-colors transition-300 duration-300 hover:text-primary"
            :class="[
              {
                '!text-primary': route.fullPath === item.slug,
              },
              shouldStick ? 'text-white' : 'text-dark/30',
            ]"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>

      <div class="ml-auto flex items-center">
        <div class="md:ml-5 flex items-center gap-x-4">
          <div class="flex-y-center gap-2 lg:mr-2">
            <UILang custom-class="!hidden lg:!block" />
          </div>
        </div>
      </div>
    </nav>

    <Transition name="from-left">
      <LayoutsMobileHeader
        v-if="isMobileHeaderVisible"
        :links="headerMenu"
        @close-mobile-header="closeMobileHeader"
      />
    </Transition>
  </header>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Links } from '~/data/menu'
const { t, locale } = useI18n()
const isShown = ref(false)
const showSearch = ref(false)

const isMobileHeaderVisible = ref(false)

const showMobileHeader = () => {
  isMobileHeaderVisible.value = true
}

const closeMobileHeader = () => {
  isMobileHeaderVisible.value = false
}

const handleHashScroll = (hash: string) => {
  const element = document.querySelector(hash)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const route = useRoute()

const headerMenuRu = [
  { id: 1, title: 'Глава', slug: '/' },
  { id: 2, title: 'Новости', slug: '/news' },
  { id: 3, title: 'Отчеты', slug: '/report' },
]

const headerMenuEn = [
  { id: 1, title: 'Home', slug: '/' },
  { id: 2, title: 'News', slug: '/news' },
  { id: 3, title: 'Reports', slug: '/report' },
]

const headerMenuUz = [
  { id: 1, title: 'Bo`sh sahifa', slug: '/' },
  { id: 2, title: 'Yangiliklar', slug: '/news' },
  { id: 3, title: 'Hisobotlar', slug: '/report' },
]

const headerMenu = computed<Links[]>(() => {
  switch (locale.value) {
    case 'ru':
      return headerMenuRu
    case 'uz':
      return headerMenuUz
    default:
      return headerMenuEn
  }
})
const scrollTop = ref(0)

const checkSticky = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop
  return scrollTop.value > 0
}

window.addEventListener('scroll', () => {
  shouldStick.value = checkSticky()
})
const shouldStick = ref(checkSticky())
</script>

<style scoped>
.from-left-enter-active {
  animation: from-left 300ms ease-out;
}

.from-left-leave-active {
  animation: from-left 300ms ease-in reverse;
}

@keyframes from-left {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.9);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.header-shadow {
  box-shadow: 0 4px 20px 0 rgba(21, 21, 21, 0.15);
}
</style>
