import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter must wrap App so pages can use Link, NavLink, and useNavigate. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
