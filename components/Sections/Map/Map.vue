<template>
  <div>
    <div
      v-if="totalData"
      class="relative flex max-md:flex-col md:items-center md:h-[580px] max-md:hidden"
    >
      <!-- Overlay (Form va Map o'rtasida joylashgan) -->
      <div
        :class="isBlock ? 'block' : 'hidden'"
        @keyup="toggleHidden"
        @keydown="toogleBlock"
        @dblclick="removeHidden"
        tabindex="0"
        class="absolute w-screen h-full z-10"
      ></div>

      <!-- Chap tarafdagi forma -->
      <div class="container relative z-20 w-[480px]">
        <div
          class="md:w-[470px] h-full flex items-end justify-between shadow-map-list"
        >
          <div
            class="flex flex-col md:w-[480px] w-full relative z-20 h-[580px]"
          >
            <div class="md:w-[480px] w-full bg-white p-4 flex items-center">
              <FormInput
                v-model="searchPeople"
                type="text"
                :placeholder="$t('search_placeholder')"
                class="h-[44px]"
              >
                <template #prefix>
                  <i class="icon-search text-blue mr-2" />
                </template>
                <template #suffix>
                  <span
                    :class="
                      searchPeople.length
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible'
                    "
                    class="icon-close-mark text-sm leading-[14px] ml-2 text-dark-light hover:text-blue cursor-pointer transition-all"
                    @click="clearSearch"
                  />
                </template>
              </FormInput>
            </div>
            <template v-if="isLoading">
              <div
                class="bg-grey-400 p-4 h-[504px] overflow-y-scroll overflow-x-hidden pb-8"
              >
                <CardsStations
                  v-for="index in 10"
                  :key="index"
                  :loading="isLoading"
                />
              </div>
            </template>
            <template v-else>
              <div
                v-if="people?.length"
                class="list-people bg-grey-400 p-4 h-[504px] overflow-y-scroll overflow-x-hidden"
              >
                <CardsStations
                  v-for="(item, index) in people"
                  :key="index"
                  :item="item"
                  @getLocation="zoomMap(item)"
                  :loading="isLoading"
                  :keywords="searchPeople"
                  :active="
                    activeCoord?.lat
                      ? item?.lat === activeCoord?.lat &&
                        item?.lng === activeCoord?.lng
                      : false
                  "
                />
                <div
                  v-if="total > people.length && !isLoading"
                  class="h-2 w-full"
                  ref="target"
                ></div>
              </div>
              <div v-else class="bg-[#F4F7FA] p-4 h-[504px] overflow-y-scroll">
                <CommonArticleNoData />
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Yandex Map (butun ekran bo'ylab) -->
      <client-only>
        <yandex-map
          v-model="activeCoord"
          :coords="coords"
          :settings="settings"
          :zoom="16"
          :controls="[]"
          class="absolute inset-0 w-screen h-full z-0"
        >
          <yandex-map-default-scheme-layer />
          <yandex-map-default-features-layer />
          <yandex-map-marker
            v-for="(card, i) in markers"
            :key="i"
            :settings="{ coordinates: [card?.latitude, card?.longitude] }"
            marker-id="123"
            position="top-center left-center"
            class="!size-20"
          >
            <img
              alt="Marker"
              class="cursor-pointer w-[45px] h-[60px]"
              src="/public/images/svg/map-pin-filled.svg"
          /></yandex-map-marker>
        </yandex-map>
      </client-only>
    </div>

    <div class="relative flex flex-col md:hidden">
      <div class="!py-3 container">
        <TabGroup class=" " v-model="activeTab" :list="tabs" />
      </div>

      <Transition
        mode="out-in"
        :name="activeTab === 'list' ? 'map-active' : 'list-active'"
      >
        <div :key="activeTab">
          <div v-if="activeTab === 'list'" class="container">
            <div
              class="h-full z-1 flex items-end justify-between shadow-map-list"
            >
              <div class="flex flex-col w-full">
                <FormInput
                  v-model="searchPeople"
                  type="text"
                  :placeholder="$t('search_placeholder')"
                  class="h-[44px] bg-white py-3 overflow-hidden"
                >
                  <template #prefix>
                    <i class="icon-search text-blue mr-2" />
                  </template>
                  <template #suffix>
                    <span
                      :class="
                        searchPeople.length
                          ? 'opacity-100 visible'
                          : 'opacity-0 invisible'
                      "
                      class="icon-x text-base leading-6 ml-2 text-[#727278] hover:text-dark cursor-pointer transition-all"
                      @click="searchPeople = ''"
                    />
                  </template>
                </FormInput>
                <template v-if="isLoading">
                  <div
                    class="bg-grey-400 p-4 overflow-y-scroll h-[530px] overflow-x-hidden pb-8"
                  >
                    <CardsStations
                      v-for="index in 10"
                      :key="index"
                      :loading="isLoading"
                    />
                  </div>
                </template>
                <template v-else>
                  <div
                    v-if="people?.length"
                    class="list-people bg-grey-400 p-4 h-[530px] overflow-y-scroll overflow-x-hidden"
                  >
                    <CardsStations
                      v-for="(item, index) in people"
                      :key="index"
                      :item="item"
                      @getLocation="zoomMap(item, true)"
                      :loading="isLoading"
                      :keywords="searchPeople"
                      :active="
                        activeCoord?.location
                          ? item?.location === activeCoord?.location
                          : false
                      "
                    />
                    <div
                      v-if="total > people.length && !isLoading"
                      class="h-2 w-full"
                      ref="target"
                    ></div>
                  </div>
                  <div
                    v-else
                    class="bg-[#F4F7FA] p-4 h-[504px] overflow-y-scroll"
                  >
                    <CommonArticleNoData />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'map'" class="relative h-[300px]">
            <client-only :key="activeTab">
              <yandex-map
                v-model="activeCoord"
                :coords="coords"
                :settings="settings"
                :zoom="16"
                :controls="[]"
                class="absolute inset-0 w-screen h-full z-0"
              >
                <yandex-map-default-scheme-layer />
                <yandex-map-default-features-layer />
                <yandex-map-marker
                  v-for="(card, i) in markers"
                  :key="i"
                  :settings="{ coordinates: [card?.latitude, card?.longitude] }"
                  marker-id="123"
                  position="top-center left-center"
                  class="!size-20"
                >
                  <img
                    alt="Marker"
                    class="cursor-pointer w-[45px] h-[60px]"
                    src="/public/images/svg/map-pin-filled.svg"
                /></yandex-map-marker>
              </yandex-map>
            </client-only>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'
import type { LngLat } from '@yandex/ymaps3-types'

import { useI18n } from 'vue-i18n'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapFeature,
  YandexMapMarker,
} from 'vue-yandex-maps'
import { useDebounce, useIntersectionObserver } from '@vueuse/core'
import type { ICommonDataResponse } from '~/types/common'
const router = useRouter()
const isLoading = ref(true)
const coords = ref<{ lat?: number; lng?: number; name?: string }>({
  lat: 0,
  lng: 0,
})
const { t, locale } = useI18n()
const isBlock = ref(true)

function toggleHidden(a: any) {
  isBlock.value = true
}
function toogleBlock(a: any) {
  console.log(a)
  if (a.ctrlKey || a.key == 'Meta') {
    isBlock.value = false
  }
}
function removeHidden(a: any) {
  isBlock.value = false
}
const settings = computed(() => ({
  apiKey: '',
  lang: 'ru_RU',
  location: {
    center: [
      activeCoord.value?.lat ? activeCoord.value?.lat : coords.value?.lat,
      activeCoord.value?.lng ? activeCoord.value?.lng : coords.value?.lng,
    ],
    zoom: 10,
  }, // Default center (Tashkent)
  coordorder: 'latlong',
  version: '2.1',
}))
const behaviors = ref('drag')
const markerIcon = {
  layout: 'default#imageWithContent',
  imageHref: '/public/images/svg/close.svg',
  imageSize: [75, 75],
  imageOffset: [0, 0],
  content: '',
  contentOffset: [0, 15],
  contentLayout: '',
}
const loading = ref(false)
const limit = ref(10)
const offset = ref(0)
const people = ref([])
const markers = ref([])
const total = ref(0)
const totalData = ref(0)
const searchPeople = ref('')
const map = ref()
const target = ref(null)
const targetIsVisible = ref(false)
const markerOptions = computed(() => {
  let lat = Number(people.value?.at(0)?.location?.split(';')[0])
  let lng = Number(people.value?.at(0)?.location?.split(';')[1])

  return { position: { lat, lng }, icon: '/images/home-map-marker.svg' }
})
// const coords = ref([12.3456, 15.6544])

const activeCoord = ref<{ lat?: number; lng?: number; name?: number }>({
  name: 1,
  lat: 43.8333,
  lng: 57.51,
})
const activeTab = ref('map')
const tabs = reactive([
  {
    value: 'map',
    label: t('map'),
  },
  {
    value: 'list',
    label: t('list'),
  },
])

interface Props {
  contact?: {
    id: number
    title: string
    address: string
    emails: [string]
    phones: [string]
    latitude: string
    longitude: string
    youtube: string
    instagram: string
    telegram: any
    twitter: string
  }
  title?: string
}

withDefaults(defineProps<Props>(), {})
function handleCtrl(event) {
  console.log(event)
}
async function fetchData() {
  await useApi()
    .$get<ICommonDataResponse<any>>(`${locale.value}/api/main/station/`, {
      params: {
        limit: limit.value,
        offset: offset.value,
      },
    })
    .then((res) => {
      totalData.value = res?.count
      total.value = res?.count
      people.value = res?.results
      if (res?.results?.length > 0) {
        const firstLocation = res.results?.[0]
        coords.value = {
          lat: Number(firstLocation.latitude),
          lng: Number(firstLocation.longitude),
          name: firstLocation.name,
        }
        activeCoord.value = coords.value
        console.log('activfeCoord:', activeCoord.value)
      }
      markers.value = res?.results || []
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 400)
    })
}
fetchData()

// FETCH
onMounted(async () => {
  document.addEventListener('keydown', toogleBlock)
  document.addEventListener('keyup', toggleHidden)
})

// Infinite scroll
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      loadMore()
    }
  }
)

async function loadMore() {
  if (isLoading.value || people.value.length >= total.value) return

  try {
    isLoading.value = true
    offset.value += limit.value

    const res = await useApi().$get(`${locale.value}/api/main/station/`, {
      params: {
        limit: limit.value,
        offset: offset.value,
        search: searchPeople.value,
      },
    })

    people.value = [...people.value, ...res.results]
    markers.value = [...markers.value, ...res.results]
  } catch (error) {
    console.error('Load more error:', error)
  } finally {
    isLoading.value = false
  }
}

// SEARCH
const debouncedSearch = useDebounce(searchPeople, 300)

watch(debouncedSearch, async (newQuery) => {
  try {
    isLoading.value = true
    offset.value = 0
    const res = await useApi().$get(`${locale.value}/api/main/station/`, {
      params: {
        limit: limit.value,
        offset: offset.value,
        search: newQuery,
      },
    })
    total.value = res?.count
    people.value = res?.results || []
    markers.value = res?.results || []

    // Zoom to first search result if exists
    if (res?.results?.length > 0) {
      const firstResult = res.results[0]
      zoomMap(firstResult)
    }
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    isLoading.value = false
  }
})

// GET COORDS
function zoomMap(item: any, mobile?: boolean) {
  if (!item?.latitude || !item?.longitude) return

  const lat = Number(item.latitude)
  const lng = Number(item.longitude)

  coords.value = { lat, lng }
  activeCoord.value = {
    lat,
    lng,
    name: item.name,
  }

  if (mobile) {
    activeTab.value = 'map'
  }
}

const clearSearch = () => {
  searchPeople.value = ''
}
</script>

<style>
.list-active-enter-active,
.list-active-leave-active,
.map-active-enter-active,
.map-active-leave-active {
  transition: all 0.3s ease-out;
}

.list-active-enter-from {
  transform: translateX(50%);
  opacity: 0;
}

.list-active-leave-to {
  transform: translateX(-50%);
  opacity: 0;
}

.map-active-enter-from {
  transform: translateX(-50%);
  opacity: 0;
}

.map-active-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>
