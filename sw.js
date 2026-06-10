/*
 * sw.js — offline support for mysticscards.space
 *
 * Strategy: NETWORK-FIRST for everything on this site.
 *   - Online: always fetch fresh from the network (edits show up normally),
 *     and quietly refresh the offline copy in the background cache.
 *   - Offline: serve the last good copy from the cache.
 * Google Fonts (cross-origin) use cache-first since they never change.
 *
 * The browser registers this from js/site.js. Bump CACHE only if the
 * cache itself ever needs a hard reset — normal edits don't require it.
 */

const CACHE = 'mysticscards-v1';

const PRECACHE = [
  './',
  'index.html',
  'cardsoflife.html',
  'iching.html',
  'hexagrams.html',
  'quadrations.html',
  'calculator.html',
  'astrology.html',
  'manifest.webmanifest',
  'css/site.css',
  'js/site.js',
  'js/astronomy.js',
  'js/tzcoords.js',
  'js/cardsdata.js',
  'js/dozenal.js',
  'js/ichingdata.js',
  'js/linedata.js',
  'assets/favicon.svg',
  'assets/apple-touch-icon.png',
  'assets/cards/JH.svg', 'assets/cards/JD.svg', 'assets/cards/JC.svg', 'assets/cards/JS.svg',
  'assets/cards/QH.svg', 'assets/cards/QD.svg', 'assets/cards/QC.svg', 'assets/cards/QS.svg',
  'assets/cards/KH.svg', 'assets/cards/KD.svg', 'assets/cards/KC.svg', 'assets/cards/KS.svg',
  'assets/cards/JOKER-3.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (url.origin === location.origin) {
    // Network-first: fresh when online, cached copy when offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true }).then((hit) => {
            if (hit) return hit;
            // Offline navigation to an uncached URL — fall back to the hub.
            if (req.mode === 'navigate') return caches.match('index.html');
            return Response.error();
          })
        )
    );
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    // Fonts are immutable: cache-first, fill cache on first use.
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res && (res.ok || res.type === 'opaque')) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
  // Anything else cross-origin: let the browser handle it normally.
});
