/* Offline-Speicher der App Brandschutz-Rundgang.
   WICHTIG bei jedem Update: VERSION hier UND APP_V in index.html gleich hochzählen.
   Die erfassten Daten liegen NICHT hier, sondern im Gerätespeicher (IndexedDB) – ein Update löscht sie nie. */
const VERSION = 'bsr-v2';
const DATEIEN = ['./', './index.html', './jspdf.min.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('bsr-') === 0 && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function merken(req, r) { if (r && (r.ok || r.type === 'opaque')) { const k = r.clone(); caches.open(VERSION).then(c => c.put(req, k)); } return r; }
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const schrift = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !schrift) return;
  if (/(sw\.js|uebersicht\.html)$/.test(url.pathname)) return;
  const seite = e.request.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname);
  if (seite) {
    /* App-Seite: zuerst Netz (max. 4 s), ohne Netz die gespeicherte Version */
    e.respondWith(Promise.race([fetch(e.request).then(r => merken(e.request, r)), new Promise((_, rej) => setTimeout(rej, 4000))])
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  /* übrige Dateien: zuerst Speicher, im Hintergrund auffrischen */
  e.respondWith(caches.match(e.request).then(c => { const n = fetch(e.request).then(r => merken(e.request, r)).catch(() => c); return c || n; }));
});
