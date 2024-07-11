import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from 'api/queryConfig';
import Recording from 'modules/Recording';
import RecordingList from 'modules/RecodingList';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<RecordingList />} />
            <Route path=":recordingId" element={<Recording />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

QueryClientProvider;
