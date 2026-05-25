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
      className={clsx('bg-primary-black-600 py-16 tablet:py-24', className)}
      {...props}
    >
      <Container>
        <div className="space-y-12">
          <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-6">
            <h2 className="text-h3-display-bold text-primary-white-600 uppercase">
              БЛИЖАЙШИЕ КОНЦЕРТЫ
            </h2>

            <Select
              options={cityOptions}
              value={selectedCityId}
              onChange={handleCityChange}
              className="w-full tablet:w-48"
            />
          </div>

          {stats && (
            <div className="grid grid-cols-3 gap-4 bg-primary-black-500 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400">Всего концертов</p>
                <p className="text-title1-bold text-primary-white-600">{stats.total_concerts}</p>
              </div>
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400">Средняя цена</p>
                <p className="text-title1-bold text-primary-white-600">${stats.avg_price}</p>
              </div>
              <div className="text-center">
                <p className="text-caption-regular text-primary-white-400">Макс. цена</p>
                <p className="text-title1-bold text-primary-white-600">${stats.max_price}</p>
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
            <div className="space-y-7">
              {tours?.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-primary-black-500 border border-primary-black-300 px-6 tablet:px-8 py-5 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-title2-medium text-primary-white-600 mb-1">
                      {tour.city} – {tour.venue}
                    </p>
                    <p className="text-caption-regular text-secondary">
                      {tour.date}
                    </p>
                  </div>
                  <Button size="small" className="w-full tablet:w-36">
                    Билеты
                  </Button>
                </div>
              ))}

              {tours && tours.length > 0 && (
                <Button variant="secondary" size="small" className="w-full">
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