import Auth from "./Auth";

const ASK_MOBILE_NOTIFICATIONS_PERMISSION = 'ASK_MOBILE_NOTIFICATIONS_PERMISSION';
const GOT_NOTIFICATIONS_PERMISSION = 'GOT_NOTIFICATIONS_PERMISSION';

//const KEY = process.env.PUBLIC_VAPID_KEY; // DOESN'T WORK, undefined in production
const KEY = 'BDPt0PtX7VV5tMOQwVXhketleLKrrte9bAirHK8dW0ZY2ToAtKD2Z9eUXx9TRZvnXFmdwN3Fn4h0Ry6zKm5X9HQ';
const convertedVapidKey = urlBase64ToUint8Array(KEY);

const SERVICE_WORKER_ERROR_MESSAGE = 'An error ocurred during Service Worker registration.';

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

  isWebPushNotificationsAvailable = async () => {
    if ('serviceWorker' in navigator === false) {
      console.log('ServiceWorker unavailable.')
      return false;
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return false;
      }
    } catch(e) {
      return false;
    }
    return true;
  }

  getWebPushRegistrartion = async () => {
    return navigator.serviceWorker.ready;
  }

  getWebPushSubscription = async () => {
    try {
      const registration = await this.getWebPushRegistrartion();
      const subscription = await registration.pushManager.getSubscription();
      return subscription;
    } catch(e) {
      console.error(SERVICE_WORKER_ERROR_MESSAGE, e);
    }
    return null;
  }

  askWebPushNotificationsPermissions = async () => {
    if (await !this.isWebPushNotificationsAvailable()) return;

    const existedSubscription = await this.getWebPushSubscription();
    
    if (existedSubscription === null) {
      console.log('No subscription detected, make a request.')
      const registration = await this.getWebPushRegistrartion();

      try {
        var newSubscription = await registration.pushManager.subscribe({
          applicationServerKey: convertedVapidKey,
          userVisibleOnly: true,
        });
        
        console.log('New subscription added.')
        sendSubscription(newSubscription);
      } catch(e)  {
        console.log('Error occured')
        if (Notification.permission !== 'granted') {
          console.log('Permission was not granted.')
        } else {
          console.error('An error ocurred during the subscription process.', e)
        }
      }
    } else {
      console.log('Existed subscription detected.')
      sendSubscription(existedSubscription)
    }
  }   
}

export default new NotificationsService();