import {Stor} from "./Stor";
import {ConfKeeper} from "./ConfKeeper";


export class Settings {
    constructor(){
        const elements: string[] = [];
        let i = 0;
        const win = (<any>window);
        win.settingsChUpd = (name: string, value: boolean) => {
            const entry = ConfKeeper.getDataTypeEntryByKey(name);
            if (typeof entry.filter != 'undefined')
                ConfKeeper.dataType.forEach(t => {
                    if (t.name != name && typeof t.filter != 'undefined'){
                        $('#st_chb' + t.name).attr('checked', false);
                        win.qrGenUpdate(t.name, false);

                    }
                });
            win.qrGenUpdate(name, value);
        };
        ConfKeeper.dataType.forEach(t => {
            if (!t.outer){
                const id = 'st_chb' + t.name;
                const on: boolean = ConfKeeper.conf[t.name];
                elements.push(
                    (t.title.toLowerCase().indexOf('more') != -1 ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '')
                    + `<input onclick="settingsChUpd('${t.name}', this.checked)" type="checkbox" id="${id}" ${on ? 'checked' : ''}>&nbsp;&nbsp;<label for="${id}">${t.title}</label>`)
            }
        });


        $('#settings').html('<b>📋 SETTINGS</b><br>' + elements.join('<br>'));

    }

}