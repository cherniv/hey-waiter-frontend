import Auth from "./Auth";

const ASK_MOBILE_NOTIFICATIONS_PERMISSION = 'ASK_MOBILE_NOTIFICATIONS_PERMISSION';
const GOT_NOTIFICATIONS_PERMISSION = 'GOT_NOTIFICATIONS_PERMISSION';

class NotificationsService {
  askPermissions() {
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
}

export default new NotificationsService();