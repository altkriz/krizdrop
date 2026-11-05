const CACHE_NAME = 'krizdrop-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  'https://altkriz.github.io/favicon.ico',
  'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
];

// Dynamically synthesize a valid PNG icon from https://altkriz.github.io/favicon.ico for Android WebAPK
async function generatePngIcon(size) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Sleek dark rounded background
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, size, size);

  try {
    const res = await fetch('https://altkriz.github.io/favicon.ico', { mode: 'cors' });
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    const pad = Math.round(size * 0.12);
    ctx.drawImage(bmp, pad, pad, size - pad * 2, size - pad * 2);
  } catch {
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(0, 0, size, size);
  }

  const outBlob = await canvas.convertToBlob({ type: 'image/png' });
  return new Response(outBlob, {
    status: 200,
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' }
  });
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. Serve synthesized 192x192 and 512x512 PNG icons so Android Chrome WebAPK installer succeeds
  if (url.pathname.endsWith('/icon-192.png')) {
    event.respondWith(generatePngIcon(192));
    return;
  }
  if (url.pathname.endsWith('/icon-512.png')) {
    event.respondWith(generatePngIcon(512));
    return;
  }

  // 2. Intercept Android OS Web Share Target POST requests (/krizdrop/)
  if (event.request.method === 'POST' && url.pathname.endsWith('/krizdrop/')) {
    event.respondWith((async () => {
      try {
        const formData = await event.request.formData();
        const files = formData.getAll('shared_files').filter(f => f && f.size >= 0);
        const sharedText = [formData.get('title'), formData.get('text'), formData.get('url')]
          .filter(Boolean)
          .join(' — ');

        const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        setTimeout(async () => {
          const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
          const targetClient = allClients[0] || clientList[0];
          if (targetClient) {
            if (files.length > 0) targetClient.postMessage({ type: 'SHARED_FILES', files });
            if (sharedText) targetClient.postMessage({ type: 'SHARED_TEXT', text: sharedText });
          }
        }, 900);
      } catch {}
      return Response.redirect('/krizdrop/', 303);
    })());
    return;
  }

  if (event.request.method !== 'GET') return;
  if (url.hostname.includes('peerjs.com')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
