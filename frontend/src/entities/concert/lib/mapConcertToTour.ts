// src/entities/concert/lib/mapConcertToTour.ts
import type { ConcertDTO } from '@/shared/api/concert/types';
import type { Tour } from '../model/types';

export const mapConcertToTour = (concert: ConcertDTO): Tour => ({
    id: concert.id,
    city: concert.city_name,
    venue: concert.venue,
    date: new Date(concert.date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }),
    price: parseFloat(concert.price),
    status: concert.status,
    availableTickets: concert.available_tickets,
});

export const mapConcertsToTours = (concerts: ConcertDTO[]): Tour[] =>
    concerts.map(mapConcertToTour);