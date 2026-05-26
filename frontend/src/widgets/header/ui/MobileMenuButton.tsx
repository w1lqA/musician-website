// src/widgets/header/ui/MobileMenuButton.tsx
import BurgerMenuIcon from '@/widgets/header/assets/BurgerMenuIcon';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
    return (
        <button
            type='button'
            className="tablet:hidden p-2 relative"
            aria-label="Toggle menu"
            onClick={onToggle}
        >
            <BurgerMenuIcon isOpen={isOpen} className="w-7 h-7" />
        </button>
    );
};