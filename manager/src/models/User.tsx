
import Model from 'mobx-active-model';
import { observable } from 'mobx';

class User extends Model {

  static REMOTE_PATH:string = 'users/';
  @observable name:string = "";
  @observable notificationsToken:string = "";
  @observable notificationsEnabled:boolean = false;
  @observable windowVisible:boolean = true;  
  @observable webNotificationsSubscription:string = "";

  switchNotifications = async() => {
    this.update({notificationsEnabled: !this.notificationsEnabled});
  }
}

export default User;