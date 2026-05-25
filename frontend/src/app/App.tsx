import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { MerchDetailsPage } from '@/pages/merch-details';
import { HomePage } from '@/pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GrainOverlay from '@/shared/ui/GrainOverlay';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className='relative'
      //     className="relative before:absolute before:top-0 before:left-0 before:w-full
      //  before:h-full before:content-[''] before:opacity-[0.02] before:z-1000 before:pointer-events-none
      //  before:bg-[url('https://www.ui-layouts.com/noise.gif')]"
      >
        <GrainOverlay />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/merch/:id" element={<MerchDetailsPage />} />
          </Routes>
        </BrowserRouter>

      </div>

    </QueryClientProvider>
  );
}