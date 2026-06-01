// src/widgets/music-section/ui/MusicSection.tsx
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { useFeaturedReleases } from '@/entities/release';
import { MusicCard } from './cards/MusicCard';

export const MusicSection = () => {
  const { data: releases, isLoading, isError, error, refetch } = useFeaturedReleases();

  return (
    <section className="bg-primary-black-600 py-16 tablet:py-24 print:py-4">
      <Container>
        <div className="flex flex-col gap-12 w-full print:gap-4">
          <h2 className="text-h3-display-bold text-primary-white-600 uppercase text-center print:text-black print:text-h4-display-bold">
            ПОСЛЕДНИЕ РЕЛИЗЫ
          </h2>

          <QueryStateWrapper
            loading={{
              isLoading,
              config: { message: 'Загрузка релизов...' }
            }}
            error={{
              isError,
              raw: error,
              config: {
                fallbackMessage: 'Не удалось загрузить релизы',
                actionLabel: 'Повторить',
                onClick: () => refetch()
              }
            }}
            empty={{
              isEmpty: !releases || releases.length === 0,
              config: { message: 'Релизы не найдены' }
            }}
          >
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 print:grid-cols-1 print:gap-2">
              {releases?.slice(0, 3).map((release) => (
                <MusicCard
                  key={release.id}
                  item={release}
                  tracks={release.tracks}
                />
              ))}
            </div>
          </QueryStateWrapper>

          {releases && releases.length > 0 && (
            <Button variant="secondary" size="small" className="w-full mx-auto block tablet:max-w-1/3 print:hidden">
              Смотреть Все
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};