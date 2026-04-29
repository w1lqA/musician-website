import { subscriberApi, type CreateSubscriberDTO } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

export const useSubscribe = () => {
    return useMutation({
        mutationFn: (data: CreateSubscriberDTO) => subscriberApi.subscribe(data),
    });
};