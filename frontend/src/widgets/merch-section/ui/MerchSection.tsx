import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { MerchCard } from '@/entities/merch/ui/MerchCard';

import merchImg1 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg2 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg3 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg4 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import type { MerchItem } from '@/entities/merch/model/types';

const merchItems: MerchItem[] = [
  { id: '1', name: 'Кожаная Куртка', price: '$25.00', image: merchImg4 },
  { id: '2', name: 'Джинсы', price: '$25.00', image: merchImg2 },
  { id: '3', name: 'Ботинки', price: '$25.00', image: merchImg3 },
  { id: '4', name: 'Свитер', price: '$25.00', image: merchImg1 },
];

export const MerchSection = () => {
  return (
    <section id="merch" className="bg-primary-black-600 py-16 md:py-24">
      <Container>
        <div className="space-y-12 md:space-y-12">
          <h2 className="text-h2-display-bold text-primary-white-600 uppercase text-center md:text-left">
            ЭКСКЛЮЧИВНЫЙ МЕРЧ
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-5">
            {merchItems.map((item) => (
              <MerchCard key={item.id} item={item} />
            ))}
          </div>

          <Button variant="secondary" size="small" className="w-full md:w-auto mx-auto block">
            Смотреть Все
          </Button>
        </div>
      </Container>
    </section>
  );
};