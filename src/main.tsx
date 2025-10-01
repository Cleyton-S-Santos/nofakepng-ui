import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import "./index.css"
import { initRybbit, trackEvent, RybbitEvents } from './monitoring/rybbit'

initRybbit();

trackEvent(RybbitEvents.APP_LOADED, {
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  language: navigator.language,
  platform: navigator.platform
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
