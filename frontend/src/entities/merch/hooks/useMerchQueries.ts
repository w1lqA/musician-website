// src/entities/merch/hooks/useMerchQueries.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { merchApi } from '@/shared/api';
import { mapProductsToMerchItems, mapProductToMerchDetails, mapProductToMerchItem } from '@/entities/merch';

export const useProducts = (limit?: number) => {
    return useQuery({
        queryKey: ['products', 'list', limit],
        queryFn: () => merchApi.getProducts({ limit }),
        select: (data) => mapProductsToMerchItems(data.results),
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

export const useProductDetails = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => merchApi.getProductById(id),
        select: (data) => mapProductToMerchDetails(data),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useRelatedProducts = (category: string, excludeId: string, limit = 4) => {
    return useInfiniteQuery({
        queryKey: ['products', 'related', category, excludeId],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await merchApi.getProducts({
                category,
                limit,
                page: pageParam
            });
            return {
                items: mapProductsToMerchItems(response.results),
                nextPage: response.next ? pageParam + 1 : undefined,
                totalCount: response.count,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        select: (data) => ({
            items: data.pages.flatMap(page => page.items),
            hasMore: !!data.pages[data.pages.length - 1]?.nextPage,
        }),
        enabled: !!category,
    });
};