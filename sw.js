var VERSION = "static-v210";

var cacheFirstFiles = [
  "/"
];

var OFFLINE_PAGE = '/offline.html'

var networkFirstFiles = [];

// Below is the service worker code.

var cacheFiles = cacheFirstFiles.concat(networkFirstFiles).concat(OFFLINE_PAGE);

function* arrayGenerator(prefetchResources) {
  for(let prefetchResource of prefetchResources) {
    yield prefetchResource;
  }
}

function preCache(cache) {
  var _prefetchResources = [
    "/index.html",
    "/main.chunk.js",
    "/vendors-main.chunk.js",
    "/runtime.bundle.js",
    "/4.chunk.js",
    "/5.chunk.js",
    "/6.chunk.js",
    "/7.chunk.js"
  ];

  const generatorObject = arrayGenerator(_prefetchResources);
    


  prefetchResources.map(function(prefetchResource) {
    var url = new URL(urlToPrefetch, location.href);
    url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    var request = new Request(url, {mode: 'no-cors'});
    fetch(request).then(function(response) {
      if (response.status >= 400) {
        throw new Error('request for ' + urlToPrefetch +
          ' failed with status ' + response.statusText);
      }

      // Use the original URL without the cache-busting parameter as the key for cache.put().
      return cache.put(urlToPrefetch, response);
    }).catch(function(error) {
      console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
    });
  });
}

function removeCache() {
  return caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames.map(function (cacheName) {
        console.log('cachename', cacheName);
        if (VERSION !== cacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });
}

function fromNetwork(request) {
  return fetch(request).then(function (response) {
    return response;
  }).catch(function() {
    return fromCache(OFFLINE_PAGE);
  });
}

function fromCache(request) {
  return caches.open(VERSION).then(function (cache) {
    return new Promise(function (resolve, reject) {
      cache.match(request).then(function (matching) {
        if (matching) {
          resolve(matching);
        } else {
          reject('no-entry');
        }
      });
    });
  });
}

function update(request) {
  return caches.open(VERSION).then(function (cache) {
    return fetch(request).then(function (response) {
      if (request.method !== 'POST') {
        cache.put(request, response.clone());
      }
      return response;
    });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    if (response) {
      clients.forEach(function (client) {
        var message = {
          type: 'refresh',
          url: response.url,
          eTag: response.headers.get('ETag')
        };
        client.postMessage(JSON.stringify(message));
      });
    }
  });
}

self.oninstall = function (event) {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll(cacheFiles);
    })
  );
};

self.onactivate = function (event) {
  if (navigator.onLine) {
    event.waitUntil(removeCache())
  }
}

// check cache first if not found make network request
self.onfetch = function (evt) {
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request).catch(update(evt.request).then(refresh));
  }));
  // evt.respondWith(fromCache(evt.request).catch(function () {
  //   return fromNetwork(evt.request).catch(update(evt.request).then(refresh));
  // }));
}

// to send message from chrome debugging tools
self.onpush = function (event) {
  self.registration.showNotification(event.data.text());
}

// register sync event
self.onsync = function (event) {
  self.registration.showNotification(event.tag);
}