// src/shared/ui/feedback/Loader/Loader.tsx
interface LoaderProps {
    message?: string;
    className?: string;
}

export const Loader = ({ message, className = '' }: LoaderProps) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 py-8 mx-auto ${className}`}>
            <div className="w-8 h-8 border-3 border-accent-1 border-t-transparent rounded-full animate-spin" />
            {message && (
                <p className="text-primary-white-400 text-body-sm">{message}</p>
            )}
        </div>
    );
};