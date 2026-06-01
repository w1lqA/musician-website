// src/entities/merch/lib/mapProductToMerchDetails.ts
import type { MerchDetails } from '@/entities/merch/model/types';
import type { ProductDTO } from '@/shared/api/merch/types';
import { getMediaUrl } from '@/shared/lib/media';

export const mapProductToMerchDetails = (product: ProductDTO): MerchDetails => {
    const firstSku = product.skus[0];
    const images = product.images.map(img => img.image);
    const sizes = [...new Set(product.skus.map(sku => sku.attributes.size).filter(Boolean))] as string[];

    return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: firstSku ? `$${parseFloat(firstSku.price).toFixed(2)}` : '$0.00',
        mainImage: getMediaUrl(product.main_image),
        images: images.length > 0 ? images.map(img => getMediaUrl(img)) : [getMediaUrl(product.main_image)],
        sizes: sizes,
        artist: product.artist,
        category: product.category,
        skus: product.skus.map(sku => ({
            id: sku.id,
            size: sku.attributes.size || '',
            price: `$${parseFloat(sku.price).toFixed(2)}`,
            stock: sku.stock,
        })),
    };
};