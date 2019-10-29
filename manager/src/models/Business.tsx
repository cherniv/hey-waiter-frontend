
import Model from 'mobx-active-model';
import { observable, computed } from 'mobx';
import Auth from '../services/Auth';

class Business extends Model {

  static REMOTE_PATH:string = 'business/';

  @observable title:string = '';
  @observable creatorId:any = Auth.user.id;

  @computed get hasTitle() {
    return !!this.title && !!this.title.length;
  }

  
}

export default Business;