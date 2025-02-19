<template>
    <div>
      <h2
          class="container text-dark font-bold text-xl sm:text-2xl md:text-[32px] leading-130 mb-3 md:mb-6"
      >
        {{ title ? title : $t("location_our_boxes") }}
      </h2>
      <div
          v-if="totalData"
          class="relative flex max-md:flex-col md:items-center md:h-[580px] max-md:hidden"
      >
        <div :class="isBlock ? 'block' : 'hidden'"  @keyup="toggleHidden" @keydown="toogleBlock" @dblclick="removeHidden"  tabindex="0" class="absolute w-full h-full z-1" ></div>
  
        <div class="container">
          <div
              class="md:!w-[470px] h-full z-[1] flex items-end justify-between shadow-map-list"
          >
            <div class="flex flex-col md:w-[480px] w-full relative z-1 h-[580px]">
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
                  <ContactPeopleCard
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
                  <ContactPeopleCard
                      v-for="(item, index) in people"
                      :key="index"
                      :item="item"
                      @getLocation="zoomMap(item)"
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
                <div v-else class="bg-[#F4F7FA] p-4 h-[504px] overflow-y-scroll">
                  <CommonArticleNoData />
                </div>
              </template>
            </div>
          </div>
        </div>
        <client-only>
          <yandex-map
              v-model="activeCoord"
              :coords="coords"
              :settings="settings"
              :zoom="16"
              :controls="[]"
              class="w-full h-full absolute inset-0"
          >
            <ymap-marker
                v-for="(card, i) in markers"
                :key="i"
                :coords="card"
                marker-id="123"
                :hint-content="card?.name"
                :icon="markerIcon"
                cluster-name="1"
            />
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
                      <ContactPeopleCard
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
                      <ContactPeopleCard
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
                    class="w-full h-full absolute inset-0"
                >
                  <ymap-marker
                      v-for="(card, i) in markers"
                      :key="i"
                      :coords="card"
                      marker-id="123"
                      :hint-content="card?.name"
                      :icon="markerIcon"
                      cluster-name="1"
                  />
                </yandex-map>
              </client-only>
            </div>
  
          </div>
        </Transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { useDebounce, useIntersectionObserver } from "@vueuse/core";
  import TabGroup from "~/components/Common/TabGroup.vue";
  import { yandexMap, ymapMarker } from "vue-yandex-maps";
  import type { ICommonDataResponse } from "~/types/common";
  const router = useRouter();
  const isLoading = ref(true);
  
  const { t } = useI18n();
  const isBlock = ref(true);
  
  function toggleHidden(a: any) {
    isBlock.value=true
  }
  function toogleBlock(a: any) {
    console.log(a)
    if (a.ctrlKey || a.key=='Meta') {
      isBlock.value = false
    }
  }
  function removeHidden(a: any) {
    isBlock.value = false
  }
  const settings = {
    apiKey: "",
    lang: "ru_RU",
    coordorder: "latlong",
    version: "2.1",
  };
  const behaviors = ref('drag')
  const markerIcon = {
    layout: "default#imageWithContent",
    imageHref: "/images/blue-map-marker.svg",
    imageSize: [75, 75],
    imageOffset: [0, 0],
    content: "",
    contentOffset: [0, 15],
    contentLayout: "",
  };
  const loading = ref(false);
  const limit = ref(10);
  const offset = ref(0);
  const people = ref([]);
  const markers = ref([]);
  const total = ref(0);
  const totalData = ref(0);
  const searchPeople = ref("");
  const map = ref();
  const target = ref(null);
  const targetIsVisible = ref(false);
  const markerOptions = computed(() => {
    let lat = Number(people.value?.at(0)?.location?.split(";")[0]);
    let lng = Number(people.value?.at(0)?.location?.split(";")[1]);
  
    return { position: { lat, lng }, icon: "/images/home-map-marker.svg" };
  });
  const coords = ref([12.3456, 15.6544]);
  // const coords = ref<{ lat?: number; lng?: number; location?: number }>({});
  const activeCoord = ref<{ lat?: number; lng?: number; location?: number }>({});
  const activeTab = ref("map");
  const tabs = reactive([
    {
      value: "map",
      label: t("map"),
    },
    {
      value: "list",
      label: t("list"),
    },
  ]);
  
  interface Props {
    contact?: {
      id: number;
      title: string;
      address: string;
      emails: [string];
      phones: [string];
      latitude: string;
      longitude: string;
      youtube: string;
      instagram: string;
      telegram: any;
      twitter: string;
    };
    title?: string;
  }
  
  withDefaults(defineProps<Props>(), {});
  function handleCtrl(event){
    console.log(event)
  
  }
  
  // FETCH
  
  onMounted(async () => {
    document.addEventListener('keydown',toogleBlock)
    document.addEventListener('keyup',toggleHidden)
    await useApi()
        .$get<ICommonDataResponse<any>>(`v1/catalog/OrganizationCenters/`, {
          params: {
            limit: limit.value,
            offset: offset.value,
          },
        })
        .then((res) => {
          totalData.value = res?.count;
          total.value = res?.count;
          people.value = res?.results;
          res?.results?.forEach((el: any) => {
            markers.value.push(el?.location.split(";"));
            coords.value = el?.location.split(";");
          });
          activeCoord.value.location = people.value?.at(0)?.location;
        })
        .finally(() => {
          setTimeout(() => {
            isLoading.value = false;
          }, 400);
        });
  });
  
  // FETCH MORE
  
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    targetIsVisible.value = isIntersecting;
  });
  
  watch(
      () => targetIsVisible.value,
      () => {
        if (targetIsVisible.value) {
          getMorePeople();
        }
      }
  );
  
  function getMorePeople() {
    offset.value += limit.value;
    useApi()
        .$get(`v1/catalog/OrganizationCenters/?search=${searchPeople.value}`, {
          params: {
            limit: limit.value,
            offset: offset.value,
          },
        })
        .then((res) => {
          setTimeout(() => {
            res?.results?.forEach((el: any) => {
              people.value.push(el);
            });
          }, 400);
        });
  }
  
  // SEARCH
  
  useDebounce(searchPeople, 10);
  
  watch(searchPeople, (newQuery) => {
    debounce("search", () => {
      isLoading.value = true;
      offset.value = 0;
      useApi()
          .$get(`v1/catalog/OrganizationCenters/`, {
            params: {
              limit: limit.value,
              offset: offset.value,
              search: newQuery,
            },
          })
          .then((res) => {
            total.value = res?.count;
            people.value = res?.results;
          })
          .finally(() => {
            setTimeout(() => {
              isLoading.value = false;
            }, 300);
          });
    });
  });
  
  // GET COORDS
  function zoomMap(item: any, mobile?: boolean) {
    coords.value = item?.location?.split(";");
    // coords.value.lat = Number(item?.location?.split(";")[0]);
    // coords.value.lng = Number(item?.location?.split(";")[1]);
    activeCoord.value = coords.value;
    if (mobile) {
      activeTab.value = "map";
    }
  }
  
  const clearSearch = () => {
    searchPeople.value = "";
  };
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
  