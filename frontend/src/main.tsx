import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

document.documentElement.classList.add('h-full');
document.body.className = 'min-h-screen bg-[#05070d] text-slate-100 antialiased';


const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '');
(window as any).API_BASE_URL = API_BASE_URL;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
