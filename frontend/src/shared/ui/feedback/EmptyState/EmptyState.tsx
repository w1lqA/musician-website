// src/shared/ui/feedback/EmptyState/EmptyState.tsx
import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';

interface EmptyStateProps {
    className?: string;
    message: string;
    actionLabel?: string;
    actionTo?: string;
    onClick?: () => void;
}

export const EmptyState = ({
    className,
    message,
    actionLabel,
    actionTo,
    onClick
}: EmptyStateProps) => (
    <div className={clsx(className, 'flex flex-col items-center gap-4 py-12 text-center')}>
        <p className="text-primary-white-500 text-body-sm">{message}</p>
        {(onClick || actionTo) && actionLabel && (
            <Button
                onClick={onClick}
                variant="primary"
                size="small"
                className="w-full max-w-xs"
            >
                {actionLabel}
            </Button>
        )}
    </div>
);