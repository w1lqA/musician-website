// src/pages/home/index.tsx
import HomeHero from '@/pages/home/sections/hero';
import { Header } from '@/widgets/header';
import { MerchSection } from '@/widgets/merch-section';
import { MusicSection } from '@/widgets/music-section';
import { SocialSection } from '@/widgets/social-section';
import { ToursSection } from '@/widgets/tours-section';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-primary-black-600 flex flex-col w-full overflow-hidden max-w-[clamp(400px,100vw,1920px)] mx-auto">
      <Header />

      <main className='flex flex-col w-full self-center print:px-4 print:py-0'>
        <HomeHero />
        <MusicSection />
        <div className='grid grid-cols-1 desktop:grid-cols-16 gap-5 mx-auto w-full max-w-[clamp(400px,100vw,1440px)]'>
          <ToursSection className="desktop:col-span-9" />
          <MerchSection className="desktop:col-span-6 desktop:col-start-11" />
        </div>
        <SocialSection />
      </main>
    </div>
  );
};

export default HomePage;