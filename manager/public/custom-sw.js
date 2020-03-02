self.addEventListener('push', event => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: 'favicon.ico',
    image: 'favicon.ico'
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})