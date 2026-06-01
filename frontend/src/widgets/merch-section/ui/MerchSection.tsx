// src/widgets/merch-section/ui/MerchSection.tsx
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { QueryStateWrapper } from '@/shared/ui/feedback/QueryStateWrapper/QueryStateWrapper';
import { MerchCard, useProducts } from '@/entities/merch';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface MerchSectionProps extends HTMLAttributes<HTMLElement> { }

export const MerchSection = ({ className, ...props }: MerchSectionProps) => {
  const { data: products, isLoading, isError, error, refetch } = useProducts(4);

  return (
    <section
      id="merch"
      className={clsx('bg-primary-black-600 py-16 tablet:py-24 flex w-full print:py-4', className)}
      {...props}
    >
      <Container>
        <div className="space-y-12 tablet:space-y-12 print:space-y-4">
          <h2 className="text-h3-display-bold text-primary-white-600 uppercase text-center tablet:text-left print:text-black print:text-h4-display-bold">
            ЭКСКЛЮЗИВНЫЙ МЕРЧ
          </h2>

          <QueryStateWrapper
            loading={{
              isLoading,
              config: { message: 'Загрузка товаров...' }
            }}
            error={{
              isError,
              raw: error,
              config: {
                fallbackMessage: 'Не удалось загрузить товары',
                actionLabel: 'Повторить',
                onClick: () => refetch()
              }
            }}
            empty={{
              isEmpty: !products || products.length === 0,
              config: { message: 'Товары не найдены' }
            }}
          >
            <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-2 gap-5 tablet:gap-5 print:grid-cols-2 print:gap-2">
              {products?.slice(0, 4).map((item) => (
                <MerchCard key={item.id} item={item} />
              ))}
            </div>
          </QueryStateWrapper>

          {products && products.length > 0 && (
            <Button variant="secondary" size="small" className="w-full mx-auto block print:hidden">
              Смотреть Все
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};