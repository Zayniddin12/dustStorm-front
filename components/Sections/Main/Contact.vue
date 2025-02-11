<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { formatPhoneNumber } from '~/utils';

</script>

<template>
    <section class="bg-primary pb-[10px] pt-[50px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="bg-green-100 w-[100%] sm:p-[64px] p-[20px] rounded-10">
                <div>
                    <h1 class="text-white text-[32px]">
                        {{ t("Contact__title") }}
                    </h1>
                    <p class="text-[16px] text-gray-400 sm:w-[320px]">
                        {{ t("Contact__text") }}
                    </p>
                </div>
                <div class="flex items-center flex-col gap-[12px] mt-[36px]">
                    <div
                        class="group border-[1px] rounded-10 w-[100%] text-white p-[12px] border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300">
                        <div
                            class="rounded-10 bg-warning-200 group-hover:bg-gray-400 w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-map-pin-filled text-[30px] text-warning-100 group-hover:text-white duration-300"></span>
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
                        class="group border-[1px] rounded-10 w-[100%] text-white p-[12px] border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300">
                        <div
                            class="rounded-10 bg-warning-200 group-hover:bg-gray-400 duration-300  w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-phone text-[30px] text-warning-100 group-hover:text-white duration-300"></span>
                        </div>
                        <div>
                            <span class="block opacity-[0.7] text-[14px]">
                                {{ t("Contact__phone") }}
                            </span>
                            <span class="block text-16">
                                {{ formatPhoneNumber('+998970206868') }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="group border-[1px] rounded-10 w-[100%] text-white p-[12px] border-gray-400 flex items-center gap-[8px] hover:bg-warning-100 hover:border-white-100 cursor-pointer duration-300">
                        <div
                            class="rounded-10 bg-warning-200 group-hover:bg-gray-400 duration-300  w-[42px] h-[42px] flex items-center justify-center">
                            <span
                                class="icon-mail text-[30px] text-warning-100 group-hover:text-white duration-300"></span>
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
        </div>
    </section>
</template>