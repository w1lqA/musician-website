import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { MerchDetailsPage } from '@/pages/merch-details';
import { HomePage } from '@/pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merch/:id" element={<MerchDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}