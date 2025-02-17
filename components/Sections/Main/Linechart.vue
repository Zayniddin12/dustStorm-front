<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import ApexChart from "vue3-apexcharts";
import CCard from "@/components/Cards/CCard.vue";
import Tab from "@/components/Tab/CTab.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const tabList = reactive([
    {
        label: t("for_today"),
        value: "today",
    },
    {
        label: t("for_all_time"),
        value: "all",
    },
]);
const tabValue = ref("today");

const options = reactive({
    chart: {
        type: "area",
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
        },
        stacked: true,
        foreColor: "#090E14",
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
        type: "gradient",
        colors: ["#33B34A"],
        gradient: {
            opacityFrom: 0.8,
            opacityTo: 0.2,
        },
    },
    grid: {
        borderColor: "#ECF3FA",
        strokeDashArray: 5,
    },
    legend: {
        show: false,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        offsetY: -3,
        offsetX: 8,
        tooltip: {
            enabled: false,
        },
    }
});

const chartData = {
    today: [10, 20, 30, 40, 50],
    all: [5, 15, 25, 35, 45]
};

const series = computed(() => [{
    name: tabValue.value === 'today' ? 'Today' : 'All Time',
    data: tabValue.value === 'today' ? chartData.today : chartData.all
}]);

console.log(options);
console.log(series);
</script>

<template>
    <section class="bg-gray-200 py-[30px]">
        <div class="mx-auto max-w-[1200px] px-[15px]">
            <CCard class="flex-shrink-0 p-6">
                <div class="flex justify-between mb-5">
                    <div>
                        <h4 class="text-xl text-dark font-semibold mb-1">
                            {{ $t("attendance") }}
                        </h4>
                        <p class="text-gray-300 text-xs font-normal leading-130">
                            {{ $t("graphic_attendance") }}
                        </p>
                    </div>
                    <!-- <Tab :list="tabList" :model-value="tabValue" @update:model-value="tabValue = $event"
                        class="space-x-3 border-none" item-class="!pt-0 whitespace-nowrap" /> -->
                </div>
                <div class="h-[280px]">
                    <ApexChart :options="options" :series="series" height="280px" />
                </div>
                <div v-if="!series[0].data.length">
                    <NoData :title="$t('empty_data')" class="mt-8" image="/svg/empty-state.svg" />
                </div>
            </CCard>
        </div>
    </section>
</template>