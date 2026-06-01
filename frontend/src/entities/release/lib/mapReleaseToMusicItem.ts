// src/entities/release/lib/mapReleaseToMusicItem.ts
import type { ReleaseDTO } from '@/shared/api/release/types';
import type { MusicItem } from '../model/types';
import { getMediaUrl } from '@/shared/lib/media';

export const mapReleaseToMusicItem = (release: ReleaseDTO): MusicItem => ({
    id: release.id,
    title: release.title,
    artist: release.artist,
    cover: getMediaUrl(release.cover),
    releaseDate: new Date(release.release_date).toLocaleDateString('ru-RU'),
    type: release.type_display,
    isFeatured: release.is_featured,
});

export const mapReleasesToMusicItems = (releases: ReleaseDTO[]): MusicItem[] =>
    releases.map(mapReleaseToMusicItem);
