<template>
    <section class="bg-gray-200 my-[50px] py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="flex flex-col sm:flex-row justify-between mb-[24px]">
                <h1 class="text-primary text-[24px] sm:text-[32px] sm:text-left">
                    {{ t("InfoArt__Title") }}
                </h1>
                <button class="flex items-center gap-[12px] mt-3 sm:mt-0 duration-300 hover:text-primary">
                    <span class="text-[16px]"> {{ t("InfoArt__btn") }} </span>
                    <span class="icon-chevron rotate-180 text-[24px]"></span>
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
                <EventCard v-for="(item, index) in 4" :key="index"
                    :foto="InfoArt__Cards[index % InfoArt__Cards.length].foto"
                    :title="InfoArt__Cards[index % InfoArt__Cards.length].title"
                    :paragraph="InfoArt__Cards[index % InfoArt__Cards.length].paragraph" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import EventCard from '~/components/Cards/EventCard.vue';
import { InfoArt__Cards } from '~/data/InfoArt';
const { t } = useI18n();
</script>
