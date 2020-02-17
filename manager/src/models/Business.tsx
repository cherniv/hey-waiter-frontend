
import Model from 'mobx-active-model';
import { observable, computed } from 'mobx';
import Auth from '../services/Auth';
import Table from '../models/Table';
import Waiter from '../models/Waiter';

class Business extends Model {

  static REMOTE_PATH:string = 'businesses/';
  @observable static _current:Business = null;

  @observable title:string = '';
  @observable creatorId:string = Auth.user.id;
  @observable userIds:string[] = [Auth.user.id];
  
  @computed get hasTitle() {
    return !!this.title && !!this.title.length;
  }
  @computed get tables() {
    return (
      Table
        .all
        .filter((table:Table) => table.businessId === this.id)
        .sort((a:Table, b:Table) => a.index - b.index) 
      || []
    );
  }
  @computed get waiters() {
    return Waiter.all.filter((waiter:Waiter) => waiter.businessId === this.id) || [];
  }

  @computed get hasTables() {
    return !!this.tables.length;
  }
  
  static set current(val:Business) { 
    Business._current = val;
    Table.fetchTables();
    Waiter.fetchWaiters();
  }
  static get current() { return Business._current}

  static MY_BUSINESSES_QUERY:any = () => ({ 
    structuredQuery: { 
      from: [{ collectionId: 'businesses' }], 
      where: { 
        compositeFilter: { 
          filters: [{ 
            fieldFilter: { 
              field: { 
                fieldPath: 'userIds' 
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

  

  static async fetchMyBusinesses () {
    return await this.fetchFromRemote(this.MY_BUSINESSES_QUERY());
  }

  async addTable(i?:number) {
    var index;
    if (i) index = i;
    else {
      if (this.tables.length) {
        index = + this.tables[this.tables.length-1].index + 1;
      } else {
        index = 1;
      }
    }
    return Table.create({ businessId: this.id, index});
  }

  static async addBunch(num:number) {
    var promises = [];
    var i:number;
    for(i = 0; i < num; i ++) {
        promises.push(this.current.addTable(i+1));
    }
    return Promise.all(promises);
  }

  async removeWaiter(waiter: Waiter) {
    
    this.removeWaiterUserFromUserIds(waiter);

    // @todo consider removing users/{userId=waiter.userId} via cloud trigger

    waiter.destroy();
  }

  removeWaiterUserFromUserIds(waiter:Waiter) {
    // @todo move this part to a trigger:
    if (waiter.userId) {
      var newUserIds = this.userIds.filter((uid:string)=>uid!==waiter.userId);
      this.update({userIds: newUserIds})
    }
  }

  async addWaiter() {
    var waiter = await Waiter.create({ 
      businessId: this.id,
    });
    waiter.generateCode();
  }

}

export default Business;