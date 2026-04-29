import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import heroImage from '@/pages/home/sections/assets/images/hero-img.webp';

type Props = {
    className?: string
}

const HomeHero = ({ className }: Props) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start']
    });

    // Параллакс эффекты для разных элементов
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.4]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const buttonScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1.1, 0.9]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
    const decorativeBlockX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const decorativeBlockY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.3, 0.6]);

    return (
        <section ref={targetRef} className={`${className} pt-36 tablet:pt-52 pb-16 tablet:pb-36 relative overflow-hidden`}>
            {/* Фоновый параллакс слой */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-black-600 via-primary-black-500 to-primary-black-600" />
                <div className="absolute top-20 -left-20 w-96 h-96 bg-accent-1/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-1/10 rounded-full blur-3xl" />
            </motion.div>

            <Container>
                <div className="grid grid-cols-1 tablet:grid-cols-16 gap-5 items-center relative z-10">
                    {/* Текстовый блок с параллаксом */}
                    <motion.div
                        className="tablet:col-span-6 space-y-6 tablet:space-y-8 text-center tablet:text-left"
                        style={{
                            y: textY,
                            opacity: textOpacity
                        }}
                    >
                        <motion.h2
                            className="text-h2-display-bold tablet:text-h1-display-bold text-primary-white-600 uppercase"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Новый релиз
                        </motion.h2>

                        <motion.p
                            className="text-title2-regular text-primary-white-500"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Погрузитесь в мир нашего последнего релиза! Вас ждет путешествие сквозь ритм и эмоции.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button size="small" variant='primary' className="w-full px-12">
                                Слушать
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Блок с изображением и параллакс-эффектами */}
                    <div className="relative tablet:col-start-8 tablet:col-span-9 aspect-square tablet:aspect-[710/549] flex items-center justify-center">
                        {/* Декоративный блок с анимацией разъезда */}
                        <motion.div
                            className='absolute w-32 h-32 bg-accent-1/20 rounded-full -z-0 -top-10 -right-10 blur-2xl'
                            style={{
                                x: decorativeBlockX,
                                y: decorativeBlockY
                            }}
                        />

                        <div className='absolute inset-0 w-full h-full items-center'>
                            <div className='flex h-full w-full items-center justify-center relative overflow-hidden rounded-lg'>
                                {/* Изображение с параллаксом */}
                                <motion.div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        scale: imageScale,
                                        rotate: imageRotate
                                    }}
                                >
                                    <img
                                        src={heroImage}
                                        alt="New Release"
                                        className="w-full h-full object-cover transform rotate-180 scale-y-[-1]"
                                    />
                                </motion.div>

                                {/* Затемняющий оверлей */}
                                <motion.div
                                    className="absolute inset-0 z-20 bg-gradient-to-t from-primary-black-600 via-transparent to-transparent"
                                    style={{ opacity: overlayOpacity }}
                                />

                                {/* Плавающая кнопка с анимацией */}
                                <motion.button
                                    type="button"
                                    className="relative z-30 w-20 h-20 tablet:w-24 tablet:h-24 rounded-full bg-accent-1 flex items-center justify-center transition-all shadow-2xl"
                                    style={{ scale: buttonScale }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        y: [0, -10, 0],
                                        boxShadow: [
                                            '0 0 0 0 rgba(163,62,68,0.4)',
                                            '0 0 0 20px rgba(163,62,68,0)',
                                            '0 0 0 0 rgba(163,62,68,0.4)'
                                        ]
                                    }}
                                    transition={{
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: 'reverse',
                                            ease: 'easeInOut'
                                        },
                                        boxShadow: {
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: 'loop',
                                            ease: 'easeInOut'
                                        }
                                    }}
                                    aria-label="Запустить видео"
                                >
                                    <svg className="w-8 h-9 ml-2" viewBox="0 0 32 37" fill="none">
                                        <path d="M0 36.75L32.1562 18.375L0 0V36.75Z" fill="#F2F2F2" />
                                    </svg>
                                </motion.button>

                                {/* Декоративные парящие элементы */}
                                <motion.div
                                    className="absolute top-10 left-10 w-20 h-20 border border-accent-1/30 rounded-full z-20"
                                    animate={{
                                        y: [0, -20, 0],
                                        x: [0, 10, 0],
                                        rotate: [0, 45, 0]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut'
                                    }}
                                />

                                <motion.div
                                    className="absolute bottom-10 right-10 w-12 h-12 border border-primary-white-300/20 rounded-full z-20"
                                    animate={{
                                        y: [0, -15, 0],
                                        x: [0, -10, 0],
                                        rotate: [0, -45, 0]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default HomeHero;