import { baseApi } from '@/shared/api/base';
import type { CreateSubscriberDTO, SubscriberDTO } from '@/shared/api/subscriber/types';

export const subscriberApi = {
    subscribe: async (data: CreateSubscriberDTO): Promise<SubscriberDTO> => {
        const response = await baseApi.post('/subscribers/', data);
        return response.data;
    },

    unsubscribe: async (id: string): Promise<SubscriberDTO> => {
        const response = await baseApi.post(`/subscribers/${id}/unsubscribe/`);
        return response.data;
    },
};