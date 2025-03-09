<template>
  <div>
    <div
      class="relative flex max-md:flex-col md:items-center md:!h-[580px] bg-white max-md:hidden"
    >
      <div
        :class="isBlock ? 'block' : 'hidden'"
        @keyup="toggleHidden"
        @keydown="toogleBlock"
        @dblclick="removeHidden"
        tabindex="0"
        class="absolute w-screen h-full z-10"
      ></div>
      <!-- Chap tarafdagi forma -->
      <div class="container relative">
        <div
          class="md:!w-[470px] h-full z-[1] flex items-end justify-between shadow-map-list"
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
                class="bg-gray-900 p-4 h-[504px] overflow-y-scroll overflow-x-hidden pb-8"
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
                class="list-people bg-gray-900 p-4 h-[504px] overflow-y-scroll overflow-x-hidden"
              >
                <CardsStations
                  v-for="(item, index) in people"
                  :key="index"
                  :item="item"
                  @getLocation="zoomMap(item)"
                  :loading="isLoading"
                  :keywords="searchPeople"
                  :active="
                    coords?.lat
                      ? item?.latitude === coords?.lat &&
                        item?.longitude === coords?.lng
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
        <div class="absolute right-4 bottom-6 flex flex-col gap-2 z-20">
          <div
            class="p-1.5 bg-white hover:bg-primary group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-primary size-8 flex justify-center items-center"
            @click="toggleFullScreen"
          >
            <span
              class="icon-fullScreen text-dark group-hover:text-white transition-300 text-[20px]"
            />
          </div>
          <div
            class="p-1.5 hover:bg-primary group transition-300 bg-white rounded-lg border cursor-pointer border-gray-400 hover:border-primary size-8 flex justify-center items-center"
            @click="zoom++"
          >
            <span
              class="icon-plus text-dark group-hover:text-white transition-300 text-[20px]"
            />
          </div>
          <div
            class="p-1.5 bg-white hover:bg-primary group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-primary size-8 flex justify-center items-center"
            @click="zoom--"
          >
            <span
              class="icon-minus text-dark group-hover:text-white transition-300 text-[20px]"
            />
          </div>
          <div
            class="p-1.5 bg-white hover:bg-primary group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-primary size-8 flex justify-center items-center"
            @click="getCurrentLocation"
          >
            <span
              class="icon-gps text-dark group-hover:text-white transition-300 text-[20px]"
            />
          </div>
        </div>
      </div>

      <!-- Yandex Map (butun ekran bo'ylab) -->
      <client-only>
        <div
          ref="mapContainer"
          class="w-screen h-full !absolute !left-0 !top-0 z-1"
        >
          <yandex-map
            :coords="coords"
            :settings="settings"
            :zoom="zoom"
            :controls="[]"
          >
            <yandex-map-default-scheme-layer />
            <yandex-map-default-features-layer />
            <yandex-map-marker
              v-for="(card, i) in markers"
              :key="i"
              :settings="{ coordinates: [card?.longitude, card?.latitude] }"
              marker-id="123"
              position="top-center left-center"
              class="!size-20 !z-10"
              :class="{ '!z-[999]': selectedMarker?.id == card?.id }"
              @click="handleMarkerClick(card)"
            >
              <div
                class="size-[60px] flex-center rounded-full border border-primary bg-transparent"
              >
                <div
                  class="size-[35px] shadow-marker flex-center bg-primary rounded-full text-white text-sm font-normal"
                >
                  {{ card?.id }}
                </div>
              </div>
            </yandex-map-marker>
          </yandex-map>
        </div>
      </client-only>

      <!-- tooltip -->
      <div
        v-if="cardId"
        class="tooltip-container absolute bg-white rounded-lg shadow-lg p-4 min-w-[280px] z-[999]"
        style="position: absolute"
      >
        <h3 class="font-medium text-lg mb-2">
          {{ card.name }}
        </h3>
        <p class="text-gray-600 mb-1">{{ card.address }}</p>
        <div v-if="selectedMarkerData" class="mt-3 border-t pt-3">
          <div
            v-for="param in selectedMarkerData.parameters"
            :key="param.name_id"
            class="mb-2"
          >
            <div class="flex justify-between items-center">
              <span class="text-dark">{{ param.name }}:</span>
              <span class="font-medium text-dark">{{ param.value }}ger</span>
            </div>
            <div class="text-xs text-gray-500">
              {{ new Date(param.date).toLocaleString() }}
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-2">
          <a
            v-if="card.phones?.length"
            :href="`tel:${card.phones[0]}`"
            class="text-blue hover:underline"
            >{{ card.phones[0] }}</a
          >
          <a
            v-if="card.emails?.length"
            :href="`mailto:${card.emails[0]}`"
            class="text-blue hover:underline"
            >{{ card.emails[0] }}</a
          >
        </div>
      </div>
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
                        coords?.lat
                          ? item?.latitude === coords?.lat &&
                            item?.longitude === coords?.lng
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
                  :settings="{ coordinates: [card?.longitude, card?.latitude] }"
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
import { useI18n } from 'vue-i18n'
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps'
import { useDebounce, useIntersectionObserver } from '@vueuse/core'
import type { ICommonDataResponse } from '~/types/common'
const isLoading = ref(true)
const coords = ref<{ lat?: number; lng?: number; name?: string }>({
  lat: 0,
  lng: 0,
})
const { t, locale } = useI18n()
const isBlock = ref(true)
const zoom = ref(7)
function toggleHidden(a: any) {
  isBlock.value = true
}
function toogleBlock(a: any) {
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
      coords.value?.lng ? coords.value?.lng : '',
      coords.value?.lat ? coords.value?.lat : '',
    ],
    zoom: zoom.value,
  }, // Default center (Tashkent)
  coordorder: 'latlong',
  version: '2.1',
}))

const limit = ref(10)
const offset = ref(0)
const people = ref([])
const markers = ref([])
const total = ref(0)
const totalData = ref(0)
const searchPeople = ref('')
const target = ref(null)
// const coords = ref([12.3456, 15.6544])

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
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        coords.value = { lat: longitude, lng: latitude }
      },
      (error) => {
        console.error('Error getting location: ', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}
const mapContainer = ref(null)

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    mapContainer.value.requestFullscreen().catch((err) => {
      console.error("To'liq ekranga o'tkazib bo‘lmadi:", err)
    })
  } else {
    document.exitFullscreen()
  }
}
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

  if (mobile) {
    activeTab.value = 'map'
  }
}

const clearSearch = () => {
  searchPeople.value = ''
}
const selectedMarker = ref(null)
const selectedMarkerData = ref(null)
const cardId = ref(null)

async function handleMarkerClick(marker) {
  try {
    if (selectedMarker.value?.id === marker.id) {
      selectedMarker.value = null
      selectedMarkerData.value = null
      cardId.value = null
      return
    }

    selectedMarker.value = marker
    cardId.value = marker.id

    // Get marker position
    const markerElement = document.querySelector(
      `[data-marker-id="${marker.id}"]`
    )
    if (markerElement) {
      const markerRect = markerElement.getBoundingClientRect()
      const mapContainer = document.querySelector('.ymaps3x0--map')
      if (mapContainer) {
        const mapRect = mapContainer.getBoundingClientRect()
        const tooltipElement = document.querySelector('.tooltip-container')
        if (tooltipElement) {
          const tooltipRect = tooltipElement.getBoundingClientRect()
          const left = markerRect.left - mapRect.left + markerRect.width / 2
          const top = markerRect.top - mapRect.top - tooltipRect.height - 10
          tooltipElement.style.left = `${left}px`
          tooltipElement.style.top = `${top}px`
        }
      }
    }

    const response = await useApi().$get(
      `${locale.value}/api/main/station-parameter/${marker.id}/`
    )
    selectedMarkerData.value = response
  } catch (error) {
    console.error('Error fetching station parameters:', error)
  }
}
</script>

<style>
.ymaps3x0--map-copyrights {
  display: none !important;
}
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
.ymaps3x0--map-marker {
  cursor: pointer;
}
</style>
