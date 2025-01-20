// Nome do cache
const CACHE_NAME = 'v1';

// Arquivos a serem armazenados no cache
const CACHE_ASSETS = [
  '/repository-name/', // Substitua "repository-name" pelo nome do seu repositório
  '/repository-name/index.html',
  '/repository-name/style.css',
  '/repository-name/script.js',
  '/repository-name/icon.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Armazenando arquivos no cache...');
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Evento de busca (fetch)
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Buscando recurso:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna o recurso do cache ou faz uma requisição à rede
      return cachedResponse || fetch(event.request);
    })
  );
});