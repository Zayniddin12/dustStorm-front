<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import { useI18n } from 'vue-i18n';
import { useSupportStore } from '@/Store/store';

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const selectedYear = ref(null);
let chartInstance = ref(null);
const { t, locale } = useI18n();
const supportStore = useSupportStore();

const labelsMap = {
    ru: ['Север', 'Северо-восток', 'Восток', 'Юго-восток', 'Юг', 'Юго-запад', 'Запад', 'Северо-запад'],
    uz: ['Shimol', 'Shimoli-sharq', 'Sharq', 'Janubi-sharq', 'Janub', 'Janubi-gʻarb', 'Gʻarb', 'Shimoli-gʻarb'],
    en: ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest']
};

const generateRadarData = () => {
    const labels = labelsMap[locale.value] || labelsMap.en;
    const data = supportStore.windData.map(item => item.wind_speed ?? 0);

    return {
        labels,
        datasets: [{
            data,
            backgroundColor: '#38B847A1',
            borderColor: '#33B34A',
            pointBackgroundColor: '#33B34A',
            pointBorderColor: '#fff',
        }]
    };
};

const initChart = () => {
    const ctx = document.getElementById('windRadarChart');

    if (chartInstance.value) {
        chartInstance.value.destroy();
    }

    chartInstance.value = new Chart(ctx, {
        type: 'radar',
        data: generateRadarData(),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 8,
                    grid: { color: 'rgba(0, 0, 0, 0.1)' },
                    pointLabels: { color: '#374151', font: { size: 14 } },
                    ticks: {
                        stepSize: 1,
                        callback: (value) => value
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true, backgroundColor: '#1F2937' }
            }
        }
    });
};

watch([selectedYear, locale], async ([newYear]) => {
    if (newYear) {
        await supportStore.getWindAverage(newYear);
        initChart();
    }
});

onMounted(() => {
    selectedYear.value = years[0];
});
</script>


<template>
    <section class="bg-gray-200 py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px] mt-[50px]">
            <div class="flex flex-col lg:flex-row justify-between mb-[24px]">
                <div class="w-full lg:w-[583px] h-[350px] lg:h-[573px] bg-white rounded-2xl p-4">
                    <canvas id="windRadarChart"></canvas>
                </div>

                <div class="w-full lg:w-auto mt-6 lg:mt-0">
                    <h1 class="text-24 lg:text-32 font-bold mb-[14px] text-left">
                        {{ t("Chart__title") }}
                    </h1>
                    <p class="text-14 lg:text-16 w-full lg:w-[556px] mt-4 text-dark-300">
                        {{ t("Chart__text") }}
                    </p>

                    <div class="mt-[22px]">
                        <h2 class="font-bold text-14 text-left">
                            {{ t("Chart__select") }}
                        </h2>
                        <select v-model="selectedYear"
                            class="w-full lg:w-[333px] mt-[12px] py-[12px] px-[16px] border border-gray-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary">
                            <option v-for="year in years" :key="year" :value="year">
                                {{ year }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
