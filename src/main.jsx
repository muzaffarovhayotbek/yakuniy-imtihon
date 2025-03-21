import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalContextProvider } from './context/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
