import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker avviato!', reg))
      .catch(err => console.error('Errore Service Worker:', err));
  });

  // Ascolta l'evento di disconnessione del browser (Requisito di Pagina 4 - Network Management)
  window.addEventListener('offline', () => {
    // Forza il browser a caricare la pagina offline gestita dal Service Worker
    window.location.href = '/offline.html';
  });

  // Gestione del ritorno online: se l'utente aggiorna o torna la rete, torna alla root
  window.addEventListener('online', () => {
    if (window.location.pathname === '/offline.html') {
      window.location.href = '/';
    }
  });
}