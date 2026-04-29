import HomeHero from '@/pages/home/sections/hero';
import { Container } from '@/shared/ui/Container';
import { Footer } from '@/widgets/footer/ui/Footer';
import { Header } from '@/widgets/header/ui/Header';
import { MerchSection } from '@/widgets/merch-section/ui/MerchSection';
import { MusicSection } from '@/widgets/music-section/ui/MusicSection';
import { ToursSection } from '@/widgets/tours-section/ui/ToursSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-primary-black-600">
      <Header />

      <main>

        <HomeHero/>
        <MusicSection />
        <ToursSection />
        <MerchSection />

        <section className="bg-primary-black-500 py-12 md:py-16">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <h2 className="text-h3-display-bold text-primary-white-600 uppercase">
                СОЦСЕТИ
              </h2>
              <div className="flex items-center gap-4">
                {['Spotify', 'TikTok', 'Instagram', 'YouTube', 'Yandex Music'].map((platform) => (
                  <a
                    key={platform}
                    href={`#${platform.toLowerCase()}`}
                    className="w-14 h-14 rounded-full bg-accent-1 flex items-center justify-center transition-opacity hover:opacity-90"
                    aria-label={platform}
                  >
                    <span className="text-primary-white-600 text-xs">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-primary-black-600 py-20 md:py-28">
          <Container>
            <div className="max-w-[630px] mx-auto text-center space-y-10">
              <h2 className="text-h3-bold text-primary-white-600">
                ОСТАВАЙТЕСЬ НА СВЯЗИ
              </h2>
              <p className="text-title2-regular text-primary-white-500">
                Подпишитесь на нашу рассылку новостей, чтобы получать эксклюзивные обновления, ранний доступ к музыке и анонсы туров.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full md:w-56 h-10 px-4 rounded-2xl bg-primary-black-500 border border-primary-white-500 text-primary-white-600 text-caption-regular placeholder:text-secondary"
                />
                <button className="w-full md:w-56 h-10 px-7 rounded-2xl bg-accent-1 text-primary-white-600 text-caption-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2">
                  Подписаться
                  <svg className="w-3.5 h-3.5" viewBox="0 0 10 10" fill="none">
                    <path d="M8.7 0C9.02033 0 9.28 0.259666 9.28 0.58C9.28 0.900334 9.02033 1.16 8.7 1.16H0.58C0.259678 1.16 0 0.900334 0 0.58C0 0.259666 0.259678 0 0.58 0H8.7Z" fill="#F2F2F2" />
                    <path d="M0.169868 0.169787C0.382206 -0.0425626 0.718026 -0.055665 0.94585 0.130138L0.990045 0.169787L5.05005 4.2298C5.27654 4.45629 5.27654 4.82343 5.05005 5.04992L0.990045 9.10992C0.763555 9.33647 0.396357 9.33647 0.169868 9.10992C-0.0566225 8.88343 -0.0566225 8.51629 0.169868 8.2898L3.81981 4.63986L0.169868 0.989942L0.130253 0.945763C-0.0555786 0.717956 -0.0424705 0.382137 0.169868 0.169787Z" fill="#F2F2F2" />
                  </svg>
                </button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
};