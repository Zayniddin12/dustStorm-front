import { useApi } from '@/composables/useApi'
import type { IDefaultResponse, IResident } from '@/types'
import type { IStatistics, ISupportCard, IContactInfo } from '@/types/support'

export const useSupportStore = defineStore('support-store', {
  state: () => ({
    supports: [] as ISupportCard[],
    statistics: [] as IStatistics[],
    contactInfo: null as IContactInfo | null,
    platforms: [],
    isLoading: true as boolean,
    supportWomenLoading: false as boolean,
    error: null,
    windData: [] as {
      wind_direction_id: number
      wind_speed: number | null
      wind_repeat: number
    }[],
    windSpeedAvgData: [] as {
      wind_direction_id: number
      wind_speed: number | null
      wind_repeat: number
    }[],
    windInfoData: [] as {
      name: string
      parameter_name: string
      unit: string
    }[],
  }),
  actions: {
    async getContactInfo() {
      this.isLoading = true
      try {
        const response = await useApi().$get<IContactInfo>('/api/main/contact/')
        this.contactInfo = response
        return response
      } catch (error) {
        console.error('API Error:', error)
        return null
      } finally {
        this.isLoading = false
      }
    },

    async getWindAverage(year: number) {
      this.isLoading = true
      try {
        const response = await useApi().$get<{
          year: string
          data: {
            wind_direction_id: number
            wind_speed: number | null
            wind_repeat: number
          }[]
        }>(`/api/main/wind-repeat/?year=${year}`)
        this.windData = response.data
        return response.data
      } catch (error) {
        console.error(error)
        return []
      } finally {
        this.isLoading = false
      }
    },

    async getWindSpeedAvg(parameterName: string) {
      this.isLoading = true
      try {
        const response = await useApi().$get<
          {
            wind_direction_id: number
            wind_speed: number | null
            wind_repeat: number
          }[]
        >(`/api/main/wind-data/?parameter_name=${parameterName}`)

        this.windSpeedAvgData = response
        return response
      } catch (error) {
        console.error('Wind Speed Average API Error:', error)
        return []
      } finally {
        this.isLoading = false
      }
    },

    async getWindInfo() {
      this.isLoading = true
      try {
        const response = await useApi().$get<
          { name: string; parameter_name: string; unit: string }[]
        >('/api/main/wind-info/')
        this.windInfoData = response
        return response
      } catch (error) {
        console.error('Wind Info API Error:', error)
        return []
      } finally {
        this.isLoading = false
      }
    },
  },
})
