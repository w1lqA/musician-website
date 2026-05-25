// src/entities/release/model/types.ts
export interface MusicItem {
    id: string;
    title: string;
    artist: string;
    cover: string;
    releaseDate: string;
    type: string;
    isFeatured?: boolean;
}