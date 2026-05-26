// src/features/search/ui/SearchModal.tsx
import { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/ui/modals/BaseModal';
import { Input } from '@/shared/ui/inputs/Input';
import { Select } from '@/shared/ui/inputs/Select';
import { SearchResults } from '@/features/search/ui/SearchResults';
import { useSearch } from '@/features/search/hooks/useSearch';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const contentTypes = [
    { value: 'all', label: 'Всё' },
    { value: 'releases', label: 'Релизы' },
    { value: 'products', label: 'Товары' },
    { value: 'concerts', label: 'Концерты' },
];

const sortOptions = [
    { value: 'relevance', label: 'По релевантности' },
    { value: 'date', label: 'По дате' },
    { value: 'price_asc', label: 'Сначала дешевле' },
    { value: 'price_desc', label: 'Сначала дороже' },
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [contentType, setContentType] = useState('all');
    const [sort, setSort] = useState('relevance');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // дебаунс для поиска
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const { data, isLoading, isError, error } = useSearch({
        q: debouncedQuery,
        type: contentType as 'all' | 'releases' | 'products' | 'concerts',
        sort: sort as 'relevance' | 'date' | 'price_asc' | 'price_desc',
        enabled: isOpen && debouncedQuery.trim().length > 0,
    });

    // сброс состояния при закрытии модалки
    useEffect(() => {
        if (!isOpen) {
            setQuery('');
            setDebouncedQuery('');
            setContentType('all');
            setSort('relevance');
        }
    }, [isOpen]);

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Поиск" className="max-w-3xl">
            <div className="space-y-4">
                <Input
                    placeholder="Поиск..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />

                <div className="flex flex-col tablet:flex-row gap-3">
                    <Select
                        options={contentTypes}
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        label="Тип контента"
                        className="flex-1"
                    />
                    <Select
                        options={sortOptions}
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        label="Сортировка"
                        className="flex-1"
                    />
                </div>

                <SearchResults
                    results={data?.results || []}
                    isLoading={isLoading}
                    query={debouncedQuery}
                    onResultClick={onClose}
                    isError={isError}
                    error={error}
                    onRetry={() => { }}
                />
            </div>
        </BaseModal>
    );
};