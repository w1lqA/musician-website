import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

import albumImg1 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import albumImg2 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import albumImg3 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import BaseSlider from '@/shared/ui/sliders/BaseSlider';

const albums = [
  { id: 1, image: albumImg1, title: 'Release 1' },
  { id: 2, image: albumImg2, title: 'Release 2' },
  { id: 3, image: albumImg3, title: 'Release 3' },
  { id: 4, image: albumImg1, title: 'Release 4' },
  { id: 5, image: albumImg2, title: 'Release 5' },
  { id: 6, image: albumImg3, title: 'Release 6' },
];

export const MusicSection = () => {
  return (
    <section id="music" className="bg-primary-black-600">
      <div className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-12 md:gap-16">
            <h2 className="text-h2-display-bold text-primary-white-600 uppercase text-center">
              НЕДАВНИЕ РЕЛИЗЫ
            </h2>

            <BaseSlider
              items={albums}
              showNavigation
              showPagination
              renderItem={(album) => (
                <div className="w-full">
                  <img 
                    src={album.image} 
                    alt={album.title} 
                    className="w-full h-auto rounded-md" 
                  />
                </div>
              )}
              swiperProps={{
                breakpoints: {
                  320: { slidesPerView: 1, spaceBetween: 16 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                },
              }}
            />

            <Button size="small" className="w-full md:w-[468px]">
              Смотреть Все
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};