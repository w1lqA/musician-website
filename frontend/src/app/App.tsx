import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { MerchDetailsPage } from '@/pages/merch-details';
import { HomePage } from '@/pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merch/:id" element={<MerchDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}