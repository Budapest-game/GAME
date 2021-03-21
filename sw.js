// Я не понимаю, как сделать правильно, он пишет, что "require is not defined"
// Может есть другой способ прочитать файл без XMLHttpRequest?
const { XMLHttpRequest } = require('xmlhttprequest');

const FILE_NAME = '/assets.json';
const CACHE_NAME = 'v1';
let URLS = [];

function readAssetFile() {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', FILE_NAME, true);
  return new Promise((resolve) => {
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4 && rawFile.status === 200) {
        resolve(rawFile.responseText);
      }
    };
    rawFile.send(null);
  });
}
// eslint-disable-next-line @typescript-eslint/no-this-alias
const context = this;
readAssetFile().then((json) => {
  const filesData = JSON.parse(json);
  Object.values(filesData).forEach((block) => {
    Object.keys(block).forEach((element) => {
      if (Array.isArray(block[element])) {
        URLS = [...URLS, ...block[element]];
      } else {
        URLS.push(block[element]);
      }
    });
  });

  context.addEventListener('install', (event) => {
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

  context.addEventListener('fetch', (event) => {
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
});
