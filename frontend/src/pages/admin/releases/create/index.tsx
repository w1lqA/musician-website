import { Container } from '@/shared/ui/Container';
import { useNavigate } from 'react-router-dom';
import { ReleaseForm, type ReleaseFormValues } from '../components/ReleaseForm';
import { useCreateRelease } from '@/features/admin/hooks/useAdminReleases';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminReleaseCreatePage() {
    const navigate = useNavigate();
    const { mutate: createRelease, isPending } = useCreateRelease();

    const onSubmit = (data: ReleaseFormValues) => {
        createRelease(data, {
            onSuccess: () => {
                navigate('/admin/releases');
            },
        });
    };

    return (
        <Container className="py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/admin/releases"
                        className="inline-flex items-center gap-1 text-caption-regular text-primary-white-400 hover:text-accent-1 transition-colors mb-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Назад к списку
                    </Link>
                    <h1 className="text-h3-display-bold text-primary-white-600 uppercase">
                        Создание релиза
                    </h1>
                </div>

                <div className="bg-primary-black-500 border border-primary-black-300 p-6">
                    <ReleaseForm
                        onSubmit={onSubmit}
                        isPending={isPending}
                        submitLabel="Создать релиз"
                    />
                </div>
            </div>
        </Container>
    );
}