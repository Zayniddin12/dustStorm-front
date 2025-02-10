<template>
  <div class="h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-[80px] sm:text-[100px] md:text-[120px] font-bold text-primary">
        404
      </h1>
      <p class="w-full sm:w-[400px] md:w-[580px] text-[#707377] text-[16px] sm:text-[18px]">
        {{ $t("ErrorPage__title") }}
      </p>
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px] mt-[24px] sm:mt-[32px]">

        <UIButton :text="$t('Go_to_Homepage')" class="!rounded-none !text-[30px]" @click="navigateTo('/')" />
        <UIButton :text="$t('About_Us')"
          class="bg-transparent sm:w-[168px] !text-black py-[10px] !rounded-none px-[45px] sm:py-[12px] sm:px-[20px] border-[2px] duration-500 !border-[#D5D7DB] hover:!border-primary hover:!text-white hover:!bg-primary"
          @click="navigateTo('/aboutUS')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

</script>
