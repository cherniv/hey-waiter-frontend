/**
 * Created by dev on 01.12.2017.
 */



const pfx = 'qr_';



export class Stor {
    static can = () => (typeof (Storage) !== "undefined");

    static has = (key: string) => {
        const ret = Stor.get(key) != null;
        // debugger;
        return ret;
    }

    static get = (key: string) => {
        const ret = JSON.parse(localStorage.getItem(pfx+key));
        // debugger;
        return ret;
    };
    static set = (key: string, val: any) => {
        const ret = localStorage.setItem(pfx+key, JSON.stringify(typeof val != 'undefined' ? val : 'null'));
        // debugger;
        return ret;
    };
}