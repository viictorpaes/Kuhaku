import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

document.documentElement.classList.add('h-full');
document.body.className = 'min-h-screen bg-[#05070d] text-slate-100 antialiased';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
