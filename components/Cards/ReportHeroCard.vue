<template>
    <div class="rounded-16 bg-white px-[16px] py-[12px] shadow-xl">
        <div class="flex items-center gap-[16px]">
            <span class="icon-file text-primary text-[38px]"></span>
            <div>
                <h2 class="text-dark text-[20px] leading-[24px]">
                    {{ title }}
                </h2>
                <div class="flex items-center mt-[5px] gap-[5px]">
                    <span class="text-primary">
                        {{ size }}
                    </span>
                    <span class="text-[#E8E8E8]">
                        *
                    </span>
                    <span class="text-primary">
                        {{ format }}
                    </span>
                </div>
            </div>
        </div>
        <a :href="downloadUrl"
            class="border-primary border-[2px] duration-300 hover:text-primary hover:bg-transparent flex items-center justify-center py-[11px] mt-[24px] cursor-pointer w-full bg-primary text-white rounded-24">
            <span>
                {{ $t('Download') }}
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

defineProps({
    title: String,
    size: String,
    format: String,
    downloadUrl: String
});
</script>
