// src/widgets/music-section/ui/cards/MusicCard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import type { MusicItem } from '@/entities/release';
import { usePlayerStore } from '@/widgets/music-player/model/playerStore';
import { getMediaUrl } from '@/shared/lib/media';

interface MusicCardProps {
    item: MusicItem;
    tracks?: Array<{ id: string; file: string; title: string }>;
}

export const MusicCard = ({ item, tracks = [] }: MusicCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isAboveTablet } = useScreenSize();
    const { openPlayer } = usePlayerStore();

    const rotationY = isAboveTablet && isHovered ? 180 : 0;

    const handleListen = () => {
        const firstTrack = tracks[0];
        if (firstTrack) {
            openPlayer({
                id: firstTrack.id,
                src: firstTrack.file,
                title: item.title,
                artist: item.artist,
                cover: item.cover,
            });
        }
    };

    return (
        <div
            className="relative w-full [perspective:1000px] print:[perspective:none]"
            onMouseEnter={() => isAboveTablet && setIsHovered(true)}
            onMouseLeave={() => isAboveTablet && setIsHovered(false)}
        >
            <motion.div
                className="relative w-full [transform-style:preserve-3d] print:[transform-style:flat] print:transform-none"
                initial={false}
                animate={{ rotateY: rotationY }}
                transition={{
                    duration: isAboveTablet ? 0.4 : 0,
                    ease: 'easeInOut'
                }}
            >
                <div className="w-full [backface-visibility:hidden] print:[backface-visibility:visible]">
                    <img
                        src={getMediaUrl(item.cover)}
                        alt={item.title}
                        className="w-full h-auto block rounded-md print:max-w-[150px] print:mx-auto"
                    />
                </div>

                <div className="absolute inset-0 w-full h-full tablet:[transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-md print:static print:[transform:none] print:relative print:mt-2">
                    <img
                        src={getMediaUrl(item.cover)}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover scale-x-[-1] brightness-70 tablet:brightness-30 print:hidden"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center print:static print:p-0">
                        <div className="flex flex-col gap-1 mb-4 print:mb-2">
                            <h3 className="text-lg tablet:text-xl font-bold uppercase text-white tracking-tighter leading-tight print:text-black">
                                {item.title}
                            </h3>
                            <span className="text-xs tablet:text-sm text-white/50 font-medium print:text-black/50">
                                {item.releaseDate}
                            </span>
                        </div>

                        <Button
                            variant='secondary'
                            hoverVariant='secondaryDefault'
                            size="medium"
                            className="px-6 py-2 tracking-widest uppercase print:hidden"
                            onClick={handleListen}
                            aria-label={`Слушать ${item.title}`}
                        >
                            СЛУШАТЬ
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};