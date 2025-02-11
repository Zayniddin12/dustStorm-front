<script setup lang="ts">
import { NuxtLink } from '#components';
import { useI18n } from 'vue-i18n';
import { SocialMedia } from '~/data/SocialMedia';
const { t } = useI18n();
</script>

<template>
  <footer class="bg-gradient-to-b from-primary to-dark-200 w-full  ">
    <div class="mx-auto max-w-[1200px] px-[15px]">
      <div class="flex items-center flex-col">
        <NuxtLink to="/">
          <p class="md:text-32 text-xl text-primary uppercase font-medium mb-[16px] bg-[#] p-[10px] rounded-b-[16px]">
            dust storm
          </p>
        </NuxtLink>
        <p class="w-full md:w-[582px] text-center text-white mb-[24px]">
          {{ t("Home__Footer__text") }}
        </p>
        <div class="flex items-center gap-[12px] mt-[12px] mb-[30px]">
          <a v-for="(item, index) in SocialMedia" :key="index" :href="item.link" target="_blank"
            rel="noopener noreferrer"
            class="bg-gray-500  w-[35px] h-[35px] rounded-full text-white flex items-center justify-center hover:bg-primary hover:text-white duration-300">
            <span :class="item.icon" class="flex items-center justify-center w-full h-full"></span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>