<template>
    <section class="bg-[#F9F5E9] my-[50px] py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="flex flex-col sm:flex-row justify-between mb-[24px]">
                <h1 class="text-primary text-[24px] sm:text-[32px] sm:text-left">
                    {{ t("InfoArt__Title") }}
                </h1>
                <button class="flex items-center gap-[12px] mt-3 sm:mt-0 duration-500 hover:text-primary">
                    <span class="text-[16px]"> {{ t("InfoArt__btn") }} </span>
                    <span class="icon-chevron rotate-180 text-[24px]"></span>
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
                <div v-for="(item, index) in displayedCards" :key="index"
                    class="InfoActCard cursor-pointer bg-white rounded-16 hover:shadow-xl duration-500">
                    <img class="rounded-t-[16px] h-[250px] sm:h-[300px] lg:h-[327px] w-full object-cover"
                        :src="item.foto" alt="Foto" />
                    <div class="p-[16px] sm:p-[20px]">
                        <h2 class="text-[18px] sm:text-[20px] text-[#002734]">
                            {{ item.title }}
                        </h2>
                        <p class="text-[#8F8F8E] mt-[6px] text-[14px] sm:text-[16px]">
                            {{ item.paragraph }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { InfoArt__Cards } from '~/data/InfoArt';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const displayedCards = computed(() => {
    const repeatedCards = [];
    while (repeatedCards.length < 4) {
        repeatedCards.push(...InfoArt__Cards);
    }
    return repeatedCards.slice(0, 4);
});
</script>
