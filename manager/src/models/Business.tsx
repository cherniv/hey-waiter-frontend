
import Model from 'mobx-active-model';
import { observable, computed } from 'mobx';
import Auth from '../services/Auth';
import Table from '../models/Table';

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
    return Table.all.filter((table:Table) => table.businessId === this.id) || [];
  }

  @computed get hasTables() {
    return !!this.tables.length;
  }
  
  static set current(val:Business) { 
    Business._current = val;
    Table.fetchTables();

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

  async addTable() {
    Table.create({ businessId: this.id});
  }

  

}

export default Business;