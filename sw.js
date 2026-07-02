// Cache version
const CACHE_VERSION = "1.0.2";

const CACHE_NAME = `citizenship-quiz-${CACHE_VERSION}`;

console.log(`[SW] Version: ${CACHE_VERSION}`);

// Static files to cache
const STATIC_ASSETS = [
  "./quizz.html",
  "./assets/css/quizz.css",
  "./assets/js/quizz.js",
  "./assets/js/ui-text.js",
  "./manifest.webmanifest",
  "./assets/images/icon-192.png",
  "./assets/images/icon-512.png",
  "./assets/images/icon-maskable-512.png",
  "./assets/images/apple-touch-icon.png",
  "./assets/images/favicon-16.png",
  "./assets/images/favicon-32.png",
  "./assets/images/favicon.ico",
  "./assets/screenshots/home-en.png",
  "./assets/screenshots/quiz-question.png",
  "./assets/screenshots/quiz-correct-answer.png",
  "./assets/screenshots/results.png",
  "./assets/screenshots/statistics.png"
];

// Install
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (error) {
          console.warn(`Failed to cache: ${asset}`, error);
        }
      }
    })()
  );

  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key.startsWith("citizenship-quiz-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

// Fetch
self.addEventListener("fetch", (event) => {

  const request = event.request;

  // Network First for JSON files
  if (request.url.endsWith(".json")) {

    event.respondWith(
      fetch(request)
        .then(async (response) => {

          const responseClone = response.clone();

          event.waitUntil(
            (async () => {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(request, responseClone);
            })()
          );

          return response;
        })
        .catch(async () => {
          console.warn(`[SW] Network unavailable: ${request.url}`);
          return caches.match(request);
        })
    );

    return;
  }

  // Cache First for everything else
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );

});