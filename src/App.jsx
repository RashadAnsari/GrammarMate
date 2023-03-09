import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import OfflinePage from './pages/OfflinePage';
import FooterMenu from './components/FooterMenu';
import DesignProvider from './components/DesignProvider';

import './App.css';

function App() {
  const [online, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => {
      setOnline(true);
    });
    window.addEventListener('offline', () => {
      setOnline(false);
    });
  }, []);

  return (
    <DesignProvider>
      {online
        ? (
          <BrowserRouter>
            <div style={{
              display: 'flex',
              minHeight: '100vh',
              flexDirection: 'column',
            }}
            >
              <div style={{ flexGrow: 1 }}>
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="*" element={<NoPage />} />
                </Routes>
              </div>
              <FooterMenu />
            </div>
          </BrowserRouter>
        )
        : <OfflinePage />}
    </DesignProvider>
  );
}

export default App;
