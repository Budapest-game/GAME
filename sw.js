// На воркшопе Евгений сказал,
// что нет смысла писать СВ на TS
// Не знаю насколько правильно, мотивация такая, что тут сложно ошибиться
const CACHE_NAME = 'v1';
const URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/main.bundle.js',
  // Как узнать имена файлов, генерируемых вебпаком?
  '/07839955dbf48f6e9e94.png',
  '/589b2d048773ac8ce2bb.png',
  '/7440a8edca88b60ab567.png',
  '/9f7881850a657d530ed9.png',
  '/a597bb36138c86a65798.png',
  '/c4bc4ce8c9607fff026b.png',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('install');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log('error', err);
        throw err;
      }),
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        const fetchRequest = event.request.clone();

        return new Promise((resolve) => {
          fetch(fetchRequest)
            .then((response) => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return resolve(response);
              }

              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return resolve(response);
            })
            .catch((err) => {
              if (res) {
                return resolve(res);
              }
              throw err;
            });
        });
      }),
  );
});
