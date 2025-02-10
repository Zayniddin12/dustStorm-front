<script setup lang="ts">
import { NuxtLink } from '#components';
import { useI18n } from 'vue-i18n';
import { SocialMedia } from '~/data/SocialMedia';
const { t } = useI18n();

import { ref } from "vue";

const phoneNumber = ref("998712007007");
const formatPhoneNumber = (number) => {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 9) return number;
  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
};

</script>

<template>
  <footer class="bg-gradient-to-b from-primary to-[#10161C] w-full pt-[106px]">
    <div class="mx-auto max-w-[1200px] px-[15px]">
      <div class="bg-[#1b4b2b77] w-[100%] sm:p-[64px] p-[20px] rounded-[12px]">
        <div>
          <h1 class="text-[white] text-[32px]">
            {{ t("Contact__title") }}
          </h1>
          <p class="text-[16px] text-[#ffffff89] sm:w-[320px]">
            {{ t("Contact__text") }}
          </p>
        </div>
        <div class="flex items-center flex-col gap-[12px] mt-[36px]">
          <div
            class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px] hover:bg-[#CAA244] cursor-pointer duration-500">
            <div
              class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] w-[42px] h-[42px] flex items-center justify-center">
              <span class="icon-map-pin-filled text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
            </div>
            <div>
              <span class="block opacity-[0.7] text-[14px]">
                {{ t("Contact__address") }}
              </span>
              <span class="block text-[16px]">
                {{ t("Contact__location") }}
              </span>
            </div>
          </div>

          <div
            class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px]  hover:bg-[#CAA244] cursor-pointer duration-500">
            <div
              class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] duration-500  w-[42px] h-[42px] flex items-center justify-center">
              <span class="icon-phone text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
            </div>
            <div>
              <span class="block opacity-[0.7] text-[14px]">
                {{ t("Contact__phone") }}
              </span>
              <span class="block text-[16px]">
                {{ formatPhoneNumber(phoneNumber) }}
              </span>
            </div>
          </div>
          <div
            class="group border-[1px] rounded-[12px] w-[100%] text-[white] p-[12px] border-[#ffffff7a] flex items-center gap-[8px] hover:bg-[#CAA244] cursor-pointer duration-500">
            <div
              class="rounded-[8px] bg-[#caa24462] group-hover:bg-[#ffffff66] duration-500  w-[42px] h-[42px] flex items-center justify-center">
              <span class="icon-mail text-[30px] text-[#CAA244] group-hover:text-white duration-500"></span>
            </div>
            <div>
              <span class="block opacity-[0.7] text-[14px]">
                {{ t("Contact__email") }}
              </span>
              <span class="block text-[16px]">
                MaryamMahmudova@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center flex-col md:mt-[152px] mt-[50px]">
        <div class="flex flex-col md:flex-row items-start gap-[24px] text-center md:text-left">
          <NuxtLink to="/">
            <p class="md:text-32 text-xl text-primary uppercase font-medium">
              dust storm
            </p>
          </NuxtLink>
          <p class="w-full md:w-[580px] text-[white]">
            {{ t("Home__Footer__text") }}
          </p>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-[12px] mt-[15px] text-center md:text-left">
          <span class="text-[#ffffff77] block text-sm md:text-base">
            © OnaFoundation.
            {{ t("Home__Footer__subText") }}
          </span>
        </div>

        <div class="flex items-center gap-[12px] mt-[12px] mb-[30px]">
          <a v-for="(item, index) in SocialMedia" :key="index" :href="item.link" target="_blank"
            rel="noopener noreferrer"
            class="bg-[#ffffff2f] w-[35px] h-[35px] rounded-full text-white flex items-center justify-center hover:bg-primary hover:text-white duration-500">
            <span :class="item.icon" class="flex items-center justify-center w-full h-full"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>