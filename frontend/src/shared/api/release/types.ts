export interface TrackDTO {
    id: string;
    track_number: number;
    title: string;
    duration: string;
    file: string;
}

export interface ReleaseDTO {
    id: string;
    title: string;
    artist: string;
    type: 'album' | 'single' | 'ep' | 'live' | 'compilation';
    type_display: string;
    release_date: string;
    cover: string;
    tracks: TrackDTO[];
    is_featured: boolean;
}