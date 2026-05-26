// src/widgets/header/ui/HeaderActions.tsx
import { SearchButton } from '@/features/search';
import { AuthButtons } from '@/widgets/header/ui/AuthButtons';
import { MobileMenuButton } from '@/widgets/header/ui/MobileMenuButton';

interface HeaderActionsProps {
    isMenuOpen: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
}

export const HeaderActions = ({ isMenuOpen, onToggleMenu, onCloseMenu }: HeaderActionsProps) => {
    return (
        <div className="flex items-center gap-2 *:z-50">
            <SearchButton className='p-2' />

            <AuthButtons onCloseMenu={onCloseMenu} />

            <MobileMenuButton isOpen={isMenuOpen} onToggle={onToggleMenu} />
        </div>
    );
};