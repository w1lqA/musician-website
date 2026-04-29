import { useState, type HTMLAttributes } from 'react';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import clsx from 'clsx';
import { Select } from '@/shared/ui/inputs/Select';

const tours = [
  { city: 'New York', venue: 'The Bowery Ballroom', date: 'November 15, 2024' },
  { city: 'Los Angeles', venue: 'The Echo', date: 'December 01, 2024' },
  { city: 'London', venue: 'Brixton Academy', date: 'January 10, 2025' },
  { city: 'Berlin', venue: 'Berghain', date: 'January 22, 2025' },
];

const cityOptions = [
  { value: 'all', label: 'Все города' },
  { value: 'New York', label: 'Нью-Йорк' },
  { value: 'Los Angeles', label: 'Лос-Анджелес' },
  { value: 'London', label: 'Лондон' },
  { value: 'Berlin', label: 'Берлин' },
];

interface ToursSectionProps extends HTMLAttributes<HTMLElement> { }

export const ToursSection = ({ className, ...props }: ToursSectionProps) => {
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredTours = selectedCity === 'all'
    ? tours
    : tours.filter(tour => tour.city === selectedCity);

  return (
    <section
      id="tours"
      className={clsx('bg-primary-black-600 py-16 tablet:py-24 flex w-full', className)}
      {...props}
    >
      <Container>
        <div className="space-y-12 tablet:space-y-12">
          <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-6">
            <h2 className="text-h3-display-bold text-primary-white-600 uppercase">
              БЛИЖАЙШИЕ КОНЦЕРТЫ
            </h2>

            <Select
              options={cityOptions}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full tablet:w-48"
            />
          </div>

          <div className="space-y-7">
            {filteredTours.map((tour, index) => (
              <div
                key={index}
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

            <Button variant="secondary" size="small" className="w-full">
              Смотреть Все
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};