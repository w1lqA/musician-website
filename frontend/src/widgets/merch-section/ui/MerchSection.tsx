import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { MerchCard } from '@/entities/merch/ui/MerchCard';

import merchImg1 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg2 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg3 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import merchImg4 from '@/imports/MainDark/27a4daf36bfdd614356b7a96d454d85a6cebbd87.png';
import type { MerchItem } from '@/entities/merch/model/types';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

const merchItems: MerchItem[] = [
  { id: '1', name: 'Кожаная Куртка', price: '$25.00', image: merchImg4 },
  { id: '2', name: 'Джинсы', price: '$25.00', image: merchImg2 },
  { id: '3', name: 'Ботинки', price: '$25.00', image: merchImg3 },
  { id: '4', name: 'Свитер', price: '$25.00', image: merchImg1 },
];

interface MerchSectionProps extends HTMLAttributes<HTMLElement> { }

export const MerchSection = ({ className, ...props }: MerchSectionProps) => {
  return (
    <section
      id="merch"
      className={clsx('bg-primary-black-600 py-16 tablet:py-24 flex w-full', className)}
      {...props}
    >
      <Container>
        <div className="space-y-12 tablet:space-y-12">
          <h2 className="text-h3-display-bold text-primary-white-600 uppercase text-center tablet:text-left">
            ЭКСКЛЮЧИВНЫЙ МЕРЧ
          </h2>

          <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-2 gap-5 tablet:gap-5">
            {merchItems.map((item) => (
              <MerchCard key={item.id} item={item} />
            ))}
          </div>

          <Button variant="secondary" size="small" className="w-full mx-auto block">
            Смотреть Все
          </Button>
        </div>
      </Container>
    </section>
  );
};