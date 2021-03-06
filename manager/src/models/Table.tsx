
import {FirestoreModel as Model} from 'mobx-active-model';
import { observable } from 'mobx';
import Business from './Business';

class Table extends Model {

  static REMOTE_PATH:string = 'tables/';
  @observable businessId:any = null;
  @observable isActive:boolean = false;
  @observable isCalling:boolean = false;
  @observable customName:string = '';
  @observable index:number = 0;

  static TABLES_QUERY:any = (businessId:string) => ({ 
    structuredQuery: { 
      from: [{ collectionId: 'tables' }], 
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

  static async fetchTables() {
    this.fetchFromRemote(this.TABLES_QUERY(Business.current.id));
  }

}

export default Table;