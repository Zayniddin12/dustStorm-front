<template>
  <header class="sticky top-0 left-0 w-full !z-50 md:py-4 py-2 transition-300 bg-white">
    <nav class="container flex items-center">
      <div class="cursor-pointer mr-3 lg:hidden" @click="showMobileHeader">
        <i class="icon-burger text-xl text-primary"></i>
      </div>
      <NuxtLink to="/">
        <p class="md:text-32 text-xl text-primary uppercase font-medium">
          dust storm
        </p>
      </NuxtLink>
      <ul class="md:flex hidden ml-[97px] gap-4">
        <li v-for="(item, key) in headerMenu" :key
          class="text-sm font-medium leading-[17px] transition-300 hover:text-primary cursor-pointer">
          <NuxtLinkLocale :to="item?.slug">
            {{ item?.title }}
          </NuxtLinkLocale>
        </li>
      </ul>
      <div class="ml-auto flex items-center">
        <div class="md:ml-5 flex items-center gap-x-4">
          <div class="flex-y-center gap-2 lg:mr-2">
            <UILang custom-class="!hidden lg:!block" />
          </div>

          <UIButton :text="$t('contact_us_btn')" class="hidden lg:block !text-sm" @click="navigateTo('/contact')" />
        </div>
      </div>
    </nav>

    <Transition name="from-left">
      <LayoutsMobileHeader v-if="isShown && !showSearch" :links="headerMenu"
        @close-mobile-header="onCloseMobileHeader" />
    </Transition>

    <ModalLogout v-model="showLogoutModal" @close="close" />
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { headerMenu } from '~/data'

const { t } = useI18n()
const isShown = ref(false)
const showLogoutModal = ref(false)
const router = useRouter()
const isClicked = ref(false)
const showSearch = ref(false)

const showMobileHeader = () => {
  if (process.client) {
    document.body.style.overflow = 'hidden'
    isShown.value = true
  }
}

const onCloseMobileHeader = () => {
  if (process.client) {
    document.body.style.overflow = 'auto'
    isShown.value = false
  }
}

const close = () => {
  showLogoutModal.value = false
}
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}

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
