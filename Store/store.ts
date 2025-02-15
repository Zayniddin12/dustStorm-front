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
        windData: [] as { wind_direction_id: number, wind_speed: number | null, wind_repeat: number }[]
    }),
    actions: {
        async getContactInfo() {
            this.isLoading = true;
            try {
                const response = await useApi().$get<IContactInfo>('/api/main/contact/');
                this.contactInfo = response;
                return response;
            } catch (error) {
                console.error(error);
                return null;
            } finally {
                this.isLoading = false;
            }
        },

        async getWindAverage(year: number) {
            this.isLoading = true;
            try {
                const response = await useApi().$get<{ year: string, data: { wind_direction_id: number, wind_speed: number | null, wind_repeat: number }[] }>(
                    `/api/main/wind-average/?year=${year}`
                );
                this.windData = response.data;
                return response.data;
            } catch (error) {
                console.error(error);
                return [];
            } finally {
                this.isLoading = false;
            }
        }
    }
});
