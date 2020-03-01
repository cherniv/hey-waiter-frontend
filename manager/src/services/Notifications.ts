import Auth from "./Auth";

const ASK_MOBILE_NOTIFICATIONS_PERMISSION = 'ASK_MOBILE_NOTIFICATIONS_PERMISSION';
const GOT_NOTIFICATIONS_PERMISSION = 'GOT_NOTIFICATIONS_PERMISSION';

const KEY = process.env.REACT_APP_PUBLIC_VAPID_KEY;
const convertedVapidKey = urlBase64ToUint8Array(KEY);

function urlBase64ToUint8Array(base64String:string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription:any) {
  Auth.user.update({webNotificationsSubscription: JSON.stringify(subscription)});
}

class NotificationsService {
  askNativePushNotificationsPermissions() {
    const win:any = (window as any); 
    const {ReactNativeWebView} = win;
    if (!ReactNativeWebView) return;

    var command = {
      "command": ASK_MOBILE_NOTIFICATIONS_PERMISSION,
    };
    ReactNativeWebView.postMessage(JSON.stringify(command));
    win.messageFromMobile = (data:string) => {
      var command:any = JSON.parse(data);
      if (command.command === GOT_NOTIFICATIONS_PERMISSION) {
        const {notificationsToken} = command;
        if (notificationsToken) {
          
          Auth.user.update({notificationsToken});
          
        }
      }
      
    };
  }

  askDesktopPushNotificationsPermissions = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          return
        }
  
        registration.pushManager.getSubscription().then(function(existedSubscription) {
          if (existedSubscription === null) {
            console.log('No subscription detected, make a request.')
            registration.pushManager.subscribe({
              applicationServerKey: convertedVapidKey,
              userVisibleOnly: true,
            }).then(function(newSubscription) {
              console.log('New subscription added.')
              sendSubscription(newSubscription)
            }).catch(function(e) {
              if (Notification.permission !== 'granted') {
                console.log('Permission was not granted.')
              } else {
                console.error('An error ocurred during the subscription process.', e)
              }
            })
          } else {
            console.log('Existed subscription detected.')
            sendSubscription(existedSubscription)
          }
        })
      })
        .catch(function(e) {
          console.error('An error ocurred during Service Worker registration.', e)
        })
    }
      
  }

}

export default new NotificationsService();