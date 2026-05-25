// src/shared/api/merch/types.ts
export interface ProductImageDTO {
    id: string;
    image: string;
    display_order: number;
}

export interface SKUDTO {
    id: string;
    sku_code: string;
    display_name: string;
    price: string;
    stock: number;
    attributes: {
        size?: string;
        color?: string;
        material?: string;
    };
    total_display: string;
}

export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    category: 'clothing' | 'accessories' | 'vinyl' | 'cd' | 'other';
    artist: string;
    main_image: string;
    skus: SKUDTO[];
    images: ProductImageDTO[];
    is_active: boolean;
}

export interface ProductsResponseDTO {
    count: number;
    next: string | null;
    previous: string | null;
    results: ProductDTO[];
}

export interface CreateProductDTO {
    name: string;
    description: string;
    category: string;
    artist?: string;
    main_image?: string;
    is_active?: boolean;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}