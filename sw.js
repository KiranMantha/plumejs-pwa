var VERSION = "static-v1";

var cacheFirstFiles = [
  "/index.html",
  "/main.chunk.js",
  "/vendors-main.chunk.js",
  "/runtime.bundle.js",
];

var OFFLINE_PAGE = '/offline.html'

var networkFirstFiles = [];

// Below is the service worker code.

var cacheFiles = cacheFirstFiles.concat(networkFirstFiles).concat(OFFLINE_PAGE);

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
  evt.respondWith(fromCache(evt.request).catch(function () {
    return fromNetwork(evt.request).catch(update(evt.request).then(refresh));
  }));
}

// // prompt for pwa install
self.onbeforeinstallprompt = function (e) {
  // log the platforms provided as options in an install prompt 
  console.log(e.platforms); // e.g., ["web", "android", "windows"] 
  e.userChoice.then(function (choiceResult) {
    console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  }, handleError);
}

// to send message from chrome debugging tools
self.onpush = function (event) {
  self.registration.showNotification(event.data.text());
}

// register sync event
self.onsync = function (event) {
  self.registration.showNotification(event.tag);
}