// src/entities/merch/index.ts
export { useProducts, useProductById, useProductDetails, useRelatedProducts } from './hooks/useMerchQueries';
export { mapProductToMerchItem, mapProductsToMerchItems } from './lib/mapProductToMerchItem';

export { mapProductToMerchDetails } from './lib/mapProductToMerchDetails';
export { MerchCard } from './ui/MerchCard';
export type { MerchItem, MerchDetails } from './model/types';