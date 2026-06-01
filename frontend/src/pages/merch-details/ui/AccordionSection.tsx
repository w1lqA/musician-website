// src/pages/merch-details/ui/AccordionSection.tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const AccordionSection = ({ title, children, defaultOpen = false }: AccordionSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <details className="bg-primary-black-500 py-6 group border-t border-primary-black-300" open={isOpen}>
            <summary
                className="flex items-center justify-between text-title2-medium text-primary-white-600 cursor-pointer transition-colors hover:text-accent-1 list-none"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
            >
                {title}
                <ChevronDown className={clsx('w-5 h-5 transition-transform', isOpen && 'rotate-180')} />
            </summary>
            <div className="mt-4 space-y-2 text-caption-regular text-primary-white-400">
                {children}
            </div>
        </details>
    );
};