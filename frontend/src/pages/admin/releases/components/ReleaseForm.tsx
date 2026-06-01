// src/pages/admin/releases/components/ReleaseForm.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/shared/ui/inputs/Input';
import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/inputs/Select';
import { Trash2, Plus } from 'lucide-react';

const trackSchema = z.object({
    id: z.string().optional(),
    track_number: z.number().min(1, 'Номер трека обязателен'),
    title: z.string().min(1, 'Название трека обязательно'),
    duration_seconds: z.number().min(1, 'Длительность обязательна'),
    file: z.any().optional(),
});

const releaseSchema = z.object({
    title: z.string().min(1, 'Название обязательно'),
    artist: z.string().min(1, 'Исполнитель обязателен'),
    type: z.string().min(1, 'Тип обязателен'),
    release_date: z.string().min(1, 'Дата релиза обязательна'),
    description: z.string().optional(),
    is_featured: z.boolean(),
    cover: z.any().optional(),
    tracks: z.array(trackSchema),
});

type ReleaseFormValues = z.infer<typeof releaseSchema>;

const typeOptions = [
    { value: 'album', label: 'Альбом' },
    { value: 'single', label: 'Сингл' },
    { value: 'ep', label: 'EP' },
    { value: 'live', label: 'Концертный альбом' },
    { value: 'compilation', label: 'Сборник' },
];

interface ReleaseFormProps {
    defaultValues?: Partial<ReleaseFormValues>;
    onSubmit: (data: ReleaseFormValues) => void;
    isPending: boolean;
    submitLabel: string;
}

export const ReleaseForm = ({ defaultValues, onSubmit, isPending, submitLabel }: ReleaseFormProps) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<ReleaseFormValues>({
        resolver: zodResolver(releaseSchema),
        defaultValues: {
            title: '',
            artist: '',
            type: 'single',
            release_date: '',
            description: '',
            is_featured: false,
            cover: undefined,
            tracks: [],
            ...defaultValues,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tracks',
    });

    const addTrack = () => {
        const nextNumber = fields.length + 1;
        append({
            track_number: nextNumber,
            title: '',
            duration_seconds: 180,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                <Input
                    label="Название"
                    placeholder="Название релиза"
                    {...register('title')}
                    error={errors.title?.message}
                />
                <Input
                    label="Исполнитель"
                    placeholder="Исполнитель"
                    {...register('artist')}
                    error={errors.artist?.message}
                />
                <Select
                    label="Тип"
                    options={typeOptions}
                    error={errors.type?.message}
                    {...register('type')}
                />
                <Input
                    label="Дата релиза"
                    type="date"
                    {...register('release_date')}
                    error={errors.release_date?.message}
                />
                <div className="tablet:col-span-2">
                    <Input
                        label="Описание"
                        placeholder="Описание релиза"
                        {...register('description')}
                        error={errors.description?.message}
                    />
                </div>
                <div>
                    <label className="block text-caption-regular text-primary-white-500 mb-1.5 ml-1">
                        Обложка
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full bg-primary-black-500 border border-primary-black-300 h-10 px-4 text-primary-white-600 file:bg-accent-1 file:text-primary-white-600 file:border-0 file:h-full file:px-4 file:mr-4"
                        {...register('cover')}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-accent-1"
                            {...register('is_featured')}
                        />
                        <span className="text-caption-regular text-primary-white-400">
                            В рекомендациях
                        </span>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-title2-medium text-primary-white-600 uppercase">Треки</h3>
                    <Button type="button" size="small" variant="secondary" onClick={addTrack}>
                        <Plus className="w-4 h-4 mr-1" />
                        Добавить трек
                    </Button>
                </div>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="bg-primary-black-600 border border-primary-black-300 p-4">
                            <div className="grid grid-cols-1 tablet:grid-cols-12 gap-3">
                                <div className="tablet:col-span-1">
                                    <Input
                                        type="number"
                                        placeholder="№"
                                        {...register(`tracks.${index}.track_number` as const, { valueAsNumber: true })}
                                        error={errors.tracks?.[index]?.track_number?.message}
                                    />
                                </div>
                                <div className="tablet:col-span-5">
                                    <Input
                                        placeholder="Название трека"
                                        {...register(`tracks.${index}.title` as const)}
                                        error={errors.tracks?.[index]?.title?.message}
                                    />
                                </div>
                                <div className="tablet:col-span-2">
                                    <Input
                                        type="number"
                                        placeholder="Длительность (сек)"
                                        {...register(`tracks.${index}.duration_seconds` as const, { valueAsNumber: true })}
                                        error={errors.tracks?.[index]?.duration_seconds?.message}
                                    />
                                </div>
                                <div className="tablet:col-span-3">
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        className="w-full bg-primary-black-500 border border-primary-black-300 h-10 px-2 text-primary-white-600 text-caption-regular"
                                        {...register(`tracks.${index}.file` as const)}
                                    />
                                </div>
                                <div className="tablet:col-span-1 flex items-center justify-end">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-primary-white-400 hover:text-accent-1 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {fields.length === 0 && (
                    <div className="text-center py-8 bg-primary-black-600 border border-primary-black-300">
                        <p className="text-caption-regular text-primary-white-400">
                            Нет треков. Нажмите "Добавить трек"
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-primary-black-300">
                <Button type="button" variant="secondary" size="medium" onClick={() => window.history.back()}>
                    Отмена
                </Button>
                <Button type="submit" disabled={isPending} size="medium">
                    {isPending ? 'Сохранение...' : submitLabel}
                </Button>
            </div>
        </form>
    );
};

export type { ReleaseFormValues };