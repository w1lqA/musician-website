// src/entities/merch/model/types.ts
export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  category?: string;
}

// для merch-details
export interface MerchDetails {
  id: string;
  name: string;
  description: string;
  price: string;
  mainImage: string;
  images: string[];
  sizes: string[];
  artist?: string;
  category: string;
  skus: Array<{
    id: string;
    size: string;
    price: string;
    stock: number;
  }>;
}