<script setup lang="ts">
import NewsCard from "~/components/Cards/NewsCard.vue";
import { useI18n } from "vue-i18n";
import { useApi } from "~/composables/useApi";
import { ref, onMounted, computed } from "vue";

const { t } = useI18n();
const { $get } = useApi();
const { locale } = useI18n();

interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    created_at: string;
    slug: string;
}

interface NewsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NewsItem[];
}

const newsData = ref<NewsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
});

const currentPage = ref(1);
const perPage = 12;
const isLoading = ref(true);

const fetchNews = async () => {
    isLoading.value = true;
    try {
        const res = await $get<NewsResponse>(`${locale.value}/api/main/news/`, {
            params: {
                page: currentPage.value,
                page_size: perPage,
            },
        });
        newsData.value = res;
    } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchNews);
const totalPages = computed(() => Math.ceil(newsData.value.count / perPage));

const goToPage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchNews();
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
</script>

<template>
    <section class="pt-5 pb-5 bg-white">
        <div class="mx-auto max-w-[1200px] px-4">
            <h1 class="text-2xl sm:text-3xl font-bold text-dark-200">
                {{ t("InfoArt__Title") }}
            </h1>
            <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-8">
                <div v-for="index in perPage" :key="index" class="shimmer-card"></div>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-8">
                <NewsCard v-for="item in newsData.results" :key="item.id" :image="item.image"
                    :date="formatDate(item.created_at)" :title="item.title" :description="item.description"
                    :slug="item.slug" />
            </div>
            <div class="flex items-center justify-end mt-[22px]" v-if="totalPages > 1">
                <div class="flex items-center gap-[8px]">
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-btn"
                        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                        <span class="icon-chevron text-[20px]"></span>
                    </button>
                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="pagination-btn"
                        :class="{ 'bg-primary text-white': currentPage === page }">
                        {{ page }}
                    </button>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="pagination-btn" :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                        <span class="icon-chevron text-[20px] rotate-180"></span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.pagination-btn {
    @apply w-[32px] h-[32px] flex items-center justify-center rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer text-dark-200;
}

.icon-chevron.rotate-180 {
    transform: rotate(180deg);
}

.shimmer-card {
    height: 300px;
    background-color: rgb(218, 218, 218);
    background-size: 200% 100%;
    border-radius: 28px;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>
