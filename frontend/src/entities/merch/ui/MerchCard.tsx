import type { MerchItem } from '@/entities/merch/model/types';
import { Link } from 'react-router-dom';

interface MerchCardProps {
  item: MerchItem;
}

export const MerchCard = ({ item }: MerchCardProps) => {
  return (
    <Link
      to={`/merch/${item.id}`}
      className="bg-primary-black-500 border border-primary-black-300 rounded overflow-hidden flex flex-col transition-transform hover:scale-105"
    >
      <div className="h-48 bg-accent-1 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="text-title2-medium text-primary-white-600">
          {item.name}
        </h3>
        <p className="text-caption-regular text-secondary">
          {item.price}
        </p>
        <button className="bg-accent-1 text-primary-white-600 text-caption-medium text-center h-9 w-full transition-opacity hover:opacity-90">
          Подробнее
        </button>
      </div>
    </Link>
  );
};