// src/pages/merch-details/ui/RelatedProducts.tsx
import { Button } from '@/shared/ui/Button';
import { MerchCard } from '@/entities/merch/ui/MerchCard';
import type { MerchItem } from '@/entities/merch/model/types';

interface RelatedProductsProps {
    items: MerchItem[];
    hasMore: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
}

export const RelatedProducts = ({ items, hasMore, isLoadingMore, onLoadMore }: RelatedProductsProps) => {
    if (!items.length) return null;

    return (
        <div className="space-y-12">
            <div className="flex flex-col tablet:flex-row items-center justify-between gap-6">
                <h2 className="text-h2-display-bold text-primary-white-600 uppercase">
                    Другой мерч
                </h2>
            </div>

            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-5">
                {items.map((item) => (
                    <MerchCard key={item.id} item={item} />
                ))}
            </div>

            {hasMore && (
                <Button
                    variant="secondary"
                    size="small"
                    className="w-full"
                    onClick={onLoadMore}
                    disabled={isLoadingMore}
                >
                    {isLoadingMore ? 'Загрузка...' : 'Показать еще'}
                </Button>
            )}
        </div>
    );
};