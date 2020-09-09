const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
	'/',
	'/index.html',
	'/js/app.js',
	'/js/swfile.js',
	'/style.css',	
	'/icons/01d.png',
	'/icons/01n.png',
	'/icons/02d.png',
	'/icons/02n.png',
	'/icons/03d.png',
	'/icons/03n.png',
	'/icons/04d.png',
	'/icons/04n.png',
	'/icons/09d.png',
	'/icons/09n.png',
	'/icons/10d.png',
	'/icons/10n.png',
	'/icons/11d.png',
	'/icons/11n.png',
	'/icons/13d.png',
	'/icons/13n.png',
	'/icons/50d.png',
	'/icons/50n.png',
];


// install service worker
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate service worker
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});





/*
	
	'/icons/icon-72x72.png',
	'/icons/icon-96x96.png',
	'/icons/icon-128x128.png',
	'/icons/icon-144x144.png',
	'/icons/icon-152x152.png',
	'/icons/icon-192x192.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png'

*/
