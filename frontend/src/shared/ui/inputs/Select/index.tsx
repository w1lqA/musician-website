// src/shared/ui/inputs/Select/index.tsx
import ArrowIcon from '@/shared/assets/icons/ArrowIcon';
import clsx from 'clsx';
import { useId, type SelectHTMLAttributes } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
    error?: string;
    className?: string;
}

export const Select = ({ options, label, error, className, ...props }: SelectProps) => {
    const id = useId();

    return (
        <div className={clsx('flex flex-col gap-1.5', className)}>
            {label && (
                <label htmlFor={id} className="text-caption-regular text-primary-white-500 ml-1">
                    {label}
                </label>
            )}

            <div className="relative w-full group">
                <select
                    id={id}
                    className={clsx(
                        'w-full bg-primary-black-500 border h-9 pl-4 pr-10',
                        'text-primary-white-600 text-caption-regular cursor-pointer',
                        'focus:outline-none focus:border-accent-1 transition-colors',
                        'appearance-none uppercase',
                        error ? 'border-accent-1' : 'border-primary-black-300'
                    )}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-primary-black-500">
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-focus-within:rotate-180">
                    <ArrowIcon className="w-4 h-4 text-primary-white-600 rotate-90" />
                </div>
            </div>
            {error && (
                <p className="text-caption-regular text-accent-1 ml-1">{error}</p>
            )}
        </div>
    );
};