import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

import albumImg1 from '@/widgets/music-section/assets/images/cassette-1.png';
import albumImg2 from '@/widgets/music-section/assets/images/cassette-2.png';
import albumImg3 from '@/widgets/music-section/assets/images/cassette-3.png';
import BaseSlider from '@/shared/ui/sliders/BaseSlider';
import { MusicCard } from '@/widgets/music-section/ui/cards/MusicCard';

const albums = [
  { id: 1, image: albumImg1, title: 'Release 1', date: '12.04.2026' },
  { id: 2, image: albumImg2, title: 'Release 2', date: '01.03.2026' },
  { id: 3, image: albumImg3, title: 'Release 3', date: '15.02.2026' },
];

export const MusicSection = () => {
  return (
    <section id="music" className="bg-primary-black-600">
      <div className="py-16 tablet:py-24">
        <Container>
          <div className="flex flex-col items-center gap-12 tablet:gap-16">
            <h2 className="text-h2-display-bold text-primary-white-600 uppercase text-center">
              НЕДАВНИЕ РЕЛИЗЫ
            </h2>

            <BaseSlider
              items={albums}
              showNavigation
              showPagination
              renderItem={(album) => (
                <MusicCard
                  image={album.image}
                  title={album.title}
                  date={album.date}
                />
              )}
              swiperProps={{
                breakpoints: {
                  320: { slidesPerView: 1, spaceBetween: 16 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                },
              }}
            />

            <Button size="small" className="w-full tablet:w-[468px]">
              Смотреть Все
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};