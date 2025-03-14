<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useSupportStore } from '@/Store/store.ts'

const supportStore = useSupportStore()
const loading = computed(() => supportStore.isLoading)
const contactInfo = ref<IContactInfo | null>(null)
onMounted(async () => {
  if (!supportStore.contactInfo) {
    await supportStore.getContactInfo()
  }
  contactInfo.value = supportStore.contactInfo
})
</script>

<template>
  <div class="sm:pb-[20px]">
    <div class="mx-auto max-w-[1200px] sm:px-[15px] px-2">
      <div class="bg-green-100 w-[100%] sm:p-[64px] sm:p-[20px] p-3 rounded-10">
        <div>
          <h1 class="text-white sm:text-[32px] text-lg">
            {{ t('Contact__title') }}
          </h1>
          <p class="text-sm text-gray-400 sm:w-[320px]">
            {{ t('Contact__text') }}
          </p>
        </div>
        <div class="flex items-center flex-col gap-[12px] mt-[36px]">
          <Transition mode="out-in">
            <div
              :key="loading ? 'loading' : 'loaded'"
              class="flex items-center flex-col gap-[12px] w-full"
            >
              <!-- Address Block -->
              <a
                :href="`https://yandex.ru/maps/?pt=${contactInfo?.longitude},${contactInfo?.latitude}&z=12&l=map`"
                target="_bank"
                class="group border-[1px] rounded-10 w-full text-white sm:p-[12px] p-2 border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300"
              >
                <div
                  class="rounded-10 shrink-0 bg-warning-200 group-hover:bg-gray-400 sm:size-[42px] size-8 flex items-center justify-center"
                >
                  <span
                    class="icon-map-pin-filled sm:text-[30px] text-[20px] text-warning-100 group-hover:text-white duration-300"
                  ></span>
                </div>
                <div>
                  <span class="block opacity-[0.7] sm:text-[14px] text-xs">{{
                    t('Contact__address')
                  }}</span>
                  <span
                    v-if="!loading && contactInfo?.address"
                    class="block sm:text-[16px] text-xs"
                    >{{ contactInfo?.address }}</span
                  >
                  <span
                    v-else
                    class="block sm:h-5 h-4 w-[300px] shimmer rounded-md bg-white"
                  ></span>
                </div>
              </a>

              <!-- Phone Block -->
              <div
                class="group border-[1px] rounded-10 w-full text-white sm:p-[12px] p-2 border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300"
              >
                <div
                  class="rounded-10 shrink-0 bg-warning-200 group-hover:bg-gray-400 sm:size-[42px] size-8 flex items-center justify-center"
                >
                  <span
                    class="icon-phone text-[30px] text-[20px] text-warning-100 group-hover:text-white duration-300"
                  ></span>
                </div>
                <div>
                  <span class="block opacity-[0.7] sm:text-[14px] text-xs">{{
                    t('Contact__phone')
                  }}</span>
                  <span
                    v-if="!loading && contactInfo?.phone"
                    class="block sm:text-[16px] text-xs"
                    >{{ formatPhoneNumber(contactInfo.phone) }}</span
                  >
                  <span
                    v-else
                    class="block h-5 w-[300px] shimmer rounded-md"
                  ></span>
                </div>
              </div>

              <!-- Email Block -->
              <div
                class="group border-[1px] rounded-10 w-full text-white sm:p-[12px] p-2 border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300"
              >
                <div
                  class="rounded-10 shrink-0 bg-warning-200 group-hover:bg-gray-400 sm:size-[42px] size-8 flex items-center justify-center"
                >
                  <span
                    class="icon-mail text-[30px] text-[20px] text-warning-100 group-hover:text-white duration-300"
                  ></span>
                </div>
                <div>
                  <span class="block opacity-[0.7] sm:text-[14px] text-xs">{{
                    t('Contact__email')
                  }}</span>
                  <span
                    v-if="!loading && contactInfo?.email"
                    class="block sm:text-[16px] text-xs"
                    >{{ contactInfo?.email }}</span
                  >
                  <span
                    v-else
                    class="block h-5 w-[300px] shimmer rounded-md"
                  ></span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
