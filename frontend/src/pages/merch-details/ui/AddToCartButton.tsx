// src/pages/merch-details/ui/AddToCartButton.tsx
import { Button } from '@/shared/ui/Button';

interface AddToCartButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isPending?: boolean;
}

export const AddToCartButton = ({ onClick, disabled, isPending }: AddToCartButtonProps) => {
    return (
        <Button size="medium" className="w-full" onClick={onClick} disabled={disabled}>
            {isPending ? 'Добавление...' : 'Добавить в корзину'}
        </Button>
    );
};