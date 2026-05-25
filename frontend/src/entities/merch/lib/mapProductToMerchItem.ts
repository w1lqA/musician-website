// src/entities/merch/lib/mapProductToMerchItem.ts
import type { MerchItem } from '@/entities/merch/model/types';
import type { ProductDTO } from '@/shared/api/merch/types';

export const mapProductToMerchItem = (product: ProductDTO): MerchItem => {
    // Берем первое доступное изображение или main_image
    const firstImage = product.images?.[0]?.image || product.main_image;
    // Получаем первую цену из SKU
    const firstPrice = product.skus[0]?.price ? `$${parseFloat(product.skus[0].price).toFixed(2)}` : '$0.00';
    // Получаем уникальные размеры из SKU
    const sizes = [...new Set(product.skus.map(sku => sku.attributes.size).filter(Boolean))] as string[];
    // Получаем все изображения
    const images = product.images.map(img => img.image);

    return {
        id: product.id,
        name: product.name,
        price: firstPrice,
        image: firstImage,
        images: images.length > 0 ? images : undefined,
        description: product.description,
        sizes: sizes.length > 0 ? sizes : undefined,
        category: product.category,
    };
};

export const mapProductsToMerchItems = (products: ProductDTO[]): MerchItem[] =>
    products.map(mapProductToMerchItem);