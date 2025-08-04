const CACHE_NAME = 'mydigisign-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/faq.html',
  '/blog/',
  '/blog/index.html',
  '/blog/blog-top-5-free-digital-signage-2025.html',
  '/blog/blog-3-minutes-setup.html',
  '/blog/blog-ai-simplicity.html',
  '/blog/blog-free-live-tv.html',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 