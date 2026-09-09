/**
 * ROSHAN service worker — OFFLINE-FIRST (hard requirement, spec §8).
 * Strategy:
 *  - precache the app shell on install;
 *  - cache-first for same-origin GET (HTML/pages/assets) with network fallback +
 *    runtime caching, so after the FIRST full load the app runs 100% offline;
 *  - audio files (/audio/*.mp3) are cached on first play (on-demand precache);
 *  - never cache cross-origin requests or non-GET.
 */
const CACHE = "roshan-v2-8worlds";
const PRECACHE = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => undefined);
          return res;
        })
        .catch(() =>
          req.mode === "navigate"
            ? caches.match("/").then((shell) => shell ?? new Response("Offline — ROSHAN needs one first load.", { status: 503 }))
            : Response.error()
        );
    })
  );
});
