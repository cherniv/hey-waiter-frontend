
import Model from 'mobx-active-model';
import { observable } from 'mobx';

class User extends Model {

  static REMOTE_PATH:string = 'users/';
  @observable name:string = "";
}

export default User;