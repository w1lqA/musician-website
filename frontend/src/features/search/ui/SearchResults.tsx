// src/features/search/ui/SearchResults.tsx
import { Link } from 'react-router-dom';
import { Loader } from '@/shared/ui/feedback/Loader/Loader';
import { EmptyState } from '@/shared/ui/feedback/EmptyState/EmptyState';
import type { SearchResultUI } from '@/features/search/lib/mapSearchResult';

interface SearchResultsProps {
    results: SearchResultUI[];
    isLoading: boolean;
    query: string;
    onResultClick: () => void;
    isError?: boolean;
    error?: unknown;
    onRetry?: () => void;
}

const typeLabels = {
    release: 'Релиз',
    product: 'Товар',
    concert: 'Концерт'
};

export const SearchResults = ({
    results,
    isLoading,
    query,
    onResultClick,
    isError,
    error,
    onRetry
}: SearchResultsProps) => {
    if (isLoading) {
        return <Loader message="Поиск..." />;
    }

    if (isError) {
        return (
            <EmptyState
                message="Ошибка при поиске"
                actionLabel="Повторить"
                onClick={onRetry}
                className="py-8"
            />
        );
    }

    if (!query.trim()) {
        return (
            <EmptyState
                message="Введите поисковый запрос"
                className="py-8"
            />
        );
    }

    if (results.length === 0) {
        return (
            <EmptyState
                message={`Ничего не найдено по запросу "${query}"`}
                className="py-8"
            />
        );
    }

    return (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            <p className="text-caption-regular text-primary-white-400 mb-3">
                Найдено {results.length} результатов
            </p>
            {results.map((result) => (
                <Link
                    key={`${result.type}-${result.id}`}
                    to={result.url}
                    onClick={onResultClick}
                    className="flex items-start gap-3 p-3 bg-primary-black-600 border border-primary-black-300 hover:border-accent-1 transition-colors"
                >
                    {result.image && (
                        <div className="w-12 h-12 flex-shrink-0 bg-primary-black-500 overflow-hidden">
                            <img src={result.image} alt={result.title} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-caption-small text-accent-1 uppercase">
                                {typeLabels[result.type]}
                            </span>
                            {result.price !== undefined && result.price !== null && (
                                <span className="text-caption-small text-primary-white-400">
                                    ${result.price}
                                </span>
                            )}
                            {result.date && (
                                <span className="text-caption-small text-primary-white-400">
                                    {new Date(result.date).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                        <h4 className="text-title2-medium text-primary-white-600 truncate">
                            {result.title}
                        </h4>
                        <p className="text-caption-regular text-primary-white-400 truncate">
                            {result.subtitle}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};