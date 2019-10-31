
import Model from 'mobx-active-model';
import { observable, computed } from 'mobx';
import Auth from '../services/Auth';

class Business extends Model {

  static REMOTE_PATH:string = 'business/';

  @observable title:string = '';
  @observable creatorId:any = Auth.user.id;
  @observable users:any = [Auth.user.id];
  @computed get hasTitle() {
    return !!this.title && !!this.title.length;
  }

  static MY_BUSINESSES_QUERY:any = () => ({ 
    structuredQuery: { 
      from: [{ collectionId: 'business' }], 
      where: { 
        compositeFilter: { 
          filters: [{ 
            fieldFilter: { 
              field: { 
                fieldPath: 'users' 
              }, 
              op: 'array-contains', 
              value: { 
                stringValue: Auth.user.id 
              } 
            } 
          }], 
          op: 'AND' 
        } 
      }, 
      //limit: 4 
    } 
  })

  static async getMyBusinesses () {
    return await this.fetchFromRemote(this.MY_BUSINESSES_QUERY());
  }

}

export default Business;