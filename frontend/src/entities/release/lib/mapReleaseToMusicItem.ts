// src/entities/release/lib/mapReleaseToMusicItem.ts
import type { MusicItem, MusicTrack } from '@/entities/release/model/types';
import type { ReleaseDTO } from '@/shared/api/release/types';
import { getMediaUrl } from '@/shared/lib/media';

const mapTrackToMusicTrack = (track: ReleaseDTO['tracks'][0]): MusicTrack => ({
    id: track.id,
    trackNumber: track.track_number,
    title: track.title,
    duration: track.duration,
    file: getMediaUrl(track.file),
});

export const mapReleaseToMusicItem = (release: ReleaseDTO): MusicItem => ({
    id: release.id,
    title: release.title,
    artist: release.artist,
    cover: getMediaUrl(release.cover),
    releaseDate: new Date(release.release_date).toLocaleDateString('ru-RU'),
    type: release.type_display,
    isFeatured: release.is_featured,
    tracks: release.tracks?.map(mapTrackToMusicTrack) || [],
});

export const mapReleasesToMusicItems = (releases: ReleaseDTO[]): MusicItem[] =>
    releases.map(mapReleaseToMusicItem);