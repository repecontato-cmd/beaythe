import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { CROProvider } from './context/CROContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CROProvider>
          <CartProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </CartProvider>
        </CROProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
