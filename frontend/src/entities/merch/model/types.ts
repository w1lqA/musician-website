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
