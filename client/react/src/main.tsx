import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '@/assets/css/index.css';
import '@/assets/css/drawer.css';
import '@/assets/css/custom-plugin.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Providers from './features/providers/Providers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
