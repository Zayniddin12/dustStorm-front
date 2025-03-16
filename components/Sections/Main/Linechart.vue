<template>
  <section class="w-full md:w-[70%] transition-all duration-300 ease-in-out">
    <div>
      <h4 class="text-xl text-dark font-semibold mb-10">
        {{ $t('attendance') }}
      </h4>
    </div>
    <CCard class="flex-shrink-0 p-6 relative min-h-[300px]">
      <div class="flex justify-between mb-5">
        <Tab
          :list="tabList"
          :model-value="tabValue"
          @update:model-value="tabValue = $event"
          class="space-x-3 border-none"
          item-class="!pt-0 whitespace-nowrap"
        />
      </div>
      <Transition mode="out-in" name="fade">
        <div v-if="!loading" :key="series?.[0]?.data?.length">
          <div v-if="series?.[0]?.data?.length">
            <client-only>
              <VueApexCharts
                :options="options"
                :series="series"
                height="180px"
              />
            </client-only>
          </div>

          <div v-if="!series?.[0].data.length">
            <NoData
              :title="$t('empty_data')"
              class="mt-8"
              image="/svg/empty-state.svg"
            />
          </div>
        </div>
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <CommonSpinner />
        </div>
      </Transition>
    </CCard>
  </section>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CCard from '@/components/Cards/CCard.vue'
import Tab from '@/components/Tab/CTab.vue'
import { useSupportStore } from '@/Store/store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const supportStore = useSupportStore()
const tabValue = ref('wind_speed')

const loading = computed(() => supportStore.isLoading)

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

const tabList = ref([{ label: t('wind'), value: 'wind_speed' }])

const response = computed(() => supportStore.windSpeedAvgData)

watch(tabValue, (newValue) => {
  supportStore.getWindSpeedAvg(newValue)
})

watch(
  response,
  () => {
    windData.value =
      response.value?.series?.[0]?.data?.map(
        (item: { x: number; y: number }) => ({
          x: item.x,
          y: item.y,
        })
      ) || []
  },
  { immediate: true }
)

const series = computed(() => [
  {
    name: t(tabValue.value),
    data:
      windData.value?.length > 0
        ? windData.value
        : [{ x: new Date().getFullYear(), y: 0 }],
  },
])
</script>
