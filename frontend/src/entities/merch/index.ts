// src/entities/merch/index.ts
export { useProducts, useProductById } from './hooks/useMerchQueries';
export { mapProductToMerchItem, mapProductsToMerchItems } from './lib/mapProductToMerchItem';
export { MerchCard } from './ui/MerchCard';
export type { MerchItem } from './model/types';