const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/dist/assets/stylemin.css",
    "/dist/assets/app.bundle.js",
    "/dist/assets/icons/icon_96x96.png",
    "/dist/assets/icons/icon_128x128.png",
    "/dist/assets/icons/icon_192x192.png",
    "/dist/assets/icons/icon_256x256.png",
    "/dist/assets/icons/icon_384x384.png",
    "/dist/assets/icons/icon_512x512.png"
];

const STATIC_CACHE = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

//install
self.addEventListener("install", event => {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
  });
  

  // activate
self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== STATIC_CACHE) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});


// fetch
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
  }

  if(event.request.url.includes("/api/")){
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache =>{
        return fetch(event.request)
        .then(responce => {
          if(responce === 200){
            
          }
        })
      })
    )

  }
});
