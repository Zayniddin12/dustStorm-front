<script setup lang="ts">
import { NuxtLink } from '#components';
import { useI18n } from 'vue-i18n';
import { SocialMedia } from '~/data/SocialMedia';
import { useRoute } from 'vue-router';
import { formatPhoneNumber } from '~/utils';
import { useSupportStore } from '~/Store/store';

const { t } = useI18n();
const route = useRoute();

const supportStore = useSupportStore();
const contactInfo = ref<IContactInfo | null>(null);
onMounted(async () => {
  if (!supportStore.contactInfo) {
    await supportStore.getContactInfo();
  }
  contactInfo.value = supportStore.contactInfo;
});

</script>

<template>
  <footer :class="[
    'w-full relative z-10 from-primary to-dark-200',
    route.path === '/' ? 'bg-gradient-to-b pt-[50px]' : 'bg-gradient-to-r'
  ]">
    <div class="mx-auto max-w-[1200px] px-[15px]">
      <div class="flex items-center flex-col">
        <div :class="['text-center',
          route.path === '/' ? 'flex flex-col md:flex-row items-center gap-[24px]  md:text-left' : ''
        ]">
          <NuxtLink to="/">
            <p :class="['md:text-32 text-xl text-primary uppercase font-medium mb-[16px]  p-[10px] rounded-b-[16px]',
              route.path === '/' ? '' : 'bg-gray-800 max-w-[300px] mx-auto'
            ]">
              dust storm
            </p>
          </NuxtLink>
          <p class="w-full md:w-[582px] text-center text-white mb-[24px]">
            {{ t("Home__Footer__text") }}
          </p>
        </div>
        <div :class="[
          'w-full border-[1px] rounded-[8px] px-[12px] py-[8px] border-gray-800 max-w-[711px] md:flex items-center justify-between',
          route.path === '/' ? '!hidden' : '',
        ]">
          <!-- Телефон -->
          <a :href="'tel:' + (contactInfo?.phone || '+998970206868')" class="flex items-center gap-[8px]">
            <span class="icon-phone text-warning-100 text-[22px]"></span>
            <span class="block text-12 text-white">
              {{ contactInfo?.phone ? formatPhoneNumber(contactInfo.phone) : formatPhoneNumber('+998970206868') }}
            </span>
          </a>
          <div class="w-full h-[1px] my-[10px] md:my-[0px] md:h-[22px] md:w-[1px] bg-gray-800"></div>

          <!-- Email -->
          <a :href="'mailto:' + (contactInfo?.email || 'MaryamMahmudova@gmail.com')"
            class="flex items-center gap-[8px]">
            <span class="icon-mail text-warning-100 text-[22px]"></span>
            <span class="block text-12 text-white">
              {{ contactInfo?.email || 'MaryamMahmudova@gmail.com' }}
            </span>
          </a>
          <div class="w-full h-[1px] my-[10px] md:my-[0px] md:h-[22px] md:w-[1px] bg-gray-800"></div>

          <!-- Адрес -->
          <a :href="contactInfo?.map_url || '#'" target="_blank">
            <div class="flex items-center gap-[8px]">
              <span class="icon-map-pin-filled text-warning-100 text-[22px]"></span>
              <span class="block text-12 text-white">
                {{ contactInfo?.address || t("Contact__location") }}
              </span>
            </div>
          </a>
        </div>
        <div class="flex items-center gap-[12px] mt-[12px] mb-[30px]">
          <a v-for="(item, index) in SocialMedia" :key="index" :href="item.link" target="_blank"
            rel="noopener noreferrer"
            class="bg-gray-500 w-[35px] h-[35px] rounded-full text-white flex items-center justify-center hover:bg-primary hover:text-white duration-300">
            <span :class="item.icon" class="flex items-center justify-center w-full h-full"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
