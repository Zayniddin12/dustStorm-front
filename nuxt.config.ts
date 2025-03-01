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
          content: 'Unit Study',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Unity Study provides quality education consulting and guarantees study opportunities abroad, offering expert guidance for a successful international educational experience.',
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: 'Twitter Image',
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: 'Unit Study',
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content:
            'Unity Study provides quality education consulting and guarantees study opportunities abroad, offering expert guidance for a successful international educational experience.',
        },
        {
          name: 'description',
          content:
            'Unity Study provides quality education consulting and guarantees study opportunities abroad, offering expert guidance for a successful international educational experience',
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

  // site: {
  //   url: 'https://unit-study.uicgroup.tech/',
  // },
  // routeRules: {
  //   '/': {
  //     sitemap: {
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
  //     },
  //   },
  //   '/ru': {
  //     sitemap: {
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
  //     },
  //   },
  //   '/en': {
  //     sitemap: {
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
  //     },
  //   },
  // },
  // sitemap: {
  //   exclude: ['/profile/**', '/profile', '/edit/**', '/edit'],
  //   xslColumns: [
  //     { label: 'URL', width: '50%' },
  //     { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
  //     { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
  //     {
  //       label: 'Change Frequency',
  //       select: 'sitemap:changefreq',
  //       width: '12.5%',
  //     },
  //   ],
  // },

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
