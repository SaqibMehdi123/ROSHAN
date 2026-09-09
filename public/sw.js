/**
 * ROSHAN service worker — OFFLINE-FIRST (hard requirement, spec §8).
 * Strategy:
 *  - precache the app shell on install (scope-relative: works at / or /ROSHAN/);
 *  - cache-first for same-origin GET with network fallback + runtime caching,
 *    so after the FIRST full load the app runs 100% offline;
 *  - audio files (/audio/*.mp3, ~75MB) are cached on first play (on-demand);
 *  - never cache cross-origin, non-GET, or failed responses.
 */
const CACHE = "roshan-vmtua1erw";
const SCOPE = new URL(self.registration.scope).pathname;
const PRECACHE = [
  SCOPE,
  SCOPE + "manifest.webmanifest",
  SCOPE + "icons/icon-192.png",
  SCOPE + "icons/icon-512.png",
].map((u) => new URL(u, self.registration.scope).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u)))).then(() => self.skipWaiting())
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
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => undefined);
          }
          return res;
        })
        .catch(() =>
          req.mode === "navigate"
            ? caches.match(SCOPE).then((shell) => shell ?? new Response("Offline — ROSHAN needs one first load.", { status: 503 }))
            : Response.error()
        );
    })
  );
});
