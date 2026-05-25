// src/shared/api/concert/types.ts
export interface CityDTO {
    id: string;
    name: string;
    slug: string;
}

export interface ConcertStatsDTO {
    avg_price: number;
    max_price: number;
    min_price: number;
    total_concerts: number;
    upcoming_count: number;
}

export interface ConcertDTO {
    id: string;
    venue: string;
    city: string;
    city_name: string;
    city_slug: string;
    country: string;
    date: string;
    price: string;
    status: 'upcoming' | 'soldout' | 'cancelled' | 'completed';
    total_tickets: number;
    sold_tickets: number;
    available_tickets: number;
    detail_url: string;
}

export interface ConcertsResponseDTO {
    count: number;
    next: string | null;
    previous: string | null;
    results: ConcertDTO[];
}