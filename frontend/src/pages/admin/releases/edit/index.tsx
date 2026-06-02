// src/pages/admin/releases/edit/index.tsx
import { Container } from '@/shared/ui/Container';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReleaseForm, type ReleaseFormValues } from '../ui/ReleaseForm';
import { useUpdateRelease, useDeleteTrack } from '@/features/admin/hooks/useAdminReleases';
import { useReleaseRawById } from '@/entities/release/hooks/useReleaseQueries';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminReleaseEditPage() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    const { data: release, isLoading, isError, error, refetch } = useReleaseRawById(id!);
    const { mutate: updateRelease, isPending } = useUpdateRelease();
    const { mutate: deleteTrack, isPending: isDeletingTrack } = useDeleteTrack();

    const onSubmit = (data: ReleaseFormValues) => {
        if (!id) return;
        updateRelease({ id, data }, {
            onSuccess: () => {
                navigate('/dashboard/releases');
            },
        });
    };

    const defaultValues: Partial<ReleaseFormValues> = release ? {
        title: release.title,
        artist: release.artist,
        type: release.type,
        release_date: release.release_date,
        description: release.description || '',
        is_featured: release.is_featured,
        tracks: release.tracks?.map(track => ({
            id: track.id,
            track_number: track.track_number,
            title: track.title,
            // Используем duration_seconds напрямую из DTO если есть,
            // иначе парсим строку вида "3:05"
            duration_seconds: track.duration_seconds ?? (() => {
                const parts = track.duration.split(':').map(Number);
                return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
            })(),
            file: undefined,
        })),
    } : {};

    if (!id) {
        return (
            <Container className="py-20">
                <div className="text-center">
                    <p className="text-primary-white-400">ID релиза не указан</p>
                    <Link to="/dashboard/releases" className="text-accent-1 hover:underline mt-4 inline-block">
                        Вернуться к списку
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/dashboard/releases"
                        className="inline-flex items-center gap-1 text-caption-regular text-primary-white-400 hover:text-accent-1 transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Назад к списку
                    </Link>
                    <h1 className="text-h3-display-bold text-primary-white-600 uppercase">
                        Редактирование релиза
                    </h1>
                </div>

                <QueryStateWrapper
                    loading={{
                        isLoading,
                        config: { message: 'Загрузка релиза...' },
                    }}
                    error={{
                        isError,
                        raw: error,
                        config: {
                            fallbackMessage: 'Не удалось загрузить релиз',
                            actionLabel: 'Повторить',
                            onClick: () => refetch(),
                        },
                    }}
                    empty={{
                        isEmpty: !release,
                        config: { message: 'Релиз не найден' },
                    }}
                >
                    <div className="bg-primary-black-500 border border-primary-black-300 p-6">
                        <ReleaseForm
                            defaultValues={defaultValues}
                            onSubmit={onSubmit}
                            isPending={isPending}
                            submitLabel="Сохранить изменения"
                            onDeleteTrack={(trackId) => deleteTrack(trackId)}
                            isDeletingTrack={isDeletingTrack}
                        />
                    </div>
                </QueryStateWrapper>
            </div>
        </Container>
    );
}