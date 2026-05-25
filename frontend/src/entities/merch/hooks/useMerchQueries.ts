// src/entities/merch/hooks/useMerchQueries.ts
import { useQuery } from '@tanstack/react-query';
import { merchApi } from '@/shared/api';
import { mapProductsToMerchItems, mapProductToMerchItem } from '@/entities/merch/lib/mapProductToMerchItem';

export const useProducts = (limit?: number) => {
    return useQuery({
        queryKey: ['products', 'list', limit],
        queryFn: () => merchApi.getProducts({ limit }),
        select: (data) => mapProductsToMerchItems(data),
        staleTime: 5 * 60 * 1000,
    });
};

export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => merchApi.getProductById(id),
        select: (data) => mapProductToMerchItem(data),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};