// src/pages/merch-details/ui/SizeSelector.tsx
import clsx from 'clsx';

interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSizeChange: (size: string) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
    if (!sizes.length) return null;

    return (
        <div className="space-y-3">
            <p className="text-title1-medium text-primary-white-600 uppercase">Выбрать размер</p>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <button
                        type='button'
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={clsx(
                            'flex-1 min-w-[56px] aspect-square tablet:aspect-auto tablet:h-12 text-body-medium transition-all',
                            selectedSize === size
                                ? 'bg-accent-1 text-primary-white-600'
                                : 'bg-primary-white-600 text-primary-black-600 hover:bg-primary-white-400'
                        )}
                        aria-label={`Размер ${size}`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};