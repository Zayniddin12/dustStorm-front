// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Dust Storm',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          // href: `/favicon.png`,
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dust Storm',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Using modern artificial intelligence technologies, we predict dust storms in the Aral Sea region and protect our nature from future disasters. Remember, protecting nature is the duty of each of us, because if we protect it, it will protect us!',
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: 'Twitter Image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'Dust Storm',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'Using modern artificial intelligence technologies, we predict dust storms in the Aral Sea region and protect our nature from future disasters. Remember, protecting nature is the duty of each of us, because if we protect it, it will protect us!',
        },
        {
          name: 'description',
          content:
            'Using modern artificial intelligence technologies, we predict dust storms in the Aral Sea region and protect our nature from future disasters. Remember, protecting nature is the duty of each of us, because if we protect it, it will protect us!',
        },
      ],
    },
  },

  imports: {
    autoImport: true, // Включает автоматический импорт
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    'nuxt-marquee',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // defineStore avtomatik import qilinadi
          ['defineStore', 'definePiniaStore'], // defineStore 'definePiniaStore' nomi bilan import qilinadi
        ],
      },
    ],
    'vue-yandex-maps/nuxt',
  ],


  css: ['@/assets/tailwind.css'],
  build: {
    transpile: ['vue-toastification', 'vue3-apexcharts', 'vue-yandex-maps'],
  },
  vite: {
    optimizeDeps: {
      include: ['apexcharts'],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.VITE_API_BASE_URL || 'http://localhost',
    },
  },

  devServerHandlers: [],

  nitro: {
    serveStatic: true,
  },

  experimental: {
    payloadExtraction: false,
  },

  yandexMaps: {
    apikey: '9191d860-42c5-4e70-98aa-8c92721bbdc3',
  },

  compatibilityDate: '2024-08-27',
})
