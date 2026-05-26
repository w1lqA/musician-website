// src/shared/api/search/types.ts
export interface SearchResultDTO {
    id: string;
    type: 'release' | 'product' | 'concert';
    title: string;
    subtitle: string;
    image: string;
    url: string;
    price?: number;
    date?: string;
    relevance?: number;
}

export interface SearchResponseDTO {
    results: SearchResultDTO[];
    count: number;
    query: string;
}

export interface SearchParams {
    q: string;
    type?: 'all' | 'releases' | 'products' | 'concerts';
    sort?: 'relevance' | 'date' | 'price_asc' | 'price_desc';
}