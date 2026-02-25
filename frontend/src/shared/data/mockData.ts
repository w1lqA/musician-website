import type { Concert, MerchItem, Release } from "../types/types";

export const releases: Release[] = [
  {
    id: '1',
    title: 'НОВЫЙ РЕЛИЗ',
    artist: 'ẃ1lq',
    coverImage: 'music album cover',
    releaseDate: '2024-11-15',
    type: 'album',
    price: 29.99
  },
  {
    id: '2',
    title: 'MOCKUP',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape mockup',
    releaseDate: '2024-10-20',
    type: 'single',
    price: 9.99
  },
  {
    id: '3',
    title: 'BOUNDS OF SILENCE',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape album',
    releaseDate: '2024-09-10',
    type: 'ep',
    price: 19.99
  },
  {
    id: '4',
    title: 'CASSETTE MOCKUP',
    artist: 'ẃ1lq',
    coverImage: 'cassette mockup yellow',
    releaseDate: '2024-08-05',
    type: 'album',
    price: 29.99
  },
  {
    id: '5',
    title: 'BOUNDS OF SILENCE',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape album',
    releaseDate: '2024-07-12',
    type: 'single',
    price: 9.99
  },
  {
    id: '6',
    title: 'MOCKUP',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape mockup',
    releaseDate: '2024-06-22',
    type: 'album',
    price: 29.99
  },
  {
    id: '7',
    title: 'BOUNDS OF SILENCE',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape album',
    releaseDate: '2024-05-18',
    type: 'ep',
    price: 19.99
  },
  {
    id: '8',
    title: 'CASSETTE MOCKUP',
    artist: 'ẃ1lq',
    coverImage: 'cassette mockup yellow',
    releaseDate: '2024-04-30',
    type: 'single',
    price: 9.99
  },
  {
    id: '9',
    title: 'BOUNDS OF SILENCE',
    artist: 'ẃ1lq',
    coverImage: 'cassette tape album',
    releaseDate: '2024-03-25',
    type: 'album',
    price: 29.99
  }
];

export const merchItems: MerchItem[] = [
  {
    id: '1',
    name: 'Кожаная Куртка',
    description: 'Премиальная кожаная куртка в стиле артиста',
    price: 299.99,
    images: ['leather jacket front', 'leather jacket back'],
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 25
  },
  {
    id: '2',
    name: 'Ботинки',
    description: 'Стильные черные ботинки',
    price: 149.99,
    images: ['black boots'],
    category: 'accessories',
    sizes: ['39', '40', '41', '42', '43', '44'],
    stock: 30
  },
  {
    id: '3',
    name: 'Свитер',
    description: 'Уютный черный свитер',
    price: 79.99,
    images: ['black sweater'],
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 40
  },
  {
    id: '4',
    name: 'Джинсы',
    description: 'Черные рваные джинсы',
    price: 89.99,
    images: ['distressed jeans'],
    category: 'clothing',
    sizes: ['28', '30', '32', '34', '36'],
    stock: 35
  },
  {
    id: '5',
    name: 'Кожаная Куртка',
    description: 'Эксклюзивная кожаная куртка',
    price: 299.99,
    images: ['leather jacket front'],
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 20
  }
];

export const concerts: Concert[] = [
  {
    id: '1',
    venue: 'VK STADIUM',
    city: 'Moscow',
    date: '2024-11-15',
    ticketUrl: '#',
    price: 89.99,
    status: 'upcoming'
  },
  {
    id: '2',
    venue: 'The Bowery Ballroom',
    city: 'New York',
    date: '2024-11-15',
    ticketUrl: '#',
    price: 75.00,
    status: 'upcoming'
  },
  {
    id: '3',
    venue: 'The Echo',
    city: 'Los Angeles',
    date: '2024-11-18',
    ticketUrl: '#',
    price: 65.00,
    status: 'upcoming'
  },
  {
    id: '4',
    venue: 'Brixton Academy',
    city: 'London',
    date: '2024-11-20',
    ticketUrl: '#',
    price: 70.00,
    status: 'upcoming'
  },
  {
    id: '5',
    venue: 'The Bowery Ballroom',
    city: 'New York',
    date: '2024-11-22',
    ticketUrl: '#',
    price: 75.00,
    status: 'upcoming'
  },
  {
    id: '6',
    venue: 'The Bowery Ballroom',
    city: 'Berlin',
    date: '2024-11-25',
    ticketUrl: '#',
    price: 68.00,
    status: 'upcoming'
  }
];
