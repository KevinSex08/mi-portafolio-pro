import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// IMPORTANTE: Importamos el Router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos TODA la App con BrowserRouter para que funcionen las rutas */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

//modificar para q salga readme.md en github. 
