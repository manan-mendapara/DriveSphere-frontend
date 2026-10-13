import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './tailwind.css';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';
import './styles/animations.css';
import { CarProvider } from './context/CarContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarProvider>
      <WishlistProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </WishlistProvider>
    </CarProvider>
  </React.StrictMode>
);