{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 const CACHE_NAME = 'jagdamba-oil-mill-v1';\
const ASSETS_TO_CACHE = [\
  '/',\
  '/index.html',\
  '/manifest.json',\
  'https://cdn.tailwindcss.com',\
  'https://unpkg.com/react@18/umd/react.development.js',\
  'https://unpkg.com/react-dom@18/umd/react-dom.development.js',\
  'https://unpkg.com/@babel/standalone/babel.min.js',\
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'\
];\
\
// Install Event\
self.addEventListener('install', (event) => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME).then((cache) => \{\
      console.log('[SW] Pre-caching core assets');\
      return cache.addAll(ASSETS_TO_CACHE);\
    \})\
  );\
  self.skipWaiting();\
\});\
\
// Activate Event\
self.addEventListener('activate', (event) => \{\
  event.waitUntil(\
    caches.keys().then((cacheNames) => \{\
      return Promise.all(\
        cacheNames.map((cache) => \{\
          if (cache !== CACHE_NAME) \{\
            console.log('[SW] Deleting old cache:', cache);\
            return caches.delete(cache);\
          \}\
        \})\
      );\
    \})\
  );\
  self.clients.claim();\
\});\
\
// Fetch Event (Network First, Cache Fallback)\
self.addEventListener('fetch', (event) => \{\
  event.respondWith(\
    fetch(event.request)\
      .then((networkResponse) => \{\
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') \{\
          const responseClone = networkResponse.clone();\
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));\
        \}\
        return networkResponse;\
      \})\
      .catch(() => \{\
        return caches.match(event.request).then((cachedResponse) => \{\
          if (cachedResponse) return cachedResponse;\
          if (event.request.headers.get('accept').includes('text/html')) \{\
            return caches.match('/index.html');\
          \}\
        \});\
      \})\
  );\
\});\
}