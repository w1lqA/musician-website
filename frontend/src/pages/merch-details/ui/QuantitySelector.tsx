// src/pages/merch-details/ui/QuantitySelector.tsx
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    maxStock?: number;
}

export const QuantitySelector = ({ quantity, onQuantityChange, maxStock = 99 }: QuantitySelectorProps) => {
    const handleDecrease = () => onQuantityChange(Math.max(1, quantity - 1));
    const handleIncrease = () => onQuantityChange(Math.min(maxStock, quantity + 1));

    return (
        <div className="space-y-3">
            <p className="text-title1-medium text-primary-white-600 uppercase">Количество</p>
            <div className="flex items-center gap-2">
                <button
                    type='button'
                    onClick={handleDecrease}
                    className="w-12 h-12 bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400 transition-all flex items-center justify-center text-xl"
                    aria-label="Уменьшить количество"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 max-w-[120px] h-12 bg-primary-white-600 flex items-center justify-center text-body-medium text-primary-black-600">
                    {quantity}
                </div>
                <button
                    type='button'
                    onClick={handleIncrease}
                    className="w-12 h-12 bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400 transition-all flex items-center justify-center text-xl"
                    aria-label="Увеличить количество"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};