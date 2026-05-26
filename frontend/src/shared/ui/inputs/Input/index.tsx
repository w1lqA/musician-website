import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
}

export const Input = ({
    label,
    error,
    className,
    wrapperClassName,
    ...props
}: InputProps) => {
    const id = useId();

    return (
        <div className={clsx('flex flex-col gap-1.5 w-full', wrapperClassName)}>
            {label && (
                <label htmlFor={id} className="text-caption-regular text-primary-white-500 ml-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={clsx(
                    'w-full h-10 px-4 bg-primary-black-500 border text-primary-white-600 text-caption-regular placeholder:text-secondary transition-all outline-none',
                    error ? 'border-red-500' : 'border-primary-white-500 focus:border-accent-1',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-[10px] text-red-500 ml-2">{error}</span>
            )}
        </div>
    );
};