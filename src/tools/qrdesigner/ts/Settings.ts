import {Stor} from "./Stor";
import {ConfKeeper} from "./ConfKeeper";


export class Settings {
    constructor(){
        const elements:string[]=[];
        let i=0;
        ConfKeeper.dataType.forEach(t=>{
            if(!t.outer){
                const id='chbx'+(i++);
                const on:boolean = ConfKeeper.conf[t.name];
                elements.push(`<input onclick="qrGenUpdate('${t.name}', this.checked)" type="checkbox" id="${id}" ${on?'checked':''}>&nbsp;&nbsp;<label for="${id}">${t.title}</label>`)
            }
        });


        $('#settings').html('<h1>QR SETTINGS:</h1>'+elements.join('<br>'));

    }

}