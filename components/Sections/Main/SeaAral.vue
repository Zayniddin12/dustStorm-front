<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import imageSrc from "@/public/images/img/84274eaa449fe98df84123cd14662a87.jpg";

const { t } = useI18n();

const title = computed(() => t("SeaAral__title"));
const extractedWord = computed(() => {
    let match = title.value.match(/'([^']+)'|`([^`]+)`/);
    return match ? match[1] || match[2] : "";
});
const isBacktick = computed(() => title.value.includes("`"));
const cleanedTitle = computed(() => {
    return title.value.replace(/'([^']+)'|`([^`]+)`/, "").trim();
});
</script>
<template>
    <section class="mt-[140px] mb-[70px]">
        <div class="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 mb-6">
                <div class="max-w-[556px] w-full text-left md:text-left">
                    <h1 class="text-[24px] sm:text-[32px] font-bold">
                        <template v-if="isBacktick">
                            <span class="text-primary">{{ extractedWord }}</span>
                            {{ cleanedTitle }}
                        </template>
                        <template v-else>
                            {{ cleanedTitle }}
                            <span class="text-primary">{{ extractedWord }}</span>
                        </template>
                    </h1>
                    <p class="text-16 sm:text-14 mt-4 text-dark-300">
                        {{ t("SeaAral__text") }}
                    </p>
                </div>
                <div class="w-full max-w-[607px]">
                    <img class="w-full h-auto rounded-lg sm:rounded-2xl" :src="imageSrc" alt="Аральское море">
                </div>
            </div>
        </div>
    </section>
</template>
