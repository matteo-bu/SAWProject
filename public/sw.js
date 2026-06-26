/*const CACHE_NAME = 'offline-v1';
const OFFLINE_URL = '/offline.html';

// Installazione (Pagina 41)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })
  );
  self.skipWaiting();
});

// Attivazione (Pulizia per evitare blocchi)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

// Fetch (Pagina 42 - Modificata per dare precedenza alla rete reale)
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Se siamo online ma il server non trova la sottopagina (tipico delle SPA in React),
          // non dobbiamo mostrare l'offline, ma lasciar gestire il routing a React.
          if (!networkResponse.ok && networkResponse.status !== 404) {
            return caches.open(CACHE_NAME).then((cache) => cache.match(OFFLINE_URL));
          }
          return networkResponse;
        })
        .catch(() => {
          // Questo scatta SOLO se non c'è internet (connessione fallita)
          return caches.open(CACHE_NAME).then((cache) => cache.match(OFFLINE_URL));
        })
    );
  }
});
*/