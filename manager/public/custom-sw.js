self.addEventListener('push', event => {
  const {title, tableId} = event.data.json();
  const options = {
    data: {tableId},
    icon: 'favicon.ico',
    image: 'favicon.ico',
    //requireInteraction: true,
    actions: [
      {
        action: 'reset-table-action',
        title: 'Reset table',
        //icon: '/images/demos/action-1-128x128.png'
      },
    ]
  }
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
})

self.addEventListener('notificationclick', async function(event) {  
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
      sendTableReset(event, notificationData.tableId)
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
});

const urlToOpen = new URL("/manager/", self.location.origin).href;

function gotoWindow (event) {
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

function sendTableReset (event, tableId) {
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
      return (
        matchingClient.postMessage({
          tableId
        })
      );
    } else {
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain)
}