import { precacheAndRoute } from 'workbox-precaching';
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST || []);

const CACHE_NAME = 'offlineCache';
const OFFLINE_URL = '/off.html';

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      //remote server first then cache
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );
  // force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          //try preload if supported
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          //try netowrk first
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          //using cache if network fails
          console.log("Fetch failed; returning offline page instead.", error);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});

self.addEventListener('push', event => {
    const data = event.data.json();
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'https://via.placeholder.com/128'
        })
    );
});