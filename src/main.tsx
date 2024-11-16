import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);