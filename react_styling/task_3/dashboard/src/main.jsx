import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App.jsx'

import './main.css'
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App isLoggedIn={true} />
  </StrictMode>
)