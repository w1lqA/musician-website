// src/widgets/music-player/ui/MusicPlayer.tsx
import { Audio } from '@sina_byn/re-audio';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/widgets/music-player/model/playerStore';
import { MusicPlayerInner } from '@/widgets/music-player/ui/MusicPlayerInner';
import { getMediaUrl } from '@/shared/lib/media';

export const MusicPlayer = () => {
    const { isOpen, currentTrack } = usePlayerStore();

    if (!currentTrack) return null;

    const audioSrc = getMediaUrl(currentTrack.src);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-50"
                >
                    <Audio playlist={[{ id: currentTrack.id, src: audioSrc, name: currentTrack.title }]}>
                        <MusicPlayerInner />
                    </Audio>
                </motion.div>
            )}
        </AnimatePresence>
    );
};