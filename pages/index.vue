<template>
  <div>
    <SectionsMain />
    <SeaAral />
    <Linechart />
    <AnnualChart />
    <Event />
    <SectionsReport />
  </div>
</template>
<script setup lang="ts">
import Event from '@/components/Sections/Main/Event.vue'
import Linechart from '~/components/Sections/Main/Linechart.vue';
import SectionsReport from '@/components/Sections/Report/Report.vue'
import SeaAral from '@/components/Sections/Main/SeaAral.vue'
import AnnualChart from '@/components/Sections/Main/AnnualChart.vue'
</script>
