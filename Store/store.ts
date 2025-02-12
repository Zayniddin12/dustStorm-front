/* eslint-disable no-console */
import type { IDefaultResponse, IResident } from '@/types'
import type { IStatistics, ISupportCard, IContactInfo } from '@/types/support'

export const useSupportStore = defineStore('support-store', {
    state: () => ({
        supports: [] as ISupportCard[],
        statistics: [] as IStatistics[],
        contactInfo: null as IContactInfo | null,
        platforms: [],
        isLoading: false as boolean,
        supportWomenLoading: false as boolean,
        error: null,
    }),
    actions: {
        async getContactInfo() {
            this.isLoading = true
            try {
                const response = await useApi().$get<IContactInfo>(
                    '/contact/',
                )
                this.contactInfo = response
                return response
            } catch (error) {
                console.error(error)
                return null
            } finally {
                this.isLoading = false
            }
        },
    },
})