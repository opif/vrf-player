import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import RecordingList from 'components/RecordingList.tsx';
import Recording from 'components/Recording.tsx';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<RecordingList />} />
          <Route path=":recordingId" element={<Recording />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
