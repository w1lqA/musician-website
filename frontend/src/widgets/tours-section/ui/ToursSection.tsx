// src/widgets/tours-section/ui/ToursSection.tsx
import { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/inputs/Select';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { useUpcomingConcerts, useConcertStats, useCities } from '@/entities/concert';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface ToursSectionProps extends HTMLAttributes<HTMLElement> { }

export const ToursSection = ({ className, ...props }: ToursSectionProps) => {
  const [selectedCityId, setSelectedCityId] = useState('all');
  const { data: tours, isLoading, isError, error, refetch } = useUpcomingConcerts({
    limit: 10,
    city_id: selectedCityId !== 'all' ? selectedCityId : undefined
  });
  const { data: stats } = useConcertStats();
  const { data: citiesList } = useCities();

  const cityOptions = [
    { value: 'all', label: 'Все города' },
    ...(citiesList?.map(city => ({ value: city.id, label: city.name })) || [])
  ];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(e.target.value);
  };

  return (
    <section
      className={clsx('bg-primary-black-600 py-16 tablet:py-24 print:py-4 print:mt-48', className)}
      {...props}
    >
      <Container>
        <div className="space-y-12 print:space-y-4">
          <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-6 print:flex-col print:gap-2">
            <h2 className="text-h3-display-bold text-primary-white-600 uppercase print:text-black print:text-h4-display-bold">
              БЛИЖАЙШИЕ КОНЦЕРТЫ
            </h2>

            <Select
              options={cityOptions}
              value={selectedCityId}
              onChange={handleCityChange}
              className="w-full tablet:w-48 print:hidden"
            />
          </div>

          {stats && (
            <div className="grid grid-cols-3 gap-4 bg-primary-black-500 p-4 border border-primary-black-300 print:bg-white print:border-black print:p-2 print:gap-2">
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400 print:text-black">Всего концертов</p>
                <p className="text-title1-bold text-primary-white-600 print:text-black">{stats.total_concerts}</p>
              </div>
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400 print:text-black">Средняя цена</p>
                <p className="text-title1-bold text-primary-white-600 print:text-black">${stats.avg_price}</p>
              </div>
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400 print:text-black">Макс. цена</p>
                <p className="text-title1-bold text-primary-white-600 print:text-black">${stats.max_price}</p>
              </div>
            </div>
          )}

          <QueryStateWrapper
            loading={{
              isLoading,
              config: { message: 'Загрузка концертов...' }
            }}
            error={{
              isError,
              raw: error,
              config: {
                fallbackMessage: 'Не удалось загрузить концерты',
                actionLabel: 'Повторить',
                onClick: () => refetch()
              }
            }}
            empty={{
              isEmpty: !tours || tours.length === 0,
              config: { message: 'Нет ближайших концертов' }
            }}
          >
            <div className="flex flex-col gap-7 print:gap-2">
              {tours?.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-primary-black-500 border border-primary-black-300 px-6 tablet:px-8 py-5 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4 print:bg-white print:border-black print:p-2 print:flex-row print:break-inside-avoid print:break-before-avoid"
                >
                  <div>
                    <p className="text-title2-medium text-primary-white-600 mb-1 print:text-black">
                      {tour.city} – {tour.venue}
                    </p>
                    <p className="text-caption-regular text-secondary print:text-black/70">
                      {tour.date}
                    </p>
                  </div>
                  <Button size="small" className="w-full tablet:w-36 print:hidden">
                    Билеты
                  </Button>
                </div>
              ))}

              {tours && tours.length > 0 && (
                <Button variant="secondary" size="small" className="w-full print:hidden">
                  Смотреть Все
                </Button>
              )}
            </div>
          </QueryStateWrapper>
        </div>
      </Container>
    </section>
  );
};