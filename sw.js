const CACHE_NAME = 'jeha-v6';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/jeha-logo.png',
  '/ICONE INSTAGRAM.png',
  '/jeha-bg-novo.jpg',
  '/bolo-limao.png',
  '/bolo-laranja.png',
  '/bolo-abacaxi.png',
  '/bolo-banana.png',
  '/Cris-semfundo.png'
];

// Instala e armazena assets em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Serve do cache, atualiza em background (stale-while-revalidate)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
      return cached || network;
    })
  );
});
