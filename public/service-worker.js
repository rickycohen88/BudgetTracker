const filesToCache = [
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

self.addEventListener("install", event => {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(() => self.skipWaiting())
    );
  });
  