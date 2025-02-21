import { defineNuxtPlugin } from '#app'
import { createApp } from 'vue'
import YmapPlugin from 'vue-yandex-maps'

export default defineNuxtPlugin((nuxtApp) => {
  const settings = {
    apiKey: 'YOUR_YANDEX_MAPS_API_KEY', // Yandex API kalitingizni qo'ying
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
  }

  nuxtApp.vueApp.use(YmapPlugin, settings)
})
