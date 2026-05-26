// src/features/search/lib/mapSearchResult.ts
import type { SearchResultDTO } from '@/shared/api/search/types';

export interface SearchResultUI {
    id: string;
    type: 'release' | 'product' | 'concert';
    title: string;
    subtitle: string;
    image: string;
    url: string;
    price?: number;
    date?: string;
}

export const mapSearchResultToUI = (dto: SearchResultDTO): SearchResultUI => ({
    id: dto.id,
    type: dto.type,
    title: dto.title,
    subtitle: dto.subtitle,
    image: dto.image,
    url: dto.url,
    price: dto.price,
    date: dto.date,
});

export const mapSearchResultsToUI = (dtos: SearchResultDTO[]): SearchResultUI[] =>
    dtos.map(mapSearchResultToUI);