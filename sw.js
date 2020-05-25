const VERSION = "static-v210";
const OFFLINE_PAGE = '/offline.html';

// Below is the service worker code.
function* arrayGenerator(prefetchResources) {
  for (let prefetchResource of prefetchResources) {
    yield prefetchResource;
  }
}

async function preCache(cache) {
  const _prefetchResources = [
    OFFLINE_PAGE,
    "/",
    "/registerworker.js",
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
  let result = generatorObject.next();

  while (!result.done) {
    let url = new URL(result.value, location.href);
    let request = new Request(url, {
      mode: 'no-cors'
    });
    let response = await fetchResource(request);
    if (response.ok) {
      cache.put(result.value, response);
    } else {
      console.error('Not caching ' + result.value + ' due to ' + response.status);
    }
    result = generatorObject.next();
  }
  return cache;
}

function fetchResource(resource) {
  return fetch(resource);
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
    update(request, respose);
    return response;
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

function update(request, response) {
  caches.open(VERSION).then(function (cache) {
    if (request.method !== 'POST') {
      cache.put(request, response.clone());
    }
  });
}

self.oninstall = function (event) {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      preCache(cache);
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
    return fromCache(evt.request).catch(fromCache(OFFLINE_PAGE));
  }));
}

// to send message from chrome debugging tools
self.onpush = function (event) {
  self.registration.showNotification(event.data.text());
}

// register sync event
self.onsync = function (event) {
  self.registration.showNotification(event.tag);
}