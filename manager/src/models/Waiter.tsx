
import {FirestoreModel as Model} from 'mobx-active-model';
import { observable, computed } from 'mobx';
import Business from './Business';
import Auth from '../services/Auth';
import firebase from 'firebase/app';
import "firebase/functions";


class Waiter extends Model {

  static REMOTE_PATH:string = 'waiters/';
  @observable businessId:any;
  @observable userId:string = "";
  @observable code:string = "";
  @observable customName:string = "";

  @computed get isPending():boolean {
    return !this.userId;
  }

  @computed static get isWaiter() {
    return Auth.isAnonymous;
  }

  static WAITERS_QUERY:any = (businessId:string) => ({ 
    structuredQuery: { 
      from: [{ collectionId: 'waiters' }], 
      where: { 
        compositeFilter: { 
          filters: [{ 
            fieldFilter: { 
              field: { 
                fieldPath: 'businessId' 
              }, 
              op: 'EQUAL', 
              value: { 
                stringValue: businessId,
              } 
            } 
          }], 
          op: 'AND' 
        } 
      }, 
      //limit: 4 
    } 
  })

  static CODE_QUERY:any = (code:string) => ({ 
    structuredQuery: { 
      from: [{ collectionId: 'waiters' }], 
      where: { 
        compositeFilter: { 
          filters: [{ 
            fieldFilter: { 
              field: { 
                fieldPath: 'code' 
              }, 
              op: 'EQUAL', 
              value: { 
                stringValue: code,
              } 
            } 
          }], 
          op: 'AND' 
        } 
      }, 
      //limit: 4 
    } 
  })

  static async fetchWaiters() {
    this.fetchFromRemote(this.WAITERS_QUERY(Business.current.id));
  }

  static async checkCode(code:string) {
    return await this.fetchFromRemote(this.CODE_QUERY(code), false);
  }

  static async waiterEnterByCode(code:string) {
    var waiters = await this.checkCode(code);
    if (!waiters || !waiters.length) {
      throw new Error("");
    } else {
      this.populate(waiters);
      await Waiter.first.update({userId: Auth.user.id});
      await Business.fetchFromRemote(Waiter.first.businessId);
      Business.first.update({userIds: Business.first.userIds.concat(Auth.user.id)})
      Business.current = Business.first;
      return true;
    }
  }

  async generateCode() {
    this.code = '';
    var callableRef = firebase.functions().httpsCallable('generateWaiterCode');
    var result = await callableRef();    
    this.update({code: result.data });
  }

}

export default Waiter;