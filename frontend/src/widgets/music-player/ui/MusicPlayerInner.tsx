// src/widgets/music-player/ui/MusicPlayerInner.tsx
import { formatTime, useAudio } from '@sina_byn/re-audio';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { usePlayerStore } from '@/widgets/music-player/model/playerStore';
import { getMediaUrl } from '@/shared/lib/media';


export const MusicPlayerInner = () => {
    const { currentTrack, isPlaying, setIsPlaying } = usePlayerStore();
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    const {
        playing,
        togglePlay,
        currentTime,
        duration,
        setCurrentTime,
        setVolume: setAudioVolume,
    } = useAudio();

    useEffect(() => {
        if (isPlaying && !playing) {
            togglePlay();
        } else if (!isPlaying && playing) {
            togglePlay();
        }
    }, [isPlaying, playing, togglePlay]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setVolume(value);
        setAudioVolume(value);
        setIsMuted(value === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            setAudioVolume(volume || 0.75);
            setIsMuted(false);
        } else {
            setAudioVolume(0);
            setIsMuted(true);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && duration) {
            const rect = progressRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            setCurrentTime(percentage * duration);
        }
    };

    const handlePlayPause = () => {
        togglePlay();
        setIsPlaying(!playing);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    if (!currentTrack) return null;

    const audioSrc = getMediaUrl(currentTrack.src);
    const coverSrc = getMediaUrl(currentTrack.cover);

    return (
        <div className="bg-primary-black-500 border-t border-primary-black-300 py-3 px-4 shadow-xl">
            <div className="max-w-screen-xl mx-auto">
                <div className="hidden tablet:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2 flex items-center gap-3 min-w-0">
                        <div className='w-12 h-12 rounded flex-shrink-0 flex items-center justify-center'>
                            {coverSrc && (
                                <img
                                    src={coverSrc}
                                    alt={currentTrack.title}
                                    className="object-cover w-full h-full"
                                />
                            )}
                            <button
                                onClick={handlePlayPause}
                                className="w-10 h-10 rounded-full bg-accent-1 flex absolute m-auto items-center justify-center text-primary-white-600 hover:bg-accent-2 transition-colors flex-shrink-0"
                                aria-label={playing ? 'Пауза' : 'Воспроизвести'}
                            >
                                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>

                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-caption-medium text-primary-white-600 truncate">
                                {currentTrack.title}
                            </p>
                            <p className="text-caption-regular text-primary-white-400 truncate">
                                {currentTrack.artist}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-8 flex flex-col w-full items-center flex-1 gap-3">
                        <div className="flex-1 w-full flex items-center gap-4">
                            <div className="flex justify-between text-caption-regular text-primary-white-400 mt-1">
                                <span>{formatTime(currentTime)}</span>
                            </div>
                            <div
                                ref={progressRef}
                                className="h-1 bg-primary-black-400 rounded-full w-full cursor-pointer"
                                onClick={handleProgressClick}
                            >
                                <div
                                    className="h-full bg-accent-1 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-caption-regular text-primary-white-400 mt-1">
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                        <button
                            onClick={toggleMute}
                            className="text-primary-white-400 hover:text-accent-1 transition-colors"
                            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-24 h-1 bg-primary-black-400 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-1"
                            aria-label="Громкость"
                        />
                    </div>
                </div>

                {/* Мобильная версия - flex column */}
                <div className="tablet:hidden space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            {coverSrc && (
                                <img
                                    src={coverSrc}
                                    alt={currentTrack.title}
                                    className="w-10 h-10 object-cover rounded flex-shrink-0"
                                />
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-caption-medium text-primary-white-600 truncate">
                                    {currentTrack.title}
                                </p>
                                <p className="text-caption-regular text-primary-white-400 truncate">
                                    {currentTrack.artist}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="text-primary-white-400 hover:text-accent-1 transition-colors"
                                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-primary-black-400 rounded-full appearance-none cursor-pointer"
                                aria-label="Громкость"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePlayPause}
                            className="w-10 h-10 rounded-full bg-accent-1 flex items-center justify-center text-primary-white-600 hover:bg-accent-2 transition-colors flex-shrink-0"
                            aria-label={playing ? 'Пауза' : 'Воспроизвести'}
                        >
                            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>

                        <div className="flex-1">
                            <div
                                ref={progressRef}
                                className="h-1 bg-primary-black-400 rounded-full cursor-pointer"
                                onClick={handleProgressClick}
                            >
                                <div
                                    className="h-full bg-accent-1 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-caption-regular text-primary-white-400 mt-1">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Скрытый audio элемент */}
            <audio
                ref={(el) => {
                    if (el) {
                        el.src = audioSrc;
                    }
                }}
                className="hidden"
            />
        </div>
    );
};