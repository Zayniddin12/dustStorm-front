<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import ReportCard from "@/components/Cards/ReportHeroCard.vue";
import { useI18n } from "vue-i18n";
import NProgress from "nprogress";

const api = useApi();
const reports = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 21;
const loading = ref(false);
const { t, locale } = useI18n();

const fetchReports = async () => {
    loading.value = true;
    NProgress.start();
    try {
        const response = await api.$get(`${locale.value}/api/main/report/?page=${currentPage.value}&page_size=${pageSize}`);
        reports.value = response.results;
        totalPages.value = Math.ceil(response.count / pageSize);
    } catch (error) {
        console.error("Ошибка при получении отчетов:", error);
    } finally {
        loading.value = false;
        NProgress.done();
    }
};

const goToPage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchReports();
};

onMounted(fetchReports);
</script>

<template>
    <section class="bg-gray-200 pt-[52px] pb-[84px]">
        <div class="container">
            <h1 class="text-[28px] sm:text-[32px] font-normal">{{ t('Report__Title') }}</h1>

            <div v-if="isLoading" class="flex justify-center items-center mt-8 h-screen">
                <div class="loader"></div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-8">
                <ReportCard v-for="report in reports" :key="report.file" :title="report.title"
                    :size="(report.file_size / 1024 / 1024).toFixed(1) + ' MB'" :format="report.file_type.toUpperCase()"
                    :downloadUrl="report.file" />
            </div>

            <!-- Пагинация -->
            <div class="flex items-center justify-end mt-[22px]" v-if="totalPages > 1 && !loading">
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

/* Кастомный лоадер */
.loader {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #33B34A;
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
