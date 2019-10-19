/**
 * Created by dev on 01.12.2017.
 */
export class Stor{
  static can=()=> (typeof(Storage) !== "undefined");

  static has=(key:string)=>   Stor.get(key)!=null;

  static get=(key:string)=>  {
    const ret= JSON.parse(localStorage.getItem(key));
    // debugger;
    return ret;
  };
  static set=(key:string, val:any)=>{
    const ret= localStorage.setItem(key, JSON.stringify(typeof val!='undefined'?val:'null'));
    // debugger;
    return ret;
  };
}