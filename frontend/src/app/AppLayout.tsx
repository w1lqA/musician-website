// src/app/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';
import GrainOverlay from '@/shared/ui/GrainOverlay';
import { MusicPlayer } from '@/widgets/music-player/ui/MusicPlayer';

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-primary-black-600 flex flex-col w-full overflow-hidden max-w-[clamp(400px,100vw,1920px)] mx-auto">
            <GrainOverlay />
            <Header />
            <main className="flex flex-col w-full self-center pt-20">
                <Outlet />
            </main>
            <Footer />
            <MusicPlayer />
        </div>
    );
};