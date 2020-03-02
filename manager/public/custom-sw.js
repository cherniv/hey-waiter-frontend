self.addEventListener('push', event => {
  const {title, tableId} = event.data.json();
  const options = {
    data: {tableId},
    icon: 'favicon.ico',
    image: 'favicon.ico',
    //requireInteraction: true,
    // actions: [
    //   {
    //     action: 'reset-table-action',
    //     title: 'Reset table',
    //     //icon: '/images/demos/action-1-128x128.png'
    //   },
    // ]
  }
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
})

self.addEventListener('notificationclick', function(event) {  
  const notificationData = event.notification.data;
  if (!event.action) {
    // Was a normal notification click
    const clickedNotification = event.notification;
    clickedNotification.close();
    gotoWindow(event);
    return;
  }

  
  switch (event.action) {
    case 'reset-table-action':
      console.log('User ❤️️\'s coffees.');
      break;
    case 'doughnut-action':
      console.log('User ❤️️\'s doughnuts.');
      break;
    case 'gramophone-action':
      console.log('User ❤️️\'s music.');
      break;
    case 'atom-action':
      console.log('User ❤️️\'s science.');
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});

function gotoWindow (event) {
  const urlToOpen = new URL("/manager/", self.location.origin).href;
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {
    let matchingClient = null;

    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.url === urlToOpen) {
        matchingClient = windowClient;
        break;
      }
    }

    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain)
}