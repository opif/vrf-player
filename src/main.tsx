import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import queryClient from 'api/queryConfig';
import { theme } from 'common/theme';
import Recording from 'modules/Recording';
import RecordingList from 'modules/RecodingList';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<RecordingList />} />
              <Route path=":recordingId" element={<Recording />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

QueryClientProvider;
