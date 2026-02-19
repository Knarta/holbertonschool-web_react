import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import App from './App/App.jsx'
import './main.css'

const isLoggedIn = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('loggedIn') === '1';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App isLoggedIn={isLoggedIn} />
  </StrictMode>,
);
