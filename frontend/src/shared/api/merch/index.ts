// src/shared/api/merch/index.ts
import { baseApi } from '@/shared/api/base';
import type { ProductDTO, ProductsResponseDTO, CreateProductDTO, UpdateProductDTO } from './types';

export const merchApi = {
    getProducts: async (params?: {
        category?: string;
        search?: string;
        sort?: 'new';
        limit?: number;
        page?: number;
    }): Promise<ProductsResponseDTO> => {
        const response = await baseApi.get('/products/', { params });
        return response.data;
    },

    getProductById: async (id: string): Promise<ProductDTO> => {
        const response = await baseApi.get(`/products/${id}/`);
        return response.data;
    },

    createProduct: async (data: CreateProductDTO): Promise<ProductDTO> => {
        const response = await baseApi.post('/products/', data);
        return response.data;
    },

    updateProduct: async (id: string, data: UpdateProductDTO): Promise<ProductDTO> => {
        const response = await baseApi.put(`/products/${id}/`, data);
        return response.data;
    },

    deleteProduct: async (id: string): Promise<void> => {
        await baseApi.delete(`/products/${id}/`);
    },
};