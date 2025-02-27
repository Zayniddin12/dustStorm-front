<template>
  <div>
    <SectionsMain />
    <LazySectionsMainSeaAral />
    <ClientOnly>
      <LazySectionsMainLinechart />
    </ClientOnly>
    <LazySectionsMainAnnualChart />
    <LazySectionsMainEvent />
    <LazySectionsReport />
    <ClientOnly><LazySectionsMap :title="$t('donation_boxes')" /></ClientOnly>
  </div>
</template>
