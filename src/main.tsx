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

  window.addEventListener('offline', () => {
    window.location.href = '/off.html';
  });
}

//anche se eventlistener non funziona, verifico la connessione ogni 3 secondi
async function verifyNetworkAndRedirect() {
    try {
        //solo intestazione, no cache
        await fetch('https://google.com', { 
            method: 'HEAD', 
            mode: 'no-cors',
            cache: 'no-store' 
        });
    } catch (error) {
         window.location.href = '/off.html';
    }
}

setInterval(verifyNetworkAndRedirect, 3000);