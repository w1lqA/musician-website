import { Container } from '@/shared/ui/Container';
import { useState, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Input } from '@/shared/ui/inputs/Input';
import { Button } from '@/shared/ui/Button';
import ArrowRightIcon from '@/shared/assets/icons/ArrowRightIcon';

// Импорт иконок
import SpotifyIcon from '@/widgets/social-section/assets/icons/SpotifyIcon';
import TiktokIcon from '@/widgets/social-section/assets/icons/TiktokIcon';
import YandexMusicIcon from '@/widgets/social-section/assets/icons/YandexMusicIcon';
import YouTubeIcon from '@/widgets/social-section/assets/icons/YouTubeIcon';
import InstagramIcon from '@/widgets/social-section/assets/icons/InstagramIcon';

interface SocialSectionProps extends HTMLAttributes<HTMLElement> { }

// Конфиг соцсетей для чистого маппинга
const SOCIAL_LINKS = [
    { id: 'spotify', platform: 'Spotify', Icon: SpotifyIcon, href: '#' },
    { id: 'tiktok', platform: 'TikTok', Icon: TiktokIcon, href: '#' },
    { id: 'instagram', platform: 'Instagram', Icon: InstagramIcon, href: '#' },
    { id: 'youtube', platform: 'YouTube', Icon: YouTubeIcon, href: '#' },
    { id: 'yandex', platform: 'Yandex Music', Icon: YandexMusicIcon, href: '#' },
];

export const SocialSection = ({ className, ...props }: SocialSectionProps) => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        console.log('Subscribed:', email);
    };

    return (
        <section
            id="social"
            className={clsx('flex flex-col w-full', className)}
            {...props}
        >
            {/* Панель иконок */}
            <div className='bg-primary-black-500 py-4 tablet:py-8'>
                <Container>
                    <div className="flex flex-col tablet:flex-row items-center justify-between gap-8">
                        <h2 className="text-h3-display-bold text-primary-white-600 uppercase">
                            СОЦСЕТИ
                        </h2>
                        <div className="flex items-center gap-4">
                            {SOCIAL_LINKS.map(({ id, platform, Icon, href }) => (
                                <a
                                    key={id}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 tablet:w-14 tablet:h-14 rounded-full bg-accent-1 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--accent-1-rgb),0.4)] group"
                                    aria-label={platform}
                                >
                                    <Icon className="w-8 h-8 text-primary-white-600 transition-transform group-hover:rotate-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Блок подписки */}
            <Container className='flex flex-col items-center py-20 tablet:py-24'>
                <div className="mx-auto text-center space-y-10 flex flex-col items-center max-w-lg">
                    <div className='space-y-4'>
                        <h2 className="text-h3-bold text-primary-white-600 uppercase">
                            ОСТАВАЙТЕСЬ НА СВЯЗИ
                        </h2>
                        <p className="text-title2-regular text-primary-white-500">
                            Подпишитесь на нашу рассылку новостей, чтобы получать эксклюзивные обновления, ранний доступ к музыке и анонсы туров.
                        </p>
                    </div>

                    <form
                        className="flex flex-col tablet:flex-row items-stretch tablet:items-end gap-3 w-full"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full'
                        />

                        <Button
                            onClick={handleSubscribe}
                            className="rounded-full flex items-center justify-center gap-2 shrink-0 h-10 px-8"
                            hoverVariant='primaryWhite'
                        >
                            Подписаться
                            <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </Container>
        </section>
    );
};