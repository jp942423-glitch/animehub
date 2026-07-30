self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("animeverse-cache").then(cache => {
      return cache.addAll(["index.html", "style.css", "anime.js"]);
    })
  );
});
