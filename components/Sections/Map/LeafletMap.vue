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
        class="absolute w-screen h-full z-[50]"
      ></div>
      <!-- Left side form -->
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
            @click="zoomIn"
          >
            <span
              class="icon-plus text-dark group-hover:text-white transition-300 text-[20px]"
            />
          </div>
          <div
            class="p-1.5 bg-white hover:bg-primary group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-primary size-8 flex justify-center items-center"
            @click="zoomOut"
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

      <!-- Leaflet Map -->
      <client-only>
        <div class="w-screen h-full !absolute !left-0 !top-0 z-[0]">
          <l-map
            id="map"
            v-model="zoom"
            :center="[coords.lat, coords.lng]"
            :zoom="zoom"
            :options="{ zoomControl: false }"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            />
            <l-marker
              v-for="(marker, index) in markers"
              :key="index"
              :lat-lng="[Number(marker.latitude), Number(marker.longitude)]"
              @click="handleMarkerClick(marker)"
            >
              <l-icon
                :icon-url="'/images/svg/map-pin-filled.svg'"
                :icon-size="[45, 60]"
                :icon-anchor="[22.5, 60]"
              />
            </l-marker>

            <l-polygon
              :lat-lngs="qaraqalpaqBorder"
              color="#001C3C"
              :fill="true"
              fill-color="#001C3C"
              :fill-opacity="0.1"
              :weight="2"
            />
          </l-map>
        </div>
      </client-only>

      <!-- Tooltip -->
      <div
        v-if="cardId"
        class="tooltip-container absolute bg-white rounded-lg shadow-lg p-4 min-w-[280px] z-[999]"
        :style="tooltipStyle"
      >
        <h3 class="font-medium text-lg mb-2">
          {{ selectedMarker?.name }}
        </h3>
        <p class="text-gray-600 mb-1">{{ selectedMarker?.address }}</p>
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
            v-if="selectedMarker?.phones?.length"
            :href="`tel:${selectedMarker.phones[0]}`"
            class="text-blue hover:underline"
            >{{ selectedMarker.phones[0] }}</a
          >
          <a
            v-if="selectedMarker?.emails?.length"
            :href="`mailto:${selectedMarker.emails[0]}`"
            class="text-blue hover:underline"
            >{{ selectedMarker.emails[0] }}</a
          >
        </div>
      </div>
    </div>

    <!-- Mobile View -->
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
            <!-- Mobile list view content -->
            <div
              class="h-full z-1 flex items-end justify-between shadow-map-list"
            >
              <!-- Search and list content similar to desktop view -->
            </div>
          </div>
          <div v-if="activeTab === 'map'" class="relative h-[300px]">
            <client-only :key="activeTab">
              <l-map
                v-model="zoom"
                :center="[coords.lat, coords.lng]"
                :zoom="16"
                :options="{ zoomControl: false }"
                class="absolute inset-0 w-screen h-full z-0"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                />
                <l-marker
                  v-for="(marker, index) in markers"
                  :key="index"
                  :lat-lng="[Number(marker.latitude), Number(marker.longitude)]"
                >
                  <l-icon
                    :icon-url="'/images/svg/map-pin-filled.svg'"
                    :icon-size="[45, 60]"
                    :icon-anchor="[22.5, 60]"
                  />
                </l-marker>
              </l-map>
            </client-only>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useI18n } from 'vue-i18n'
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPolygon,
} from '@vue-leaflet/vue-leaflet'
import { useDebounce, useIntersectionObserver } from '@vueuse/core'
import type { ICommonDataResponse } from '~/types/common'

const mapContainer = ref(null)
const markerIcon = L.icon({
  iconUrl: '/images/svg/map-pin-filled.svg',
  iconSize: [32, 32],
})

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})
const qaraqalpaqBorder = ref([
  [45.586, 57.092],
  [45.196, 58.547],
  [44.784, 58.963],
  [43.866, 59.998],
  [42.929, 59.982],
  [42.126, 60.042],
  [41.759, 59.18],
  [41.642, 58.612],
  [41.371, 57.701],
  [41.535, 56.777],
  [42.272, 55.987],
  [42.858, 55.928],
  [43.386, 56.099],
  [43.892, 56.602],
  [44.352, 56.771],
  [45.181, 56.91],
  [45.586, 57.092],
])
const isLoading = ref(true)
const coords = ref<{ lat: number; lng: number; name?: string }>({
  lat: 41.2995,
  lng: 69.2401,
})
const { t, locale } = useI18n()
const isBlock = ref(true)
const zoom = ref(7)

function toggleHidden() {
  isBlock.value = true
}

function toogleBlock(event: KeyboardEvent) {
  if (event.ctrlKey || event.key === 'Meta') {
    isBlock.value = false
  }
}

function removeHidden() {
  isBlock.value = false
}

const limit = ref(10)
const offset = ref(0)
const people = ref([])
const markers = ref([])
const total = ref(0)
const searchPeople = ref('')
const target = ref(null)
const activeTab = ref('map')
const tabs = reactive([
  { value: 'map', label: t('map') },
  { value: 'list', label: t('list') },
])

interface Props {
  contact?: {
    id: number
    title: string
    address: string
    emails: string[]
    phones: string[]
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

async function fetchData() {
  try {
    const res = await useApi().$get<ICommonDataResponse<any>>(
      `${locale.value}/api/main/station/`,
      {
        params: {
          limit: limit.value,
          offset: offset.value,
        },
      }
    )

    total.value = res?.count
    people.value = res?.results

    if (res?.results?.length > 0) {
      const firstLocation = res.results[0]
      coords.value = {
        lat: Number(firstLocation.latitude),
        lng: Number(firstLocation.longitude),
        name: firstLocation.name,
      }
    }

    markers.value = res?.results || []
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 400)
  }
}

fetchData()

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    mapContainer.value?.requestFullscreen().catch((err) => {
      console.error('Failed to enter fullscreen:', err)
    })
  } else {
    document.exitFullscreen()
  }
}

const zoomIn = () => {
  zoom.value++
}

const zoomOut = () => {
  zoom.value--
}

onMounted(() => {
  // const windyApiKey = useRuntimeConfig().public.windyApiKey
  document.addEventListener('keydown', toogleBlock)
  document.addEventListener('keyup', toggleHidden)

  // const options = {
  //   key: windyApiKey, // Windy API kalitingizni shu yerga kiriting
  //   lat: 41.2995,
  //   lon: 69.2401,
  //   zoom: 5,
  //   overlay: 'wind', // Faqat shamol oqimini ko'rsatish
  //   removeWindShadow: true, // Orqa fon rangini yo'qotish
  //   removeOverlay: ['temp', 'pressure', 'clouds'],
  // }

  // if (typeof window !== 'undefined') {
  //   const script = document.createElement('script')
  //   script.src = `https://api.windy.com/assets/map-forecast/libBoot.js`
  //   script.onload = () => {
  //     windyInit(options, (windyAPI) => {
  //       const { map } = windyAPI
  //       map.setOpacity(0.5);
  //       console.log('Windy API yuklandi!', map)
  //     })
  //   }
  //   document.body.appendChild(script)
  // }
  const mapContainer = document.getElementById('map')
  if (!mapContainer) {
    console.error('Map container not found!')
    return
  }

  const map = L.map('map').setView([coords.value.lat, coords.value.lng], 10) // Toshkent koordinatalari
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  L.tileLayer(
    `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
    {
      opacity: 0.5, // Shaffoflik
      attribution: '&copy; OpenWeatherMap',
    }
  ).addTo(map)
})

onUnmounted(() => {
  document.removeEventListener('keydown', toogleBlock)
  document.removeEventListener('keyup', toggleHidden)
})
// Infinite scroll
const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    loadMore()
  }
})

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
const tooltipStyle = ref({})

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

    // Calculate tooltip position
    const markerElement = document.querySelector(
      `[data-marker-id="${marker.id}"]`
    )
    if (markerElement) {
      const markerRect = markerElement.getBoundingClientRect()
      const mapContainer = document.querySelector('.leaflet-container')
      if (mapContainer) {
        const mapRect = mapContainer.getBoundingClientRect()
        const tooltipElement = document.querySelector('.tooltip-container')
        if (tooltipElement) {
          tooltipStyle.value = {
            left: `${markerRect.left - mapRect.left + markerRect.width / 2}px`,
            top: `${
              markerRect.top - mapRect.top - tooltipElement.offsetHeight - 10
            }px`,
          }
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
#windy {
  width: 100%;
  height: 500px;
}
</style>
