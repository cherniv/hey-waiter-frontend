import {UrlVarsParser} from "./UrlVarsParser";
import {ConfKeeper} from "./ConfKeeper";

export class QRGen {
    constructor(public vars:UrlVarsParser){
        (<any>window).qrGenUpdate = this.doUpdate;
    }
    doUpdate=(settingsKey:string, value:string)=>{
        ConfKeeper.setConf(settingsKey, value);
        this.generate();
    };
    generate=()=>{
        console.log('generating!');
        console.log(ConfKeeper.conf);
    }
}