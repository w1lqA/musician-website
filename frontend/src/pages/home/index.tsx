import HomeHero from '@/pages/home/sections/hero';
import { Footer } from '@/widgets/footer/ui/Footer';
import { Header } from '@/widgets/header/ui/Header';
import { MerchSection } from '@/widgets/merch-section/ui/MerchSection';
import { MusicSection } from '@/widgets/music-section/ui/MusicSection';
import { SocialSection } from '@/widgets/social-section';
import { ToursSection } from '@/widgets/tours-section/ui/ToursSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-primary-black-600 flex flex-col w-full overflow-hidden max-w-[clamp(400px,100vw,1920px)] mx-auto">
      <Header />

      <main className='flex flex-col w-full self-center'>

        <HomeHero />
        <MusicSection />
        <div className='grid grid-cols-1 desktop:grid-cols-16 gap-5 mx-auto w-full max-w-[clamp(400px,100vw,1440px)]'>
          <ToursSection
            className="desktop:col-span-9"
          />
          <MerchSection
            className="desktop:col-span-6 desktop:col-start-11"
          />
        </div>

        <SocialSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;