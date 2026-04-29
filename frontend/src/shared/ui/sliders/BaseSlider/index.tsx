import { useId, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperProps } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ArrowIcon from '@/shared/assets/icons/ArrowIcon';

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
    const uniqueId = useId().replace(/:/g, '');

    const paginationClass = `pagination-${uniqueId}`;
    const prevClass = `prev-${uniqueId}`;
    const nextClass = `next-${uniqueId}`;

    return (
        <div className={clsx('w-full relative group', className)}>
            <style>{`
                .${paginationClass} .swiper-pagination-bullet {
                    background: #F2F2F2 !important;
                    opacity: 1 !important;
                    width: 8px !important;
                    height: 8px !important;
                    transition: all 0.3s ease;
                }
                .${paginationClass} .swiper-pagination-bullet-active {
                    background: #A33E44 !important;
                    opacity: 1 !important;
                    transform: scale(1.2);
                }
                .${prevClass}.swiper-button-disabled, 
                .${nextClass}.swiper-button-disabled {
                    opacity: 0.2 !important;
                    cursor: not-allowed !important;
                }
            `}</style>

            <Swiper
                modules={[Pagination, Navigation]}
                onSlideChange={onSlideChange}
                navigation={showNavigation ? {
                    prevEl: `.${prevClass}`,
                    nextEl: `.${nextClass}`,
                } : false}
                pagination={showPagination ? {
                    el: `.${paginationClass}`,
                    clickable: paginationClickable,
                } : false}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 16 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                {...swiperProps}
                className={clsx('w-full !overflow-visible', swiperProps?.className)}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index} className={slideClassName}>
                        {renderItem(item, index)}
                    </SwiperSlide>
                ))}
            </Swiper>

            {showPagination && (
                <div className={clsx(paginationClass, 'flex justify-center gap-2 mt-12 !static')} />
            )}

            {showNavigation && (
                <div className="flex justify-between absolute -bottom-9 tablet:bottom-1/2 left-0 right-0 tablet:-left-12 tablet:-right-12 -translate-y-1/2 z-20 pointer-events-none">
                    <button
                        type="button"
                        className={clsx(
                            prevClass,
                            'w-10 h-10 rounded-full bg-primary-black-500 border border-primary-black-300 flex items-center justify-center transition-all hover:bg-accent-1 hover:border-accent-1 pointer-events-auto shadow-lg'
                        )}
                    >
                        <ArrowIcon className="w-5 h-5 text-primary-white-600 rotate-180" />
                    </button>
                    <button
                        type="button"
                        className={clsx(
                            nextClass,
                            'w-10 h-10 rounded-full bg-primary-black-500 border border-primary-black-300 flex items-center justify-center transition-all hover:bg-accent-1 hover:border-accent-1 pointer-events-auto shadow-lg'
                        )}
                    >
                        <ArrowIcon className="w-5 h-5 text-primary-white-600" />
                    </button>
                </div>
            )}
        </div>
    );
}