<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import EventCard from '~/components/Cards/EventCard.vue';
import { useApi } from "~/composables/useApi";
import { ref, onMounted } from "vue";
import NProgress from "nprogress";
import { NuxtLink } from '#components';

const { t } = useI18n();
const { $get } = useApi();
const { locale } = useI18n()

interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
    slug: string;
}

const newsData = ref<NewsItem[]>([]);
const isLoading = ref(false);
const fetchNews = async () => {
    isLoading.value = true;
    NProgress.start();
    try {
        const res = await $get<{ results: NewsItem[] }>(`${locale.value}/api/main/news/`, {
            params: {
                page: 1,
                page_size: 4,
            },
        });
        newsData.value = res.results;
    } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
    } finally {
        isLoading.value = false;
        NProgress.done();
    }
};
onMounted(fetchNews);
</script>
<template>
    <section class="bg-gray-200  py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <div class="flex flex-col sm:flex-row justify-between mb-[24px]">
                <h1 class="text-primary text-[24px] sm:text-[32px] sm:text-left">
                    {{ t("InfoArt__Title") }}
                </h1>
                <NuxtLink to="/news" class="flex items-center gap-[12px] mt-3 sm:mt-0 duration-300 hover:text-primary">
                    <span class="text-[16px]"> {{ t("InfoArt__btn") }} </span>
                    <span class="icon-chevron rotate-180 text-[24px]"></span>
                </NuxtLink>
            </div>

            <!-- Лоадер -->
            <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
                <div class="loader"></div>
            </div>

            <!-- Контент -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
                <EventCard v-for="item in newsData" :key="item.id" :foto="item.image" :title="item.title"
                    :paragraph="item.description" />
            </div>
        </div>
    </section>
</template>

<style>
.loader {
    width: 40px;
    height: 40px;
    border: 4px solid #ccc;
    border-top: 4px solid #33B34A;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
