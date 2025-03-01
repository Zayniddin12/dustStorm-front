<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { formatPhoneNumber } from '@/utils/index.ts'
import { useSupportStore } from '~/Store/store'
import Contact from '../Sections/Main/Contact.vue'

const { t } = useI18n()
const route = useRoute()

const supportStore = useSupportStore()
const contactInfo = ref<IContactInfo | null>(null)
const loading = computed(() => supportStore.isLoading)

onMounted(async () => {
  if (!supportStore.contactInfo) {
    await supportStore.getContactInfo()
  }
  contactInfo.value = supportStore.contactInfo
})
</script>

<template>
  <footer
    :class="[
      'w-full relative z-10 from-primary to-dark-200',
      route.path === '/' ? 'bg-gradient-to-b pt-[50px]' : 'bg-gradient-to-r',
    ]"
  >
    <Contact id="contacts" v-if="route.path === '/'" />

    <div class="mx-auto max-w-[1200px] px-[15px]">
      <div class="flex items-center flex-col">
        <div
          :class="[
            'text-center',
            route.path === '/'
              ? 'flex flex-col md:flex-row items-center gap-[24px] md:text-left'
              : '',
          ]"
        >
          <NuxtLink to="/">
            <p
              :class="[
                'md:text-32 text-xl text-primary uppercase font-medium mb-[16px] p-[10px] rounded-b-[16px]',
                route.path === '/' ? '' : 'bg-gray-800 max-w-[300px] mx-auto',
              ]"
            >
              dust storm
            </p>
          </NuxtLink>
          <p class="w-full md:w-[582px] text-center text-white mb-[24px]">
            {{ t('Home__Footer__text') }}
          </p>
        </div>

        <div
          :class="[
            'w-full border-[1px] rounded-[8px] px-[12px] py-[8px] border-gray-800 max-w-[711px] md:flex items-center justify-between',
            route.path === '/' ? '!hidden' : '',
          ]"
        >
          <!-- Contact Information with Loading States -->
          <template v-if="loading">
            <div
              v-for="i in 3"
              :key="i"
              class="flex items-center gap-[8px] w-full md:w-auto"
            >
              <div class="w-[22px] h-[22px] shimmer rounded-full"></div>
              <div class="w-[120px] h-[16px] shimmer rounded"></div>
            </div>
          </template>
          <template v-else-if="contactInfo">
            <!-- Phone -->
            <template v-if="contactInfo.phone">
              <a
                :href="'tel:' + contactInfo.phone"
                class="flex items-center gap-[8px]"
              >
                <span class="icon-phone text-warning-100 text-[22px]"></span>
                <span class="block text-12 text-white">
                  {{ formatPhoneNumber(contactInfo.phone) }}
                </span>
              </a>
              <div
                class="w-full h-[1px] my-[10px] md:my-[0px] md:h-[22px] md:w-[1px] bg-gray-800"
              ></div>
            </template>

            <!-- Email -->
            <template v-if="contactInfo.email">
              <a
                :href="'mailto:' + contactInfo.email"
                class="flex items-center gap-[8px]"
              >
                <span class="icon-mail text-warning-100 text-[22px]"></span>
                <span class="block text-12 text-white">
                  {{ contactInfo.email }}
                </span>
              </a>
              <div
                class="w-full h-[1px] my-[10px] md:my-[0px] md:h-[22px] md:w-[1px] bg-gray-800"
              ></div>
            </template>

            <!-- Address -->
            <template v-if="contactInfo.address">
              <a :href="contactInfo.map_url || '#'" target="_blank">
                <div class="flex items-center gap-[8px]">
                  <span
                    class="icon-map-pin-filled text-warning-100 text-[22px]"
                  ></span>
                  <span class="block text-12 text-white">
                    {{ contactInfo.address }}
                  </span>
                </div>
              </a>
            </template>
          </template>
        </div>

        <!-- Social Media Links -->
        <div class="flex items-center gap-[12px] mt-[12px] mb-[30px]">
          <Transition mode="out-in">
            <div
              :key="loading ? 'loading' : 'loaded'"
              class="flex items-center gap-[12px]"
            >
              <!-- Loading State -->
              <template v-if="loading">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="w-[35px] h-[35px] rounded-full shimmer"
                ></div>
              </template>
              <!-- Loaded State -->
              <template
                v-else-if="contactInfo?.social && contactInfo.social.length > 0"
              >
                <a
                  v-for="(item, index) in contactInfo.social"
                  :key="index"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-gray-500 w-[35px] h-[35px] rounded-full text-white flex items-center justify-center hover:bg-primary hover:text-white duration-300"
                >
                  <img
                    :src="item.icon"
                    alt="Social Icon"
                    class="w-[15px] h-[15px] object-contain"
                  />
                </a>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </footer>
</template>
