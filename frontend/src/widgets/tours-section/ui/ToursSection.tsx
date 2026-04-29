import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';

const tours = [
  { city: 'New York – The Bowery Ballroom', date: 'November 15, 2024' },
  { city: 'Los Angeles – The Echo', date: 'December 01, 2024' },
  { city: 'London – Brixton Academy', date: 'January 10, 2025' },
  { city: 'Berlin – Berghain', date: 'January 22, 2025' },
];

export const ToursSection = () => {
  return (
    <section id="tours" className="bg-primary-black-600 py-16 md:py-24">
      <Container>
        <div className="space-y-12 md:space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h2 className="text-h2-display-bold text-primary-white-600 uppercase">
              БЛИЖАЙШИЕ КОНЦЕРТЫ
            </h2>
            <select className="bg-primary-black-500 border border-primary-black-300 h-9 px-4 text-primary-white-600 text-caption-regular cursor-pointer">
              <option>Все города</option>
            </select>
          </div>

          <div className="space-y-7">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="bg-primary-black-500 border border-primary-black-300 px-6 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-title2-medium text-primary-white-600 mb-1">
                    {tour.city}
                  </p>
                  <p className="text-caption-regular text-secondary">
                    {tour.date}
                  </p>
                </div>
                <Button size="small" className="w-full md:w-36">
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