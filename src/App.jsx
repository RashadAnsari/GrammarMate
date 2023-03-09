import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NoPage from './pages/NoPage';
import DesignProvider from './components/DesignProvider';

import './App.css';

function App() {
  return (
    <DesignProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </DesignProvider>
  );
}

export default App;
