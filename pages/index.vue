<template>
  <div>
    <SectionsMain />
    <SeaAral />
    <AnnualChart />
    <Event />
    <SectionsReport />
    <Contact />
  </div>
</template>
<script setup lang="ts">
import Event from '@/components/Sections/Main/Event.vue'
import SectionsReport from '@/components/Sections/Report/Report.vue'
import Contact from '@/components/Sections/Main/Contact.vue'
import SeaAral from '@/components/Sections/Main/SeaAral.vue'
import AnnualChart from '@/components/Sections/Main/AnnualChart.vue'
</script>
