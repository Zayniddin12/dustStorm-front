<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import { useI18n } from 'vue-i18n';
import { onClickOutside } from '@vueuse/core';
import { useSupportStore } from '@/Store/store';

let chartInstance = ref(null);
const { t, locale } = useI18n();
const supportStore = useSupportStore();
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const selectedYear = ref(null);
const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};


const selectYear = (year) => {
    selectedYear.value = year;
    isOpen.value = false;



    

};

const dropdownRef = ref(null);

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});


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
                        <div class="relative w-full max-w-[333px]" ref="dropdownRef">
                            <div @click="toggleDropdown" class="custom-select">
                                {{ selectedYear || "Выберите год" }}
                                <span class="arrow" :class="{ open: isOpen }">&#9662;</span>
                            </div>
                            <ul v-if="isOpen" class="custom-dropdown">
                                <li v-for="year in years" :key="year" @click="selectYear(year)">
                                    {{ year }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="css" scoped>
.custom-select {
    margin-top: 10px;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #a0aec0;
    border-radius: 8px;
    background-color: white;
    color: black;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-dropdown {
    position: absolute;
    width: 100%;
    background: white;
    border: 1px solid #a0aec0;
    border-radius: 8px;
    margin-top: 4px;
    padding: 5px 0;
    z-index: 10;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.2s ease-in-out;
}

.custom-dropdown li {
    padding: 10px 16px;
    cursor: pointer;
    transition: 0.3s;
}

.custom-dropdown li:hover {
    background-color: #33B34A;
    color: white;
}

/* Анимация появления */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Стрелка */
.arrow {
    transition: transform 0.3s;
}

.arrow.open {
    transform: rotate(180deg);
}
</style>
