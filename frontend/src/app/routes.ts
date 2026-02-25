import { createBrowserRouter } from 'react-router';
import MainPage from '@/pages/CartPage';


export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainPage
  },
]);
