<template>
  <div>
    <SectionsMain />
    <LazySectionsMainSeaAral />
    <div class="flex max-md:flex-col container gap-3">
      <ClientOnly>
        <LazySectionsMainLinechart />
      </ClientOnly>
      <ClientOnly>
        <LazySectionsMainAnnualChart />
      </ClientOnly>
    </div>

    <LazySectionsMainEvent />
    <LazySectionsReport />
    <div id="stations" ref="stationsSection">
      <ClientOnly><LazySectionsMapLeafletMap /></ClientOnly>
    </div>
    <LayoutsLoader custom-loading />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const stationsSection = ref(null)

onMounted(() => {
  if (route.fullPath === '#stations' && stationsSection.value?.$el) {
    setTimeout(() => {
      stationsSection.value.$el.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }
})
</script>
