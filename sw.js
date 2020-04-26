
//when the service worker is installed cache the assets
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('BodzComicz').then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          './js/ajax.js',
          './css/main.css'
        ]);
      })
    );
   });
   
   //when the app makes a request, serve relevant files from cache
   self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
   });