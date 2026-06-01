// src/entities/merch/lib/mapProductToMerchItem.ts
import type { MerchItem } from '@/entities/merch/model/types';
import type { ProductDTO } from '@/shared/api/merch/types';
import { getMediaUrl } from '@/shared/lib/media';

export const mapProductToMerchItem = (product: ProductDTO): MerchItem => {
    const firstImage = product.images?.[0]?.image || product.main_image;
    const firstPrice = product.skus[0]?.price ? `$${parseFloat(product.skus[0].price).toFixed(2)}` : '$0.00';
    const sizes = [...new Set(product.skus.map(sku => sku.attributes.size).filter(Boolean))] as string[];
    const images = product.images.map(img => img.image);

    return {
        id: product.id,
        name: product.name,
        price: firstPrice,
        image: getMediaUrl(firstImage),
        images: images.length > 0 ? images.map(img => getMediaUrl(img)) : undefined,
        description: product.description,
        sizes: sizes.length > 0 ? sizes : undefined,
        category: product.category,
    };
};

export const mapProductsToMerchItems = (products: ProductDTO[]): MerchItem[] =>
    products.map(mapProductToMerchItem);