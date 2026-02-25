// Database Entity Types

export interface Release {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  releaseDate: string;
  type: 'album' | 'single' | 'ep';
  tracks?: Track[];
  price?: number;
}

export interface Track {
  id: string;
  releaseId: string;
  title: string;
  duration: number;
  trackNumber: number;
}

export interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'clothing' | 'accessories' | 'other';
  sizes?: string[];
  colors?: string[];
  stock: number;
}

export interface Concert {
  id: string;
  venue: string;
  city: string;
  date: string;
  ticketUrl?: string;
  price?: number;
  status: 'upcoming' | 'soldout' | 'cancelled';
}

export interface CartItem {
  id: string;
  merchItemId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin' | 'guest';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
