import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import ThemeRegistry from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { TelegramProvider } from './context/TelegramContext';
import { initTomoAdsReward } from './lib/tomoads';

initTomoAdsReward();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TelegramProvider>
      <ThemeRegistry>
        <LanguageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeRegistry>
    </TelegramProvider>
  </React.StrictMode>
); 