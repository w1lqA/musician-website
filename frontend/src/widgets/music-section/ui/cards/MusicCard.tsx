import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

interface MusicCardProps {
    image: string;
    title: string;
    date?: string;
}

export const MusicCard = ({ image, title, date = '2026' }: MusicCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isAboveTablet } = useScreenSize();

    const rotationY = isAboveTablet && isHovered ? 180 : 0;

    return (
        <div
            className="relative w-full [perspective:1000px]"
            onMouseEnter={() => isAboveTablet && setIsHovered(true)}
            onMouseLeave={() => isAboveTablet && setIsHovered(false)}
        >
            <motion.div
                className="relative w-full [transform-style:preserve-3d]"
                initial={false}
                animate={{ rotateY: rotationY }}
                transition={{
                    duration: isAboveTablet ? 0.4 : 0,
                    ease: 'easeInOut'
                }}
            >
                <div className="w-full [backface-visibility:hidden]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto block rounded-md"
                    />
                </div>

                <div
                    className="absolute inset-0 w-full h-full tablet:[transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden rounded-md"
                >
                    <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover scale-x-[-1] brightness-70 tablet:brightness-30"
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                        <div className="flex flex-col gap-1 mb-4">
                            <h3 className="text-lg tablet:text-xl font-bold uppercase text-white tracking-tighter leading-tight">
                                {title}
                            </h3>
                            <span className="text-xs tablet:text-sm text-white/50 font-medium">
                                {date}
                            </span>
                        </div>

                        <Button variant='secondary' hoverVariant='secondaryDefault' size="medium" className="px-6 py-2 tracking-widest uppercase">
                            СЛУШАТЬ
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};