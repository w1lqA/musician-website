// src/widgets/music-player/model/playerStore.ts
import { create } from 'zustand';

interface Track {
    id: string;
    src: string;
    title: string;
    artist: string;
    cover: string;
}

interface PlayerState {
    isOpen: boolean;
    currentTrack: Track | null;
    isPlaying: boolean;
    openPlayer: (track: Track) => void;
    closePlayer: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
    isOpen: false,
    currentTrack: null,
    isPlaying: false,
    openPlayer: (track) => set({ isOpen: true, currentTrack: track, isPlaying: true }),
    closePlayer: () => set({ isOpen: false, currentTrack: null, isPlaying: false }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
}));