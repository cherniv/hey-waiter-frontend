import Auth from "./Auth";

const ASK_MOBILE_NOTIFICATIONS_PERMISSION = 'ASK_MOBILE_NOTIFICATIONS_PERMISSION';
const GOT_NOTIFICATIONS_PERMISSION = 'GOT_NOTIFICATIONS_PERMISSION';

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

  askDesktopPushNotificationsPermissions() {
    // Disable the button so it can't be changed while
    // we process the permission request
    //var pushButton = document.querySelector('.js-push-button');
    //pushButton.disabled = true;
  
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe()
        .then(function(subscription) {
          console.log('webNotificationsSubscription', subscription);
          // The subscription was successful
          
          // isPushEnabled = true;
          // pushButton.textContent = 'Disable Push Messages';
          // pushButton.disabled = false;
  
          // TODO: Send the subscription.endpoint to your server
          // and save it to send a push message at a later date
          //return sendSubscriptionToServer(subscription);
          return Auth.user.update({webNotificationsSubscription: subscription});;
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            // The user denied the notification permission which
            // means we failed to subscribe and the user will need
            // to manually change the notification permission to
            // subscribe to push messages
            console.warn('Permission for Notifications was denied');
            //pushButton.disabled = true;
          } else {
            // A problem occurred with the subscription; common reasons
            // include network errors, and lacking gcm_sender_id and/or
            // gcm_user_visible_only in the manifest.
            console.error('Unable to subscribe to push.', e);
            //pushButton.disabled = false;
            //pushButton.textContent = 'Enable Push Messages';
          }
        });
    });
  }

}

export default new NotificationsService();