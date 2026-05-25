// src/shared/api/index.ts
export { baseApi } from '@/shared/api/base';

export { releaseApi } from '@/shared/api/release';
export type { ReleaseDTO, TrackDTO } from '@/shared/api/release/types';

export { concertApi } from '@/shared/api/concert';
export type { ConcertDTO, ConcertStatsDTO } from '@/shared/api/concert/types';

export { merchApi } from '@/shared/api/merch';
export type { ProductDTO, SKUDTO, ProductImageDTO, CreateProductDTO, UpdateProductDTO } from '@/shared/api/merch/types';

export { subscriberApi } from '@/shared/api/subscriber';
export type { SubscriberDTO, CreateSubscriberDTO } from '@/shared/api/subscriber/types';