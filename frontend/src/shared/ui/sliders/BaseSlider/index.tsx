import { useId, useRef, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BaseSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  slideClassName?: string;
  swiperProps?: SwiperProps;
  showNavigation?: boolean;
  showPagination?: boolean;
  paginationClickable?: boolean;
  onSlideChange?: (swiper: SwiperType) => void;
}

export default function BaseSlider<T>({
  items,
  renderItem,
  className,
  slideClassName,
  swiperProps,
  showNavigation = false,
  showPagination = false,
  paginationClickable = true,
  onSlideChange,
}: BaseSliderProps<T>) {
  const swiperRef = useRef<SwiperType | null>(null);
  const uniqueId = useId().replace(/:/g, '');
  const paginationClass = `slider-pagination-${uniqueId}`;
  const prevButtonClass = `slider-prev-${uniqueId}`;
  const nextButtonClass = `slider-next-${uniqueId}`;

  const defaultBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  };

  return (
    <div className={clsx('w-full relative', className)}>
      <Swiper
        modules={[Pagination, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={onSlideChange}
        navigation={showNavigation ? {
          prevEl: `.${prevButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        } : false}
        pagination={showPagination ? {
          clickable: paginationClickable,
          el: `.${paginationClass}`,
          bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-primary-white-300 !opacity-100 !mx-1',
          bulletActiveClass: '!bg-accent-1 !w-2 !h-2',
        } : false}
        breakpoints={swiperProps?.breakpoints || defaultBreakpoints}
        {...swiperProps}
        className={clsx('w-full', swiperProps?.className)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showPagination && (
        <div className={clsx(paginationClass, 'flex justify-center gap-2 mt-8')} />
      )}

      {showNavigation && (
        <div className='flex w-full justify-between absolute bottom-0 desktop:bottom-1/2 translate-y-1/2 z-10'>
          <button
          type='button'
            className={clsx(
              prevButtonClass,
              'w-10 h-10 rounded-full bg-primary-black-500 border border-primary-black-300',
              'flex items-center justify-center transition-all hover:bg-accent-1 hover:border-accent-1',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg className="w-5 h-5 text-primary-white-600 rotate-180" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
          type='button'

            className={clsx(
              nextButtonClass,
              'w-10 h-10 rounded-full bg-primary-black-500 border border-primary-black-300',
              'flex items-center justify-center transition-all hover:bg-accent-1 hover:border-accent-1',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg className="w-5 h-5 text-primary-white-600" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}