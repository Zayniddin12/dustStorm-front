<script setup lang="ts">
import NewsCard from "~/components/Cards/NewsCard.vue";
import { NewsCardData } from '~/data/News';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const repeatedNews = Array(12).fill(null).map(() => ({ ...NewsCardData[0] }));
</script>



<template>
    <section class="pt-5 pb-5 bg-white">
        <div class="mx-auto max-w-[1200px] px-4">
            <h1 class="text-2xl sm:text-3xl font-bold text-dark-200">
                {{ t("News__title") }}
            </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-8">
                <NewsCard v-for="(news, index) in repeatedNews" :key="index" :image="news.image" :date="news.date"
                    :title="news.title" :description="news.description" />
            </div>
            <div class="flex items-center justify-end mt-[22px]">
                <div class="flex items-center gap-[8px] ">
                    <div
                        class="bg-white-200 hover:bg-primary hover:text-white duration-300 cursor-pointer text-primary rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        <span class="icon-chevron text-[20px] "></span>
                    </div>
                    <div
                        class="bg-primary cursor-pointer text-white rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        1
                    </div>
                    <div
                        class="bg-white-300 hover:bg-primary hover:text-white duration-300  cursor-pointer text-primary rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        2
                    </div>
                    <div
                        class="bg-white-300 hover:bg-primary hover:text-white duration-300  cursor-pointer text-primary rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        ...
                    </div>
                    <div
                        class="bg-white-300 hover:bg-primary hover:text-white duration-300  cursor-pointer text-primary rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        19
                    </div>
                    <div
                        class="bg-white-200 cursor-pointer hover:bg-primary hover:text-white duration-300  text-primary rounded-8 w-[32px] h-[32px] flex items-center justify-center">
                        <span class="icon-chevron text-[20px] rotate-[180deg] mb-[3px] ml-[2px]"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
