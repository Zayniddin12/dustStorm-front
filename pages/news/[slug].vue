<template>
  <div>
    <UIBreadcrump :breadcrumb="breadcrumbRoutes" />
    <div class="container">
      <div class="max-w-[782px] w-full mx-auto md:pt-6 pt-3 md:pb-[76px] mb-6">
        <h1
          class="md:text-[32px] sm:text-2xl text-xl md:font-bold font-semibold text-dark-300 leading-140 md:mb-11 mb-6"
        >
          {{ single?.title }}
        </h1>
        <img
          :src="single?.image"
          :alt="single?.title"
          class="w-full aspect-video object-cover max-h-[372px] rounded-2xl"
        />
        <div class="vhtml-text mt-4" v-html="single?.content" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { INewsSingle } from '~/types/common'
const { t, locale } = useI18n()
const route = useRoute()
const loading = ref(true)
const single = ref<INewsSingle>()
function getSingle() {
  loading.value = true
  useApi()
    .$get<INewsSingle>(`${locale.value}/api/main/news/${route.params.slug}`)
    .then((res) => {
      single.value = res
      loading.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

getSingle()

const breadcrumbRoutes = computed(() => [
  {
    title: t('InfoArt__Title'),
    link: '/news',
  },
  {
    title: single.value?.title,
    link: '',
  },
])
</script>
<style>
.vhtml-text p {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #1c1f20;
  word-break: break-word;
}
.vhtml-text a {
  color: #1c92e0;
}
.vhtml-text a:hover {
  text-decoration: underline;
}
.vhtml-text img {
  width: 100%;
  max-width: 253px;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
}

.vhtml-text blockquote {
  margin: 20px 0;
  padding: 16px 16px 16px 64px;
  position: relative;
  background: #1a2226;
  border-radius: 20px;
}
.vhtml-text blockquote p {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 8px;
}
.vhtml-text blockquote p,
.vhtml-text blockquote {
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #f7f9fa;
  font-style: italic;
}
.vhtml-text blockquote:after {
  content: '\e947';
  font-family: icomoon;
  position: absolute;
  left: 20px;
  top: 20px;
  color: #1c1f20;
  font-size: 20px;
  line-height: 20px;
}

.vhtml-text ol li,
.vhtml-text ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #1c1f20;
}
.vhtml-text ul,
.vhtml-text ol {
  padding-left: 20px;
  margin: 20px 0;
}
.vhtml-text ul {
  list-style: disc;
}
.vhtml-text ol {
  list-style: auto;
}

@media screen and (max-width: 768px) {
  .vhtml-text p,
  .vhtml-text blockquote {
    font-size: 16px;
    line-height: 140%;
  }
  .vhtml-text img,
  .vhtml-text blockquote,
  .vhtml-text ul,
  .vhtml-text ol {
    margin: 12px 0;
  }
}
@media (max-width: 640px) {
  .vhtml-text ol li,
  .vhtml-text blockquote,
  .vhtml-text ul li {
    font-size: 14px !important;
  }
}
</style>
