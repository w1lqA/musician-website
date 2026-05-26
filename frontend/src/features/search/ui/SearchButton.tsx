// src/features/search/ui/SearchButton.tsx
import { SearchModal } from '@/features/search/ui/SearchModal';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

interface SearchButtonProps {
    className?: string;
}

export const SearchButton = ({ className }: SearchButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type='button'
                onClick={() => setIsOpen(true)}
                className={clsx(
                    'p-2 text-primary-white-600 hover:text-accent-1 transition-colors',
                    className
                )}
                aria-label="Поиск"
            >
                <SearchIcon className="w-6 h-6" strokeWidth={1.25} />
            </button>
            <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};