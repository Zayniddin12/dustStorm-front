<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'
import { useI18n } from 'vue-i18n'
import { useSupportStore } from '@/Store/store'

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
const selectedYear = ref(2025)
const chartInstance = ref(null)
const { t, locale } = useI18n()
const supportStore = useSupportStore()
const isOpen = ref(false)

const labelsMap = {
  ru: [
    'Сев', // Север
    'СВ', // Северо-восток
    'Вост', // Восток
    'ЮВ', // Юго-восток
    'Юг', // Юг
    'ЮЗ', // Юго-запад
    'Зап', // Запад
    'СЗ', // Северо-запад
  ],
  uz: [
    'Shim', // Shimol
    'Sh-Sh', // Shimoli-sharq
    'Sharq', // Sharq
    'J-Sh', // Janubi-sharq
    'Janub', // Janub
    'J-Gʻ', // Janubi-gʻarb
    'Gʻarb', // Gʻarb
    'Sh-Gʻ', // Shimoli-gʻarb
  ],
  en: [
    'N', // North
    'NE', // Northeast
    'E', // East
    'SE', // Southeast
    'S', // South
    'SW', // Southwest
    'W', // West
    'NW', // Northwest
  ],
}

const generateRadarData = () => {
  const labels = labelsMap[locale.value] || labelsMap.en
  const data = supportStore.windData.map((item) => item.wind_repeat ?? 0)
  console.log(data)

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: '#38B847A1',
        borderColor: '#33B34A',
        pointBackgroundColor: '#33B34A',
        pointBorderColor: '#fff',
      },
    ],
  }
}

const initChart = () => {
  const ctx = document.getElementById('windRadarChart')
  if (chartInstance.value) chartInstance.value.destroy()
  chartInstance.value = new Chart(ctx, {
    type: 'radar',
    data: generateRadarData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          grid: { color: 'rgba(0, 0, 0, 0.1)' },
          pointLabels: { color: '#374151', font: { size: 14 } },
          ticks: {
            display: false, // Ticks (raqamlar) ko‘rinmas bo‘lishi uchun
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true, backgroundColor: '#1F2937' },
      },
    },
  })
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectYear = (year) => {
  selectedYear.value = year
  isOpen.value = false
}

watch(
  selectedYear,
  async () => {
    await supportStore.getWindAverage(selectedYear.value)
    initChart()
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  selectedYear.value = years[0]
})
</script>

<template>
  <section>
    <div class="flex flex-col-reverse gap-2 justify-between">
      <div class="size-full bg-white rounded-2xl p-4">
        <canvas id="windRadarChart"></canvas>
      </div>
      <div class="w-full lg:w-auto lg:mt-0">
        <h1 class="text-xl text-dark font-semibold mb-1">
          {{ t('Chart__title') }}
        </h1>
        <div>
          <div class="relative w-full max-w-[333px]">
            <div @click="toggleDropdown" class="custom-select">
              {{ selectedYear || 'Выберите год' }}
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
  background-color: #33b34a;
  color: white;
}

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

.arrow {
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}
</style>
