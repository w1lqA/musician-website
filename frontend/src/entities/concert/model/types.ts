// src/entities/concert/model/types.ts
export interface Tour {
    id: string;
    city: string;
    venue: string;
    date: string;
    price: number;
    status: 'upcoming' | 'soldout' | 'cancelled' | 'completed';
    availableTickets: number;
}