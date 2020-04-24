function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    }).then(function (reg) {
      return reg.sync.register('syncTest');
    }).then(function () {
      console.log('Sync registered');
    }).catch(function (err) {
      console.error('It broke', err.message);
    });
  }
}

function handleError(e) {
  console.error('issue in installing app. please try again');
}

// Registering our Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', {
    scope: './'
  });
  notifyMe();
}

// prompt for pwa install
// window.addEventListener('beforeinstallprompt', function (e) {
//   // log the platforms provided as options in an install prompt 
//   console.log(e.platforms); // e.g., ["web", "android", "windows"] 
//   e.userChoice.then(function (choiceResult) {
//     console.log(choiceResult.outcome); // either "accepted" or "dismissed"
//   }, handleError);
// });