import { useState } from 'react';
import { Input } from '@/shared/ui/inputs/Input';
import { Button } from '@/shared/ui/Button';
import ArrowRightIcon from '@/shared/assets/icons/ArrowRightIcon';
import { useSubscribe } from '@/features/subscribe/hooks/useSubscribe';

export const SubscribeForm = () => {
    const [email, setEmail] = useState('');
    const { mutate, isPending, isSuccess, isError } = useSubscribe();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            mutate({ email }, {
                onSuccess: () => setEmail(''),
                onError: (error) => console.error('Subscription error:', error),
            });
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-4">
                <p className="text-body-medium text-primary-white-600">
                    Спасибо за подписку! 🎉
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col tablet:flex-row items-stretch tablet:items-end gap-3 w-full">
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="w-full"
                required
            />

            <Button
                type="submit"
                disabled={isPending}
                className="rounded-full flex items-center justify-center gap-2 shrink-0 h-10 px-8"
                hoverVariant="primaryWhite"
            >
                {isPending ? 'Подписка...' : 'Подписаться'}
                <ArrowRightIcon className="w-4 h-4" />
            </Button>

            {isError && (
                <p className="text-caption-regular text-accent-1 mt-2 text-center">
                    Ошибка. Возможно, вы уже подписаны.
                </p>
            )}
        </form>
    );
};