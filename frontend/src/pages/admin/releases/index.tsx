// src/pages/admin/releases/index.tsx
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Star, StarOff, Music } from 'lucide-react';
import { useAdminReleases, useDeleteRelease } from '@/features/admin/hooks/useAdminReleases';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { useState } from 'react';
import { BaseModal } from '@/shared/ui/modals/BaseModal';
import { getMediaUrl } from '@/shared/lib/media';

export default function AdminReleasesPage() {
    const { data: releases, isLoading, isError, error, refetch } = useAdminReleases();
    const { mutate: deleteRelease, isPending: isDeleting } = useDeleteRelease();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            deleteRelease(deleteId, {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const getTypeBadge = (type: string) => {
        const badges: Record<string, string> = {
            album: 'bg-accent-1/20 text-accent-1',
            single: 'bg-accent-1/15 text-accent-1',
            ep: 'bg-accent-1/10 text-accent-1',
            live: 'bg-accent-1/20 text-accent-1',
            compilation: 'bg-accent-1/15 text-accent-1',
        };
        return badges[type] || 'bg-primary-black-400/50 text-primary-white-400';
    };

    return (
        <Container className="py-20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-h3-display-bold text-primary-white-600 uppercase mb-2">
                            Релизы
                        </h1>
                        <p className="text-caption-regular text-primary-white-400">
                            Управление музыкальными релизами
                        </p>
                    </div>
                    <Link to="/admin/releases/create">
                        <Button size="small" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Создать релиз
                        </Button>
                    </Link>
                </div>

                <QueryStateWrapper
                    loading={{
                        isLoading,
                        config: { message: 'Загрузка релизов...' },
                    }}
                    error={{
                        isError,
                        raw: error,
                        config: {
                            fallbackMessage: 'Не удалось загрузить релизы',
                            actionLabel: 'Повторить',
                            onClick: () => refetch(),
                        },
                    }}
                    empty={{
                        isEmpty: !releases || releases.length === 0,
                        config: {
                            message: 'Релизы не найдены',
                            actionLabel: 'Создать первый релиз',
                            actionTo: '/admin/releases/create',
                        },
                    }}
                >
                    <div className="bg-primary-black-500 border border-primary-black-300 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-primary-black-300">
                                    <tr className="text-left">
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Обложка</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Название</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Исполнитель</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Тип</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Дата</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Треки</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Рекомендуемые</th>
                                        <th className="px-4 py-3 text-caption-medium text-primary-white-400">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {releases?.map((release) => (
                                        <tr key={release.id} className="border-b border-primary-black-300 hover:bg-primary-black-600 transition-colors">
                                            <td className="px-4 py-3">
                                                {release.cover ? (
                                                    <img
                                                        src={getMediaUrl(release.cover)}
                                                        alt={release.title}
                                                        className="w-16 h-10 object-contain rounded"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-primary-black-600 rounded flex items-center justify-center">
                                                        <Music className="w-5 h-5 text-primary-white-400" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-body-regular text-primary-white-600">
                                                {release.title}
                                            </td>
                                            <td className="px-4 py-3 text-caption-regular text-primary-white-400">
                                                {release.artist}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-caption-small px-2 py-1 rounded ${getTypeBadge(release.type)}`}>
                                                    {release.type_display}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-caption-regular text-primary-white-400">
                                                {new Date(release.release_date).toLocaleDateString('ru-RU')}
                                            </td>
                                            <td className="px-4 py-3 text-caption-regular text-primary-white-400">
                                                {release.tracks?.length || 0}
                                            </td>
                                            <td className="px-4 py-3">
                                                {release.is_featured ? (
                                                    <Star className="w-5 h-5 fill-accent-1 text-accent-1" />
                                                ) : (
                                                    <StarOff className="w-5 h-5 text-primary-white-400" />
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/admin/releases/edit?id=${release.id}`}
                                                        className="p-1 text-primary-white-400 hover:text-accent-1 transition-colors"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteId(release.id)}
                                                        className="p-1 text-primary-white-400 hover:text-accent-1 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </QueryStateWrapper>

                <BaseModal
                    isOpen={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    title="Удаление релиза"
                >
                    <div className="space-y-4">
                        <p className="text-body-regular text-primary-white-400">
                            Вы уверены, что хотите удалить этот релиз? Это действие нельзя отменить.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={() => setDeleteId(null)}
                            >
                                Отмена
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Удаление...' : 'Удалить'}
                            </Button>
                        </div>
                    </div>
                </BaseModal>
            </div>
        </Container>
    );
}