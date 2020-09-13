
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll([
        "./",
        "./css/index.css",
        "./js/index.js",
        "./assets/icon2.png",
        "./assets"
        ])
    })
    )
})

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
    );
});