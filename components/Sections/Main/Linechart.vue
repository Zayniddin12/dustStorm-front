<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CCard from '@/components/Cards/CCard.vue'
import Tab from '@/components/Tab/CTab.vue'
import { useSupportStore } from '@/Store/store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const supportStore = useSupportStore()
const tabValue = ref('wind')

const options = reactive({
  chart: {
    type: 'area',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
    stacked: true,
    foreColor: '#090E14',
    toolbar: {
      show: false,
    },
    width: 591,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    colors: ['#33B34A'],
    gradient: {
      opacityFrom: 0.8,
      opacityTo: 0.2,
    },
  },
  grid: {
    borderColor: '#ECF3FA',
    strokeDashArray: 5,
  },
  legend: {
    show: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'numeric',
    labels: {
      show: true,
      formatter: (val) => Math.round(val).toString(),
    },
    tooltip: {
      enabled: false,
    },
    tickAmount: 6,
  },
  yaxis: {
    labels: {
      show: true,
      formatter: (val) => val.toFixed(2),
    },
    tickAmount: 5,
  },
})

const windData = ref([])

const tabList = ref([
  { label: t('wind'), value: 'wind' },
])

onMounted(async () => {
  try {
    const parameterName = 'wind_speed'
    const response = await supportStore.getWindSpeedAvg(parameterName)
    if (response?.series?.length > 0 && response.series[0]?.data?.length > 0) {
      windData.value = response.series[0].data.map((item) => ({
        x: item.x,
        y: item.y
      }))
      console.log('Transformed wind data:', windData.value)
    } else {
      console.warn('No data available')
    }
  } catch (error) {
    console.error('Failed to fetch wind speed data:', error)
  }
})


const series = computed(() => [
  {
    name: 'Shamol namligi',
    data: windData.value.length > 0 ? windData.value : [{ x: new Date().getFullYear(), y: 0 }]
  }
])

</script>

<template>
  <section class="bg-gray-200 py-[30px]">
    <div class="mx-auto max-w-[1200px] px-[15px]">
      <CCard class="flex-shrink-0 p-6">
        <div class="flex justify-between mb-5">
          <div>
            <h4 class="text-xl text-dark font-semibold mb-1">
              {{ $t('attendance') }}
            </h4>
            <p class="text-gray-300 text-xs font-normal leading-130">
              {{ $t('graphic_attendance') }}
            </p>
          </div>
          <Tab :list="tabList" :model-value="tabValue" @update:model-value="tabValue = $event"
            class="space-x-3 border-none" item-class="!pt-0 whitespace-nowrap" />
        </div>
        <div v-if="series[0]?.data?.length">
          <client-only>
            <VueApexCharts :options="options" :series="series" height="280px" />
          </client-only>
        </div>

        <div v-if="!series[0].data.length">
          <NoData :title="$t('empty_data')" class="mt-8" image="/svg/empty-state.svg" />
        </div>
      </CCard>
    </div>
  </section>
</template>